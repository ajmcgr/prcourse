
import React from 'react';

const PricingFeatures: React.FC = () => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center">
        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>The full blueprint to learn the A-Z of PR</span>
      </div>
      <div className="flex items-center">
        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>Full chapter content; text, audio and videos</span>
      </div>
      <div className="flex items-center">
        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>Suitable for both beginners and professionals</span>
      </div>
      <div className="flex items-center">
        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>30-day money-back guarantee</span>
      </div>
    </div>
  );
};

export default PricingFeatures;
