
import React from 'react';

const LogoSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-center text-lg md:text-xl font-medium text-gray-700 mb-8">
          Author has worked with
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {/* Company logos - using gray filters for a consistent look */}
          <div className="w-24 md:w-32 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/12b84bad-32f6-4d4b-bdb5-bdb41bdb48e1.png" 
              alt="OnePlus" 
              className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-24 md:w-32 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/927d15cd-25aa-4f44-a7f2-dfe7696582ab.png" 
              alt="OPPO" 
              className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-24 md:w-32 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/2f4e7034-1069-421f-9519-6c0b8442402c.png" 
              alt="Ogilvy" 
              className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-24 md:w-32 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/643494d7-8da8-4838-ace1-460614142bda.png" 
              alt="Weber Shandwick" 
              className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-24 md:w-32 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/3602e66e-ad10-4e97-a48b-eaeb07e28484.png" 
              alt="Publicis" 
              className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
