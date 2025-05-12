
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
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
    console.log("AuthGuard state:", { 
      user: user?.id, 
      loading, 
      hasPaid, 
      path: location.pathname 
    });
    
    // Simple timeout to ensure UI updates properly
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [user, loading, location.pathname, hasPaid]);
  
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
