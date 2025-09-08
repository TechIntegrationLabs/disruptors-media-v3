import React from 'react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="container-custom">
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
            textDecoration: 'none'
          }}
        >
          <span>BOOK A CALL</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            className="ml-4"
          >
            <path 
              d="M7 17L17 7M17 7H7M17 7V17" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;