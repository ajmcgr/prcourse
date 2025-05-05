
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailSignup from '@/components/EmailSignup';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-pr-main text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">Get Access to the Complete PR Course</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Enter your email to unlock essays and video lessons on PR strategy, media relations, and more.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold font-serif text-pr-dark mb-6">What You'll Get</h2>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Immediate access to all course materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">4 in-depth video lessons on PR strategy</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">4 comprehensive essays on modern PR techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Lifetime updates to course content</span>
                </li>
              </ul>
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-gray-700 italic">
                  "This course completely transformed our company's PR approach. The practical strategies were 
                  incredibly valuable and immediately applicable."
                </p>
                <p className="mt-2 font-medium text-pr-dark">— David Miller, Communications Director</p>
              </div>
            </div>
            <div>
              <EmailSignup />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignupPage;
