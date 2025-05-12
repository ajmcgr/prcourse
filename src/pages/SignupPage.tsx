
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailSignup from '@/components/EmailSignup';
import { Toaster } from "sonner";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="max-w-md w-full px-4 sm:px-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-pr-dark">Account Access</h1>
            <p className="mt-2 text-gray-600">
              Sign in or create an account to access the PR course
            </p>
          </div>
          <EmailSignup />
        </div>
      </main>
      
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default SignupPage;
