
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How long do I have access to the course?",
    answer: "You'll have lifetime access to all course materials. Once you purchase, you can access the content anytime and benefit from all future updates."
  },
  {
    question: "Is this course suitable for beginners?",
    answer: "Yes, the course is designed for both beginners and experienced professionals. If you're new to PR, you'll learn foundational skills and strategies. If you're experienced, you'll gain fresh perspectives and advanced techniques."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not completely satisfied with the course, just let us know within 30 days of purchase for a full refund."
  },
  {
    question: "How is the course content delivered?",
    answer: "The course includes video lessons, written materials, and practical examples. You can work through the content at your own pace and revisit any section whenever you need."
  },
  {
    question: "Will I receive updates to the course materials?",
    answer: "Absolutely. As PR practices evolve, we regularly update the course with new content and examples. You'll have access to all future updates at no additional cost."
  },
  {
    question: "Is there any support available if I have questions?",
    answer: "Yes, you can email your questions directly to Alex and his team. We aim to respond to all course-related questions within 48 hours."
  }
];

const FAQ: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about the PR Masterclass
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
              <AccordionTrigger className="text-left font-medium text-lg py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
