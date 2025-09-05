import React from 'react';
import { motion } from 'framer-motion';

const AIMarketing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            AI Marketing Strategy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leverage cutting-edge artificial intelligence to optimize your marketing
            campaigns and drive measurable results.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AIMarketing;