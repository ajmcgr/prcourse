
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const { user, loading, hasPaid } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Log auth status for debugging
    console.log("AuthGuard state:", { user, loading, hasPaid, path: location.pathname });
    
    // Give a short delay to ensure auth and payment status are properly loaded
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [user, loading, hasPaid, location.pathname]);
  
  // If we're loading auth state or checking payment, show loading indicator
  if (loading || isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600">Authenticating...</p>
      </div>
    );
  }
  
  // User is not signed in, redirect to signup
  if (!user && location.pathname !== '/signup') {
    console.log("User not authenticated, redirecting to signup");
    toast.error("Please sign up to access course content.");
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  // Special case for payment-success page - always allow access if authenticated
  if (location.pathname === '/payment-success') {
    console.log("On payment-success page, allowing access");
    return <>{children}</>;
  }

  // User is signed in but hasn't paid, redirect to pricing
  if (user && !hasPaid && 
      location.pathname !== '/pricing' && 
      location.pathname !== '/signup') {
    console.log("User authenticated but not paid, redirecting to pricing");
    toast.info("Please complete your payment to access course content.");
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  console.log("Authorization successful, rendering protected content");
  return <>{children}</>;
};

export default AuthGuard;
