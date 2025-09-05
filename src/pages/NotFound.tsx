import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const NotFound: React.FC = () => {
  const popularPages = [
    { name: 'Home', path: '/', description: 'Return to our homepage' },
    { name: 'AI Marketing Services', path: '/services/ai-marketing', description: 'Explore our AI solutions' },
    { name: 'Portfolio', path: '/portfolio', description: 'View our case studies' },
    { name: 'Contact', path: '/contact', description: 'Get in touch with us' },
    { name: 'Blog', path: '/blog', description: 'Read our latest insights' },
    { name: 'AI Assessment', path: '/assessment', description: 'Test your AI readiness' }
  ];

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Animation */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                bounce: 0.4
              }}
              className="text-8xl md:text-9xl font-bold text-gold opacity-20 mb-4"
            >
              404
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative"
            >
              <ExclamationTriangleIcon className="h-16 w-16 text-gold mx-auto mb-6" />
              
              <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full" />
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Page Not Found
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track with our AI-powered solutions.
            </p>
          </motion.div>

          {/* Popular Pages Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
          >
            {popularPages.map((page, index) => (
              <motion.div
                key={page.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
              >
                <Link
                  to={page.path}
                  className="block glass-card p-6 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors">
                      {page.name}
                    </h3>
                    <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gold transition-colors" />
                  </div>
                  <p className="text-gray-300 text-sm">{page.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="glass-card p-8 max-w-md mx-auto mb-8"
          >
            <MagnifyingGlassIcon className="h-12 w-12 text-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">
              Looking for something specific?
            </h3>
            <p className="text-gray-300 mb-6">
              Try searching our site or contact us directly for assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/blog"
                className="btn-secondary flex-1"
              >
                Search Blog
              </Link>
              <Link 
                to="/contact"
                className="btn-primary flex-1"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-gold hover:text-gold-light text-lg font-medium transition-colors"
            >
              <HomeIcon className="h-6 w-6 mr-2" />
              Return to Homepage
            </Link>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold/20 rounded-full"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 80, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-3/4 right-1/4 w-3 h-3 bg-gold/30 rounded-full"
          />
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-gold/40 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;