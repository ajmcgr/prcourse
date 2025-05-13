
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LetterSection from '@/components/LetterSection';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow py-16 md:py-24">
        <LetterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
