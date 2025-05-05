
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title }) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-pr-accent fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-700 mb-6 italic">{quote}</p>
        <div>
          <p className="font-bold text-pr-dark">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "This PR course completely transformed our company's media strategy. The insights were immediately applicable and delivered results within weeks.",
      name: "Sarah Johnson",
      title: "Communications Director"
    },
    {
      quote: "As someone new to PR, this course provided the perfect foundation. The video lessons were engaging and the essays offered deep dives into complex topics.",
      name: "Michael Chen",
      title: "Marketing Manager"
    },
    {
      quote: "I've taken many PR courses, but this one stands out for its practical approach and comprehensive coverage of modern PR techniques.",
      name: "Amanda Perez",
      title: "PR Specialist"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pr-dark">What Our Students Say</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of professionals who have elevated their PR skills with our course.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
