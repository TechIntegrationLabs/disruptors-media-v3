# CLAUDE.md - Disruptors Media v3 React Application

This file provides guidance to Claude Code when working with the Disruptors Media v3 React application.

## Repository Information

- **GitHub**: https://github.com/TechIntegrationLabs/disruptors-media-v3.git
- **Branch**: main
- **Status**: Production ready ✅
- **Last Updated**: December 2024

## Application Overview

Modern React 19 marketing website showcasing AI-powered marketing solutions and professional studio services. Built with TypeScript, Tailwind CSS, and optimized for performance and user experience.

## Quick Start

```bash
npm install          # Install dependencies
npm start           # Development server (localhost:3000)
npm run build       # Production build
npm test            # Run tests
```

## Technology Stack

### Core
- **React 19.1.1** with TypeScript 4.9.5
- **React Router DOM 7.8.2** for routing
- **Framer Motion 12.23.12** for animations
- **Tailwind CSS 3.4.17** with custom design system

### Assets & Integration
- **Cloudinary** (cloud name: dvcvxhzmt) for image/video management
- **Heroicons 2.2.0** for UI icons
- **Custom color palette**: Gold (#FFD700), Dark (#2B2B2B), Cream (#F1EDE9)

## Recent Fixes & Improvements

### ✅ Navigation System (December 2024)
- **Dropdown menus** implemented for Services and Tools sections
- **TypeScript interfaces** for navigation structure
- **Mobile responsive** accordion navigation
- **Active state management** with proper highlighting
- **UX enhancements**: Click outside handlers, smooth animations

### ✅ Image Management Resolution
- **Eliminated 404 errors** from broken placeholder URLs
- **Smart asset strategy**: 
  - Real Cloudinary assets for documented studio photography
  - Professional Unsplash stock images for service illustrations
- **Performance optimized** with responsive loading

### ✅ Technical Improvements  
- **PWA manifest** configured with proper logo
- **Build optimization** - all production builds successful
- **TypeScript strict mode** for better code quality
- **Responsive design** maintained across all components

## Architecture

### Component Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Main navigation with dropdowns
│   │   ├── Footer.tsx          # Site footer
│   │   └── Layout.tsx          # Page wrapper
│   ├── sections/               # Reusable page sections
│   └── common/                 # Shared components
├── pages/
│   ├── services/               # Service-specific pages
│   └── [Other pages].tsx      # Route-level components
├── data/                       # Static data files
└── App.tsx                     # Main application with routing
```

### Navigation Structure
```typescript
interface NavigationItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string; }[];
}

// Current navigation:
- Home (/)
- Services dropdown:
  - AI Marketing (/services/ai-marketing)  
  - Studio Services (/services/studio)
- Portfolio (/portfolio)
- Blog (/blog)
- Tools dropdown:
  - AI Assessment (/assessment)
  - ROI Calculator (/roi-calculator)
- Contact (/contact)
```

### Asset Management
- **Studio photos**: Documented Cloudinary assets from `/photos/studio/`
- **Service illustrations**: Unsplash stock images with proper optimization
- **Optimization**: All images use `f_auto,q_auto` for performance
- **Responsive**: Dynamic sizing with width/height parameters

## Development Guidelines

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route to `src/App.tsx`
3. Update navigation in `src/components/layout/Header.tsx` if needed
4. Follow TypeScript interface patterns

### Image Usage
```typescript
// For documented Cloudinary assets:
const studioImage = "https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_600,h_400,c_fill/photos/studio/overview/wide-angle-001.jpg";

// For stock image fallbacks:
const serviceImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center";
```

### Animation Patterns
```typescript
import { motion } from 'framer-motion';

// Standard fade-in:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

## Production Deployment

### Build Process
- Run `npm run build` for production bundle
- Automatic code splitting via Create React App
- CSS purging removes unused Tailwind classes
- Assets optimized and compressed

### Performance Features
- **Lazy loading** for images
- **Code splitting** for route-based chunks
- **CDN delivery** via Cloudinary
- **PWA capabilities** with service worker

## Data Sources

The application uses real data migrated from the Disruptors Media Laravel database:

- **Portfolio projects**: 7 real client projects with metrics
- **Client testimonials**: Authentic client feedback
- **Team information**: Current team member profiles  
- **Blog content**: Real blog posts with engagement data

## Known Working Features

✅ **Navigation**: Full dropdown functionality across all devices
✅ **Images**: All assets loading properly without 404 errors  
✅ **Routing**: All pages accessible with proper SEO
✅ **Animations**: Smooth transitions and micro-interactions
✅ **Responsive**: Mobile-first design working across breakpoints
✅ **Performance**: Optimized builds under 155KB gzipped
✅ **PWA**: Progressive web app capabilities configured

## Support & Maintenance

For any issues or improvements:
1. Check this documentation first
2. Verify all dependencies are up to date
3. Test builds with `npm run build`
4. Ensure images follow the asset management patterns
5. Maintain TypeScript strict mode compliance

This application is production-ready and successfully resolves all critical navigation and asset loading issues identified in December 2024.