# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm start           # Development server (localhost:3000)
npm run build       # Production build
npm test            # Run tests (Jest with React Testing Library)
npm run preview     # Preview production build (requires `npm install -g serve`)
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
- **Framer Motion 12.23.12** for animations
- **Tailwind CSS 3.4.17** with custom design tokens in `tailwind.config.js`
- **Cloudinary** (cloud name: dvcvxhzmt) for asset management

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

## Documentation

Comprehensive project documentation is available in the `/docs/` folder:
- `SESSION_SUMMARY_DECEMBER_2024.md` - Recent implementation details
- `TODO_ROADMAP.md` - Development priorities
- `CLOUDINARY_ASSETS_DOCUMENTATION.md` - Asset inventory and patterns
- `PROJECT_OVERVIEW.md` - Business context