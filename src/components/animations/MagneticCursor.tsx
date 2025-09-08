import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MagneticCursorProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  ease?: string;
}

const MagneticCursor: React.FC<MagneticCursorProps> = ({ 
  children, 
  className = '',
  strength = 0.3,
  ease = "power2.out"
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      magnetRef.current = { x: deltaX, y: deltaY };
      
      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 1,
        ease: ease
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 1,
        ease: ease
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(element);
    };
  }, [strength, ease]);

  return (
    <div ref={elementRef} className={`magnetic-cursor ${className}`}>
      {children}
    </div>
  );
};

export default MagneticCursor;