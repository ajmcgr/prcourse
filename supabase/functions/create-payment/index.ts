
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

    // Parse request body to get returnUrl and optional promotion code
    const requestBody = await req.json();
    console.log("Request body:", JSON.stringify(requestBody, null, 2));
    
    const { returnUrl, promotionCode } = requestBody;
    
    if (promotionCode) {
      console.log("Promotion code provided:", promotionCode);
    } else {
      console.log("No promotion code provided in request");
    }
    
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
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    
    const stripe = new Stripe(stripeKey, {
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

    // Create checkout session options
    const sessionOptions = {
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
      allow_promotion_codes: true, // Explicitly enable promotion codes in checkout
    };

    // If a specific promotion code was provided, add it to the session
    if (promotionCode) {
      console.log("Attempting to apply specific promotion code:", promotionCode);
      
      try {
        // Verify the promotion code exists before applying it
        const promoCodeObj = await stripe.promotionCodes.list({
          code: promotionCode,
          active: true,
          limit: 1
        });
        
        if (promoCodeObj.data.length > 0) {
          const promoId = promoCodeObj.data[0].id;
          console.log("Found valid promotion code with ID:", promoId);
          sessionOptions.discounts = [
            {
              promotion_code: promoId,
            },
          ];
        } else {
          console.log("Warning: Promotion code not found or not active in Stripe:", promotionCode);
          // Still allow the checkout to proceed, but without the discount applied
        }
      } catch (promoError) {
        console.error("Error checking promotion code:", promoError);
        // Continue with checkout without applying the discount
      }
    }

    console.log("Creating checkout session with options:", JSON.stringify(sessionOptions, null, 2));
    
    // Create the checkout session
    const session = await stripe.checkout.sessions.create(sessionOptions);

    console.log("Created checkout session:", session.id);

    // Create a pending payment record in Supabase
    const { error: paymentError } = await supabaseClient
      .from('user_payments')
      .insert({
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_session_id: session.id,
        payment_status: 'pending',
        amount: 9900,
        promotion_code: promotionCode || null
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
