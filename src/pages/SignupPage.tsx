
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { getFirstLesson } from '@/utils/course-data';
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2 } from 'lucide-react';

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');
  const { user, signInWithEmail, signUp, signInWithGoogle, loading, hasPaid } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState<string | null>(null);
  
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
    
    if (!email || !password) {
      setFormError('Please enter your email and password.');
      return;
    }
    
    try {
      if (isLogin) {
        // Sign In
        await signInWithEmail(email, password);
        toast.success("Login successful!");
      } else {
        // Sign Up
        if (!name) {
          setFormError('Please enter your name.');
          return;
        }
        
        const result = await signUp(email, password, name);
        if (!result.success) {
          // Even if there's an error, if it's a database error about existing user,
          // we should still show the success screen
          if (result.message.includes('duplicate key') || result.message.includes('Database error')) {
            setSuccessEmail(email);
            setSignupSuccess(true);
            toast.info("An account with this email already exists. Please check your inbox for verification email.");
          } else {
            setFormError(result.message);
          }
        } else {
          setSuccessEmail(email);
          setSignupSuccess(true);
          toast.success("Signup successful! Please check your email to verify your account.");
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      
      // If this is a database error about existing user, still show success screen
      if (error.message?.includes('duplicate key') || error.message?.includes('Database error')) {
        setSuccessEmail(email);
        setSignupSuccess(true);
        toast.info("An account with this email already exists. Please check your inbox for verification email.");
      } else {
        setFormError(error.message || 'An error occurred during authentication.');
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: successEmail,
      });
      
      if (error) {
        if (error.message.includes("rate limit")) {
          toast.error("Email rate limit exceeded. Please wait a few minutes before trying again.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Verification email sent! Please check your inbox.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to resend verification email");
    }
  };
  
  // If signup successful, show success screen
  if (signupSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign Up Successful!
            </h2>
            <p className="mt-2 text-center text-gray-600">
              We've sent a verification email to <strong>{successEmail}</strong>
            </p>
            <p className="mt-4 text-center text-gray-600">
              Please check your inbox (and spam folder) and click the verification link to activate your account.
            </p>
          </div>
          <div className="mt-8">
            <Button
              onClick={handleResendVerification}
              className="w-full py-2 px-4"
              variant="outline"
            >
              Resend verification email
            </Button>
          </div>
          <div className="text-sm text-center mt-4">
            <button 
              onClick={() => setIsLogin(true)}
              className="font-medium text-blue-500 hover:text-blue-700"
            >
              Return to sign in
            </button>
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
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
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
