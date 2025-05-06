
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Video, Calendar, FileText } from 'lucide-react';

const CourseFeatures: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-pr-main" />,
      title: 'Expert Presentation',
      description: 'Watch a comprehensive presentation from Alex with full access to the accompanying slides and notes.'
    },
    {
      icon: <Video className="h-10 w-10 text-pr-main" />,
      title: 'Video Lessons',
      description: 'Watch engaging video tutorials that break down complex PR concepts and strategies.'
    },
    {
      icon: <Calendar className="h-10 w-10 text-pr-main" />,
      title: 'Lifetime Access',
      description: 'Get permanent access to all course materials and future updates.'
    },
    {
      icon: <FileText className="h-10 w-10 text-pr-main" />,
      title: 'Case Studies',
      description: 'Learn from real-world examples and successful PR campaigns analyzed in detail.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pr-dark">What's Included in the Course</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to develop and refine your public relations expertise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-gray-100 hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="text-center pt-6">
                <div className="mx-auto mb-4">{feature.icon}</div>
                <CardTitle className="text-xl text-pr-dark">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFeatures;
