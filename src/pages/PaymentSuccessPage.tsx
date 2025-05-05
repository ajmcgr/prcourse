
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const PaymentSuccessPage = () => {
  const { user, updatePaymentStatus } = useAuth();

  useEffect(() => {
    const updateUserPaymentStatus = async () => {
      if (!user) return;

      try {
        // Record successful payment in database
        const { error } = await supabase
          .from('user_payments')
          .upsert({
            user_id: user.id,
            payment_status: 'completed',
            amount: 9900, // $99.00 in cents
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error updating payment status:', error);
          return;
        }

        // Update context state to reflect successful payment
        updatePaymentStatus(true);
      } catch (err) {
        console.error('Error in payment success handling:', err);
      }
    };

    updateUserPaymentStatus();
  }, [user, updatePaymentStatus]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-md w-full px-4 sm:px-6 text-center">
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-pr-dark mb-4">Thank You for Your Purchase!</h1>
          <p className="text-gray-600 mb-8">
            Your payment was successful. You now have full access to the PR Masterclass course.
            All content is now available in your account.
          </p>
          
          <div className="space-y-4">
            <Button asChild className="w-full bg-black hover:bg-black/90">
              <Link to="/content">Access Course Content</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
