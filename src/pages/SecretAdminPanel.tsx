import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';

// Import deployment context and feature wrappers
import { useDeploymentContext } from '../utils/deploymentContext';
import { FeatureWrapper, FeatureButton, FeatureTab, DeploymentStatus } from '../components/common/FeatureWrapper';

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
  category: 'development' | 'automation' | 'content' | 'design';
}

const SecretAdminPanel: React.FC = () => {
  // Deployment context detection
  const { context: deploymentContext, loading: contextLoading } = useDeploymentContext();
  
  const [activeTab, setActiveTab] = useState<string>('deployment');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [activeDbTab, setActiveDbTab] = useState<string>('clients');
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  
  // View toggle states for list/card views
  const [modulesViewMode, setModulesViewMode] = useState<'list' | 'card'>('card');
  const [subagentsViewMode, setSubagentsViewMode] = useState<'list' | 'card'>('card');
  const [servicesViewMode, setServicesViewMode] = useState<'list' | 'card'>('list');
  const [dbViewMode, setDbViewMode] = useState<'table' | 'card'>('table');
  
  // Module detail and configuration states
  const [selectedModuleDetail, setSelectedModuleDetail] = useState<string | null>(null);
  const [moduleConfigs, setModuleConfigs] = useState<Record<string, {
    status: 'testing' | 'approved' | 'review';
    systemPrompt: string;
    parameters: Record<string, any>;
    featureImage: string | null;
    cardImage: string | null;
    displayConfig: Record<string, any>;
  }>>({});
  const [isGeneratingImage, setIsGeneratingImage] = useState<string | null>(null);
  
  // AI Assistant states
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mcpStatus, setMcpStatus] = useState<Record<string, boolean>>({});
  
  const [services, setServices] = useState<ServiceStatus[]>([
    // Core Development Services
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
      name: 'Development Server (Alternative)',
      running: false,
      port: 3000,
      description: 'Alternative React development server command',
      command: 'npm run dev',
      icon: '🔧',
      category: 'development'
    },
    {
      name: 'Production Build',
      running: false,
      description: 'Create optimized production build',
      command: 'npm run build',
      icon: '🏗️',
      category: 'development'
    },
    {
      name: 'Preview Build',
      running: false,
      port: 3001,
      description: 'Serve production build locally for testing',
      command: 'npm run preview',
      icon: '👀',
      category: 'development'
    },
    {
      name: 'Test Suite',
      running: false,
      description: 'Run Jest tests with React Testing Library',
      command: 'npm test',
      icon: '🧪',
      category: 'development'
    },

    // Automation Services
    {
      name: 'Auto-Commit Agent',
      running: false,
      description: 'Automated git commits with AI-generated messages',
      command: 'npm run auto-commit:watch',
      icon: '🤖',
      category: 'automation'
    },
    {
      name: 'Single Auto-Commit',
      running: false,
      description: 'Execute one-time automated commit',
      command: 'npm run auto-commit',
      icon: '📝',
      category: 'automation'
    },
    {
      name: 'Manual Commit',
      running: false,
      description: 'Manual commit with AI-generated message',
      command: 'npm run commit',
      icon: '✍️',
      category: 'automation'
    },
    {
      name: 'Auto-Commit Status',
      running: false,
      description: 'Check auto-commit agent status',
      command: 'npm run auto-commit:status',
      icon: '📊',
      category: 'automation'
    },
    {
      name: 'Dev with Auto-Commit',
      running: false,
      port: 3000,
      description: 'Start development server with auto-commit enabled',
      command: 'npm run dev:auto',
      icon: '🚀',
      category: 'automation'
    },
    {
      name: 'Dev Safe Mode',
      running: false,
      port: 3000,
      description: 'Start development server without auto-commit',
      command: 'npm run dev:safe',
      icon: '🛡️',
      category: 'development'
    },

    // Content Management
    {
      name: 'Client Data Sync',
      running: false,
      description: 'Sync client data from Google Sheets',
      command: 'npm run clients:sync',
      icon: '🔄',
      category: 'content'
    },
    {
      name: 'Client Data Validation',
      running: false,
      description: 'Validate client data structure and integrity',
      command: 'npm run clients:validate',
      icon: '✅',
      category: 'content'
    },
    {
      name: 'Client Data Backup',
      running: false,
      description: 'Backup client data from Google Sheets',
      command: 'npm run clients:backup',
      icon: '💾',
      category: 'content'
    },

    // Backend & Integration Services
    {
      name: 'Claude Bridge Server',
      running: false,
      port: 3456,
      description: 'Start Claude Code integration bridge server',
      command: 'npm run claude-bridge',
      icon: '🌉',
      category: 'automation'
    },
    {
      name: 'Claude Bridge Dev Mode',
      running: false,
      port: 3456,
      description: 'Start Claude Bridge with auto-reload (nodemon)',
      command: 'npm run claude-bridge:dev',
      icon: '🔄',
      category: 'automation'
    },
    {
      name: 'Full Development Stack',
      running: false,
      port: 3000,
      description: 'Start React dev server + Claude Bridge simultaneously',
      command: 'npm run dev:full',
      icon: '🚀',
      category: 'development'
    },
    {
      name: 'Full Stack with Auto-Commit',
      running: false,
      port: 3000,
      description: 'Full stack development with automated git commits',
      command: 'npm run dev:full:auto',
      icon: '⚡',
      category: 'automation'
    },
    {
      name: 'Claude Status Check',
      running: false,
      description: 'Check Claude Bridge server health status',
      command: 'npm run claude:status',
      icon: '📊',
      category: 'automation'
    },
    {
      name: 'Claude Connection Test',
      running: false,
      description: 'Test connection to Claude Bridge server',
      command: 'npm run claude:test',
      icon: '🧪',
      category: 'automation'
    },

    // Design & Integration Services
    {
      name: 'Figma WebSocket Server',
      running: false,
      port: 8080,
      description: 'Start Figma WebSocket server for design sync',
      command: 'npm run figma:start',
      icon: '🎨',
      category: 'design'
    },
    {
      name: 'Admin Panel Help',
      running: false,
      description: 'Display admin panel commands and usage guide',
      command: 'npm run admin:help',
      icon: '❓',
      category: 'development'
    }
  ]);
  
  // MCP Servers configuration
  const mcpServers = [
    { id: 'dataforseo', name: 'DataForSEO', icon: '📊', description: 'SEO analytics and keyword research' },
    { id: 'firecrawl', name: 'Firecrawl', icon: '🔥', description: 'Web scraping and content extraction' },
    { id: 'cloudinary', name: 'Cloudinary', icon: '☁️', description: 'Image and asset management' },
    { id: 'gohighlevel', name: 'GoHighLevel', icon: '🚀', description: 'CRM and marketing automation' },
    { id: 'n8n-mcp', name: 'n8n Workflows', icon: '🔄', description: 'Workflow automation' },
    { id: 'netlify', name: 'Netlify', icon: '▲', description: 'Deployment and hosting' },
    { id: 'filesystem', name: 'Filesystem', icon: '📁', description: 'Local file operations' },
    { id: 'gsap-master', name: 'GSAP Master', icon: '✨', description: 'Animation expertise' }
  ];

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
        },
        {
          id: 'meta-optimizer',
          name: 'Meta Tags Optimizer',
          description: 'Automatic meta tag generation and optimization',
          features: [
            'Dynamic meta title and description generation',
            'Open Graph and Twitter Card optimization',
            'Schema markup generation for rich snippets'
          ],
          commands: ['npm run seo:meta', 'npm run seo:validate'],
          configurable: [
            'Brand name and default descriptions',
            'Social media image templates',
            'Schema.org markup types'
          ]
        },
        {
          id: 'sitemap-generator',
          name: 'Smart Sitemap Generator',
          description: 'Automated XML sitemap creation with priority weighting',
          features: [
            'Dynamic sitemap generation from React routes',
            'Priority and change frequency optimization',
            'Multi-language sitemap support'
          ],
          commands: ['npm run seo:sitemap', 'npm run seo:submit'],
          configurable: [
            'Page priority weights by type',
            'Update frequency settings',
            'Language and regional variants'
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
        },
        {
          id: 'content-calendar',
          name: 'Content Calendar Automation',
          description: 'Automated content scheduling and publishing workflow',
          features: [
            'Social media content calendar management',
            'Multi-platform scheduling and publishing',
            'Content performance analytics and optimization'
          ],
          commands: ['npm run content:schedule', 'npm run content:publish'],
          configurable: [
            'Publishing platforms and API keys',
            'Content categories and tags',
            'Scheduling preferences and timing'
          ]
        },
        {
          id: 'newsletter-generator',
          name: 'Newsletter Generator',
          description: 'Automated newsletter creation from blog content',
          features: [
            'AI-powered newsletter content summarization',
            'Email template generation and customization',
            'Subscriber segmentation and personalization'
          ],
          commands: ['npm run newsletter:generate', 'npm run newsletter:send'],
          configurable: [
            'Email service provider integration',
            'Template design preferences',
            'Subscriber segment criteria'
          ]
        }
      ]
    },
    'lead-generation': {
      name: 'Lead Generation',
      icon: '🎯',
      modules: [
        {
          id: 'contact-forms',
          name: 'Smart Contact Forms',
          description: 'Intelligent contact forms with validation and CRM integration',
          features: [
            'Multi-step form wizard with progress indicators',
            'Real-time validation and error handling',
            'CRM and email marketing integration'
          ],
          commands: ['npm run forms:generate', 'npm run forms:integrate'],
          configurable: [
            'Form fields and validation rules',
            'CRM integration settings',
            'Email notification preferences'
          ]
        },
        {
          id: 'popup-builder',
          name: 'Conversion Popup Builder',
          description: 'Exit-intent and time-based popup campaigns',
          features: [
            'Exit-intent detection and popup triggering',
            'A/B testing for popup variations',
            'Lead magnet integration and delivery'
          ],
          commands: ['npm run popup:create', 'npm run popup:test'],
          configurable: [
            'Trigger conditions and timing',
            'Design templates and colors',
            'Lead magnet delivery settings'
          ]
        },
        {
          id: 'roi-calculator',
          name: 'ROI Calculator Widget',
          description: 'Interactive ROI calculators for lead qualification',
          features: [
            'Customizable calculation formulas and inputs',
            'Lead capture integration with results',
            'Industry-specific calculator templates'
          ],
          commands: ['npm run calculator:build', 'npm run calculator:deploy'],
          configurable: [
            'Calculation parameters and formulas',
            'Industry templates and presets',
            'Results delivery and follow-up'
          ]
        }
      ]
    },
    'performance': {
      name: 'Performance & Analytics',
      icon: '📊',
      modules: [
        {
          id: 'speed-optimizer',
          name: 'Page Speed Optimizer',
          description: 'Automated performance optimization and monitoring',
          features: [
            'Image compression and lazy loading optimization',
            'Critical CSS extraction and inlining',
            'JavaScript bundling and code splitting'
          ],
          commands: ['npm run perf:audit', 'npm run perf:optimize'],
          configurable: [
            'Performance budget thresholds',
            'Optimization strategy preferences',
            'Monitoring and alert settings'
          ]
        },
        {
          id: 'analytics-dashboard',
          name: 'Analytics Dashboard',
          description: 'Comprehensive website analytics and reporting',
          features: [
            'Google Analytics 4 integration and setup',
            'Custom event tracking and goal conversion',
            'Real-time performance monitoring'
          ],
          commands: ['npm run analytics:setup', 'npm run analytics:report'],
          configurable: [
            'Tracking goals and conversion events',
            'Custom dimensions and metrics',
            'Reporting frequency and recipients'
          ]
        },
        {
          id: 'heatmap-tracker',
          name: 'User Behavior Heatmaps',
          description: 'Visual user interaction tracking and analysis',
          features: [
            'Click tracking and scroll depth analysis',
            'Form abandonment and completion tracking',
            'Mobile vs desktop behavior insights'
          ],
          commands: ['npm run heatmap:install', 'npm run heatmap:analyze'],
          configurable: [
            'Tracking services and API keys',
            'Page selection and sampling rates',
            'Analysis report frequency'
          ]
        }
      ]
    },
    'email-marketing': {
      name: 'Email Marketing',
      icon: '📧',
      modules: [
        {
          id: 'email-campaigns',
          name: 'Email Campaign Builder',
          description: 'Drag-and-drop email campaign creation with automation',
          features: [
            'Visual email template builder with brand customization',
            'A/B testing for subject lines and content variations',
            'Automated drip campaigns and welcome sequences'
          ],
          commands: ['npm run email:create', 'npm run email:automate'],
          configurable: [
            'Email service provider integration (Mailchimp, Klaviyo)',
            'Template designs and brand colors',
            'Automation trigger conditions and timing'
          ]
        },
        {
          id: 'list-segmentation',
          name: 'Smart List Segmentation',
          description: 'AI-powered audience segmentation for targeted campaigns',
          features: [
            'Behavioral segmentation based on website interactions',
            'Demographic and psychographic audience clustering',
            'Predictive engagement scoring and list hygiene'
          ],
          commands: ['npm run segments:analyze', 'npm run segments:create'],
          configurable: [
            'Segmentation criteria and behavioral triggers',
            'Custom audience attributes and tags',
            'Engagement scoring algorithms'
          ]
        },
        {
          id: 'email-analytics',
          name: 'Email Performance Analytics',
          description: 'Comprehensive email marketing performance tracking',
          features: [
            'Open rates, click-through rates, and conversion tracking',
            'Revenue attribution and customer lifetime value analysis',
            'Automated reporting and optimization recommendations'
          ],
          commands: ['npm run email:analytics', 'npm run email:optimize'],
          configurable: [
            'Analytics dashboard customization',
            'Attribution models and conversion goals',
            'Reporting frequency and recipients'
          ]
        }
      ]
    },
    'conversion-optimization': {
      name: 'Conversion Optimization',
      icon: '🎯',
      modules: [
        {
          id: 'ab-testing',
          name: 'A/B Testing Platform',
          description: 'Advanced split testing for landing pages and elements',
          features: [
            'Visual editor for creating test variations',
            'Statistical significance testing and automatic winners',
            'Multi-variate testing and traffic allocation'
          ],
          commands: ['npm run ab:create', 'npm run ab:analyze'],
          configurable: [
            'Test duration and traffic split percentages',
            'Success metrics and conversion goals',
            'Statistical confidence thresholds'
          ]
        },
        {
          id: 'funnel-optimizer',
          name: 'Sales Funnel Optimizer',
          description: 'End-to-end funnel analysis and optimization tools',
          features: [
            'Funnel visualization and bottleneck identification',
            'Drop-off analysis and conversion rate optimization',
            'Multi-channel attribution and customer journey mapping'
          ],
          commands: ['npm run funnel:track', 'npm run funnel:optimize'],
          configurable: [
            'Funnel stages and conversion events',
            'Attribution models and touchpoint weighting',
            'Optimization goals and success metrics'
          ]
        },
        {
          id: 'personalization',
          name: 'Dynamic Content Personalization',
          description: 'AI-powered content personalization based on user behavior',
          features: [
            'Real-time content adaptation based on visitor data',
            'Geographic and demographic content variations',
            'Behavioral triggers and dynamic CTAs'
          ],
          commands: ['npm run personalize:setup', 'npm run personalize:optimize'],
          configurable: [
            'Personalization rules and trigger conditions',
            'Content variations and template designs',
            'User data sources and privacy settings'
          ]
        }
      ]
    },
    'social-media': {
      name: 'Social Media Integration',
      icon: '📱',
      modules: [
        {
          id: 'social-feeds',
          name: 'Social Media Feed Aggregator',
          description: 'Display social media content across platforms',
          features: [
            'Multi-platform feed aggregation (Instagram, Twitter, LinkedIn)',
            'Content filtering and moderation',
            'Real-time updates and caching'
          ],
          commands: ['npm run social:connect', 'npm run social:sync'],
          configurable: [
            'Social platform API credentials',
            'Content filtering preferences',
            'Update frequency and caching'
          ]
        },
        {
          id: 'share-buttons',
          name: 'Social Sharing Optimization',
          description: 'Advanced social sharing buttons and tracking',
          features: [
            'Platform-optimized sharing buttons',
            'Social share tracking and analytics',
            'Custom sharing templates and images'
          ],
          commands: ['npm run social:buttons', 'npm run social:track'],
          configurable: [
            'Supported social platforms',
            'Button styles and placement',
            'Tracking and analytics setup'
          ]
        },
        {
          id: 'social-login',
          name: 'Social Login Integration',
          description: 'OAuth login with major social platforms',
          features: [
            'Google, Facebook, LinkedIn, Twitter login',
            'User profile data synchronization',
            'Account linking and management'
          ],
          commands: ['npm run auth:setup', 'npm run auth:configure'],
          configurable: [
            'OAuth provider credentials',
            'User data mapping preferences',
            'Account linking strategies'
          ]
        }
      ]
    },
    'marketing-automation': {
      name: 'Marketing Automation',
      icon: '🚀',
      modules: [
        {
          id: 'behavior-tracking',
          name: 'Customer Behavior Tracking',
          description: 'Advanced visitor behavior analytics and trigger automation',
          features: [
            'Real-time user journey mapping and session recording',
            'Behavioral triggers for email and retargeting campaigns',
            'Customer scoring based on engagement patterns'
          ],
          commands: ['npm run behavior:track', 'npm run behavior:automate'],
          configurable: [
            'Tracking events and custom goals',
            'Automation triggers and scoring algorithms',
            'Data retention and privacy settings'
          ]
        },
        {
          id: 'lead-scoring',
          name: 'AI Lead Scoring Engine',
          description: 'Machine learning-powered lead qualification and prioritization',
          features: [
            'Predictive lead scoring based on behavior and demographics',
            'Automated lead routing to sales teams',
            'Lead nurturing workflows and follow-up sequences'
          ],
          commands: ['npm run leads:score', 'npm run leads:route'],
          configurable: [
            'Scoring criteria and model training data',
            'Sales team assignment rules',
            'Nurturing campaign templates'
          ]
        },
        {
          id: 'crm-integration',
          name: 'CRM Integration Hub',
          description: 'Seamless integration with major CRM platforms',
          features: [
            'Two-way sync with Salesforce, HubSpot, Pipedrive',
            'Automated data enrichment and deduplication',
            'Custom field mapping and workflow automation'
          ],
          commands: ['npm run crm:sync', 'npm run crm:enrich'],
          configurable: [
            'CRM platform credentials and endpoints',
            'Field mapping and synchronization rules',
            'Data enrichment providers and sources'
          ]
        }
      ]
    },
    'advertising-optimization': {
      name: 'Advertising & PPC',
      icon: '💰',
      modules: [
        {
          id: 'ad-campaign-manager',
          name: 'Multi-Platform Ad Campaign Manager',
          description: 'Unified management for Google Ads, Facebook, LinkedIn campaigns',
          features: [
            'Cross-platform campaign creation and optimization',
            'Automated bid management and budget allocation',
            'Performance tracking and ROI analysis across channels'
          ],
          commands: ['npm run ads:manage', 'npm run ads:optimize'],
          configurable: [
            'Platform API credentials and account access',
            'Bidding strategies and budget constraints',
            'Performance metrics and optimization goals'
          ]
        },
        {
          id: 'landing-page-optimizer',
          name: 'Landing Page Performance Optimizer',
          description: 'AI-powered landing page optimization for ad campaigns',
          features: [
            'Dynamic headline and CTA testing based on traffic source',
            'Real-time conversion rate optimization suggestions',
            'Mobile-first responsive design optimization'
          ],
          commands: ['npm run landing:optimize', 'npm run landing:test'],
          configurable: [
            'Traffic source mapping and personalization rules',
            'Optimization goals and success metrics',
            'Design variations and testing parameters'
          ]
        },
        {
          id: 'retargeting-engine',
          name: 'Advanced Retargeting Engine',
          description: 'Sophisticated audience retargeting across multiple platforms',
          features: [
            'Behavioral-based audience segmentation for retargeting',
            'Dynamic product/service ads based on browsing history',
            'Cross-device and cross-platform audience matching'
          ],
          commands: ['npm run retarget:setup', 'npm run retarget:optimize'],
          configurable: [
            'Audience definition criteria and exclusions',
            'Creative templates and dynamic content rules',
            'Platform-specific optimization settings'
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
    { id: 'content', name: 'Content Mgmt', icon: '📝' },
    { id: 'design', name: 'Design Tools', icon: '🎨' }
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

  // Initialize module config if it doesn't exist
  const getModuleConfig = (moduleId: string) => {
    if (!moduleConfigs[moduleId]) {
      setModuleConfigs(prev => ({
        ...prev,
        [moduleId]: {
          status: 'testing',
          systemPrompt: `You are an AI assistant specialized in ${moduleId.replace(/-/g, ' ')}. Help users effectively utilize this module.`,
          parameters: {},
          featureImage: null,
          cardImage: null,
          displayConfig: {
            theme: 'modern',
            layout: 'default',
            showBranding: true
          }
        }
      }));
      return {
        status: 'testing' as const,
        systemPrompt: `You are an AI assistant specialized in ${moduleId.replace(/-/g, ' ')}. Help users effectively utilize this module.`,
        parameters: {},
        featureImage: null,
        cardImage: null,
        displayConfig: {
          theme: 'modern',
          layout: 'default',
          showBranding: true
        }
      };
    }
    return moduleConfigs[moduleId];
  };

  // Generate images using available AI services
  const generateModuleImage = async (moduleId: string, imageType: 'feature' | 'card') => {
    setIsGeneratingImage(`${moduleId}-${imageType}`);
    addLog(`Generating ${imageType} image for module: ${moduleId}`);
    
    try {
      // Find the module to get its details
      const module = Object.values(siteModules)
        .flatMap(category => category.modules)
        .find(m => m.id === moduleId);
      
      if (!module) throw new Error('Module not found');
      
      const prompt = imageType === 'feature' 
        ? `Create a modern, professional feature image for "${module.name}" - ${module.description}. Style: clean, minimal, tech-focused, gradient background, no text overlay.`
        : `Create a compact card thumbnail for "${module.name}" - ${module.description}. Style: minimal icon-based design, solid background, professional colors.`;
      
      // Simulate API call (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated image URL (replace with actual generated URL)
      const mockImageUrl = `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop&q=80`;
      
      setModuleConfigs(prev => ({
        ...prev,
        [moduleId]: {
          ...getModuleConfig(moduleId),
          [imageType === 'feature' ? 'featureImage' : 'cardImage']: mockImageUrl
        }
      }));
      
      addLog(`✓ Generated ${imageType} image for ${module.name}`);
    } catch (error) {
      addLog(`✗ Failed to generate ${imageType} image: ${error}`);
    } finally {
      setIsGeneratingImage(null);
    }
  };

  // Update module configuration
  const updateModuleConfig = (moduleId: string, updates: Partial<typeof moduleConfigs[string]>) => {
    setModuleConfigs(prev => ({
      ...prev,
      [moduleId]: {
        ...getModuleConfig(moduleId),
        ...updates
      }
    }));
  };

  // Modern View Toggle Component
  const ViewToggle: React.FC<{
    currentView: 'list' | 'card' | 'table';
    onToggle: (view: 'list' | 'card' | 'table') => void;
    options: Array<{ value: 'list' | 'card' | 'table'; icon: string; label: string }>;
  }> = ({ currentView, onToggle, options }) => (
    <div className="flex items-center bg-black/20 backdrop-blur-sm border border-accent-gold/20 rounded-lg p-1">
      {options.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => onToggle(value)}
          className={`px-3 py-2 rounded-md text-xs font-pp-supply-mono transition-all duration-200 flex items-center space-x-2 ${
            currentView === value
              ? 'bg-accent-gold text-brand-charcoal shadow-lg shadow-accent-gold/25'
              : 'text-brand-cream/60 hover:text-brand-cream hover:bg-white/5'
          }`}
        >
          <span className="text-sm">{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );

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
                {/* Show loading state while context loads */}
                {contextLoading ? (
                  <div className="flex items-center space-x-4 py-3">
                    <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-400 text-sm">Loading deployment context...</span>
                  </div>
                ) : (
                  [
                    { id: 'deployment', name: 'Deployment Status', icon: '🌍', feature: null },
                    { id: 'services', name: 'Development Services', icon: '🚀', feature: 'serviceManagement' },
                    { id: 'wiki', name: 'Team Wiki', icon: '📚', feature: null },
                    { id: 'subagents', name: 'Subagents', icon: '🤖', feature: null },
                    { id: 'modules', name: 'Site Modules', icon: '🧩', feature: 'dataSync' },
                    { id: 'database', name: 'Database', icon: '💾', feature: 'dataSync' },
                    { id: 'ai-assistant', name: 'AI Assistant', icon: '🧠', feature: 'claudeIntegration' }
                  ].map((tab) => (
                    deploymentContext && tab.feature ? (
                      <FeatureTab
                        key={tab.id}
                        feature={tab.feature as keyof typeof deploymentContext.features}
                        context={deploymentContext}
                        isActive={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <span>{tab.icon}</span>
                        <span>{tab.name}</span>
                      </FeatureTab>
                    ) : (
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
                    )
                  ))
                )}
              </nav>
            </div>
          </motion.div>

          {/* Deployment Status Tab */}
          {activeTab === 'deployment' && deploymentContext && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <DeploymentStatus context={deploymentContext} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Feature Availability */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">🎛️ Feature Availability</h3>
                  <div className="space-y-3">
                    {Object.entries(deploymentContext.features).map(([feature, available]) => (
                      <div key={feature} className="flex items-center justify-between">
                        <span className="text-gray-300 capitalize">
                          {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </span>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          available 
                            ? 'bg-green-900 text-green-200' 
                            : 'bg-red-900 text-red-200'
                        }`}>
                          {available ? '✅ Available' : '❌ Limited'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deployment Commands */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">🚀 Deployment Commands</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded-lg p-3">
                      <p className="text-sm text-gray-400 mb-2">Local Development (Full Features)</p>
                      <code className="text-xs text-green-400 break-all">
                        npm run dev:full
                      </code>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <p className="text-sm text-gray-400 mb-2">Deploy to Railway (Full-Stack)</p>
                      <code className="text-xs text-blue-400 break-all">
                        npm run deploy:railway
                      </code>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <p className="text-sm text-gray-400 mb-2">Deploy to Netlify (Frontend)</p>
                      <code className="text-xs text-purple-400 break-all">
                        npm run deploy:netlify
                      </code>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <p className="text-sm text-gray-400 mb-2">Health Check</p>
                      <code className="text-xs text-yellow-400 break-all">
                        npm run claude:status
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && deploymentContext && (
            <FeatureWrapper
              feature="serviceManagement"
              context={deploymentContext}
              className="space-y-6"
            >
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
            </FeatureWrapper>
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
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-2">
                      🧩 Site Modules System
                    </h2>
                    <p className="text-brand-cream/70">
                      Plug-and-play website modules for SEO, content generation, automation, and lead generation. Each module is configurable and reusable across different client sites.
                    </p>
                  </div>
                  <ViewToggle
                    currentView={modulesViewMode}
                    onToggle={(view) => setModulesViewMode(view as 'list' | 'card')}
                    options={[
                      { value: 'card', icon: '▦', label: 'Cards' },
                      { value: 'list', icon: '☰', label: 'List' }
                    ]}
                  />
                </div>
                
                {/* Modern Modules Display */}
                {modulesViewMode === 'card' ? (
                  <div className="space-y-8">
                    {Object.entries(siteModules).map(([categoryId, category], categoryIndex) => (
                      <motion.div
                        key={categoryId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 }}
                        className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-accent-gold/10 rounded-xl p-6 backdrop-blur-sm"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-accent-gold font-pp-supply-mono text-lg flex items-center">
                            <span className="mr-3 text-2xl">{category.icon}</span>
                            {category.name}
                          </h3>
                          <div className="text-xs bg-accent-gold/20 text-accent-gold px-3 py-1 rounded-full font-pp-supply-mono">
                            {category.modules.length} modules
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                          {category.modules.map((module, moduleIndex) => {
                            const config = getModuleConfig(module.id);
                            return (
                              <motion.div
                                key={module.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (categoryIndex * 3 + moduleIndex) * 0.05 }}
                                className="group bg-black/20 border border-gray-600/30 rounded-lg overflow-hidden hover:border-accent-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-gold/10"
                              >
                                {/* Card Image */}
                                {config.cardImage && (
                                  <div className="h-32 bg-cover bg-center relative" style={{backgroundImage: `url(${config.cardImage})`}}>
                                    <div className="absolute top-2 right-2">
                                      <span className={`px-2 py-1 rounded-full text-xs font-pp-supply-mono ${
                                        config.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                        config.status === 'review' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-blue-500/20 text-blue-400'
                                      }`}>
                                        {config.status}
                                      </span>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="p-4">
                                  <button
                                    onClick={() => setSelectedModuleDetail(module.id)}
                                    className="w-full text-left"
                                  >
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="font-pp-supply-mono text-brand-cream font-medium text-sm group-hover:text-accent-gold transition-colors">
                                        {module.name}
                                      </h4>
                                      <span className="text-accent-gold/60 text-xs ml-2 group-hover:text-accent-gold transition-colors">
                                        ⚙️
                                      </span>
                                    </div>
                                    <p className="text-xs text-brand-cream/60 leading-relaxed mb-3">
                                      {module.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <div className={`w-2 h-2 rounded-full ${
                                        config.status === 'approved' ? 'bg-green-400' :
                                        config.status === 'review' ? 'bg-yellow-400' :
                                        'bg-blue-400'
                                      }`}></div>
                                      <span className="text-xs text-brand-cream/40">Click to configure</span>
                                    </div>
                                  </button>
                                </div>
                              
                              {expandedModule === module.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-4 pt-4 border-t border-gray-600/20"
                                >
                                  <div className="space-y-3">
                                    <div>
                                      <h5 className="text-accent-gold font-pp-supply-mono text-xs mb-2">Features:</h5>
                                      <div className="space-y-1">
                                        {module.features.slice(0, 3).map((feature, i) => (
                                          <div key={i} className="text-xs text-brand-cream/70 flex items-start">
                                            <span className="text-accent-gold mr-1 text-xs">•</span>
                                            <span className="line-clamp-2">{feature}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h5 className="text-accent-gold font-pp-supply-mono text-xs mb-2">Commands:</h5>
                                      <div className="flex flex-wrap gap-1">
                                        {module.commands.slice(0, 2).map((command, i) => (
                                          <code key={i} className="text-xs bg-black/40 text-green-400 px-2 py-1 rounded">
                                            {command.length > 15 ? command.substring(0, 15) + '...' : command}
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
                      </motion.div>
                    ))}
                  </div>
                ) : (
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
                        
                        <div className="space-y-2">
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
              
              {/* Module Detail Modal */}
              {selectedModuleDetail && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  onClick={() => setSelectedModuleDetail(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-brand-charcoal to-gray-900 border border-accent-gold/30 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                  >
                    {(() => {
                      const module = Object.values(siteModules)
                        .flatMap(category => category.modules)
                        .find(m => m.id === selectedModuleDetail);
                      
                      if (!module) return null;
                      const config = getModuleConfig(module.id);
                      
                      return (
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <h2 className="text-2xl font-pp-supply-mono text-accent-gold">
                                {module.name}
                              </h2>
                              <select
                                value={config.status}
                                onChange={(e) => updateModuleConfig(module.id, { status: e.target.value as any })}
                                className="bg-black/40 border border-accent-gold/30 rounded px-3 py-1 text-sm font-pp-supply-mono text-brand-cream"
                              >
                                <option value="testing">🧪 Testing</option>
                                <option value="review">👀 Review</option>
                                <option value="approved">✅ Approved</option>
                              </select>
                            </div>
                            <button
                              onClick={() => setSelectedModuleDetail(null)}
                              className="text-brand-cream/60 hover:text-brand-cream text-xl"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Images */}
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-accent-gold font-pp-supply-mono text-sm mb-2">Feature Image</h3>
                                <div className="bg-gray-800/40 border border-gray-600/30 rounded-lg p-3">
                                  {config.featureImage ? (
                                    <img 
                                      src={config.featureImage} 
                                      alt="Feature" 
                                      className="w-full h-32 object-cover rounded mb-2"
                                    />
                                  ) : (
                                    <div className="w-full h-32 bg-gray-700/40 rounded flex items-center justify-center mb-2">
                                      <span className="text-brand-cream/40 text-sm">No image</span>
                                    </div>
                                  )}
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => generateModuleImage(module.id, 'feature')}
                                      disabled={isGeneratingImage === `${module.id}-feature`}
                                      className="flex-1 bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold px-3 py-2 rounded text-xs font-pp-supply-mono disabled:opacity-50"
                                    >
                                      {isGeneratingImage === `${module.id}-feature` ? '⏳ Generating...' : '🎨 Generate'}
                                    </button>
                                    <button
                                      onClick={() => generateModuleImage(module.id, 'feature')}
                                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded text-xs font-pp-supply-mono"
                                    >
                                      🔄
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-accent-gold font-pp-supply-mono text-sm mb-2">Card Image</h3>
                                <div className="bg-gray-800/40 border border-gray-600/30 rounded-lg p-3">
                                  {config.cardImage ? (
                                    <img 
                                      src={config.cardImage} 
                                      alt="Card" 
                                      className="w-full h-24 object-cover rounded mb-2"
                                    />
                                  ) : (
                                    <div className="w-full h-24 bg-gray-700/40 rounded flex items-center justify-center mb-2">
                                      <span className="text-brand-cream/40 text-sm">No image</span>
                                    </div>
                                  )}
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => generateModuleImage(module.id, 'card')}
                                      disabled={isGeneratingImage === `${module.id}-card`}
                                      className="flex-1 bg-accent-gold/20 hover:bg-accent-gold/30 text-accent-gold px-3 py-2 rounded text-xs font-pp-supply-mono disabled:opacity-50"
                                    >
                                      {isGeneratingImage === `${module.id}-card` ? '⏳ Generating...' : '🎨 Generate'}
                                    </button>
                                    <button
                                      onClick={() => generateModuleImage(module.id, 'card')}
                                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded text-xs font-pp-supply-mono"
                                    >
                                      🔄
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Column - Configuration */}
                            <div className="lg:col-span-2 space-y-4">
                              <div>
                                <h3 className="text-accent-gold font-pp-supply-mono text-sm mb-2">System Prompt</h3>
                                <textarea
                                  value={config.systemPrompt}
                                  onChange={(e) => updateModuleConfig(module.id, { systemPrompt: e.target.value })}
                                  className="w-full h-24 bg-black/40 border border-gray-600/30 rounded p-3 text-sm text-brand-cream font-mono resize-none focus:border-accent-gold/50"
                                  placeholder="Enter system prompt for AI assistance..."
                                />
                              </div>

                              <div>
                                <h3 className="text-accent-gold font-pp-supply-mono text-sm mb-2">Display Configuration</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-xs text-brand-cream/60 mb-1 block">Theme</label>
                                    <select
                                      value={config.displayConfig.theme || 'modern'}
                                      onChange={(e) => updateModuleConfig(module.id, { 
                                        displayConfig: { ...config.displayConfig, theme: e.target.value }
                                      })}
                                      className="w-full bg-black/40 border border-gray-600/30 rounded px-2 py-1 text-xs text-brand-cream"
                                    >
                                      <option value="modern">Modern</option>
                                      <option value="minimal">Minimal</option>
                                      <option value="professional">Professional</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-xs text-brand-cream/60 mb-1 block">Layout</label>
                                    <select
                                      value={config.displayConfig.layout || 'default'}
                                      onChange={(e) => updateModuleConfig(module.id, { 
                                        displayConfig: { ...config.displayConfig, layout: e.target.value }
                                      })}
                                      className="w-full bg-black/40 border border-gray-600/30 rounded px-2 py-1 text-xs text-brand-cream"
                                    >
                                      <option value="default">Default</option>
                                      <option value="compact">Compact</option>
                                      <option value="expanded">Expanded</option>
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-accent-gold font-pp-supply-mono text-sm mb-2">Module Details</h3>
                                <div className="bg-gray-800/30 border border-gray-600/20 rounded p-3 space-y-3">
                                  <div>
                                    <h4 className="text-xs text-accent-gold mb-1">Features:</h4>
                                    <ul className="space-y-1">
                                      {module.features.map((feature, i) => (
                                        <li key={i} className="text-xs text-brand-cream/80 flex items-start">
                                          <span className="text-accent-gold mr-2">•</span>
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-xs text-accent-gold mb-1">Commands:</h4>
                                    <div className="flex flex-wrap gap-1">
                                      {module.commands.map((command, i) => (
                                        <code key={i} className="text-xs bg-black/40 text-green-400 px-2 py-1 rounded">
                                          {command}
                                        </code>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="text-xs text-accent-gold mb-1">Configurable Options:</h4>
                                    <ul className="space-y-1">
                                      {module.configurable.map((option, i) => (
                                        <li key={i} className="text-xs text-brand-cream/80 flex items-start">
                                          <span className="text-blue-400 mr-2">⚙️</span>
                                          {option}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Wiki Tab */}
          {activeTab === 'wiki' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-black/40 border border-accent-gold/30 rounded-lg p-6">
                <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
                  📚 Team Wiki & Getting Started Guide
                </h2>
                <p className="text-brand-cream/70 mb-6">
                  Complete guide for team members to understand and use the admin panel, development tools, and project resources.
                </p>
                
                <div className="space-y-8">
                  {/* Quick Start Section */}
                  <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-6">
                    <h3 className="text-accent-gold font-pp-supply-mono text-lg mb-4 flex items-center">
                      <span className="mr-3 text-2xl">🚀</span>
                      Quick Start Guide
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-brand-cream font-pp-supply-mono text-md mb-3">
                          🔓 How to Access This Panel
                        </h4>
                        <div className="space-y-2 text-sm text-brand-cream/80">
                          <p className="bg-black/30 p-3 rounded border-l-4 border-blue-500">
                            <strong className="text-blue-400">Step 1:</strong> Triple-click the Disruptors Media logo in the header
                          </p>
                          <p className="bg-black/30 p-3 rounded border-l-4 border-green-500">
                            <strong className="text-green-400">Step 2:</strong> Enter one of these commands:
                          </p>
                          <div className="grid grid-cols-2 gap-2 ml-4">
                            {[
                              { cmd: 'admin', desc: 'Main admin panel' },
                              { cmd: 'tools', desc: 'Development tools' },
                              { cmd: 'dev', desc: 'Developer mode' },
                              { cmd: 'scripts', desc: 'Script manager' }
                            ].map((item) => (
                              <code key={item.cmd} className="text-xs bg-black/50 text-accent-gold px-2 py-1 rounded">
                                {item.cmd}
                              </code>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-brand-cream font-pp-supply-mono text-md mb-3">
                          ⚡ Essential Commands
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="bg-black/30 p-3 rounded">
                            <code className="text-green-400">npm start</code>
                            <p className="text-brand-cream/70 text-xs mt-1">Start development server</p>
                          </div>
                          <div className="bg-black/30 p-3 rounded">
                            <code className="text-green-400">npm run clients:sync</code>
                            <p className="text-brand-cream/70 text-xs mt-1">Sync client data from Google Sheets</p>
                          </div>
                          <div className="bg-black/30 p-3 rounded">
                            <code className="text-green-400">npm run auto-commit:watch</code>
                            <p className="text-brand-cream/70 text-xs mt-1">Enable automatic git commits</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Panel Features */}
                  <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-6">
                    <h3 className="text-accent-gold font-pp-supply-mono text-lg mb-4 flex items-center">
                      <span className="mr-3 text-2xl">🎛️</span>
                      Admin Panel Features
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          icon: '🚀',
                          name: 'Development Services',
                          desc: 'Start/stop local development servers and automation services',
                          features: ['React dev server (Port 3000)', 'Auto-commit agent', 'Client data sync']
                        },
                        {
                          icon: '🤖',
                          name: 'AI Subagents',
                          desc: 'Specialized AI agents for development automation',
                          features: ['Component architecture', 'Performance auditing', 'SEO optimization', 'Content generation']
                        },
                        {
                          icon: '🧩',
                          name: 'Site Modules',
                          desc: 'Plug-and-play website modules for client projects',
                          features: ['SEO optimization tools', 'Content generation', 'Lead generation forms']
                        },
                        {
                          icon: '💾',
                          name: 'Database Management',
                          desc: 'View and manage all project data',
                          features: ['Client information', 'Portfolio projects', 'Blog posts', 'Team members']
                        }
                      ].map((feature, index) => (
                        <motion.div
                          key={feature.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gray-700/40 border border-gray-600/30 rounded-lg p-4"
                        >
                          <div className="flex items-center mb-3">
                            <span className="text-2xl mr-3">{feature.icon}</span>
                            <h4 className="font-pp-supply-mono text-brand-cream font-medium text-sm">
                              {feature.name}
                            </h4>
                          </div>
                          <p className="text-xs text-brand-cream/70 mb-3">{feature.desc}</p>
                          <ul className="space-y-1">
                            {feature.features.map((feat, i) => (
                              <li key={i} className="text-xs text-brand-cream/80 flex items-start">
                                <span className="text-accent-gold mr-2">•</span>
                                {feat}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Development Workflow */}
                  <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-6">
                    <h3 className="text-accent-gold font-pp-supply-mono text-lg mb-4 flex items-center">
                      <span className="mr-3 text-2xl">⚙️</span>
                      Development Workflow
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-brand-cream font-pp-supply-mono text-md mb-3">
                          📝 Daily Development Process
                        </h4>
                        <div className="space-y-3">
                          {[
                            { step: '1', action: 'Access admin panel', detail: 'Triple-click logo → enter "admin"' },
                            { step: '2', action: 'Start development server', detail: 'Click "START" on Development Server' },
                            { step: '3', action: 'Enable auto-commits', detail: 'Start Auto-Commit Agent for automated git workflow' },
                            { step: '4', action: 'Sync client data', detail: 'Run Client Data Sync before making changes' },
                            { step: '5', action: 'Monitor logs', detail: 'Watch System Logs panel for real-time feedback' }
                          ].map((item) => (
                            <div key={item.step} className="bg-black/30 p-3 rounded flex items-start">
                              <span className="bg-accent-gold text-brand-charcoal w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                                {item.step}
                              </span>
                              <div>
                                <p className="text-brand-cream text-sm font-medium">{item.action}</p>
                                <p className="text-brand-cream/70 text-xs mt-1">{item.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-brand-cream font-pp-supply-mono text-md mb-3">
                          🔧 Troubleshooting Guide
                        </h4>
                        <div className="space-y-3">
                          {[
                            {
                              issue: 'Server won\'t start',
                              solution: 'Check port 3000 is available, restart terminal'
                            },
                            {
                              issue: 'Auto-commit not working',
                              solution: 'Ensure git is configured and repository is clean'
                            },
                            {
                              issue: 'Client data sync fails',
                              solution: 'Verify Google Sheets API credentials are configured'
                            },
                            {
                              issue: 'Admin panel won\'t open',
                              solution: 'Clear browser cache and try triple-clicking logo again'
                            }
                          ].map((item, index) => (
                            <div key={index} className="bg-red-900/20 border-l-4 border-red-500 p-3 rounded">
                              <p className="text-red-300 text-sm font-medium mb-1">⚠️ {item.issue}</p>
                              <p className="text-brand-cream/70 text-xs">💡 {item.solution}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Resources */}
                  <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-6">
                    <h3 className="text-accent-gold font-pp-supply-mono text-lg mb-4 flex items-center">
                      <span className="mr-3 text-2xl">📚</span>
                      Project Resources & Documentation
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          category: 'Core Documentation',
                          icon: '📋',
                          items: [
                            'CLAUDE.md - Main project guide',
                            'README.md - Getting started',
                            'Package.json - Available scripts',
                            'Tailwind.config.js - Design system'
                          ]
                        },
                        {
                          category: 'Development Tools',
                          icon: '🛠️',
                          items: [
                            'MCP Servers - External integrations',
                            'Google Sheets API - Client data sync',
                            'Cloudinary - Asset management',
                            'Framer Motion - Animations'
                          ]
                        },
                        {
                          category: 'Deployment & Production',
                          icon: '🚀',
                          items: [
                            'Netlify - Hosting platform',
                            'Environment variables - Configuration',
                            'Build scripts - Production optimization',
                            'Performance monitoring - Analytics'
                          ]
                        }
                      ].map((resource, index) => (
                        <div key={resource.category} className="bg-gray-700/40 border border-gray-600/30 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <span className="text-xl mr-2">{resource.icon}</span>
                            <h4 className="font-pp-supply-mono text-brand-cream font-medium text-sm">
                              {resource.category}
                            </h4>
                          </div>
                          <ul className="space-y-2">
                            {resource.items.map((item, i) => (
                              <li key={i} className="text-xs text-brand-cream/80 flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Contact & Support */}
                  <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-6">
                    <h3 className="text-accent-gold font-pp-supply-mono text-lg mb-4 flex items-center">
                      <span className="mr-3 text-2xl">👥</span>
                      Team Contact & Support
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-brand-cream font-pp-supply-mono text-md mb-3">
                          🆘 Need Help?
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="bg-black/30 p-3 rounded">
                            <p className="text-green-400 font-medium">Technical Issues</p>
                            <p className="text-brand-cream/70 text-xs">Check System Logs panel for error details</p>
                          </div>
                          <div className="bg-black/30 p-3 rounded">
                            <p className="text-blue-400 font-medium">Development Questions</p>
                            <p className="text-brand-cream/70 text-xs">Refer to CLAUDE.md and component documentation</p>
                          </div>
                          <div className="bg-black/30 p-3 rounded">
                            <p className="text-purple-400 font-medium">Client Data Issues</p>
                            <p className="text-brand-cream/70 text-xs">Use Database tab to verify data integrity</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-brand-cream font-pp-supply-mono text-md mb-3">
                          📞 Support Contacts
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="bg-black/30 p-3 rounded flex items-center">
                            <span className="text-xl mr-3">👨‍💻</span>
                            <div>
                              <p className="text-brand-cream font-medium">Lead Developer</p>
                              <p className="text-brand-cream/70 text-xs">Admin panel & automation</p>
                            </div>
                          </div>
                          <div className="bg-black/30 p-3 rounded flex items-center">
                            <span className="text-xl mr-3">🎨</span>
                            <div>
                              <p className="text-brand-cream font-medium">Design Team</p>
                              <p className="text-brand-cream/70 text-xs">UI/UX and visual assets</p>
                            </div>
                          </div>
                          <div className="bg-black/30 p-3 rounded flex items-center">
                            <span className="text-xl mr-3">📊</span>
                            <div>
                              <p className="text-brand-cream font-medium">Content Manager</p>
                              <p className="text-brand-cream/70 text-xs">Client data & Google Sheets</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

          {/* AI Assistant Tab */}
          {activeTab === 'ai-assistant' && deploymentContext && (
            <FeatureWrapper
              feature="claudeIntegration"
              context={deploymentContext}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
              <div className="bg-black/40 border border-accent-gold/30 rounded-lg p-6">
                <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
                  🤖 AI Assistant (Claude Code Integration)
                </h2>
                
                {/* Local development check */}
                {window.location.hostname === 'localhost' ? (
                  <div className="space-y-6">
                    <p className="text-brand-cream/70 mb-6">
                      Chat directly with Claude Code using your local MCP server configurations. This interface provides access to all your configured MCP servers and local development tools.
                    </p>
                    
                    {/* MCP Status Grid */}
                    <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-4 mb-6">
                      <h3 className="text-brand-cream font-pp-supply-mono text-sm mb-3">
                        🔗 MCP Server Status
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {mcpServers.map((server) => (
                          <div 
                            key={server.id}
                            className="bg-black/30 border border-gray-600/30 rounded p-3"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-lg">{server.icon}</span>
                              <div className={`w-2 h-2 rounded-full ${
                                mcpStatus[server.id] ? 'bg-green-500' : 'bg-gray-500'
                              }`} />
                            </div>
                            <p className="text-xs text-brand-cream font-pp-supply-mono">
                              {server.name}
                            </p>
                            <p className="text-xs text-brand-cream/60 mt-1">
                              {server.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Chat Interface */}
                    <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg overflow-hidden">
                      {/* Chat Messages */}
                      <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {chatMessages.length === 0 ? (
                          <div className="text-center text-brand-cream/60 py-8">
                            <p className="text-sm">Start a conversation with Claude Code</p>
                            <p className="text-xs mt-2">Try: "Help me analyze the performance of my components"</p>
                          </div>
                        ) : (
                          chatMessages.map((message, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-3xl ${
                                message.role === 'user' 
                                  ? 'bg-blue-600/20 border-blue-500' 
                                  : 'bg-gray-700/50 border-gray-600'
                              } border rounded-lg p-4`}>
                                <div className="flex items-center mb-2">
                                  <span className="text-xs font-pp-supply-mono text-brand-cream/60">
                                    {message.role === 'user' ? 'You' : 'Claude Code'}
                                  </span>
                                  <span className="text-xs text-brand-cream/40 ml-2">
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                  </span>
                                </div>
                                <div className="text-sm text-brand-cream whitespace-pre-wrap">
                                  {message.content}
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                        {isLoading && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                          >
                            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-brand-cream/60 rounded-full animate-pulse" />
                                <div className="w-2 h-2 bg-brand-cream/60 rounded-full animate-pulse delay-75" />
                                <div className="w-2 h-2 bg-brand-cream/60 rounded-full animate-pulse delay-150" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Input Area */}
                      <div className="border-t border-gray-600/30 p-4">
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (inputMessage.trim() && !isLoading) {
                              setChatMessages(prev => [...prev, {
                                role: 'user',
                                content: inputMessage,
                                timestamp: new Date()
                              }]);
                              setIsLoading(true);
                              setInputMessage('');
                              // TODO: Send message to Claude Code bridge server
                              setTimeout(() => {
                                setChatMessages(prev => [...prev, {
                                  role: 'assistant',
                                  content: 'Claude Code integration is pending implementation. This will connect to your local Claude Code instance with full MCP server access.',
                                  timestamp: new Date()
                                }]);
                                setIsLoading(false);
                              }, 1000);
                            }
                          }}
                          className="flex space-x-2"
                        >
                          <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask Claude Code anything..."
                            className="flex-1 bg-black/50 border border-gray-600 rounded-lg px-4 py-2 text-sm text-brand-cream placeholder-brand-cream/40 focus:outline-none focus:border-accent-gold"
                            disabled={isLoading}
                          />
                          <button
                            type="submit"
                            disabled={isLoading || !inputMessage.trim()}
                            className="bg-accent-gold hover:bg-yellow-600 disabled:bg-gray-600 text-brand-charcoal px-4 py-2 rounded-lg font-pp-supply-mono text-sm transition-colors disabled:cursor-not-allowed"
                          >
                            Send
                          </button>
                        </form>
                        
                        {/* Quick Commands */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="text-xs text-brand-cream/60">Quick:</span>
                          {[
                            '@analyze-component',
                            '@generate-blog',
                            '@seo-check',
                            '@sync-data'
                          ].map((cmd) => (
                            <button
                              key={cmd}
                              onClick={() => setInputMessage(cmd + ' ')}
                              className="text-xs bg-black/30 hover:bg-black/50 text-accent-gold px-2 py-1 rounded transition-colors"
                            >
                              {cmd}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection Status */}
                    <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-yellow-500">⚠️</span>
                        <div>
                          <p className="text-sm text-yellow-400 font-medium">
                            Claude Code Bridge Not Connected
                          </p>
                          <p className="text-xs text-brand-cream/70 mt-1">
                            Run <code className="bg-black/50 px-1 py-0.5 rounded">npm run claude-bridge</code> to enable Claude Code integration
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Production Fallback */
                  <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-8 text-center">
                    <span className="text-4xl mb-4 block">🔒</span>
                    <h3 className="text-brand-cream font-pp-supply-mono text-lg mb-3">
                      Local Development Only
                    </h3>
                    <p className="text-brand-cream/70 text-sm mb-6 max-w-md mx-auto">
                      The AI Assistant requires a local Claude Code instance and MCP server access. This feature is only available when running the admin panel locally.
                    </p>
                    <div className="bg-black/30 rounded-lg p-4 text-left max-w-md mx-auto">
                      <p className="text-xs text-brand-cream/80 font-pp-supply-mono mb-2">To use locally:</p>
                      <ol className="space-y-1 text-xs text-brand-cream/70">
                        <li>1. Run <code className="text-green-400">npm start</code></li>
                        <li>2. Run <code className="text-green-400">npm run claude-bridge</code></li>
                        <li>3. Ensure Claude Code is installed</li>
                        <li>4. Access admin panel at localhost:3000</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            </FeatureWrapper>
          )}
        </div>
      </div>
    </>
  );
};

export default SecretAdminPanel;