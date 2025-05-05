
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getContentItem } from '@/utils/content-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Video } from 'lucide-react';

const ContentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const content = slug ? getContentItem(slug) : undefined;
  
  if (!content) {
    return <Navigate to="/content" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center mb-2">
          {content.type === 'essay' ? (
            <BookOpen className="h-6 w-6 text-pr-main mr-2" />
          ) : (
            <Video className="h-6 w-6 text-pr-main mr-2" />
          )}
          <span className="text-sm font-medium uppercase text-pr-main">
            {content.type === 'essay' ? 'Essay' : 'Video Lesson'}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-pr-dark mb-4">{content.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{content.description}</p>
        {content.duration && (
          <p className="text-gray-500">Duration: {content.duration}</p>
        )}
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Content</CardTitle>
        </CardHeader>
        <CardContent>
          {content.type === 'video' ? (
            <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
              <p className="text-gray-600">Video Lesson Content</p>
              {/* In a real implementation, this would be a video player */}
            </div>
          ) : (
            <div className="prose max-w-none">
              <p>This is a sample essay content. In a real implementation, this would contain the full essay text.</p>
              <p>
                Public relations (PR) is a strategic communication process that builds mutually beneficial relationships 
                between organizations and their publics. PR helps an organization and its public adapt mutually to each other.
              </p>
              <h2>Key Elements of PR Strategy</h2>
              <p>
                An effective PR strategy includes several key components:
              </p>
              <ul>
                <li>Research and analysis of the organization, its audience, and the competitive landscape</li>
                <li>Setting clear objectives that align with business goals</li>
                <li>Developing key messages that resonate with target audiences</li>
                <li>Selecting appropriate communication channels</li>
                <li>Implementing the strategy with compelling content and engagement</li>
                <li>Measuring results against predetermined metrics</li>
              </ul>
              <p>
                This essay explores each of these elements in depth and provides actionable insights for PR professionals.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentDetail;
