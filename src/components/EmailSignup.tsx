
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithEmail, signUp, signInWithGoogle, user } = useAuth();

  const from = location.state?.from?.pathname || '/course/introduction';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/course/introduction');
    }
  }, [user, navigate]);

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
    } finally {
      // Keep loading state active as we're being redirected
      // The loading state will be reset if there's an error
      setTimeout(() => {
        setIsLoading(false);
      }, 10000); // Reset loading after 10 seconds if redirect doesn't happen
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (isSignUp && !name) {
      toast.error("Please enter your name");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password, name);
        // Don't navigate right away if email confirmation is required
      } else {
        await signInWithEmail(email, password);
        navigate('/course/introduction');
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Error toasts are handled in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await useAuth().supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/course/introduction`,
      });
      
      if (error) throw error;
      
      setResetEmailSent(true);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error(error.message || "Failed to send password reset email");
    } finally {
      setIsLoading(false);
    }
  };

  if (resetEmailSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-sans text-center">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a password reset link to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="p-4 bg-blue-50 rounded-md flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-blue-500" />
            <p className="text-sm text-blue-700">
              If you don't see the email in your inbox, check your spam folder.
            </p>
          </div>
          <Button 
            className="w-full"
            onClick={() => {
              setIsResetPassword(false);
              setResetEmailSent(false);
            }}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isResetPassword) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-sans text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleResetPassword}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button className="w-full bg-black hover:bg-black/90 text-white" type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <div className="w-full text-center">
            <Button 
              type="button" 
              variant="link" 
              onClick={() => setIsResetPassword(false)}
              disabled={isLoading}
            >
              Back to login
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-sans text-center">
          {isSignUp ? 'Create an Account' : 'Sign In'}
        </CardTitle>
        <CardDescription className="text-center">
          {isSignUp 
            ? 'Enter your details to get access to all PR course materials' 
            : 'Sign in to access course materials'}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button 
          className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
          <span>{isLoading ? "Processing..." : isSignUp ? 'Sign up with Google' : 'Sign in with Google'}</span>
        </Button>
        
        <div className="flex items-center">
          <Separator className="flex-1" />
          <span className="mx-4 text-xs text-gray-500">OR</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleEmailSignIn}>
          <div className="grid gap-4">
            {isSignUp && (
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignUp}
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isLoading}
              />
            </div>
            
            {!isSignUp && (
              <div className="flex justify-end">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsResetPassword(true);
                  }}
                  disabled={isLoading}
                >
                  Forgot password?
                </Button>
              </div>
            )}
            
            <Button className="w-full bg-black hover:bg-black/90 text-white" type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm">
        <div className="w-full text-center">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => setIsSignUp(false)}
                className="underline text-black font-medium"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={() => setIsSignUp(true)}
                className="underline text-black font-medium"
                disabled={isLoading}
              >
                Create one
              </button>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EmailSignup;
