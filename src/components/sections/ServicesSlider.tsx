import React, { useRef, useEffect } from 'react';
import { useScrollStagger } from '../../hooks/useScrollAnimations';
import ScrambleText from '../animations/ScrambleText';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useScrollStagger({ stagger: 0.2 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current || !sectionRef.current) return;

    const slider = sliderRef.current;
    const section = sectionRef.current;
    
    // Calculate the maximum scroll distance
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    
    // Create the scroll-triggered animation
    const scrollAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom', // Start when section enters viewport
        end: 'bottom top',   // End when section leaves viewport
        scrub: 1,            // Smooth animation tied to scroll
        onUpdate: (self) => {
          // Calculate progress based on scroll position
          const progress = self.progress;
          // Scroll the slider based on scroll progress
          slider.scrollLeft = progress * maxScroll;
        }
      }
    });

    return () => {
      scrollAnimation.kill();
    };
  }, [services]);

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
    <section ref={sectionRef} className="w-full py-16">
      <div ref={containerRef} className="container-custom">
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
          <ScrambleText 
            text="WHAT WE DO"
            trigger=".section-h2"
            duration={1.2}
            className="text-brand-charcoal"
          />
        </h2>

        {/* Horizontal Scrolling Slider - PRD Specification */}
        <div className="relative">
          <div 
            ref={sliderRef}
            className="flex overflow-x-hidden scrollbar-hide gap-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'auto'
            }}
          >
            {services.map((service) => (
              <motion.div 
                key={service.id}
                className="flex-shrink-0 relative cursor-pointer overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
                }}
                transition={{
                  type: "spring",
                  bounce: 0.4,
                  duration: 0.4
                }}
                style={{
                  width: '752px',
                  height: '930px',
                  backgroundImage: `url(${service.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Content positioned at bottom with hover animations */}
                <motion.div 
                  className="absolute w-full"
                  initial={{ y: 20, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    bottom: '105px',
                    paddingRight: '111px',
                    paddingLeft: '40px'
                  }}
                >
                  {/* Service Title with hover animation */}
                  <motion.h3 
                    className="text-brand-cream mb-4"
                    whileHover={{ 
                      scale: 1.05
                    }}
                    transition={{ duration: 0.2 }}
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
                  </motion.h3>

                  {/* Service Description with reveal animation */}
                  <motion.p 
                    className="text-brand-cream"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
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
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;