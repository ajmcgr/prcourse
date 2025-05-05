
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="max-w-2xl mx-auto bg-white p-6 border-b border-gray-200">
            <div className="mb-10 flex justify-center">
              <img 
                src="/lovable-uploads/dc42269e-ffc8-4cbd-857f-536419ecd159.png" 
                alt="Alex MacGregor" 
                className="w-40 h-40 rounded-full object-cover"
              />
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
              
              <div className="pt-6 border-t border-gray-200 mt-8">
                <p className="italic">Best,</p>
                <p className="font-bold">Alex MacGregor</p>
              </div>
            </div>
            
            <div className="mt-10 flex justify-center">
              <Button className="bg-pr-main hover:bg-pr-dark">
                <Link to="/signup">Get Access Now</Link>
              </Button>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
