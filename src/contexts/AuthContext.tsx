
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  hasPaid: boolean;
  supabase: typeof supabase;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<{success: boolean, message: string}>;
  signOut: () => Promise<void>;
  updatePaymentStatus: (paid: boolean) => void;
  checkPaymentStatus: (userId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast.success("Successfully signed in!");
          // Check payment status when user signs in
          if (currentSession?.user) {
            checkPaymentStatus(currentSession.user.id);
          }
        }
        if (event === 'SIGNED_OUT') {
          toast.success("Successfully signed out!");
          setHasPaid(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        checkPaymentStatus(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const checkPaymentStatus = async (userId: string | undefined) => {
    if (!userId) {
      console.log("No user ID provided for payment check");
      return false;
    }
    
    try {
      console.log("Checking payment status for user:", userId);
      
      // Query the payments table to check if this user has a successful payment
      const { data, error } = await supabase
        .from('user_payments')
        .select('payment_status')
        .eq('user_id', userId)
        .eq('payment_status', 'completed')
        .maybeSingle();
      
      if (error) {
        console.error("Error checking payment status:", error);
        throw error;
      }
      
      const isPaid = !!data;
      console.log("Payment status check result:", isPaid ? "PAID" : "NOT PAID");
      setHasPaid(isPaid);
      return isPaid;
    } catch (error) {
      console.error("Error checking payment status:", error);
      setHasPaid(false);
      return false;
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log("Initializing Google sign in...");
      
      // Clear any previous auth errors that might be cached
      localStorage.removeItem('supabase.auth.error');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/course/introduction`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) throw error;
      console.log("Google sign in initiated:", data);
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast.error(error.message || "Failed to sign in with Google");
      throw error; // Re-throw to handle in component
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // If sign in is successful, check if we have a user
      if (data.user) {
        setUser(data.user);
        setSession(data.session);
        checkPaymentStatus(data.user.id);
      }
      
      return data;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      console.error("Email sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<{success: boolean, message: string}> => {
    try {
      console.log("Starting signup process with:", { email, name });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${window.location.origin}/course/introduction`,
        },
      });
      
      if (error) {
        // Handle rate limit error specifically
        if (error.message.includes('rate limit exceeded')) {
          console.log("Rate limit error detected during signup");
          
          // Try to sign in directly if the user might already exist
          try {
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (!signInError && signInData.user) {
              setUser(signInData.user);
              setSession(signInData.session);
              toast.success("Signed in successfully!");
              return { 
                success: true, 
                message: "Account accessed! Email confirmation rate limit was reached but you've been signed in."
              };
            } else {
              toast.error("Email rate limit exceeded. Please try again later or use a different email.");
              return { 
                success: false, 
                message: "Email rate limit exceeded. Please try again later or use a different email."
              };
            }
          } catch (signInError) {
            console.error("Error during signin attempt after rate limit:", signInError);
            return { 
              success: false, 
              message: "Email rate limit exceeded and couldn't sign you in. Please try again later."
            };
          }
        }
        
        // Handle other email sending errors
        if (error.message.includes('sending confirmation email')) {
          console.log("Email confirmation error, attempting direct signin");

          // Attempt to sign in directly after signup
          try {
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (!signInError && signInData.user) {
              setUser(signInData.user);
              setSession(signInData.session);
              toast.success("Account created successfully!");
              toast.info("Email confirmation is temporarily disabled", {
                duration: 6000
              });
              return { 
                success: true, 
                message: "Account created! Email confirmation is temporarily disabled but you can proceed."
              };
            } else {
              return { 
                success: true, 
                message: "Account created but we couldn't sign you in. Please try signing in manually."
              };
            }
          } catch (signInError) {
            console.error("Error during signin attempt after email error:", signInError);
            return {
              success: true,
              message: "Account created successfully but we couldn't sign you in. Please try manually."
            };
          }
        } else {
          throw error;
        }
      }
      
      console.log("Signup response:", data);
      
      // Check if email confirmation is enabled
      if (data.user) {
        console.log("User created:", data.user.id);
        
        if (data.session) {
          // Auto-confirmation is enabled (development mode)
          console.log("Session created, auto-confirmation is enabled");
          setUser(data.user);
          setSession(data.session);
          toast.success("Successfully signed up! You're now logged in.");
          return { success: true, message: "Account created and you're now logged in!" };
        } else {
          // Email confirmation required
          console.log("No session, email confirmation is required");
          
          // Try to sign in directly
          try {
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            
            if (!signInError && signInData.user) {
              setUser(signInData.user);
              setSession(signInData.session);
              return { success: true, message: "Account created and you're now logged in!" };
            } else {
              // Couldn't sign in automatically
              toast.success("Account created! Check your email to confirm your registration.");
              toast.info("If you don't see the email, check your spam folder or try signing in directly.", {
                duration: 6000
              });
              return { success: true, message: "Account created! Please check your email or sign in directly." };
            }
          } catch (signInError) {
            console.error("Error during signin attempt after signup:", signInError);
            toast.success("Check your email to confirm your registration!");
            return { success: true, message: "Account created! Please check your email to confirm registration." };
          }
        }
      } else {
        console.warn("Signup successful but no user returned");
        return { success: false, message: "Something went wrong during signup, but you can try signing in." };
      }
    } catch (error: any) {
      // Handle specific known errors
      if (error.message?.includes('already registered')) {
        toast.error("This email is already registered. Try signing in instead.");
        return { success: false, message: "This email is already registered. Try signing in instead." };
      } else {
        toast.error(error.message || "Failed to sign up");
        console.error("Sign up error:", error);
        return { success: false, message: error.message || "Failed to sign up" };
      }
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Force refresh to ensure all auth state is cleared
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      console.error("Sign out error:", error);
    }
  };
  
  const updatePaymentStatus = (paid: boolean) => {
    console.log("Updating payment status to:", paid ? "PAID" : "NOT PAID");
    setHasPaid(paid);
  };

  const value = {
    session,
    user,
    loading,
    hasPaid,
    supabase,
    signInWithGoogle,
    signInWithEmail,
    signUp,
    signOut,
    updatePaymentStatus,
    checkPaymentStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
