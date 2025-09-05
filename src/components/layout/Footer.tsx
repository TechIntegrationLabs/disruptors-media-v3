import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gold mb-4">Disruptors Media</h3>
            <p className="text-gray-300 mb-4">
              AI-powered marketing solutions and professional studio services
              helping businesses transform their digital presence.
            </p>
            <div className="text-sm text-gray-400">
              <p>North Salt Lake, Utah</p>
              <p>Email: hello@disruptorsmedia.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-gold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/services/ai-marketing" className="hover:text-gold transition-colors">
                  AI Marketing Strategy
                </Link>
              </li>
              <li>
                <Link to="/services/studio" className="hover:text-gold transition-colors">
                  Studio Services
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Digital Transformation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Content Production
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-gold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Disruptors Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;