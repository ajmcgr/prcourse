
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

// Import the new components
import PricingCard from './pricing/PricingCard';
import PricingImage from './pricing/PricingImage';

const PricingSection: React.FC = () => {
  const { user, updatePaymentStatus } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handlePurchase = async () => {
    try {
      setIsProcessing(true);
      setError(null);
      
      if (!user) {
        toast.info("Please sign in to continue with purchase");
        navigate('/signup');
        return;
      }
      
      console.log("Starting payment process for user:", user.id);
      
      // Create payment session using our edge function
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          // Ensure we're using the full origin (including protocol) for the success URL
          returnUrl: `${window.location.origin}/payment-success`,
        }
      });
      
      if (error) {
        console.error("Payment creation failed:", error);
        setError("Failed to create payment session. Please try again.");
        toast.error("Failed to create payment session. Please try again.");
        return;
      }
      
      if (!data?.url) {
        console.error("No redirect URL returned from payment function");
        setError("Payment processing error. Please try again.");
        toast.error("Payment processing error. Please try again.");
        return;
      }
      
      console.log("Redirecting to Stripe payment URL:", data.url);
      // Redirect to Stripe checkout page
      window.location.href = data.url;
    } catch (err) {
      console.error('Purchase error:', err);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Create a function to immediately record a payment (for testing)
  const handleForceSetPaid = async () => {
    if (!user) {
      toast.error("You must be logged in to set payment status");
      return;
    }
    
    try {
      toast.loading("Setting payment status...");
      const result = await updatePaymentStatus(true);
      
      if (result.error) {
        toast.error("Failed to update payment status: " + result.error.message);
      } else {
        toast.success("Payment status updated successfully!");
        navigate('/course/introduction');
      }
    } catch (err) {
      console.error("Error setting payment status:", err);
      toast.error("Error updating payment status");
    }
  };
  
  // Special debug function for business@hypeworkspod.com user
  const isBusinessUser = user?.email === 'business@hypeworkspod.com';
  const handleSpecialDebug = async () => {
    if (!user) return;
    
    try {
      // Check existing records
      const { data: existingPayment, error: fetchError } = await supabase
        .from('user_payments')
        .select('*')
        .eq('user_id', user.id);
      
      console.log("Current payment records:", existingPayment);
      
      // Directly insert a payment record
      const { data, error } = await supabase
        .from('user_payments')
        .insert({
          user_id: user.id,
          payment_status: 'completed',
          amount: 9900,
          stripe_session_id: 'manual_override_' + Date.now(),
          updated_at: new Date().toISOString()
        });
        
      if (error) {
        console.error("Insert payment error:", error);
        toast.error("Failed to insert payment record");
      } else {
        toast.success("Payment record inserted! Try accessing the course now.");
        setTimeout(() => {
          window.location.href = '/course';
        }, 1500);
      }
    } catch (err) {
      console.error("Debug error:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Pricing Card Component */}
        <PricingCard 
          error={error}
          isProcessing={isProcessing}
          handlePurchase={handlePurchase}
          isBusinessUser={isBusinessUser}
          handleForceSetPaid={handleForceSetPaid}
          handleSpecialDebug={handleSpecialDebug}
        />
        
        {/* Image section */}
        <PricingImage />
      </div>
    </div>
  );
};

export default PricingSection;
