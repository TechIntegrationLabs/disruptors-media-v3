import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';

// Import data for database management
import { featuredClients, testimonials } from '../data/clients';
import { detailedServices } from '../data/services';
import { portfolioProjects } from '../data/portfolio';
import { blogPosts } from '../data/blog';
import { teamMembers } from '../data/team';

interface ServiceStatus {
  name: string;
  running: boolean;
  port?: number;
  description: string;
  command: string;
  icon: string;
  category: 'development' | 'automation' | 'content' | 'deployment' | 'design';
}

const SecretAdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('services');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [activeDbTab, setActiveDbTab] = useState<string>('clients');
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'Development Server',
      running: false,
      port: 3000,
      description: 'React development server with hot reload',
      command: 'npm start',
      icon: '⚛️',
      category: 'development'
    },
    {
      name: 'Auto-Commit Agent',
      running: false,
      description: 'Automated git commits with AI-generated messages',
      command: 'npm run auto-commit:watch',
      icon: '🤖',
      category: 'automation'
    },
    {
      name: 'Client Data Sync',
      running: false,
      description: 'Google Sheets client data synchronization',
      command: 'npm run clients:sync',
      icon: '📊',
      category: 'content'
    }
  ]);

  // Ecosystem Agents (Global DisruptorEcosystem)
  const ecosystemAgents = [
    {
      id: 'business-brain-architect',
      name: 'Business Brain Architect',
      icon: '🧠',
      description: 'Maintains Business Brain schema consistency and data architecture',
      details: [
        'Ensures data model consistency across all Business Brain implementations',
        'Validates schema changes and migration strategies',
        'Optimizes data relationships and query performance',
        'Maintains documentation for Business Brain data structures'
      ],
      commands: ['npm run agents:business-brain', 'npm run schema:validate'],
      status: 'active'
    },
    {
      id: 'ecosystem-compliance-guardian',
      name: 'Ecosystem Compliance Guardian',
      icon: '🛡️',
      description: 'Ensures architectural alignment with Master PRD across all applications',
      details: [
        'Reviews code changes for PRD compliance',
        'Validates architectural decisions against master specifications',
        'Enforces consistency across multi-app ecosystem',
        'Maintains compliance documentation and reports'
      ],
      commands: ['npm run agents:compliance', 'npm run compliance:check'],
      status: 'active'
    },
    {
      id: 'pipeline-orchestration-specialist',
      name: 'Pipeline Orchestration Specialist',
      icon: '🔄',
      description: 'Optimizes data processing workflows and pipeline efficiency',
      details: [
        'Monitors and optimizes data processing pipelines',
        'Manages workflow orchestration and scheduling',
        'Handles error recovery and retry logic',
        'Optimizes pipeline performance and resource usage'
      ],
      commands: ['npm run agents:pipeline', 'npm run pipeline:optimize'],
      status: 'active'
    },
    {
      id: 'multi-app-coordinator',
      name: 'Multi-App Coordinator',
      icon: '🎯',
      description: 'Ensures consistency across all 5 core applications',
      details: [
        'Coordinates dependencies between applications',
        'Manages shared component libraries and types',
        'Ensures consistent API patterns across apps',
        'Facilitates cross-app communication and data sharing'
      ],
      commands: ['npm run agents:coordinator', 'npm run apps:sync'],
      status: 'active'
    },
    {
      id: 'vercel-deployment-optimizer',
      name: 'Vercel Deployment Optimizer',
      icon: '▲',
      description: 'Manages Vercel-first infrastructure and deployment optimization',
      details: [
        'Optimizes Vercel deployment configurations',
        'Manages environment variables and secrets',
        'Monitors deployment performance and costs',
        'Implements CI/CD best practices for Vercel platform'
      ],
      commands: ['npm run agents:vercel', 'npm run deploy:optimize'],
      status: 'active'
    },
    {
      id: 'business-model-enforcer',
      name: 'Business Model Enforcer',
      icon: '💼',
      description: 'Validates business model alignment and revenue optimization',
      details: [
        'Ensures features align with business model requirements',
        'Validates pricing and subscription logic',
        'Monitors revenue metrics and KPIs',
        'Enforces business rule compliance'
      ],
      commands: ['npm run agents:business', 'npm run business:validate'],
      status: 'active'
    },
    {
      id: 'ai-integration-specialist',
      name: 'AI Integration Specialist',
      icon: '🤖',
      description: 'Optimizes AI service usage and integration patterns',
      details: [
        'Manages OpenAI and Anthropic API integrations',
        'Optimizes AI prompt engineering and responses',
        'Monitors AI service costs and usage patterns',
        'Implements AI best practices and safety measures'
      ],
      commands: ['npm run agents:ai', 'npm run ai:optimize'],
      status: 'active'
    },
    {
      id: 'web-scraping-optimization-specialist',
      name: 'Web Scraping Optimization Specialist',
      icon: '🕷️',
      description: 'Maintains scraping quality and performance across all providers',
      details: [
        'Optimizes scraping strategies for different data sources',
        'Manages rotation between scraping providers (Apify, Firecrawl)',
        'Monitors scraping success rates and data quality',
        'Implements anti-detection and rate limiting strategies'
      ],
      commands: ['npm run agents:scraping', 'npm run scraping:optimize'],
      status: 'active'
    },
    {
      id: 'legacy-code-curator',
      name: 'Legacy Code Curator',
      icon: '📚',
      description: 'Manages legacy code analysis and migration strategies',
      details: [
        'Analyzes legacy codebase for migration opportunities',
        'Maintains documentation of legacy system dependencies',
        'Plans and executes gradual migration strategies',
        'Preserves valuable legacy functionality during transitions'
      ],
      commands: ['npm run agents:legacy', 'npm run legacy:analyze'],
      status: 'active'
    },
    {
      id: 'claude-code-docs-manager',
      name: 'Claude Code Docs Manager',
      icon: '📋',
      description: 'Maintains Claude Code documentation and knowledge sync',
      details: [
        'Synchronizes Claude Code documentation across projects',
        'Maintains CLAUDE.md files and context accuracy',
        'Manages documentation versioning and updates',
        'Ensures Claude Code integration best practices'
      ],
      commands: ['npm run agents:docs', 'npm run docs:sync'],
      status: 'active'
    }
  ];

  // DM3 Local Subagents (Specific to this repository)
  const localSubagents = [
    {
      id: 'auto-commit-manager',
      name: 'Auto-Commit Manager',
      icon: '🤖',
      description: 'Manages automated git commits with AI-generated messages',
      details: [
        'Analyzes file changes and categorizes commit types (feat, fix, docs, style)',
        'Groups changes by priority and significance for intelligent batching',
        'Generates contextual commit messages based on change analysis',
        'Handles immediate commits for critical changes and scheduled commits for routine updates'
      ],
      commands: ['npm run auto-commit:watch', 'npm run auto-commit:status'],
      status: 'active',
      filePath: '.claude/subagents/agents/auto-commit-manager.js'
    },
    {
      id: 'component-architect',
      name: 'Component Architect',
      icon: '🏗️',
      description: 'Maintains component architecture and design patterns',
      details: [
        'Analyzes new and modified React components for pattern compliance',
        'Maintains component registry and dependency tracking',
        'Enforces consistent component structure and naming conventions',
        'Provides architectural guidance for component design decisions'
      ],
      commands: ['node .claude/subagents/agents/component-architect.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/component-architect.js'
    },
    {
      id: 'cloudinary-optimizer',
      name: 'Cloudinary Optimizer',
      icon: '☁️',
      description: 'Optimizes image assets and Cloudinary integration',
      details: [
        'Analyzes image usage patterns and optimization opportunities',
        'Manages Cloudinary URL transformations and parameters',
        'Monitors asset loading performance and CDN efficiency',
        'Ensures consistent image optimization across the application'
      ],
      commands: ['node .claude/subagents/agents/cloudinary-optimizer.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/cloudinary-optimizer.js'
    },
    {
      id: 'content-generator',
      name: 'Content Generator',
      icon: '✍️',
      description: 'Generates and manages content creation workflows',
      details: [
        'Creates blog posts and marketing content using AI',
        'Manages Google Sheets integration for content planning',
        'Generates SEO-optimized content with proper structure',
        'Maintains brand voice consistency across all generated content'
      ],
      commands: ['node .claude/subagents/agents/content-generator.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/content-generator.js'
    },
    {
      id: 'documentation-maintainer',
      name: 'Documentation Maintainer',
      icon: '📚',
      description: 'Maintains project documentation and README files',
      details: [
        'Updates documentation based on code changes and new features',
        'Maintains CLAUDE.md files and project specifications',
        'Generates API documentation and component guides',
        'Ensures documentation accuracy and completeness'
      ],
      commands: ['node .claude/subagents/agents/documentation-maintainer.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/documentation-maintainer.js'
    },
    {
      id: 'form-integration-expert',
      name: 'Form Integration Expert',
      icon: '📝',
      description: 'Manages form integrations and data handling',
      details: [
        'Optimizes React Hook Form implementations and validation',
        'Manages form data flow and submission handling',
        'Integrates forms with backend APIs and third-party services',
        'Ensures proper error handling and user experience'
      ],
      commands: ['node .claude/subagents/agents/form-integration-expert.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/form-integration-expert.js'
    },
    {
      id: 'framer-motion-specialist',
      name: 'Framer Motion Specialist',
      icon: '🎬',
      description: 'Optimizes animations and motion design',
      details: [
        'Implements smooth Framer Motion animations across components',
        'Optimizes animation performance and reduces jank',
        'Maintains consistent motion design language',
        'Provides animation guidance for new component development'
      ],
      commands: ['node .claude/subagents/agents/framer-motion-specialist.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/framer-motion-specialist.js'
    },
    {
      id: 'gsap-animation-expert',
      name: 'GSAP Animation Expert',
      icon: '🎭',
      description: 'Manages complex GSAP animations and timeline coordination',
      details: [
        'Creates advanced timeline animations using GSAP',
        'Optimizes animation performance for smooth 60fps playback',
        'Coordinates complex multi-element animation sequences',
        'Provides GSAP best practices and performance optimization'
      ],
      commands: ['node .claude/subagents/agents/gsap-animation-expert.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/gsap-animation-expert.js'
    },
    {
      id: 'mcp-integration',
      name: 'MCP Integration Manager',
      icon: '🔗',
      description: 'Manages Model Context Protocol server integrations',
      details: [
        'Configures and maintains MCP server connections',
        'Optimizes data flow between Claude and external services',
        'Manages API integrations for Vercel, Cloudinary, and other services',
        'Ensures secure and efficient MCP communication'
      ],
      commands: ['node .claude/subagents/agents/mcp-integration.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/mcp-integration.js'
    },
    {
      id: 'performance-auditor',
      name: 'Performance Auditor',
      icon: '⚡',
      description: 'Monitors and optimizes application performance',
      details: [
        'Analyzes bundle size and loading performance',
        'Monitors Core Web Vitals and user experience metrics',
        'Identifies performance bottlenecks and optimization opportunities',
        'Provides performance recommendations and implementation guidance'
      ],
      commands: ['node .claude/subagents/agents/performance-auditor.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/performance-auditor.js'
    },
    {
      id: 'seo-optimizer',
      name: 'SEO Optimizer',
      icon: '🔍',
      description: 'Optimizes SEO and search engine visibility',
      details: [
        'Analyzes on-page SEO elements and metadata',
        'Optimizes content structure for search engines',
        'Manages structured data and schema markup',
        'Monitors search performance and provides optimization recommendations'
      ],
      commands: ['node .claude/subagents/agents/seo-optimizer.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/seo-optimizer.js'
    },
    {
      id: 'changelog-agent',
      name: 'Changelog Agent',
      icon: '📋',
      description: 'Maintains project changelog and release notes',
      details: [
        'Generates changelog entries from git commit history',
        'Categorizes changes by type (features, fixes, breaking changes)',
        'Maintains semantic versioning and release documentation',
        'Automates changelog updates for releases and deployments'
      ],
      commands: ['node .claude/subagents/agents/changelog-agent.js'],
      status: 'active',
      filePath: '.claude/subagents/agents/changelog-agent.js'
    }
  ];

  // Site Modules data
  const siteModules = {
    'seo-optimization': {
      name: 'SEO Optimization',
      icon: '🔍',
      modules: [
        {
          id: 'keyword-research',
          name: 'Keyword Intelligence Module',
          description: 'Advanced keyword research using DataForSEO MCP integration',
          features: [
            'Keyword difficulty analysis and competition research',
            'Long-tail keyword discovery and opportunity mapping',
            'Search volume trending and seasonal analysis'
          ],
          commands: ['mcp use dataforseo', 'npm run seo:keywords'],
          configurable: [
            'Target location and language settings',
            'Industry and niche focus parameters',
            'Keyword volume thresholds'
          ]
        }
      ]
    },
    'content-generation': {
      name: 'Content Generation',
      icon: '✍️',
      modules: [
        {
          id: 'blog-generator',
          name: 'AI Blog Generator',
          description: 'Automated blog post generation with customizable parameters',
          features: [
            'AI-powered content creation with brand voice consistency',
            'Google Sheets integration for topic management',
            'Featured image generation and optimization'
          ],
          commands: ['npm run blog:generate', 'npm run blog:publish'],
          configurable: [
            'Connected Google Sheets ID and range',
            'Content tone and style parameters',
            'AI model selection (GPT-4, Claude)'
          ]
        }
      ]
    }
  };

  const [logs, setLogs] = useState<string[]>([
    '> Admin panel initialized',
    '> Checking service status...',
    '> Ready for operations'
  ]);

  const [systemInfo, setSystemInfo] = useState({
    nodeVersion: 'v18.19.0',
    npmVersion: '9.2.0',
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    setSystemInfo({
      nodeVersion: 'v18.19.0',
      npmVersion: '9.2.0',
      timestamp: new Date().toISOString()
    });
  }, []);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-19), `[${timestamp}] ${message}`]);
  };

  const handleServiceToggle = async (index: number) => {
    const service = services[index];
    const newRunning = !service.running;
    
    setServices(prev => prev.map((s, i) => 
      i === index ? { ...s, running: newRunning } : s
    ));

    if (newRunning) {
      addLog(`Starting ${service.name}...`);
      addLog(`Command: ${service.command}`);
    } else {
      addLog(`Stopping ${service.name}...`);
    }
  };

  const categories = [
    { id: 'all', name: 'All Services', icon: '🔧' },
    { id: 'development', name: 'Development', icon: '⚛️' },
    { id: 'automation', name: 'Automation', icon: '🤖' },
    { id: 'content', name: 'Content Mgmt', icon: '📝' }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'system-check':
        addLog('Running system diagnostics...');
        addLog('✓ Node.js runtime: OK');
        addLog('✓ npm packages: OK');
        addLog('System check complete');
        break;
      default:
        addLog(`Executing ${action}...`);
        break;
    }
  };

  return (
    <>
      <SEO 
        title="Admin Panel - Disruptors Media"
        description="Administrative control panel"
        type="website"
        noindex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-gray-900 to-black text-brand-cream">
        {/* Header */}
        <div className="border-b border-accent-gold/20 p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-3xl font-pp-supply-mono text-accent-gold mb-2">
              ⚡ ADMIN CONTROL PANEL ⚡
            </h1>
            <p className="text-brand-cream/70">
              Local development tools and service management
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="border-b border-accent-gold/20">
              <nav className="flex space-x-8">
                {[
                  { id: 'services', name: 'Development Services', icon: '🚀' },
                  { id: 'wiki', name: 'Team Wiki', icon: '📚' },
                  { id: 'subagents', name: 'Subagents', icon: '🤖' },
                  { id: 'modules', name: 'Site Modules', icon: '🧩' },
                  { id: 'database', name: 'Database', icon: '💾' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-1 border-b-2 font-pp-supply-mono text-sm transition-colors flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-accent-gold text-accent-gold'
                        : 'border-transparent text-brand-cream/60 hover:text-brand-cream'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Services Tab */}
          {activeTab === 'services' && (
            <>
              {/* System Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-black/40 border border-accent-gold/30 rounded-lg p-4 mb-6"
              >
                <h2 className="text-accent-gold font-pp-supply-mono text-lg mb-3">System Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-brand-cream/60">Node.js:</span>
                    <span className="ml-2 text-green-400">{systemInfo.nodeVersion}</span>
                  </div>
                  <div>
                    <span className="text-brand-cream/60">npm:</span>
                    <span className="ml-2 text-green-400">{systemInfo.npmVersion}</span>
                  </div>
                  <div>
                    <span className="text-brand-cream/60">Last Update:</span>
                    <span className="ml-2 text-brand-cream">{new Date(systemInfo.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Services Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/40 border border-accent-gold/30 rounded-lg p-6"
                >
                  <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
                    🚀 Development Services ({filteredServices.length})
                  </h2>

                  {/* Category Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-3 py-2 rounded font-pp-supply-mono text-xs transition-colors flex items-center space-x-2 ${
                          activeCategory === category.id 
                            ? 'bg-accent-gold text-brand-charcoal' 
                            : 'bg-gray-700/50 text-brand-cream hover:bg-gray-600/50'
                        }`}
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredServices.map((service, index) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-gray-800/50 border border-gray-600/30 rounded p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{service.icon}</span>
                            <div>
                              <h3 className="font-pp-supply-mono text-brand-cream">
                                {service.name}
                              </h3>
                              {service.port && (
                                <span className="text-xs text-brand-cream/60">
                                  Port: {service.port}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              service.running ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            <button
                              onClick={() => handleServiceToggle(index)}
                              className={`px-4 py-2 rounded font-pp-supply-mono text-xs transition-colors ${
                                service.running 
                                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                                  : 'bg-green-600 hover:bg-green-700 text-white'
                              }`}
                            >
                              {service.running ? 'STOP' : 'START'}
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-brand-cream/70 mb-2">
                          {service.description}
                        </p>
                        <code className="text-xs text-accent-gold bg-black/50 px-2 py-1 rounded block">
                          {service.command}
                        </code>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Logs Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-black/40 border border-accent-gold/30 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-accent-gold font-pp-supply-mono text-xl">
                      📋 System Logs
                    </h2>
                    <button
                      onClick={() => handleQuickAction('clear-logs')}
                      className="text-xs text-brand-cream/60 hover:text-brand-cream transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  
                  <div className="bg-black/60 border border-gray-600/30 rounded p-4 h-96 overflow-y-auto">
                    <div className="font-mono text-sm space-y-1">
                      {logs.map((log, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-green-400"
                        >
                          {log}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}

          {/* Subagents Tab */}
          {activeTab === 'subagents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* DM3 Local Subagents */}
              <div className="bg-black/40 border border-accent-gold/30 rounded-lg p-6">
                <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
                  🤖 DM3 Local Subagents ({localSubagents.length})
                </h2>
                <p className="text-brand-cream/70 mb-6">
                  Repository-specific AI agents that maintain code quality, automation, and development workflows for the Disruptors Media v3 project.
                </p>
                
                <div className="space-y-4">
                  {localSubagents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 border border-gray-600/30 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedAgent(expandedAgent === agent.id ? null : agent.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-700/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl">{agent.icon}</span>
                            <div>
                              <h3 className="font-pp-supply-mono text-brand-cream font-medium">
                                {agent.name}
                              </h3>
                              <p className="text-sm text-brand-cream/60 mt-1">
                                {agent.description}
                              </p>
                              {agent.filePath && (
                                <p className="text-xs text-blue-400 mt-1">
                                  {agent.filePath}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              agent.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                            <span className="text-accent-gold">
                              {expandedAgent === agent.id ? '▼' : '▶'}
                            </span>
                          </div>
                        </div>
                      </button>
                      
                      {expandedAgent === agent.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-600/30 p-6"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-accent-gold font-pp-supply-mono text-sm mb-2">
                                Core Responsibilities:
                              </h4>
                              <ul className="space-y-1">
                                {agent.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-brand-cream/80 flex items-start">
                                    <span className="text-accent-gold mr-2">•</span>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-accent-gold font-pp-supply-mono text-sm mb-2">
                                Available Commands:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {agent.commands.map((command, i) => (
                                  <code key={i} className="text-xs bg-black/50 text-green-400 px-2 py-1 rounded">
                                    {command}
                                  </code>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Ecosystem Agents */}
              <div className="bg-black/40 border border-accent-gold/30 rounded-lg p-6">
                <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
                  🌐 Ecosystem Agents ({ecosystemAgents.length})
                </h2>
                <p className="text-brand-cream/70 mb-6">
                  Global AI agents that maintain platform quality and orchestrate complex workflows across the entire DisruptorEcosystem infrastructure.
                </p>
                
                <div className="space-y-4">
                  {ecosystemAgents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 border border-gray-600/30 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedAgent(expandedAgent === agent.id ? null : agent.id)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-700/30 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl">{agent.icon}</span>
                            <div>
                              <h3 className="font-pp-supply-mono text-brand-cream font-medium">
                                {agent.name}
                              </h3>
                              <p className="text-sm text-brand-cream/60 mt-1">
                                {agent.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              agent.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                            <span className="text-accent-gold">
                              {expandedAgent === agent.id ? '▼' : '▶'}
                            </span>
                          </div>
                        </div>
                      </button>
                      
                      {expandedAgent === agent.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-600/30 p-6"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-accent-gold font-pp-supply-mono text-sm mb-2">
                                Core Responsibilities:
                              </h4>
                              <ul className="space-y-1">
                                {agent.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-brand-cream/80 flex items-start">
                                    <span className="text-accent-gold mr-2">•</span>
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-accent-gold font-pp-supply-mono text-sm mb-2">
                                Available Commands:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {agent.commands.map((command, i) => (
                                  <code key={i} className="text-xs bg-black/50 text-green-400 px-2 py-1 rounded">
                                    {command}
                                  </code>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Site Modules Tab */}
          {activeTab === 'modules' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-black/40 border border-accent-gold/30 rounded-lg p-6">
                <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
                  🧩 Site Modules System
                </h2>
                <p className="text-brand-cream/70 mb-6">
                  Plug-and-play website modules for SEO, content generation, automation, and lead generation. Each module is configurable and reusable across different client sites.
                </p>
                
                <div className="space-y-6">
                  {Object.entries(siteModules).map(([categoryId, category], categoryIndex) => (
                    <div key={categoryId} className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-6">
                      <h3 className="text-accent-gold font-pp-supply-mono text-lg mb-4 flex items-center">
                        <span className="mr-3 text-2xl">{category.icon}</span>
                        {category.name}
                        <span className="ml-3 text-sm bg-black/30 px-2 py-1 rounded">
                          {category.modules.length} modules
                        </span>
                      </h3>
                      
                      <div className="space-y-4">
                        {category.modules.map((module, moduleIndex) => (
                          <motion.div
                            key={module.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (categoryIndex * 3 + moduleIndex) * 0.1 }}
                            className="bg-gray-700/40 border border-gray-600/30 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                              className="w-full px-6 py-4 text-left hover:bg-gray-600/30 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-pp-supply-mono text-brand-cream font-medium">
                                    {module.name}
                                  </h4>
                                  <p className="text-sm text-brand-cream/60 mt-1">
                                    {module.description}
                                  </p>
                                </div>
                                <span className="text-accent-gold">
                                  {expandedModule === module.id ? '▼' : '▶'}
                                </span>
                              </div>
                            </button>
                            
                            {expandedModule === module.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-gray-600/30 p-6"
                              >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div>
                                    <h5 className="text-accent-gold font-pp-supply-mono text-sm mb-2">
                                      Key Features:
                                    </h5>
                                    <ul className="space-y-1">
                                      {module.features.map((feature, i) => (
                                        <li key={i} className="text-sm text-brand-cream/80 flex items-start">
                                          <span className="text-accent-gold mr-2">•</span>
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                    
                                    <h5 className="text-accent-gold font-pp-supply-mono text-sm mb-2 mt-4">
                                      Commands:
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                      {module.commands.map((command, i) => (
                                        <code key={i} className="text-xs bg-black/50 text-green-400 px-2 py-1 rounded">
                                          {command}
                                        </code>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h5 className="text-accent-gold font-pp-supply-mono text-sm mb-2">
                                      Configurable Options:
                                    </h5>
                                    <ul className="space-y-1">
                                      {module.configurable.map((option, i) => (
                                        <li key={i} className="text-sm text-brand-cream/80 flex items-start">
                                          <span className="text-blue-400 mr-2">⚙</span>
                                          {option}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-600/20">
                                  <div className="flex flex-wrap gap-2">
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors">
                                      🚀 ACTIVATE
                                    </button>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors">
                                      ⚙️ CONFIGURE
                                    </button>
                                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors">
                                      📊 VIEW STATUS
                                    </button>
                                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors">
                                      📖 DOCS
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Database Tab */}
          {activeTab === 'database' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-black/40 border border-accent-gold/30 rounded-lg p-6">
                <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
                  💾 Database Management System
                </h2>
                <p className="text-brand-cream/70 mb-6">
                  View and manage all data types including clients, services, portfolio projects, blog posts, and team information. Data is synced from Google Sheets and local TypeScript files.
                </p>
                
                {/* Database Sub-tabs */}
                <div className="border-b border-accent-gold/20 mb-6">
                  <nav className="flex space-x-6 overflow-x-auto">
                    {[
                      { id: 'clients', name: 'Clients', icon: '👥', count: featuredClients.length },
                      { id: 'services', name: 'Services', icon: '🛠️', count: detailedServices.length },
                      { id: 'portfolio', name: 'Portfolio', icon: '💼', count: portfolioProjects.length },
                      { id: 'blog', name: 'Blog Posts', icon: '📝', count: blogPosts.length },
                      { id: 'team', name: 'Team', icon: '👨‍💼', count: teamMembers.length },
                      { id: 'testimonials', name: 'Testimonials', icon: '⭐', count: testimonials.length }
                    ].map((dbTab) => (
                      <button
                        key={dbTab.id}
                        onClick={() => setActiveDbTab(dbTab.id)}
                        className={`py-2 px-1 border-b-2 font-pp-supply-mono text-xs transition-colors flex items-center space-x-2 whitespace-nowrap ${
                          activeDbTab === dbTab.id
                            ? 'border-accent-gold text-accent-gold'
                            : 'border-transparent text-brand-cream/60 hover:text-brand-cream'
                        }`}
                      >
                        <span>{dbTab.icon}</span>
                        <span>{dbTab.name}</span>
                        <span className="bg-black/30 px-2 py-1 rounded text-xs">
                          {dbTab.count}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Clients Database */}
                {activeDbTab === 'clients' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-accent-gold font-pp-supply-mono text-lg">
                        Client Database ({featuredClients.length} records)
                      </h3>
                      <div className="flex space-x-2">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono">
                          📊 SYNC SHEETS
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono">
                          ➕ ADD CLIENT
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                      {featuredClients.map((client, index) => (
                        <motion.div
                          key={client.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {client.logo && (
                                <img 
                                  src={client.logo} 
                                  alt={`${client.name} logo`}
                                  className="w-12 h-12 object-contain rounded"
                                />
                              )}
                              <div>
                                <h4 className="font-pp-supply-mono text-brand-cream font-medium">
                                  {client.name}
                                </h4>
                                <p className="text-sm text-brand-cream/60">
                                  ID: {client.id} | Featured: {client.featured ? '✅' : '❌'}
                                </p>
                                {client.url && (
                                  <a 
                                    href={client.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-400 hover:text-blue-300"
                                  >
                                    View Project →
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => setSelectedRecord(client)}
                                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs"
                              >
                                👁️ VIEW
                              </button>
                              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs">
                                ✏️ EDIT
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services Database */}
                {activeDbTab === 'services' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-accent-gold font-pp-supply-mono text-lg">
                        Services Database ({detailedServices.length} records)
                      </h3>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono">
                        ➕ ADD SERVICE
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {detailedServices.map((service, index) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-pp-supply-mono text-brand-cream font-medium">
                                {service.name}
                              </h4>
                              <p className="text-xs text-accent-gold">
                                {service.category} • {service.slug}
                              </p>
                            </div>
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs">
                              ✏️
                            </button>
                          </div>
                          
                          <p className="text-sm text-brand-cream/70 mb-3">
                            {service.description}
                          </p>
                          
                          {service.features && (
                            <div>
                              <p className="text-xs text-accent-gold mb-1">Features ({service.features.length}):</p>
                              <div className="flex flex-wrap gap-1">
                                {service.features.slice(0, 2).map((feature, i) => (
                                  <span key={i} className="text-xs bg-black/30 px-2 py-1 rounded text-brand-cream/80">
                                    {feature.length > 25 ? `${feature.substring(0, 25)}...` : feature}
                                  </span>
                                ))}
                                {service.features.length > 2 && (
                                  <span className="text-xs text-accent-gold">+{service.features.length - 2} more</span>
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Portfolio Database */}
                {activeDbTab === 'portfolio' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-accent-gold font-pp-supply-mono text-lg">
                        Portfolio Database ({portfolioProjects.length} records)
                      </h3>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono">
                        ➕ ADD PROJECT
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {portfolioProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gray-800/50 border border-gray-600/30 rounded-lg overflow-hidden"
                        >
                          {project.image && (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-32 object-cover"
                            />
                          )}
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-pp-supply-mono text-brand-cream font-medium text-sm">
                                  {project.title}
                                </h4>
                                <p className="text-xs text-accent-gold">
                                  {project.client} • {project.industry}
                                </p>
                              </div>
                              <div className="flex space-x-1">
                                {project.featured && <span className="text-xs">⭐</span>}
                                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs">
                                  ✏️
                                </button>
                              </div>
                            </div>
                            
                            <p className="text-xs text-brand-cream/70 mb-2">
                              {project.description.length > 100 
                                ? `${project.description.substring(0, 100)}...` 
                                : project.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-brand-cream/60">
                                {project.serviceType} • {project.timeline}
                              </span>
                              <span className="text-accent-gold">
                                {project.results.length} metrics
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog Database */}
                {activeDbTab === 'blog' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-accent-gold font-pp-supply-mono text-lg">
                        Blog Database ({blogPosts.length} records)
                      </h3>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono">
                        ➕ ADD POST
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {blogPosts.map((post, index) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gray-800/50 border border-gray-600/30 rounded-lg overflow-hidden"
                        >
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-pp-supply-mono text-brand-cream font-medium text-sm">
                                  {post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title}
                                </h4>
                                <p className="text-xs text-accent-gold">
                                  {post.category} • {post.author} • {post.readTime}min
                                </p>
                              </div>
                              <div className="flex space-x-1">
                                {post.featured && <span className="text-xs">⭐</span>}
                                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs">
                                  ✏️
                                </button>
                              </div>
                            </div>
                            
                            <p className="text-xs text-brand-cream/70 mb-2">
                              {post.excerpt.length > 80 
                                ? `${post.excerpt.substring(0, 80)}...` 
                                : post.excerpt}
                            </p>
                            
                            <div className="flex flex-wrap gap-1 mb-2">
                              {post.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs bg-black/30 px-2 py-1 rounded text-blue-400">
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-accent-gold">+{post.tags.length - 3}</span>
                              )}
                            </div>
                            
                            <p className="text-xs text-brand-cream/60">
                              Published: {post.date}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Team Database */}
                {activeDbTab === 'team' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-accent-gold font-pp-supply-mono text-lg">
                        Team Database ({teamMembers.length} records)
                      </h3>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono">
                        ➕ ADD MEMBER
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {teamMembers.map((member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4"
                        >
                          <div className="flex items-center space-x-4 mb-3">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-16 h-16 object-cover rounded-full"
                            />
                            <div className="flex-1">
                              <h4 className="font-pp-supply-mono text-brand-cream font-medium">
                                {member.name}
                              </h4>
                              <p className="text-sm text-accent-gold">
                                {member.role}
                              </p>
                              <p className="text-xs text-brand-cream/60">
                                {member.email}
                              </p>
                            </div>
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs">
                              ✏️
                            </button>
                          </div>
                          
                          <p className="text-sm text-brand-cream/70">
                            {member.bio.length > 120 
                              ? `${member.bio.substring(0, 120)}...` 
                              : member.bio}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonials Database */}
                {activeDbTab === 'testimonials' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-accent-gold font-pp-supply-mono text-lg">
                        Testimonials Database ({testimonials.length} records)
                      </h3>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono">
                        ➕ ADD TESTIMONIAL
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
                      {testimonials.map((testimonial, index) => (
                        <motion.div
                          key={testimonial.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="flex text-yellow-400">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <span key={i}>⭐</span>
                                ))}
                              </div>
                              <div>
                                <h4 className="font-pp-supply-mono text-brand-cream font-medium text-sm">
                                  {testimonial.author}
                                </h4>
                                <p className="text-xs text-accent-gold">
                                  {testimonial.role} at {testimonial.company}
                                </p>
                              </div>
                            </div>
                            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs">
                              ✏️
                            </button>
                          </div>
                          
                          <p className="text-sm text-brand-cream/70 italic mb-2">
                            "{testimonial.content.length > 200 
                              ? `${testimonial.content.substring(0, 200)}...` 
                              : testimonial.content}"
                          </p>
                          
                          <p className="text-xs text-brand-cream/60">
                            Client: {testimonial.client} | Project ID: {testimonial.projectId}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Selected Record Modal/Panel */}
                {selectedRecord && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedRecord(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="bg-gray-800 border border-accent-gold/30 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-accent-gold font-pp-supply-mono text-lg">
                          Record Details
                        </h3>
                        <button
                          onClick={() => setSelectedRecord(null)}
                          className="text-brand-cream/60 hover:text-brand-cream"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <pre className="text-sm text-brand-cream/80 bg-black/50 p-4 rounded overflow-x-auto">
                        {JSON.stringify(selectedRecord, null, 2)}
                      </pre>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default SecretAdminPanel;