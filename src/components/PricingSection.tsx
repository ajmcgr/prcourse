import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const PricingSection: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handlePurchase = async () => {
    setIsProcessing(true);
    
    try {
      // Always direct to signup first
      navigate('/signup', { state: { returnTo: '/pricing' } });
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error("There was a problem. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold text-pr-dark mb-6">What You'll Get</h2>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Immediate access to all course materials</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">4 in-depth video lessons on PR strategy</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">4 comprehensive essays on modern PR techniques</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Lifetime updates to course content</span>
            </li>
          </ul>
          <div className="bg-white border rounded-lg p-4 mb-6">
            <p className="text-gray-700 italic">
              "This course completely transformed our company's PR approach. The practical strategies were 
              incredibly valuable and immediately applicable."
            </p>
            <p className="mt-2 font-medium text-pr-dark">— David Miller, Communications Director</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
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
              <span>All video lessons</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>All written materials</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Future updates</span>
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>30-day money-back guarantee</span>
            </div>
          </div>
          
          <Button 
            onClick={handlePurchase} 
            disabled={isProcessing} 
            className="w-full bg-black hover:bg-black/90 text-white py-3 text-lg"
          >
            {isProcessing ? "Processing..." : "Buy Now — $99"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
