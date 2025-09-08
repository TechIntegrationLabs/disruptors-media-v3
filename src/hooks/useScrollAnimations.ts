import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export const useScrollFadeIn = (options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(element, 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 1,
        delay: options.delay || 0,
        ease: options.ease || "power2.out",
        scrollTrigger: {
          trigger: element,
          start: options.start || "top 80%",
          end: options.end || "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [options]);

  return elementRef;
};

export const useScrollStagger = (options: ScrollAnimationOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (!children.length) return;

    gsap.fromTo(children, 
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.6,
        ease: options.ease || "power2.out",
        stagger: options.stagger || 0.1,
        scrollTrigger: {
          trigger: container,
          start: options.start || "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [options]);

  return containerRef;
};

export const useHeroAnimations = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const tl = gsap.timeline();

    // Hero title animation
    const title = hero.querySelector('.hero-title');
    const subtitle = hero.querySelector('.hero-subtitle');
    const buttons = hero.querySelector('.hero-buttons');
    const logo = hero.querySelector('.hero-logo');

    if (logo) {
      tl.fromTo(logo, 
        { scale: 0, rotation: -10 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
      );
    }

    if (title) {
      tl.fromTo(title,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }

    if (subtitle) {
      tl.fromTo(subtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }

    if (buttons) {
      tl.fromTo(buttons,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return heroRef;
};

export const useParallaxEffect = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [speed]);

  return elementRef;
};