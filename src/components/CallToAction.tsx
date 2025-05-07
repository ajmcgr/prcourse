
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Master Public Relations?</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-700">
          Join Alex MacGregor's comprehensive PR course and transform your PR strategy today.
        </p>
        <Button size="lg" className="bg-black hover:bg-black/90 text-white font-medium text-lg px-6 py-6">
          <Link to="/signup">Get Access Now for $99</Link>
        </Button>
        
        {/* Added secure access text row */}
        <div className="flex justify-center mt-4 text-gray-700">
          <div className="flex items-center space-x-3 text-sm md:text-base font-medium">
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-1" />
              Get access now
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-1" />
              Secure payment
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-1" />
              Money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
