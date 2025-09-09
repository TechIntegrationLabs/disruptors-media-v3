# CLAUDE.md - Source Code Structure

This file provides guidance for working with the source code structure of the Disruptors Media v3 React application.

## Overview

The `/src/` directory contains all React components, pages, and data management logic. This is a modern React 19 application with TypeScript, organized using a clear component-based architecture with separation of concerns.

## Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── animations/      # GSAP & Framer Motion components
│   ├── common/          # Shared utilities & components
│   ├── layout/          # Site structure (Header, Footer)
│   └── sections/        # Page sections (Hero, Testimonials)
├── pages/               # Route-level components
│   └── services/        # Service-specific pages
├── data/                # Data management & integrations
│   ├── clients/         # Google Sheets integration
│   └── legacy-content/  # Content migration files
├── App.tsx              # Main router configuration
└── index.tsx           # Application entry point
```

## Components Architecture

### Animations (`components/animations/`)

**Purpose**: Advanced animation components using GSAP and Framer Motion

**Key Components**:
- `LoadingCounter.tsx` - Animated number counting with GSAP
- `MagneticCursor.tsx` - Mouse-following magnetic cursor effect
- `ParticleField.tsx` - Canvas-based particle animation system
- `ScrambleText.tsx` - Text scrambling animation effect
- `TiltCard.tsx` - 3D tilt effect for interactive cards

**Usage Pattern**:
```tsx
import { ScrambleText } from '../components/animations/ScrambleText';

<ScrambleText 
  text="Disruptors Media" 
  className="text-4xl font-bold text-gold" 
/>
```

### Common Components (`components/common/`)

**Purpose**: Shared utility components used across the application

**Key Components**:
- `Analytics.tsx` - Google Analytics and tracking implementation
- `Chat.tsx` - Customer chat widget integration
- `ErrorBoundary.tsx` - React error boundary for graceful error handling
- `LoadingSpinner.tsx` - Consistent loading states
- `SEO.tsx` - SEO meta tags and structured data

**Usage Pattern**:
```tsx
import { SEO } from '../components/common/SEO';

<SEO 
  title="AI Marketing Services"
  description="Professional AI-powered marketing solutions"
  type="service"
/>
```

### Layout Components (`components/layout/`)

**Purpose**: Site structure and navigation components

**Key Components**:
- `Header.tsx` - Main navigation with dropdown menus and mobile responsiveness
- `Footer.tsx` - Site footer with contact information and social links
- `Layout.tsx` - Page wrapper providing consistent Header/Footer

**Navigation Structure**:
```typescript
// Dropdown navigation with TypeScript interfaces
interface NavigationItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string; }[];
}
```

### Sections (`components/sections/`)

**Purpose**: Reusable page sections for building consistent layouts

**20+ Section Components** including:
- `Hero.tsx`, `VideoHero.tsx` - Landing page hero sections
- `ServicesSlider.tsx` - Interactive services showcase
- `StudioShowcase.tsx` - Photography studio gallery
- `Testimonials.tsx` - Client testimonial carousel
- `ProcessSteps.tsx` - Step-by-step process visualization
- `ContactSection.tsx` - Contact forms and CTA sections

**Usage Pattern**:
```tsx
import { Hero } from '../components/sections/Hero';

<Hero 
  title="AI-Powered Marketing Solutions"
  subtitle="Transform your business with cutting-edge technology"
  backgroundImage="studio-hero-bg.jpg"
/>
```

## Pages Structure (`pages/`)

### Main Pages
- `Home.tsx` - Landing page with hero, services overview, testimonials
- `About.tsx` - Company information, team, studio showcase
- `Services.tsx` - Services overview with interactive elements
- `Portfolio.tsx` - Project showcase and case studies
- `Work.tsx` - Work samples and client projects
- `Contact.tsx` - Contact forms and business information
- `Blog.tsx` - Blog listing page
- `BlogPost.tsx` - Individual blog post template

### Interactive Tools
- `AIAssessment.tsx` - AI readiness assessment questionnaire
- `ROICalculator.tsx` - ROI calculation tool for marketing investments

### Service Pages (`pages/services/`)
- `AIMarketing.tsx` - AI-powered marketing services
- `StudioServices.tsx` - Photography and video production
- `ContentProduction.tsx` - Content creation and management
- `DigitalTransformation.tsx` - Business transformation consulting

**Page Structure Pattern**:
```tsx
export const ServicePage = () => {
  return (
    <>
      <SEO title="Service Name" description="Service description" />
      <Hero />
      <ServiceDetails />
      <ProcessSteps />
      <Testimonials />
      <ContactSection />
    </>
  );
};
```

## Data Management (`data/`)

### Static Data Files
- `blog.ts` - Blog posts and article content
- `portfolio.ts` - Portfolio items and case studies
- `services.ts` - Service offerings and descriptions
- `clients.ts` - Client information and testimonials
- `team.ts` - Team member profiles

### Client Data Integration (`data/clients/`)

**Google Sheets Integration System**:
- `clients-sync.js` - Automated sync from Google Sheets
- `clients-api.ts` - TypeScript API layer for client data
- `clients-types.ts` - TypeScript interfaces for client data

**Sync Commands**:
```bash
npm run clients:sync       # Sync data from Google Sheets
npm run clients:validate   # Validate data structure
npm run clients:backup     # Backup existing data
```

### Legacy Content Migration (`data/legacy-content/`)
- Content migration files from previous site versions
- Asset mapping and content transformation utilities

## Development Patterns

### Component Development
```tsx
interface ComponentProps {
  title: string;
  description?: string;
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({ 
  title, 
  description, 
  className = "" 
}) => {
  return (
    <div className={`base-styles ${className}`}>
      <h2 className="text-2xl font-bold text-gold">{title}</h2>
      {description && <p className="text-cream">{description}</p>}
    </div>
  );
};
```

### Animation Integration
```tsx
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// Framer Motion for component animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

// GSAP for complex timeline animations
useEffect(() => {
  gsap.timeline()
    .from('.element', { opacity: 0, y: 50 })
    .to('.element', { scale: 1.1, duration: 0.3 });
}, []);
```

### Asset Management
```tsx
// Cloudinary integration pattern
const optimizedImage = `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_600/${imagePath}`;

// Stock image fallback pattern
const stockImage = `https://images.unsplash.com/photo-123456789?w=800&h=600&fit=crop&crop=center`;
```

## Type Safety

### TypeScript Configuration
- Strict mode enabled for maximum type safety
- Interface-first approach for component props
- Proper typing for external API integrations

### Common Interfaces
```typescript
interface ServiceData {
  id: string;
  title: string;
  description: string;
  features: string[];
  pricing?: PricingTier[];
}

interface ClientData {
  name: string;
  logo: string;
  testimonial?: string;
  caseStudy?: CaseStudyData;
}
```

## Performance Considerations

### Code Splitting
- React.lazy() implementation for page-level components
- Suspense boundaries for loading states

### Asset Optimization
- Cloudinary automatic format/quality optimization
- Responsive image loading
- Video lazy loading

### Animation Performance
- GSAP for complex animations (better performance than CSS)
- Framer Motion for simpler component transitions
- RequestAnimationFrame for custom animations

## Testing Strategy

### Component Testing
```bash
npm test -- src/components/ComponentName.test.tsx
```

### Page Testing
```bash
npm test -- src/pages/PageName.test.tsx
```

### Data Integration Testing
```bash
npm run clients:validate  # Test Google Sheets integration
```

## Common Development Commands

```bash
# Component development
npm start                    # Development server with hot reload
npm run build               # Production build
npm test                    # Run all tests

# Data management
npm run clients:sync        # Sync client data
npm run clients:validate    # Validate data structure

# Type checking
npx tsc --noEmit           # TypeScript validation without build
```

## Integration Points

### External Services
- **Cloudinary**: Asset management and optimization
- **Google Sheets**: Client data synchronization
- **Google Analytics**: User tracking and analytics
- **Google Generative AI**: Content automation

### Build System
- **Create React App**: Build tooling and development server
- **TypeScript**: Type checking and compilation
- **Tailwind CSS**: Utility-first styling system
- **PostCSS**: CSS processing and optimization

This source structure supports rapid development while maintaining code quality, type safety, and performance optimization throughout the application.