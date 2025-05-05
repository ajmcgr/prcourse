
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  
  // If we're loading auth state, show nothing
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!user && location.pathname !== '/signup') {
    // Redirect to the signup page but remember where they were trying to go
    toast.error("Please sign up to access course content.");
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
