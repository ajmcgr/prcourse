
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
      return new Response(
        JSON.stringify({ error: "Missing session ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Missing user ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Stripe client
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient()
    });
    
    logStep("Retrieving Stripe session", { sessionId });

    // Get session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      logStep("Session not found");
      return new Response(
        JSON.stringify({ verified: false, error: "Session not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
    
    // Get any promotion code used in the session
    let promotionCode = null;
    if (session.total_details?.breakdown?.discounts && 
        session.total_details.breakdown.discounts.length > 0) {
      promotionCode = session.total_details.breakdown.discounts[0].discount?.promotion_code;
    }
    
    // Update payment record in database
    try {
      logStep("Updating payment record in database");
      
      // First try to update an existing record for this session
      const { data: updateData, error: updateError } = await supabaseAdmin
        .from('user_payments')
        .update({
          payment_status: 'completed',
          promotion_code: promotionCode,
          amount: session.amount_total, // Use the actual amount from Stripe
          updated_at: new Date().toISOString()
        })
        .eq('stripe_session_id', sessionId)
        .select();
      
      if (updateError) {
        logStep("Error updating payment record", updateError);
        // Continue despite error, as we'll try inserting a new record
      }
      
      // If no records were updated (no matching session ID), create a new record
      if (!updateData || updateData.length === 0) {
        logStep("No existing payment record found, creating new one");
        
        const { data: insertData, error: insertError } = await supabaseAdmin
          .from('user_payments')
          .insert({
            user_id: userId,
            payment_status: 'completed',
            stripe_session_id: sessionId,
            stripe_customer_id: session.customer as string,
            promotion_code: promotionCode,
            amount: session.amount_total, // Use the actual amount from Stripe
            updated_at: new Date().toISOString()
          })
          .select();
        
        if (insertError) {
          logStep("Error inserting payment record", insertError);
          throw new Error(`Database error: ${insertError.message}`);
        }
        
        logStep("Created new payment record", { id: insertData?.[0]?.id });
      } else {
        logStep("Updated existing payment record", { id: updateData[0]?.id });
      }
    } catch (dbError) {
      logStep("Database operation failed", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Return success
    return new Response(
      JSON.stringify({ verified: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (err) {
    // Log any errors
    console.error("Error in verify-payment function:", err);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
