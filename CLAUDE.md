# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Core Development
```bash
npm install          # Install dependencies
npm start           # Development server (localhost:3000)
npm run build       # Production build
npm test            # Run tests (Jest with React Testing Library)
npm run preview     # Preview production build (requires `npm install -g serve`)
npm run dev         # Alias for npm start
```

### Specialized Workflows
```bash
npm run auto-commit         # Automated git commits with message generation
npm run auto-commit:watch   # Watch mode for automatic commits
npm run auto-commit:status  # Check auto-commit system status
npm run dev:auto           # Development server with auto-commit enabled
npm run dev:safe           # Development server without auto-commit
```

### Client Data Management
```bash
npm run clients:sync       # Sync client data from Google Sheets
npm run clients:validate   # Validate client data structure
npm run clients:backup     # Backup client data from Google Sheets
```

### Running Tests
```bash
npm test -- --testNamePattern="specific test name"  # Run specific test by name
npm test -- path/to/test.test.tsx                  # Run specific test file
npm test -- --coverage                             # Run with coverage report
```

### Type Checking
```bash
npx tsc --noEmit    # Check types without building
```

## Architecture

### Technology Stack
- **React 19.1.1** with TypeScript 4.9.5
- **React Router DOM 7.8.2** for client-side routing
- **Framer Motion 12.23.12** + **GSAP 3.13.0** for animations
- **Tailwind CSS 3.4.17** with custom design tokens in `tailwind.config.js`
- **Cloudinary** (cloud name: dvcvxhzmt) for asset management
- **React Hook Form 7.62.0** + **Yup 1.7.0** for form handling
- **Google Generative AI** integration for automated content workflows

### Project Structure
```
src/
├── components/
│   ├── layout/         # Header, Footer, Layout wrapper
│   ├── sections/       # Reusable page sections (Hero, Testimonials, etc.)
│   ├── common/         # Shared components (SEO, ErrorBoundary, Chat)
│   └── animations/     # Animation components (ScrambleText, LoadingCounter)
├── pages/
│   ├── services/       # Service-specific pages
│   └── [pages].tsx     # Route-level components
├── data/               # Static data files
└── App.tsx            # Main router configuration
```

### Routing Pattern
All routes are defined in `src/App.tsx`. The application uses a Layout wrapper that provides consistent Header and Footer across all pages. Routes include nested service pages under `/services/` and dynamic routes for blog posts (`/blog/:slug`) and case studies (`/case-study/:id`).

### Navigation System
The Header component (`src/components/layout/Header.tsx`) implements a dropdown navigation system with TypeScript interfaces:

```typescript
interface NavigationItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string; }[];
}
```

Dropdowns are implemented for Services and Tools sections with click-outside handlers and mobile-responsive accordion behavior.

### Asset Management Strategy
- **Studio Photography**: Use documented Cloudinary assets from `/photos/studio/`
- **Service Illustrations**: Professional Unsplash stock images with optimization
- **URL Pattern**: `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_[width],h_[height]/[path]`
- **Stock Images**: Use Unsplash with parameters like `?w=600&h=400&fit=crop&crop=center`

### Animation Patterns
The application uses Framer Motion for animations with standard patterns:
- Fade-in with upward motion: `initial={{ opacity: 0, y: 20 }}` 
- Stagger children animations for lists
- Custom animations defined in `tailwind.config.js` (scramble-text, loading-counter)

### Form Handling
Forms use React Hook Form with Yup validation. Pattern:
```typescript
const schema = yup.object({
  email: yup.string().email().required(),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
});
```

### Design System
- **Primary Colors**: Gold (#FFD700), Dark (#2B2B2B), Cream (#F1EDE9)
- **Typography**: Inter for body, OT Neue Montreal for headlines, PP Supply Mono for tech elements
- **Spacing**: Standard Tailwind with custom extensions (88: 22rem, 128: 32rem)

## Key Implementation Details

### TypeScript Configuration
Strict mode is enabled in `tsconfig.json` with target ES5 for compatibility. All components should use proper TypeScript interfaces for props.

### Performance Optimizations
- Code splitting enabled via React.lazy() and Suspense
- Images use responsive loading with Cloudinary transformations
- PWA manifest configured for offline capabilities
- Tailwind CSS purging removes unused styles in production

### Error Handling
The application uses an ErrorBoundary component wrapping all routes. Individual pages should handle their own loading and error states appropriately.

### State Management
The application currently uses React's built-in state management. Complex state is managed at the page level and passed down through props.

## Repository Documentation System

This repository uses a comprehensive CLAUDE.md documentation system to provide detailed guidance for each major directory. Each folder contains specialized documentation for working with its components and systems.

### Folder-Specific Documentation

**Source Code Structure (`/src/CLAUDE.md`)**
- Component architecture with 20+ sections and animations
- Pages and routing system documentation
- Data management and Google Sheets integration
- TypeScript patterns and development workflows
- Asset management and performance optimization

**Documentation System (`/docs/CLAUDE.md`)**
- Comprehensive documentation ecosystem overview
- Project specifications and technical requirements
- Asset management guides and migration strategies
- Legacy content archive and brand guidelines
- Documentation workflows and maintenance procedures

**Public Assets Management (`/public/CLAUDE.md`)**
- Static asset organization and optimization strategies  
- Image library with categorized asset structure
- PWA configuration and SEO management
- Custom typography system and font integration
- Asset performance standards and quality guidelines

**Project Management System (`/todo/CLAUDE.md`)**
- Project status tracking (70% completion metrics)
- Development roadmap and sprint planning
- Technical architecture summaries and system overviews
- Animation implementation guides and best practices
- Quality assurance processes and launch readiness

**Automation & Scripts System (`/scripts/CLAUDE.md`)**
- Intelligent Git commit automation with AI-generated messages
- Content generation tools and AI-powered image creation
- Development workflow automation and process management
- Security best practices and performance optimization
- Script monitoring, debugging, and health checks

### Core Project Documentation

Comprehensive project documentation is also available in the `/docs/` folder:
- `SESSION_SUMMARY_DECEMBER_2024.md` - Recent implementation details
- `TODO_ROADMAP.md` - Development priorities and timeline
- `CLOUDINARY_ASSETS_DOCUMENTATION.md` - Asset inventory and optimization patterns
- `PROJECT_OVERVIEW.md` - Business context and objectives
- `DM3_STATIC_PRD.md` - Complete product requirements document
- `TECHNICAL_ARCHITECTURE_SUMMARY.md` - System architecture overview