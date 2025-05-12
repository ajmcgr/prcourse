
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

const PaymentSuccessPage = () => {
  const { user, updatePaymentStatus } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const updateUserPaymentStatus = async () => {
      if (!user) {
        console.log("No user found, cannot update payment status");
        setIsProcessing(false);
        return;
      }

      try {
        console.log("Processing payment success for user:", user.id);
        setIsProcessing(true);
        
        // Check if payment record already exists for this user
        const { data: existingPayment, error: fetchError } = await supabase
          .from('user_payments')
          .select('*')
          .eq('user_id', user.id)
          .eq('payment_status', 'completed')
          .maybeSingle();
          
        if (fetchError) {
          console.error('Error fetching payment status:', fetchError);
        }
        
        if (existingPayment) {
          console.log("User already has a completed payment record:", existingPayment);
          updatePaymentStatus(true);
          setIsComplete(true);
          setIsProcessing(false);
          return;
        }
        
        // Record successful payment in database
        const { error } = await supabase
          .from('user_payments')
          .upsert({
            user_id: user.id,
            payment_status: 'completed',
            amount: 9900, // $99.00 in cents
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, { onConflict: 'user_id' });

        if (error) {
          console.error('Error updating payment status:', error);
          toast.error("There was an issue updating your payment status. Please contact support.");
          setIsProcessing(false);
          return;
        }

        console.log("Payment status updated successfully in database");
        
        // Update context state to reflect successful payment
        updatePaymentStatus(true);
        setIsComplete(true);
        toast.success("Payment successful! You now have full access to the course.");
      } catch (err) {
        console.error('Error in payment success handling:', err);
        toast.error("There was an error processing your payment confirmation.");
      } finally {
        setIsProcessing(false);
      }
    };

    updateUserPaymentStatus();
  }, [user, updatePaymentStatus]);

  // Redirect to course intro if payment completed and processing finished
  useEffect(() => {
    if (isComplete && !isProcessing) {
      // Short delay before redirecting to ensure context is updated
      const redirectTimer = setTimeout(() => {
        navigate('/course/introduction');
      }, 2000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [isComplete, isProcessing, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-md w-full px-4 sm:px-6 text-center">
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-pr-dark mb-4">Thank You for Your Purchase!</h1>
          
          {isProcessing ? (
            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                Processing your payment...
              </p>
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 mb-8">
              Your payment was successful. You now have full access to the PR Masterclass course.
              {isComplete ? " Redirecting you to the course now..." : " All content is now available in your account."}
            </p>
          )}
          
          <div className="space-y-4">
            <Button 
              asChild 
              className="w-full bg-black hover:bg-black/90"
              disabled={isProcessing}
            >
              <Link to="/course/introduction">Access Course Content</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="w-full"
              disabled={isProcessing}
            >
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
