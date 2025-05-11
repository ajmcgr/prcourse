
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseSidebar from '@/components/CourseSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider } from "@/components/ui/sidebar";

const CourseLayout = () => {
  const { user, loading } = useAuth();
  
  // If not loading and not logged in, redirect to signup
  if (!loading && !user) {
    return <Navigate to="/signup" state={{ from: { pathname: "/course" } }} />;
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
