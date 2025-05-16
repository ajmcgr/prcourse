
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PricingCard from './pricing/PricingCard';
import PricingImage from './pricing/PricingImage';
import usePaymentProcessor from './pricing/PaymentProcessor';

const PricingSection: React.FC = () => {
  const { user, updatePaymentStatus } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState<string>('');
  
  // Use the custom hook to get payment processing functions and state
  const { handlePurchase, isProcessing, error } = usePaymentProcessor({ 
    user, 
    navigate, 
    promoCode 
  });

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
        <PricingImage />
      </div>
    </div>
  );
};

export default PricingSection;
