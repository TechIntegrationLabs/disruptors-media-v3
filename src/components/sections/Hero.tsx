import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Gold Logo */}
          <motion.img
            src="https://res.cloudinary.com/dvcvxhzmt/image/upload/v1755697002/logos/gold-logo.png"
            alt="Disruptors Media Logo"
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          />
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gold">AI-Powered</span><br />
            Marketing Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your business with cutting-edge AI marketing strategies
            and professional studio services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/services/ai-marketing"
              className="bg-gold text-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold-light transition-all duration-300 transform hover:scale-105"
            >
              Explore AI Marketing
            </Link>
            <Link
              to="/services/studio"
              className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold hover:text-dark transition-all duration-300"
            >
              Book Studio Time
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDownIcon className="h-8 w-8 text-gold" />
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gold/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 right-32 w-40 h-40 bg-gold/5 rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;