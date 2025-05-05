
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const { user, loading, hasPaid } = useAuth();
  
  // If we're loading auth state, show nothing
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  // User is not signed in, redirect to signup
  if (!user && location.pathname !== '/signup') {
    toast.error("Please sign up to access course content.");
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  // User is signed in but hasn't paid, redirect to pricing
  if (user && !hasPaid && 
      location.pathname !== '/pricing' && 
      location.pathname !== '/payment-success' && 
      location.pathname !== '/signup') {
    toast.info("Please complete your payment to access course content.");
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
