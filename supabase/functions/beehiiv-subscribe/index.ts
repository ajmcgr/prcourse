
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const BEEHIIV_API_KEY = Deno.env.get("BEEHIIV_API_KEY");
const PUBLICATION_ID = Deno.env.get("BEEHIIV_PUBLICATION_ID") || "b92dabcc-1263-44de-a248-69ea4b8fc02f"; 

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SubscriberData {
  email: string;
  name?: string;
  utm_source?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, utm_source = "pr_masterclass_website" }: SubscriberData = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Adding subscriber to beehiiv: ${email}`);

    // Use only the environment variable for the API key, don't use hardcoded fallback
    const apiKey = BEEHIIV_API_KEY;
    
    // If no API key is provided, return early with success but indicate beehiiv was skipped
    if (!apiKey) {
      console.log("No BEEHIIV_API_KEY provided, skipping beehiiv subscription");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Skipped beehiiv subscription due to missing API key",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Try calling the beehiiv API, but don't let it block signup if it fails
    try {
      const response = await fetch(
        `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            email: email,
            name: name || undefined,
            utm_source: utm_source,
            send_welcome_email: true,
            reactivate_existing: false,
          }),
        }
      );

      const responseData = await response.json();
      console.log("Beehiiv API response:", JSON.stringify(responseData));

      if (!response.ok) {
        console.error("beehiiv API error:", responseData);
        // Return success anyway - we don't want this to block signup
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "User signup successful, but beehiiv subscription failed",
            beehiiv_error: responseData
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Successfully subscribed to newsletter",
          data: responseData
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (beehiivError) {
      console.error("Error calling beehiiv API:", beehiivError);
      // Return success anyway - we don't want this to block signup
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "User signup successful, but beehiiv subscription failed",
          beehiiv_error: beehiivError.message
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error in beehiiv-subscribe function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
