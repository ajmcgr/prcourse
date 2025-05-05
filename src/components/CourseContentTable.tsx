
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
    synopsis: "Alex explains why he created this PR course, outlines his real‑world, opinionated approach and previews core modules such as media relations, crisis comms, SEO and analytics. He stresses that PR is evolving away from legacy press toward digital, data‑driven practice."
  },
  {
    id: 2,
    topic: "Hiring / Agencies",
    synopsis: "Discusses what makes a great first PR hire (high EQ, news obsession, low ego, storytelling) and when to engage an agency. Offers criteria for vetting agencies and keeping client–agency relationships productive."
  },
  {
    id: 3,
    topic: "Media Relations",
    synopsis: "Covers building durable journalist relationships through consistency and personalization, using media databases, and crafting compelling email pitches that cut through overcrowded inboxes. Emphasizes trust, tailored outreach and value‑led stories over mass blasts."
  },
  {
    id: 4,
    topic: "Crisis Management",
    synopsis: "Details how to assemble a cross‑functional crisis team, plan scenarios in advance and respond quickly with clear, legally sound messaging. Lists common mistakes—delayed apologies, passive tone, alienating customers—and how to avoid them."
  },
  {
    id: 5,
    topic: "Social Media Management",
    synopsis: "Argues social platforms are now indispensable PR channels for news discovery, relationship building and customer care. Ranks major networks, gives posting‑time guidelines and shares five professionalism tips for employees online."
  },
  {
    id: 6,
    topic: "Content Creation",
    synopsis: "Advocates a content‑first mindset featuring YouTube, email newsletters, TikTok, Discord and well‑timed press releases. Stresses repurposing assets, platform‑native formats and continuous audience feedback to keep material relevant."
  },
  {
    id: 7,
    topic: "Getting Creative",
    synopsis: "Presents \"unconventional PR\" ideas—from branded YouTube docuseries and live demos to limited‑edition swag and tongue‑in‑cheek stunts—that generate buzz and differentiate a brand. Success hinges on originality, timing and cultural fit."
  },
  {
    id: 8,
    topic: "Strategic Communication",
    synopsis: "Lays out a holistic PR framework: owned, earned and paid channels; seven functional pillars (strategy, media, community, internal, crisis, public affairs, digital). Urges founders to craft authentic origin stories, product differentiation and transformation narratives."
  },
  {
    id: 9,
    topic: "Brand Management",
    synopsis: "Shows how social‑listening data reveal brand perception, stakeholder concerns and emerging trends. Advises balancing signal vs. noise to guide messaging and safeguard reputation."
  },
  {
    id: 10,
    topic: "Event & Community Management",
    synopsis: "Explains that thriving communities need a clear purpose, low entry barriers, consistent focus and executive participation. Suggests tools (e.g., School, Discord) and engagement tactics like member spotlights to maintain momentum."
  },
  {
    id: 11,
    topic: "Public Speaking & Presentation",
    synopsis: "Provides a playbook for hosting or giving media interviews: set ground rules, research hosts, craft one key message, use stories, control body language and summarize outcomes. Preparation and authenticity drive on‑camera success."
  },
  {
    id: 12,
    topic: "Influencer Relations",
    synopsis: "Outlines a systematic approach to influencer marketing—define goals, select the right tier of creators, personalize outreach, set KPIs, track ROI and safeguard brand fit. Emphasizes long‑term relationships over one‑off paid posts."
  },
  {
    id: 13,
    topic: "Internal Communications",
    synopsis: "Uses fundraising announcements as a case study: start with the objective (hiring, investors, customers), target specific audiences, nail the why, include credible validations and choreograph post‑announcement follow‑ups."
  },
  {
    id: 14,
    topic: "Reputation Management",
    synopsis: "Explores psychology's role in PR: understand others' needs, show genuine interest, mirror sentiment and ask effectively. Highlights personal branding, crisis empathy and the shift toward leadership‑driven social presence."
  },
  {
    id: 15,
    topic: "SEO & Digital PR",
    synopsis: "Describes \"digital PR\" as white‑hat backlink building that merges classic storytelling with SEO tactics. Research data‑led angles, personalize journalist outreach and measure links, traffic and authority gains."
  },
  {
    id: 16,
    topic: "Analytics & Measurement",
    synopsis: "Lists modern PR KPIs—backlinks, brand mentions, domain authority, sentiment, social shares, subscribers, web traffic and sales—and explains how AI and bots affect interpretation. Recommends aligning a few metrics tightly with business goals."
  },
  {
    id: 17,
    topic: "Conclusion",
    synopsis: "Reflecting on a decade in tech PR, Alex urges practitioners to trust their gut, embrace constant travel and external engagement, and balance instinct with data. He reiterates that adaptability and human relationships remain PR's enduring currencies."
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
        
        <div className="overflow-x-auto">
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
