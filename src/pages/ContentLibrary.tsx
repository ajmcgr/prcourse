
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentCard from '@/components/ContentCard';
import { courseContent } from '@/utils/content-data';
import { Button } from '@/components/ui/button';

const ContentLibrary = () => {
  const [filter, setFilter] = React.useState<'all' | 'essay' | 'video'>('all');
  
  const filteredContent = React.useMemo(() => {
    if (filter === 'all') return courseContent;
    return courseContent.filter(item => item.type === filter);
  }, [filter]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-white border-b text-pr-dark py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Course Content Library</h1>
            <p className="text-xl max-w-3xl">
              Access all essays and video lessons in the public relations course.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center mb-8 space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              className={filter === 'all' ? 'bg-pr-main hover:bg-pr-dark' : ''}
              onClick={() => setFilter('all')}
            >
              All Content
            </Button>
            <Button
              variant={filter === 'essay' ? 'default' : 'outline'}
              className={filter === 'essay' ? 'bg-pr-main hover:bg-pr-dark' : ''}
              onClick={() => setFilter('essay')}
            >
              Essays
            </Button>
            <Button
              variant={filter === 'video' ? 'default' : 'outline'}
              className={filter === 'video' ? 'bg-pr-main hover:bg-pr-dark' : ''}
              onClick={() => setFilter('video')}
            >
              Videos
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContentLibrary;
