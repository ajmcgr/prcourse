
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import PricingCard from './pricing/PricingCard';

const PricingSection: React.FC = () => {
  const { user, updatePaymentStatus } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState<string>('');
  
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Pricing Card */}
        <div className="md:w-2/5 max-w-md">
          <PricingCard 
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            error={error}
            isProcessing={isProcessing}
            handlePurchase={handlePurchase}
            user={user}
            updatePaymentStatus={updatePaymentStatus}
            navigate={navigate}
          />
        </div>
        
        {/* Image section */}
        <div className="md:w-2/5 max-w-md">
          <div className="rounded-lg overflow-hidden h-full">
            <img 
              src="/lovable-uploads/b901b1d3-44f5-41f3-b4e2-64eede3ed545.png" 
              alt="Alex MacGregor" 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
