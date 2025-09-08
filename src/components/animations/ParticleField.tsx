import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParticleFieldProps {
  particleCount?: number;
  className?: string;
  color?: string;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ 
  particleCount = 50, 
  className = '',
  color = '#FFD700'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 4 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      container.appendChild(particle);
      particlesRef.current.push(particle);
    }

    // Animate particles
    particlesRef.current.forEach((particle, index) => {
      // Random floating animation
      gsap.to(particle, {
        y: `random(-50, 50)`,
        x: `random(-30, 30)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });

      // Pulse effect
      gsap.to(particle, {
        scale: `random(0.5, 1.5)`,
        duration: `random(2, 4)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.05
      });
    });

    // Scroll-triggered parallax effect
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;
        particlesRef.current.forEach((particle, index) => {
          const speed = (index % 3 + 1) * 0.5; // Different speeds for depth
          gsap.set(particle, {
            y: `+=${progress * speed * 100}`
          });
        });
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      particlesRef.current.forEach(particle => {
        gsap.killTweensOf(particle);
        particle.remove();
      });
    };
  }, [particleCount, color]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticleField;