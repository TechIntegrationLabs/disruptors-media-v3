# 🚀 Multi-Platform Deployment Guide

This repository supports deployment across multiple platforms with intelligent feature detection and graceful degradation.

## 🎯 Platform Support Matrix

| Platform | WebSocket | Claude Integration | Full Admin Panel | Recommended Use |
|----------|-----------|-------------------|------------------|-----------------|
| **Local Dev** | ✅ | ✅ | ✅ | Complete development environment |
| **Railway** | ✅ | ❌ | 🔶 | Production full-stack hosting |
| **DigitalOcean** | ✅ | ❌ | 🔶 | Enterprise full-stack hosting |
| **Netlify** | ❌ | ❌ | 🔶 | Public marketing site |
| **Vercel** | ❌ | ❌ | 🔶 | Static site hosting |

**Legend:**
- ✅ Full support
- ❌ Not supported  
- 🔶 Limited functionality with graceful degradation

## 🏗️ Architecture Overview

### Smart Feature Detection
The application automatically detects its deployment environment and enables/disables features accordingly:

- **Local Development**: All features enabled including Claude Code integration
- **Full-Stack Platforms**: WebSocket features, service management, real-time sync
- **Static Hosting**: Read-only admin panel with "download to enable" messaging

### Universal Repository Design
One codebase that works everywhere:
- Frontend React app deploys to any static host
- Backend services deploy to full-stack platforms
- Feature flags handle platform limitations gracefully

## 📋 Deployment Options

### 1. 🏠 Local Development (Recommended for Development)

**Full feature set including Claude Code integration**

```bash
# Install dependencies
npm install

# Install additional backend dependencies  
npm install express cors ws concurrently nodemon

# Start development environment with all features
npm run dev:full

# Alternative: Development with auto-commit
npm run dev:full:auto

# Check system health
npm run health:check
```

**Local URLs:**
- Frontend: http://localhost:3000
- Claude Bridge: http://localhost:3456
- Admin Panel: http://localhost:3000 → Triple-click logo → type "admin"

### 2. 🚂 Railway (Recommended for Production)

**Full-stack deployment with WebSocket support**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
npm run deploy:railway

# Or manual deployment
railway deploy
```

**Railway Features:**
- ✅ WebSocket support (wss://)
- ✅ Auto-scaling
- ✅ Zero-config deployment
- ✅ $5 tier doesn't sleep
- ✅ Modern Node.js support

**Environment Variables (Railway Dashboard):**
```
NODE_ENV=production
REACT_APP_RAILWAY=true
REACT_APP_CLAUDE_BRIDGE_URL=wss://your-app.railway.app
CLAUDE_BRIDGE_PORT=3456
```

### 3. 🌊 DigitalOcean App Platform

**Enterprise-grade full-stack hosting**

```bash
# Install doctl CLI
# Configure app.yaml in .do/app.yaml

# Deploy
npm run deploy:do
```

**DO Features:**
- ✅ WebSocket support
- ✅ Custom domains
- ✅ SSL certificates
- ✅ Database integration ready

### 4. 🟣 Netlify (Frontend + CDN)

**Static site hosting with limited admin features**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run deploy:netlify
```

**Netlify Features:**
- ✅ Global CDN
- ✅ Automatic deployments
- ✅ Frontend admin panel (read-only)
- ❌ No WebSocket/backend features
- 🔶 Admin panel shows "download repo for full features"

**Environment Variables (Netlify Dashboard):**
```
REACT_APP_NETLIFY=true
REACT_APP_DEPLOYMENT_PLATFORM=netlify
```

### 5. ▲ Vercel

**Serverless frontend hosting**

Similar limitations to Netlify - frontend only deployment.

## 🎛️ Admin Panel Feature Matrix

### All Platforms
- **Deployment Status Tab**: Shows current platform and feature availability
- **Team Wiki**: Documentation access
- **Subagents**: Repository-specific AI agents documentation  
- **Database**: Read-only data views

### Full-Stack Platforms Only (Railway, DigitalOcean)
- **Development Services**: Real-time service management
- **Site Modules**: Full MCP integration
- **AI Assistant**: Limited (no Claude Code CLI, but WebSocket bridge works)

### Local Development Only
- **AI Assistant**: Complete Claude Code CLI integration
- **Process Control**: Full system control
- **MCP Servers**: Complete access to all configured servers

## 🔧 Configuration Files

### Package.json Scripts
```json
{
  "scripts": {
    "dev:full": "concurrently \"npm start\" \"npm run claude-bridge\"",
    "claude-bridge": "node src/backend/claude-bridge/server.js",
    "deploy:railway": "railway deploy",
    "deploy:netlify": "netlify deploy --prod",
    "deploy:do": "doctl apps create --spec .do/app.yaml",
    "health:check": "curl -f http://localhost:3000 && npm run claude:test"
  }
}
```

### Platform-Specific Configs
- **Railway**: `railway.json`
- **DigitalOcean**: `.do/app.yaml`  
- **Netlify**: `netlify.toml`
- **MCP Servers**: `mcp-servers.json`

## 🚦 Health Checking

### Local Development
```bash
# Check all services
npm run health:check

# Check Claude bridge specifically  
npm run claude:test
npm run claude:status

# View deployment context
# Visit admin panel → Deployment Status tab
```

### Production
```bash
# Check frontend
curl -f https://your-domain.com

# Check backend (Railway/DO only)
curl -f https://your-bridge-url.com/health
```

## 🐛 Troubleshooting

### Common Issues

**1. Claude Bridge Not Starting Locally**
```bash
# Ensure Claude CLI is installed
claude --version

# Check port availability
lsof -i :3456

# Restart bridge
npm run claude-bridge
```

**2. WebSocket Connection Failed**
- Verify you're using `wss://` in production
- Check firewall settings
- Confirm platform supports WebSocket (not Netlify/Vercel)

**3. Admin Panel Features Grayed Out**
- Normal behavior on static hosting platforms
- Deploy to Railway/DigitalOcean for full features
- Run locally for complete functionality

**4. MCP Servers Not Loading**
- Verify `mcp-servers.json` configuration
- Check API keys in environment variables
- Ensure platform supports backend processes

### Platform-Specific Issues

**Railway:**
- Build timeouts: Increase build resources
- WebSocket issues: Use `wss://` protocol
- Environment variables: Set in Railway dashboard

**Netlify:**
- Build errors: Check Node.js version
- Missing features: Expected behavior (static hosting)
- Redirects: Configure in `netlify.toml`

**DigitalOcean:**
- App spec issues: Validate `.do/app.yaml`
- Resource limits: Upgrade instance size
- Domain configuration: Set in DO dashboard

## 🎯 Recommended Deployment Strategy

### Development Workflow
1. **Local**: Full development with all features
2. **Railway**: Production full-stack hosting
3. **Netlify**: Public marketing site

### Team Collaboration
1. **Developers**: Clone repo and run `npm run dev:full`
2. **Stakeholders**: Access Railway deployment for testing
3. **Public Users**: Netlify deployment for marketing site

### Cost Optimization
- **Railway**: $5/month for full-stack features
- **Netlify**: Free tier for public site
- **Local**: Free for complete development environment

This approach gives you maximum flexibility with minimal complexity and cost.

## 🔐 Security Considerations

### API Keys
- Store in platform environment variables
- Never commit to repository
- Use different keys for dev/prod

### Access Control
- Admin panel requires triple-click activation
- Production deployments should use authentication
- Claude Code integration is local-only for security

### CORS Configuration
- Backend configured for cross-origin requests
- Production domains should be whitelisted
- WebSocket connections use secure protocols

## 🚀 Next Steps

1. Choose your primary deployment platform
2. Set up environment variables
3. Configure domain names
4. Set up monitoring and alerts
5. Establish CI/CD pipelines

For questions or support, see the repository's issue tracker or documentation.