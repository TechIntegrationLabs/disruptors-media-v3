# 🚂 Railway MCP Server Setup Guide

Complete guide for integrating Railway MCP server with your development workflow, making Railway deployments seamless and automated.

## 🎯 Overview

Railway MCP server integration provides:
- **Automated Deployments** - Deploy from Claude Code with natural language
- **Real-Time Monitoring** - Check deployment status and logs
- **Environment Management** - Configure variables through AI interface
- **Service Control** - Start, stop, and manage Railway services
- **Cost Monitoring** - Track usage and billing information

## 🏗️ Railway MCP Server Architecture

### Integration Points
```
Claude Code CLI
       ↓
Railway MCP Server
       ↓
Railway REST API
       ↓
Your Railway Projects
```

## 📋 Prerequisites

### 1. Railway Account Setup
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Verify authentication
railway whoami
```

### 2. Get Railway API Token
1. Visit [Railway Dashboard](https://railway.app/dashboard)
2. Go to Account Settings → API Tokens
3. Create new token with appropriate permissions:
   - **Project Access**: Read/Write for deployment projects
   - **Service Control**: Start/Stop/Restart services
   - **Environment Variables**: Read/Write access
   - **Logs**: Read access for monitoring

### 3. Project Configuration
```bash
# Link your project to Railway
cd /path/to/disruptors-media-v3
railway link

# Check project status
railway status

# List all projects (note project ID)
railway projects
```

## ⚙️ MCP Server Installation

### Option 1: Official Railway MCP Server
If Railway provides an official MCP server:

```bash
# Install via npm
npm install -g @railway/mcp-server

# Or use npx for one-time execution
npx @railway/mcp-server
```

### Option 2: Community Railway MCP Server
```bash
# Install community version
npm install -g railway-mcp-server

# Or use specific version
npm install -g railway-mcp-server@latest
```

### Option 3: Custom Implementation
If no official server exists, you can use the Railway REST API directly in your MCP configuration.

## 🔧 MCP Configuration

### Add to `mcp-servers.json`

```json
{
  "mcpServers": {
    "railway": {
      "command": "npx",
      "args": [
        "-y",
        "@railway/mcp-server@latest"
      ],
      "env": {
        "RAILWAY_TOKEN": "your_railway_api_token_here",
        "RAILWAY_PROJECT_ID": "your_project_id_here",
        "RAILWAY_TEAM_ID": "your_team_id_if_applicable",
        "RAILWAY_ENVIRONMENT": "production"
      },
      "description": "Railway deployment and infrastructure management"
    }
  }
}
```

### Alternative Configuration (REST API)
If using direct API calls:

```json
{
  "mcpServers": {
    "railway-api": {
      "command": "node",
      "args": [
        "scripts/railway-mcp-bridge.js"
      ],
      "env": {
        "RAILWAY_TOKEN": "your_railway_api_token_here",
        "RAILWAY_PROJECT_ID": "your_project_id_here",
        "RAILWAY_API_URL": "https://backboard.railway.app/graphql"
      }
    }
  }
}
```

## 🚀 Usage Examples

### Deployment Commands
```bash
# Deploy current branch
claude: "Deploy the current branch to Railway"

# Deploy specific environment
claude: "Deploy to Railway production environment"

# Deploy with custom build command
claude: "Deploy to Railway using npm run build:production"
```

### Monitoring Commands
```bash
# Check deployment status
claude: "What's the status of the Railway deployment?"

# View recent logs
claude: "Show me the latest Railway logs"

# Check service health
claude: "Is the Railway service running properly?"
```

### Environment Management
```bash
# List environment variables
claude: "Show me all Railway environment variables"

# Update environment variable
claude: "Set REACT_APP_API_URL to https://api.example.com on Railway"

# Add new environment variable
claude: "Add NODE_ENV=production to Railway environment"
```

### Service Management
```bash
# Restart service
claude: "Restart the Railway service"

# Scale service
claude: "Scale the Railway service to 2 instances"

# Check resource usage
claude: "What are the current Railway resource metrics?"
```

## 🎛️ Admin Panel Integration

### Railway Status Widget
The admin panel will automatically detect Railway MCP server and show:

```typescript
// Railway service status in admin panel
{
  name: "Railway Deployment",
  status: "running" | "stopped" | "deploying",
  lastDeploy: "2024-01-15T10:30:00Z",
  url: "https://your-app.railway.app",
  environment: "production",
  resources: {
    memory: "512MB",
    cpu: "1 vCPU",
    storage: "10GB"
  }
}
```

### Real-Time Deployment Monitoring
```tsx
// Admin panel deployment status
<DeploymentStatus 
  platform="railway"
  status={railwayStatus}
  onDeploy={() => deployToRailway()}
  onRestart={() => restartRailwayService()}
/>
```

## 📊 Railway Project Configuration

### `railway.json` Configuration
Ensure your project has proper Railway configuration:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm run dev:full",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  },
  "environments": {
    "production": {
      "variables": {
        "NODE_ENV": "production",
        "REACT_APP_RAILWAY": "true",
        "REACT_APP_CLAUDE_BRIDGE_URL": "${{RAILWAY_PUBLIC_DOMAIN}}",
        "CLAUDE_BRIDGE_PORT": "3456"
      }
    },
    "staging": {
      "variables": {
        "NODE_ENV": "staging",
        "REACT_APP_RAILWAY": "true"
      }
    }
  }
}
```

### Environment Variables Setup
```bash
# Set via Railway CLI
railway variables set NODE_ENV=production
railway variables set REACT_APP_RAILWAY=true
railway variables set CLAUDE_BRIDGE_PORT=3456

# Set via MCP server through Claude
claude: "Set up production environment variables for Railway deployment"
```

## 🔍 Troubleshooting

### Common Issues

#### **1. Authentication Errors**
```bash
# Error: Invalid Railway token
# Solution: Regenerate token and update MCP configuration
railway login
railway tokens create
```

#### **2. Project Not Found**
```bash
# Error: Project not linked
# Solution: Link project explicitly
railway link --project-id your-project-id
```

#### **3. MCP Server Not Responding**
```bash
# Check MCP server status
claude: "Is the Railway MCP server running?"

# Restart MCP server
# This depends on your MCP server manager
```

#### **4. Deployment Failures**
```bash
# Check Railway logs
railway logs

# Via Claude
claude: "Show me the Railway deployment error logs"
```

### Debug Commands
```bash
# Verify Railway CLI connection
railway status

# Check project configuration
railway variables

# Test MCP server connection
curl -X POST http://localhost:8080/mcp/railway/status
```

## 🛡️ Security Best Practices

### API Token Management
```bash
# Use environment variables
export RAILWAY_TOKEN="your_token_here"

# Rotate tokens regularly
railway tokens list
railway tokens delete old-token-id
railway tokens create
```

### Access Control
```json
{
  "railwayPermissions": {
    "projects": ["disruptors-media-v3"],
    "environments": ["production", "staging"],
    "actions": ["deploy", "restart", "read-logs", "manage-vars"]
  }
}
```

## 📈 Advanced Features

### Automated Deployment Workflows
```javascript
// Custom deployment script
const deployToRailway = async (options) => {
  const { branch, environment, buildCommand } = options;
  
  // Pre-deployment checks
  await runTests();
  await buildProject(buildCommand);
  
  // Deploy via Railway MCP
  const deployment = await railway.deploy({
    branch,
    environment,
    waitForCompletion: true
  });
  
  // Post-deployment verification
  await verifyDeployment(deployment.url);
  
  return deployment;
};
```

### Multi-Environment Management
```javascript
// Environment-specific deployments
const environments = {
  development: {
    branch: 'develop',
    domain: 'dev-disruptors.railway.app'
  },
  staging: {
    branch: 'staging',
    domain: 'staging-disruptors.railway.app'
  },
  production: {
    branch: 'main',
    domain: 'disruptorsmedia.com'
  }
};
```

### Cost Monitoring Integration
```javascript
// Track Railway usage costs
const getCostMetrics = async () => {
  const usage = await railway.getUsage();
  const estimates = await railway.getCostEstimate();
  
  return {
    currentPeriod: usage.currentPeriod,
    estimatedCost: estimates.total,
    resources: usage.resourceBreakdown
  };
};
```

## 🔗 Related Documentation

- **[Railway Documentation](https://docs.railway.app)** - Official Railway docs
- **[Railway GraphQL API](https://docs.railway.app/reference/public-api)** - API reference
- **[MCP Server Development](https://modelcontextprotocol.io)** - MCP protocol specs
- **[Admin Panel Integration](./ADMIN_PANEL_ARCHITECTURE.md)** - Panel architecture

## 🚀 Next Steps

1. **Install Railway MCP server** using preferred method
2. **Configure API tokens** with appropriate permissions
3. **Test basic commands** through Claude Code interface
4. **Set up automated deployments** for your workflow
5. **Monitor deployments** through admin panel integration

With Railway MCP server configured, you'll have seamless deployment and management capabilities directly from your AI-powered development environment!