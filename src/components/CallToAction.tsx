
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

const CallToAction: React.FC = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = React.useState(false);
  
  const handleStripeCheckout = async () => {
    try {
      // If not logged in, redirect to signup
      if (!user) {
        toast.info("Please sign in to continue with purchase");
        navigate('/signup');
        return;
      }
      
      setIsProcessing(true);
      console.log("Starting direct payment process for user:", user.id);
      
      // Create payment session using edge function
      console.log("Creating payment checkout session");
      const { data, error: invokeError } = await supabase.functions.invoke("create-payment", {
        body: {
          returnUrl: `${window.location.origin}/payment-success`
        }
      });
      
      if (invokeError) {
        console.error("Payment function invoke error:", invokeError);
        toast.error("Failed to start payment process. Please try again.");
        setIsProcessing(false);
        return;
      }
      
      if (!data || !data.url) {
        console.error("No redirect URL returned from payment function", data);
        toast.error("Payment setup failed. Please try again later.");
        setIsProcessing(false);
        return;
      }
      
      console.log("Redirecting to Stripe payment URL:", data.url);
      
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      setIsProcessing(false);
    } catch (err: any) {
      const errorMessage = err?.message || 'Unknown error occurred';
      console.error('Purchase error:', err);
      toast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="bg-background py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Master Public Relations?</h2>
        <p className="text-base md:text-xl mb-6 md:mb-8 text-gray-700">
          Join my comprehensive PR course and transform your PR strategy today.
        </p>
        <Button 
          size="lg" 
          className="bg-[#409EFF] hover:bg-[#409EFF]/90 text-white font-medium text-sm md:text-base px-4 md:px-6 py-5 md:py-6 w-full md:w-auto"
          onClick={handleStripeCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Get Access Now for $99'}
        </Button>
        
        {/* Added secure access text row with mobile optimization - Made smaller */}
        <div className="flex justify-center mt-4 text-gray-700">
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-3'} text-xs font-medium`}>
            <span className="flex items-center justify-center">
              <Check className="h-3 w-3 mr-1" />
              Get access now
            </span>
            <span className="flex items-center justify-center">
              <Check className="h-3 w-3 mr-1" />
              Secure payment
            </span>
            <span className="flex items-center justify-center">
              <Check className="h-3 w-3 mr-1" />
              Money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
