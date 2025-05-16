
import React from 'react';

interface ErrorDisplayProps {
  error: string | null;
  type?: 'payment' | 'general' | 'validation';
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, type = 'payment' }) => {
  if (!error) return null;
  
  const errorTitle = {
    payment: 'Payment Error',
    general: 'Error',
    validation: 'Validation Error'
  }[type];
  
  return (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
      <p className="font-semibold">{errorTitle}</p>
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay;
