
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';
import SignupPage from '@/pages/SignupPage';
import PricingPage from '@/pages/PricingPage';
import AuthGuard from '@/utils/auth-guard';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import About from '@/pages/About';

// Import pages from the correct locations
import HomePage from '@/pages/Index';
import CourseContentPage from '@/pages/CourseContent';
import CourseLayout from '@/pages/CourseLayout';
import CourseLesson from '@/components/CourseLesson';
import LessonPage from '@/pages/ContentDetailPage';
import ModulePage from '@/pages/ContentLibrary';
import NotFoundPage from '@/pages/NotFound';

// Wrap the entire application with the AuthProvider
function App() {
  return (
    <AuthProvider>
      <Toaster position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/coursecontent" element={<CourseContentPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          
          {/* Protected Routes - Course layout with nested routes */}
          <Route path="/course" element={<AuthGuard><CourseLayout /></AuthGuard>}>
            <Route path="" element={<CourseLesson />} />
            <Route path="introduction" element={<CourseLesson />} />
            <Route path=":slug" element={<CourseLesson />} />
          </Route>
          
          {/* Other protected routes */}
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
