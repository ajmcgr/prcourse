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
  signInWithEmail: (email: string, password: string) => Promise<any>; // Changed return type to Promise<any> to match implementation
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
      
      return data; // Return the data so it can be used by the caller if needed
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      console.error("Email sign in error:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<{success: boolean, message: string}> => {
    try {
      console.log("Starting signup process with:", { email, name });
      
      // First, try to sign up through Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          // Don't use email redirect as it's causing issues
          // emailRedirectTo: `${window.location.origin}/course/introduction`,
        },
      });
      
      // Handle specific signup errors
      if (error) {
        // Check for rate limiting or already registered errors
        if (error.message.includes('rate limit') || error.message.includes('already registered')) {
          console.log(`Signup error: ${error.message}, attempting direct signin`);
          
          // Try to sign in directly if the error suggests the user might exist
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
                message: "Account accessed successfully! You've been signed in."
              };
            } else {
              // If we get here, the user might exist but the password is wrong
              return { 
                success: false, 
                message: error.message
              };
            }
          } catch (signInError: any) {
            console.error("Error during signin attempt after signup error:", signInError);
            return { 
              success: false, 
              message: error.message
            };
          }
        }
        
        // For other errors, return the error message
        return { success: false, message: error.message };
      }
      
      console.log("Signup response:", data);
      
      // If signup is successful but we need email verification
      if (data.user && !data.session) {
        console.log("User created but needs email verification:", data.user.id);
        
        // Try to sign in directly anyway - this is a workaround for email verification issues
        try {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (!signInError && signInData.user) {
            setUser(signInData.user);
            setSession(signInData.session);
            return { 
              success: true, 
              message: "Account created and you're now logged in!" 
            };
          } else {
            // If auto sign-in fails, return success but let the user know they need to sign in manually
            return { 
              success: true, 
              message: "Account created! Please sign in manually." 
            };
          }
        } catch (signInError: any) {
          console.error("Auto sign-in failed after signup:", signInError);
          return { 
            success: true, 
            message: "Account created! Please sign in manually."
          };
        }
      }
      
      // If signup returns both user and session (auto-confirmation)
      if (data.user && data.session) {
        console.log("User created with auto-confirmation:", data.user.id);
        setUser(data.user);
        setSession(data.session);
        return { 
          success: true, 
          message: "Account created and you're now logged in!" 
        };
      }
      
      // Fallback for unknown cases
      return { 
        success: true, 
        message: "Account created! Please check your email or sign in manually." 
      };
      
    } catch (error: any) {
      console.error("Unhandled signup error:", error);
      toast.error(error.message || "Failed to sign up");
      return { success: false, message: error.message || "Failed to sign up" };
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
