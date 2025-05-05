
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import About from "./pages/About";
import SignupPage from "./pages/SignupPage";
import PricingPage from "./pages/PricingPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ContentLibrary from "./pages/ContentLibrary";
import CourseContent from "./pages/CourseContent";
import ContentDetailPage from "./pages/ContentDetailPage";
import NotFound from "./pages/NotFound";
import CourseLayout from "./pages/CourseLayout";
import CourseLesson from "./components/CourseLesson";
import AuthGuard from "./utils/auth-guard";
import { AuthProvider } from "./contexts/AuthContext";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/payment-success" element={<PaymentSuccessPage />} />
              <Route path="/coursecontent" element={<CourseContent />} />
              
              {/* Protected routes that require payment */}
              <Route path="/content" element={
                <AuthGuard>
                  <ContentLibrary />
                </AuthGuard>
              } />
              <Route path="/content/:slug" element={
                <AuthGuard>
                  <ContentDetailPage />
                </AuthGuard>
              } />
              
              {/* Course routes */}
              <Route path="/course" element={
                <AuthGuard>
                  <CourseLayout />
                </AuthGuard>
              }>
                <Route index element={<CourseLesson />} />
                <Route path=":slug" element={<CourseLesson />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
