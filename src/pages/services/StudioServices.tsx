import React from 'react';
import { motion } from 'framer-motion';

const StudioServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-dark-light text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-gold">Studio Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            State-of-the-art studio facility in North Salt Lake with professional
            equipment for all your content creation needs.
          </p>
        </motion.div>

        {/* Studio Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gold/10 p-8 rounded-xl text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gold mb-4">Studio Rental</h2>
          <div className="text-5xl font-bold text-white mb-4">$99/hour</div>
          <p className="text-gray-300 mb-6">Professional studio with all equipment included</p>
          <button className="bg-gold text-dark px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gold-light transition-colors">
            Book Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default StudioServices;