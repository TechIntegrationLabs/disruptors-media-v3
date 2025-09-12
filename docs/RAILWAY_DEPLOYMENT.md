# 🚂 Railway Deployment Guide

Complete guide for deploying Disruptors Media v3 to Railway with full-stack capabilities including WebSocket support and the intelligent admin panel.

## 🎯 Why Railway?

Railway is the **ideal platform** for this project because:

✅ **Native WebSocket Support**: Unlike Netlify/Vercel, Railway supports persistent connections  
✅ **Full Node.js Backend**: Complete Express server with child process capabilities  
✅ **Zero-Config Deployment**: Automatic detection and deployment  
✅ **No Cold Starts**: $5 tier doesn't sleep, perfect for real-time features  
✅ **Modern Stack Support**: Node.js 18+, latest dependencies  
✅ **Single Repo Deployment**: Deploy entire full-stack app from one repository  

## 📊 Feature Availability on Railway

| Feature | Status | Description |
|---------|--------|-------------|
| **Frontend React App** | ✅ Full | Complete marketing site and admin panel UI |
| **WebSocket Bridge** | ✅ Full | Real-time communication for admin features |
| **Admin Panel Tabs** | 🔶 95% | All tabs functional except Claude CLI integration |
| **Service Management** | ✅ Full | Process control and monitoring via APIs |
| **MCP Server Integration** | ✅ Full | DataForSEO, Firecrawl, Cloudinary, n8n, etc. |
| **Database Sync** | ✅ Full | Google Sheets integration and data management |
| **Site Modules** | ✅ Full | SEO tools, content generation, analytics |
| **Claude Code CLI** | ❌ Local Only | Requires local development environment |

## 🚀 Quick Deployment

### Prerequisites
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login
```

### One-Command Deploy
```bash
# Deploy entire full-stack application
npm run deploy:railway
```

## 📋 Step-by-Step Setup

### 1. Railway Project Setup

```bash
# Create new Railway project
railway new

# Link to existing project (if already created)
railway link

# Check current status
railway status
```

### 2. Environment Variables

Set these in Railway Dashboard or via CLI:

```bash
# Core application settings
railway variables set NODE_ENV=production
railway variables set REACT_APP_RAILWAY=true
railway variables set REACT_APP_DEPLOYMENT_PLATFORM=railway

# WebSocket bridge configuration  
railway variables set CLAUDE_BRIDGE_PORT=3456
railway variables set REACT_APP_CLAUDE_BRIDGE_URL=wss://your-app.railway.app

# MCP server configuration path
railway variables set MCP_CONFIG_PATH=./mcp-servers.json

# API integrations (add your actual keys)
railway variables set REACT_APP_OPENAI_API_KEY=your_openai_key
railway variables set REACT_APP_GOOGLE_SHEETS_API_KEY=your_sheets_key
railway variables set REACT_APP_CLOUDINARY_CLOUD_NAME=dvcvxhzmt
```

### 3. Deploy Configuration

Railway uses the `railway.json` file for deployment configuration:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run dev:full",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300
  },
  "environments": {
    "production": {
      "variables": {
        "NODE_ENV": "production",
        "REACT_APP_RAILWAY": "true"
      }
    }
  }
}
```

### 4. Custom Domain Setup

```bash
# Add custom domain
railway domain add disruptorsmedia.com

# Check domain status
railway domain list
```

## 🏗️ Architecture Options

### Option 1: Monolith Deployment (Recommended)

**Single service running both frontend and backend:**

```json
{
  "deploy": {
    "startCommand": "npm run dev:full"
  }
}
```

**Ports:**
- Frontend: `3000` (React development server)
- Backend: `3456` (Claude Bridge WebSocket server)

**Benefits:**
- Simpler deployment
- Shared environment
- Lower cost (single service)

### Option 2: Microservices Deployment

**Separate services for frontend and backend:**

```json
{
  "services": [
    {
      "name": "frontend",
      "startCommand": "npm start",
      "domains": ["disruptorsmedia.com"]
    },
    {
      "name": "claude-bridge",
      "startCommand": "npm run claude-bridge",
      "internal_ports": [3456]
    }
  ]
}
```

**Benefits:**
- Independent scaling
- Service isolation
- Easier debugging

## 🎛️ Admin Panel on Railway

### Available Features

#### ✅ **Deployment Status Tab**
- Platform detection: "Railway"  
- Feature availability matrix
- Health monitoring
- Deployment commands

#### ✅ **Development Services Tab**
- Real-time service status
- Process management via APIs
- System information
- Log monitoring

#### ✅ **Site Modules Tab**
- SEO optimization tools (DataForSEO MCP)
- Content generation (Google Sheets + AI)
- Analytics dashboard setup
- Email marketing integration

#### ✅ **Database Tab**
- Google Sheets sync
- Client data management  
- Portfolio and blog management
- Real-time data updates

#### 🔶 **AI Assistant Tab**
- WebSocket bridge connection ✅
- MCP server status ✅
- Chat interface ✅
- Claude Code CLI integration ❌ (local only)

**Limited Functionality Message:**
> "Claude Code CLI integration requires local development environment. Download repository and run `npm run dev:full` for complete functionality."

### Accessing Admin Panel

1. Visit your Railway deployment URL
2. Triple-click the site logo
3. Type `admin` in the command modal
4. Navigate through deployment-aware tabs

## 🔧 Configuration Files

### `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm run dev:full",
    "healthcheckPath": "/health",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### `package.json` Scripts
```json
{
  "scripts": {
    "dev:full": "concurrently \"npm start\" \"npm run claude-bridge\"",
    "claude-bridge": "node src/backend/claude-bridge/server.js",
    "deploy:railway": "railway deploy",
    "railway:logs": "railway logs",
    "railway:status": "railway status"
  }
}
```

### MCP Server Integration

Railway deployment includes full MCP server support, now including the Railway MCP server itself:

```javascript
// Configured MCP servers (mcp-servers.json):
{
  "railway": "Railway deployment platform management - NEW!",
  "dataforseo": "SEO keyword research and analysis",
  "firecrawl": "Web scraping and content extraction", 
  "cloudinary": "Image optimization and management",
  "gohighlevel": "CRM and marketing automation",
  "n8n-mcp": "Workflow automation",
  "netlify": "Deployment management"
}
```

#### Railway MCP Server Features

The Railway MCP Server provides comprehensive Railway platform integration:

**✅ Installation Status**: 
- Cloned, built, and configured successfully
- Server executable at `railway-mcp-server/dist/index.js`
- Added to MCP servers configuration

**🛠️ Available Tools**:
- **Core Management**: `check-railway-status`
- **Projects**: `list-projects`, `create-project-and-link`
- **Services**: `list-services`, `link-service`, `deploy`, `deploy-template`
- **Environments**: `create-environment`, `link-environment`
- **Configuration**: `list-variables`, `set-variables`, `generate-domain`
- **Monitoring**: `get-logs`

**📋 Prerequisites**:
- Railway CLI installed and authenticated
- Railway project context (directory linked to project)

**💡 Example Usage**:
```text
"Deploy a Next.js app to Railway with a custom domain"
"Create a new environment called 'staging' and link it"
"Deploy a Postgres database from Railway templates"
```

## 🔍 Monitoring & Debugging

### Health Checks

```bash
# Check application health
curl https://your-app.railway.app/health

# Check WebSocket bridge
curl https://your-app.railway.app:3456/health

# View deployment logs
railway logs

# Monitor real-time logs
railway logs -f
```

### Common Issues & Solutions

#### **Build Failures**
```bash
# Check build logs
railway logs --build

# Clear build cache
railway build --clear-cache
```

#### **Environment Variables Not Loading**
```bash
# List all variables
railway variables

# Set missing variables
railway variables set VARIABLE_NAME=value
```

#### **WebSocket Connection Issues**
- Ensure using `wss://` protocol in production
- Check CORS configuration in bridge server
- Verify Railway port configuration (3456)

#### **Admin Panel Features Grayed Out**
- Expected behavior for Claude CLI features
- Check deployment context detection
- Verify MCP server configurations

## 💰 Cost Optimization

### Railway Pricing Tiers

**Hobby Plan ($5/month):**
- Perfect for this application
- No sleep/cold starts
- Custom domains included
- 512MB RAM, 1 vCPU

**Pro Plan ($20/month):**
- More resources if needed
- Priority support
- Advanced metrics

### Resource Usage Tips

```javascript
// Optimize memory usage in production
process.env.NODE_OPTIONS = "--max_old_space_size=512"

// Use compression for assets
app.use(compression())

// Efficient WebSocket connection handling
const wss = new WebSocketServer({ 
  server,
  maxPayload: 1024 * 16 // 16KB limit
})
```

## 🔄 CI/CD Integration

### GitHub Actions (Optional)

```yaml
# .github/workflows/railway-deploy.yml
name: Deploy to Railway
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @railway/cli
      - run: railway deploy
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Manual Deployments

```bash
# Deploy specific branch
railway deploy --branch production

# Deploy with custom start command
railway deploy --start "npm run production"

# Force redeploy
railway redeploy
```

## 🛡️ Security Configuration

### HTTPS & SSL
- Railway automatically provides SSL certificates
- All traffic encrypted by default
- WebSocket connections use WSS protocol

### Environment Security
```bash
# Secure variable management
railway variables set --secret DATABASE_URL=postgresql://...
railway variables set --secret OPENAI_API_KEY=sk-...

# View non-secret variables only
railway variables list
```

### CORS Configuration
```javascript
// src/backend/claude-bridge/server.js
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}))
```

## 🚀 Production Deployment Checklist

### Pre-Deploy
- [ ] All environment variables configured
- [ ] `railway.json` reviewed and updated
- [ ] MCP servers configured with valid API keys
- [ ] Custom domain DNS configured
- [ ] Health check endpoints tested locally

### Deploy
- [ ] Run `npm run deploy:railway`
- [ ] Monitor deployment logs
- [ ] Verify health endpoints
- [ ] Test WebSocket connections
- [ ] Confirm admin panel functionality

### Post-Deploy
- [ ] Test all admin panel tabs
- [ ] Verify MCP server integrations
- [ ] Check Google Sheets sync
- [ ] Monitor performance metrics
- [ ] Set up monitoring alerts

## 📱 Mobile Considerations

Railway deployments work seamlessly on mobile:
- Responsive admin panel design
- Touch-friendly interface elements
- Mobile WebSocket support
- PWA capabilities maintained

## 🔮 Future Enhancements

### Database Integration
```yaml
# Add PostgreSQL database
databases:
  - name: postgres-main
    engine: PostgreSQL
    version: "15"
```

### Redis Caching
```yaml
# Add Redis for caching
databases:
  - name: redis-cache
    engine: Redis
    version: "7"
```

### Advanced Monitoring
```javascript
// Add application metrics
const prometheus = require('prom-client')
const register = new prometheus.Registry()
```

## 📞 Support & Troubleshooting

### Railway Support
- Railway Dashboard: https://railway.app/dashboard
- Documentation: https://docs.railway.app
- Community Discord: https://discord.gg/railway

### Project-Specific Issues
- Check deployment logs: `railway logs`
- Review admin panel deployment status tab
- Test locally: `npm run dev:full`
- Verify MCP server configurations

## 🎯 Success Metrics

A successful Railway deployment should show:

✅ **Frontend**: Marketing site loads at custom domain  
✅ **Admin Panel**: All tabs accessible with appropriate feature indicators  
✅ **WebSocket**: Real-time connection established  
✅ **MCP Integration**: Server status showing green  
✅ **Health Checks**: All endpoints responding  
✅ **Performance**: Sub-2s page load times  

Railway provides the perfect balance of full-stack capabilities with deployment simplicity for this project!