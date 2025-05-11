
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseContentTable from '@/components/CourseContentTable';
import CallToAction from '@/components/CallToAction';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
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
        <div className="bg-white text-pr-dark py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Course Curriculum</h1>
            <p className="text-xl max-w-3xl mb-8">
              Explore the comprehensive PR course curriculum designed to help you master public relations strategies.
            </p>
            
            {!loading && !user && (
              <div className="mb-8">
                <Link to="/signup">
                  <Button size="lg" className="bg-pr-main hover:bg-pr-dark">
                    Sign Up to Access Course
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
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
