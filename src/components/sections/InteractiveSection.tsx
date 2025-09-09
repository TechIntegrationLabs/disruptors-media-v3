import React from 'react';

const InteractiveSection: React.FC = () => {
  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ 
        padding: '67px 0',
        background: 'transparent'
      }}
    >
      <div className="container-custom">
        <div className="relative text-center">
          {/* Robot Hand - Left positioned */}
          <div 
            className="absolute"
            style={{
              left: '-57px',
              top: '127px',
              width: '510px',
              height: '231px'
            }}
          >
            <img 
              src="/images/hand-robot.png" 
              alt="Robot Hand"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Human Hand - Right positioned */}
          <div 
            className="absolute"
            style={{
              right: '-92px',
              bottom: '215px',
              width: '578px',
              height: '235px'
            }}
          >
            <img 
              src="/images/hand-human.png" 
              alt="Human Hand"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Phone Element - Center positioned */}
          <div className="flex justify-center">
            <img 
              src="/images/phone.png" 
              alt="Mobile Device"
              className="max-w-full h-auto"
            />
          </div>

          {/* Content Text */}
          <div className="mt-8">
            <p 
              className="body-primary text-brand-charcoal text-center"
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: '30px',
                textTransform: 'uppercase',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              WHERE HUMAN CREATIVITY MEETS ARTIFICIAL INTELLIGENCE TO CREATE EXTRAORDINARY RESULTS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSection;