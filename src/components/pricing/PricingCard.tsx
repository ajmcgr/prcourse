
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PricingFeatureList from './PricingFeatureList';
import PromoCodeInput from './PromoCodeInput';
import ErrorDisplay from './ErrorDisplay';
import PurchaseButton from './PurchaseButton';
import PricingTestimonial from './PricingTestimonial';
import TestingTools from './TestingTools';
import { User } from '@supabase/supabase-js';
import { NavigateFunction } from 'react-router-dom';

interface PricingCardProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  error: string | null;
  isProcessing: boolean;
  handlePurchase: () => void;
  user: User | null;
  updatePaymentStatus: (status: boolean) => Promise<{ error?: any }>;
  navigate: NavigateFunction;
}

const PricingCard: React.FC<PricingCardProps> = ({
  promoCode,
  setPromoCode,
  error,
  isProcessing,
  handlePurchase,
  user,
  updatePaymentStatus,
  navigate
}) => {
  return (
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
        
        <PricingFeatureList />
        
        <PromoCodeInput 
          promoCode={promoCode} 
          setPromoCode={setPromoCode}
          isProcessing={isProcessing}
        />
        
        <ErrorDisplay error={error} />
        
        <PurchaseButton 
          handlePurchase={handlePurchase}
          isProcessing={isProcessing}
        />
        
        <TestingTools 
          user={user} 
          updatePaymentStatus={updatePaymentStatus} 
          navigate={navigate} 
        />
        
        <PricingTestimonial />
      </CardContent>
    </Card>
  );
};

export default PricingCard;
