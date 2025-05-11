
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative h-auto md:h-[75vh] flex items-center bg-white -mt-16 pb-12 pt-32 md:pt-20"> 
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 flex flex-col items-center text-center">
        <p className="text-xs md:text-sm tracking-normal font-medium text-gray-600 mb-8 animate-fade-in">
          Made for PR & social media pros, agencies and freelancers
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight animate-fade-in text-pr-dark">
          Master the Art of Public Relations
        </h1>
        <p className="mt-8 md:mt-10 text-lg md:text-xl lg:text-2xl max-w-3xl animate-fade-in text-gray-700" style={{animationDelay: '0.2s'}}>
          A comprehensive course from Alex MacGregor featuring essays and video lessons to elevate your PR strategy and execution.
        </p>
        
        <div className="mt-12 md:mt-16 w-full animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Button size="lg" className="w-full md:w-auto bg-black hover:bg-black/90 text-white font-medium text-lg px-8 py-6 md:py-7">
              <Link to="/signup">Get Access Now for $99</Link>
            </Button>
            
            {/* Senja Widget - Aligned in same row on desktop */}
            <div className="w-full md:w-auto md:min-w-[300px] md:max-w-[400px] mt-8 md:mt-0">
              <div className="senja-embed" data-id="07ff3942-eab2-49dd-8952-8e59761f1472" data-mode="shadow" data-lazyload="false" style={{ display: "block", width: "100%" }}></div>
            </div>
          </div>
        </div>
        
        {/* Secure access text row - Mobile optimized */}
        <div className="flex justify-center mt-10 text-gray-700 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-row items-center space-x-6'} text-sm md:text-base font-medium`}>
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Get access now
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Secure payment
            </span>
            <span className="flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
