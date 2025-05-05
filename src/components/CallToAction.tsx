
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Master Public Relations?</h2>
        <p className="text-lg md:text-xl mb-8 text-gray-700">
          Join Alex MacGregor's comprehensive PR course and transform your PR strategy today.
        </p>
        <Button size="lg" className="bg-black hover:bg-black/90 text-white font-medium text-lg">
          <Link to="/signup">Get Access Now for $99</Link>
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;
