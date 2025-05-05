
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-white border-b text-pr-dark py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold">About the Course</h1>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12 flex items-center gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="/lovable-uploads/a330be60-4d47-45c4-b45e-ac4bc65bab31.png" 
                alt="Alex MacGregor" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-pr-dark mb-1">Alex MacGregor</h2>
              <p className="text-gray-600">PR Expert & Course Creator</p>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p className="text-xl">
              I'm Alex MacGregor, and I've spent the last eight years proving that great PR is equal parts art, science, and street‑level hustle.
            </p>
            
            <p>
              I cut my teeth launching consumer‑tech giants—Meizu, OPPO, and OnePlus—across the hyper‑competitive markets of Greater China and APAC. Navigating multiple languages, time zones, and regulatory mazes taught me how to craft stories that resonate from Shanghai boardrooms to Singapore coffee shops—and hit revenue targets while they're at it.
            </p>
            
            <p>
              Collaborating with world‑class agencies like Ogilvy and Weber Shandwick sharpened my instincts for turning relationships into rocket fuel. Add in hands‑on mastery of Meltwater and Cision, and I operate with real‑time data as my compass—no guesswork, no vanity metrics.
            </p>
            
            <p>
              Why am I the right guy to teach you PR? Because I've played every position that matters: brand lead and mar‑tech power user. I've chased embargoes at 3 a.m., soothed skeptical editors with fresh angles, and built influencer programs that survived algorithm earthquakes. I know the pressure of quarterly targets, the thrill of a viral moment, and the discipline it takes to turn buzz into long‑term brand equity.
            </p>
            
            <p>
              If you want PR advice that's battle‑tested, culturally fluent, and laser‑focused on measurable impact, pull up a chair. I'll show you how it's done.
            </p>
            
            <div className="mt-10 pt-8 border-t border-gray-200">
              <Button className="bg-pr-main hover:bg-pr-dark">
                <Link to="/signup">Get Access Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
