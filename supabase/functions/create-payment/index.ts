
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
    // Create Supabase client using the anon key for user authentication.
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.email) {
      throw new Error("User not authenticated or email not available");
    }

    console.log("Creating payment session for user:", user.id, user.email);

    // Parse request body to get returnUrl
    const { returnUrl } = await req.json();
    
    // Determine the origin and success URL
    const origin = req.headers.get("origin") || "https://prcourse.alexmacgregor.com";
    
    // If returnUrl is provided, use it, otherwise use the default
    let successUrl = returnUrl || `${origin}/payment-success`;
    
    // Ensure the success URL has the query parameter placeholder
    if (!successUrl.includes('?')) {
      successUrl = `${successUrl}?session_id={CHECKOUT_SESSION_ID}`;
    } else if (!successUrl.includes('session_id=')) {
      successUrl = `${successUrl}&session_id={CHECKOUT_SESSION_ID}`;
    }
    
    console.log("Using success URL:", successUrl);
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if a Stripe customer record exists for this user
    console.log("Checking for existing Stripe customer");
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else {
      // Create a new customer if one doesn't exist
      console.log("Creating new customer for:", user.email);
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        }
      });
      customerId = newCustomer.id;
      console.log("Created new customer:", customerId);
    }

    // Create a one-time payment session with promotion code support
    console.log("Creating checkout session with return URL:", successUrl);
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: "PR Masterclass - Complete Course",
              description: "Lifetime access to all PR course materials",
            },
            unit_amount: 9900, // $99.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: `${origin}/pricing`,
      // Enable promotion codes in the checkout
      allow_promotion_codes: true,
    });

    console.log("Created checkout session:", session.id);

    // Create a pending payment record in Supabase
    const { error: paymentError } = await supabaseClient
      .from('user_payments')
      .insert({
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_session_id: session.id,
        payment_status: 'pending',
        amount: 9900
      });
    
    if (paymentError) {
      console.error("Error creating payment record:", paymentError);
    } else {
      console.log("Created pending payment record in database");
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
