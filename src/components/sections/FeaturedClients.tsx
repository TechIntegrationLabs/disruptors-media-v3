import React, { useState } from 'react';
import { sampleClients } from '../../data/clients-sample';

const FeaturedClients: React.FC = () => {
  const [hoveredClient, setHoveredClient] = useState<number | null>(null);

  return (
    <section className="w-full py-16 bg-cream overflow-hidden">
      <div className="container-custom text-center mb-12">
        <h2 
          className="section-h2 text-brand-charcoal mb-4"
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: '63px',
            fontWeight: 600,
            lineHeight: '68.6px',
            textTransform: 'uppercase'
          }}
        >
          Trusted By Industry Leaders
        </h2>
        <p 
          className="text-brand-charcoal"
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '28px'
          }}
        >
          We've helped transform businesses across various industries
        </p>
      </div>

      {/* Client Logos Carousel */}
      <div className="relative w-full overflow-hidden">
        <div 
          className="flex gap-5 animate-scroll"
          style={{
            width: 'calc(200px * 24)', // 12 clients * 2 (duplicated)
            animation: 'scroll 60s linear infinite'
          }}
        >
          {/* Duplicate the clients array for seamless infinite scroll */}
          {[...sampleClients, ...sampleClients].map((client, index) => (
            <div
              key={`${client.clientId}-${index}`}
              className="flex-shrink-0 group cursor-pointer"
              style={{ width: '200px', height: '120px' }}
              onMouseEnter={() => setHoveredClient(client.clientId)}
              onMouseLeave={() => setHoveredClient(null)}
            >
              <div className="w-full h-full flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <img
                  src={client.logoUrl}
                  alt={client.companyName}
                  className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                    hoveredClient === client.clientId 
                      ? 'grayscale-0 scale-110' 
                      : 'grayscale hover:grayscale-0'
                  }`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-200px * 12)); /* Half the width (original array length) */
          }
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default FeaturedClients;