
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const PricingSection: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, updatePaymentStatus } = useAuth();
  const navigate = useNavigate();
  
  const handlePurchase = async () => {
    setIsProcessing(true);
    
    try {
      if (!user) {
        // Redirect to signup if not logged in
        navigate('/signup', { state: { returnTo: '/pricing' } });
        return;
      }

      // Call Supabase function to create payment session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { userId: user.id }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("There was a problem starting your payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image and content section - Now on the left */}
        <div className="md:w-1/2">
          <div className="mb-6">
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/b448d17b-1318-4e45-99ec-e548b4abc6c1.png" 
                alt="Alex MacGregor" 
                className="w-2/3 h-auto object-cover rounded-lg mx-auto" 
              />
            </div>
          </div>
        </div>
        
        {/* Pricing Card - Now on the right */}
        <div className="md:w-1/2">
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
                  disabled={isProcessing} 
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg px-10"
                >
                  {isProcessing ? "Processing..." : "Buy Now — $99"}
                </Button>
              </div>
              
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
      </div>
    </div>
  );
};

export default PricingSection;
