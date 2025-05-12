
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
              src="/lovable-uploads/f862fff7-fec3-4e40-a4f8-11cd55dc164a.png" 
              alt="OnePlus" 
              className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-24 md:w-32 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/344671ee-a323-47fb-8cb6-1cc3984e5918.png" 
              alt="OPPO" 
              className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-24 md:w-32 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/902b33b4-bd83-45ef-9004-59e74d576472.png" 
              alt="Ogilvy" 
              className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-24 md:w-32 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/b901b1d3-44f5-41f3-b4e2-64eede3ed545.png" 
              alt="Weber Shandwick" 
              className="max-h-12 max-w-full object-contain filter grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all"
            />
          </div>
          
          <div className="w-24 md:w-32 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/f0847da8-f9ce-4357-bf49-d1d6a7bed030.png" 
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
