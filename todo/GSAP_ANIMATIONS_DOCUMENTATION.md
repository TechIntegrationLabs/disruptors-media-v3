# GSAP Animations Documentation

## Overview

This document provides comprehensive documentation for all GSAP (GreenSock Animation Platform) animations implemented in the Disruptors Media v3 React application. These animations were recreated from the original site to maintain the professional, high-end visual experience.

## Table of Contents

1. [Animation Components](#animation-components)
2. [Custom Hooks](#custom-hooks)
3. [Implementation Examples](#implementation-examples)
4. [Performance Considerations](#performance-considerations)
5. [Troubleshooting](#troubleshooting)
6. [Future Enhancements](#future-enhancements)

## Animation Components

### 1. ScrambleText Component

**Location**: `src/components/animations/ScrambleText.tsx`

**Purpose**: Creates a text scrambling effect where random characters transition to reveal the final text.

**Props**:
```typescript
interface ScrambleTextProps {
  text: string;              // The final text to display
  className?: string;        // Additional CSS classes
  duration?: number;         // Animation duration (default: 2)
  delay?: number;           // Delay before starting (default: 0)
  trigger?: string;         // CSS selector for ScrollTrigger
  scrambleChars?: string;   // Characters to use for scrambling
}
```

**Usage**:
```tsx
<ScrambleText 
  text="AI-POWERED" 
  duration={2}
  delay={1}
  className="text-gold"
/>
```

**Key Features**:
- Uses `setInterval` for character randomization
- Progressively reveals characters from left to right
- Preserves spaces in original text
- ScrollTrigger integration for scroll-based activation
- Automatic cleanup to prevent memory leaks

### 2. LoadingCounter Component

**Location**: `src/components/animations/LoadingCounter.tsx`

**Purpose**: Full-screen loading animation with counter and technical elements.

**Props**:
```typescript
interface LoadingCounterProps {
  onComplete?: () => void;   // Callback when loading completes
  duration?: number;         // Total loading duration (default: 3.5)
}
```

**Key Features**:
- Animated counter from 0 to 100%
- Technical coordinate simulation with blinking effect
- Loader image with scale and pulse animations
- localStorage integration to show once per session
- Fade-out transition with callback execution

### 3. MagneticCursor Component

**Location**: `src/components/animations/MagneticCursor.tsx`

**Purpose**: Creates magnetic attraction effect for interactive elements.

**Props**:
```typescript
interface MagneticCursorProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;         // Magnetic strength (default: 0.3)
  ease?: string;            // GSAP easing function
}
```

**Usage**:
```tsx
<MagneticCursor strength={0.2}>
  <button>Interactive Button</button>
</MagneticCursor>
```

**Key Features**:
- Calculates distance from element center
- Smooth GSAP transitions on mousemove
- Returns to origin on mouseleave
- Configurable magnetic strength

### 4. ParticleField Component

**Location**: `src/components/animations/ParticleField.tsx`

**Purpose**: Animated particle background with parallax scroll effects.

**Props**:
```typescript
interface ParticleFieldProps {
  particleCount?: number;    // Number of particles (default: 50)
  className?: string;
  color?: string;           // Particle color (default: '#FFD700')
}
```

**Key Features**:
- Dynamic particle creation and positioning
- Multiple animation layers (floating, scaling, pulsing)
- ScrollTrigger-based parallax movement
- Automatic cleanup on component unmount
- Randomized particle sizes and opacity

### 5. TiltCard Component

**Location**: `src/components/animations/TiltCard.tsx`

**Purpose**: 3D tilt effect on hover for cards and interactive elements.

**Props**:
```typescript
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;        // Tilt intensity (default: 15)
  perspective?: number;      // 3D perspective (default: 1000)
}
```

**Key Features**:
- 3D rotation based on mouse position
- Smooth GSAP transitions
- Configurable tilt intensity and perspective
- Returns to flat state on mouse leave

## Custom Hooks

### useScrollAnimations Hook

**Location**: `src/hooks/useScrollAnimations.ts`

**Functions**:

#### 1. useScrollFadeIn
```typescript
export const useScrollFadeIn = (options: ScrollAnimationOptions = {}) => {
  // Returns: RefObject<HTMLDivElement>
}
```
- Fades elements in from bottom on scroll
- Configurable start/end triggers
- Automatic ScrollTrigger cleanup

#### 2. useScrollStagger
```typescript
export const useScrollStagger = (options: ScrollAnimationOptions = {}) => {
  // Returns: RefObject<HTMLDivElement>
}
```
- Animates child elements in sequence
- Configurable stagger timing
- Ideal for lists and grids

#### 3. useHeroAnimations
```typescript
export const useHeroAnimations = () => {
  // Returns: RefObject<HTMLElement>
}
```
- Complex hero section entrance sequence
- Logo scale animation with spring effect
- Sequential text reveals with timing offsets
- Button fade-in with delay

#### 4. useParallaxEffect
```typescript
export const useParallaxEffect = (speed: number = 0.5) => {
  // Returns: RefObject<HTMLDivElement>
}
```
- Scroll-based parallax movement
- Configurable movement speed
- Smooth scrub animation

## Implementation Examples

### Hero Section Integration

```tsx
// src/components/sections/Hero.tsx
import { useHeroAnimations } from '../../hooks/useScrollAnimations';
import ScrambleText from '../animations/ScrambleText';
import MagneticCursor from '../animations/MagneticCursor';
import ParticleField from '../animations/ParticleField';

const Hero: React.FC = () => {
  const heroRef = useHeroAnimations();

  return (
    <section ref={heroRef} className="relative min-h-screen...">
      {/* Video Background */}
      <video />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Particle Field */}
      <ParticleField particleCount={30} color="#FFD700" />
      
      {/* Content */}
      <div className="relative z-10...">
        <h1 className="hero-title...">
          <ScrambleText 
            text="AI-POWERED" 
            duration={2}
            delay={1}
          />
          <ScrambleText 
            text="MARKETING SOLUTIONS" 
            duration={2.5}
            delay={2}
          />
        </h1>
        
        <div className="hero-buttons...">
          <MagneticCursor strength={0.2}>
            <Link to="/services/ai-marketing">
              Explore AI Marketing
            </Link>
          </MagneticCursor>
        </div>
      </div>
    </section>
  );
};
```

### Scroll-Triggered Section

```tsx
// src/components/sections/AboutSection.tsx
import { useScrollFadeIn } from '../../hooks/useScrollAnimations';
import ScrambleText from '../animations/ScrambleText';

const AboutSection: React.FC<AboutSectionProps> = ({ title, content }) => {
  const sectionRef = useScrollFadeIn();

  return (
    <section ref={sectionRef} className="w-full...">
      <h2>
        <ScrambleText 
          text={title}
          trigger=".section-h2"
          duration={1.5}
        />
      </h2>
      <div>{content}</div>
    </section>
  );
};
```

### Staggered Animation Grid

```tsx
// src/components/sections/ServicesSlider.tsx
import { useScrollStagger } from '../../hooks/useScrollAnimations';

const ServicesSlider: React.FC<ServicesSliderProps> = ({ services }) => {
  const containerRef = useScrollStagger({ stagger: 0.2 });

  return (
    <section>
      <div ref={containerRef} className="container-custom">
        {/* Child elements will animate in sequence */}
        <h2>Services Title</h2>
        <div>Service Grid</div>
      </div>
    </section>
  );
};
```

## Performance Considerations

### 1. Animation Cleanup
All components properly clean up GSAP animations:

```typescript
useEffect(() => {
  // Animation setup...
  
  return () => {
    // Cleanup
    gsap.killTweensOf(element);
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
}, [dependencies]);
```

### 2. ScrollTrigger Optimization
- Uses `toggleActions: "play none none reverse"` for efficient scroll handling
- Batches ScrollTrigger kills in cleanup functions
- Configurable trigger points to prevent unnecessary calculations

### 3. Particle System Optimization
- Limits particle count (default: 30-50)
- Uses CSS transforms for GPU acceleration
- Randomized animation delays to prevent synchronization

### 4. Memory Management
- Components remove DOM elements on unmount
- localStorage used for loading screen persistence
- Proper event listener cleanup

## GSAP Dependencies

### Required Packages
```json
{
  "gsap": "^3.13.0"
}
```

### Plugin Registration
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

## Animation Timing Guidelines

### Standard Durations
- **Text Scramble**: 1.5-2.5 seconds
- **Fade In**: 0.6-1 second
- **Hero Entrance**: 0.8-1.2 seconds
- **Stagger Delay**: 0.1-0.2 seconds
- **Magnetic Response**: 0.3-1 second

### Easing Functions
- **Text Reveals**: `"power2.out"`
- **Magnetic Movement**: `"power2.out"`
- **Hero Animations**: `"back.out(1.7)"` for logo
- **Particle Movement**: `"sine.inOut"`
- **3D Tilt**: `"power2.out"`

## Troubleshooting

### Common Issues

#### 1. TypeScript Errors
**Issue**: `RefObject<HTMLElement>` not assignable to `RefObject<HTMLDivElement>`
**Solution**: Use specific HTML element types in hook definitions:
```typescript
const elementRef = useRef<HTMLDivElement>(null);
```

#### 2. ScrollTrigger Not Working
**Issue**: Animations not triggering on scroll
**Solution**: Ensure ScrollTrigger plugin is registered:
```typescript
gsap.registerPlugin(ScrollTrigger);
```

#### 3. Animation Performance Issues
**Issue**: Laggy animations on lower-end devices
**Solution**: 
- Reduce particle count
- Use `will-change: transform` CSS property
- Implement `requestAnimationFrame` for complex animations

#### 4. Memory Leaks
**Issue**: Animations continue after component unmount
**Solution**: Always implement cleanup functions:
```typescript
return () => {
  gsap.killTweensOf(target);
  ScrollTrigger.getAll().forEach(st => st.kill());
};
```

### Debug Mode
Enable console logging for animation debugging:
```typescript
// Add to components during development
console.log('Animation component mounted');
console.log('GSAP animation started:', animationId);
```

## Future Enhancements

### Planned Improvements
1. **Animation Timeline Management**: Create reusable timeline templates
2. **Responsive Animations**: Device-specific animation intensity
3. **Accessibility Options**: Respect `prefers-reduced-motion`
4. **Performance Monitoring**: Animation FPS tracking
5. **A/B Testing**: Multiple animation variants

### Additional Components
- **MorphingShape**: SVG path morphing animations
- **TypewriterText**: Character-by-character text reveal
- **InfiniteScroll**: Seamless looping content
- **GlitchEffect**: Digital distortion animations
- **FluidCursor**: Liquid cursor trailing effect

### Integration Opportunities
- **E-commerce**: Product showcase animations
- **Portfolio**: Work reveal animations
- **Contact Forms**: Interactive form validation
- **Navigation**: Menu transition effects
- **Loading States**: Skeleton screen animations

## Testing Checklist

### Animation Functionality
- [ ] Text scrambling reveals correctly
- [ ] Scroll triggers activate at proper breakpoints
- [ ] Magnetic cursor responds to hover
- [ ] Particle field renders without performance issues
- [ ] 3D tilt effects work smoothly
- [ ] Loading counter completes and hides

### Performance Testing
- [ ] No memory leaks after component unmount
- [ ] Smooth 60fps animation on desktop
- [ ] Acceptable performance on mobile devices
- [ ] No console errors during animation lifecycle
- [ ] ScrollTrigger cleanup prevents conflicts

### Cross-Browser Compatibility
- [ ] Chrome: All animations working
- [ ] Firefox: Proper fallbacks
- [ ] Safari: iOS compatibility
- [ ] Edge: Performance optimized

## Conclusion

The GSAP animation system provides a professional, engaging user experience that matches the quality of the original Disruptors Media site. All animations are optimized for performance, accessibility, and maintainability while offering the flexibility to expand and customize as needed.

For questions or issues with animations, refer to the troubleshooting section or consult the GSAP documentation at [greensock.com](https://greensock.com/docs/).