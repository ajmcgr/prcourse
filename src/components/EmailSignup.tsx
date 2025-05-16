import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, AlertCircle, CheckCircle2, Mail } from 'lucide-react';

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithGoogle, signInWithEmail, signUp, user, hasPaid } = useAuth();

  useEffect(() => {
    // Only redirect if we have a user and authentication is complete
    if (user) {
      console.log("User authenticated in EmailSignup, redirecting to pricing", { hasPaid });
      navigate('/pricing', { replace: true });
    }
  }, [user, hasPaid, navigate]);

  // Reset confirmation state when switching modes
  useEffect(() => {
    setNeedsConfirmation(false);
    setSignupSuccess(false);
    setResetSuccess(false);
  }, [isSignUp, isResetPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isResetPassword) {
        // Handle password reset request
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });
        
        if (error) {
          throw error;
        }
        
        setResetSuccess(true);
        toast.success("Password reset email sent. Please check your inbox.");
      } else if (isSignUp) {
        // Handle sign up
        const result = await signUp(email, password, name);
        if (result.success) {
          if (result.autoSignedIn) {
            toast.success(result.message);
            // Redirect will happen via useEffect above
          } else {
            // Show success message and confirmation UI
            setSignupSuccess(true);
            setNeedsConfirmation(true);
            toast.success("We've sent you a verification email. Please check your inbox.");
          }
        } else {
          // Check for specific error messages related to existing users
          if (result.message.includes("duplicate key") || 
              result.message.includes("already registered") || 
              result.message.includes("Database error")) {
            toast.error("An account with this email already exists. Try signing in instead.");
            // Switch to sign in mode
            setIsSignUp(false);
          } else if (result.message.includes("rate limit")) {
            toast.error("Email rate limit exceeded. Please wait a few minutes before trying again.");
          } else {
            toast.error(result.message);
          }
        }
      } else {
        // Handle sign in
        const signInResult = await signInWithEmail(email, password);
        // If we get here, sign-in was successful and redirect will happen via useEffect above
        toast.success("Signed in successfully!");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      
      // Handle specific error messages for better user experience
      if (error.message?.includes("email not confirmed")) {
        setNeedsConfirmation(true);
        toast.error("Please check your email and confirm your account before signing in.");
      } else if (error.message?.includes("Invalid login credentials")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message?.includes("Database error") || error.message?.includes("duplicate key")) {
        toast.error("An account with this email already exists. Try signing in instead.");
        setIsSignUp(false);
      } else if (error.message?.includes("rate limit")) {
        toast.error("Email rate limit exceeded. Please wait a few minutes before trying again.");
      } else {
        toast.error(error.message || "Authentication failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log("Starting Google sign in process from component...");
      await signInWithGoogle();
      // Note: No redirect here as it's handled by the redirectTo option in signInWithGoogle
    } catch (error) {
      console.error("Google sign-in error in component:", error);
      toast.error("Failed to sign in with Google. Please try again later.");
      setIsLoading(false);
    }
  };

  // Function to handle resending verification email
  const handleResendVerification = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Use Supabase's resend confirmation email functionality
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (error) {
        if (error.message.includes("rate limit")) {
          toast.error("Email rate limit exceeded. Please wait a few minutes before trying again.");
        } else {
          throw error;
        }
      } else {
        toast.success("Verification email sent! Please check your inbox.");
      }
    } catch (error: any) {
      console.error("Error resending verification:", error);
      toast.error(error.message || "Failed to resend verification email");
    } finally {
      setIsLoading(false);
    }
  };

  // If password reset was successful, show a success screen
  if (resetSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-sans text-center">
            Password Reset Email Sent
          </CardTitle>
          <CardDescription className="text-center">
            Please check your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <p className="text-center text-lg font-medium">
              Check your inbox!
            </p>
            <div className="flex items-center justify-center gap-2 bg-blue-50 p-4 rounded-lg w-full">
              <Mail className="h-5 w-5 text-blue-500" />
              <p className="text-blue-700">
                We've sent a password reset email to <strong>{email}</strong>
              </p>
            </div>
            <p className="text-center">
              Click the link in the email to reset your password.
            </p>
            <p className="text-sm text-gray-500 text-center">
              If you don't see the email, check your spam folder or click below to resend.
            </p>
            <Button 
              onClick={(e) => {
                e.preventDefault();
                handleResendVerification(e);
              }} 
              variant="outline"
              disabled={isLoading}
              className="mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : 'Resend reset email'}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-center text-sm">
            Remember your password? {' '}
            <a 
              href="#" 
              className="text-blue-600 hover:underline" 
              onClick={(e) => {
                e.preventDefault();
                setIsResetPassword(false);
                setResetSuccess(false);
              }}
            >
              Back to sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    );
  }

  // If in password reset mode, show the password reset form
  if (isResetPassword) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-sans text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and we'll send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={isLoading}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-black/90" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : 'Send Reset Link'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-center text-sm">
            <a 
              href="#" 
              className="text-blue-600 hover:underline" 
              onClick={(e) => {
                e.preventDefault();
                setIsResetPassword(false);
              }}
            >
              Back to sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    );
  }

  // If signup was successful, show a success screen
  if (signupSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-sans text-center">
            Sign Up Successful!
          </CardTitle>
          <CardDescription className="text-center">
            Please check your email to verify your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <p className="text-center text-lg font-medium">
              Thanks for signing up!
            </p>
            <div className="flex items-center justify-center gap-2 bg-blue-50 p-4 rounded-lg w-full">
              <Mail className="h-5 w-5 text-blue-500" />
              <p className="text-blue-700">
                We've sent a verification email to <strong>{email}</strong>
              </p>
            </div>
            <p className="text-center">
              Please click the link in your email to verify your account.
            </p>
            <p className="text-sm text-gray-500 text-center">
              If you don't see the email, check your spam folder or click below to resend.
            </p>
            <Button 
              onClick={handleResendVerification} 
              variant="outline"
              disabled={isLoading}
              className="mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : 'Resend verification email'}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-center text-sm">
            Already verified? {' '}
            <a 
              href="#" 
              className="text-blue-600 hover:underline" 
              onClick={(e) => {
                e.preventDefault();
                setIsSignUp(false);
                setSignupSuccess(false);
                setNeedsConfirmation(false);
              }}
            >
              Sign in now
            </a>
          </p>
        </CardFooter>
      </Card>
    );
  }

  // If we're in confirmation state, show a different UI
  if (needsConfirmation) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-sans text-center">
            Email verification required
          </CardTitle>
          <CardDescription className="text-center">
            Please check your email inbox for a verification link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <AlertCircle className="h-16 w-16 text-amber-500" />
            <p className="text-center">
              We've sent a verification email to <strong>{email}</strong>.<br/>
              Please click the link in the email to verify your account.
            </p>
            <p className="text-sm text-gray-500 text-center">
              If you don't see the email, check your spam folder or click below to resend.
            </p>
            <Button 
              onClick={handleResendVerification} 
              variant="outline"
              disabled={isLoading}
              className="mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : 'Resend verification email'}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <p className="text-center text-sm">
            Already verified? {' '}
            <a 
              href="#" 
              className="text-blue-600 hover:underline" 
              onClick={(e) => {
                e.preventDefault();
                setNeedsConfirmation(false);
              }}
            >
              Try signing in
            </a>
          </p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-sans text-center">
          {isSignUp ? 'Create an account' : 'Sign in to your account'}
        </CardTitle>
        <CardDescription className="text-center">
          {isSignUp 
            ? 'Enter your information to create an account' 
            : 'Enter your credentials to access your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">Full Name</label>
              <Input 
                id="name"
                placeholder="Enter your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                disabled={isLoading}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input 
              id="email"
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <Input 
              id="password"
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              disabled={isLoading}
              required
            />
          </div>
          
          {!isSignUp && (
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setIsResetPassword(true);
                }}
              >
                Forgot password?
              </a>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-black/90" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        
        <Button 
          className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
          <span>{isLoading ? "Processing..." : "Sign in with Google"}</span>
        </Button>
      </CardContent>
      
      <CardFooter className="flex flex-col items-center">
        <p className="text-center text-sm">
          {isSignUp 
            ? 'Already have an account? ' 
            : 'Don\'t have an account? '}
          <a 
            href="#" 
            className="text-blue-600 hover:underline" 
            onClick={(e) => {
              e.preventDefault();
              setIsSignUp(!isSignUp);
            }}
          >
            {isSignUp ? 'Sign in' : 'Create one'}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default EmailSignup;
