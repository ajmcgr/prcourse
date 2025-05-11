
export interface VideoLesson {
  id: string;
  title: string;
  videoUrl: string;
  slug: string;
}

export interface CourseChapter {
  id: string;
  title: string;
  lessons: VideoLesson[];
}

export const courseData: CourseChapter[] = [
  {
    id: "chapter-1",
    title: "Introduction",
    lessons: [
      {
        id: "1-1",
        title: "Introduction",
        videoUrl: "https://vimeo.com/1083271721",
        slug: "introduction"
      },
      {
        id: "1-2",
        title: "About Alex",
        videoUrl: "https://vimeo.com/1083271531",
        slug: "about-alex"
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
  }
  // Note: Adding just the first 3 chapters for brevity
  // We can add more chapters as needed
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
