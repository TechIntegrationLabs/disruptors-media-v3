import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = '', 
  intensity = 15,
  perspective = 1000
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / rect.height * intensity;
      const rotateY = (centerX - e.clientX) / rect.width * intensity;
      
      gsap.to(card, {
        duration: 0.3,
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: perspective,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        duration: 0.5,
        rotationX: 0,
        rotationY: 0,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.set(card, { transformStyle: "preserve-3d" });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
      gsap.killTweensOf(card);
    };
  }, [intensity, perspective]);

  return (
    <div 
      ref={cardRef} 
      className={`tilt-card ${className}`}
      style={{ transformOrigin: 'center center' }}
    >
      {children}
    </div>
  );
};

export default TiltCard;