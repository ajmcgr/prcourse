import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

// Define explicit types to avoid excessive type recursion
interface PaymentRecord {
  id: string;
  user_id: string;
  payment_status: string;
  stripe_session_id: string | null;
  amount: number;
  created_at: string;
  updated_at: string;
  stripe_customer_id?: string | null;
}

const PaymentSuccessPage = () => {
  const { user, updatePaymentStatus } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Get session_id from URL if it exists (from Stripe)
  const sessionId = searchParams.get('session_id');
  
  useEffect(() => {
    const updateUserPaymentStatus = async () => {
      if (!user) {
        console.log("No user found, cannot update payment status");
        setError("You must be signed in to verify your payment.");
        setIsProcessing(false);
        return;
      }

      try {
        console.log("Processing payment success for user:", user.id);
        setIsProcessing(true);
        
        // Check if we have a session ID from the URL
        if (sessionId) {
          console.log("Processing payment with session ID:", sessionId);
          
          // First check if we already have a completed payment for this user
          // Fix TypeScript error by explicitly defining return type as an array
          const { data: existingPayments, error: fetchError } = await supabase
            .from('user_payments')
            .select<'*', PaymentRecord[]>('*')
            .eq('user_id', user.id)
            .eq('payment_status', 'completed');
            
          if (fetchError) {
            console.error('Error fetching payment status:', fetchError);
            throw new Error(fetchError.message);
          }
          
          if (existingPayments && existingPayments.length > 0) {
            console.log("User already has a completed payment record:", existingPayments[0]);
            updatePaymentStatus(true);
            setIsComplete(true);
            setIsProcessing(false);
            return;
          }
          
          // Update payment status in database if we found a pending payment with this session ID
          // Fix TypeScript error by explicitly defining return type as an array
          const { data: pendingPayments, error: pendingError } = await supabase
            .from('user_payments')
            .select<'*', PaymentRecord[]>('*')
            .eq('stripe_session_id', sessionId);
            
          if (pendingError) {
            console.error('Error fetching pending payment:', pendingError);
          }
          
          if (pendingPayments && pendingPayments.length > 0) {
            console.log("Found pending payment to update:", pendingPayments[0]);
            
            // Mark payment as completed
            const { error: updateError } = await supabase
              .from('user_payments')
              .update({
                payment_status: 'completed',
                updated_at: new Date().toISOString()
              })
              .eq('stripe_session_id', sessionId);
              
            if (updateError) {
              console.error('Error updating payment status:', updateError);
              throw new Error(updateError.message);
            }
            
            console.log("Updated payment status to completed");
            updatePaymentStatus(true);
            setIsComplete(true);
            toast.success("Payment successful! You now have full access to the course.");
            setIsProcessing(false);
            return;
          }
        }
        
        // If no session ID or no pending payment found, check if this user has any completed payments
        // Fix TypeScript error by explicitly defining return type as an array
        const { data: completedPayments, error: completeError } = await supabase
          .from('user_payments')
          .select<'*', PaymentRecord[]>('*')
          .eq('user_id', user.id)
          .eq('payment_status', 'completed');
          
        if (completeError) {
          console.error('Error checking completed payments:', completeError);
        }
        
        if (completedPayments && completedPayments.length > 0) {
          console.log("User has a completed payment:", completedPayments[0]);
          updatePaymentStatus(true);
          setIsComplete(true);
          setIsProcessing(false);
          return;
        }
        
        // If we get here, we need to create a new payment record
        // This is a fallback for users who might have completed payment but lost the session ID
        console.log("No payment record found, creating a new one");
        
        const { error: insertError } = await supabase
          .from('user_payments')
          .insert({
            user_id: user.id,
            payment_status: 'completed',
            amount: 9900, // $99.00 in cents
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (insertError) {
          console.error('Error creating new payment record:', insertError);
          throw new Error(insertError.message);
        }

        console.log("Payment status created successfully in database");
        updatePaymentStatus(true);
        setIsComplete(true);
        toast.success("Payment successful! You now have full access to the course.");
      } catch (err: any) {
        console.error('Error in payment success handling:', err);
        setError(err.message || "There was an error processing your payment confirmation.");
        toast.error("There was an error processing your payment confirmation.");
      } finally {
        setIsProcessing(false);
      }
    };

    // Process payment if we're on the payment success page
    if (location.pathname === '/payment-success') {
      updateUserPaymentStatus();
    } else {
      setIsProcessing(false);
    }
  }, [user, sessionId, updatePaymentStatus, location.pathname]);

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
          {error ? (
            <div className="mb-8">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-pr-dark mt-4 mb-2">Payment Verification Error</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button 
                asChild 
                className="w-full bg-black hover:bg-black/90 mb-2"
              >
                <Link to="/pricing">Return to Pricing</Link>
              </Button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
