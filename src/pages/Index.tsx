
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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      
      {/* New image section between Hero and LetterSection */}
      <div className="w-full bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <img 
            src="/lovable-uploads/2a12047c-9dd9-42af-9de3-3991f6e7ae70.png" 
            alt="Things That Make a Great PR Person" 
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
      
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
