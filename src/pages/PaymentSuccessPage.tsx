
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { getFirstLesson } from '@/utils/course-data';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { updatePaymentStatus, user, hasPaid, checkPaymentStatus } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    console.log("Payment success page loaded with:", { 
      sessionId,
      userId: user?.id,
      hasPaid
    });
    
    const recordPayment = async () => {
      try {
        if (!user) {
          console.log("No user found, redirecting to sign in");
          setError("Please sign in to continue");
          setProcessing(false);
          
          // Add slight delay before redirecting
          setTimeout(() => {
            navigate('/signup', { replace: true });
          }, 2000);
          return;
        }
        
        // First check if payment is already recorded
        console.log("Checking if payment already recorded for:", user.id);
        await checkPaymentStatus(user.id);
        
        // Re-check the state after the async operation
        if (hasPaid) {
          console.log("Payment already recorded for user:", user.id);
          
          // Get first lesson to ensure we have a valid path
          const { lesson } = getFirstLesson();
          const redirectPath = `/course/${lesson.slug}`;
          
          console.log("Redirecting to:", redirectPath);
          
          // Add a short delay before redirecting to ensure toast is visible
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 2000);
          
          setProcessing(false);
          return;
        }
        
        // If not paid, update payment status
        console.log("Recording new payment for user:", user.id);
        const result = await updatePaymentStatus(true);
        
        if (result.error) {
          console.error("Failed to record payment:", result.error);
          
          // Check if it's a duplicate record error
          if (result.error.message?.includes("duplicate key value")) {
            console.log("This appears to be a duplicate record - payment likely already recorded");
            
            // Force a re-check of payment status
            const verified = await checkPaymentStatus(user.id);
            
            if (verified) {
              toast.success("Payment verified! You now have full access to the course.");
              
              // Get first lesson to ensure we have a valid path
              const { lesson } = getFirstLesson();
              const redirectPath = `/course/${lesson.slug}`;
              
              // Redirect to course lesson
              setTimeout(() => {
                navigate(redirectPath, { replace: true });
              }, 2000);
            } else {
              setError("Payment verification issue. Please contact support.");
            }
          } else {
            setError("There was an issue recording your payment. Please contact support.");
          }
        } else {
          console.log("Payment recorded successfully");
          toast.success("Payment successful! You now have full access to the course.");
          
          // Force a re-check of payment status
          await checkPaymentStatus(user.id);
          
          // Get first lesson to ensure we have a valid path
          const { lesson } = getFirstLesson();
          const redirectPath = `/course/${lesson.slug}`;
          
          // Redirect to course lesson
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 2000);
        }
      } catch (err) {
        console.error("Error recording payment:", err);
        setError("Failed to process payment confirmation");
      } finally {
        setProcessing(false);
      }
    };
    
    // Slight delay to ensure auth context is fully loaded
    setTimeout(() => {
      recordPayment();
    }, 1000);
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
            <p>Session ID: {searchParams.get('session_id') || 'None'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
