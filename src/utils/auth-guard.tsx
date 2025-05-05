
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from "sonner";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem('prCourseUser');
  
  useEffect(() => {
    if (!user && location.pathname !== '/signup') {
      toast.error("Please sign up to access course content.");
    }
  }, [user, location.pathname]);

  if (!user && location.pathname !== '/signup') {
    // Redirect to the signup page but remember where they were trying to go
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
