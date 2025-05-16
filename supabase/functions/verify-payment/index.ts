
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import Stripe from 'https://esm.sh/stripe@13.10.0';

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Extract request body
    const requestData = await req.json();
    const sessionId = requestData.sessionId;
    const userId = requestData.userId;
    
    logStep("Request received", { sessionId, userId });

    // Validate inputs
    if (!sessionId) {
      logStep("Missing session ID");
      return new Response(
        JSON.stringify({ error: "Missing session ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!userId) {
      logStep("Missing user ID");
      return new Response(
        JSON.stringify({ error: "Missing user ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Check if Stripe API key exists
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey || stripeKey.trim() === "") {
      logStep("ERROR: Stripe secret key is missing");
      return new Response(
        JSON.stringify({ error: "Stripe configuration error - missing API key" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Stripe client
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient()
    });
    
    logStep("Retrieving Stripe session", { sessionId });

    // Get session details from Stripe with detailed error handling
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
      if (!session) {
        logStep("Session not found");
        return new Response(
          JSON.stringify({ verified: false, error: "Session not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } catch (sessionError: any) {
      logStep("Error retrieving Stripe session", { 
        error: sessionError.message,
        type: sessionError.type, 
        code: sessionError.code
      });
      return new Response(
        JSON.stringify({ 
          verified: false, 
          error: `Error retrieving Stripe session: ${sessionError.message}` 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    logStep("Session retrieved", { 
      status: session.status,
      paymentStatus: session.payment_status
    });

    // Check if payment is successful
    const isPaymentSuccessful = session.payment_status === 'paid';
    
    if (!isPaymentSuccessful) {
      logStep("Payment unsuccessful", { paymentStatus: session.payment_status });
      return new Response(
        JSON.stringify({ verified: false, message: "Payment not completed" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Initialize Supabase client with service role (to bypass RLS)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Get any promotion code used in the session with better error handling
    let promotionCode = null;
    try {
      if (session.total_details?.breakdown?.discounts && 
          session.total_details.breakdown.discounts.length > 0) {
        promotionCode = session.total_details.breakdown.discounts[0].discount?.promotion_code;
        logStep("Promotion code found in session", { promotionCode });
      }
    } catch (promoError) {
      logStep("Error extracting promotion code", promoError);
      // Continue processing without promotion code
    }
    
    // Update payment record in database
    try {
      logStep("Looking for matching payment record", { sessionId });
      
      // Find payment with matching session ID first
      const { data: sessionPayments, error: fetchError } = await supabaseAdmin
        .from('user_payments')
        .select('id')
        .eq('stripe_session_id', sessionId)
        .limit(1);
      
      if (fetchError) {
        logStep("Error finding payment record", fetchError);
        throw new Error(`Database query error: ${fetchError.message}`);
      }
      
      if (sessionPayments && sessionPayments.length > 0) {
        // Update the existing payment record
        logStep("Found matching session payment to update", { paymentId: sessionPayments[0].id });
        
        const { error: updateError } = await supabaseAdmin
          .from('user_payments')
          .update({
            payment_status: 'completed',
            promotion_code: promotionCode,
            amount: session.amount_total,
            updated_at: new Date().toISOString()
          })
          .eq('id', sessionPayments[0].id);
        
        if (updateError) {
          logStep("Error updating payment record", updateError);
          throw new Error(`Database update error: ${updateError.message}`);
        }
        
        logStep("Successfully updated payment record");
      } else {
        // Create a new payment record
        logStep("No matching session found, creating new payment record");
        
        const { error: insertError } = await supabaseAdmin
          .from('user_payments')
          .insert({
            user_id: userId,
            payment_status: 'completed',
            stripe_session_id: sessionId,
            stripe_customer_id: session.customer as string,
            promotion_code: promotionCode,
            amount: session.amount_total,
            updated_at: new Date().toISOString()
          });
        
        if (insertError) {
          logStep("Error creating payment record", insertError);
          throw new Error(`Database error: ${insertError.message}`);
        }
        
        logStep("Created new payment record");
      }
    } catch (dbError: any) {
      logStep("Database operation failed", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Return success
    return new Response(
      JSON.stringify({ 
        verified: true,
        session_data: {
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          customer: session.customer
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (err: any) {
    // Log any errors
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error in verify-payment function:", errorMessage);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
