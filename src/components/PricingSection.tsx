
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const PricingSection: React.FC = () => {
  const { user, updatePaymentStatus } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [promotionCode, setPromotionCode] = useState('');
  const [showPromoField, setShowPromoField] = useState(false);
  
  const handlePurchase = async () => {
    try {
      setIsProcessing(true);
      
      if (!user) {
        toast.info("Please sign in to continue with purchase");
        navigate('/signup');
        return;
      }
      
      console.log("Starting payment process for user:", user.id);
      
      // Create payment session using our edge function
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          // Ensure we're using the full origin (including protocol) for the success URL
          returnUrl: `${window.location.origin}/payment-success`,
          // Pass promotion code if entered
          promotionCode: promotionCode || undefined
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
      // Redirect to Stripe checkout page
      window.location.href = data.url;
    } catch (err) {
      console.error('Purchase error:', err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
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
  
  // Special debug function for business@hypeworkspod.com user
  const isBusinessUser = user?.email === 'business@hypeworkspod.com';
  const handleSpecialDebug = async () => {
    if (!user) return;
    
    try {
      // Check existing records
      const { data: existingPayment, error: fetchError } = await supabase
        .from('user_payments')
        .select('*')
        .eq('user_id', user.id);
      
      console.log("Current payment records:", existingPayment);
      
      // Directly insert a payment record
      const { data, error } = await supabase
        .from('user_payments')
        .insert({
          user_id: user.id,
          payment_status: 'completed',
          amount: 9900,
          stripe_session_id: 'manual_override_' + Date.now(),
          updated_at: new Date().toISOString()
        });
        
      if (error) {
        console.error("Insert payment error:", error);
        toast.error("Failed to insert payment record");
      } else {
        toast.success("Payment record inserted! Try accessing the course now.");
        setTimeout(() => {
          window.location.href = '/course';
        }, 1500);
      }
    } catch (err) {
      console.error("Debug error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Pricing Card - reduced width */}
        <div className="md:w-2/5 max-w-md">
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
              
              {/* Promo code section */}
              {showPromoField ? (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <input
                      type="text"
                      value={promotionCode}
                      onChange={(e) => setPromotionCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="border rounded px-3 py-2 w-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mb-2">Enter your promo code above if you have one</p>
                </div>
              ) : (
                <div className="mb-4 text-center">
                  <button 
                    onClick={() => setShowPromoField(true)}
                    className="text-blue-500 text-sm underline"
                  >
                    Have a promo code?
                  </button>
                </div>
              )}
              
              <div className="flex justify-center">
                <Button 
                  onClick={handlePurchase} 
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg px-10"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Buy Now — $99"}
                </Button>
              </div>
              
              {/* Development tools - only show in dev environment */}
              {(import.meta.env.DEV || isBusinessUser) && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-xs text-gray-500 mb-2">Development Tools</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      onClick={handleForceSetPaid} 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      Force Set Paid
                    </Button>
                    
                    {isBusinessUser && (
                      <Button 
                        onClick={handleSpecialDebug} 
                        variant="outline" 
                        size="sm"
                        className="text-xs bg-amber-100"
                      >
                        Fix Business User Access
                      </Button>
                    )}
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
        
        {/* Image section - reduced width */}
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
