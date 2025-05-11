
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
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { courseData } from '@/utils/course-data';
import { Button } from './ui/button';

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
    <>
      {/* Mobile Toggle Button - Always visible */}
      <div className="md:hidden fixed top-20 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar} 
          className="bg-white shadow-md"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <Sidebar variant="floating" collapsible="offcanvas">
        <SidebarHeader className="border-b pb-2">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-lg font-bold">Course Content</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {courseData.map((chapter, index) => (
            <SidebarGroup key={chapter.id}>
              <Collapsible 
                open={openChapters.includes(chapter.id)}
                onOpenChange={() => toggleChapter(chapter.id)}
                className="w-full"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-1.5 hover:bg-sidebar-accent rounded-md text-sm">
                  <SidebarGroupLabel asChild className="text-sm font-medium m-0 p-0 leading-tight">
                    <span>
                      {/* Add chapter number before the title */}
                      {chapter.id === "chapter-0" ? "Full Course" : `${index}. ${chapter.title}`}
                    </span>
                  </SidebarGroupLabel>
                  {openChapters.includes(chapter.id) ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
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
                            className="text-xs py-1 leading-tight"
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
    </>
  );
};

export default CourseSidebar;
