
import React, { useEffect, useState } from 'react';
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
import { toast } from "sonner";

const CourseLesson = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { user, loading, hasPaid } = useAuth();
  const { toggleSidebar } = useSidebar();
  const [pageError, setPageError] = useState<string | null>(null);
  
  useEffect(() => {
    // Debug logging
    console.log("CourseLesson mounted with:", { slug, user: user?.id, loading, hasPaid });
    
    if (!loading && !user) {
      console.log("No authenticated user, redirecting to signup");
      navigate('/signup', { state: { from: { pathname: `/course/${slug || ''}` } } });
    }
  }, [user, loading, navigate, slug]);

  useEffect(() => {
    if (!slug && user) {
      // If no lesson is specified, redirect to the first one
      console.log("No slug provided, finding first lesson");
      const { lesson } = getFirstLesson();
      console.log("Redirecting to first lesson:", lesson.slug);
      navigate(`/course/${lesson.slug}`, { replace: true });
    }
  }, [slug, navigate, user]);

  // Get lesson data
  let lessonData = null;
  let chapterData = null;
  let adjacentLessons = { previousLesson: null, nextLesson: null };
  
  if (slug) {
    try {
      const { lesson, chapter } = getLessonBySlug(slug);
      lessonData = lesson;
      chapterData = chapter;
      
      if (lesson && chapter) {
        adjacentLessons = getAdjacentLessons(slug);
        
        console.log("Found lesson data:", { 
          lessonTitle: lesson?.title, 
          chapterTitle: chapter?.title,
          hasPrevious: !!adjacentLessons.previousLesson,
          hasNext: !!adjacentLessons.nextLesson
        });
      } else {
        console.warn("Lesson or chapter not found for slug:", slug);
        setPageError("Lesson not found");
      }
    } catch (error) {
      console.error("Error loading lesson:", error);
      setPageError("Failed to load lesson content");
      toast.error("Failed to load lesson content");
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]">Loading...</div>;
  }

  if ((pageError || !lessonData) && !loading && user) {
    return (
      <div className="px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">Lesson Not Found</h1>
        <p className="mb-6">The requested lesson could not be found. Please select another lesson from the menu.</p>
        <Button 
          onClick={() => {
            const { lesson } = getFirstLesson();
            navigate(`/course/${lesson.slug}`);
          }}
          className="mt-4"
        >
          Go to First Lesson
        </Button>
      </div>
    );
  }

  // Extract video ID from video URL for proper embedding
  const getVimeoEmbedUrl = (url: string) => {
    if (!url) return '';
    // Extract the Vimeo ID from the URL
    const vimeoId = url.split('/').pop();
    return `https://player.vimeo.com/video/${vimeoId}`;
  };

  return (
    <div className="px-8 py-10">
      {lessonData && chapterData ? (
        <>
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-2">Chapter: {chapterData.title}</div>
            <h1 className="text-3xl font-bold">{lessonData.title}</h1>
          </div>
          
          <div className="aspect-video mb-10 bg-black rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={getVimeoEmbedUrl(lessonData.videoUrl)}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={lessonData.title}
            ></iframe>
          </div>
          
          <div className="prose max-w-none mb-10">
            <h2>About This Lesson</h2>
            <p>This is part of Alex MacGregor's PR Masterclass. Watch this video to learn more about "{lessonData.title}" within the "{chapterData.title}" chapter.</p>
          </div>
          
          {/* Navigation controls */}
          <Pagination className="mt-10">
            <PaginationContent>
              {adjacentLessons.previousLesson && (
                <PaginationItem>
                  <PaginationPrevious 
                    as={Link} 
                    to={`/course/${adjacentLessons.previousLesson.lesson.slug}`} 
                  />
                </PaginationItem>
              )}
              
              {adjacentLessons.nextLesson && (
                <PaginationItem>
                  <PaginationNext 
                    as={Link} 
                    to={`/course/${adjacentLessons.nextLesson.lesson.slug}`} 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <div className="text-center py-10">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Loading course content...</p>
        </div>
      )}
    </div>
  );
};

export default CourseLesson;
