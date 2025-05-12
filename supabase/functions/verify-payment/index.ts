
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
    
    console.log("Verifying Stripe payment for session:", sessionId);
    
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
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Retrieved session:", session.id, "Status:", session.payment_status);
    
    if (session.payment_status === 'paid') {
      console.log("Payment confirmed paid for session:", session.id);
      
      // Update payment status in database
      if (userId) {
        console.log("Updating payment record for user:", userId);
        const { error } = await supabaseClient
          .from('user_payments')
          .upsert({
            user_id: userId,
            stripe_session_id: session.id,
            payment_status: 'completed',
            amount: session.amount_total || 9900,
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });
          
        if (error) {
          console.error("Error recording payment in database:", error);
        } else {
          console.log("Payment recorded successfully in database");
        }
      }
      
      return new Response(JSON.stringify({ 
        verified: true,
        session_id: session.id,
        payment_status: session.payment_status
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
