
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const PricingSection: React.FC = () => {
  const { user, updatePaymentStatus } = useAuth();
  const navigate = useNavigate();
  
  const handlePurchase = async () => {
    try {
      if (!user) {
        toast.info("Please sign in to continue with purchase");
        navigate('/signup');
        return;
      }
      
      console.log("Starting payment process for user:", user.id);
      
      // Create payment session using our edge function
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          returnUrl: `${window.location.origin}/payment-success`
        }
      });
      
      if (error) {
        console.error("Payment creation failed:", error);
        toast.error("Failed to create payment session. Please try again.");
        return;
      }
      
      if (!data?.url) {
        console.error("No redirect URL returned from payment function");
        toast.error("Payment processing error. Please try again.");
        return;
      }
      
      console.log("Redirecting to Stripe payment URL:", data.url);
      window.location.href = data.url;
    } catch (err) {
      console.error('Purchase error:', err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Create a function to immediately record a payment (for testing)
  const handleForceSetPaid = async () => {
    if (!user) {
      toast.error("You must be logged in to set payment status");
      return;
    }
    
    try {
      toast.loading("Setting payment status...");
      const result = await updatePaymentStatus(true);
      
      if (result.error) {
        toast.error("Failed to update payment status: " + result.error.message);
      } else {
        toast.success("Payment status updated successfully!");
        navigate('/course/introduction');
      }
    } catch (err) {
      console.error("Error setting payment status:", err);
      toast.error("Error updating payment status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Pricing Card */}
        <div className="md:w-2/3">
          <Card className="border shadow-sm h-full">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-pr-dark mb-2">Complete PR Course</h3>
                <div className="flex items-center justify-center">
                  <span className="text-5xl font-bold">$99</span>
                  <span className="ml-1 text-gray-600">/one-time</span>
                </div>
                <p className="mt-2 text-gray-500">Lifetime access to all content</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>The full blueprint to learn the A-Z of PR</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Full chapter content; text, audio and videos</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Suitable for both beginners and professionals</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handlePurchase} 
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg px-10"
                >
                  Buy Now — $99
                </Button>
              </div>
              
              {/* Development tools - only show in dev environment */}
              {import.meta.env.DEV && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">Development Tools</p>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleForceSetPaid} 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      Force Set Paid
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Testimonial */}
              <div className="mt-6 bg-white border rounded-lg p-4">
                <p className="text-gray-700 italic text-sm">
                  "This course completely transformed our company's PR approach. The practical strategies were 
                  incredibly valuable and immediately applicable."
                </p>
                <p className="mt-2 font-medium text-pr-dark text-sm">— David Miller, Communications Director</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Image section */}
        <div className="md:w-1/3">
          <div className="mb-6">
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/b448d17b-1318-4e45-99ec-e548b4abc6c1.png" 
                alt="Alex MacGregor" 
                className="w-full h-auto object-cover rounded-lg mx-auto" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
