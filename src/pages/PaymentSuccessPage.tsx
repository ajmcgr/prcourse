
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
  const [processingDetails, setProcessingDetails] = useState<string>('');
  
  useEffect(() => {
    // Get session ID from URL parameters
    const sessionId = searchParams.get('session_id') || searchParams.get('CHECKOUT_SESSION_ID');
    console.log("Payment success page loaded with:", { 
      sessionId,
      userId: user?.id,
      hasPaid
    });
    
    // Show more detailed processing feedback
    setProcessingDetails('Initializing payment verification...');
    
    const verifyPayment = async () => {
      try {
        // If no user is logged in, wait briefly for authentication to complete
        if (!user) {
          console.log("No user found, waiting for authentication to complete...");
          setProcessingDetails('Waiting for authentication...');
          
          // Give auth context time to initialize/restore session
          const timeout = setTimeout(() => {
            if (!user) {
              console.log("Authentication timed out, redirecting to pricing");
              toast.info("Please complete your payment from the pricing page");
              navigate('/pricing', { replace: true });
            }
          }, 3000);
          
          return () => clearTimeout(timeout);
        }

        // Verify with Stripe directly if session ID is present
        if (sessionId) {
          console.log("Verifying session with Stripe:", sessionId);
          setProcessingDetails('Verifying payment with Stripe...');
          
          try {
            // Use edge function to verify payment
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
              setProcessingDetails('Payment verified! Updating your account...');
              const result = await updatePaymentStatus(true);
              
              if (result.error) {
                console.error("Failed to update payment status:", result.error);
                setError(`Payment verified but failed to update your account: ${result.error.message}`);
              } else {
                console.log("Payment recorded successfully");
                toast.success("Payment successful! You now have full access to the course.");
                
                // Force a re-check of payment status
                setProcessingDetails('Checking account access...');
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
          // If no session ID, check database for payment record
          console.log("No session ID, checking payment status in database");
          setProcessingDetails('Checking payment status in database...');
          
          // Check if payment is already recorded
          const isPaid = await checkPaymentStatus(user.id);
          
          if (isPaid) {
            console.log("Payment already verified for user:", user.id);
            toast.success("Payment verified! You now have full access to the course.");
            
            // Get first lesson for redirect
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
    }, 1500);
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
            {error ? "Payment Verification Issue" : "Payment Processing"}
          </h2>
          <p className="mt-2 text-gray-600">
            {processing 
              ? processingDetails
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
          <div className="mt-6 space-y-4">
            <button 
              onClick={() => {
                navigate('/pricing');
              }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
            >
              Return to Pricing
            </button>
            
            <button 
              onClick={() => {
                window.location.reload();
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Debug info in development only */}
        {import.meta.env.DEV && (
          <div className="mt-6 p-4 border rounded bg-gray-50 text-left text-xs">
            <h3 className="font-bold mb-1">Debug Info:</h3>
            <p>User ID: {user?.id || 'Not logged in'}</p>
            <p>Has Paid: {hasPaid ? 'Yes' : 'No'}</p>
            <p>Session ID: {searchParams.get('session_id') || searchParams.get('CHECKOUT_SESSION_ID') || 'None'}</p>
            <p>Processing: {processing ? 'Yes' : 'No'}</p>
            <p>State: {processing ? 'Processing' : error ? 'Error' : 'Success'}</p>
            {error && <p className="text-red-500">Error: {error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
