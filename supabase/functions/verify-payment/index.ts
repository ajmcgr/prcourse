
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
      logStep("Checking for existing completed payment");
      
      // First check if there's already a completed payment record for this user
      const { data: existingCompletedPayments } = await supabaseAdmin
        .from('user_payments')
        .select('id')
        .eq('user_id', userId)
        .eq('payment_status', 'completed')
        .limit(1);
        
      if (existingCompletedPayments && existingCompletedPayments.length > 0) {
        logStep("User already has completed payment, skipping database update");
      } else {
        // Look for existing payment record for this session
        logStep("Looking for existing payment record for this session", { sessionId });
        
        const { data: existingSessionPayments } = await supabaseAdmin
          .from('user_payments')
          .select('id, payment_status')
          .eq('stripe_session_id', sessionId)
          .limit(1);
          
        if (existingSessionPayments && existingSessionPayments.length > 0) {
          // Update existing record
          logStep("Updating existing payment record", { 
            id: existingSessionPayments[0].id,
            currentStatus: existingSessionPayments[0].payment_status
          });
          
          const { error: updateError } = await supabaseAdmin
            .from('user_payments')
            .update({
              payment_status: 'completed',
              promotion_code: promotionCode,
              amount: session.amount_total, // Use the actual amount from Stripe
              updated_at: new Date().toISOString()
            })
            .eq('id', existingSessionPayments[0].id);
          
          if (updateError) {
            logStep("Error updating payment record", updateError);
            throw new Error(`Database update error: ${updateError.message}`);
          }
          
          logStep("Successfully updated existing payment record");
        } else {
          // Try to find and update any pending payment for this user
          logStep("Looking for pending payment for user", { userId });
          
          const { data: pendingPayments } = await supabaseAdmin
            .from('user_payments')
            .select('id')
            .eq('user_id', userId)
            .eq('payment_status', 'pending')
            .limit(1);
            
          if (pendingPayments && pendingPayments.length > 0) {
            // Update the pending payment
            logStep("Updating pending payment", { id: pendingPayments[0].id });
            
            const { error: updatePendingError } = await supabaseAdmin
              .from('user_payments')
              .update({
                payment_status: 'completed',
                stripe_session_id: sessionId,
                promotion_code: promotionCode,
                amount: session.amount_total,
                updated_at: new Date().toISOString()
              })
              .eq('id', pendingPayments[0].id);
              
            if (updatePendingError) {
              logStep("Error updating pending payment", updatePendingError);
              // If update fails, try to create a new record
            } else {
              logStep("Successfully updated pending payment to completed");
              return new Response(
                JSON.stringify({ verified: true }),
                { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
              );
            }
          }
          
          // If no matching session payment and no pending payment (or update failed),
          // create a new payment record
          logStep("Creating new payment record");
          
          const { data: insertData, error: insertError } = await supabaseAdmin
            .from('user_payments')
            .insert({
              user_id: userId,
              payment_status: 'completed',
              stripe_session_id: sessionId,
              stripe_customer_id: session.customer as string,
              promotion_code: promotionCode,
              amount: session.amount_total,
              updated_at: new Date().toISOString()
            })
            .select();
          
          if (insertError) {
            logStep("Error inserting payment record", insertError);
            throw new Error(`Database error: ${insertError.message}`);
          }
          
          logStep("Created new payment record", { id: insertData?.[0]?.id });
        }
      }
    } catch (dbError: any) {
      logStep("Database operation failed", dbError);
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Return success
    return new Response(
      JSON.stringify({ verified: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (err: any) {
    // Log any errors
    console.error("Error in verify-payment function:", err);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
