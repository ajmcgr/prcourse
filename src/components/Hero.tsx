
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[70vh] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop)', 
        }}
      >
        <div className="hero-overlay"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
          Master the Art of Public Relations
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-3xl animate-fade-in" style={{animationDelay: '0.2s'}}>
          A comprehensive course featuring expert essays and video lessons to elevate your PR strategy and execution.
        </p>
        <div className="mt-10 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Button size="lg" className="bg-pr-accent hover:bg-pr-accent/90 text-pr-dark font-medium text-lg">
            <Link to="/signup">Get Access Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
