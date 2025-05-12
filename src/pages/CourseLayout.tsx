
import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseSidebar from '@/components/CourseSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "sonner";
import { getFirstLesson } from '@/utils/course-data';

const CourseLayout = () => {
  const { user, loading, hasPaid } = useAuth();
  const location = useLocation();
  
  // Debug logging
  useEffect(() => {
    console.log("CourseLayout mounted with:", { 
      path: location.pathname,
      user: user?.id, 
      loading, 
      hasPaid,
    });
  }, [user, loading, location.pathname, hasPaid]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600">Loading course...</p>
      </div>
    );
  }
  
  // User must be authenticated to access course
  if (!user) {
    console.log("No user in CourseLayout, redirecting to signup");
    toast.error("Please sign in to access the course");
    return <Navigate to="/signup" replace />;
  }
  
  // User must have paid to access course
  if (!hasPaid) {
    console.log("User not paid in CourseLayout, redirecting to pricing");
    toast.info("Please complete your payment to access course content");
    return <Navigate to="/pricing" replace />;
  }
  
  // Handle root course path by redirecting to first lesson
  const isRootCoursePath = location.pathname === '/course' || location.pathname === '/course/';
  
  if (isRootCoursePath) {
    const { lesson } = getFirstLesson();
    console.log("Redirecting from course root path to first lesson:", lesson?.slug);
    return <Navigate to={`/course/${lesson?.slug}`} replace />;
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
