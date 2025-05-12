
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
  signUp: (email: string, password: string, name: string) => Promise<any>;
  signOut: () => Promise<void>;
  updatePaymentStatus: (paid: boolean) => void;
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
          checkPaymentStatus(currentSession?.user?.id);
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
    if (!userId) return;
    
    try {
      // Query a payments table to check if this user has a successful payment
      const { data, error } = await supabase
        .from('user_payments')
        .select('payment_status')
        .eq('user_id', userId)
        .eq('payment_status', 'completed')
        .maybeSingle();
      
      if (error) throw error;
      
      setHasPaid(!!data);
    } catch (error) {
      console.error("Error checking payment status:", error);
      setHasPaid(false);
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      console.error("Email sign in error:", error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
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
      
      if (error) throw error;
      
      // Check if email confirmation is enabled
      if (data.session) {
        // Auto-confirmation is enabled (development mode)
        toast.success("Successfully signed up! You're now logged in.");
      } else {
        // Email confirmation required
        toast.success("Check your email to confirm your registration!");
        toast.info("If you don't see the email, check your spam folder or contact support.", {
          duration: 6000
        });
      }
      
      return data; // Return data so component can check if session exists
    } catch (error: any) {
      // Handle specific known errors
      if (error.message?.includes('already registered')) {
        toast.error("This email is already registered. Try signing in instead.");
      } else {
        toast.error(error.message || "Failed to sign up");
      }
      console.error("Sign up error:", error);
      throw error; // Re-throw so component can handle it
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
      console.error("Sign out error:", error);
    }
  };
  
  const updatePaymentStatus = (paid: boolean) => {
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
