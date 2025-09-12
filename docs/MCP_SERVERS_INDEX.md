# MCP Servers Index

## Overview

This document tracks all MCP (Model Context Protocol) servers configured for the Disruptors Media ecosystem, including their purposes, configurations, and integration status.

## Currently Configured MCP Servers

### 🎨 Design & 3D
- **Spline** - 3D scene control and interactive design
- **Figma Developer** - Figma design system integration
- **Cursor Talk to Figma** - Real-time Figma collaboration

### ⚡ Animation & Motion
- **GSAP Master** - Advanced animation control and sequencing

### 🚀 Deployment & Infrastructure
- **Railway** - 🆕 Railway platform deployment and management
- **Vercel** - Deployment and hosting management
- **Netlify** - Static site deployment
- **DigitalOcean** - Cloud infrastructure management

### 🔍 Web Scraping & Data
- **Firecrawl** - Web content extraction
- **Playwright** - Browser automation and testing
- **DataForSEO** - SEO analysis and insights
- **Puppeteer** - Headless browser automation

### 🤖 AI & Content
- **Nano Banana** - Content generation
- **Dumpling AI** - AI-powered content tools
- **Content Creation** - Multi-platform content management

### 📊 Business Operations
- **n8n MCP** - Workflow automation
- **GoHighLevel** - CRM and marketing automation
- **Google Drive Sheets** - Data synchronization

### ☁️ Media & Assets
- **Cloudinary** - Image and video management
- **Cloudinary Assets** - Advanced asset management

### 🛠️ Development Tools
- **Memory** - Persistent data storage
- **Filesystem** - File system operations
- **Fetch** - HTTP request handling
- **GitHub** - Repository management
- **Sequential Thinking** - Advanced reasoning

### 📝 Content Management
- **WordPress** - CMS integration

### 🔍 Other
- **Apify Modern** - Web scraping platform

## Server Details

### Spline MCP Server
**Status**: ✅ Installed and Configured  
**Location**: `/Users/disruptors/Documents/ProjectsD/DisruptorEcosystem/DM3/disruptors-media-v3/spline-mcp-server/`  
**Purpose**: Programmatic 3D scene creation and management for interactive web experiences  
**Documentation**: `docs/SPLINE_MCP_INTEGRATION.md`

**Key Features**:
- 3D object creation and manipulation
- Animation and event system management
- Material and lighting control
- Runtime code generation (JS, React, Next.js)
- Webhook integration for real-time data

### Railway MCP Server
**Status**: ✅ Installed and Configured  
**Location**: `/Users/disruptors/Documents/ProjectsD/DisruptorEcosystem/DM3/disruptors-media-v3/railway-mcp-server/`  
**Purpose**: Comprehensive Railway platform management and deployment automation  
**Documentation**: `docs/RAILWAY_DEPLOYMENT.md`

**Key Features**:
- Project and service management
- Environment variable configuration
- Template deployment from Railway library
- Domain generation and management
- Build and deployment logs
- Environment creation and linking

**Prerequisites**:
- Railway CLI installed (`npm install -g @railway/cli`)
- Railway account authentication (`railway login`)
- Project context (directory linked to Railway project)

**Example Tools**:
- `check-railway-status` - Verify CLI and authentication
- `deploy-template` - Deploy databases, queues, etc.
- `create-environment` - Set up staging/production environments
- `get-logs` - Monitor deployments and troubleshoot issues

### GSAP Master MCP Server
**Status**: ✅ Configured  
**Location**: `/Users/disruptors/Documents/ProjectsD/DisruptorEcosystem/DM3/disruptors-media-v3/gsap-master-mcp-server/`  
**Purpose**: Advanced animation control and sequencing

## Configuration File

All MCP servers are configured in: `/Users/disruptors/.cursor/mcp.json`

## Security Notes

- API keys are stored as environment variables
- Sensitive credentials should never be committed to version control
- Regular security audits recommended for external integrations

## Integration Patterns

### For DM3 Website
1. **Spline** - Interactive 3D portfolio showcases
2. **GSAP Master** - Smooth page transitions and animations
3. **Cloudinary** - Optimized media delivery
4. **Vercel** - Seamless deployment pipeline

### For Business Operations
1. **GoHighLevel** - Client relationship management
2. **n8n** - Automated workflows
3. **Google Drive Sheets** - Data synchronization
4. **GitHub** - Code management and collaboration

## Usage Guidelines

1. **Test Integration**: Always test new MCP servers in development first
2. **Documentation**: Update this index when adding new servers
3. **Security**: Use environment variables for sensitive configuration
4. **Monitoring**: Regular health checks for critical integrations

## Troubleshooting

### Common Issues
1. **Server Not Starting**: Check Node.js version and dependencies
2. **API Authentication**: Verify environment variables are set correctly
3. **Permission Issues**: Ensure file paths and permissions are correct
4. **Version Conflicts**: Check for compatible MCP SDK versions

### Debug Commands
```bash
# Test individual server
node /path/to/server/index.js

# Check MCP inspector
npx @modelcontextprotocol/inspector@latest

# Validate configuration
cat ~/.cursor/mcp.json | jq .
```

---

*Last Updated: January 12, 2025*  
*Total Servers: 25 (Added Railway MCP Server)*  
*Status: Production Ready*