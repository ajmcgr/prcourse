
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';
import SignupPage from '@/pages/SignupPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PricingPage from '@/pages/PricingPage';
import AuthGuard from '@/utils/auth-guard';

// Import pages from the correct locations
import HomePage from '@/pages/Index';  // Changed from @/pages/HomePage
import CourseContentPage from '@/pages/CourseContent'; // Changed from @/pages/CourseContentPage
import CourseIntroduction from '@/pages/CourseLayout'; // Changed from @/pages/CourseIntroduction
import LessonPage from '@/pages/ContentDetailPage'; // Changed from @/pages/LessonPage
import ModulePage from '@/pages/ContentLibrary'; // Changed from @/pages/ModulePage
import NotFoundPage from '@/pages/NotFound'; // Changed from @/pages/NotFoundPage

// Wrap the entire application with the AuthProvider
function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/coursecontent" element={<CourseContentPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* Protected Routes */}
          <Route path="/course/introduction" element={<AuthGuard><CourseIntroduction /></AuthGuard>} />
          <Route path="/course/:courseSlug" element={<AuthGuard><CourseIntroduction /></AuthGuard>} />
          <Route path="/module/:moduleSlug" element={<AuthGuard><ModulePage /></AuthGuard>} />
          <Route path="/lesson/:lessonSlug" element={<AuthGuard><LessonPage /></AuthGuard>} />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
