
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-pr-dark border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl mb-4">PR Masterclass</h3>
            <p className="text-gray-600 mb-4">
              Elevate your public relations skills with expert-led courses and resources.
            </p>
          </div>
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-pr-accent">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pr-accent">About</Link>
              </li>
              <li>
                <Link to="/content" className="text-gray-600 hover:text-pr-accent">Course Content</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-pr-accent">Sign Up</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg mb-4">Contact</h4>
            <p className="text-gray-600 mb-2">Email: alex@alexmacgregor.com</p>
            <p className="text-gray-600">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            &copy; {currentYear} PR Masterclass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
