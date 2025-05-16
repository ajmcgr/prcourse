
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { sessionId, userId } = await req.json();
    
    if (!sessionId) {
      throw new Error("No session ID provided");
    }
    
    console.log("Verifying Stripe payment for session:", sessionId, "User ID:", userId);
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    // Create Supabase client for database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );
    
    // Retrieve checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['total_details.breakdown', 'line_items']
    });
    console.log("Retrieved session:", session.id, "Status:", session.payment_status);
    
    let promoCodeUsed = null;
    if (session.total_details?.breakdown?.discounts && session.total_details.breakdown.discounts.length > 0) {
      promoCodeUsed = session.total_details.breakdown.discounts[0].discount?.promotion_code?.code || 'unknown_promo';
      console.log("Promotion code used:", promoCodeUsed);
    }
    
    if (session.payment_status === 'paid') {
      console.log("Payment confirmed paid for session:", session.id);
      
      // Update payment status in database
      if (userId) {
        console.log("Updating payment record for user:", userId);
        
        try {
          // First check if a payment record already exists
          const { data: existingPayment, error: fetchError } = await supabaseClient
            .from('user_payments')
            .select('id, promotion_code')
            .eq('user_id', userId)
            .maybeSingle();

          if (fetchError) {
            console.error("Error checking for existing payment:", fetchError);
            throw new Error(`Failed to check existing payment: ${fetchError.message}`);
          }

          let updateResult;
          
          if (existingPayment) {
            // Update existing record
            console.log("Updating existing payment record for ID:", existingPayment.id);
            updateResult = await supabaseClient
              .from('user_payments')
              .update({
                stripe_session_id: session.id,
                payment_status: 'completed',
                amount: session.amount_total || 9900,
                promotion_code: promoCodeUsed || existingPayment.promotion_code,
                updated_at: new Date().toISOString()
              })
              .eq('id', existingPayment.id);
          } else {
            // Create new record
            console.log("Creating new payment record");
            updateResult = await supabaseClient
              .from('user_payments')
              .insert({
                user_id: userId,
                stripe_session_id: session.id,
                payment_status: 'completed',
                amount: session.amount_total || 9900,
                promotion_code: promoCodeUsed,
                updated_at: new Date().toISOString()
              });
          }
          
          if (updateResult.error) {
            console.error("Database operation failed:", updateResult.error);
            throw new Error(`Failed to update payment record: ${updateResult.error.message}`);
          } else {
            console.log("Payment record successfully updated/created in database");
          }
        } catch (dbError: any) {
          console.error("Database operation error:", dbError);
          throw new Error(`Database error: ${dbError.message}`);
        }
      }
      
      return new Response(JSON.stringify({ 
        verified: true,
        session_id: session.id,
        payment_status: session.payment_status,
        promotion_code_used: promoCodeUsed
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      console.log("Payment not completed for session:", session.id);
      return new Response(JSON.stringify({ 
        verified: false,
        session_id: session.id,
        payment_status: session.payment_status
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
