
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
  SidebarGroupContent,
  useSidebar
} from './ui/sidebar';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { courseData } from '@/utils/course-data';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Toggle } from './ui/toggle';

const CourseSidebar: React.FC = () => {
  const location = useLocation();
  const { toggleSidebar, state } = useSidebar();
  
  // Initialize with all chapters open by default
  const [openChapters, setOpenChapters] = useState<string[]>(
    courseData.map(chapter => chapter.id)
  );

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
        <div className="flex justify-between items-center px-4">
          <h2 className="text-lg font-bold">Course Content</h2>
          <Toggle 
            variant="outline" 
            size="sm" 
            aria-label="Toggle sidebar" 
            pressed={state === "collapsed"}
            onPressedChange={toggleSidebar}
            className="ml-2"
          >
            {state === "collapsed" ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Toggle>
        </div>
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
