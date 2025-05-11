
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LetterSection from '@/components/LetterSection';
import CourseFeatures from '@/components/CourseFeatures';
import CourseContentTable from '@/components/CourseContentTable';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getFirstLesson } from '@/utils/course-data';

const Index = () => {
  const { user } = useAuth();
  const { lesson } = getFirstLesson();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Access Content Button for Logged In Users */}
      {user && (
        <div className="w-full py-6 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <Link to={`/course/${lesson.slug}`}>
              <Button size="lg" className="bg-black hover:bg-black/90 text-white font-medium text-lg px-8 py-6">
                Access Course Content
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {/* PR Skills Image Section */}
      <div className="w-full mt-0 px-4 sm:px-6"> {/* Reduced mt-2 to mt-0 to remove spacing above */}
        <div className="max-w-5xl mx-auto">
          <img 
            src="/lovable-uploads/f0847da8-f9ce-4357-bf49-d1d6a7bed030.png" 
            alt="Things That Make a Great PR Person" 
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
      
      <div className="py-16"></div> {/* Increased from py-8 to py-16 to add more spacing below */}
      
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
