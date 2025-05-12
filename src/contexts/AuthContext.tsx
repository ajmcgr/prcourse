import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  hasPaid: boolean;
  signUp: (email: string, password: string, name?: string, redirectTo?: string) => Promise<{ data: any, error: any, session?: Session | null }>;
  signIn: (email: string, password: string) => Promise<{ data: any, error: any }>;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ data: any, error: any }>;
  signInWithGoogle: () => Promise<void>;
  updatePaymentStatus: (status: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.info('Auth state changed: INITIAL_SESSION');
    
    const { data } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event);
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
      
      if (event === 'SIGNED_IN') {
        // Handle sign-in event (e.g., redirect to dashboard)
        if (currentSession?.user) {
          // Check if the user has paid
          const { data: paymentData, error: paymentError } = await supabase
            .from('user_payments')
            .select('payment_status')
            .eq('user_id', currentSession.user.id)
            .eq('payment_status', 'completed')
            .single();
          
          if (paymentData) {
            setHasPaid(true);
          }
        }
        navigate('/course');
      }
      if (event === 'SIGNED_OUT') {
        // Handle sign-out event
        setHasPaid(false);
        navigate('/');
      }
    });
    
    // Get initial session
    const initializeAuth = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      // If user is logged in, check payment status
      if (initialSession?.user) {
        try {
          const { data: paymentData } = await supabase
            .from('user_payments')
            .select('payment_status')
            .eq('user_id', initialSession.user.id)
            .eq('payment_status', 'completed')
            .single();
          
          if (paymentData) {
            setHasPaid(true);
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      }
      
      setLoading(false);
    };
    
    initializeAuth();
    
    // Cleanup subscription on unmount
    return () => {
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email: string, password: string, name?: string, redirectTo?: string) => {
    try {
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo || `${window.location.origin}/course/introduction`,
          data: {
            full_name: name || '',
          }
        },
      });

      console.log('Sign up response:', response);
      
      if (response.error) {
        toast.error(response.error.message);
      } else if (response.data?.user) {
        toast.success('Check your email for the confirmation link!');
      }
      
      return { ...response, session: response.data.session };
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to sign up');
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (response.error) {
        toast.error(response.error.message);
      }
      
      return response;
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
      return { data: null, error };
    }
  };
  
  // Alias for signIn to match the component usage
  const signInWithEmail = signIn;
  
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/course/introduction`,
        }
      });
      
      if (error) {
        console.error('Google sign-in error:', error);
        toast.error(error.message || 'Failed to sign in with Google');
      }
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast.error(error.message || 'Failed to sign in with Google');
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.info('Signed out successfully');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error(error.message || 'Failed to sign out');
    }
  };
  
  const updatePaymentStatus = (status: boolean) => {
    setHasPaid(status);
  };

  const value = {
    user,
    session,
    loading,
    hasPaid,
    signUp,
    signIn,
    signOut,
    signInWithEmail,
    signInWithGoogle,
    updatePaymentStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
