
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getFirstLesson } from '@/utils/course-data';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, loading, hasPaid, checkPaymentStatus } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  // Define public paths outside of the effect to avoid re-creating on each render
  const publicPaths = ['/signup', '/', '/pricing', '/payment-success'];
  const isPublicPath = publicPaths.includes(location.pathname);
  const isPaymentSuccess = location.pathname === '/payment-success';
  const isPricingPage = location.pathname === '/pricing';
  
  useEffect(() => {
    // Log auth status for debugging
    console.log("AuthGuard state:", { 
      user: user?.id, 
      userEmail: user?.email,
      loading, 
      hasPaid, 
      path: location.pathname,
      isPublicPath,
      isPricingPage
    });
    
    // Special handling for business@hypeworkspod.com user
    const isBusinessUser = user?.email === 'business@hypeworkspod.com';
    if (isBusinessUser) {
      console.log("Detected business@hypeworkspod.com user - special handling");
    }
    
    // Check if we're on payment success or there's a session_id parameter
    const hasSessionId = searchParams.has('session_id') || searchParams.has('CHECKOUT_SESSION_ID');
    
    // Force a payment status check when auth guard mounts or path changes
    const checkAuth = async () => {
      if (user) {
        console.log("Checking payment status in AuthGuard for", user.email);
        try {
          // Force payment status refresh
          const isPaid = await checkPaymentStatus(user.id);
          console.log("AuthGuard payment status check result:", isPaid ? "PAID" : "NOT PAID");
          
          // Special handling for the business user - override payment status if needed
          if (isBusinessUser && !isPaid) {
            console.log("Business user detected but not marked as paid - investigating");
            // Additional logging to help debug
            const { data, error } = await supabase
              .from('user_payments')
              .select('*')
              .eq('user_id', user.id);
            
            console.log("Payment records for business user:", data, "Error:", error);
          }
        } catch (err) {
          console.error("Error checking payment status in AuthGuard:", err);
        }
      }
      
      // Short delay to ensure state updates properly
      setTimeout(() => setIsChecking(false), 500);
    };
    
    // Always check auth status for non-public paths
    if (!isPublicPath || isPaymentSuccess || hasSessionId) {
      checkAuth();
    } else {
      setIsChecking(false);
    }
  }, [user, loading, location.pathname, searchParams, checkPaymentStatus, hasPaid, isPublicPath, isPaymentSuccess, isPricingPage]);
  
  // If we're loading auth state or checking payment, show loading indicator
  if (loading || isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600">Authenticating...</p>
      </div>
    );
  }

  // For paths that should immediately go to course content if logged in
  const shouldRedirectToCourse = (location.pathname === '/signup' || isPricingPage) && user && hasPaid;
  if (shouldRedirectToCourse) {
    const { lesson } = getFirstLesson();
    console.log("User is paid and trying to access signup/pricing, redirecting to course");
    return <Navigate to={`/course/${lesson.slug}`} replace />;
  }
  
  // User is not signed in, redirect to signup
  if (!user && !isPublicPath) {
    console.log("User not authenticated, redirecting to signup");
    toast.error("Please sign up to access course content.");
    return <Navigate to="/signup" state={{ from: location.pathname }} replace />;
  }

  // For the business user email, override the payment check and always grant access
  if (user?.email === 'business@hypeworkspod.com' && !isPublicPath && !isPaymentSuccess) {
    console.log("Business user - granting access override");
    return <>{children}</>;
  }

  // User is signed in but hasn't paid, redirect to pricing
  // Skip this check for payment-success page to avoid redirect loops
  if (user && !hasPaid && !isPublicPath && !isPaymentSuccess) {
    console.log("User authenticated but not paid, redirecting to pricing");
    toast.info("Please complete your payment to access course content.");
    return <Navigate to="/pricing" state={{ from: location.pathname }} replace />;
  }

  // All checks passed, render the protected component
  console.log("Authorization successful, rendering content");
  return <>{children}</>;
};

export default AuthGuard;
