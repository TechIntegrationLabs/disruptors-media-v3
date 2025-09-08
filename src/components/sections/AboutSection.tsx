import React from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollAnimations';
import ScrambleText from '../animations/ScrambleText';

interface AboutSectionProps {
  title: string;
  content: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ title, content }) => {
  const sectionRef = useScrollFadeIn();

  return (
    <section 
      ref={sectionRef}
      className="w-full"
      style={{ 
        padding: '20px 0 40px 0'
      }}
    >
      <div className="container-custom">
        {/* Section Title - PRD H2 Specification */}
        <h2 
          className="section-h2 text-brand-charcoal mb-8"
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: '63px',
            fontWeight: 600,
            lineHeight: '68.6px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          <ScrambleText 
            text={title}
            trigger=".section-h2"
            duration={1.5}
            className="text-brand-charcoal"
          />
        </h2>

        {/* Content - PRD Body Text Specification */}
        <div 
          className="body-primary text-brand-charcoal"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '22px',
            fontWeight: 400,
            lineHeight: '30px',
            textTransform: 'uppercase',
            textAlign: 'left',
            marginBottom: '30px'
          }}
        >
          {content.split('. ').map((sentence, index) => (
            <span key={index} className="block mb-2">
              {sentence}{index < content.split('. ').length - 1 ? '.' : ''}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;