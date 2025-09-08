import React, { useRef } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
}

interface ServicesSliderProps {
  services: Service[];
}

const ServicesSlider: React.FC<ServicesSliderProps> = ({ services }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -752, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 752, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-16">
      <div className="container-custom">
        {/* Section Title - PRD Specification */}
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
          WHAT WE DO
        </h2>

        {/* Horizontal Scrolling Slider - PRD Specification */}
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide gap-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {services.map((service) => (
              <div 
                key={service.id}
                className="flex-shrink-0 relative"
                style={{
                  width: '752px',
                  height: '930px',
                  backgroundImage: `url(${service.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Content positioned at bottom - PRD Specification */}
                <div 
                  className="absolute w-full"
                  style={{
                    bottom: '105px',
                    paddingRight: '111px',
                    paddingLeft: '40px'
                  }}
                >
                  {/* Service Title - PRD H3 Specification */}
                  <h3 
                    className="text-brand-cream mb-4"
                    style={{
                      fontFamily: 'var(--font-secondary)',
                      fontSize: '65px',
                      fontWeight: 600,
                      lineHeight: '68.6px',
                      textTransform: 'uppercase',
                      marginBottom: '15px'
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Service Description - PRD Body Text */}
                  <p 
                    className="text-brand-cream"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '20px',
                      fontWeight: 400,
                      lineHeight: '28px',
                      textAlign: 'justify',
                      textTransform: 'none'
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Optional Enhancement */}
          <button
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-brand-charcoal text-brand-cream p-3 rounded-full opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-brand-charcoal text-brand-cream p-3 rounded-full opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Next slide"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;