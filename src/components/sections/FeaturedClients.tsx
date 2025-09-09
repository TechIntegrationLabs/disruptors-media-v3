import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { sampleClients } from '../../data/clients-sample';

const FeaturedClients: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    // Duplicate the clients array to create seamless loop
    const duplicatedClients = [...sampleClients, ...sampleClients];
    
    // Calculate carousel width
    const itemWidth = 220; // 200px logo + 20px gap
    const totalWidth = itemWidth * sampleClients.length;
    
    // Create infinite scroll animation
    const animation = gsap.to(carouselRef.current, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    // Pause on hover
    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    const carousel = carouselRef.current;
    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      animation.kill();
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicate clients for seamless loop
  const displayClients = [...sampleClients, ...sampleClients];

  return (
    <section 
      className="w-full bg-brand-charcoal overflow-hidden"
      style={{
        background: 'var(--color-brand-charcoal)',
        padding: '70px 0'
      }}
    >
      <div className="container-custom">
        {/* Section Title */}
        <h2 
          className="text-brand-cream mb-16"
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
          FEATURED CLIENTS
        </h2>

        {/* Client Logo Carousel */}
        <div className="relative w-full overflow-hidden" style={{ height: '150px' }}>
          <div 
            ref={carouselRef}
            className="flex items-center gap-5 absolute"
            style={{ 
              width: 'fit-content',
              willChange: 'transform'
            }}
          >
            {displayClients.map((client, index) => (
              <div 
                key={`client-${index}`}
                className="flex-shrink-0 relative group cursor-pointer"
                style={{ width: '200px', height: '100px' }}
                onMouseEnter={() => setHoveredClient(index % sampleClients.length)}
                onMouseLeave={() => setHoveredClient(null)}
              >
                {/* Logo Image */}
                <img 
                  src={client.logoUrl}
                  alt={`${client.companyName} logo`}
                  className="w-full h-full object-contain transition-all duration-300"
                  style={{
                    filter: hoveredClient === (index % sampleClients.length) 
                      ? 'grayscale(0%) brightness(100%)' 
                      : 'grayscale(100%) brightness(90%)',
                    transform: hoveredClient === (index % sampleClients.length)
                      ? 'scale(1.1)'
                      : 'scale(1)'
                  }}
                />

                {/* Company Name on Hover */}
                <div 
                  className="absolute inset-x-0 -bottom-8 text-center transition-opacity duration-300"
                  style={{
                    opacity: hoveredClient === (index % sampleClients.length) ? 1 : 0,
                    pointerEvents: 'none'
                  }}
                >
                  <p 
                    className="text-brand-cream"
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '14px',
                      fontWeight: 400,
                      textTransform: 'uppercase'
                    }}
                  >
                    {client.companyName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-20">
          <p 
            className="text-brand-cream opacity-80"
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px'
            }}
          >
            Trusted by leading brands across industries
          </p>
        </div>
      </div>

      {/* CSS for grayscale filter support */}
      <style jsx>{`
        @supports not (filter: grayscale(100%)) {
          img {
            opacity: 0.7;
          }
          img:hover {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedClients;