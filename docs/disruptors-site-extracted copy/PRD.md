# Disruptors Media Website - Product Requirements Document (PRD)

## Executive Summary
This PRD outlines the complete requirements for rebuilding the Disruptors Media website. The site is a modern, animation-rich digital marketing agency website that emphasizes the intersection of technology and human creativity.

## Project Overview

### Vision
Create a cutting-edge digital marketing agency website that demonstrates technical excellence while maintaining human connection and approachability.

### Core Objectives
1. Showcase digital marketing expertise through innovative design
2. Generate qualified leads through strategic CTAs
3. Demonstrate technical capabilities via interactive elements
4. Build trust through case studies and client testimonials
5. Establish thought leadership via content (podcast, blog)

## Technical Requirements

### Platform Options
The site can be built using any of these recommended frameworks:
- **React 18+** with Create React App or Vite
- **Next.js 14+** for SSR/SSG benefits
- **Vue 3** with Nuxt for alternative
- **Vanilla JS** with modern build tools

### Core Dependencies
- **Animation**: GSAP Business License (required for advanced features)
- **Smooth Scrolling**: Lenis or similar
- **CSS Framework**: Bootstrap or Tailwind CSS
- **Video Player**: Native HTML5 with custom controls
- **Forms**: Formik/React Hook Form or native
- **API Client**: Axios or Fetch API

### Performance Requirements
- Lighthouse Score: 90+ across all metrics
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

## Site Architecture

### Primary Pages
1. **Homepage**
   - Hero with video background
   - Services overview
   - Client logos carousel
   - Featured work
   - Call-to-action sections

2. **About**
   - Company story
   - Mission/vision
   - Team section
   - Culture showcase
   - Process overview

3. **Services**
   - Service categories
   - Detailed descriptions
   - Process visualization
   - Technology stack
   - Results/metrics

4. **Work/Portfolio**
   - Grid layout
   - Filter by industry/service
   - Hover previews
   - Case study links

5. **Case Studies** (Dynamic)
   - Challenge overview
   - Solution approach
   - Implementation details
   - Results with metrics
   - Client testimonials
   - Visual gallery

6. **Gallery**
   - Media showcase
   - Video reels
   - Behind-the-scenes
   - Company culture

7. **Podcast**
   - Episode listings
   - Audio player
   - Show notes
   - Guest information
   - Subscribe links

8. **Contact**
   - Contact form
   - Office location map
   - Contact details
   - Business hours
   - Social links

### Secondary Pages
- FAQ (Accordion layout)
- Privacy Policy
- Terms & Conditions
- 404 Error Page

## Design System

### Colors
```css
:root {
  --primary-bg: #F1EDE9;      /* Light beige */
  --primary-text: #2B2B2B;    /* Dark charcoal */
  --secondary-bg: #CAC1B8;    /* Medium beige */
  --accent-bg: #e0e0de;       /* Light gray-beige */
  --dark-bg: #000000;         /* Pure black */
  --dark-secondary: #1F1F1F;  /* Dark gray */
  --white: #FFFFFF;           /* White */
}
```

### Typography
```css
/* Primary Font */
font-family: 'OT Neue Montreal', sans-serif;
/* Weights: SemiBoldSemiSqueezed, SemiBoldSqueezed */

/* Secondary Font */
font-family: 'PP Supply Mono', monospace;
/* Weight: Regular */
```

### Spacing Scale
- Base unit: 8px
- Scale: 8, 16, 24, 32, 48, 64, 96, 128

## Key Features & Components

### 1. Loading Experience
- Percentage counter (0-100%)
- Scramble text effects
- Technical coordinates display
- Cookie-based (shows once per session)
- Duration: 3.5 seconds

### 2. Navigation Header
- Sticky on scroll
- Transparent to solid transition
- Mobile hamburger menu
- Smooth scroll to sections
- Active state indicators

### 3. Hero Sections
- Full viewport height
- Video backgrounds (YouTube embed or local)
- Parallax effects
- Mobile-optimized with poster images
- Clear CTAs

### 4. Animation System
- Scroll-triggered animations
- Text scramble reveals
- Staggered element appearances
- Rotating decorative elements
- Image mask reveals
- Smooth page transitions

### 5. Content Sections
- Dynamic API-driven content
- Loading states
- Error handling
- SEO optimization
- Structured data

### 6. Interactive Elements
- Hover effects on cards
- Video play/pause controls
- Accordion expansions
- Form validations
- Slider/carousel components

## Content Management

### Dynamic Content Areas
All content should be manageable via CMS/API:
- Page titles and meta descriptions
- Hero content and CTAs
- Service descriptions
- Portfolio items
- Team members
- Testimonials
- FAQ items
- Contact information

### Static Content
- Legal pages (Privacy, Terms)
- Structural elements
- Navigation labels

## SEO Requirements

### Technical SEO
- Clean URL structure
- XML sitemap
- Robots.txt
- Canonical URLs
- Schema markup
- Open Graph tags

### On-Page SEO
- Unique meta titles/descriptions
- Proper heading hierarchy
- Alt text for images
- Internal linking
- Fast load times

## Analytics & Tracking

### Required Integrations
- Google Analytics 4
- Google Tag Manager
- Facebook Pixel (optional)
- Hotjar/FullStory (optional)

### Key Metrics to Track
- Page views and unique visitors
- Bounce rate and time on site
- Form submissions
- Video engagement
- Scroll depth
- CTA clicks

## Responsive Design

### Breakpoints
- Mobile: <576px
- Tablet: 576px - 991px
- Desktop: 992px+
- Large Desktop: 1200px+

### Mobile Considerations
- Touch-friendly tap targets (min 44px)
- Simplified navigation
- Optimized images
- Reduced animations
- Static images instead of videos

## Accessibility

### WCAG 2.1 AA Compliance
- Proper color contrast ratios
- Keyboard navigation
- Screen reader support
- Alt text for images
- ARIA labels
- Focus indicators
- Skip navigation links

## Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 6+)

## Development Phases

### Phase 1: Foundation (Week 1-2)
- Project setup and configuration
- Design system implementation
- Component library creation
- Basic page structures

### Phase 2: Core Pages (Week 3-4)
- Homepage development
- About and Services pages
- Navigation and footer
- Basic animations

### Phase 3: Advanced Features (Week 5-6)
- Portfolio and case studies
- Gallery implementation
- Podcast integration
- Contact forms

### Phase 4: Polish & Optimization (Week 7-8)
- Animation refinement
- Performance optimization
- Cross-browser testing
- Accessibility audit
- SEO implementation

### Phase 5: Launch Preparation (Week 9)
- Content migration
- Final testing
- Analytics setup
- Deployment
- DNS configuration

## Success Metrics

### Launch Metrics
- All pages loading correctly
- Forms submitting successfully
- Videos playing properly
- Animations performing smoothly
- Mobile experience optimized

### Post-Launch KPIs (30 days)
- 20% increase in time on site
- 15% decrease in bounce rate
- 25% increase in contact form submissions
- 90+ Lighthouse scores maintained
- Zero critical bugs reported

## Maintenance & Updates

### Regular Maintenance
- Security updates
- Performance monitoring
- Content updates
- Bug fixes
- Analytics review

### Future Enhancements
- Blog integration
- Client portal
- Live chat
- Advanced animations
- A/B testing framework

## Asset Inventory

### Images
- Logo variations
- Hero backgrounds
- Service icons
- Portfolio thumbnails
- Team photos
- Client logos

### Videos
- Main banner video
- Gallery videos
- Mobile background video
- About section video

### Fonts
- OT Neue Montreal (all weights)
- PP Supply Mono Regular

### Icons
- Arrow CTAs
- Social media
- UI controls
- Service icons

## Risk Mitigation

### Technical Risks
- GSAP license compliance
- Video loading performance
- Animation performance on mobile
- Browser compatibility issues

### Mitigation Strategies
- Progressive enhancement
- Fallback options
- Performance budgets
- Extensive testing
- Graceful degradation

---

This PRD serves as the complete blueprint for rebuilding the Disruptors Media website. All design decisions, technical implementations, and content strategies should align with this document.