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
  randomGlitch?: boolean;
  glitchInterval?: number; // seconds between random glitches
  glitchDuration?: number; // milliseconds for glitch effect
}

const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  duration = 2,
  delay = 0,
  trigger,
  scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*',
  randomGlitch = false,
  glitchInterval = 5, // default 5 seconds between glitches
  glitchDuration = 150 // default 150ms glitch duration
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const originalText = useRef(text);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    console.log('ScrambleText effect running for text:', text);
    
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

    // Quick glitch effect for random glitches
    const quickGlitch = () => {
      let glitchIteration = 0;
      const maxGlitchChars = Math.min(3, textLength); // Only scramble first few characters
      
      const glitchInterval = setInterval(() => {
        element.textContent = originalText.current
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < maxGlitchChars && glitchIteration < 5) { // Only glitch first few chars
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return originalText.current[index];
          })
          .join('');
        
        glitchIteration++;
        if (glitchIteration >= 5) {
          clearInterval(glitchInterval);
          element.textContent = originalText.current; // Restore original text
        }
      }, 30);
    };

    // Set up random glitch intervals
    let randomGlitchInterval: NodeJS.Timeout;
    if (randomGlitch) {
      const scheduleRandomGlitch = () => {
        const randomDelay = (glitchInterval + Math.random() * glitchInterval) * 1000;
        randomGlitchInterval = setTimeout(() => {
          quickGlitch();
          scheduleRandomGlitch(); // Schedule next glitch
        }, randomDelay);
      };
      
      // Start random glitching after initial delay
      setTimeout(scheduleRandomGlitch, glitchInterval * 1000);
    }

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
      return () => {
        clearTimeout(timeoutId);
        if (randomGlitchInterval) clearTimeout(randomGlitchInterval);
      };
    }

    // Cleanup function
    return () => {
      if (randomGlitchInterval) clearTimeout(randomGlitchInterval);
    };
  }, [text, duration, delay, trigger, scrambleChars, randomGlitch, glitchInterval, glitchDuration]);

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