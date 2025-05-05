
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CoursePreview: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-pr-dark mb-6">
              Course Preview
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Get a glimpse of what this comprehensive PR course offers. Our curriculum covers everything from media relations fundamentals to advanced digital PR strategies.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Introduction to Modern PR Strategy</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Media Relations in the Digital Age</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Crisis Communication Planning</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-pr-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Measuring PR Effectiveness</span>
              </li>
            </ul>
            <Button className="bg-pr-main hover:bg-pr-dark">
              <Link to="/signup">Get Full Access</Link>
            </Button>
          </div>
          <div className="border bg-white p-8 rounded-lg shadow-sm">
            <div className="aspect-video bg-white rounded-lg overflow-hidden relative border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg text-center max-w-xs shadow-sm">
                  <h3 className="text-xl text-pr-dark mb-2">Course Preview</h3>
                  <p className="text-gray-600 mb-4">Sign up to access all video content and essays</p>
                  <Button variant="outline" className="border-pr-main text-pr-main hover:bg-pr-main hover:text-white">
                    <Link to="/signup">Sign Up Now</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl text-pr-dark mb-2">PR Strategy Fundamentals</h3>
              <p className="text-gray-600">
                A comprehensive introduction to effective public relations strategy in today's media landscape.
              </p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="mr-2">45-minute video</span>
                <span>•</span>
                <span className="mx-2">5-part essay series</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePreview;
