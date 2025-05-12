
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
  const { user, loading, hasPaid, checkPaymentStatus } = useAuth();
  const location = useLocation();
  
  // Debug logging
  useEffect(() => {
    console.log("CourseLayout mounted with:", { 
      path: location.pathname,
      user: user?.id, 
      userEmail: user?.email,
      loading, 
      hasPaid,
    });
    
    // Special handling for business@hypeworkspod.com user
    const isBusinessUser = user?.email === 'business@hypeworkspod.com';
    
    // Force check payment status on course access
    if (user && !loading) {
      console.log("Force checking payment status in CourseLayout");
      checkPaymentStatus(user.id).then(isPaid => {
        console.log("CourseLayout payment check result:", isPaid ? "PAID" : "NOT PAID");
      });
    }
  }, [user, loading, location.pathname, hasPaid, checkPaymentStatus]);
  
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
  
  // Special case for business@hypeworkspod.com user - always allow access
  const isBusinessUser = user.email === 'business@hypeworkspod.com';
  if (isBusinessUser) {
    console.log("Business user detected - allowing course access");
  } else if (!hasPaid) {
    // Regular users must have paid to access course
    console.log("User not paid in CourseLayout, redirecting to pricing");
    toast.info("Please complete your payment to access course content");
    return <Navigate to="/pricing" replace />;
  }
  
  // Handle root course path by redirecting to first lesson
  // Only redirect if it's exactly /course or /course/ - not for /course/introduction or other lessons
  const isRootCoursePath = location.pathname === '/course' || location.pathname === '/course/';
  
  if (isRootCoursePath) {
    const { lesson } = getFirstLesson();
    console.log("Redirecting from course root path to first lesson:", lesson?.slug);
    return <Navigate to={`/course/${lesson?.slug}`} replace />;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        <SidebarProvider defaultOpen={true}>
          <div className="flex flex-1 w-full">
            <CourseSidebar />
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-5xl mx-auto flex flex-col" style={{ minHeight: "calc(100vh - 200px)" }}>
                <Outlet />
              </div>
            </div>
          </div>
        </SidebarProvider>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseLayout;
