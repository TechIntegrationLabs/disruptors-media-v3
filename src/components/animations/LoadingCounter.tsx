import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingCounterProps {
  onComplete?: () => void;
  duration?: number;
}

const LoadingCounter: React.FC<LoadingCounterProps> = ({ 
  onComplete, 
  duration = 3.5 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const counterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if loading has been shown before (cookie-based logic)
    const hasShownLoading = localStorage.getItem('dm3-loading-shown');
    
    if (hasShownLoading) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Animate counter from 0 to 100
    const counterTween = gsap.to({ value: 0 }, {
      value: 100,
      duration: duration * 0.8, // 80% of total duration for counting
      ease: "power2.out",
      onUpdate: function() {
        setCount(Math.floor(this.targets()[0].value));
      }
    });

    // Fade out animation
    const fadeOutTween = gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: duration - 0.5, // Start fade out 0.5s before completion
      ease: "power2.inOut",
      onComplete: () => {
        setIsVisible(false);
        localStorage.setItem('dm3-loading-shown', 'true');
        onComplete?.();
      }
    });

    // Loader image animation
    const loaderImage = counterRef.current?.querySelector('.loader-image');
    if (loaderImage) {
      gsap.fromTo(loaderImage, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.9, duration: 1, ease: "back.out(1.7)" }
      );
      
      // Subtle pulse effect
      gsap.to(loaderImage, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Technical coordinate simulation
    const coords = counterRef.current?.querySelector('.coordinates');
    if (coords) {
      gsap.set(coords, { opacity: 0.7 });
      gsap.to(coords, {
        opacity: 1,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });
    }

    // Cleanup
    return () => {
      counterTween.kill();
      fadeOutTween.kill();
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-dark z-50 flex items-center justify-center text-white"
      style={{
        background: 'linear-gradient(135deg, #2B2B2B 0%, #000000 100%)'
      }}
    >
      <div
        ref={counterRef}
        className="text-center font-tech"
      >
        {/* Loader Image */}
        <div className="mb-8">
          <img
            src="https://res.cloudinary.com/dvcvxhzmt/image/upload/v1755697023/miscellaneous/loader-lft.jpg"
            alt="Disruptors Media Loader"
            className="loader-image w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-6 rounded-lg opacity-90"
            style={{
              filter: 'brightness(1.1) contrast(1.1)',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
            }}
          />
        </div>

        {/* Main Counter */}
        <div className="mb-8">
          <div className="text-6xl lg:text-8xl font-bold text-gold mb-4">
            {count}%
          </div>
          <div className="text-xl lg:text-2xl text-cream/80 tracking-wider">
            LOADING EXPERIENCE
          </div>
        </div>

        {/* Technical Coordinates */}
        <div className="coordinates text-xs text-cream/60 font-mono">
          <div className="mb-2">
            LAT: {(40.7128 + Math.random() * 0.01).toFixed(6)}°N
          </div>
          <div className="mb-2">
            LONG: {(-74.0060 + Math.random() * 0.01).toFixed(6)}°W
          </div>
          <div className="mb-2">
            TIMESTAMP: {new Date().toISOString()}
          </div>
          <div className="text-gold">
            STATUS: INITIALIZING_AI_SYSTEMS...
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-80 mx-auto">
          <div className="h-1 bg-cream/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-100 ease-out"
              style={{ width: `${count}%` }}
            />
          </div>
        </div>

        {/* Tech Elements */}
        <div className="mt-6 flex justify-center items-center space-x-4 text-cream/40">
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
          <div className="font-mono text-xs">
            AI.CORE.BOOTSTRAP.INIT
          </div>
          <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCounter;