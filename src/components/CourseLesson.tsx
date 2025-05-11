
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLessonBySlug, getFirstLesson } from '@/utils/course-data';
import { useAuth } from '@/contexts/AuthContext';

const CourseLesson = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  
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

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]">Loading...</div>;
  }

  if (!lesson && !loading && user) {
    return (
      <div className="px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Lesson Not Found</h1>
        <p>The requested lesson could not be found. Please select another lesson from the menu.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      {lesson && chapter && (
        <>
          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-1">Chapter: {chapter.title}</div>
            <h1 className="text-3xl font-bold">{lesson.title}</h1>
          </div>
          
          <div className="aspect-video mb-8 bg-black rounded-lg overflow-hidden">
            <iframe
              src={`${lesson.videoUrl}/embed`}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={lesson.title}
            ></iframe>
          </div>
          
          <div className="prose max-w-none">
            <h2>About This Lesson</h2>
            <p>This is part of Alex MacGregor's PR Masterclass. Watch this video to learn more about "{lesson.title}" within the "{chapter.title}" chapter.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseLesson;
