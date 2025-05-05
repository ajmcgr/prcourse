
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-pr-dark border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl mb-4">PR Masterclass</h3>
            <p className="text-gray-600 mb-4 text-sm">
              A comprehensive course featuring expert essays and video lessons to elevate your PR strategy and execution.
            </p>
          </div>
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600">About</Link>
              </li>
              <li>
                <Link to="/content" className="text-gray-600">Course Content</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600">Sign Up</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg mb-4">Contact</h4>
            <p className="text-gray-600 text-sm">Email: alex@alexmacgregor.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 text-center">
          <p className="text-gray-600 text-xs">
            &copy; {currentYear} PR Masterclass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
