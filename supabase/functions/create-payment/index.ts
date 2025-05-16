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
    // Extract request body
    const requestData = await req.json();
    const returnUrl = requestData.returnUrl || 'https://prcourse.alexmacgregor.com/payment-success';
    const promoCode = requestData.promoCode || null; // Get promotion code if provided
    
    logStep("Request received", { returnUrl, promoCode });

    // Check if Stripe secret key is properly configured
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey || stripeKey.trim() === "") {
      logStep("ERROR: Stripe secret key is missing");
      return new Response(
        JSON.stringify({ error: "Stripe configuration error - missing API key" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    logStep("Stripe API key verified");
    
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      logStep("Authorization error - Missing header");
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
    logStep("Using success URL", { successUrl });

    // Initialize Stripe with detailed error handling
    let stripe;
    try {
      stripe = new Stripe(stripeKey, {
        apiVersion: "2023-10-16",
        httpClient: Stripe.createFetchHttpClient()
      });
      logStep("Stripe client initialized successfully");
    } catch (stripeInitError: any) {
      logStep("Failed to initialize Stripe client", stripeInitError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to initialize Stripe", 
          details: stripeInitError.message 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for existing Stripe customer
    let customerId: string;
    try {
      logStep("Checking for existing Stripe customer", { email: user.email });
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      
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
    } catch (customerError: any) {
      logStep("Error handling Stripe customer", customerError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to create or retrieve customer", 
          details: customerError.message 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
      allow_promotion_codes: true, // Always allow promotion codes
    };
    
    // Add specific promotion code if provided
    if (promoCode) {
      logStep("Using provided promotion code", { promoCode });
      try {
        // Verify the promotion code exists first
        const promoResponse = await stripe.promotionCodes.list({
          code: promoCode,
          active: true,
          limit: 1
        });
        
        if (promoResponse.data.length > 0) {
          const promoId = promoResponse.data[0].id;
          checkoutOptions.discounts = [
            {
              promotion_code: promoId
            }
          ];
          logStep("Applied specific promotion code", { promoId });
        } else {
          logStep("Provided promotion code not found or inactive", { promoCode });
          // Continue without the specific code, but still allow user to enter codes
        }
      } catch (promoError: any) {
        logStep("Error validating promotion code", promoError);
        // Continue without the specific code, but still allow user to enter codes
      }
    }
    
    logStep("Creating checkout session with options", {
      customerId,
      mode: checkoutOptions.mode,
      successUrl: checkoutOptions.success_url,
      cancelUrl: checkoutOptions.cancel_url,
      allowPromotionCodes: checkoutOptions.allow_promotion_codes
    });

    // Create Stripe checkout session with enhanced error handling
    let session;
    try {
      session = await stripe.checkout.sessions.create(checkoutOptions);
      logStep("Created checkout session", { 
        sessionId: session.id,
        url: session.url,
        paymentStatus: session.payment_status
      });
    } catch (checkoutError: any) {
      // Log detailed error information for debugging
      logStep("Stripe checkout session creation failed", {
        error: checkoutError.message,
        type: checkoutError.type,
        code: checkoutError.code,
        param: checkoutError.param,
        detail: checkoutError.detail,
        requestId: checkoutError.requestId
      });
      
      return new Response(
        JSON.stringify({ 
          error: "Failed to create Stripe checkout session", 
          details: checkoutError.message 
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!session || !session.url) {
      logStep("Stripe returned invalid session", session);
      return new Response(
        JSON.stringify({ error: "Invalid session returned from Stripe" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Record payment attempt in database (as pending)
    try {
      // First check if there's an existing pending payment for this session to avoid duplicates
      logStep("Checking for existing payment record for session", { sessionId: session.id });
      
      const { data: existingPayment, error: checkError } = await supabaseAdmin
        .from('user_payments')
        .select('id')
        .eq('stripe_session_id', session.id)
        .limit(1);
        
      if (checkError) {
        logStep("Error checking for existing payment record", checkError);
      }
      
      if (existingPayment && existingPayment.length > 0) {
        logStep("Found existing payment record for this session, skipping insert", { paymentId: existingPayment[0].id });
      } else {
        // Create a new payment record
        logStep("Creating new payment record");
        
        const { data: insertData, error: insertError } = await supabaseAdmin
          .from('user_payments')
          .insert({
            user_id: user.id,
            stripe_customer_id: customerId,
            stripe_session_id: session.id,
            payment_status: 'pending',
            amount: 9900, // $99.00
            updated_at: new Date().toISOString()
          });
          
        if (insertError) {
          logStep("Error creating payment record", insertError);
          console.error("Error creating payment record:", insertError);
          // Continue despite error, as Stripe session is already created
        } else {
          logStep("Payment record created successfully");
        }
      }
    } catch (dbError) {
      logStep("Database exception", dbError);
      console.error("Error creating payment record:", dbError);
      // Continue even if DB insert fails, as Stripe session is already created
    }

    logStep("Returning checkout URL to client", { url: session.url });
    
    // Return success with checkout URL
    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (err) {
    // Log any errors
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error in create-payment function:", errorMessage);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
