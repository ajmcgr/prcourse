
import React from 'react';
import { Button } from '@/components/ui/button';

interface PurchaseButtonProps {
  isProcessing: boolean;
  onClick: () => void;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({ isProcessing, onClick }) => {
  return (
    <div className="flex justify-center">
      <Button 
        onClick={onClick} 
        className="bg-blue-500 hover:bg-blue-600 text-white py-3 text-lg px-10"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Buy Now — $99"}
      </Button>
    </div>
  );
};

export default PurchaseButton;
