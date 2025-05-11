
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LetterSection from '@/components/LetterSection';
import CourseFeatures from '@/components/CourseFeatures';
import CourseContentTable from '@/components/CourseContentTable';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* PR Skills Image Section - Reduced spacing above and below */}
      <div className="w-full -mt-8 px-4 sm:px-6"> {/* Changed -mt-4 to -mt-8 to move it up further */}
        <div className="max-w-5xl mx-auto">
          <img 
            src="/lovable-uploads/f0847da8-f9ce-4357-bf49-d1d6a7bed030.png" 
            alt="Things That Make a Great PR Person" 
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
      
      <div className="py-8"></div> {/* Keeping the same py-8 for bottom spacing */}
      
      <LetterSection />
      <CourseFeatures />
      <CourseContentTable />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
