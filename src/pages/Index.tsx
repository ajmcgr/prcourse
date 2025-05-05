
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LetterSection from '@/components/LetterSection';
import CourseFeatures from '@/components/CourseFeatures';
import Testimonials from '@/components/Testimonials';
import CoursePreview from '@/components/CoursePreview';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      <LetterSection />
      <CourseFeatures />
      <CoursePreview />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
