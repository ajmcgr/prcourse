
import { ContentItem } from '@/components/ContentCard';

export const courseContent: ContentItem[] = [
  {
    id: 1,
    title: "PR Strategy Fundamentals",
    description: "An introduction to effective public relations strategy in today's media landscape.",
    type: "essay",
    slug: "pr-strategy-fundamentals",
  },
  {
    id: 2,
    title: "Building Media Relationships",
    description: "Learn how to develop and maintain relationships with journalists and media outlets.",
    type: "video",
    duration: "45 min",
    slug: "building-media-relationships",
  },
  {
    id: 3,
    title: "Crisis Communications Planning",
    description: "Prepare your organization for potential PR crises with effective planning and protocols.",
    type: "essay",
    slug: "crisis-communications-planning",
  },
  {
    id: 4,
    title: "Digital PR Tactics",
    description: "Leverage online channels and social media for maximum PR impact.",
    type: "video",
    duration: "38 min",
    slug: "digital-pr-tactics",
  },
  {
    id: 5,
    title: "PR Measurement & Analytics",
    description: "Learn how to measure the effectiveness of your PR campaigns and demonstrate value.",
    type: "essay",
    slug: "pr-measurement-analytics",
  },
  {
    id: 6,
    title: "Storytelling for PR Professionals",
    description: "Master the art of narrative to make your PR messages more compelling and memorable.",
    type: "video",
    duration: "52 min",
    slug: "storytelling-for-pr",
  },
  {
    id: 7,
    title: "Thought Leadership Development",
    description: "Position your executives and organization as authoritative industry voices.",
    type: "essay",
    slug: "thought-leadership-development",
  },
  {
    id: 8,
    title: "Ethical Considerations in PR",
    description: "Navigate complex ethical challenges in modern public relations practice.",
    type: "video",
    duration: "41 min",
    slug: "ethical-considerations-pr",
  }
];

export const getContentItem = (slug: string): ContentItem | undefined => {
  return courseContent.find(item => item.slug === slug);
};
