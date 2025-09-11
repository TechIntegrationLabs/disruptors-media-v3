# 📜 Scripts Guide - Complete Reference

## Core Development Scripts

### Basic Development
```bash
npm start                    # React development server (localhost:3000)
npm run dev                 # Alias for npm start
npm run build              # Production build with optimizations
npm test                   # Jest test runner with watch mode
npm run preview            # Preview production build (requires serve)
```

### Advanced Development
```bash
npm run dev:auto           # Development server with auto-commit enabled
npm run dev:safe           # Development server without auto-commit
```

## 🎛️ Secret Admin Panel Scripts

### Admin Panel Access
```bash
npm run admin:help         # Display admin panel help and commands
npm run figma:start        # Start Figma WebSocket server for design integration
```

**Access Method**: Triple-click site logo → Enter command (`admin`, `figma`, `dev`, etc.)

### Available Admin Commands
- `admin` - Main administrative dashboard
- `figma` - Figma integration tools
- `dev` - Development services management  
- `tools` - All development tools overview
- `scripts` - Script management interface
- `matrix` - Advanced controls
- `control` - Control panel interface
- `sys` - System management tools

## 🤖 Automation Scripts

### Auto-Commit System
```bash
npm run auto-commit        # Single AI-powered commit
npm run auto-commit:watch  # Continuous monitoring and auto-commits
npm run auto-commit:status # Check auto-commit agent status
npm run commit             # Alias for auto-commit
```

**Features**:
- AI-generated commit messages using OpenAI
- Intelligent change categorization
- Automatic staging, committing, and pushing
- Rate limiting to prevent spam commits
- Detailed activity logging

## 📊 Content Management Scripts

### Google Sheets Integration
```bash
npm run clients:sync       # Sync client data from Google Sheets
npm run clients:validate   # Validate client data structure and integrity
npm run clients:backup     # Create backup of client data from Google Sheets
```

**Integration Features**:
- Real-time data synchronization
- TypeScript type generation
- Data validation and error reporting
- CSV backup creation
- Version control integration

### Content Workflows
The following commands are available through the admin panel:
- **Blog Content Sync** - `node src/services/googleSheetsService.js`
- **Deploy Apps Script** - `./deploy-apps-script.sh`
- **Setup Google Apps Script** - `node setup-google-apps-script.js`

## 🎨 Design Integration Scripts

### Figma Workflows
```bash
npm run figma:start        # Start Figma WebSocket server (Port 8080)
```

**Manual Figma Commands** (via admin panel):
- **Figma Design Analyzer** - `node scripts/figma-analyzer.js`
- **Design Token Extraction** - Extract color, typography, spacing tokens
- **Real-time Design Sync** - Live Figma-to-code updates

### Figma Integration Features
- Bidirectional communication with Figma
- Component creation and modification
- Design token extraction and CSS generation
- Real-time design updates in development
- Asset optimization and export

## 🚀 Deployment Scripts

### Build and Deploy
```bash
npm run build              # Create optimized production build
npm run preview            # Serve production build locally (Port 5000)
```

### Google Apps Script Deployment
Available through admin panel:
- **Deploy Apps Script** - Automated deployment to Google Cloud
- **Setup Apps Script** - Initialize Google Apps Script integration
- **Configuration Management** - API setup and permissions

## 📋 Script Categories (Admin Panel)

### 🔧 Development Services (4 scripts)
1. **Development Server** (Port 3000) - `npm start`
2. **Dev with Auto-Commit** (Port 3000) - `npm run dev:auto`  
3. **Test Runner** - `npm test`
4. **Preview Build** (Port 5000) - `npm run preview`

### 🎨 Design Services (2 scripts)
1. **Figma WebSocket Server** (Port 8080) - `npm run figma:start`
2. **Figma Design Analyzer** - `node scripts/figma-analyzer.js`

### 🤖 Automation Services (2 scripts)
1. **Auto-Commit Agent** - `npm run auto-commit:watch`
2. **Auto-Commit Status** - `npm run auto-commit:status`

### 📝 Content Management Services (5 scripts)
1. **Client Data Sync** - `npm run clients:sync`
2. **Client Data Validation** - `npm run clients:validate`
3. **Client Data Backup** - `npm run clients:backup`
4. **Blog Content Sync** - `node src/services/googleSheetsService.js`
5. **Deploy Apps Script** - `./deploy-apps-script.sh`

### 🚀 Deployment Services (2 scripts)
1. **Build Production** - `npm run build`
2. **Setup Google Apps Script** - `node setup-google-apps-script.js`

## 🔧 Quick Actions (Admin Panel)

These are bulk operations available in the admin panel:

### System Operations
- **🔄 RESTART ALL** - Restart all running services
- **🔍 SYSTEM CHECK** - Comprehensive system diagnostics
- **📊 SYNC CONTENT** - Sync all Google Sheets content sources
- **💾 BACKUP DATA** - Create backups of all data sources
- **🎨 UPDATE TOKENS** - Extract design tokens from Figma
- **🔗 CHECK MCP** - Verify all MCP server connections

## 📁 Script Files and Locations

### Core Scripts
- `package.json` - All npm scripts defined here
- `scripts/auto-commit-agent.js` - Auto-commit automation
- `scripts/dev-with-auto-commit.sh` - Enhanced development startup
- `scripts/start-figma-websocket.js` - Figma WebSocket helper

### Content Management Scripts
- `src/data/clients/clients-sync.js` - Google Sheets synchronization
- `src/services/googleSheetsService.js` - Blog content management
- `deploy-apps-script.sh` - Google Apps Script deployment
- `setup-google-apps-script.js` - Apps Script initialization

### Design Integration Scripts
- `scripts/figma-analyzer.js` - Figma design token extraction
- `cursor-talk-to-figma-mcp/` - Figma MCP integration directory
- `Figma-Context-MCP/` - Alternative Figma integration

## 🔐 Environment Requirements

### Required Environment Variables
```bash
# Google Services
GOOGLE_SHEETS_API_KEY=your_key_here
GOOGLE_SHEETS_CLIENT_ID=your_client_id

# AI Services  
OPENAI_API_KEY=your_openai_key
GOOGLE_GENERATIVE_AI_KEY=your_gemini_key

# Design Integration
FIGMA_API_KEY=your_figma_key

# Asset Management
CLOUDINARY_CLOUD_NAME=dvcvxhzmt
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### MCP Server Configuration
Location: `.cursor/mcp.json`
- 9 MCP servers configured
- Vercel, Figma, Firecrawl, Playwright, Cloudinary, GitHub, n8n, GoHighLevel, DigitalOcean
- API keys and authentication tokens

## 🐛 Troubleshooting Scripts

### Common Issues and Solutions

#### Auto-Commit Not Working
```bash
# Check Git configuration
git config --list

# Verify OpenAI API key
echo $OPENAI_API_KEY

# Check auto-commit status
npm run auto-commit:status
```

#### Figma Integration Issues
```bash
# Install Bun (required for Figma WebSocket)
curl -fsSL https://bun.sh/install | bash

# Verify Figma directory exists
ls -la cursor-talk-to-figma-mcp/

# Test Figma API key
curl -H "X-FIGMA-TOKEN: $FIGMA_API_KEY" https://api.figma.com/v1/me
```

#### Google Sheets Sync Problems
```bash
# Test Google Sheets API
npm run clients:validate

# Check API key configuration
echo $GOOGLE_SHEETS_API_KEY

# Manual sync
npm run clients:sync
```

#### Development Server Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear React cache
rm -rf .eslintcache
npm start
```

## 📊 Script Performance Monitoring

### Execution Times (Typical)
- `npm start` - 5-10 seconds initial startup
- `npm run build` - 30-60 seconds depending on changes
- `npm run clients:sync` - 2-5 seconds for data sync
- `npm run auto-commit:watch` - Continuous background process
- `npm run figma:start` - 3-5 seconds WebSocket server startup

### Resource Usage
- Development server: ~200MB RAM
- Auto-commit agent: ~50MB RAM  
- Figma WebSocket: ~30MB RAM
- Build process: ~500MB RAM peak

## 🚀 Advanced Usage

### Combining Scripts
```bash
# Development with full automation
npm run dev:auto &
npm run figma:start &
npm run clients:sync

# Production preparation
npm run clients:sync
npm run build
npm run preview
```

### Script Chaining
```bash
# Complete content sync and build
npm run clients:sync && npm run build

# Auto-commit with immediate sync
npm run clients:sync && npm run auto-commit
```

### Background Processes
```bash
# Run auto-commit in background
nohup npm run auto-commit:watch > auto-commit.log 2>&1 &

# Monitor log files
tail -f auto-commit.log
```

## 📚 Documentation References

- **Complete Admin Panel Guide** - `docs/SECRET_ADMIN_PANEL.md`
- **Developer Component Guide** - `src/ADMIN_PANEL_GUIDE.md`
- **Figma Integration Setup** - `FIGMA_MCP_SETUP.md`
- **Quick Reference Card** - `ADMIN_PANEL_QUICKREF.md`
- **Component Documentation** - `src/components/ADMIN_COMPONENTS.md`

---

**🎛️ Pro Tip**: Use the Secret Admin Panel for visual script management! Triple-click the logo → `admin` for a comprehensive GUI interface to all these scripts.