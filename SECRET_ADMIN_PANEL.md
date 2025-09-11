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

### 🚀 Local Services Management
Start and stop development services with one-click buttons:

- **Figma WebSocket Server** (Port 8080)
  - For cursor-talk-to-figma MCP integration
  - Command: `cd cursor-talk-to-figma-mcp && bun socket`

- **Development Server** (Port 3000)
  - React development server with hot reload
  - Command: `npm start`

- **Auto-Commit Agent**
  - Automated git commits with AI-generated messages
  - Command: `npm run auto-commit:watch`

- **Client Data Sync**
  - Google Sheets synchronization
  - Command: `npm run clients:sync`

- **Build Production**
  - Create optimized production build
  - Command: `npm run build`

### 📋 System Logs
Real-time logs showing:
- Service start/stop status
- Command execution results
- System diagnostics
- Error messages

### 🔧 Quick Actions
- **🔄 RESTART ALL** - Restart all running services
- **🔍 SYSTEM CHECK** - Run system diagnostics
- **Clear Logs** - Reset the log display

### 🎨 Figma Integration Tools
- **Open Figma** - Launch Figma with MCP plugin
- **Test API** - Check Figma API connection
- **MCP Docs** - View MCP documentation

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