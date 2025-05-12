
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
  const { user, loading, hasPaid, checkPaymentStatus } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Log auth status for debugging
    console.log("AuthGuard state:", { 
      user: user?.id, 
      loading, 
      hasPaid, 
      path: location.pathname 
    });
    
    // Force a payment status check when the component mounts or when path changes
    const checkPayment = async () => {
      if (user && user.id) {
        console.log("Forcing payment status check for user:", user.id);
        try {
          await checkPaymentStatus(user.id);
        } catch (error) {
          console.error("Error in checkPayment:", error);
          toast.error("Error checking payment status");
        }
      }
      
      // Give a short delay to ensure auth and payment status are properly loaded
      setTimeout(() => {
        setIsChecking(false);
      }, 500);
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
  
  // Payment Success Page special handling
  if (location.pathname === '/payment-success') {
    // Allow access to payment success page regardless of payment status
    // The component itself will handle verification and redirection
    if (!user) {
      console.log("User not authenticated on payment success page, redirecting to signup");
      return <Navigate to="/signup" state={{ from: { pathname: location.pathname } }} />;
    }
    return <>{children}</>;
  }
  
  // User is not signed in, redirect to signup
  if (!user) {
    console.log("User not authenticated, redirecting to signup");
    toast.error("Please sign up to access course content.");
    return <Navigate to="/signup" state={{ from: { pathname: location.pathname } }} />;
  }

  // User is signed in but hasn't paid, redirect to pricing
  // Skip this check for paths that don't require payment
  const paymentExemptPaths = ['/pricing', '/signup', '/payment-success', '/'];
  
  if (!hasPaid && !paymentExemptPaths.includes(location.pathname)) {
    console.log("User authenticated but not paid, redirecting to pricing");
    toast.info("Please complete your payment to access course content.");
    return <Navigate to="/pricing" state={{ from: { pathname: location.pathname } }} replace />;
  }

  console.log("Authorization successful, rendering protected content:", location.pathname);
  return <>{children}</>;
};

export default AuthGuard;
