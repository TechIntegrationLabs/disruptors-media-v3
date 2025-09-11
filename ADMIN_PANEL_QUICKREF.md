# 🎛️ Secret Admin Panel - Quick Reference

## Access
**Triple-click logo** → Enter command → Press EXECUTE

## Commands
```
admin     # Main dashboard
figma     # Figma tools  
dev       # Development
tools     # All tools
scripts   # Scripts
matrix    # Advanced
control   # Control panel
sys       # System
```

## Service Categories

### 🔧 Development (4)
- Development Server (3000)
- Dev + Auto-Commit (3000)  
- Test Runner
- Preview Build (5000)

### 🎨 Design (2)  
- Figma WebSocket (8080)
- Design Analyzer

### 🤖 Automation (2)
- Auto-Commit Agent
- Auto-Commit Status

### 📝 Content (5)
- Client Data Sync
- Data Validation  
- Data Backup
- Blog Content Sync
- Deploy Apps Script

### 🚀 Deployment (2)
- Build Production
- Setup Apps Script

## Quick Actions
- 🔄 **RESTART ALL** - Restart services
- 🔍 **SYSTEM CHECK** - Full diagnostics
- 📊 **SYNC CONTENT** - Sync Google Sheets
- 💾 **BACKUP DATA** - Create backups
- 🎨 **UPDATE TOKENS** - Extract Figma tokens
- 🔗 **CHECK MCP** - Verify connections

## MCP Servers (9)
✅ Vercel ✅ Figma ✅ Firecrawl ✅ Playwright  
✅ Cloudinary ✅ GitHub ✅ n8n ✅ GoHighLevel ✅ DigitalOcean

## Commands
```bash
npm run figma:start    # Figma WebSocket
npm run admin:help     # Show help
npm run dev:auto       # Dev + commits  
npm run clients:sync   # Sync data
```

## Troubleshooting
- **Modal not appearing**: Click logo directly, within 1 second
- **Services not starting**: Run `npm install`, check logs
- **Figma issues**: Install Bun, verify API key
- **MCP errors**: Check `.cursor/mcp.json` configuration

## Files
- `docs/SECRET_ADMIN_PANEL.md` - Complete guide
- `src/ADMIN_PANEL_GUIDE.md` - Developer guide
- `FIGMA_MCP_SETUP.md` - Figma integration

## Security
- Local development only
- Hidden routes (no SEO)
- Environment variables protected
- No production API calls