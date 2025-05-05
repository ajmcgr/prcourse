
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentDetail from '@/components/ContentDetail';
import AuthGuard from '@/utils/auth-guard';

const ContentDetailPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <AuthGuard>
          <ContentDetail />
        </AuthGuard>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContentDetailPage;
