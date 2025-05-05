
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Video } from 'lucide-react';

export interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: 'essay' | 'video';
  duration?: string;
  slug: string;
}

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center mb-2">
          {item.type === 'essay' ? (
            <BookOpen className="h-5 w-5 text-pr-main mr-2" />
          ) : (
            <Video className="h-5 w-5 text-pr-main mr-2" />
          )}
          <span className="text-sm font-medium uppercase text-pr-main">
            {item.type === 'essay' ? 'Essay' : 'Video'}
          </span>
        </div>
        <CardTitle className="text-xl font-serif">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{item.description}</p>
        {item.duration && (
          <p className="mt-2 text-sm text-gray-500">Duration: {item.duration}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-pr-main text-pr-main hover:bg-pr-main hover:text-white">
          <Link to={`/content/${item.slug}`} className="w-full">View Content</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
