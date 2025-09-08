import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useHeroAnimations } from '../../hooks/useScrollAnimations';
import ScrambleText from '../animations/ScrambleText';
import MagneticCursor from '../animations/MagneticCursor';

const Hero: React.FC = () => {
  const heroRef = useHeroAnimations();
  
  // Debug: Log when component mounts
  console.log('Hero component mounted with GSAP animations');

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source 
          src="https://res.cloudinary.com/dvcvxhzmt/video/upload/v1757280802/dm-abt_rwm0ng.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div>
          {/* Gold Logo */}
          <img
            src="https://res.cloudinary.com/dvcvxhzmt/image/upload/v1755697002/logos/gold-logo.png"
            alt="Disruptors Media Logo"
            className="hero-logo w-32 md:w-40 lg:w-48 h-auto mx-auto mb-8"
            style={{ maxWidth: '200px', height: 'auto' }}
          />
          
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gold">
              <ScrambleText 
                text="AI-POWERED" 
                duration={2}
                delay={1}
                className="text-gold"
              />
            </span><br />
            <ScrambleText 
              text="MARKETING SOLUTIONS" 
              duration={2.5}
              delay={2}
              className="text-white"
            />
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your business with cutting-edge AI marketing strategies
            and professional studio services.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <MagneticCursor strength={0.2}>
              <Link
                to="/services/ai-marketing"
                className="bg-gold text-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold-light transition-all duration-300 transform hover:scale-105 block"
              >
                Explore AI Marketing
              </Link>
            </MagneticCursor>
            <MagneticCursor strength={0.2}>
              <Link
                to="/services/studio"
                className="border-2 border-gold text-gold px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold hover:text-dark transition-all duration-300 block"
              >
                Book Studio Time
              </Link>
            </MagneticCursor>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDownIcon className="h-8 w-8 text-gold" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gold/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 right-32 w-40 h-40 bg-gold/5 rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;