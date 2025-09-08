import React from 'react';
import { motion } from 'framer-motion';

interface PlaceholderNoticeProps {
  message?: string;
  className?: string;
}

const PlaceholderNotice: React.FC<PlaceholderNoticeProps> = ({ 
  message = "Demo Content", 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed bottom-4 right-4 z-50 ${className}`}
    >
      <div className="bg-gold/20 border border-gold/40 text-dark text-xs px-3 py-2 rounded-lg backdrop-blur-sm">
        <span className="font-medium">Note:</span> {message}
      </div>
    </motion.div>
  );
};

export default PlaceholderNotice;