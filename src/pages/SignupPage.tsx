import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { getFirstLesson } from '@/utils/course-data';
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { supabase } from '@/integrations/supabase/client';

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { user, signInWithEmail, signUp, signInWithGoogle, loading, hasPaid } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const { toast: toastNotify } = useToast();
  
  // Set initial mode based on URL parameter
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    } else if (mode === 'login') {
      setIsLogin(true);
    }
  }, [searchParams]);
  
  // Check if user is authenticated, and redirect if needed
  useEffect(() => {
    if (user && !loading) {
      // If the user has already paid, redirect to course
      if (hasPaid) {
        const { lesson } = getFirstLesson();
        console.log("User is authenticated and has paid, redirecting to course");
        navigate(`/course/${lesson.slug}`, { replace: true });
      } else {
        // If user is logged in but hasn't paid, redirect to pricing
        console.log("User is authenticated but has not paid, redirecting to pricing");
        navigate('/pricing', { replace: true });
      }
    }
  }, [user, loading, hasPaid, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Handle password reset request
    if (isResetPassword) {
      if (!email) {
        setFormError('Please enter your email address.');
        return;
      }
      
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });
        
        if (error) throw error;
        
        setResetSuccess(true);
        toast.success("Password reset email sent. Please check your inbox.");
        toastNotify({
          title: "Reset email sent!",
          description: "Check your inbox for the password reset link.",
        });
      } catch (error: any) {
        console.error("Password reset error:", error);
        setFormError(error.message || 'An error occurred during password reset.');
      }
      
      return;
    }
    
    if (!email || !password) {
      setFormError('Please enter your email and password.');
      return;
    }
    
    try {
      if (isLogin) {
        // Sign In
        await signInWithEmail(email, password);
        toast.success("Login successful!");
        toastNotify({
          title: "Login successful!",
          description: "You've successfully logged in.",
        });
      } else {
        // Sign Up
        if (!name) {
          setFormError('Please enter your name.');
          return;
        }
        
        const result = await signUp(email, password, name);
        if (!result.success) {
          setFormError(result.message);
        } else {
          // Show success message
          setSignupSuccess(true);
          toast.success("Signup successful! Please check your email for verification.");
          toastNotify({
            title: "Signup successful!",
            description: "Please check your email for the verification link.",
          });
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setFormError(error.message || 'An error occurred during authentication.');
    }
  };
  
  // Password reset success screen
  if (resetSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Password Reset Email Sent
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please check your email for the reset link.
            </p>
          </div>
          
          <Alert>
            <AlertTitle>Check Your Email</AlertTitle>
            <AlertDescription>
              We've sent a password reset email to <strong>{email}</strong>. 
              Please check your inbox and click the link to reset your password.
              If you don't see the email, check your spam folder.
            </AlertDescription>
          </Alert>
          
          <div className="text-center mt-4">
            <Button
              onClick={() => {
                setIsResetPassword(false);
                setResetSuccess(false);
              }}
              variant="outline"
              className="mx-auto"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Password reset form
  if (isResetPassword) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Reset Your Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                Email address
              </Label>
              <div className="mt-1">
                <Input 
                  id="email-address" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required 
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            {formError && (
              <div className="text-red-500 text-sm mt-1">{formError}</div>
            )}
            
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Reset Link
              </Button>
            </div>
            
            <div className="text-sm text-center">
              <button onClick={() => setIsResetPassword(false)} className="font-medium text-blue-500 hover:text-blue-700">
                Back to Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  if (signupSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign Up Successful!
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please check your email for the verification link.
            </p>
          </div>
          
          <Alert>
            <AlertTitle>Email Verification Required</AlertTitle>
            <AlertDescription>
              We've sent a verification email to <strong>{email}</strong>. 
              Please check your inbox and click the link to verify your account.
              If you don't see the email, check your spam folder.
            </AlertDescription>
          </Alert>
          
          <div className="text-center mt-4">
            <Button
              onClick={() => {
                setIsLogin(true);
                setSignupSuccess(false);
              }}
              variant="outline"
              className="mx-auto"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create an account'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <div className="mt-1">
                <Input 
                  id="name" 
                  name="name" 
                  type="text" 
                  autoComplete="name" 
                  required 
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div>
            <Label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
              Email address
            </Label>
            <div className="mt-1">
              <Input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              {isLogin && (
                <button 
                  type="button"
                  onClick={() => setIsResetPassword(true)}
                  className="text-sm font-medium text-blue-500 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="mt-1">
              <Input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {formError && (
            <div className="text-red-500 text-sm mt-1">{formError}</div>
          )}
          
          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-3">
            <div>
              <Button
                onClick={() => signInWithGoogle()}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Sign in with Google
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-center">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => setIsLogin(false)} className="font-medium text-blue-500 hover:text-blue-700">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setIsLogin(true)} className="font-medium text-blue-500 hover:text-blue-700">
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
