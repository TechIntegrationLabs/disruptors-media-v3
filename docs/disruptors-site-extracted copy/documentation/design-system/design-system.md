# Disruptors Media Design System

## Brand Colors

### Primary Colors
- **Primary Background**: `#F1EDE9` - Light beige/cream (main background)
- **Primary Text**: `#2B2B2B` - Dark charcoal gray
- **Secondary Background**: `#CAC1B8` - Medium beige/taupe
- **Accent Background**: `#e0e0de` - Light gray-beige

### Dark Theme Colors
- **Pure Black**: `#000000` - Used for overlays and dark sections
- **Dark Gray**: `#1F1F1F` - Secondary dark background
- **Transparent Black**: `#0000006e` - Semi-transparent overlays

### System Colors
- **White**: `#FFFFFF` - High contrast text on dark
- **Warning Yellow**: `#FF9` - Highlight/warning color
- **Border Gray**: `#CCCCCC` - Subtle borders

## Typography

### Font Families

#### Primary Font - OT Neue Montreal
- **Font Family**: 'OT Neue Montreal'
- **Variants**: 
  - SemiBoldSemiSqueezed
  - SemiBoldSqueezed
- **File Formats**: .eot, .svg, .ttf, .woff, .woff2
- **Usage**: Headlines, main typography

#### Secondary Font - PP Supply Mono
- **Font Family**: 'PP Supply Mono'
- **Weight**: Regular
- **File Formats**: .eot, .svg, .ttf, .woff, .woff2
- **Usage**: Technical text, code-like elements

### Font Implementation
```css
@font-face {
    font-family: 'OT Neue Montreal';
    src: url('./fonts/OTNeueMontreal-SemiBoldSemiSqueezed.eot');
    /* Additional formats for browser compatibility */
}

@font-face {
    font-family: 'PP Supply Mono';
    src: url('./fonts/PPSupplyMono-Regular.eot');
    /* Additional formats for browser compatibility */
}
```

## Spacing System

### Container Widths
- Standard container with Bootstrap grid
- Responsive breakpoints following Bootstrap defaults

### Section Padding
- Standard section padding for consistent vertical rhythm
- Variable padding based on content type

## UI Components

### Buttons
- Primary CTA buttons with arrow icons
- Hover states with background transitions
- Border treatments for special buttons

### Navigation
- Sticky header navigation
- Mobile hamburger menu
- Smooth scroll integration

### Cards/Sections
- Border decorative elements
- Gradient overlays for image sections
- Video background integration

### Interactive Elements
- Accordion components for FAQ
- Slider/carousel components
- Loading animations

## Visual Effects

### Gradients
```css
background: linear-gradient(360deg, #000 0%, rgba(0, 0, 0, 0.00) 100%);
```

### Shadows & Overlays
- Semi-transparent overlays for video sections
- Gradient overlays for text readability

### Border Treatments
- Decorative border elements
- Section separators
- Custom border patterns

## Iconography
- Arrow icons for CTAs (`arrow-cta.svg`)
- Social media icons (Facebook, Instagram, Twitter, YouTube)
- Play/pause/mute controls for video
- Plus/minus icons for accordions

## Animation Principles
- Smooth transitions on hover
- Fade-in effects on scroll
- GSAP-powered animations
- Loading counter animation (0-100%)

## Responsive Design
- Mobile-first approach
- Breakpoints aligned with Bootstrap
- Touch-friendly interactive elements
- Optimized video backgrounds for mobile

## Accessibility
- High contrast text on backgrounds
- Clear focus states
- Readable font sizes
- Alternative text for images

## Brand Voice Elements
- Technical/digital aesthetic
- Human vs Technology theme
- Professional yet approachable
- Innovation-focused messaging