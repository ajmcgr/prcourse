
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseSidebar from '@/components/CourseSidebar';
import AuthGuard from '@/utils/auth-guard';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const CourseLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <AuthGuard>
        <main className="flex-grow">
          <SidebarProvider>
            <div className="flex w-full">
              <CourseSidebar />
              <div className="flex-1 p-6">
                <div className="md:hidden mb-4">
                  <SidebarTrigger />
                </div>
                <Outlet />
              </div>
            </div>
          </SidebarProvider>
        </main>
      </AuthGuard>
      
      <Footer />
    </div>
  );
};

export default CourseLayout;
