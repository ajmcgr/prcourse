
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { getFirstLesson } from '@/utils/course-data';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, loading, hasPaid, checkPaymentStatus, updatePaymentStatus } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Log auth status for debugging
    console.log("AuthGuard state:", { 
      user: user?.id, 
      loading, 
      hasPaid, 
      path: location.pathname 
    });
    
    // Handle any Stripe redirect parameters
    const handlePaymentParams = async () => {
      try {
        if (!user) return;
        
        // Check for various potential Stripe parameters
        const sessionId = searchParams.get('session_id') || 
                          searchParams.get('checkout_session_id') || 
                          searchParams.get('CHECKOUT_SESSION_ID');
                          
        const successParam = searchParams.get('success') === 'true';
        const paymentStatus = searchParams.get('payment_status') === 'paid';
        
        // Check if we're on payment success page or have payment parameters
        const isPaymentRedirect = sessionId || 
                                 successParam || 
                                 paymentStatus || 
                                 location.pathname === '/payment-success';
        
        if (isPaymentRedirect) {
          console.log("Detected payment redirect or parameters:", { 
            sessionId, 
            successParam, 
            paymentStatus, 
            path: location.pathname 
          });
          
          // Check if user has already paid
          const isPaid = await checkPaymentStatus(user.id);
          
          // If not already marked as paid, update payment status
          if (!isPaid) {
            console.log("User not marked as paid, updating payment status");
            await updatePaymentStatus(true);
            
            // Check again to confirm payment was recorded
            const confirmPaid = await checkPaymentStatus(user.id);
            
            if (confirmPaid) {
              toast.success("Payment verified! You now have full access to the course.");
            } else {
              toast.error("Failed to verify payment. Please contact support.");
            }
          } else {
            console.log("User already marked as paid");
            toast.success("Payment already verified!");
          }
        }
      } catch (error) {
        console.error("Error handling payment parameters:", error);
        toast.error("Failed to verify payment status");
      }
    };
    
    // Force a payment status check when auth guard mounts or path changes
    const checkAuth = async () => {
      if (user) {
        console.log("Checking payment status in AuthGuard");
        
        // Check payment status first
        await checkPaymentStatus(user.id);
        
        // Handle any payment redirect parameters
        await handlePaymentParams();
      }
      
      // Short delay to ensure state updates properly
      setTimeout(() => setIsChecking(false), 500);
    };
    
    checkAuth();
  }, [user, loading, location.pathname, searchParams, checkPaymentStatus, updatePaymentStatus, hasPaid]);
  
  // If we're loading auth state or checking payment, show loading indicator
  if (loading || isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600">Authenticating...</p>
      </div>
    );
  }
  
  // Simple paths that don't need authentication or payment checks
  const publicPaths = ['/signup', '/', '/pricing', '/payment-success', '/coursecontent'];
  const isPublicPath = publicPaths.includes(location.pathname);
  
  // User is not signed in, redirect to signup
  if (!user && !isPublicPath) {
    console.log("User not authenticated, redirecting to signup");
    toast.error("Please sign up to access course content.");
    return <Navigate to="/signup" state={{ from: { pathname: location.pathname } }} replace />;
  }

  // User is signed in but hasn't paid, redirect to pricing
  if (user && !hasPaid && !isPublicPath) {
    console.log("User authenticated but not paid, redirecting to pricing");
    toast.info("Please complete your payment to access course content.");
    return <Navigate to="/pricing" state={{ from: { pathname: location.pathname } }} replace />;
  }

  // All checks passed, render the protected component
  console.log("Authorization successful, rendering content");
  return <>{children}</>;
};

export default AuthGuard;
