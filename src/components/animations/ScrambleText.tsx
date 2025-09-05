import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  trigger?: string;
  scrambleChars?: string;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  duration = 2,
  delay = 0,
  trigger,
  scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const originalText = useRef(text);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const chars = scrambleChars.split('');
    const textLength = originalText.current.length;
    
    const scrambleAnimation = () => {
      let iteration = 0;
      
      const interval = setInterval(() => {
        element.textContent = originalText.current
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return originalText.current[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        if (iteration >= textLength) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
      
      return () => clearInterval(interval);
    };

    if (trigger) {
      // Use ScrollTrigger if trigger is specified
      ScrollTrigger.create({
        trigger: trigger,
        start: "top 80%",
        onEnter: () => {
          setTimeout(scrambleAnimation, delay * 1000);
        },
        once: true
      });
    } else {
      // Use timeout if no trigger specified
      const timeoutId = setTimeout(scrambleAnimation, delay * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [text, duration, delay, trigger, scrambleChars]);

  return (
    <span
      ref={textRef}
      className={`font-tech ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
};

export default ScrambleText;