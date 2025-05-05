
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-black">
              Alex MacGregor PR Course
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-black">
              Home
            </Link>
            <Link to="/about" className="px-3 py-2 text-sm font-medium text-foreground hover:text-black">
              About
            </Link>
            <Link to="/content" className="px-3 py-2 text-sm font-medium text-foreground hover:text-black">
              Course Content
            </Link>
          </div>
          <div className="flex items-center">
            <Button variant="default" className="bg-black hover:bg-black/90">
              <Link to="/signup">Access Course</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
