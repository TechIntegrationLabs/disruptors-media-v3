# Interactive Elements & Animations - Disruptors Media

## Animation Overview

The Disruptors Media site features subtle, purposeful animations that enhance user experience without overwhelming the content. All animations maintain the brand's minimalist aesthetic while providing smooth, professional interactions.

## Core Animation Principles

### 1. Performance First
- **60fps Animations:** All animations run smoothly at 60 frames per second
- **Hardware Acceleration:** Use CSS transforms for optimal performance
- **Reduced Motion:** Respect user preferences for reduced motion
- **Progressive Enhancement:** Animations enhance but don't break functionality

### 2. Brand-Consistent Timing
- **Fast Interactions:** 200-300ms for hover states and small UI changes
- **Medium Transitions:** 400-600ms for section reveals and major UI changes
- **Slow Animations:** 800-1200ms for large content transitions

### 3. Easing Functions
- **Default Easing:** `ease-out` for most transitions
- **Smooth Entry:** `ease-in-out` for accordion expansions
- **Bounce Prevention:** Avoid overly bouncy or elastic effects

## Specific Interactive Elements

### 1. Navigation Interactions

#### Header Navigation
```css
.navigation li a {
    transition: color 0.3s ease-out;
    position: relative;
}

.navigation li a:hover {
    /* Subtle color shift or underline animation */
}

.navigation li a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #2B2B2B;
    transition: width 0.3s ease-out;
}

.navigation li a:hover::after {
    width: 100%;
}
```

#### Mobile Menu (If Applicable)
```css
.mobile-menu {
    transform: translateX(-100%);
    transition: transform 0.4s ease-in-out;
}

.mobile-menu.open {
    transform: translateX(0);
}
```

### 2. Accordion Animations

#### FAQ and Services Accordions
```css
.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
}

.accordion-content.open {
    max-height: 500px; /* Adjust based on content */
}

.accordion-title .toggle-sign {
    transition: transform 0.3s ease-in-out;
}

.accordion-title .toggle-sign.minus {
    transform: rotate(180deg);
}
```

#### React Implementation
```jsx
const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="accordion-section">
      <div className="accordion-title" onClick={onToggle}>
        {question}
        <span 
          className={`toggle-sign ${isOpen ? 'minus' : 'plus'}`}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease-in-out'
          }}
        />
      </div>
      <div 
        className={`accordion-content ${isOpen ? 'open' : ''}`}
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          transition: 'max-height 0.5s ease-in-out',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '20px 0' }}>
          {answer}
        </div>
      </div>
    </div>
  );
};
```

### 3. Button Interactions

#### Primary Buttons
```css
.primary-btn {
    background: #2B2B2B;
    color: #F1EDE9;
    transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
    position: relative;
    overflow: hidden;
}

.primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(43, 43, 43, 0.3);
}

.primary-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(43, 43, 43, 0.2);
}

/* Ripple effect on click */
.primary-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(241, 237, 233, 0.3);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.primary-btn.clicked::before {
    width: 300px;
    height: 300px;
}
```

#### CTA Large Buttons
```css
.book-call-cta a {
    transition: background-color 0.3s ease-out;
    position: relative;
}

.book-call-cta a::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(241, 237, 233, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease-out;
}

.book-call-cta a:hover::after {
    transform: translateX(100%);
}
```

### 4. Image and Media Interactions

#### Portfolio Grid Items
```css
.work-lst .col-sm-6 {
    transition: transform 0.3s ease-out;
    position: relative;
}

.work-lst .col-sm-6:hover {
    transform: translateY(-10px);
}

.work-lst .col-sm-6 img {
    transition: transform 0.4s ease-out, filter 0.3s ease-out;
}

.work-lst .col-sm-6:hover img {
    transform: scale(1.05);
    filter: brightness(1.1);
}

/* Overlay effect */
.work-lst .col-sm-6::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(43, 43, 43, 0);
    transition: background 0.3s ease-out;
    pointer-events: none;
}

.work-lst .col-sm-6:hover::after {
    background: rgba(43, 43, 43, 0.1);
}
```

#### Video Player Controls
```css
.video-controls {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.video-container:hover .video-controls {
    opacity: 1;
    transform: translateY(0);
}

.play-btn {
    transform: scale(1);
    transition: transform 0.2s ease-out;
}

.play-btn:hover {
    transform: scale(1.1);
}
```

### 5. Content Reveal Animations

#### Scroll-Triggered Animations
```css
.fade-in-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-up.in-view {
    opacity: 1;
    transform: translateY(0);
}

.fade-in-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-left.in-view {
    opacity: 1;
    transform: translateX(0);
}

.stagger-children > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.stagger-children.in-view > *:nth-child(1) { transition-delay: 0.1s; }
.stagger-children.in-view > *:nth-child(2) { transition-delay: 0.2s; }
.stagger-children.in-view > *:nth-child(3) { transition-delay: 0.3s; }
.stagger-children.in-view > *:nth-child(4) { transition-delay: 0.4s; }

.stagger-children.in-view > * {
    opacity: 1;
    transform: translateY(0);
}
```

#### React Intersection Observer Implementation
```jsx
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children, animation = 'fade-in-up' }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div 
      ref={ref} 
      className={`${animation} ${inView ? 'in-view' : ''}`}
    >
      {children}
    </div>
  );
};
```

### 6. Form Interactions

#### Input Focus States
```css
.form-input {
    border: 1px solid #2B2B2B;
    transition: border-color 0.3s ease-out, box-shadow 0.3s ease-out;
}

.form-input:focus {
    outline: none;
    border-color: #2B2B2B;
    box-shadow: 0 0 0 2px rgba(43, 43, 43, 0.1);
}

/* Floating label effect */
.form-group {
    position: relative;
}

.form-label {
    position: absolute;
    top: 15px;
    left: 15px;
    transition: all 0.3s ease-out;
    pointer-events: none;
    color: #999;
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
    top: -10px;
    left: 10px;
    font-size: 12px;
    color: #2B2B2B;
    background: white;
    padding: 0 5px;
}
```

#### Form Submission States
```css
.submit-btn {
    transition: all 0.3s ease-out;
    position: relative;
}

.submit-btn.loading {
    color: transparent;
}

.submit-btn.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    border: 2px solid #F1EDE9;
    border-top: 2px solid transparent;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
}
```

### 7. Page Transition Animations

#### Route Transitions (React Router)
```css
.page-transition-enter {
    opacity: 0;
    transform: translateY(20px);
}

.page-transition-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.page-transition-exit {
    opacity: 1;
    transform: translateY(0);
}

.page-transition-exit-active {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
```

### 8. Loading Animations

#### Page Loading
```css
.page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #F1EDE9;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    transition: opacity 0.5s ease-out;
}

.page-loader.hidden {
    opacity: 0;
    pointer-events: none;
}

.loader-logo {
    opacity: 0.6;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
}
```

#### Content Loading Skeleton
```css
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
```

## Performance Optimization

### 1. Animation Performance Tips
```css
/* Use transform and opacity for smooth animations */
.optimized-animation {
    will-change: transform, opacity;
    transform: translateZ(0); /* Force hardware acceleration */
}

/* Remove will-change after animation */
.animation-complete {
    will-change: auto;
}
```

### 2. Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### 3. React Animation Library Integration
```jsx
// Using Framer Motion for complex animations
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const AnimatedComponent = () => (
  <motion.div
    variants={staggerContainer}
    initial="initial"
    animate="animate"
  >
    <motion.h1 variants={fadeInUp}>Heading</motion.h1>
    <motion.p variants={fadeInUp}>Paragraph</motion.p>
  </motion.div>
);
```

## Accessibility Considerations

### 1. Focus Management
```css
.focus-visible {
    outline: 2px solid #2B2B2B;
    outline-offset: 2px;
}

/* Remove outline for mouse users */
.js-focus-visible :focus:not(.focus-visible) {
    outline: none;
}
```

### 2. Animation Announcements
```jsx
// Announce important state changes to screen readers
const [isLoading, setIsLoading] = useState(false);

<div aria-live="polite" className="sr-only">
  {isLoading && "Loading content..."}
</div>
```

## Testing Animation Performance

### 1. Performance Monitoring
```javascript
// Monitor animation frame rate
let frameCount = 0;
let startTime = performance.now();

function animate() {
  frameCount++;
  
  if (frameCount % 60 === 0) {
    const currentTime = performance.now();
    const fps = 60000 / (currentTime - startTime);
    console.log(`Current FPS: ${fps.toFixed(2)}`);
    startTime = currentTime;
  }
  
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

### 2. Animation Quality Checklist
- [ ] All animations run at 60fps
- [ ] No layout thrashing (use transform/opacity)
- [ ] Reduced motion preferences respected
- [ ] Animations enhance UX, don't distract
- [ ] Loading states provide clear feedback
- [ ] Focus states are clearly visible
- [ ] Touch targets are appropriately sized
- [ ] Animations work consistently across browsers