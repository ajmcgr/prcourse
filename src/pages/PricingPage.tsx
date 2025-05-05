
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-white text-pr-dark py-12">
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
