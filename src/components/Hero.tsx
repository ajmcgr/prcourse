
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative h-auto flex items-center bg-background -mt-16 pt-24 md:pt-20"> 
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-28 flex flex-col items-center text-center">
        <p className="text-xs md:text-sm tracking-normal font-medium text-gray-600 mb-4 animate-fade-in">
          Made for PR & Social Media Pros, Agencies and Freelancers
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight animate-fade-in text-pr-dark">
          Master the Art of Public Relations
        </h1>
        <p className="mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl max-w-3xl animate-fade-in text-gray-700" style={{animationDelay: '0.2s'}}>
          A comprehensive course from Alex MacGregor featuring essays and video lessons to elevate your PR strategy and execution.
        </p>
        
        <div className="mt-6 md:mt-12 w-full animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <Button size="lg" className="w-full md:w-auto bg-[#409EFF] hover:bg-[#409EFF]/90 text-white font-medium text-base md:text-lg px-4 md:px-8 py-5 md:py-6">
              <Link to="/signup">Get Access Now for $99</Link>
            </Button>
            
            {/* Senja Widget - Optimized for mobile */}
            <div className="w-full md:w-auto md:min-w-[300px] md:max-w-[400px] mt-4 md:mt-0">
              <div className="senja-embed" data-id="07ff3942-eab2-49dd-8952-8e59761f1472" data-mode="shadow" data-lazyload="false" style={{ display: "block", width: "100%" }}></div>
            </div>
          </div>
        </div>
        
        {/* Secure access text row - Mobile optimized */}
        <div className="flex justify-center mt-4 md:mt-6 text-gray-700 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'flex-row items-center space-x-6'} text-sm md:text-base font-medium`}>
            <span className="flex items-center justify-center">
              <Check className="h-4 w-4 mr-2" />
              Get access now
            </span>
            <span className="flex items-center justify-center">
              <Check className="h-4 w-4 mr-2" />
              Secure payment
            </span>
            <span className="flex items-center justify-center">
              <Check className="h-4 w-4 mr-2" />
              Money-back guarantee
            </span>
          </div>
        </div>
        
        {/* PR Skills Image Section - Updated with new image */}
        <div className="w-full mt-6 md:mt-12 px-2 md:px-6 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <div className="max-w-5xl mx-auto">
            <img 
              src="/lovable-uploads/a6d36b7c-e8e5-45eb-b2e6-2816d5da2318.png" 
              alt="Things That Make a Great PR Person" 
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
