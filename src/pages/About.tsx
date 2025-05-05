
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold">About the Course</h1>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-pr-dark mb-6">Comprehensive PR Education</h2>
              <p className="text-lg text-gray-700 mb-4">
                This public relations course is designed to provide professionals at all levels with the knowledge, 
                skills, and practical insights needed to excel in today's complex PR landscape.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Whether you're new to PR or a seasoned practitioner looking to refine your approach, our carefully 
                structured course combines theoretical foundations with real-world applications.
              </p>
              <Button className="bg-pr-main hover:bg-pr-dark">
                <Link to="/signup">Get Access Now</Link>
              </Button>
            </div>
            <div className="bg-white border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl text-pr-dark mb-4">Course Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">8 comprehensive modules</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">4 in-depth video lessons</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">4 detailed essay series</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Practical examples and case studies</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Lifetime access to all materials</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-pr-dark mb-6">Course Creator</h2>
            <div className="bg-white border p-8 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/a330be60-4d47-45c4-b45e-ac4bc65bab31.png" 
                    alt="Alex MacGregor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-pr-dark mb-2">Alex MacGregor</h3>
                  <p className="text-gray-600 mb-4">PR Expert & Course Creator</p>
                  <div className="text-gray-700 space-y-4">
                    <p>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
