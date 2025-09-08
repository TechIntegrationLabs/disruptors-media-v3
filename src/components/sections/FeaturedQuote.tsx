import React from 'react';

interface FeaturedQuoteProps {
  title: string;
  content: string;
}

const FeaturedQuote: React.FC<FeaturedQuoteProps> = ({ title, content }) => {
  return (
    <section 
      className="w-full"
      style={{ 
        padding: '60px 0 40px 0'
      }}
    >
      <div className="container-custom">
        {/* Right-aligned content using flexbox - PRD Specification */}
        <div className="flex justify-end">
          <div className="max-w-lg">
            {/* Quote Heading - PRD H3 Specification */}
            <h3 
              className="text-brand-charcoal mb-8"
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: '65px',
                fontWeight: 600,
                lineHeight: '58.594px',
                textTransform: 'uppercase'
              }}
            >
              {title}
            </h3>

            {/* Quote Text - PRD Specification */}
            <p 
              className="text-brand-charcoal mb-10"
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: '28px',
                textAlign: 'justify',
                maxWidth: '393px',
                marginBottom: '40px'
              }}
            >
              {content}
            </p>

            {/* Animated Separator Lines - Same as Hero Section */}
            <div className="flex flex-col">
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
        </div>
      </div>
    </section>
  );
};

export default FeaturedQuote;