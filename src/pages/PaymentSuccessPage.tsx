
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const { updatePaymentStatus, user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    console.log("Payment success page loaded with session ID:", sessionId);
    
    const recordPayment = async () => {
      try {
        if (!user) {
          console.log("No user found, redirecting to sign in");
          toast.info("Please sign in to continue");
          navigate('/signup', { replace: true });
          return;
        }
        
        console.log("Recording payment for user:", user.id);
        const result = await updatePaymentStatus(true);
        
        if (result.error) {
          console.error("Failed to record payment:", result.error);
          toast.error("There was an issue recording your payment. Please contact support.");
        } else {
          console.log("Payment recorded successfully");
          toast.success("Payment successful! You now have full access to the course.");
          
          // Redirect to course introduction
          setTimeout(() => {
            navigate('/course/introduction', { replace: true });
          }, 2000);
        }
      } catch (err) {
        console.error("Error recording payment:", err);
        toast.error("Failed to process payment confirmation");
      } finally {
        setProcessing(false);
      }
    };
    
    recordPayment();
  }, [searchParams, updatePaymentStatus, user, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {processing ? (
              <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
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
          <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
          <p className="mt-2 text-gray-600">
            {processing 
              ? "Processing your payment confirmation..." 
              : "Your payment has been confirmed. You now have full access to the course!"}
          </p>
        </div>
        
        {!processing && (
          <div className="mt-6">
            <button 
              onClick={() => navigate('/course/introduction')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
            >
              Go to Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
