
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseContentTable from '@/components/CourseContentTable';

const CourseContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-white text-pr-dark py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Course Curriculum</h1>
            <p className="text-xl max-w-3xl">
              Explore the comprehensive PR course curriculum designed to help you master public relations strategies.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CourseContentTable />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseContent;
