
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { toast } from "sonner";
import { NavigateFunction } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

interface UsePaymentProcessorProps {
  user: User | null;
  navigate: NavigateFunction;
  promoCode: string;
}

const usePaymentProcessor = ({ user, navigate, promoCode }: UsePaymentProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handlePurchase = async () => {
    try {
      if (!user) {
        toast.info("Please sign in to continue with purchase");
        navigate('/signup');
        return;
      }
      
      setIsProcessing(true);
      setError(null);
      console.log("Starting payment process for user:", user.id);
      
      if (promoCode) {
        console.log("Using promo code:", promoCode);
      }
      
      // Create payment session using edge function
      console.log("Creating payment checkout session");
      const { data, error: invokeError } = await supabase.functions.invoke("create-payment", {
        body: {
          returnUrl: `${window.location.origin}/payment-success`,
          promoCode: promoCode.trim() || undefined // Include promo code if entered
        }
      });
      
      if (invokeError) {
        console.error("Payment function invoke error:", invokeError);
        setError(`Payment processing failed: ${invokeError.message || 'Unknown error'}`);
        toast.error("Failed to start payment process. Please try again.");
        setIsProcessing(false);
        return;
      }
      
      if (!data || !data.url) {
        console.error("No redirect URL returned from payment function", data);
        setError("No payment URL returned from server");
        toast.error("Payment setup failed. Please try again later.");
        setIsProcessing(false);
        return;
      }
      
      console.log("Redirecting to Stripe payment URL:", data.url);
      
      // Redirect directly to the Stripe checkout URL in the current window
      window.location.href = data.url;
    } catch (err: any) {
      const errorMessage = err?.message || 'Unknown error occurred';
      console.error('Purchase error:', err);
      setError(errorMessage);
      toast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return { handlePurchase, isProcessing, error };
};

export default usePaymentProcessor;

