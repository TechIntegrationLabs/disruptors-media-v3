import React from 'react';

const FeaturedClients: React.FC = () => {
  // PRD Client Logos - placeholder data matching PRD specifications
  const clientLogos = [
    { name: 'Client 1', src: '/images/client-1.png', alt: 'Client 1 Logo' },
    { name: 'Client 2', src: '/images/client-2.png', alt: 'Client 2 Logo' },
    { name: 'Gold Banner', src: '/images/gold-logo-banner.png', alt: 'Gold Banner Logo' },
  ];

  return (
    <section 
      className="w-full bg-brand-charcoal"
      style={{
        background: 'var(--color-brand-charcoal)',
        padding: '70px 170px'
      }}
    >
      <div className="container-custom">
        {/* Section Title - PRD Specification */}
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

        {/* Logo Grid - PRD Specification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
          {clientLogos.map((client, index) => (
            <div 
              key={index}
              className="flex items-center justify-center"
              style={{ marginBottom: '86px' }}
            >
              <img 
                src={client.src}
                alt={client.alt}
                className="max-w-full h-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                style={{
                  maxHeight: '80px',
                  objectFit: 'contain'
                }}
              />
            </div>
          ))}
        </div>

        {/* Additional rows for more client logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mt-12">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item}
              className="flex items-center justify-center p-4"
            >
              <div 
                className="bg-gray-600 rounded-lg flex items-center justify-center text-gray-400"
                style={{ width: '160px', height: '80px' }}
              >
                Client {item + 3}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClients;