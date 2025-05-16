
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PricingFeatures from './PricingFeatures';
import PromoCodeInput from './PromoCodeInput';
import PurchaseButton from './PurchaseButton';
import DeveloperTools from './DeveloperTools';
import Testimonial from './Testimonial';

interface PricingCardProps {
  error: string | null;
  isProcessing: boolean;
  promotionCode: string;
  setPromotionCode: (code: string) => void;
  handlePurchase: () => Promise<void>;
  isBusinessUser: boolean;
  handleForceSetPaid: () => Promise<void>;
  handleSpecialDebug: () => Promise<void>;
  showPromoField: boolean;
  setShowPromoField: (show: boolean) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  error,
  isProcessing,
  promotionCode,
  setPromotionCode,
  handlePurchase,
  isBusinessUser,
  handleForceSetPaid,
  handleSpecialDebug,
  showPromoField,
  setShowPromoField
}) => {
  return (
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
          
          <PricingFeatures />
          
          <PromoCodeInput 
            showPromoField={showPromoField}
            setShowPromoField={setShowPromoField}
            promotionCode={promotionCode}
            setPromotionCode={setPromotionCode}
          />
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <PurchaseButton 
            isProcessing={isProcessing}
            onClick={handlePurchase}
          />
          
          {/* Development tools - only show in dev environment */}
          {(import.meta.env.DEV || isBusinessUser) && (
            <DeveloperTools 
              handleForceSetPaid={handleForceSetPaid}
              isBusinessUser={isBusinessUser}
              handleSpecialDebug={handleSpecialDebug}
            />
          )}
          
          <Testimonial />
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingCard;
