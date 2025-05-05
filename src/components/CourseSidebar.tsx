
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from './ui/sidebar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface CourseSection {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    slug: string;
  }[];
}

const courseSections: CourseSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    lessons: [
      { id: "intro", title: "Introduction", slug: "introduction" },
      { id: "why-pr", title: "Why PR is More Than Editorial", slug: "why-pr-more-than-editorial" },
      { id: "starting-career", title: "Starting a Career in PR", slug: "starting-career-in-pr" }
    ]
  },
  {
    id: "fundamentals",
    title: "PR Fundamentals",
    lessons: [
      { id: "on-off-record", title: "On The Record vs. Off The Record", slug: "on-off-record" },
      { id: "great-pr-person", title: "Things That Make a Great PR Person", slug: "great-pr-person" }
    ]
  },
  {
    id: "hiring",
    title: "Hiring/Agencies",
    lessons: [
      { id: "first-hire", title: "Key Qualities for Your First PR Hire", slug: "first-pr-hire" },
      { id: "hiring-agency", title: "Hiring a PR Agency", slug: "hiring-pr-agency" },
      { id: "client-relationships", title: "Client Relationships in PR", slug: "client-relationships" },
    ]
  }
];

const CourseSidebar: React.FC = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(["introduction"]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(current => 
      current.includes(sectionId) 
        ? current.filter(id => id !== sectionId)
        : [...current, sectionId]
    );
  };

  const isLessonActive = (slug: string) => {
    return location.pathname === `/course/${slug}`;
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="border-b pb-2">
        <h2 className="text-lg font-bold px-4">Course Content</h2>
      </SidebarHeader>
      <SidebarContent>
        {courseSections.map((section) => (
          <SidebarGroup key={section.id}>
            <Collapsible 
              open={openSections.includes(section.id)}
              onOpenChange={() => toggleSection(section.id)}
              className="w-full"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 hover:bg-sidebar-accent rounded-md">
                <SidebarGroupLabel asChild className="text-base font-medium m-0 p-0">
                  <span>{section.title}</span>
                </SidebarGroupLabel>
                {openSections.includes(section.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.lessons.map((lesson) => (
                      <SidebarMenuItem key={lesson.id}>
                        <SidebarMenuButton 
                          isActive={isLessonActive(lesson.slug)}
                          asChild
                          tooltip={lesson.title}
                        >
                          <Link to={`/course/${lesson.slug}`}>
                            <span>{lesson.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default CourseSidebar;
