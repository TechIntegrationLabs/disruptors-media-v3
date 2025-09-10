const BaseAgent = require('./base-agent');
const path = require('path');

class MCPIntegrationAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.mcpConfig = {
      configPath: 'C:\\\\Users\\\\Will\\\\.cursor\\\\mcp.json',
      fallbackPaths: [
        path.join(process.env.USERPROFILE || process.env.HOME, '.cursor', 'mcp.json'),
        path.join(process.env.APPDATA || '', 'Cursor', 'mcp.json'),
        'mcp.json',
        '.mcp.json'
      ],
      toolCategories: {
        'web': ['mcp__web_search', 'mcp__web_fetch', 'mcp__web_scrape'],
        'filesystem': ['mcp__file_read', 'mcp__file_write', 'mcp__file_list'],
        'database': ['mcp__db_query', 'mcp__db_connect', 'mcp__db_schema'],
        'api': ['mcp__api_call', 'mcp__rest_client', 'mcp__graphql'],
        'development': ['mcp__git_ops', 'mcp__npm_tools', 'mcp__docker'],
        'productivity': ['mcp__calendar', 'mcp__email', 'mcp__notes'],
        'ai': ['mcp__llm_tools', 'mcp__embedding', 'mcp__vision']
      },
      monitoring: {
        checkInterval: 1800000, // 30 minutes
        healthCheckTimeout: 5000,
        retryAttempts: 3
      }
    };
    this.mcpRegistry = new Map();
    this.availableTools = new Map();
    this.toolHealth = new Map();
    this.lastHealthCheck = null;
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'interval':
          await this.performScheduledHealthCheck();
          break;
        case 'manual':
          await this.performComprehensiveMCPAudit();
          break;
        default:
          this.log(`MCP Integration triggered: ${trigger}`);
          await this.ensureMCPAvailability();
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute MCP integration agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load MCP configuration and discover available tools
    await this.loadMCPConfiguration();
    await this.discoverMCPTools();
    await this.validateToolAccess();
  }

  async loadMCPConfiguration() {
    try {
      // Try to load from the specified path first
      let configLoaded = false;
      
      if (await this.fileExists(this.mcpConfig.configPath)) {
        try {
          const configContent = await this.read(this.mcpConfig.configPath);
          this.parseMCPConfig(configContent, this.mcpConfig.configPath);
          configLoaded = true;
          this.log(`MCP configuration loaded from: ${this.mcpConfig.configPath}`);
        } catch (error) {
          this.log(`Failed to read primary MCP config: ${error.message}`);
        }
      }
      
      // Try fallback paths if primary failed
      if (!configLoaded) {
        for (const fallbackPath of this.mcpConfig.fallbackPaths) {
          if (await this.fileExists(fallbackPath)) {
            try {
              const configContent = await this.read(fallbackPath);
              this.parseMCPConfig(configContent, fallbackPath);
              configLoaded = true;
              this.log(`MCP configuration loaded from fallback: ${fallbackPath}`);
              break;
            } catch (error) {
              this.log(`Failed to read fallback MCP config ${fallbackPath}: ${error.message}`);
            }
          }
        }
      }
      
      if (!configLoaded) {
        this.log('No MCP configuration found - creating default configuration');
        await this.createDefaultMCPConfig();
      }
      
    } catch (error) {
      this.error('Failed to load MCP configuration', error);
    }
  }

  parseMCPConfig(configContent, configPath) {
    try {
      const config = JSON.parse(configContent);
      
      this.mcpRegistry.set('config', {
        path: configPath,
        content: config,
        lastModified: new Date(),
        servers: config.mcpServers || {},
        tools: config.tools || {},
        settings: config.settings || {}
      });
      
      // Extract available MCP tools
      if (config.mcpServers) {
        for (const [serverName, serverConfig] of Object.entries(config.mcpServers)) {
          this.processServerConfig(serverName, serverConfig);
        }
      }
      
    } catch (error) {
      this.error(`Failed to parse MCP config from ${configPath}`, error);
    }
  }

  processServerConfig(serverName, serverConfig) {
    try {
      // Extract tools from server configuration
      const tools = serverConfig.tools || [];
      const capabilities = serverConfig.capabilities || [];
      
      this.mcpRegistry.set(serverName, {
        name: serverName,
        config: serverConfig,
        tools,
        capabilities,
        status: 'unknown',
        lastChecked: null
      });
      
      // Register individual tools
      for (const tool of tools) {
        this.availableTools.set(tool.name || tool, {
          name: tool.name || tool,
          server: serverName,
          description: tool.description || '',
          parameters: tool.parameters || {},
          category: this.categorizeToolBasics(tool.name || tool)
        });
      }
      
    } catch (error) {
      this.error(`Failed to process server config for ${serverName}`, error);
    }
  }

  categorizeToolBasics(toolName) {
    const name = toolName.toLowerCase();
    
    for (const [category, patterns] of Object.entries(this.mcpConfig.toolCategories)) {
      if (patterns.some(pattern => name.includes(pattern.replace('mcp__', '')))) {
        return category;
      }
    }
    
    // Categorize by name patterns
    if (name.includes('web') || name.includes('http') || name.includes('fetch')) return 'web';
    if (name.includes('file') || name.includes('fs') || name.includes('directory')) return 'filesystem';
    if (name.includes('db') || name.includes('sql') || name.includes('database')) return 'database';
    if (name.includes('api') || name.includes('rest') || name.includes('graphql')) return 'api';
    if (name.includes('git') || name.includes('npm') || name.includes('docker')) return 'development';
    if (name.includes('calendar') || name.includes('email') || name.includes('note')) return 'productivity';
    if (name.includes('llm') || name.includes('ai') || name.includes('embed')) return 'ai';
    
    return 'other';
  }

  async createDefaultMCPConfig() {
    const defaultConfig = {
      "mcpServers": {
        "web-tools": {
          "command": "npx",
          "args": ["@modelcontextprotocol/server-web"],
          "tools": [
            {"name": "mcp__web_search", "description": "Search the web for information"},
            {"name": "mcp__web_fetch", "description": "Fetch content from a URL"},
            {"name": "mcp__web_scrape", "description": "Extract data from web pages"}
          ],
          "capabilities": ["web_search", "web_fetch", "content_extraction"]
        },
        "filesystem-tools": {
          "command": "npx",
          "args": ["@modelcontextprotocol/server-filesystem"],
          "tools": [
            {"name": "mcp__file_read", "description": "Read file contents"},
            {"name": "mcp__file_write", "description": "Write to files"},
            {"name": "mcp__file_list", "description": "List directory contents"}
          ],
          "capabilities": ["file_operations", "directory_listing"]
        }
      },
      "settings": {
        "timeout": 30000,
        "retries": 3,
        "logging": true
      }
    };
    
    try {
      // Create default config in project directory
      const configPath = '.mcp.json';
      await this.write(configPath, JSON.stringify(defaultConfig, null, 2));
      
      this.log(`Created default MCP configuration: ${configPath}`);
      this.log('Consider moving this to your .cursor directory for global access');
      
      // Load the newly created config
      this.parseMCPConfig(JSON.stringify(defaultConfig), configPath);
      
    } catch (error) {
      this.error('Failed to create default MCP config', error);
    }
  }

  async discoverMCPTools() {
    try {
      // Attempt to discover MCP tools through various methods
      await this.discoverFromConfig();
      await this.discoverFromEnvironment();
      await this.discoverFromProject();
      
      this.log(`Discovered ${this.availableTools.size} MCP tools`);
      
    } catch (error) {
      this.error('Failed to discover MCP tools', error);
    }
  }

  async discoverFromConfig() {
    // Tools already discovered during config parsing
    this.log(`Config-based discovery: ${this.availableTools.size} tools found`);
  }

  async discoverFromEnvironment() {
    try {
      // Check for common MCP tool patterns in the environment
      const commonMCPTools = [
        'mcp__web_search', 'mcp__web_fetch', 'mcp__file_read', 'mcp__file_write',
        'mcp__git_ops', 'mcp__npm_tools', 'mcp__db_query', 'mcp__api_call'
      ];
      
      for (const toolName of commonMCPTools) {
        if (!this.availableTools.has(toolName)) {
          // Add as potentially available tool
          this.availableTools.set(toolName, {
            name: toolName,
            server: 'discovered',
            description: `Discovered ${toolName} tool`,
            category: this.categorizeToolBasics(toolName),
            status: 'unverified'
          });
        }
      }
      
    } catch (error) {
      this.error('Failed to discover tools from environment', error);
    }
  }

  async discoverFromProject() {
    try {
      // Look for MCP-related files in the project
      const mcpFiles = await this.grep('mcp__', {
        glob: '**/*.js',
        outputMode: 'files_with_matches'
      });
      
      if (mcpFiles.length > 0) {
        this.log(`Found ${mcpFiles.length} files with MCP tool references`);
        
        // Extract tool names from file contents
        for (const file of mcpFiles) {
          await this.extractToolsFromFile(file);
        }
      }
      
    } catch (error) {
      this.error('Failed to discover tools from project', error);
    }
  }

  async extractToolsFromFile(filePath) {
    try {
      const content = await this.read(filePath);
      const toolRegex = /mcp__\\w+/g;
      const matches = content.match(toolRegex);
      
      if (matches) {
        for (const toolName of matches) {
          if (!this.availableTools.has(toolName)) {
            this.availableTools.set(toolName, {
              name: toolName,
              server: 'project-discovered',
              description: `Found in ${filePath}`,
              category: this.categorizeToolBasics(toolName),
              status: 'referenced'
            });
          }
        }
      }
      
    } catch (error) {
      this.error(`Failed to extract tools from ${filePath}`, error);
    }
  }

  async validateToolAccess() {
    try {
      // Validate that discovered tools are actually accessible
      let accessibleTools = 0;
      let inaccessibleTools = 0;
      
      for (const [toolName, toolInfo] of this.availableTools) {
        const isAccessible = await this.checkToolAccessibility(toolName, toolInfo);
        
        this.toolHealth.set(toolName, {
          accessible: isAccessible,
          lastChecked: new Date(),
          server: toolInfo.server,
          category: toolInfo.category
        });
        
        if (isAccessible) {
          accessibleTools++;
        } else {
          inaccessibleTools++;
        }
      }
      
      this.log(`Tool accessibility: ${accessibleTools} accessible, ${inaccessibleTools} inaccessible`);
      
    } catch (error) {
      this.error('Failed to validate tool access', error);
    }
  }

  async checkToolAccessibility(toolName, toolInfo) {
    try {
      // Simple accessibility check - this would need to be enhanced
      // based on actual MCP protocol implementation
      
      if (toolInfo.server === 'discovered' || toolInfo.server === 'project-discovered') {
        // Cannot verify these without actual server connection
        return false;
      }
      
      // For configured tools, assume accessible if server config exists
      const serverConfig = this.mcpRegistry.get(toolInfo.server);
      return serverConfig !== undefined;
      
    } catch (error) {
      return false;
    }
  }

  async ensureMCPAvailability() {
    this.log('Ensuring MCP tools are available and accessible');
    
    try {
      // Quick health check of critical MCP tools
      const criticalTools = ['mcp__web_search', 'mcp__web_fetch', 'mcp__file_read'];
      const unavailableTools = [];
      
      for (const toolName of criticalTools) {
        const health = this.toolHealth.get(toolName);
        if (!health || !health.accessible) {
          unavailableTools.push(toolName);
        }
      }
      
      if (unavailableTools.length > 0) {
        this.log(`Critical MCP tools unavailable: ${unavailableTools.join(', ')}`);
        await this.attemptToolRecovery(unavailableTools);
      } else {
        this.log('All critical MCP tools are available');
      }
      
    } catch (error) {
      this.error('Failed to ensure MCP availability', error);
    }
  }

  async attemptToolRecovery(unavailableTools) {
    this.log(`Attempting recovery for ${unavailableTools.length} unavailable tools`);
    
    try {
      for (const toolName of unavailableTools) {
        await this.recoverTool(toolName);
      }
    } catch (error) {
      this.error('Failed to recover MCP tools', error);
    }
  }

  async recoverTool(toolName) {
    this.log(`Attempting to recover tool: ${toolName}`);
    
    try {
      // Check if tool is in configuration but server is down
      const toolInfo = this.availableTools.get(toolName);
      if (toolInfo && toolInfo.server !== 'discovered') {
        const serverConfig = this.mcpRegistry.get(toolInfo.server);
        if (serverConfig) {
          this.log(`Tool ${toolName} is configured but server ${toolInfo.server} may be unavailable`);
          // Could attempt to restart server here
        }
      } else {
        this.log(`Tool ${toolName} not in configuration - adding suggested config`);
        await this.suggestToolConfiguration(toolName);
      }
      
    } catch (error) {
      this.error(`Failed to recover tool ${toolName}`, error);
    }
  }

  async suggestToolConfiguration(toolName) {
    const suggestions = {
      'mcp__web_search': {
        server: 'web-tools',
        command: 'npx',
        args: ['@modelcontextprotocol/server-web']
      },
      'mcp__web_fetch': {
        server: 'web-tools',
        command: 'npx',
        args: ['@modelcontextprotocol/server-web']
      },
      'mcp__file_read': {
        server: 'filesystem-tools',
        command: 'npx',
        args: ['@modelcontextprotocol/server-filesystem']
      }
    };
    
    const suggestion = suggestions[toolName];
    if (suggestion) {
      this.log(`Suggested configuration for ${toolName}:`);
      this.log(`  Server: ${suggestion.server}`);
      this.log(`  Command: ${suggestion.command} ${suggestion.args.join(' ')}`);
    }
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling MCP keyword trigger: ${keyword}`);
    
    switch (keyword.toLowerCase()) {
      case 'mcp':
        await this.handleMCPKeyword();
        break;
      default:
        // Check if keyword matches any MCP tool names
        await this.handleToolKeyword(keyword);
    }
  }

  async handleMCPKeyword() {
    this.log('MCP keyword detected - performing comprehensive MCP check');
    
    try {
      // Refresh MCP configuration
      await this.loadMCPConfiguration();
      
      // Re-discover tools
      await this.discoverMCPTools();
      
      // Validate access
      await this.validateToolAccess();
      
      // Ensure availability
      await this.ensureMCPAvailability();
      
      // Generate status report
      await this.generateMCPStatusReport();
      
    } catch (error) {
      this.error('Failed to handle MCP keyword', error);
    }
  }

  async handleToolKeyword(keyword) {
    const toolName = keyword.startsWith('mcp__') ? keyword : `mcp__${keyword}`;
    const toolInfo = this.availableTools.get(toolName);
    
    if (toolInfo) {
      this.log(`MCP tool reference detected: ${toolName}`);
      
      // Check tool health
      const health = this.toolHealth.get(toolName);
      if (health && health.accessible) {
        this.log(`Tool ${toolName} is accessible and ready`);
      } else {
        this.log(`Tool ${toolName} may not be accessible - checking configuration`);
        await this.recoverTool(toolName);
      }
    } else {
      this.log(`Unknown MCP tool referenced: ${toolName}`);
      await this.suggestToolConfiguration(toolName);
    }
  }

  async performScheduledHealthCheck() {
    this.log('Performing scheduled MCP health check');
    
    try {
      const healthResults = {
        timestamp: new Date().toISOString(),
        totalTools: this.availableTools.size,
        accessibleTools: 0,
        inaccessibleTools: 0,
        serverStatus: {},
        recommendations: []
      };
      
      // Check each tool
      for (const [toolName, toolInfo] of this.availableTools) {
        const isAccessible = await this.checkToolAccessibility(toolName, toolInfo);
        
        this.toolHealth.set(toolName, {
          accessible: isAccessible,
          lastChecked: new Date(),
          server: toolInfo.server,
          category: toolInfo.category
        });
        
        if (isAccessible) {
          healthResults.accessibleTools++;
        } else {
          healthResults.inaccessibleTools++;
        }
      }
      
      // Check server status
      for (const [serverName, serverInfo] of this.mcpRegistry) {
        if (serverName !== 'config') {
          healthResults.serverStatus[serverName] = {
            configured: true,
            tools: serverInfo.tools?.length || 0,
            lastChecked: new Date().toISOString()
          };
        }
      }
      
      // Generate recommendations
      if (healthResults.inaccessibleTools > 0) {
        healthResults.recommendations.push(`${healthResults.inaccessibleTools} tools are inaccessible - check MCP server configurations`);
      }
      
      if (healthResults.accessibleTools === 0) {
        healthResults.recommendations.push('No MCP tools are accessible - verify MCP configuration file path and server setup');
      }
      
      // Save health report
      const reportPath = '.claude/subagents/logs/mcp-health-check.json';
      await this.write(reportPath, JSON.stringify(healthResults, null, 2));
      
      this.lastHealthCheck = new Date();
      this.log(`Health check complete: ${healthResults.accessibleTools}/${healthResults.totalTools} tools accessible`);
      
    } catch (error) {
      this.error('Failed to perform scheduled health check', error);
    }
  }

  async generateMCPStatusReport() {
    try {
      const report = {
        timestamp: new Date().toISOString(),
        configuration: {
          configPath: this.mcpConfig.configPath,
          configFound: this.mcpRegistry.has('config'),
          serversConfigured: this.mcpRegistry.size - 1 // Subtract 'config' entry
        },
        tools: {
          total: this.availableTools.size,
          byCategory: {},
          byServer: {},
          byStatus: { accessible: 0, inaccessible: 0, unknown: 0 }
        },
        servers: [],
        recommendations: [],
        quickStart: this.generateQuickStartGuide()
      };
      
      // Analyze tools by category
      for (const [toolName, toolInfo] of this.availableTools) {
        const category = toolInfo.category;
        const server = toolInfo.server;
        
        if (!report.tools.byCategory[category]) {
          report.tools.byCategory[category] = 0;
        }
        report.tools.byCategory[category]++;
        
        if (!report.tools.byServer[server]) {
          report.tools.byServer[server] = 0;
        }
        report.tools.byServer[server]++;
        
        // Check accessibility
        const health = this.toolHealth.get(toolName);
        if (health) {
          if (health.accessible) {
            report.tools.byStatus.accessible++;
          } else {
            report.tools.byStatus.inaccessible++;
          }
        } else {
          report.tools.byStatus.unknown++;
        }
      }
      
      // Analyze servers
      for (const [serverName, serverInfo] of this.mcpRegistry) {
        if (serverName !== 'config') {
          report.servers.push({
            name: serverName,
            tools: serverInfo.tools?.length || 0,
            capabilities: serverInfo.capabilities || [],
            status: serverInfo.status || 'unknown'
          });
        }
      }
      
      // Generate recommendations
      if (report.tools.byStatus.inaccessible > report.tools.byStatus.accessible) {
        report.recommendations.push('Majority of MCP tools are inaccessible - check MCP server setup');
      }
      
      if (report.configuration.serversConfigured === 0) {
        report.recommendations.push('No MCP servers configured - add server configurations to enable MCP tools');
      }
      
      if (!report.configuration.configFound) {
        report.recommendations.push(`MCP configuration not found at ${this.mcpConfig.configPath} - create configuration file`);
      }
      
      // Save comprehensive report
      const reportPath = '.claude/subagents/logs/mcp-status-report.json';
      await this.write(reportPath, JSON.stringify(report, null, 2));
      
      this.log(`MCP status report generated: ${reportPath}`);
      this.log(`Summary: ${report.tools.byStatus.accessible}/${report.tools.total} tools accessible, ${report.configuration.serversConfigured} servers configured`);
      
      return report;
      
    } catch (error) {
      this.error('Failed to generate MCP status report', error);
    }
  }

  generateQuickStartGuide() {
    return {
      configurationFile: this.mcpConfig.configPath,
      steps: [
        `1. Ensure MCP configuration exists at: ${this.mcpConfig.configPath}`,
        "2. Install required MCP servers: npm install -g @modelcontextprotocol/server-web @modelcontextprotocol/server-filesystem",
        "3. Restart your development environment to load MCP tools",
        "4. Use 'mcp' keyword to trigger this agent and verify tool accessibility"
      ],
      exampleConfig: {
        "mcpServers": {
          "web-tools": {
            "command": "npx",
            "args": ["@modelcontextprotocol/server-web"]
          }
        }
      }
    };
  }

  async performComprehensiveMCPAudit() {
    this.log('Performing comprehensive MCP audit');
    
    try {
      // Full system audit
      await this.loadMCPConfiguration();
      await this.discoverMCPTools();
      await this.validateToolAccess();
      await this.performScheduledHealthCheck();
      
      // Generate comprehensive report
      const statusReport = await this.generateMCPStatusReport();
      
      // Create MCP integration guide
      await this.createMCPIntegrationGuide();
      
      this.log('Comprehensive MCP audit complete');
      
      return statusReport;
      
    } catch (error) {
      this.error('Failed to perform comprehensive MCP audit', error);
    }
  }

  async createMCPIntegrationGuide() {
    const guide = `# MCP Integration Guide

## Overview

This guide explains how to integrate and use MCP (Model Context Protocol) tools in this project.

## Configuration

MCP tools are configured via the MCP configuration file at:
\`${this.mcpConfig.configPath}\`

## Available Tools

${Array.from(this.availableTools.values()).map(tool => 
  `- **${tool.name}** (${tool.category}): ${tool.description}`
).join('\\n')}

## Quick Setup

1. Ensure MCP configuration file exists
2. Install required MCP servers
3. Restart development environment
4. Use \`mcp\` keyword to verify tool access

## Tool Categories

${Object.entries(this.mcpConfig.toolCategories).map(([category, tools]) =>
  `### ${category}\\n${tools.map(tool => `- ${tool}`).join('\\n')}`
).join('\\n\\n')}

## Troubleshooting

- Use \`mcp\` keyword to trigger diagnostic checks
- Check \`.claude/subagents/logs/mcp-status-report.json\` for detailed status
- Verify MCP configuration file path and permissions

---

*Generated by MCP Integration Agent*
*Last updated: ${new Date().toISOString().split('T')[0]}*
`;

    const guidePath = '.claude/subagents/logs/mcp-integration-guide.md';
    await this.write(guidePath, guide);
    
    this.log(`MCP integration guide created: ${guidePath}`);
  }
}

module.exports = MCPIntegrationAgent;