# Disruptors Media v3

A modern React 19 marketing website for Disruptors Media, showcasing AI-powered marketing solutions and professional studio services. This is a production-ready single page application built with TypeScript, Tailwind CSS, and optimized for performance.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎛️ Secret Admin Panel

This repository includes a sophisticated hidden administrative interface for development and automation management.

### Access
1. **Triple-click the site logo** on any page
2. **Enter a secret command**: `admin`, `figma`, `dev`, `tools`, `scripts`, `matrix`, `control`, or `sys`
3. **Manage 13+ development services** across 5 categories
4. **Monitor 9 MCP server integrations** in real-time
5. **Execute automated workflows** with one-click buttons

### Features
- 🔧 **Development Services** - React dev server, testing, auto-commit
- 🎨 **Design Integration** - Figma WebSocket server, design token extraction
- 🤖 **Automation Tools** - AI-powered git commits, content sync
- 📝 **Content Management** - Google Sheets integration, blog automation
- 🚀 **Deployment Tools** - Production builds, Apps Script deployment
- 🔗 **MCP Monitoring** - Real-time status for Vercel, Figma, Cloudinary, etc.

### Quick Commands
```bash
npm run figma:start    # Start Figma WebSocket server
npm run admin:help     # Show admin panel commands
npm run dev:auto       # Development with auto-commit
npm run clients:sync   # Sync Google Sheets data
```

📚 **Complete Documentation**: [docs/SECRET_ADMIN_PANEL.md](./docs/SECRET_ADMIN_PANEL.md)

## 🛠️ Technology Stack

### Core Framework
- **React 19.1.1** with TypeScript 4.9.5
- **Create React App 5.0.1** for build system
- **React Router DOM 7.8.2** for client-side routing

### Styling & UI
- **Tailwind CSS 3.4.17** with custom design system
- **Framer Motion 12.23.12** for animations
- **Headless UI 2.2.7** + Heroicons 2.2.0 for accessible components

### Integrations
- **Cloudinary** for asset management (cloud name: dvcvxhzmt)
- **Google Sheets API** for dynamic content management
- **Figma API** for design-to-code workflows
- **Multiple MCP Servers** for external service integration

## 📁 Project Structure

```
disruptors-media-v3/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── layout/          # Header, Footer, Layout wrappers
│   │   ├── sections/        # Page section components
│   │   └── common/          # Shared utilities & components
│   ├── pages/               # Route-level components
│   │   └── services/        # Service offering pages
│   ├── data/                # Static data and API integrations
│   └── constants/           # Configuration and constants
├── public/                  # Static assets and PWA manifest
├── scripts/                 # Automation and development scripts
├── docs/                    # Documentation files
└── [config files]          # Build, styling, and TypeScript configs
```

## 🔄 Development Workflows

### Core Development
```bash
npm start                    # Development server on localhost:3000
npm run build               # Production build with optimizations
npm test                    # Jest + React Testing Library tests
npm run preview             # Preview production build
```

### Advanced Automation
```bash
npm run auto-commit         # AI-powered git commit automation
npm run auto-commit:watch   # Continuous commit monitoring
npm run dev:auto           # Development with auto-commit enabled
npm run clients:sync       # Google Sheets data synchronization
npm run figma:start        # Figma WebSocket server for design sync
```

## 🎨 Design System

### Custom Color Palette
- **Gold**: #FFD700 (brand accent)
- **Dark**: #2B2B2B (primary dark)
- **Cream**: #F1EDE9 (light backgrounds)
- **Charcoal**: #222222 (text and UI elements)

### Typography
- **Headlines**: OT Neue Montreal
- **Body Text**: Inter
- **Monospace**: PP Supply Mono

### Animations
- **Framer Motion** for component transitions
- **GSAP** for complex timeline animations
- **Consistent easing** and duration patterns

## 🔗 External Integrations

### MCP Server Configuration
The project integrates with 9+ MCP servers for external services:
- **Vercel** - Deployment management
- **Figma** - Design file access and token extraction
- **Firecrawl** - Web scraping and content extraction
- **Playwright** - Browser automation and testing
- **Cloudinary** - Asset optimization and delivery
- **GitHub** - Repository management
- **n8n** - Workflow automation
- **GoHighLevel** - CRM and funnel management
- **DigitalOcean** - Infrastructure management

### Google Services Integration
- **Google Sheets** - Dynamic content management
- **Google Apps Script** - Automated blog publishing
- **Google Drive** - Document storage and collaboration

## 📊 Content Management

### Google Sheets Integration
- **Client Data Sync** - Real-time client information updates
- **Blog Content Management** - Automated blog post publication
- **Data Validation** - Integrity checking and error reporting
- **Backup Systems** - Automated data backup and version control

### Asset Management
- **Cloudinary CDN** - Automatic image optimization and delivery
- **Responsive Images** - Multiple breakpoint support
- **Format Selection** - WebP, AVIF with fallbacks
- **Performance Optimization** - Lazy loading and compression

## 🧪 Testing

### Test Configuration
- **Jest** test runner (built into Create React App)
- **React Testing Library 16.3.0** for component testing
- **@testing-library/user-event** for interaction testing
- **Coverage Reports** available with `npm test -- --coverage`

### Testing Patterns
```bash
npm test -- --testNamePattern="specific test"  # Run specific test
npm test -- path/to/test.test.tsx             # Run specific file
npm test -- --watch                           # Watch mode
```

## 🚀 Deployment

### Build Process
```bash
npm run build    # Creates optimized build in 'build/' directory
```

### Build Features
- **Code Splitting** - Automatic route-based splitting
- **Asset Optimization** - Minification and compression
- **PWA Support** - Service worker and manifest
- **Bundle Analysis** - Size optimization and tree shaking

### Deployment Targets
- **Netlify** - Primary deployment platform with edge caching
- **Vercel** - Alternative deployment with MCP integration
- **Static Hosting** - Any static file hosting service

## 🔧 Configuration Files

### Key Configuration
- **tailwind.config.js** - Custom design system and utilities
- **tsconfig.json** - TypeScript compiler configuration
- **package.json** - Dependencies and script definitions
- **postcss.config.js** - CSS processing pipeline
- **mcp-servers.json** - MCP server configuration

## 🛡️ Security

### Best Practices
- **Environment Variables** - Sensitive data in .env files
- **API Key Protection** - No client-side exposure
- **Content Security Policy** - XSS protection
- **HTTPS Enforcement** - Secure communication only

### Admin Panel Security
- **Hidden Access** - Easter egg trigger prevents discovery
- **Local Development** - Admin features disabled in production
- **No Data Exposure** - Sensitive information protected
- **Command Validation** - Prevents unauthorized access

## 📈 Performance

### Optimization Features
- **React 19** - Latest performance improvements
- **Code Splitting** - Reduced initial bundle size
- **Asset Optimization** - Cloudinary automatic optimization
- **Caching Strategy** - Browser and CDN caching
- **Bundle Size** - Optimized for fast loading

### Performance Metrics
- **Lighthouse Score** - Optimized for 90+ scores
- **Core Web Vitals** - LCP, FID, CLS optimization
- **Bundle Analysis** - Regular size monitoring

## 🤝 Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env`
4. Start development server: `npm start`
5. Access secret admin panel: Triple-click logo → `admin`

### Code Quality
- **TypeScript** - Strict mode enabled
- **ESLint** - Code quality enforcement
- **Prettier** - Code formatting (configured in IDEs)
- **Testing** - Required for new features

## 📚 Documentation

- **[Complete Admin Panel Guide](./docs/SECRET_ADMIN_PANEL.md)** - Full admin panel documentation
- **[Component Guide](./src/ADMIN_PANEL_GUIDE.md)** - Developer-focused guide
- **[CLAUDE.md](./CLAUDE.md)** - AI assistant instructions and commands
- **[Figma Setup](./FIGMA_MCP_SETUP.md)** - Design integration guide

## 🎯 Key Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SEO Optimized** - Meta tags, structured data, sitemaps
- ✅ **Performance Optimized** - 90+ Lighthouse scores
- ✅ **Accessibility** - WCAG compliance
- ✅ **PWA Ready** - Offline support and app-like experience
- ✅ **Type Safe** - Full TypeScript implementation
- ✅ **Modern Animations** - Framer Motion + GSAP
- ✅ **Asset Optimization** - Cloudinary integration
- ✅ **Content Management** - Google Sheets integration
- ✅ **Design Integration** - Figma-to-code workflows
- ✅ **Secret Admin Panel** - Advanced development tools

## 📄 License

This project is private and proprietary to Disruptors Media.

---

**🎛️ Try the Secret Admin Panel**: Triple-click the logo on any page and enter `admin` to access the hidden development interface!