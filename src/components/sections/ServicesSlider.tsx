import React, { useRef } from 'react';
import { motion } from 'framer-motion';

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
        {/* Section Title */}
        <h2 
          className="section-h2 text-brand-charcoal mb-12"
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: '63px',
            fontWeight: 600,
            lineHeight: '68.6px',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          What We Do
        </h2>

        {/* Horizontal Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gold hover:bg-gold-light text-dark w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button 
            onClick={scrollRight}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gold hover:bg-gold-light text-dark w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Services Slider */}
          <div 
            ref={sliderRef}
            className="flex gap-8 overflow-x-hidden scroll-smooth px-16"
            style={{ scrollBehavior: 'smooth' }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="flex-shrink-0 relative group"
                style={{ 
                  width: '752px', 
                  height: '500px',
                  background: `url('${service.backgroundImage}') center/cover`
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Service Content */}
                <div className="absolute inset-0 bg-dark/60 flex flex-col justify-end p-8">
                  <h3 
                    className="text-cream mb-4"
                    style={{
                      fontFamily: 'var(--font-secondary)',
                      fontSize: '39px',
                      fontWeight: 600,
                      lineHeight: '42px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-cream"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: '24px'
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;