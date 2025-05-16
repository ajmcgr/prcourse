
import React from 'react';
import { Button } from '@/components/ui/button';

interface PurchaseButtonProps {
  handlePurchase: () => void;
  isProcessing: boolean;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ handlePurchase, isProcessing }) => {
  return (
    <div className="flex justify-center">
      <Button 
        onClick={handlePurchase} 
        disabled={isProcessing}
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg px-10"
      >
        {isProcessing ? 'Processing...' : 'Buy Now — $99'}
      </Button>
    </div>
  );
};

export default PurchaseButton;
