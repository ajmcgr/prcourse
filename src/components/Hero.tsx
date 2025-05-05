
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
    <div className="relative h-[70vh] flex items-center overflow-hidden bg-black -mt-16 w-full">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden w-full h-full opacity-80">
        <div className="relative w-full h-full">
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/x2S3wo5SCYg?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=x2S3wo5SCYg"
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
          Master the Art of Public Relations
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-3xl animate-fade-in text-white" style={{animationDelay: '0.2s'}}>
          A comprehensive course featuring expert essays and video lessons to elevate your PR strategy and execution.
        </p>
        <div className="mt-10 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Button size="lg" className="bg-white hover:bg-white/90 text-pr-dark font-medium text-lg">
            <Link to="/signup">Get Access Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
