# 🎛️ Secret Admin Panel - Developer Guide

## Quick Start

### Access the Admin Panel
1. **Triple-click the logo** on any page
2. **Enter command**: `admin` (or `figma`, `dev`, `tools`, etc.)
3. **Press EXECUTE** or hit Enter

### Essential Commands
```bash
# In the command modal:
admin     # Main admin dashboard
figma     # Figma integration tools
dev       # Development services
tools     # All development tools
scripts   # Script management
```

## Component Architecture

### Core Components
```
src/components/common/SecretCommandModal.tsx  # Command input interface
src/pages/SecretAdminPanel.tsx               # Main admin dashboard  
src/components/layout/Header.tsx             # Easter egg trigger
```

### Key Interfaces
```typescript
interface ServiceStatus {
  name: string;
  running: boolean;
  port?: number;
  description: string;
  command: string;
  icon: string;
  category: 'development' | 'automation' | 'content' | 'deployment' | 'design';
}
```

## Service Categories

### 🔧 Development (4 services)
- **Development Server** (Port 3000) - `npm start`
- **Dev with Auto-Commit** (Port 3000) - `npm run dev:auto`  
- **Test Runner** - `npm test`
- **Preview Build** (Port 5000) - `npm run preview`

### 🎨 Design (2 services)
- **Figma WebSocket Server** (Port 8080) - `npm run figma:start`
- **Figma Design Analyzer** - `node scripts/figma-analyzer.js`

### 🤖 Automation (2 services)
- **Auto-Commit Agent** - `npm run auto-commit:watch`
- **Auto-Commit Status** - `npm run auto-commit:status`

### 📝 Content (5 services)
- **Client Data Sync** - `npm run clients:sync`
- **Client Data Validation** - `npm run clients:validate`
- **Client Data Backup** - `npm run clients:backup`
- **Blog Content Sync** - `node src/services/googleSheetsService.js`
- **Deploy Apps Script** - `./deploy-apps-script.sh`

### 🚀 Deployment (2 services)
- **Build Production** - `npm run build`
- **Setup Google Apps Script** - `node setup-google-apps-script.js`

## Quick Actions

### System Operations
- **🔄 RESTART ALL** - Restart all running services
- **🔍 SYSTEM CHECK** - Comprehensive diagnostics
- **📊 SYNC CONTENT** - Sync all Google Sheets content
- **💾 BACKUP DATA** - Create data backups
- **🎨 UPDATE TOKENS** - Extract Figma design tokens
- **🔗 CHECK MCP** - Verify MCP server connections

## MCP Server Integration

### Monitored Services (9)
- **Vercel** (▲) - Deployment management
- **Figma** (🎨) - Design integration  
- **Firecrawl** (🔥) - Web scraping
- **Playwright** (🎭) - Browser automation
- **Cloudinary** (☁️) - Asset management
- **GitHub** (🐙) - Repository management
- **n8n** (🔄) - Workflow automation
- **GoHighLevel** (📈) - CRM integration
- **DigitalOcean** (🌊) - Infrastructure

## Development Workflow

### Typical Usage
1. **Access admin panel** - Triple-click logo → `admin`
2. **Start development** - Click "Development" tab → Start "Dev with Auto-Commit"
3. **Start Figma integration** - Start "Figma WebSocket Server"
4. **Run system check** - Click "🔍 SYSTEM CHECK"
5. **Monitor in logs** - Watch real-time activity

### Content Management
1. **Sync content** - Click "📊 SYNC CONTENT" or use Content tab
2. **Validate data** - Start "Client Data Validation"
3. **Create backups** - Click "💾 BACKUP DATA"
4. **Deploy automation** - Start "Deploy Apps Script"

### Design Workflow
1. **Start Figma server** - `npm run figma:start` or admin panel
2. **Open Figma** - Use "Design & Content Tools" section
3. **Extract tokens** - Click "🎨 UPDATE TOKENS"
4. **Monitor sync** - Watch logs for design updates

## Troubleshooting

### Command Modal Issues
```bash
# If triple-click doesn't work:
- Click directly on logo image
- Ensure clicks within 1 second
- Check browser console for errors
```

### Service Start Issues
```bash
# Common solutions:
npm install                    # Install dependencies
npm run admin:help            # Show available commands
npm run figma:start           # Start Figma manually
```

### Figma Integration Issues
```bash
# Install Bun if needed:
curl -fsSL https://bun.sh/install | bash

# Verify Figma directory exists:
ls -la cursor-talk-to-figma-mcp/

# Check WebSocket server:
npm run figma:start
```

## Security Notes

- **Local Development Only** - Designed for development environment
- **Hidden Routes** - Not discoverable through normal navigation  
- **No Production APIs** - Avoids production system calls
- **Environment Variables** - Sensitive data in .env files

## Extension Guide

### Adding New Services
1. Update `services` array in `SecretAdminPanel.tsx`
2. Add corresponding npm script to `package.json`
3. Test service start/stop functionality

### Adding New Commands  
1. Update `secretCommands` in `SecretCommandModal.tsx`
2. Add new route in `App.tsx`
3. Test command routing

### Adding New Quick Actions
1. Add case to `handleQuickAction` function
2. Add button to Quick Actions grid
3. Test action execution and logging

## Files Modified

### Created Files
- `src/components/common/SecretCommandModal.tsx` - Command interface
- `src/pages/SecretAdminPanel.tsx` - Admin dashboard
- `scripts/start-figma-websocket.js` - Figma helper script
- `docs/SECRET_ADMIN_PANEL.md` - Complete documentation

### Modified Files  
- `src/components/layout/Header.tsx` - Added Easter egg trigger
- `src/App.tsx` - Added secret routing
- `package.json` - Added admin commands

## Performance Notes

- **Build Impact** - Adds ~1.33 kB to main bundle
- **Memory Usage** - Minimal impact on application performance
- **Network Requests** - Only when services are actively used
- **Animation Performance** - Uses Framer Motion for smooth transitions

For complete documentation, see `docs/SECRET_ADMIN_PANEL.md`