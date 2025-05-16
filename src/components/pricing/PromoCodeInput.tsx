
import React from 'react';
import { Input } from '@/components/ui/input';

interface PromoCodeInputProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  isProcessing: boolean;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ promoCode, setPromoCode, isProcessing }) => {
  return (
    <div className="mb-4">
      <div className="flex gap-2">
        <Input 
          placeholder="Promo code (optional)" 
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full"
          disabled={isProcessing}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">Enter a promo code if you have one</p>
    </div>
  );
};

export default PromoCodeInput;
