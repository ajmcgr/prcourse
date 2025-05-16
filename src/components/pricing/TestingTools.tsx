
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { NavigateFunction } from 'react-router-dom';

interface TestingToolsProps {
  user: User | null;
  updatePaymentStatus: (status: boolean) => Promise<{ error?: any }>;
  navigate: NavigateFunction;
}

const TestingTools: React.FC<TestingToolsProps> = ({ user, updatePaymentStatus, navigate }) => {
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

  // For development/testing only
  const isTestEnvironment = import.meta.env.DEV || user?.email === 'business@hypeworkspod.com';

  if (!isTestEnvironment) return null;

  return (
    <div className="mt-4 border-t pt-4">
      <p className="text-xs text-gray-500 mb-2">Development Tools</p>
      <div className="flex gap-2 flex-wrap">
        <Button 
          onClick={handleForceSetPaid} 
          variant="outline" 
          size="sm"
          className="text-xs"
        >
          Force Set Paid
        </Button>
        
        {user?.email === 'business@hypeworkspod.com' && (
          <Button 
            onClick={handleSpecialDebug} 
            variant="outline" 
            size="sm"
            className="text-xs bg-amber-100"
          >
            Fix Business User Access
          </Button>
        )}
      </div>
    </div>
  );
};

export default TestingTools;
