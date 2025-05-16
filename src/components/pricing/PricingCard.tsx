
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PricingFeatures from './PricingFeatures';
import PurchaseButton from './PurchaseButton';
import DeveloperTools from './DeveloperTools';
import Testimonial from './Testimonial';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  error: string | null;
  isProcessing: boolean;
  handlePurchase: () => Promise<void>;
  isBusinessUser: boolean;
  handleForceSetPaid: () => Promise<void>;
  handleSpecialDebug: () => Promise<void>;
}

const PricingCard: React.FC<PricingCardProps> = ({
  error,
  isProcessing,
  handlePurchase,
  isBusinessUser,
  handleForceSetPaid,
  handleSpecialDebug
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
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <PurchaseButton 
            isProcessing={isProcessing}
            onClick={handlePurchase}
          />
          
          <div className="mt-4 space-y-2">
            <div className="text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm text-blue-500">
                    Have a promo code?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Promotion Code Information</DialogTitle>
                    <DialogDescription className="pt-4">
                      <p className="mb-4">You can enter your promotion code on the Stripe checkout page that appears after clicking "Buy Now".</p>
                      <p className="mb-4">Look for the "Add promotion code" text under the payment amount.</p>
                      <div className="p-3 bg-blue-50 text-blue-700 rounded-md">
                        If you're experiencing issues with promotion codes, please contact support.
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
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
