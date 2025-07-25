
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

const Hero: React.FC = () => {
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
      
      // Open Stripe checkout in a new tab instead of current window
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
    <div className="relative h-auto flex items-center bg-background -mt-16 pt-24 md:pt-20"> 
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-28 flex flex-col items-center text-center">
        <p className="text-xs md:text-sm tracking-normal font-medium text-gray-600 mb-4 animate-fade-in">
          Made for PR & Social Media Pros, Agencies and Freelancers
        </p>
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight animate-fade-in text-pr-dark">
          Master the Art of <br />
          Public Relations
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl max-w-3xl animate-fade-in text-gray-700" style={{animationDelay: '0.2s'}}>
          My comprehensive course with video lessons and practical insights to help you elevate your PR strategy and execution.
        </p>
        
        <div className="mt-6 md:mt-12 w-full animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <Button 
              size="lg" 
              className="w-full md:w-auto bg-[#409EFF] hover:bg-[#409EFF]/90 text-white font-medium text-sm md:text-base px-4 md:px-8 py-5 md:py-6"
              onClick={handleStripeCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Get Access Now for $99'}
            </Button>
            
            {/* Senja Widget - Optimized for mobile */}
            <div className="w-full md:w-auto md:min-w-[300px] md:max-w-[400px] mt-4 md:mt-0">
              <div className="senja-embed" data-id="07ff3942-eab2-49dd-8952-8e59761f1472" data-mode="shadow" data-lazyload="false" style={{ display: "block", width: "100%" }}></div>
            </div>
          </div>
        </div>
        
        {/* Secure access text row - Mobile optimized - Made smaller */}
        <div className="flex justify-center mt-4 md:mt-6 text-gray-700 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-row items-center space-x-6'} text-xs md:text-sm font-medium`}>
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
        
        {/* Course Preview Image - Updated with the newly uploaded image */}
        <div className="w-full mt-6 md:mt-12 px-2 md:px-6 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="max-w-5xl mx-auto">
            <img 
              src="/lovable-uploads/9025b976-a608-42de-b3b0-5c9d196b1de5.png" 
              alt="Effective Media Pitches" 
              className="w-full rounded-lg shadow-md border border-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
