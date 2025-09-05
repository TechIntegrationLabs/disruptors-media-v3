# Animations and Interactions Documentation

## Animation Library
- **GSAP Business License**: Professional animation library
- **Plugins Used**:
  - ScrollTrigger - Scroll-based animations
  - ScrambleTextPlugin - Text scramble effects
  - Timeline - Sequenced animations

## Core Animation Patterns

### 1. Scramble Text Animation
**Purpose**: Creates a "hacker-style" text reveal effect
```javascript
// Usage: Elements with data-text attribute
initScrambleAnimations(".info-scramb", 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', "data-text");
```
- Triggers on intersection (50% visible)
- Duration: 2 seconds
- Character set: Full alphabet (upper and lowercase)

### 2. Loading Counter Animation
**Location**: App.js
- Counts from 0-100%
- Duration: 3.5 seconds
- Shows on first visit (cookie-based)
- Fade out on completion

### 3. Image Reveal Animation
**Location**: Homepage mobile section
```javascript
// Mask reveal effect
gsap.timeline({
    scrollTrigger: {
        trigger: ".image-unmask",
        start: "top center",
        end: "bottom top",
        scrub: 1
    }
})
```
- Hand images (robot/human) slide in from sides
- Phone image scales and positions
- Video background plays

### 4. Rotating Elements
**Pattern**: Continuous rotation
```javascript
gsap.to(rotatingElement, {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "linear"
})
```
- Used for decorative elements
- Infinite loop
- Linear easing for smooth rotation

### 5. Fade In Animations
**Pattern**: Elements fade in on scroll
```css
.fade-in-up {
    animation: fadeIn 0.4s ease-in forwards;
    animation-delay: 1s;
}
```
- Opacity: 0 to 1
- Slight upward movement
- Staggered delays for multiple elements

### 6. Container Children Stagger
**Pattern**: Sequential reveal of child elements
```javascript
gsap.to(container.children, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1
})
```
- Children appear one by one
- 0.1s delay between each
- Upward slide effect

### 7. Horizontal Scroll Animation
**Pattern**: Infinite horizontal scroll
```css
animation: slide-to-left 50s linear infinite;
```
- Used for client logos/testimonials
- Pauses on hover
- Reverse direction variant available

## ScrollTrigger Configurations

### Standard ScrollTrigger Setup
```javascript
scrollTrigger: {
    trigger: element,
    start: "top 80%",      // When top hits 80% of viewport
    end: "bottom 20%",     // When bottom hits 20% of viewport
    scrub: 1,              // Smooth scrubbing
    pin: false,            // Don't pin element
    markers: false         // No debug markers
}
```

### Common Start/End Points
- Hero sections: `start: "top top"`
- Content sections: `start: "top 80%"`
- Footer elements: `start: "top bottom"`

## Interaction Patterns

### 1. Hover States
- Scale transforms on buttons
- Color transitions
- Opacity changes
- Pause animations on hover

### 2. Click Interactions
- Accordion expand/collapse
- Video play/pause controls
- Navigation menu toggle
- Gallery image selection

### 3. Scroll-Based Triggers
- Parallax effects
- Element reveals
- Progress indicators
- Navigation state changes

## Performance Optimizations

### Intersection Observer
- Used for triggering animations only when visible
- Reduces unnecessary calculations
- Better performance than constant scroll listeners

### Animation Best Practices
1. Use `will-change` CSS property sparingly
2. Animate transform and opacity (GPU-accelerated)
3. Avoid animating layout properties
4. Use timeline pausing when off-screen

## Mobile Considerations
- Reduced animation complexity on mobile
- Touch-friendly interaction areas
- Fallback to simpler effects
- Video backgrounds have poster images

## Accessibility Features
- Respect `prefers-reduced-motion`
- Provide pause controls for auto-playing content
- Ensure animations don't interfere with content
- Maintain readable text during transitions