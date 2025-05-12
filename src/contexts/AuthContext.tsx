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
  signInWithEmail: (email: string, password: string) => Promise<any>; 
  signUp: (email: string, password: string, name: string) => Promise<{success: boolean, message: string, autoSignedIn: boolean}>;
  signOut: () => Promise<void>;
  updatePaymentStatus: (paid: boolean) => Promise<{error?: Error}>;
  checkPaymentStatus: (userId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasPaid, setHasPaid] = useState(false);
  const [isInitialCheck, setIsInitialCheck] = useState(true);

  // Improved payment status checking function with better error handling
  const checkPaymentStatus = async (userId: string | undefined) => {
    if (!userId) {
      console.log("No user ID provided for payment check");
      setHasPaid(false);
      return false;
    }
    
    try {
      console.log("Checking payment status for user:", userId);
      
      // Query the payments table to check if this user has a successful payment
      const { data, error } = await supabase
        .from('user_payments')
        .select('payment_status, updated_at, stripe_session_id')
        .eq('user_id', userId)
        .eq('payment_status', 'completed')
        .order('updated_at', { ascending: false })
        .maybeSingle();
      
      if (error) {
        console.error("Error checking payment status:", error);
        setHasPaid(false);
        return false;
      }
      
      const isPaid = !!data;
      console.log("Payment status check result:", isPaid ? "PAID" : "NOT PAID", data);
      
      // Update the hasPaid state
      setHasPaid(isPaid);
      return isPaid;
    } catch (error) {
      console.error("Error checking payment status:", error);
      setHasPaid(false);
      return false;
    }
  };

  useEffect(() => {
    console.log("AuthProvider initialized - setting up auth state listener");
    
    // IMPORTANT: Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        
        // Update session and user state
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast.success("Successfully signed in!");
          
          // Use timeout to avoid deadlock with Supabase auth listener
          if (currentSession?.user) {
            setTimeout(() => {
              console.log("Checking payment status after sign-in");
              checkPaymentStatus(currentSession.user.id);
            }, 0);
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
      console.log("Initial session check:", currentSession ? "Found session" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        console.log("Found existing session, checking payment status");
        // Force immediate payment status check
        checkPaymentStatus(currentSession.user.id)
          .then(isPaid => {
            console.log("Initial payment status check:", isPaid ? "PAID" : "NOT PAID");
          })
          .catch(err => {
            console.error("Error during initial payment check:", err);
          });
      }
      
      setLoading(false);
      setIsInitialCheck(false);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const updatePaymentStatus = async (paid: boolean) => {
    try {
      if (!user) {
        return { error: new Error("User not authenticated") };
      }
      
      console.log("Updating payment status to:", paid ? "PAID" : "NOT PAID");
      
      // Insert or update payment record in database with better error handling
      try {
        // Check if a payment record already exists to avoid duplicate key errors
        const { data: existingPayment, error: fetchError } = await supabase
          .from('user_payments')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (fetchError) {
          console.error("Error checking existing payment record:", fetchError);
          return { error: new Error(`Database error: ${fetchError.message}`) };
        }
        
        let error;
        
        if (existingPayment) {
          // Update existing record
          console.log("Updating existing payment record");
          const result = await supabase
            .from('user_payments')
            .update({
              payment_status: paid ? 'completed' : 'pending',
              updated_at: new Date().toISOString()
            })
            .eq('id', existingPayment.id);
            
          error = result.error;
        } else {
          // Insert new record
          console.log("Creating new payment record");
          const result = await supabase
            .from('user_payments')
            .insert({
              user_id: user.id,
              payment_status: paid ? 'completed' : 'pending',
              amount: 9900, // $99.00
              updated_at: new Date().toISOString()
            });
            
          error = result.error;
        }
        
        if (error) {
          console.error("Database operation failed:", error);
          return { error: new Error(`Failed to save payment: ${error.message}`) };
        }
      } catch (dbError: any) {
        console.error("Exception during database operation:", dbError);
        return { error: new Error(`Database exception: ${dbError.message}`) };
      }
      
      // Update local state
      setHasPaid(paid);
      return {};
    } catch (error: any) {
      console.error("Error updating payment status:", error);
      return { error };
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
          redirectTo: `${window.location.origin}/pricing`,
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
      console.log("Attempting to sign in with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // If sign in is successful, check if we have a user
      if (data.user) {
        console.log("Sign in successful, user:", data.user.id);
        setUser(data.user);
        setSession(data.session);
        
        // Force immediate payment status check after login
        setTimeout(async () => {
          const isPaid = await checkPaymentStatus(data.user.id);
          console.log("Payment status after login:", isPaid ? "PAID" : "NOT PAID");
        }, 0);
      }
      
      return data;
    } catch (error: any) {
      console.error("Email sign in error:", error);
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<{success: boolean, message: string, autoSignedIn: boolean}> => {
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
          // Explicitly set this to undefined to avoid email redirect conflicts
          emailRedirectTo: undefined,
        },
      });
      
      // Handle specific signup errors
      if (error) {
        // Check for rate limiting or already registered errors
        if (error.message.includes('rate limit') || error.message.includes('already registered')) {
          console.log(`Signup error: ${error.message}, attempting direct signin`);
          
          // Try to sign in directly if the error suggests the user might exist
          try {
            console.log("Attempting direct sign-in after error:", error.message);
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });

            if (!signInError && signInData.user) {
              console.log("Direct sign-in successful after signup error");
              setUser(signInData.user);
              setSession(signInData.session);
              toast.success("Signed in successfully!");
              return { 
                success: true, 
                message: "Account accessed successfully! You've been signed in.",
                autoSignedIn: true
              };
            } else {
              console.log("Direct sign-in failed after signup error:", signInError);
              // If we get here, the user might exist but the password is wrong
              return { 
                success: false, 
                message: error.message,
                autoSignedIn: false
              };
            }
          } catch (signInError: any) {
            console.error("Error during signin attempt after signup error:", signInError);
            return { 
              success: false, 
              message: error.message,
              autoSignedIn: false
            };
          }
        }
        
        // For other errors, return the error message
        return { success: false, message: error.message, autoSignedIn: false };
      }
      
      console.log("Signup response:", data);
      
      // If signup is successful but we need email verification (most common case)
      if (data.user && !data.session) {
        console.log("User created but needs email verification:", data.user.id);
        
        // Try to sign in directly anyway - this is a fix for automatic sign-in
        try {
          console.log("Attempting automatic sign-in immediately after signup");
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (!signInError && signInData.user) {
            console.log("Auto sign-in successful after signup!");
            setUser(signInData.user);
            setSession(signInData.session);
            return { 
              success: true, 
              message: "Account created and you're now logged in!", 
              autoSignedIn: true
            };
          } else {
            console.log("Auto sign-in failed after signup:", signInError);
            // For the case where auto-confirmation is disabled but auto-signin works
            if (signInError && signInError.message.includes('Email not confirmed')) {
              return { 
                success: true, 
                message: "Please check your email for a confirmation email and follow the link to verify your account.", 
                autoSignedIn: false
              };
            }
            // Updated message to instruct user to check email
            return { 
              success: true, 
              message: "Please check your email for a confirmation email and follow the link to verify your account.", 
              autoSignedIn: false
            };
          }
        } catch (signInError: any) {
          console.error("Auto sign-in failed after signup:", signInError);
          return { 
            success: true, 
            message: "Please check your email for a confirmation email and follow the link to verify your account.",
            autoSignedIn: false
          };
        }
      }
      
      // If signup returns both user and session (auto-confirmation worked)
      if (data.user && data.session) {
        console.log("User created with auto-confirmation:", data.user.id);
        setUser(data.user);
        setSession(data.session);
        return { 
          success: true, 
          message: "Account created and you're now logged in!", 
          autoSignedIn: true
        };
      }
      
      // Fallback for unknown cases - updated message
      return { 
        success: true, 
        message: "Please check your email for a confirmation email and follow the link to verify your account.", 
        autoSignedIn: false
      };
      
    } catch (error: any) {
      console.error("Unhandled signup error:", error);
      toast.error(error.message || "Failed to sign up");
      return { success: false, message: error.message || "Failed to sign up", autoSignedIn: false };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setHasPaid(false);
      setUser(null);
      setSession(null);
      
      // Navigate to home page
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      console.error("Sign out error:", error);
    }
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

  console.log("AuthProvider current state:", { 
    userId: user?.id, 
    isAuthenticated: !!user, 
    hasPaid, 
    isLoading: loading,
    isInitialCheck 
  });

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
