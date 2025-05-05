
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-pr-main text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold font-serif">About the Course</h1>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold font-serif text-pr-dark mb-6">Comprehensive PR Education</h2>
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
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-serif text-xl text-pr-dark mb-4">Course Highlights</h3>
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
            <h2 className="text-3xl font-bold font-serif text-pr-dark mb-6">Course Creator</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-32 h-32 rounded-full bg-gray-300"></div>
                <div>
                  <h3 className="text-xl font-bold text-pr-dark mb-2">Jane Doe</h3>
                  <p className="text-gray-600 mb-4">PR Expert & Course Creator</p>
                  <p className="text-gray-700 mb-4">
                    With over 15 years of experience in public relations, Jane has worked with Fortune 500 companies, 
                    startups, and everything in between. Her practical approach to PR has helped countless organizations 
                    improve their media presence and communication strategies.
                  </p>
                  <p className="text-gray-700">
                    Jane created this course to share her knowledge and help PR professionals at all levels develop 
                    the skills needed to succeed in today's rapidly evolving media landscape.
                  </p>
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
