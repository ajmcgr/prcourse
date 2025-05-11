
import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseContentTable from '@/components/CourseContentTable';
import CallToAction from '@/components/CallToAction';
import { useAuth } from '@/contexts/AuthContext';
import { getFirstLesson } from '@/utils/course-data';

const CourseContent = () => {
  const { user, loading } = useAuth();
  
  // If authenticated, redirect to the course page
  if (!loading && user) {
    const { lesson } = getFirstLesson();
    return <Navigate to={`/course/${lesson.slug}`} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CourseContentTable />
        </div>
        
        {/* Call to Action Section */}
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseContent;
