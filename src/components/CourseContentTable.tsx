
import React from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

interface CourseModule {
  id: number;
  topic: string;
  synopsis: string;
}

const courseModules: CourseModule[] = [
  {
    id: 1,
    topic: "Introduction",
    synopsis: "I explain why I created this PR course, outline my real‑world, opinionated approach and preview core modules such as media relations, crisis comms, SEO and analytics. I stress that PR is evolving away from legacy press toward digital, data‑driven practice."
  },
  {
    id: 2,
    topic: "Hiring / Agencies",
    synopsis: "I discuss what makes a great first PR hire (high EQ, news obsession, low ego, storytelling) and when to engage an agency. I offer criteria for vetting agencies and keeping client–agency relationships productive."
  },
  {
    id: 3,
    topic: "Media Relations",
    synopsis: "I cover building durable journalist relationships through consistency and personalization, using media databases, and crafting compelling email pitches that cut through overcrowded inboxes. I also include influencer relations - a systematic approach to working with creators, selecting the right tier of influencers, personalizing outreach, setting KPIs, and tracking ROI."
  },
  {
    id: 4,
    topic: "Crisis Management",
    synopsis: "I detail how to assemble a cross‑functional crisis team, plan scenarios in advance and respond quickly with clear, legally sound messaging. I list common mistakes—delayed apologies, passive tone, alienating customers—and how to avoid them."
  },
  {
    id: 5,
    topic: "Social Media Management",
    synopsis: "I argue social platforms are now indispensable PR channels for news discovery, relationship building and customer care. I rank major networks, give posting‑time guidelines and share five professionalism tips for employees online."
  },
  {
    id: 6,
    topic: "Content Creation",
    synopsis: "I advocate a content‑first mindset featuring YouTube, email newsletters, TikTok, Discord and well‑timed press releases. I stress repurposing assets, platform‑native formats and continuous audience feedback to keep material relevant."
  },
  {
    id: 7,
    topic: "Getting Creative",
    synopsis: "I present \"unconventional PR\" ideas—from branded YouTube docuseries and live demos to limited‑edition swag and tongue‑in‑cheek stunts—that generate buzz and differentiate a brand. I explain how success hinges on originality, timing and cultural fit."
  },
  {
    id: 8,
    topic: "Strategic Communication",
    synopsis: "I lay out a holistic PR framework: owned, earned and paid channels; seven functional pillars (strategy, media, community, internal, crisis, public affairs, digital). I urge founders to craft authentic origin stories, product differentiation and transformation narratives."
  },
  {
    id: 9,
    topic: "Brand Management",
    synopsis: "I show how social‑listening data reveal brand perception, stakeholder concerns and emerging trends. I advise balancing signal vs. noise to guide messaging and safeguard reputation."
  },
  {
    id: 10,
    topic: "Event & Community Management",
    synopsis: "I explain that thriving communities need a clear purpose, low entry barriers, consistent focus and executive participation. I suggest tools (e.g., School, Discord) and engagement tactics like member spotlights to maintain momentum."
  },
  {
    id: 11,
    topic: "Public Speaking & Presentation",
    synopsis: "I provide a playbook for hosting or giving media interviews: set ground rules, research hosts, craft one key message, use stories, control body language and summarize outcomes. I emphasize how preparation and authenticity drive on‑camera success."
  },
  {
    id: 12,
    topic: "Internal Communications",
    synopsis: "I use fundraising announcements as a case study: start with the objective (hiring, investors, customers), target specific audiences, nail the why, include credible validations and choreograph post‑announcement follow‑ups."
  },
  {
    id: 13,
    topic: "Reputation Management",
    synopsis: "I explore psychology's role in PR: understand others' needs, show genuine interest, mirror sentiment and ask effectively. I highlight personal branding, crisis empathy and the shift toward leadership‑driven social presence."
  },
  {
    id: 14,
    topic: "SEO & Digital PR",
    synopsis: "I describe \"digital PR\" as white‑hat backlink building that merges classic storytelling with SEO tactics. I teach how to research data‑led angles, personalize journalist outreach and measure links, traffic and authority gains."
  },
  {
    id: 15,
    topic: "Analytics & Measurement",
    synopsis: "I list modern PR KPIs—backlinks, brand mentions, domain authority, sentiment, social shares, subscribers, web traffic and sales—and explain how AI and bots affect interpretation. I recommend aligning a few metrics tightly with business goals."
  },
  {
    id: 16,
    topic: "Conclusion",
    synopsis: "Reflecting on my decade in tech PR, I urge practitioners to trust their gut, embrace constant travel and external engagement, and balance instinct with data. I reiterate that adaptability and human relationships remain PR's enduring currencies."
  }
];

const CourseContentTable: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-pr-dark">What You'll Learn</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive curriculum covering all aspects of modern public relations.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead className="w-48">Topic</TableHead>
                <TableHead>Brief Synopsis</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">{module.id}</TableCell>
                  <TableCell className="font-medium">{module.topic}</TableCell>
                  <TableCell>{module.synopsis}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default CourseContentTable;
