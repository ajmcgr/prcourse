export interface VideoLesson {
  id: string;
  title: string;
  videoUrl: string;
  slug: string;
  transcript?: string;
}

export interface CourseChapter {
  id: string;
  title: string;
  lessons: VideoLesson[];
}

export const courseData: CourseChapter[] = [
  {
    id: "chapter-0",
    title: "Full Course",
    lessons: [
      {
        id: "0-1",
        title: "Alex MacGregor's PR Masterclass (Full Video)",
        videoUrl: "https://vimeo.com/1083286083",
        slug: "full-course",
        transcript: "Welcome to Alex MacGregor's PR Masterclass. In this comprehensive video, I'll cover everything you need to know about modern public relations strategies from start to finish."
      }
    ]
  },
  {
    id: "chapter-1",
    title: "Introduction",
    lessons: [
      {
        id: "1-1",
        title: "Introduction",
        videoUrl: "https://vimeo.com/1083271721",
        slug: "introduction",
        transcript: "Hi, my name is Alex McGregor. I'm here today for the self-titled PR Master Class. I was going to call it PR Course, but I feel Master Class is a cooler name and I'm a PR guy after all, so why not? Yeah, it's been great to kind of finally get around to doing this. I've been talking about this for a while, and it 's kind of like it's been on my agenda,  but I just haven't had time to do it. So super grateful to be able to do it now. And yeah, and you know, just super excited to kind of get into it and share some learnings I've had during the years and whatnot with you guys. So let's dive into the course."
      },
      {
        id: "1-2",
        title: "About Alex",
        videoUrl: "https://vimeo.com/1083271531",
        slug: "about-alex",
        transcript: "So a little bit about me. Yeah. My name is Alex. I've worked in PR for the best part of a decade now. Um, and you know, PR is, um, something that's kind of come to me a little bit later, it wasn't my first, uh, job as such. Um, I kind of stumbled into it. I was doing some social media, um, work and then I moved over to PR and I find that they were fairly, uh, similar in some ways and, um, yeah. So that was like a really great opportunity for me to kind of dive into, um, you know, something, something new. And I think for, for PR, it was like a case of, okay, um, I can kind of learn this job on, uh, learn on the job. And I really, um, found that kind of really interesting. And, you know, that kind of led to, you know, basically a decade in, in PR. I worked for various tech companies in house. So, um, you know, I, I did, uh, product PR for, um, a big, uh, consumer tech brand called Oppo. I did corporate PR for another one called OnePlus.\n\nUm, so I've, you know, I've worked with, uh, PR software companies. I've worked with agencies. So I have a lot of, uh, kind of experience across the board. Fast forward to today. Now I run my own PR agency and I'm building, um, AI PR tools. So that's just a bit about me from a professional perspective and, you know, why I put this course together. I think like a lot of people that, you know, put courses together, um, it came down to the fact that I had lots of, uh, opinions and ideas that I'd shared over the years on, um, on social. So I shared, um, you know, a lot of these on social and my newsletter and, you know, the more I thought of it, I looked at other people, um, with, with courses and SEO and digital marketing and, um, and, and the creative side and whatnot. So I thought, you know, why not, um, you know, uh, do a course myself and I gathered all my notes together and then I kind of realized, okay, you know, I have, um, something that could be a course.\n\nAnd, um, what I want to do with this course was I didn't want to make it like super, super like long, like you see some, some of these courses like last for, you know, it could be two hours. I w I want to keep the overall content to about an hour of video and I'll provide all the notes, um, on the, on the website so you can look at the video. You can, you can look at the notes and I'll provide all that. Um, and I think that's the best format, you know, think times change people move on and ideas, you know, there's new ideas and, you know, courses can go out of date and whatnot. So I just want to make this as concise as possible, um, you know, given the situation. So last things first on the, on the introduction side, like, I just want to say, like, if you've got any like feedback or any like, um, questions or anything like that, please feel free to drop me an email and, um, you can get my, my, uh, email address, um, and send me any, any questions you have or, or even social, you can reach out to me there. Um, I 'll also, uh, happy to talk PR or anything you guys want to talk about."
      },
      {
        id: "1-3",
        title: "Why PR is More Than Editorial",
        videoUrl: "https://vimeo.com/1083271288",
        slug: "why-pr-more-than-editorial"
      },
      {
        id: "1-4",
        title: "Starting a Career in PR",
        videoUrl: "https://vimeo.com/1083271029",
        slug: "starting-career-in-pr"
      },
      {
        id: "1-5",
        title: "On The Record vs Off The Record",
        videoUrl: "https://vimeo.com/1083270544",
        slug: "on-off-record"
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Hiring And Agencies",
    lessons: [
      {
        id: "2-1",
        title: "Hiring And Agencies",
        videoUrl: "https://vimeo.com/1083270452",
        slug: "hiring-agencies"
      },
      {
        id: "2-2",
        title: "Things That Make a Great PR Person",
        videoUrl: "https://vimeo.com/1083270265",
        slug: "great-pr-person"
      },
      {
        id: "2-3",
        title: "Hiring A PR Agency",
        videoUrl: "https://vimeo.com/1083269942",
        slug: "hiring-pr-agency"
      },
      {
        id: "2-4",
        title: "Client Relationships in PR",
        videoUrl: "https://vimeo.com/1083269791",
        slug: "client-relationships"
      },
      {
        id: "2-5",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083269574",
        slug: "hiring-case-study"
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Media Relations",
    lessons: [
      {
        id: "3-1",
        title: "Media Relations",
        videoUrl: "https://vimeo.com/1083269527",
        slug: "media-relations"
      },
      {
        id: "3-2",
        title: "Comparing PR Media Databases",
        videoUrl: "https://vimeo.com/1083269461",
        slug: "pr-media-databases"
      },
      {
        id: "3-3",
        title: "Building Strong Media Relationships",
        videoUrl: "https://vimeo.com/1083269350",
        slug: "building-media-relationships"
      },
      {
        id: "3-4",
        title: "Effective Media Pitches",
        videoUrl: "https://vimeo.com/1083269120",
        slug: "effective-media-pitches"
      },
      {
        id: "3-5",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083268934",
        slug: "media-case-study"
      },
      {
        id: "3-6",
        title: "Influencer Marketing",
        videoUrl: "https://vimeo.com/1083268838",
        slug: "influencer-marketing"
      },
      {
        id: "3-7",
        title: "Mastering Influencer Marketing",
        videoUrl: "https://vimeo.com/1083268604",
        slug: "mastering-influencer-marketing"
      },
      {
        id: "3-8",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083268437",
        slug: "influencer-case-study"
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Crisis Management",
    lessons: [
      {
        id: "4-1",
        title: "Crisis Management",
        videoUrl: "https://vimeo.com/1083268308",
        slug: "crisis-management"
      },
      {
        id: "4-2",
        title: "Handling a Crisis",
        videoUrl: "https://vimeo.com/1083268181",
        slug: "handling-crisis"
      },
      {
        id: "4-3",
        title: "Top PR Crisis Mistakes to Avoid",
        videoUrl: "https://vimeo.com/1083268052",
        slug: "crisis-mistakes"
      },
      {
        id: "4-4",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083267991",
        slug: "crisis-case-study"
      }
    ]
  },
  {
    id: "chapter-5",
    title: "Social Media",
    lessons: [
      {
        id: "5-1",
        title: "Social Media Management",
        videoUrl: "https://vimeo.com/1083267943",
        slug: "social-media-management"
      },
      {
        id: "5-2",
        title: "Why Social Media is Essential for PR",
        videoUrl: "https://vimeo.com/1083267859",
        slug: "social-media-essential"
      },
      {
        id: "5-3",
        title: "Ranking Social Media For PR",
        videoUrl: "https://vimeo.com/1083267643",
        slug: "ranking-social-media"
      },
      {
        id: "5-4",
        title: "Optimal Social Media Posting Times for PR",
        videoUrl: "https://vimeo.com/1083267385",
        slug: "optimal-posting-times"
      },
      {
        id: "5-5",
        title: "Mastering Social Media for PR",
        videoUrl: "https://vimeo.com/1083267079",
        slug: "mastering-social-media"
      },
      {
        id: "5-6",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083266985",
        slug: "social-media-case-study"
      }
    ]
  },
  {
    id: "chapter-6",
    title: "Content Creation",
    lessons: [
      {
        id: "6-1",
        title: "Content Creation",
        videoUrl: "https://vimeo.com/1083266886",
        slug: "content-creation"
      },
      {
        id: "6-2",
        title: "Press Releases in the Age of Social Media",
        videoUrl: "https://vimeo.com/1083266823",
        slug: "press-releases-social-media"
      },
      {
        id: "6-3",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083266590",
        slug: "content-case-study"
      }
    ]
  },
  {
    id: "chapter-7",
    title: "Getting Creative",
    lessons: [
      {
        id: "7-1",
        title: "Getting Creative",
        videoUrl: "https://vimeo.com/1083266430",
        slug: "getting-creative"
      },
      {
        id: "7-2",
        title: "Unconventional PR Strategies",
        videoUrl: "https://vimeo.com/1083266139",
        slug: "unconventional-pr"
      },
      {
        id: "7-3",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083290328",
        slug: "creative-case-study"
      }
    ]
  },
  {
    id: "chapter-8",
    title: "Strategic Communication",
    lessons: [
      {
        id: "8-1",
        title: "Strategic Communication",
        videoUrl: "https://vimeo.com/1083266102",
        slug: "strategic-communication"
      },
      {
        id: "8-2",
        title: "Effective PR Strategies for Founders",
        videoUrl: "https://vimeo.com/1083265920",
        slug: "pr-strategies-founders"
      },
      {
        id: "8-3",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083265861",
        slug: "strategic-case-study"
      }
    ]
  },
  {
    id: "chapter-9",
    title: "Brand Management",
    lessons: [
      {
        id: "9-1",
        title: "Brand Management",
        videoUrl: "https://vimeo.com/1083265820",
        slug: "brand-management"
      },
      {
        id: "9-2",
        title: "Measuring Brand",
        videoUrl: "https://vimeo.com/1083265734",
        slug: "measuring-brand"
      },
      {
        id: "9-3",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083265557",
        slug: "brand-case-study"
      }
    ]
  },
  {
    id: "chapter-10",
    title: "Events And Community",
    lessons: [
      {
        id: "10-1",
        title: "Events And Community",
        videoUrl: "https://vimeo.com/1083265407",
        slug: "events-community"
      },
      {
        id: "10-2",
        title: "Building a Thriving Community",
        videoUrl: "https://vimeo.com/1083265331",
        slug: "thriving-community"
      },
      {
        id: "10-3",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083265288",
        slug: "community-case-study"
      }
    ]
  },
  {
    id: "chapter-11",
    title: "Public Speaking",
    lessons: [
      {
        id: "11-1",
        title: "Public Speaking",
        videoUrl: "https://vimeo.com/1083265244",
        slug: "public-speaking"
      },
      {
        id: "11-2",
        title: "How to Conduct a Media Interview",
        videoUrl: "https://vimeo.com/1083265212",
        slug: "media-interview"
      },
      {
        id: "11-3",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083265143",
        slug: "speaking-case-study"
      }
    ]
  },
  {
    id: "chapter-12",
    title: "Internal Communications",
    lessons: [
      {
        id: "12-1",
        title: "Internal Communications",
        videoUrl: "https://vimeo.com/1083265122",
        slug: "internal-communications"
      },
      {
        id: "12-2",
        title: "Trust, Relationships and More",
        videoUrl: "https://vimeo.com/1083265076",
        slug: "trust-relationships"
      }
    ]
  },
  {
    id: "chapter-13",
    title: "Reputation Management",
    lessons: [
      {
        id: "13-1",
        title: "Reputation",
        videoUrl: "https://vimeo.com/1083265046",
        slug: "reputation"
      },
      {
        id: "13-2",
        title: "How to Win Friends And Influence People",
        videoUrl: "https://vimeo.com/1083264972",
        slug: "win-friends-influence"
      },
      {
        id: "13-3",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083264887",
        slug: "reputation-case-study"
      }
    ]
  },
  {
    id: "chapter-14",
    title: "SEO And Digital PR",
    lessons: [
      {
        id: "14-1",
        title: "SEO And Digital PR",
        videoUrl: "https://vimeo.com/1083264827",
        slug: "seo-digital-pr"
      },
      {
        id: "14-2",
        title: "Effective Backlink Strategies for SEO",
        videoUrl: "https://vimeo.com/1083264767",
        slug: "backlink-strategies"
      },
      {
        id: "14-3",
        title: "Case Study",
        videoUrl: "https://vimeo.com/1083264674",
        slug: "seo-case-study"
      }
    ]
  },
  {
    id: "chapter-15",
    title: "Analytics and Measurement",
    lessons: [
      {
        id: "15-1",
        title: "Analytics And Measurement",
        videoUrl: "https://vimeo.com/1083264632",
        slug: "analytics-measurement"
      },
      {
        id: "15-2",
        title: "Mastering PR Metrics",
        videoUrl: "https://vimeo.com/1083264139",
        slug: "pr-metrics"
      }
    ]
  },
  {
    id: "chapter-16",
    title: "Conclusion",
    lessons: [
      {
        id: "16-1",
        title: "Conclusion",
        videoUrl: "https://vimeo.com/1083264273",
        slug: "conclusion"
      }
    ]
  }
];

// Helper function to find a lesson by slug
export const getLessonBySlug = (slug: string): { lesson: VideoLesson | null; chapter: CourseChapter | null } => {
  for (const chapter of courseData) {
    const lesson = chapter.lessons.find(lesson => lesson.slug === slug);
    if (lesson) {
      return { lesson, chapter };
    }
  }
  return { lesson: null, chapter: null };
};

// Helper function to get the first lesson for initial navigation
export const getFirstLesson = (): { lesson: VideoLesson; chapter: CourseChapter } => {
  return {
    lesson: courseData[0].lessons[0],
    chapter: courseData[0]
  };
};

// Helper function to get next and previous lessons
export const getAdjacentLessons = (
  currentSlug: string
): { 
  previousLesson: { lesson: VideoLesson; chapter: CourseChapter } | null;
  nextLesson: { lesson: VideoLesson; chapter: CourseChapter } | null;
} => {
  let previousLesson: { lesson: VideoLesson; chapter: CourseChapter } | null = null;
  let nextLesson: { lesson: VideoLesson; chapter: CourseChapter } | null = null;
  let foundCurrent = false;
  
  // Create a flat list of all lessons
  const allLessons: Array<{ lesson: VideoLesson; chapter: CourseChapter }> = [];
  
  courseData.forEach(chapter => {
    chapter.lessons.forEach(lesson => {
      allLessons.push({ lesson, chapter });
    });
  });
  
  // Find the current, previous and next lessons
  for (let i = 0; i < allLessons.length; i++) {
    if (allLessons[i].lesson.slug === currentSlug) {
      foundCurrent = true;
      if (i > 0) {
        previousLesson = allLessons[i - 1];
      }
      if (i < allLessons.length - 1) {
        nextLesson = allLessons[i + 1];
      }
      break;
    }
  }
  
  return { previousLesson, nextLesson };
};
