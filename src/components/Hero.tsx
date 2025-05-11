
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative h-auto md:h-[50vh] flex items-center bg-white -mt-16 pb-2 pt-24 md:pt-8"> 
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:pt-24 flex flex-col items-center text-center">
        <p className="text-xs md:text-sm tracking-normal font-medium text-gray-600 mb-3 animate-fade-in">
          Made for PR & social media pros, agencies and freelancers
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight animate-fade-in text-pr-dark">
          Master the Art of Public Relations
        </h1>
        <p className="mt-3 md:mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl animate-fade-in text-gray-700" style={{animationDelay: '0.2s'}}>
          A comprehensive course from Alex MacGregor featuring essays and video lessons to elevate your PR strategy and execution.
        </p>
        
        <div className="mt-6 md:mt-8 w-full animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full md:w-auto bg-black hover:bg-black/90 text-white font-medium text-lg px-6 py-5 md:py-6">
              <Link to="/signup">Get Access Now for $99</Link>
            </Button>
            
            {/* Senja Widget - Aligned in same row on desktop */}
            <div className="w-full md:w-auto md:min-w-[300px] md:max-w-[400px]">
              <div className="senja-embed" data-id="07ff3942-eab2-49dd-8952-8e59761f1472" data-mode="shadow" data-lazyload="false" style={{ display: "block", width: "100%" }}></div>
            </div>
          </div>
        </div>
        
        {/* Secure access text row - Mobile optimized */}
        <div className="flex justify-center mt-3 text-gray-700 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-row items-center space-x-3'} text-sm md:text-base font-medium`}>
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

export default Hero;
