
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
import { courseData } from '@/utils/course-data';

const CourseSidebar: React.FC = () => {
  const location = useLocation();
  const [openChapters, setOpenChapters] = useState<string[]>(["chapter-1"]);

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(current => 
      current.includes(chapterId) 
        ? current.filter(id => id !== chapterId)
        : [...current, chapterId]
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
        {courseData.map((chapter) => (
          <SidebarGroup key={chapter.id}>
            <Collapsible 
              open={openChapters.includes(chapter.id)}
              onOpenChange={() => toggleChapter(chapter.id)}
              className="w-full"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 hover:bg-sidebar-accent rounded-md">
                <SidebarGroupLabel asChild className="text-base font-medium m-0 p-0">
                  <span>{chapter.title}</span>
                </SidebarGroupLabel>
                {openChapters.includes(chapter.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {chapter.lessons.map((lesson) => (
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
