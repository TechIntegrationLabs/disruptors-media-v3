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

### Automated Development Workflows
```bash
npm run auto-commit         # Automated git commits with AI-generated messages
npm run auto-commit:watch   # Watch mode for automatic commits
npm run auto-commit:status  # Check auto-commit system status
npm run dev:auto           # Development server with auto-commit enabled
npm run dev:safe           # Development server without auto-commit
```

### Secret Admin Panel
```bash
npm run figma:start         # Start Figma WebSocket server
npm run admin:help          # Show secret admin panel commands
```

**🎛️ Hidden Administrative Interface**
- **Access**: Triple-click the site logo to open command modal
- **Commands**: `admin`, `figma`, `dev`, `tools`, `scripts`, `matrix`, `control`, `sys`
- **Features**: 13 development services, 9 MCP server integrations, real-time monitoring
- **Complete Documentation Suite**:
  - `docs/SECRET_ADMIN_PANEL.md` - Master reference (40+ pages)
  - `docs/ADMIN_PANEL_INDEX.md` - Documentation index and overview
  - `ADMIN_PANEL_QUICKREF.md` - Quick reference card
  - `src/ADMIN_PANEL_GUIDE.md` - Developer guide
  - `SCRIPTS_GUIDE.md` - Complete scripts reference

### Client Data Management
```bash
npm run clients:sync       # Sync client data from Google Sheets
npm run clients:validate   # Validate client data structure
npm run clients:backup     # Backup client data from Google Sheets
```

### Image Management (Cloudinary-Only)
```bash
npm run cloudinary:watch    # Watch upload queue for automatic processing
npm run cloudinary:process  # Process existing files in upload queue
npm run cloudinary:tracker  # Open image tracking spreadsheet
```

**🖼️ IMPORTANT: This project uses Cloudinary exclusively for all images**
- **NO images in repository** - All assets hosted on Cloudinary
- **Upload workflow**: Drop images in `/image-upload-queue/` folder
- **Automatic processing**: Script uploads to Cloudinary and updates tracking
- **Documentation**: See `docs/CLOUDINARY_ONLY_IMAGE_MANAGEMENT.md`

### Running Tests
```bash
npm test -- --testNamePattern="specific test name"  # Run specific test by name
npm test -- path/to/test.test.tsx                  # Run specific test file
npm test -- --coverage                             # Run with coverage report
npm test -- --watch                               # Watch mode for test files
```

### Type Checking
```bash
npx tsc --noEmit    # Check types without building
```

## Architecture

### Technology Stack
- **React 18.2.0** with TypeScript 4.9.5
- **React Router DOM 7.8.2** for client-side routing
- **Framer Motion 12.23.12** + **GSAP 3.13.0** for animations
- **Tailwind CSS 3.4.17** with PRD-compliant design system
- **Cloudinary** (cloud name: dvcvxhzmt) for asset management
- **React Hook Form 7.62.0** + **Yup 1.7.0** for form handling
- **Google Generative AI** + **OpenAI** for AI-powered features
- **Axios 1.7.2** for HTTP requests
- **React Helmet Async 2.0.5** for SEO management

### Project Structure
```
src/
├── components/
│   ├── layout/         # Header, Footer, Layout wrapper
│   ├── sections/       # Reusable page sections (20+ components)
│   ├── common/         # Shared components (SEO, ErrorBoundary, Chat, PageTransition)
│   └── animations/     # Animation components (ScrambleText, LoadingCounter)
├── pages/
│   ├── services/       # Service-specific pages
│   └── [pages].tsx     # Route-level components
├── data/               # Static data files and client information
└── App.tsx            # Main router configuration
```

### Environment Configuration
Required environment variables:
```bash
REACT_APP_API_URL              # API endpoint
REACT_APP_OPENAI_API_KEY       # OpenAI integration
REACT_APP_GOOGLE_SHEETS_API_KEY # Google Sheets client sync
REACT_APP_GOOGLE_SHEETS_CLIENT_ID
REACT_APP_CLOUDINARY_CLOUD_NAME # Cloudinary asset management
```

### Routing Pattern
All routes are defined in `src/App.tsx`. The application uses a Layout wrapper that provides consistent Header and Footer across all pages. Routes include nested service pages under `/services/` and dynamic routes for blog posts (`/blog/:slug`) and case studies (`/case-study/:id`).

### Navigation System
The Header component implements a dropdown navigation system with TypeScript interfaces:
```typescript
interface NavigationItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string; }[];
}
```

### Asset Management Strategy
- **Cloudinary Integration**: All images served via Cloudinary CDN
- **Optimization Pattern**: `f_auto,q_auto,w_[width],h_[height]`
- **Responsive Images**: Use srcSet and sizes attributes
- **Local fallbacks**: Public folder contains backup assets

### Animation Patterns
Framer Motion animations follow consistent patterns:
```typescript
// Standard fade-in animation
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// GSAP for complex timeline animations
gsap.timeline()
  .to(element, { duration: 1, x: 100 })
  .to(element, { duration: 0.5, opacity: 0 })
```

### Form Handling Pattern
```typescript
const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required()
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
});
```

### Design System (PRD-Compliant)
- **Primary Colors**: 
  - brand-charcoal: #222222
  - brand-cream: #FAFAFA
  - warm-beige: #F5F5DC
  - accent-gold: #FFD700
- **Typography**: 
  - Headlines: OT Neue Montreal
  - Body: Inter
  - Monospace: PP Supply Mono
- **Spacing**: Extended scale up to 128 (32rem)

## Key Implementation Details

### TypeScript Configuration
- Target: ES2015 with DOM libraries
- Strict mode enabled with additional type checking
- Absolute imports from `src/` directory
- JSX: react-jsx

### Auto-Commit System
The project includes an intelligent auto-commit agent (`scripts/auto-commit.js`) that:
- Monitors file changes and categorizes them
- Generates contextual commit messages using AI
- Automatically stages, commits, and pushes changes
- Maintains detailed activity logs
- Configurable thresholds for major/minor changes

### MCP Server Integrations
Extensive MCP server configuration in `mcp-servers.json` for:
- **Deployment**: Vercel integration
- **AI Services**: Firecrawl, DataForSEO, Cloudinary AI
- **Automation**: n8n workflows, GoHighLevel CRM
- **Content Creation**: Nano Banana, Dumpling AI
- **Web Scraping**: Puppeteer, Playwright
- **Data Access**: Filesystem, memory persistence

### Performance Optimizations
- Code splitting via React.lazy() and Suspense
- Cloudinary automatic format selection and quality optimization
- Tailwind CSS purging in production builds
- Web Vitals monitoring integration
- Netlify edge caching and compression

### Build and Deployment
- **Netlify Configuration**: Custom headers, redirects, and build settings
- **Node Version**: 18.x required for builds
- **Build Command**: `npm run build`
- **Publish Directory**: `build/`
- **Environment Variables**: Managed via Netlify dashboard

### Testing Strategy
- Jest with Create React App configuration
- React Testing Library for component tests
- Coverage reporting with `--coverage` flag
- No custom Jest configuration needed

### Client Data Integration
The project syncs client information from Google Sheets:
- `scripts/sync-client-data.js` handles synchronization
- Data stored in `src/data/clients.json`
- Automatic validation and backup capabilities
- Integration with portfolio and testimonial components

## Specialized Documentation

The repository contains specialized CLAUDE.md files in subdirectories:
- `/src/CLAUDE.md` - Component architecture details
- `/docs/CLAUDE.md` - Documentation ecosystem overview
- `/public/CLAUDE.md` - Asset management guidelines
- `/todo/CLAUDE.md` - Project status and roadmap
- `/scripts/CLAUDE.md` - Automation tools documentation

Each provides domain-specific guidance for working within that directory.