
import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseSidebar from '@/components/CourseSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "sonner";
import CourseLesson from '@/components/CourseLesson';
import { getLessonBySlug, getFirstLesson } from '@/utils/course-data';

const CourseLayout = () => {
  const { user, loading, hasPaid } = useAuth();
  const location = useLocation();
  
  // Debug logging
  useEffect(() => {
    console.log("CourseLayout mounted with:", { 
      path: location.pathname,
      user: user?.id, 
      loading, 
      hasPaid 
    });
  }, [user, loading, location.pathname, hasPaid]);
  
  // If not loading and not logged in, redirect to signup
  if (!loading && !user) {
    return <Navigate to="/signup" state={{ from: { pathname: location.pathname } }} />;
  }
  
  const isRootCoursePath = location.pathname === '/course' || location.pathname === '/course/';
  
  if (isRootCoursePath && !loading) {
    // Redirect to the first lesson if at the course root path
    const { lesson } = getFirstLesson();
    console.log("Redirecting from course root path to first lesson:", lesson.slug);
    return <Navigate to={`/course/${lesson.slug}`} replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <SidebarProvider defaultOpen={true}>
          <div className="flex w-full">
            <CourseSidebar />
            <div className="flex-1 p-6">
              <Outlet />
            </div>
          </div>
        </SidebarProvider>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseLayout;
