import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="container-custom">
        <motion.div
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            type: "spring", 
            bounce: 0.4,
            duration: 0.3
          }}
        >
          <Link 
            to="/contact" 
            className="cta-large w-full block text-center text-decoration-none"
            style={{
              background: 'var(--color-brand-charcoal)',
              color: 'var(--color-brand-cream)',
              fontFamily: 'var(--font-primary)',
              fontSize: '39.645px',
              fontWeight: 400,
              lineHeight: '47.65px',
              textTransform: 'uppercase',
              padding: '16px 21px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <span>BOOK A CALL</span>
            <motion.svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
              className="ml-4"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <path 
                d="M7 17L17 7M17 7H7M17 7V17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;