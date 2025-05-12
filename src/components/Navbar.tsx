
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Menu, User, FileArrowDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { getFirstLesson } from '@/utils/course-data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const { user, signOut, hasPaid } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
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
  
  // Determine navbar background classes based on scroll state, page, and user login status
  const navbarClasses = () => {
    // Add border for logged-in users (except on homepage when not scrolled)
    const borderClass = user && (!isHomePage || scrolled) ? "border-b border-[#e5e7eb]" : "";
    
    if (isHomePage) {
      return scrolled
        ? `bg-white shadow-sm transition-all duration-300 sticky top-0 z-50 ${borderClass}`
        : `bg-transparent transition-all duration-300 sticky top-0 z-50 ${borderClass}`;
    }
    return `bg-background sticky top-0 z-50 ${borderClass}`;
  };
  
  // Always set text color to black
  const textColorClass = "text-black";
  
  const handleAccessCourse = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/signup');
      return;
    }
    
    if (!hasPaid) {
      navigate('/pricing');
      return;
    }
    
    // If user is authenticated and has paid, navigate to the course
    navigate(`/course/${lesson.slug}`);
  };
  
  // URL for slides download
  const slidesDownloadUrl = "https://drive.google.com/file/d/1Eyd9ogwbSe0K-qeGxzNPPrkfA9rApbHg/view?usp=sharing";
  
  return (
    <nav className={navbarClasses()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="https://prcourse.alexmacgregor.com/lovable-uploads/dc42269e-ffc8-4cbd-857f-536419ecd159.png" alt="Alex MacGregor" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <span className={`text-lg md:text-2xl font-bold truncate ${textColorClass}`}>
                {isMobile ? "PR Masterclass" : "Alex MacGregor's PR Masterclass"}
              </span>
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
                  <>
                    <DropdownMenuItem asChild>
                      <button className="w-full px-4 py-2 text-left" onClick={handleAccessCourse}>
                        Access Course Content
                      </button>
                    </DropdownMenuItem>
                    {user && hasPaid && (
                      <DropdownMenuItem asChild>
                        <a 
                          href={slidesDownloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-2 flex items-center"
                        >
                          <FileArrowDown className="h-4 w-4 mr-2" />
                          Download Slides
                        </a>
                      </DropdownMenuItem>
                    )}
                  </>
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
              <>
                <button 
                  onClick={handleAccessCourse}
                  className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}
                >
                  Access Course Content
                </button>
                {hasPaid && (
                  <a 
                    href={slidesDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass} flex items-center`}
                  >
                    <FileArrowDown className="h-4 w-4 mr-1" />
                    Download Slides
                  </a>
                )}
              </>
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
                <Link to="/signup" className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}>
                  Login
                </Link>
                <Button variant="default" className="bg-[#409EFF] hover:bg-[#409EFF]/90">
                  <Link to="/signup">Order Now</Link>
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
