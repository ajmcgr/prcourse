
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getLessonBySlug, getFirstLesson, getAdjacentLessons } from '@/utils/course-data';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const CourseLesson = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toggleSidebar, state } = useSidebar();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/signup', { state: { from: { pathname: `/course/${slug || ''}` } } });
    }
  }, [user, loading, navigate, slug]);

  useEffect(() => {
    if (!slug && user) {
      // If no lesson is specified, redirect to the first one
      const { lesson } = getFirstLesson();
      navigate(`/course/${lesson.slug}`);
    }
  }, [slug, navigate, user]);

  const { lesson, chapter } = slug ? getLessonBySlug(slug) : { lesson: null, chapter: null };
  const { previousLesson, nextLesson } = slug ? getAdjacentLessons(slug) : { previousLesson: null, nextLesson: null };

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]">Loading...</div>;
  }

  if (!lesson && !loading && user) {
    return (
      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">Lesson Not Found</h1>
        <p>The requested lesson could not be found. Please select another lesson from the menu.</p>
      </div>
    );
  }

  // Extract video ID from video URL for proper embedding
  const getVimeoEmbedUrl = (url: string) => {
    // Extract the Vimeo ID from the URL
    const vimeoId = url.split('/').pop();
    return `https://player.vimeo.com/video/${vimeoId}`;
  };

  return (
    <div className="px-8 py-10">
      {/* Desktop Sidebar Toggle */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleSidebar} 
        className="mb-6 hidden md:flex items-center gap-2"
      >
        <Menu className="h-4 w-4" />
        <span>{state === "expanded" ? "Hide Menu" : "Show Menu"}</span>
      </Button>

      {lesson && chapter && (
        <>
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">Chapter: {chapter.title}</div>
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
          </div>
          
          <div className="aspect-video mb-10 bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={getVimeoEmbedUrl(lesson.videoUrl)}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={lesson.title}
            ></iframe>
          </div>
          
          <div className="prose max-w-none mb-10">
            <h2>About This Lesson</h2>
            <p>This is part of Alex MacGregor's PR Masterclass. Watch this video to learn more about "{lesson.title}" within the "{chapter.title}" chapter.</p>
          </div>
          
          {/* Navigation controls */}
          <Pagination className="mt-10">
            <PaginationContent>
              {previousLesson && (
                <PaginationItem>
                  <PaginationPrevious 
                    as={Link} 
                    to={`/course/${previousLesson.lesson.slug}`} 
                  />
                </PaginationItem>
              )}
              
              {nextLesson && (
                <PaginationItem>
                  <PaginationNext 
                    as={Link} 
                    to={`/course/${nextLesson.lesson.slug}`} 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default CourseLesson;
