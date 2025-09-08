import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <section 
      className="relative w-full bg-logo-emboss"
      style={{ 
        paddingTop: '130px', 
        paddingBottom: '21px',
        backgroundPosition: 'center 40px',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container-custom">
        {/* Main Hero Title - PRD H1 Specifications */}
        <h1 
          className="hero-h1 text-brand-charcoal mb-16"
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: '220.302px',
            fontWeight: 600,
            lineHeight: '198.59px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '75px'
          }}
        >
          {title}
        </h1>

        {/* Secondary Headline - PRD H2 Specifications */}
        <h2 
          className="section-h2 text-brand-charcoal mb-12"
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: '63px',
            fontWeight: 600,
            lineHeight: '68.6px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '54px'
          }}
        >
          {subtitle}
        </h2>

        {/* Animated Separator Lines - PRD Specification */}
        <div className="flex flex-col items-center">
          <div 
            className="w-full bg-brand-charcoal"
            style={{ height: '1px', marginBottom: '18px' }}
          ></div>
          <div 
            className="w-full bg-brand-charcoal"
            style={{ height: '2px', marginBottom: '16px' }}
          ></div>
          <div 
            className="w-full bg-brand-charcoal"
            style={{ height: '4px', marginBottom: '14px' }}
          ></div>
          <div 
            className="w-full bg-brand-charcoal"
            style={{ height: '7px', marginBottom: '8px' }}
          ></div>
          <div 
            className="w-full bg-brand-charcoal"
            style={{ height: '9px', marginBottom: '11px' }}
          ></div>
          <div 
            className="w-full bg-brand-charcoal"
            style={{ height: '10px', marginBottom: '10px' }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;