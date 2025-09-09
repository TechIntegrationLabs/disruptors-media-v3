# Animation Usage Guide

## Quick Start Guide for Developers

This guide provides practical examples and implementation patterns for using the GSAP animation system in the Disruptors Media v3 application.

---

## 🚀 Quick Implementation Examples

### 1. Add Text Scrambling Effect

```tsx
import ScrambleText from '../components/animations/ScrambleText';

// Basic usage
<ScrambleText text="YOUR TEXT HERE" />

// With custom settings
<ScrambleText 
  text="ANIMATED TITLE"
  duration={2}
  delay={0.5}
  className="text-gold text-4xl"
  scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
/>

// With scroll trigger
<ScrambleText 
  text="SCROLL ACTIVATED"
  trigger=".my-section"
  duration={1.5}
/>
```

### 2. Add Magnetic Cursor Effect

```tsx
import MagneticCursor from '../components/animations/MagneticCursor';

// Wrap any interactive element
<MagneticCursor strength={0.3}>
  <button className="cta-button">
    Hover for Magnetic Effect
  </button>
</MagneticCursor>

// Lower strength for subtle effect
<MagneticCursor strength={0.1}>
  <Link to="/contact">Contact Us</Link>
</MagneticCursor>
```

### 3. Add Scroll-Triggered Animations

```tsx
import { useScrollFadeIn, useScrollStagger } from '../hooks/useScrollAnimations';

// Fade in single element
const MyComponent = () => {
  const fadeRef = useScrollFadeIn({ duration: 1 });
  
  return (
    <div ref={fadeRef}>
      This will fade in on scroll
    </div>
  );
};

// Stagger multiple children
const ListComponent = () => {
  const staggerRef = useScrollStagger({ stagger: 0.1 });
  
  return (
    <div ref={staggerRef}>
      <div>Item 1 (animates first)</div>
      <div>Item 2 (animates second)</div>
      <div>Item 3 (animates third)</div>
    </div>
  );
};
```

### 4. Add 3D Tilt Effect

```tsx
import TiltCard from '../components/animations/TiltCard';

// Basic tilt card
<TiltCard>
  <div className="service-card">
    Card content here
  </div>
</TiltCard>

// Custom intensity
<TiltCard intensity={25} perspective={1500}>
  <div className="portfolio-item">
    More dramatic tilt effect
  </div>
</TiltCard>
```

### 5. Add Particle Background

```tsx
import ParticleField from '../components/animations/ParticleField';

// Inside a section with relative positioning
<section className="relative">
  <ParticleField 
    particleCount={40}
    color="#FFD700"
  />
  <div className="relative z-10">
    Your content here
  </div>
</section>
```

---

## 📋 Component Patterns

### Hero Section Pattern

```tsx
import { useHeroAnimations } from '../hooks/useScrollAnimations';
import ScrambleText from '../animations/ScrambleText';
import MagneticCursor from '../animations/MagneticCursor';
import ParticleField from '../animations/ParticleField';

const HeroSection = () => {
  const heroRef = useHeroAnimations();

  return (
    <section ref={heroRef} className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-dark" />
      <ParticleField particleCount={30} />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="hero-title text-6xl mb-6">
          <ScrambleText 
            text="MAIN TITLE"
            duration={2}
            delay={1}
          />
        </h1>
        
        <p className="hero-subtitle text-xl mb-8">
          Your subtitle text
        </p>
        
        <div className="hero-buttons">
          <MagneticCursor strength={0.2}>
            <button>Primary CTA</button>
          </MagneticCursor>
        </div>
      </div>
    </section>
  );
};
```

### Content Section Pattern

```tsx
import { useScrollFadeIn } from '../hooks/useScrollAnimations';
import ScrambleText from '../animations/ScrambleText';

const ContentSection = ({ title, content }) => {
  const sectionRef = useScrollFadeIn();

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto">
        <h2 className="section-title text-4xl mb-8">
          <ScrambleText 
            text={title}
            trigger=".section-title"
            duration={1.5}
          />
        </h2>
        <p>{content}</p>
      </div>
    </section>
  );
};
```

### Service Grid Pattern

```tsx
import { useScrollStagger } from '../hooks/useScrollAnimations';
import TiltCard from '../animations/TiltCard';

const ServicesGrid = ({ services }) => {
  const gridRef = useScrollStagger({ stagger: 0.2 });

  return (
    <div ref={gridRef} className="grid grid-cols-3 gap-6">
      {services.map((service) => (
        <TiltCard key={service.id} intensity={15}>
          <div className="service-card p-6">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        </TiltCard>
      ))}
    </div>
  );
};
```

---

## 🎛️ Configuration Options

### ScrollAnimationOptions Interface

```typescript
interface ScrollAnimationOptions {
  trigger?: string;     // CSS selector for custom trigger
  start?: string;       // "top 80%" (default)
  end?: string;         // "bottom 20%" (default)
  duration?: number;    // Animation duration in seconds
  delay?: number;       // Delay before animation starts
  ease?: string;        // GSAP easing function
  stagger?: number;     // Time between staggered elements
}
```

### Usage Examples

```tsx
// Custom scroll trigger points
const fadeRef = useScrollFadeIn({
  start: "top 90%",    // Trigger earlier
  end: "bottom 10%",   // End later
  duration: 1.5,       // Slower animation
  ease: "power3.out"   // Different easing
});

// Stagger with custom timing
const staggerRef = useScrollStagger({
  stagger: 0.3,        // Longer delays between items
  duration: 0.8,       // Faster individual animations
  start: "top 85%"     // Custom trigger point
});
```

---

## 🎨 Styling Integration

### CSS Classes for Animations

```css
/* Add to your CSS for animation-ready elements */
.hero-title,
.hero-subtitle,
.hero-buttons,
.hero-logo {
  /* These classes are targeted by useHeroAnimations */
}

.section-h2 {
  /* Targeted by ScrambleText trigger */
}

.magnetic-cursor {
  /* Applied by MagneticCursor component */
  cursor: pointer;
  transition: transform 0.3s ease;
}

.tilt-card {
  /* Applied by TiltCard component */
  transform-style: preserve-3d;
}
```

### Animation-Friendly Layouts

```tsx
// Use proper z-index layering
<section className="relative">
  {/* Background layer */}
  <div className="absolute inset-0 z-0">
    <ParticleField />
  </div>
  
  {/* Content layer */}
  <div className="relative z-10">
    Your content
  </div>
</section>

// Ensure proper positioning for magnetic effects
<MagneticCursor>
  <button className="relative block">
    Button Text
  </button>
</MagneticCursor>
```

---

## ⚡ Performance Best Practices

### 1. Particle Count Guidelines

```tsx
// Desktop: 30-50 particles
<ParticleField particleCount={40} />

// Mobile: 15-25 particles
<ParticleField 
  particleCount={window.innerWidth < 768 ? 20 : 40} 
/>
```

### 2. Animation Cleanup

```tsx
// Always clean up animations in useEffect
useEffect(() => {
  // Animation setup...
  
  return () => {
    gsap.killTweensOf(element);
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
}, []);
```

### 3. Conditional Animation Loading

```tsx
// Only load heavy animations on larger screens
const isDesktop = window.innerWidth >= 1024;

return (
  <section>
    {isDesktop && <ParticleField />}
    <ScrambleText text="Always show text effects" />
  </section>
);
```

---

## 🐛 Common Issues & Solutions

### Issue: Text Not Scrambling
```tsx
// Problem: Missing trigger element
<ScrambleText text="Hello" trigger=".missing-class" />

// Solution: Use element ref or remove trigger
<ScrambleText text="Hello" />
// or
<h1 className="my-title">
  <ScrambleText text="Hello" trigger=".my-title" />
</h1>
```

### Issue: Magnetic Effect Too Strong
```tsx
// Problem: Overpowering magnetic effect
<MagneticCursor strength={1}>

// Solution: Reduce strength
<MagneticCursor strength={0.2}>
```

### Issue: Animations Not Triggering on Scroll
```tsx
// Problem: ScrollTrigger not registered
import { gsap } from 'gsap';

// Solution: Register plugin
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

### Issue: Performance Problems
```tsx
// Problem: Too many particles or complex animations
<ParticleField particleCount={100} />

// Solution: Reduce complexity
<ParticleField particleCount={30} />

// Use conditional loading
{!isMobile && <ParticleField />}
```

---

## 📱 Mobile Considerations

### Touch-Friendly Animations

```tsx
// Reduce magnetic strength for mobile
const isMobile = window.innerWidth < 768;

<MagneticCursor strength={isMobile ? 0.1 : 0.3}>
  <button>Touch-friendly button</button>
</MagneticCursor>
```

### Performance Optimizations

```tsx
// Fewer particles on mobile
const particleCount = window.innerWidth < 768 ? 15 : 40;

<ParticleField 
  particleCount={particleCount}
  color="#FFD700"
/>

// Faster animations on mobile
const duration = window.innerWidth < 768 ? 1 : 2;

<ScrambleText 
  text="TITLE"
  duration={duration}
/>
```

---

## 🔧 Debugging Tips

### Enable Animation Logging

```tsx
// Add to components during development
console.log('ScrambleText effect running for:', text);
console.log('Hero animations mounted');
console.log('Magnetic cursor strength:', strength);
```

### Check GSAP Timeline

```typescript
// In browser console
gsap.globalTimeline.getChildren(); // See all active animations
ScrollTrigger.getAll(); // See all scroll triggers
```

### Performance Monitoring

```typescript
// Monitor animation performance
const startTime = performance.now();
gsap.to(element, {
  duration: 1,
  onComplete: () => {
    const endTime = performance.now();
    console.log('Animation took:', endTime - startTime, 'ms');
  }
});
```

---

## 🎯 Integration Checklist

When adding animations to a new component:

- [ ] Import required animation components/hooks
- [ ] Add proper TypeScript types
- [ ] Implement cleanup in useEffect
- [ ] Test on mobile devices
- [ ] Verify accessibility (prefers-reduced-motion)
- [ ] Check performance with dev tools
- [ ] Test scroll trigger points
- [ ] Ensure proper z-index layering

---

## 📚 Additional Resources

- **GSAP Documentation**: [greensock.com/docs](https://greensock.com/docs/)
- **ScrollTrigger Guide**: [greensock.com/scrolltrigger](https://greensock.com/scrolltrigger/)
- **React + GSAP Best Practices**: [greensock.com/react](https://greensock.com/react/)
- **Performance Optimization**: [web.dev/animations](https://web.dev/animations/)

---

This guide covers the most common animation use cases. For advanced implementations or custom animations, refer to the main GSAP documentation and the component source code for detailed implementation patterns.