
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

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
    
    // Handle Stripe redirects - check for multiple possible parameters
    const handleStripeRedirect = async () => {
      // Check for various Stripe parameters
      const sessionId = searchParams.get('checkout_session_id') || 
                        searchParams.get('session_id') || 
                        searchParams.get('CHECKOUT_SESSION_ID');
      
      // Also check for success_url parameter which Stripe might add
      const isSuccessRedirect = searchParams.get('checkout_session_completed') === 'true' || 
                                searchParams.get('success_url') === 'true' || 
                                location.pathname.includes('/course/full-course');
      
      const directLink = searchParams.get('direct_link') === 'true';
      
      console.log("Checking for payment redirect with params:", { 
        sessionId, 
        isSuccessRedirect,
        directLink,
        pathname: location.pathname
      });
      
      if ((sessionId || isSuccessRedirect) && user) {
        console.log("Detected Stripe redirect:", { sessionId, isSuccessRedirect });
        toast.info("Verifying your payment...");
        
        try {
          // Create a payment record in the database
          const { error } = await updatePaymentStatus(true);
          
          if (error) {
            console.error("Error updating payment status:", error);
            toast.error("Failed to verify payment. Please contact support.");
          } else {
            console.log("Payment status updated successfully");
            toast.success("Payment verified! You now have full access to the course.");
          }
        } catch (err) {
          console.error("Error handling Stripe redirect:", err);
        }
      }
    };
    
    // Force a payment status check when the component mounts or when path changes
    const checkPayment = async () => {
      if (user && user.id) {
        console.log("Forcing payment status check for user:", user.id);
        const isPaid = await checkPaymentStatus(user.id);
        console.log("Payment check result:", isPaid);
        
        // If we have a session ID in the URL or are on the full-course page, handle the Stripe redirect
        handleStripeRedirect();
      }
      
      // Give a short delay to ensure auth and payment status are properly loaded
      setTimeout(() => {
        setIsChecking(false);
      }, 1000);
    };
    
    checkPayment();
  }, [user, loading, location.pathname, checkPaymentStatus, searchParams, updatePaymentStatus]);
  
  // If we're loading auth state or checking payment, show loading indicator
  if (loading || isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600">Authenticating...</p>
      </div>
    );
  }
  
  // Modified logic for handling full-course route (Stripe redirect)
  if (location.pathname === '/course/full-course') {
    console.log("Detected stripe redirect route");
    if (user) {
      // Since we're on the redirect page after payment, if user exists, mark as paid and redirect
      if (!hasPaid) {
        console.log("User on redirect page but not marked as paid - updating payment status");
        updatePaymentStatus(true)
          .then(() => console.log("Payment status updated from redirect page"))
          .catch(err => console.error("Failed to update payment status:", err));
      }
      
      console.log("User is authenticated on full-course page, redirecting to course introduction");
      return <Navigate to="/course/introduction" state={{ from: location }} replace />;
    } else {
      // If not logged in, redirect to signup
      console.log("User not authenticated, redirecting to signup");
      toast.info("Please sign up to complete your purchase");
      return <Navigate to="/signup" state={{ from: location }} replace />;
    }
  }
  
  // User is not signed in, redirect to signup
  if (!user && location.pathname !== '/signup') {
    console.log("User not authenticated, redirecting to signup");
    toast.error("Please sign up to access course content.");
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  // User is signed in but hasn't paid, redirect to pricing
  // Skip this check for certain paths
  const paymentExemptPaths = ['/pricing', '/signup', '/payment-success'];
  
  if (user && !hasPaid && !paymentExemptPaths.includes(location.pathname)) {
    console.log("User authenticated but not paid, redirecting to pricing");
    toast.info("Please complete your payment to access course content.");
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  console.log("Authorization successful, rendering protected content");
  return <>{children}</>;
};

export default AuthGuard;
