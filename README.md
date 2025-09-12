# Disruptors Media v3

A modern React 19 marketing website with an intelligent **Universal Deployment System** that adapts to any platform - from local development with full Claude Code integration to production deployments on Railway, Netlify, and DigitalOcean.

## 🌟 Universal Deployment Architecture

**One repository, multiple deployment targets** with intelligent feature detection:

| Platform | Features | Admin Panel | Best For |
|----------|----------|-------------|----------|
| **🏠 Local Dev** | ✅ Complete | 🎛️ Full Control | Development + Claude Code |
| **🚂 Railway** | ✅ Full-Stack | 🔶 95% Features | Production Hosting |
| **🟣 Netlify** | 🔶 Frontend | 📊 Read-Only | Public Marketing |
| **🌊 DigitalOcean** | ✅ Enterprise | 🔶 95% Features | Enterprise Hosting |

## 🚀 Quick Start

### Local Development (Full Features)
```bash
# Install all dependencies
npm install

# Start complete environment (React + WebSocket Bridge)
npm run dev:full

# Alternative: Development with AI auto-commits
npm run dev:full:auto

# Check system health
npm run health:check
```

### Production Deployment
```bash
# Deploy to Railway (recommended)
npm run deploy:railway

# Deploy to Netlify (frontend-only)
npm run deploy:netlify

# Deploy to DigitalOcean
npm run deploy:do
```

## 🎛️ Deployment-Aware Admin Panel

**Intelligent administrative interface** that adapts based on deployment platform - full functionality locally, appropriate limitations on static hosting.

### Universal Access
1. **Triple-click the site logo** on any page (works on all platforms)
2. **Enter command**: `admin` to access the control panel
3. **Smart feature detection** shows what's available on current platform

### Platform-Adaptive Features

#### 🌍 **Deployment Status** (Always Available)
- Platform detection and identification  
- Feature availability matrix with visual indicators
- Current limitations and workarounds
- Health monitoring and system metrics

#### 🚀 **Development Services** (Local + Full-Stack Only)
- Real-time service monitoring and control
- Process management via WebSocket bridge
- System information and log monitoring
- Auto-commit and automation tools

#### 🧩 **Site Modules** (Data-Dependent)
- SEO optimization (DataForSEO MCP integration)
- Blog generation (Google Sheets + AI automation)
- Analytics dashboard and configuration
- Email marketing integration tools

#### 💾 **Database Management** (API-Dependent) 
- Google Sheets synchronization (11 clients, 6 testimonials)
- Portfolio management (8 projects with metrics)
- Blog administration (10 posts with SEO data)
- Team profiles (5 members with social links)

#### 🧠 **AI Assistant** (Local Development Only)
- **Full Local**: Claude Code CLI + MCP server orchestration
- **Production**: WebSocket bridge + helpful "download repo" messaging

### Smart UI Behavior
- **✅ Available Features**: Normal functionality with full styling
- **🔶 Limited Features**: Partial functionality with amber warning indicators  
- **❌ Unavailable Features**: Grayed out with helpful tooltips explaining requirements

### Quick Commands
```bash
npm run figma:start         # Start Figma WebSocket server
npm run claude-bridge       # Start AI assistant bridge server
npm run dev:auto           # Development with auto-commit
npm run clients:sync       # Sync Google Sheets data
npm run health:check       # Check all systems
```

📚 **Documentation**:
- [Railway Deployment Guide](./docs/RAILWAY_DEPLOYMENT.md) - Full-stack production hosting
- [Admin Panel Architecture](./docs/ADMIN_PANEL_ARCHITECTURE.md) - Technical deep-dive  
- [Multi-Platform Deployment](./DEPLOYMENT.md) - Complete deployment options

## 🛠️ Technology Stack

### Core Framework
- **React 19.1.1** with TypeScript 4.9.5
- **Create React App 5.0.1** for build system and development
- **React Router DOM 7.8.2** for client-side routing

### Backend & Real-Time Features
- **Express.js 4.19.2** for WebSocket bridge server
- **WebSocket (ws) 8.18.0** for real-time communication
- **Concurrently 8.2.2** for running frontend + backend simultaneously
- **CORS 2.8.5** for cross-origin resource sharing

### Styling & UI
- **Tailwind CSS 3.4.17** with custom design system
- **Framer Motion 12.23.12** for animations and transitions
- **Headless UI 2.2.7** + Heroicons 2.2.0 for accessible components
- **GSAP 3.13.0** for complex timeline animations

### Deployment & Platform Integration
- **Railway** for full-stack production hosting
- **Netlify** for static frontend deployment
- **DigitalOcean App Platform** for enterprise hosting
- **Smart Environment Detection** for platform-aware features
- **Universal Configuration** with platform-specific optimizations

### AI & MCP Integration
- **Claude Code CLI** integration (local development)
- **16+ MCP Servers**: DataForSEO, Firecrawl, Cloudinary, n8n, GoHighLevel, etc.
- **WebSocket Bridge** for real-time AI communication
- **Context Injection** for intelligent assistant features

### External Services
- **Cloudinary** for asset optimization (cloud name: dvcvxhzmt)
- **Google Sheets API** for dynamic content management
- **Google Generative AI** for content automation
- **OpenAI API** for advanced AI features

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

## 🌐 Multi-Platform Deployment

### Universal Repository Strategy
**One codebase, multiple deployment targets** with intelligent feature adaptation:

#### 🚂 **Railway (Recommended for Production)**
```bash
npm run deploy:railway    # Full-stack deployment with WebSocket support
```
**Features**: Complete admin panel (95%), real-time communication, MCP integration, $5/month no-sleep hosting

#### 🟣 **Netlify (Public Marketing Site)**  
```bash
npm run deploy:netlify    # Frontend-only with smart degradation
```
**Features**: Marketing site, read-only admin panel, edge CDN, free tier available

#### 🌊 **DigitalOcean (Enterprise)**
```bash  
npm run deploy:do         # Enterprise-grade full-stack hosting
```
**Features**: Complete control, WebSocket support, custom domains, scalable infrastructure

#### 🏠 **Local Development (Complete Features)**
```bash
npm run dev:full          # Full environment with Claude Code integration
```
**Features**: 100% functionality including Claude CLI, MCP servers, real-time sync

### Smart Feature Detection
The application automatically detects deployment environment and:
- **Enables** features available on the current platform
- **Gracefully disables** unavailable features with helpful messaging  
- **Provides instructions** for accessing full functionality locally

### Build Optimization
- **Code Splitting** - Automatic route-based and feature-based splitting
- **Platform Detection** - Environment-specific optimizations
- **Asset Optimization** - Cloudinary CDN with automatic format selection
- **Bundle Analysis** - Size monitoring and tree shaking
- **PWA Support** - Service worker and offline capabilities

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

### 🌍 **Universal Deployment System**
- ✅ **Platform Agnostic** - Deploys anywhere from Railway to Netlify
- ✅ **Smart Feature Detection** - Adapts UI based on hosting capabilities
- ✅ **Graceful Degradation** - Works optimally on every platform
- ✅ **One Codebase** - Single repository for all deployment targets

### 🎛️ **Intelligent Admin Panel**
- ✅ **Deployment Aware** - Shows available features per platform
- ✅ **Claude Code Integration** - Full AI assistant in local development
- ✅ **Real-Time Communication** - WebSocket bridge for live updates
- ✅ **MCP Server Integration** - 16+ external service connections

### 🚀 **Technical Excellence**
- ✅ **React 19** - Latest framework with TypeScript 4.9.5
- ✅ **Performance Optimized** - 90+ Lighthouse scores across all platforms
- ✅ **SEO Optimized** - Meta tags, structured data, sitemaps
- ✅ **PWA Ready** - Offline support and app-like experience
- ✅ **Accessibility** - WCAG compliance and keyboard navigation

### 🎨 **Modern Development**
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Modern Animations** - Framer Motion + GSAP for engaging UX
- ✅ **Asset Optimization** - Cloudinary CDN with automatic optimization
- ✅ **Type Safety** - Full TypeScript implementation with strict mode
- ✅ **Content Management** - Google Sheets integration for dynamic data

## 📄 License

This project is private and proprietary to Disruptors Media.

---

**🎛️ Try the Secret Admin Panel**: Triple-click the logo on any page and enter `admin` to access the hidden development interface!