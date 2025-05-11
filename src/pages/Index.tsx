
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
      
      {/* PR Skills Image Section */}
      <div className="w-full py-2">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <img 
            src="/lovable-uploads/f0847da8-f9ce-4357-bf49-d1d6a7bed030.png" 
            alt="Things That Make a Great PR Person" 
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
      
      <div className="py-8"></div> {/* Added spacing div between image and letter section */}
      
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
