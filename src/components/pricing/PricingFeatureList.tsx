
import React from 'react';

const PricingFeatureList: React.FC = () => {
  const features = [
    "The full blueprint to learn the A-Z of PR",
    "Full chapter content; text, audio and videos",
    "Suitable for both beginners and professionals",
    "30-day money-back guarantee"
  ];

  return (
    <div className="space-y-4 mb-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default PricingFeatureList;
