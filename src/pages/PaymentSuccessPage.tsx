
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { getFirstLesson } from '@/utils/course-data';
import { supabase } from "@/integrations/supabase/client";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { updatePaymentStatus, user, hasPaid, checkPaymentStatus } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id') || searchParams.get('CHECKOUT_SESSION_ID');
    console.log("Payment success page loaded with:", { 
      sessionId,
      userId: user?.id,
      hasPaid
    });
    
    const verifyPayment = async () => {
      try {
        // Instead of showing error and redirecting immediately, wait for auth
        if (!user) {
          console.log("No user found, waiting for authentication to complete...");
          
          // Give auth context time to initialize/restore session
          const timeout = setTimeout(() => {
            // Only show error if still no user after waiting
            if (!user) {
              console.log("Authentication timed out, redirecting to pricing");
              toast.info("Please complete your payment from the pricing page");
              navigate('/pricing', { replace: true });
            }
          }, 3000); // Wait 3 seconds before giving up
          
          return () => clearTimeout(timeout);
        }

        // If session ID is present, try to verify with Stripe directly
        if (sessionId) {
          console.log("Verifying session with Stripe:", sessionId);
          
          try {
            // Use our edge function to verify the payment with Stripe
            const { data, error } = await supabase.functions.invoke("verify-payment", {
              body: { 
                sessionId,
                userId: user.id
              }
            });
            
            if (error) {
              console.error("Payment verification failed:", error);
              setError(`Unable to verify payment: ${error.message}`);
              setProcessing(false);
              return;
            }
            
            if (data?.verified) {
              console.log("Payment verified with Stripe, updating status");
              const result = await updatePaymentStatus(true);
              
              if (result.error) {
                console.error("Failed to update payment status:", result.error);
                setError(`Payment verified but failed to update your account: ${result.error.message}`);
              } else {
                console.log("Payment recorded successfully");
                toast.success("Payment successful! You now have full access to the course.");
                
                // Force a re-check of payment status
                await checkPaymentStatus(user.id);
                
                // Get first lesson for redirect
                const { lesson } = getFirstLesson();
                navigate(`/course/${lesson.slug}`, { replace: true });
              }
            } else {
              console.log("Payment could not be verified with Stripe:", data);
              setError("Payment could not be verified. Please contact support.");
            }
          } catch (verifyError: any) {
            console.error("Error during payment verification:", verifyError);
            setError(`Verification error: ${verifyError.message}`);
          }
        } else {
          // Even if no session ID is present, try to verify the payment
          // This handles cases where the user returns directly to the site after payment
          console.log("No session ID, checking payment status in database");
          
          // First check if payment is already recorded in database
          const isPaid = await checkPaymentStatus(user.id);
          
          if (isPaid) {
            console.log("Payment already verified for user:", user.id);
            toast.success("Payment verified! You now have full access to the course.");
            
            // Get first lesson to ensure we have a valid path
            const { lesson } = getFirstLesson();
            const redirectPath = `/course/${lesson.slug}`;
            
            console.log("Redirecting to:", redirectPath);
            setTimeout(() => {
              navigate(redirectPath, { replace: true });
            }, 1000);
          } else {
            // No payment record found and no session ID to verify
            console.log("No payment record found, manual verification needed");
            setError("We couldn't find your payment. Please try again or contact support if you've already made a payment.");
          }
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setError("Failed to process payment confirmation");
      } finally {
        setProcessing(false);
      }
    };
    
    // Slight delay to ensure auth context is fully loaded
    setTimeout(() => {
      verifyPayment();
    }, 1500); // Increased delay to give auth time to initialize
  }, [searchParams, updatePaymentStatus, checkPaymentStatus, user, navigate, hasPaid]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {processing ? (
              <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
            ) : error ? (
              <svg 
                className="w-8 h-8 text-red-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            ) : (
              <svg 
                className="w-8 h-8 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {error ? "Payment Verification Issue" : "Payment Successful!"}
          </h2>
          <p className="mt-2 text-gray-600">
            {processing 
              ? "Processing your payment confirmation..." 
              : error 
                ? error
                : "Your payment has been confirmed. You now have full access to the course!"}
          </p>
        </div>
        
        {!processing && !error && (
          <div className="mt-6">
            <button 
              onClick={() => {
                const { lesson } = getFirstLesson();
                navigate(`/course/${lesson.slug}`);
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
            >
              Go to Course
            </button>
          </div>
        )}
        
        {!processing && error && (
          <div className="mt-6">
            <button 
              onClick={() => {
                navigate('/pricing');
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
            >
              Return to Pricing
            </button>
          </div>
        )}
        
        {/* Debug info in development only */}
        {import.meta.env.DEV && !processing && (
          <div className="mt-6 p-4 border rounded bg-gray-50 text-left text-xs">
            <h3 className="font-bold mb-1">Debug Info:</h3>
            <p>User ID: {user?.id || 'Not logged in'}</p>
            <p>Has Paid: {hasPaid ? 'Yes' : 'No'}</p>
            <p>Session ID: {searchParams.get('session_id') || searchParams.get('CHECKOUT_SESSION_ID') || 'None'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
