
import React from 'react';

interface PromoCodeInputProps {
  showPromoField: boolean;
  setShowPromoField: (show: boolean) => void;
  promotionCode: string;
  setPromotionCode: (code: string) => void;
}

// NOTE: This component is no longer used since we're letting Stripe handle promo codes
// Kept for reference only and to prevent build errors
const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  showPromoField,
  setShowPromoField,
  promotionCode,
  setPromotionCode
}) => {
  if (showPromoField) {
    return (
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
    );
  }

  return (
    <div className="mb-4 text-center">
      <button 
        onClick={() => setShowPromoField(true)}
        className="text-blue-500 text-sm underline"
      >
        Have a promo code?
      </button>
    </div>
  );
};

export default PromoCodeInput;
