
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const { user, loading, hasPaid, checkPaymentStatus } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Log auth status for debugging
    console.log("AuthGuard state:", { user, loading, hasPaid, path: location.pathname });
    
    // Force a payment status check when the component mounts or when path changes
    const checkPayment = async () => {
      if (user && user.id) {
        console.log("Forcing payment status check for user:", user.id);
        await checkPaymentStatus(user.id);
      }
      
      // Give a short delay to ensure auth and payment status are properly loaded
      setTimeout(() => {
        setIsChecking(false);
      }, 1000);
    };
    
    checkPayment();
  }, [user, loading, location.pathname, checkPaymentStatus]);
  
  // If we're loading auth state or checking payment, show loading indicator
  if (loading || isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600">Authenticating...</p>
      </div>
    );
  }
  
  // Special case for the post-payment success route
  // Always allow this route regardless of payment status
  if (location.pathname === '/payment-success') {
    console.log("Allowing access to payment success page");
    return <>{children}</>;
  }

  // Special case for the /course/full-course route that Stripe redirects to 
  if (location.pathname === '/course/full-course') {
    console.log("Detected stripe redirect route");
    // If user is logged in, redirect them to payment success
    if (user) {
      console.log("User is authenticated, redirecting to payment success");
      return <Navigate to="/payment-success" state={{ from: location }} replace />;
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
  const paymentExemptPaths = ['/payment-success', '/pricing', '/signup'];
  
  if (user && !hasPaid && !paymentExemptPaths.includes(location.pathname)) {
    console.log("User authenticated but not paid, redirecting to pricing");
    toast.info("Please complete your payment to access course content.");
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  console.log("Authorization successful, rendering protected content");
  return <>{children}</>;
};

export default AuthGuard;
