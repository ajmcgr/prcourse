
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
      
      {/* Image with minimal padding */}
      <div className="w-full py-6 mb-12">
        <div className="max-w-5xl mx-auto px-4">
          <img 
            src="/lovable-uploads/b8bde38e-9849-4784-ab6d-6e57e0caca4a.png" 
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
