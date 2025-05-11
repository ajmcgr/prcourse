
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Menu, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { getFirstLesson } from '@/utils/course-data';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location.pathname === '/';
  const isMobile = useIsMobile();
  const { lesson } = getFirstLesson();
  
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Determine navbar background classes based on scroll state and page
  const navbarClasses = () => {
    if (isHomePage) {
      return scrolled
        ? "bg-white shadow-sm transition-all duration-300 sticky top-0 z-50"
        : "bg-transparent transition-all duration-300 sticky top-0 z-50";
    }
    return "bg-background sticky top-0 z-50";
  };
  
  // Always set text color to black
  const textColorClass = "text-black";
  
  return (
    <nav className={navbarClasses()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className={`text-lg md:text-2xl font-bold truncate ${textColorClass}`}>
              {isMobile ? "PR Masterclass" : "Alex MacGregor's PR Masterclass"}
            </Link>
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={textColorClass}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-screen max-w-[250px] mr-2 bg-white">
                {user ? (
                  <DropdownMenuItem asChild>
                    <Link to={`/course/${lesson.slug}`} className="w-full px-4 py-2">Access Course Content</Link>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/" className="w-full px-4 py-2">Home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/coursecontent" className="w-full px-4 py-2">Course Content</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/pricing" className="w-full px-4 py-2">Pricing</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/signup" className="w-full px-4 py-2">Login</Link>
                </DropdownMenuItem>
                {user ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={(e) => {
                      e.preventDefault();
                      signOut();
                    }}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <Link to={`/course/${lesson.slug}`} className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}>
                Access Course Content
              </Link>
            ) : (
              <Link to="/coursecontent" className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}>
                Course Content
              </Link>
            )}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className={`rounded-full ${textColorClass}`}>
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault();
                    signOut();
                  }}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" className="bg-transparent text-black hover:text-black hover:bg-white/90 border-black">
                  <Link to="/signup">Login</Link>
                </Button>
                <Button variant="default" className="bg-black hover:bg-black/90">
                  <Link to="/signup">Access Course</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
