
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailSignup from '@/components/EmailSignup';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-md w-full px-4 sm:px-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-pr-dark">Sign In</h1>
            <p className="mt-2 text-gray-600">
              Get access to the PR course materials
            </p>
          </div>
          <EmailSignup />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupPage;
