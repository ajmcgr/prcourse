
import React from 'react';

const LogoSection: React.FC = () => {
  return (
    <section className="pb-12 md:pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-center text-lg md:text-xl font-medium text-gray-700 mb-8">
          Author has worked with
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {/* Company logos - using the new uploaded images */}
          <div className="w-40 md:w-48 h-20 flex items-center justify-center">
            <img 
              src="/lovable-uploads/70b18f87-de1b-4e21-b233-19e3a19fcd28.png" 
              alt="OnePlus" 
              className="max-h-20 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-40 md:w-48 h-20 flex items-center justify-center">
            <img 
              src="/lovable-uploads/14660075-013f-441e-9db5-a33db1cb286e.png" 
              alt="OPPO" 
              className="max-h-20 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-40 md:w-48 h-20 flex items-center justify-center">
            <img 
              src="/lovable-uploads/ad5ba133-521b-4560-855c-84ba05079630.png" 
              alt="Ogilvy" 
              className="max-h-20 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-40 md:w-48 h-20 flex items-center justify-center">
            <img 
              src="/lovable-uploads/f5a1926b-3683-4471-b403-07e68b95283e.png" 
              alt="Weber Shandwick" 
              className="max-h-20 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-40 md:w-48 h-20 flex items-center justify-center">
            <img 
              src="/lovable-uploads/5c759c31-a541-49fb-b45c-e53459b32469.png" 
              alt="Publicis" 
              className="max-h-20 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
