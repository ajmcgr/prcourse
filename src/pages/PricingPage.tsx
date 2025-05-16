
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';
import { useAuth } from '@/contexts/AuthContext';
import { getFirstLesson } from '@/utils/course-data';

const PricingPage = () => {
  const { user, loading, hasPaid } = useAuth();
  
  useEffect(() => {
    // Debugging log to track payment status on pricing page
    console.log("PricingPage rendered with:", {
      user: user?.id,
      userEmail: user?.email,
      hasPaid,
      loading
    });
  }, [user, hasPaid, loading]);

  // If authenticated, redirect to the homepage instead of checking payment status
  if (!loading && user) {
    console.log("User is authenticated, redirecting from pricing to homepage");
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-background text-pr-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get Access to the Complete PR Course</h1>
            <p className="text-xl max-w-2xl mx-auto">
              One-time payment for lifetime access to all course materials and future updates.
            </p>
          </div>
        </div>
        
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
