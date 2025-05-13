
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Alex MacGregor's PR Masterclass</h3>
            <p className="text-sm text-gray-600">
              Learn my PR strategies to build your brand and gain the media attention your business deserves.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="text-gray-600 hover:text-black">Home</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-black">About</Link></li>
                <li><a href="https://prcourse.alexmacgregor.com/coursecontent" className="text-gray-600 hover:text-black">Course Content</a></li>
                <li><a href="https://discord.gg/7sbqZgesud" className="text-gray-600 hover:text-black">Community</a></li>
                <li><Link to="/signup" className="text-gray-600 hover:text-black">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="text-gray-600">Email: alex@alexmacgregor.com</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                {/* Instagram icon removed */}
                <a href="https://x.com/alexmacgregor__" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/alexmacgregor2/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
                <a href="https://discord.gg/7sbqZgesud" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright - No divider and smaller text */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">© 2025 Alex MacGregor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
