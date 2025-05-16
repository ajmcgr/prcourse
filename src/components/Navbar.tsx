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
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { getFirstLesson } from '@/utils/course-data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";

const Navbar: React.FC = () => {
  const { user, signOut, hasPaid } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = location.pathname === '/';
  const isMobile = useIsMobile();
  const { lesson } = getFirstLesson();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // URLs 
  const communityUrl = "https://discord.gg/7sbqZgesud";
  const reviewUrl = "https://senja.io/p/works/r/cmUuOZ";
  const newsletterUrl = "https://newsletter.alexmacgregor.com/";
  
  // URL for slides download
  const slidesDownloadUrl = "https://drive.google.com/file/d/1Eyd9ogwbSe0K-qeGxzNPPrkfA9rApbHg/view?usp=sharing";

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navbarClasses = () => {
    // Only add border for logged-in users
    const borderClass = user ? "border-b border-[#e5e7eb]" : "";
    
    if (isHomePage) {
      return scrolled
        ? `bg-white shadow-sm transition-all duration-300 sticky top-0 z-50 ${borderClass} w-full`
        : `bg-transparent transition-all duration-300 sticky top-0 z-50 ${borderClass} w-full`;
    }
    return `bg-background sticky top-0 z-50 ${borderClass} w-full`;
  };
  
  // Always set text color to black
  const textColorClass = "text-black";
  
  // Handle Stripe checkout for users who haven't paid
  const handleStripeCheckout = async () => {
    try {
      setIsProcessing(true);
      console.log("Starting direct payment process for user:", user?.id);
      
      // Create payment session using edge function
      console.log("Creating payment checkout session");
      const { data, error: invokeError } = await supabase.functions.invoke("create-payment", {
        body: {
          returnUrl: `${window.location.origin}/payment-success`
        }
      });
      
      if (invokeError) {
        console.error("Payment function invoke error:", invokeError);
        toast.error("Failed to start payment process. Please try again.");
        setIsProcessing(false);
        return;
      }
      
      if (!data || !data.url) {
        console.error("No redirect URL returned from payment function", data);
        toast.error("Payment setup failed. Please try again later.");
        setIsProcessing(false);
        return;
      }
      
      console.log("Redirecting to Stripe payment URL:", data.url);
      
      // Redirect directly to the Stripe checkout URL in the current window
      window.location.href = data.url;
    } catch (err: any) {
      const errorMessage = err?.message || 'Unknown error occurred';
      console.error('Purchase error:', err);
      toast.error("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };
  
  const handleAccessCourse = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/signup');
      return;
    }
    
    if (!hasPaid) {
      handleStripeCheckout();
      return;
    }
    
    // If user is authenticated and has paid, navigate to the course
    navigate(`/course/${lesson.slug}`);
  };
  
  return (
    <nav className={navbarClasses()}>
      {/* For logged-in users, container is full-width */}
      {/* For logged-out users, container is max-w-7xl (limited width) */}
      <div className={`px-4 sm:px-6 lg:px-8 mx-auto ${user ? 'w-full' : 'max-w-7xl'}`}>
        <div className="flex justify-between items-center h-16 w-full">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="https://prcourse.alexmacgregor.com/lovable-uploads/dc42269e-ffc8-4cbd-857f-536419ecd159.png" alt="Alex MacGregor" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <span className={`text-base md:text-lg font-bold truncate ${textColorClass}`}>
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
                      <button 
                        className="w-full px-4 py-2 text-left" 
                        onClick={handleAccessCourse}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Access Course Content'}
                      </button>
                    </DropdownMenuItem>
                    {user && hasPaid && (
                      <>
                        <DropdownMenuItem asChild>
                          <a 
                            href={slidesDownloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full px-4 py-2 flex items-center"
                          >
                            Download Slides
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a 
                            href={reviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full px-4 py-2 flex items-center"
                          >
                            Leave a Review
                          </a>
                        </DropdownMenuItem>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/" className="w-full px-4 py-2">Home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a 
                        href={communityUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full px-4 py-2"
                      >
                        Community
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a 
                        href={newsletterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-4 py-2"
                      >
                        Newsletter
                      </a>
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
                  <Link to="/signup?mode=signup" className="w-full px-4 py-2">Sign Up</Link>
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
          
          {/* Desktop menu - expanded to full container width for logged-in users */}
          {user ? (
            <div className="hidden md:flex md:flex-grow items-center justify-end space-x-4">
              <button 
                onClick={handleAccessCourse}
                disabled={isProcessing}
                className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass} ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? 'Processing...' : 'Access Course Content'}
              </button>
              {hasPaid && (
                <>
                  <a 
                    href={slidesDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}
                  >
                    Download Slides
                  </a>
                  <a 
                    href={reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}
                  >
                    Leave a Review
                  </a>
                </>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`${textColorClass}`}>
                    Account
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
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <a 
                href={communityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}
              >
                Community
              </a>
              <a 
                href={newsletterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}
              >
                Newsletter
              </a>
              <Link to="/coursecontent" className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}>
                Course Content
              </Link>
              <Link to="/signup" className={`px-3 py-2 text-sm font-medium hover:opacity-80 ${textColorClass}`}>
                Login
              </Link>
              <Button variant="default" className="bg-[#409EFF] hover:bg-[#409EFF]/90">
                <Link to="/signup?mode=signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
