
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LetterSection: React.FC = () => {
  return (
    <section className="py-2 bg-background">
      <div className="max-w-2xl mx-auto px-6">
        <article className="bg-white p-8 md:p-12 shadow-sm border border-gray-200 rounded-md">
          <div className="mb-10 flex justify-center">
            <img 
              src="/lovable-uploads/dc42269e-ffc8-4cbd-857f-536419ecd159.png" 
              alt="Alex MacGregor" 
              className="w-40 h-40 rounded-full object-cover border-2 border-gray-100"
            />
          </div>
          
          <div className="space-y-6 text-gray-800 font-sans">
            <p className="text-xl font-medium">
              I'm Alex MacGregor, and I've spent the last eight years proving that great PR is equal parts art, science, and street‑level hustle.
            </p>
            
            <p>
              I cut my teeth launching consumer‑tech giants—Meizu, OPPO, and OnePlus—across the world.
            </p>
            
            <p>
              Navigating multiple languages, time zones, and regulatory mazes taught me how to craft stories that resonate — and hit revenue targets while we're at it.
            </p>
            
            <p>
              Collaborating with world‑class agencies like Ogilvy and Weber Shandwick sharpened my instincts for turning relationships into rocket fuel.
            </p>
            
            <p>
              Add in hands‑on mastery of PR software and AI tools, and I operate with real‑time data as my compass—no guesswork, no vanity metrics.
            </p>
            
            <p>
              Why am I the right guy to teach you PR? Because I've played every position that matters: brand lead and mar‑tech power user.
            </p>
            
            <p>
              I've chased embargoes at 3 a.m., soothed skeptical editors with fresh angles, and built influencer programs that survived algorithm earthquakes.
            </p>
            
            <p>
              I know the pressure of quarterly targets, the thrill of a viral moment, and the discipline it takes to turn buzz into long‑term brand equity.
            </p>
            
            <p>
              If you want PR advice that's battle‑tested, culturally fluent, and laser‑focused on measurable impact, pull up a chair. I'll show you how it's done.
            </p>
            
            <div className="pt-6 mt-8">
              <p className="italic">Best,</p>
              <p className="font-bold">Alex MacGregor</p>
              <a 
                href="https://www.linkedin.com/in/alexmacgregor2/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline block mt-2"
              >
                Connect with me on LinkedIn
              </a>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button className="bg-[#409EFF] hover:bg-[#409EFF]/90 text-white rounded-md px-8 py-6 text-sm md:text-base">
              <Link to="/signup?mode=signup">Get Access Now</Link>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default LetterSection;
