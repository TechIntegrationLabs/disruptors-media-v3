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
  slowGlitch?: boolean; // enable occasional slow glitches
  slowGlitchInterval?: number; // seconds between slow glitches
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
  glitchDuration = 150, // default 150ms glitch duration
  slowGlitch = false,
  slowGlitchInterval = 180 // default 3 minutes between slow glitches
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

    // Slow dramatic glitch effect - scrambles entire text slowly
    const slowGlitchEffect = () => {
      let iteration = 0;
      
      const slowInterval = setInterval(() => {
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
          clearInterval(slowInterval);
          element.textContent = originalText.current; // Restore original text
        }
        
        iteration += 0.3; // Much slower progression than normal scramble
      }, 80); // Slower interval than normal (80ms vs 30ms)
    };

    // Set up random glitch intervals
    let randomGlitchInterval: NodeJS.Timeout;
    let slowGlitchIntervalId: NodeJS.Timeout;
    
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

    // Set up slow glitch intervals
    if (slowGlitch) {
      const scheduleSlowGlitch = () => {
        const randomDelay = (slowGlitchInterval + Math.random() * slowGlitchInterval * 0.5) * 1000;
        slowGlitchIntervalId = setTimeout(() => {
          slowGlitchEffect();
          scheduleSlowGlitch(); // Schedule next slow glitch
        }, randomDelay);
      };
      
      // Start slow glitching after initial longer delay
      setTimeout(scheduleSlowGlitch, slowGlitchInterval * 1000);
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
        if (slowGlitchIntervalId) clearTimeout(slowGlitchIntervalId);
      };
    }

    // Cleanup function
    return () => {
      if (randomGlitchInterval) clearTimeout(randomGlitchInterval);
      if (slowGlitchIntervalId) clearTimeout(slowGlitchIntervalId);
    };
  }, [text, duration, delay, trigger, scrambleChars, randomGlitch, glitchInterval, glitchDuration, slowGlitch, slowGlitchInterval]);

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