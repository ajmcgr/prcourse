
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CallToAction: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-background py-12 md:py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Master Public Relations?</h2>
        <p className="text-base md:text-xl mb-6 md:mb-8 text-gray-700">
          Join my comprehensive PR course and transform your PR strategy today.
        </p>
        <Button size="lg" className="bg-[#409EFF] hover:bg-[#409EFF]/90 text-white font-medium text-base md:text-lg px-4 md:px-6 py-5 md:py-6 w-full md:w-auto">
          <Link to="/signup?mode=signup">Get Access Now for $99</Link>
        </Button>
        
        {/* Added secure access text row with mobile optimization - Made smaller */}
        <div className="flex justify-center mt-4 text-gray-700">
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-3'} text-xs font-medium`}>
            <span className="flex items-center justify-center">
              <Check className="h-3 w-3 mr-1" />
              Get access now
            </span>
            <span className="flex items-center justify-center">
              <Check className="h-3 w-3 mr-1" />
              Secure payment
            </span>
            <span className="flex items-center justify-center">
              <Check className="h-3 w-3 mr-1" />
              Money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
