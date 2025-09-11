# 🎨 Secret Admin Panel - User Guide

## Overview

A hidden administrative control panel has been integrated into the Disruptors Media website. This Easter egg provides easy access to development tools and local script management.

## Accessing the Admin Panel

### Method 1: Triple-Click Easter Egg
1. **Go to any page** on the website
2. **Triple-click the logo** in the header quickly (within 1 second)
3. A secret command modal will appear
4. **Enter one of the secret commands** below
5. Press EXECUTE or hit Enter

### Secret Commands
- `admin` - Main admin panel
- `tools` - Development tools
- `dev` - Developer console
- `scripts` - Script management
- `figma` - Figma integration tools
- `matrix` - Advanced controls
- `control` - Control panel
- `sys` - System management

## Admin Panel Features

### 🚀 Local Services Management (13 Services)
All services are organized into categories with filtering:

**Development Services (4):**
- **Development Server** (Port 3000) - React dev server with hot reload
- **Dev with Auto-Commit** (Port 3000) - Development with automated git commits
- **Test Runner** - Jest test runner with watch mode
- **Preview Build** (Port 5000) - Preview production build locally

**Design & Figma Services (2):**
- **Figma WebSocket Server** (Port 8080) - Cursor Talk to Figma MCP integration
- **Figma Design Analyzer** - Extract design tokens and analyze Figma files

**Automation Services (2):**
- **Auto-Commit Agent** - Automated git commits with AI-generated messages
- **Auto-Commit Status** - Check status of auto-commit system

**Content Management Services (5):**
- **Client Data Sync** - Google Sheets client data synchronization
- **Client Data Validation** - Validate data integrity and structure
- **Client Data Backup** - Backup client data from Google Sheets
- **Blog Content Sync** - Sync blog posts from Google Sheets
- **Deploy Apps Script** - Deploy Google Apps Script for blog automation

**Deployment Services (2):**
- **Build Production** - Create optimized production build
- **Setup Google Apps Script** - Initialize Google Apps Script integration

### 📋 System Logs
Real-time logs showing:
- Service start/stop status
- Command execution results
- System diagnostics
- Error messages

### 🔧 Quick Actions (6 Available)
- **🔄 RESTART ALL** - Restart all running services
- **🔍 SYSTEM CHECK** - Run comprehensive system diagnostics
- **📊 SYNC CONTENT** - Sync all content from Google Sheets
- **💾 BACKUP DATA** - Create backups of all data sources
- **🎨 UPDATE TOKENS** - Extract design tokens from Figma
- **🔗 CHECK MCP** - Verify all MCP server connections

### 🔗 MCP Server Monitoring (9 Servers)
Real-time status monitoring for:
- **Vercel** - Deployment management
- **Figma** - Design integration
- **Firecrawl** - Web scraping
- **Playwright** - Browser automation
- **Cloudinary** - Asset management
- **GitHub** - Repository management
- **n8n** - Workflow automation
- **GoHighLevel** - CRM integration
- **DigitalOcean** - Infrastructure management

### 🎨 Design & Content Tools (4 Tools)
- **Open Figma** - Launch Figma with MCP plugin
- **Design Tokens** - Extract design tokens from Figma
- **Sync Content** - Google Sheets content synchronization
- **Deploy Script** - Deploy Google Apps Script automation

## Command Line Shortcuts

You can also use these npm scripts directly:

```bash
# Start Figma WebSocket server
npm run figma:start

# Show help for admin commands
npm run admin:help

# Other existing scripts
npm start                    # Development server
npm run auto-commit:watch    # Auto-commit agent
npm run clients:sync         # Client data sync
```

## Technical Details

### Components Created
1. **SecretCommandModal** (`src/components/common/SecretCommandModal.tsx`)
   - Secure command input with validation
   - Cyberpunk-style UI matching site theme
   - Handles secret command routing

2. **SecretAdminPanel** (`src/pages/SecretAdminPanel.tsx`)
   - Complete admin interface
   - Service management dashboard
   - Real-time logging system

3. **Easter Egg Trigger** (Added to `Header.tsx`)
   - Triple-click detection on logo
   - Subtle animation feedback
   - Timer-based click reset

### Security Features
- **Hidden routes** - Not discoverable through normal navigation
- **Command validation** - Invalid commands are rejected
- **No indexing** - Admin pages excluded from search engines
- **Local development only** - Scripts designed for local environment

### File Structure
```
src/
├── components/common/
│   └── SecretCommandModal.tsx     # Command input modal
├── pages/
│   └── SecretAdminPanel.tsx       # Main admin interface
└── scripts/
    └── start-figma-websocket.js   # Figma WebSocket helper
```

## Usage Examples

### Starting Figma Integration
1. Triple-click logo → Enter `figma` → Access admin panel
2. Click "🎨 Figma WebSocket Server" START button
3. The WebSocket server starts on port 8080
4. Use "Open Figma" button to launch Figma with MCP plugin

### Running System Diagnostics
1. Access admin panel with any secret command
2. Click "🔍 SYSTEM CHECK" button
3. View results in the system logs panel

### Managing Development Environment
1. Use the admin panel to start/stop multiple services
2. Monitor all services from a single dashboard
3. View real-time logs for debugging

## Customization

### Adding New Services
Edit `SecretAdminPanel.tsx` and add to the `services` array:

```typescript
{
  name: 'New Service',
  running: false,
  port: 3001,
  description: 'Description of the service',
  command: 'npm run new-service',
  icon: '🆕'
}
```

### Adding New Commands
Edit `SecretCommandModal.tsx` and add to `secretCommands`:

```typescript
const secretCommands = {
  'newcommand': '/secret/new-page',
  // ... existing commands
};
```

## Troubleshooting

### Command Modal Not Appearing
- Ensure you're triple-clicking quickly (within 1 second)
- Try clicking directly on the logo image
- Check browser console for errors

### Services Not Starting
- Check that you're in the correct directory
- Verify all dependencies are installed
- Review system logs for error messages

### Figma WebSocket Issues
- Ensure Bun is installed: `curl -fsSL https://bun.sh/install | bash`
- Check that `cursor-talk-to-figma-mcp` directory exists
- Verify the WebSocket server starts without errors

## Security Note

This admin panel is designed for local development only. In production:
- Routes are excluded from search engine indexing
- No sensitive data is exposed
- All operations are client-side only

The Easter egg provides a fun and convenient way to access development tools without cluttering the main navigation interface.