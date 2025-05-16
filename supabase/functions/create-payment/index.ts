
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import Stripe from 'https://esm.sh/stripe@13.10.0';

// CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Extract the request body
    const requestData = await req.json();
    const returnUrl = requestData.returnUrl || 'https://prcourse.alexmacgregor.com/payment-success';
    const promotionCode = requestData.promotionCode;
    
    logStep("Request body", { returnUrl, promotionCode: promotionCode || "none" });

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header is missing" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Initialize Supabase client with service role (to bypass RLS)
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );
    
    // Get user from the session
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      logStep("Authentication error", userError);
      return new Response(
        JSON.stringify({ error: "Authentication failed" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    logStep("Creating payment session for user", { id: user.id, email: user.email });

    // Set up success URL 
    const successUrl = `${returnUrl}?session_id={CHECKOUT_SESSION_ID}`;
    logStep("Using success URL", successUrl);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient()
    });

    // Check for existing Stripe customer
    logStep("Checking for existing Stripe customer");
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId: string;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create a new customer
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
        }
      });
      customerId = newCustomer.id;
      logStep("Created new customer", { customerId });
    }

    // Set up Stripe checkout options
    const checkoutOptions: any = {
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "PR Masterclass - Complete Course",
              description: "Lifetime access to all PR course materials"
            },
            unit_amount: 9900 // $99.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: `${returnUrl.split('/payment-success')[0]}/pricing`,
      allow_promotion_codes: true
    };
    
    // If a specific promotion code was provided (not used anymore, but kept for future flexibility)
    if (promotionCode) {
      checkoutOptions.discounts = [
        {
          promotion_code: promotionCode
        }
      ];
    }
    
    logStep("Creating checkout session with options", checkoutOptions);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(checkoutOptions);
    logStep("Created checkout session", session.id);
    
    // Record payment attempt in database (as pending)
    try {
      const { error: paymentError } = await supabaseAdmin
        .from('user_payments')
        .insert({
          user_id: user.id,
          stripe_customer_id: customerId,
          stripe_session_id: session.id,
          payment_status: 'pending',
          amount: 9900, // $99.00
          updated_at: new Date().toISOString()
        });
      
      if (paymentError) {
        logStep("Error creating payment record", paymentError);
      }
    } catch (dbError) {
      logStep("Database exception", dbError);
      // Continue even if DB insert fails, as Stripe session is already created
    }

    // Return success with checkout URL
    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (err) {
    // Log any errors
    console.error("Error in create-payment function:", err);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
