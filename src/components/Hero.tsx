
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Check } from 'lucide-react';

const Hero: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // YouTube iframe API requires a global callback function
    // This adds the YouTube iframe API script
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  return (
    <div className="relative h-[90vh] flex items-center overflow-hidden bg-white -mt-16 w-screen">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full opacity-80">
        <div className="relative w-full h-full">
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/7n5fAI9Dml4?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=7n5fAI9Dml4"
            title="PR Masterclass Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-1/2 left-1/2 w-[120%] h-[120%] min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ border: "none" }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
      
      {/* Dark overlay to make text more readable */}
      <div className="absolute inset-0 bg-black opacity-30 z-5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white pt-32">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
          Master the Art of Public Relations
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-3xl animate-fade-in text-white" style={{animationDelay: '0.2s'}}>
          A comprehensive course from Alex MacGregor featuring essays and video lessons to elevate your PR strategy and execution.
        </p>
        
        <div className="mt-10 animate-fade-in flex flex-col md:flex-row items-center" style={{animationDelay: '0.4s'}}>
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
            <Button size="lg" className="bg-white hover:bg-white/90 text-pr-dark font-medium text-lg">
              <Link to="/signup">Get Access Now for $99</Link>
            </Button>
            
            {/* Senja Widget */}
            <div className="mt-6 md:mt-0 w-full md:w-auto min-w-[300px]">
              <div className="senja-embed" data-id="07ff3942-eab2-49dd-8952-8e59761f1472" data-mode="shadow" data-lazyload="false" style={{ display: "block", width: "100%" }}></div>
            </div>
          </div>
        </div>
        
        {/* Added secure access text row */}
        <div className="flex justify-center md:justify-start mt-4 text-white animate-fade-in" style={{animationDelay: '0.5s'}}>
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
              Cancel any-time
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
