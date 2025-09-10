import React from 'react';
import { motion, Transition } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: { 
    opacity: 0,
    y: 50,
    scale: 0.98
  },
  in: { 
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: { 
    opacity: 0,
    y: -50,
    scale: 0.98
  }
};

const pageTransition: Transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.6
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;