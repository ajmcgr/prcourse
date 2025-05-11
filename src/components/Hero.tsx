
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[50vh] flex items-center bg-white -mt-16 pb-2"> {/* Reduced height from 60vh to 50vh and decreased bottom padding */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 flex flex-col items-center text-center"> {/* Reduced vertical padding from py-8 to py-6 */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in text-pr-dark">
          Master the Art of Public Relations
        </h1>
        <p className="mt-4 text-xl md:text-2xl max-w-3xl animate-fade-in text-gray-700" style={{animationDelay: '0.2s'}}> {/* Reduced top margin from mt-6 to mt-4 */}
          A comprehensive course from Alex MacGregor featuring essays and video lessons to elevate your PR strategy and execution.
        </p>
        
        <div className="mt-8 animate-fade-in" style={{animationDelay: '0.4s'}}> {/* Reduced top margin from mt-10 to mt-8 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4"> {/* Reduced gap from 6 to 4 */}
            <Button size="lg" className="bg-black hover:bg-black/90 text-white font-medium text-lg px-6 py-6">
              <Link to="/signup">Get Access Now for $99</Link>
            </Button>
            
            {/* Senja Widget */}
            <div className="min-w-[300px] max-w-[400px]">
              <div className="senja-embed" data-id="07ff3942-eab2-49dd-8952-8e59761f1472" data-mode="shadow" data-lazyload="false" style={{ display: "block", width: "100%" }}></div>
            </div>
          </div>
        </div>
        
        {/* Added secure access text row */}
        <div className="flex justify-center mt-3 text-gray-700 animate-fade-in" style={{animationDelay: '0.5s'}}> {/* Reduced top margin from mt-4 to mt-3 */}
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

export default Hero;
