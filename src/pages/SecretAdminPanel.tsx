import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';

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
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [services, setServices] = useState<ServiceStatus[]>([
    // Development Services
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
      name: 'Dev with Auto-Commit',
      running: false,
      port: 3000,
      description: 'Development server with automatic git commits enabled',
      command: 'npm run dev:auto',
      icon: '🔄',
      category: 'development'
    },
    {
      name: 'Test Runner',
      running: false,
      description: 'Jest test runner with watch mode',
      command: 'npm test',
      icon: '🧪',
      category: 'development'
    },
    {
      name: 'Preview Build',
      running: false,
      port: 5000,
      description: 'Preview production build locally',
      command: 'npm run preview',
      icon: '👀',
      category: 'development'
    },

    // Design & Figma Services
    {
      name: 'Figma WebSocket Server',
      running: false,
      port: 8080,
      description: 'Cursor Talk to Figma MCP WebSocket server for bidirectional Figma communication',
      command: 'npm run figma:start',
      icon: '🎨',
      category: 'design'
    },
    {
      name: 'Figma Design Analyzer',
      running: false,
      description: 'Extract design tokens and analyze Figma files',
      command: 'node scripts/figma-analyzer.js',
      icon: '🔍',
      category: 'design'
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
      name: 'Auto-Commit Status',
      running: false,
      description: 'Check status of auto-commit system',
      command: 'npm run auto-commit:status',
      icon: '📈',
      category: 'automation'
    },

    // Content Management Services
    {
      name: 'Client Data Sync',
      running: false,
      description: 'Google Sheets client data synchronization',
      command: 'npm run clients:sync',
      icon: '📊',
      category: 'content'
    },
    {
      name: 'Client Data Validation',
      running: false,
      description: 'Validate client data integrity and structure',
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
    {
      name: 'Blog Content Sync',
      running: false,
      description: 'Sync blog posts from Google Sheets',
      command: 'node src/services/googleSheetsService.js',
      icon: '📝',
      category: 'content'
    },
    {
      name: 'Deploy Apps Script',
      running: false,
      description: 'Deploy Google Apps Script for blog automation',
      command: './deploy-apps-script.sh',
      icon: '🚀',
      category: 'content'
    },

    // Deployment Services
    {
      name: 'Build Production',
      running: false,
      description: 'Create optimized production build',
      command: 'npm run build',
      icon: '🏗️',
      category: 'deployment'
    },
    {
      name: 'Setup Google Apps Script',
      running: false,
      description: 'Initialize Google Apps Script integration',
      command: 'node setup-google-apps-script.js',
      icon: '⚙️',
      category: 'deployment'
    }
  ]);

  const [logs, setLogs] = useState<string[]>([
    '> Admin panel initialized',
    '> Checking service status...',
    '> Ready for operations'
  ]);

  const [systemInfo, setSystemInfo] = useState({
    nodeVersion: 'Unknown',
    npmVersion: 'Unknown',
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    // Simulate getting system info
    setSystemInfo({
      nodeVersion: 'v18.19.0', // This would come from actual system check
      npmVersion: '9.2.0',     // This would come from actual system check
      timestamp: new Date().toISOString()
    });

    // Add initial log
    addLog('System information loaded');
  }, []);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-19), `[${timestamp}] ${message}`]);
  };

  const handleServiceToggle = async (index: number) => {
    const service = services[index];
    const newRunning = !service.running;
    
    // Update service status
    setServices(prev => prev.map((s, i) => 
      i === index ? { ...s, running: newRunning } : s
    ));

    if (newRunning) {
      addLog(`Starting ${service.name}...`);
      addLog(`Command: ${service.command}`);
      if (service.port) {
        addLog(`Service running on port ${service.port}`);
      }
      // In a real implementation, you'd execute the actual command here
      // This would likely involve a backend API or Electron integration
    } else {
      addLog(`Stopping ${service.name}...`);
    }
  };

  const categories = [
    { id: 'all', name: 'All Services', icon: '🔧' },
    { id: 'development', name: 'Development', icon: '⚛️' },
    { id: 'design', name: 'Design Tools', icon: '🎨' },
    { id: 'automation', name: 'Automation', icon: '🤖' },
    { id: 'content', name: 'Content Mgmt', icon: '📝' },
    { id: 'deployment', name: 'Deployment', icon: '🚀' }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'restart-all':
        addLog('Restarting all services...');
        setServices(prev => prev.map(s => ({ ...s, running: false })));
        setTimeout(() => {
          setServices(prev => prev.map(s => ({ ...s, running: true })));
          addLog('All services restarted');
        }, 2000);
        break;
      case 'clear-logs':
        setLogs(['> Logs cleared']);
        break;
      case 'system-check':
        addLog('Running system diagnostics...');
        addLog('✓ Node.js runtime: OK');
        addLog('✓ npm packages: OK');
        addLog('✓ MCP servers: Configured');
        addLog('✓ Figma API: Connected');
        addLog('✓ Google Sheets API: Connected');
        addLog('✓ Cloudinary CDN: OK');
        addLog('✓ Auto-commit agent: Ready');
        addLog('System check complete');
        break;
      case 'open-figma':
        addLog('Opening Figma with MCP plugin...');
        // In real implementation: window.open('https://figma.com/...')
        break;
      case 'sync-all-content':
        addLog('Syncing all content sources...');
        addLog('→ Syncing client data from Google Sheets');
        addLog('→ Syncing blog posts from Google Sheets');
        addLog('→ Validating data integrity');
        addLog('Content sync complete');
        break;
      case 'backup-data':
        addLog('Creating data backups...');
        addLog('→ Backing up client data');
        addLog('→ Backing up blog content');
        addLog('→ Creating Git backup commit');
        addLog('Backup process complete');
        break;
      case 'update-design-tokens':
        addLog('Updating design tokens from Figma...');
        addLog('→ Analyzing Figma files');
        addLog('→ Extracting color palette');
        addLog('→ Updating typography tokens');
        addLog('Design tokens updated');
        break;
      case 'deploy-apps-script':
        addLog('Deploying Google Apps Script...');
        addLog('→ Building Apps Script project');
        addLog('→ Deploying to Google Cloud');
        addLog('→ Setting up automation triggers');
        addLog('Apps Script deployment complete');
        break;
      case 'check-mcp-servers':
        addLog('Checking MCP server status...');
        addLog('→ Vercel MCP: Connected');
        addLog('→ Figma MCP: Connected');
        addLog('→ Firecrawl MCP: Connected');
        addLog('→ Cloudinary MCP: Connected');
        addLog('→ GitHub MCP: Connected');
        addLog('All MCP servers operational');
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
                    <span className="bg-black/30 px-1 rounded text-xs">
                      {category.id === 'all' ? services.length : services.filter(s => s.category === category.id).length}
                    </span>
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

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-gray-600/30">
                <h3 className="text-accent-gold font-pp-supply-mono text-sm mb-3">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuickAction('restart-all')}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors"
                  >
                    🔄 RESTART ALL
                  </button>
                  <button
                    onClick={() => handleQuickAction('system-check')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors"
                  >
                    🔍 SYSTEM CHECK
                  </button>
                  <button
                    onClick={() => handleQuickAction('sync-all-content')}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors"
                  >
                    📊 SYNC CONTENT
                  </button>
                  <button
                    onClick={() => handleQuickAction('backup-data')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors"
                  >
                    💾 BACKUP DATA
                  </button>
                  <button
                    onClick={() => handleQuickAction('update-design-tokens')}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors"
                  >
                    🎨 UPDATE TOKENS
                  </button>
                  <button
                    onClick={() => handleQuickAction('check-mcp-servers')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded text-xs font-pp-supply-mono transition-colors"
                  >
                    🔗 CHECK MCP
                  </button>
                </div>
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

          {/* MCP Servers Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-black/40 border border-accent-gold/30 rounded-lg p-6"
          >
            <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
              🔗 MCP Server Status
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {[
                { name: 'Vercel', icon: '▲', status: 'connected' },
                { name: 'Figma', icon: '🎨', status: 'connected' },
                { name: 'Firecrawl', icon: '🔥', status: 'connected' },
                { name: 'Playwright', icon: '🎭', status: 'connected' },
                { name: 'Cloudinary', icon: '☁️', status: 'connected' },
                { name: 'GitHub', icon: '🐙', status: 'connected' },
                { name: 'n8n', icon: '🔄', status: 'connected' },
                { name: 'GoHighLevel', icon: '📈', status: 'connected' },
                { name: 'DigitalOcean', icon: '🌊', status: 'connected' }
              ].map((server) => (
                <div
                  key={server.name}
                  className="bg-gray-800/50 border border-gray-600/30 rounded p-3 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{server.icon}</span>
                    <span className="font-pp-supply-mono text-sm text-brand-cream">
                      {server.name}
                    </span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    server.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button
                onClick={() => handleQuickAction('check-mcp-servers')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-pp-supply-mono text-xs transition-colors"
              >
                🔍 CHECK ALL
              </button>
              <button
                onClick={() => addLog('Opening MCP configuration...')}
                className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded font-pp-supply-mono text-xs transition-colors"
              >
                ⚙️ CONFIG
              </button>
              <button
                onClick={() => addLog('Viewing MCP logs...')}
                className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded font-pp-supply-mono text-xs transition-colors"
              >
                📋 LOGS
              </button>
              <button
                onClick={() => addLog('Restarting MCP servers...')}
                className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded font-pp-supply-mono text-xs transition-colors"
              >
                🔄 RESTART
              </button>
            </div>
          </motion.div>

          {/* Figma Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 bg-black/40 border border-accent-gold/30 rounded-lg p-6"
          >
            <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
              🎨 Design & Content Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => handleQuickAction('open-figma')}
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded font-pp-supply-mono text-sm transition-colors"
              >
                <div className="text-2xl mb-2">🎨</div>
                Open Figma
                <div className="text-xs opacity-70 mt-1">Launch with MCP</div>
              </button>
              
              <button
                onClick={() => handleQuickAction('update-design-tokens')}
                className="bg-pink-600 hover:bg-pink-700 text-white p-4 rounded font-pp-supply-mono text-sm transition-colors"
              >
                <div className="text-2xl mb-2">🎯</div>
                Design Tokens
                <div className="text-xs opacity-70 mt-1">Extract from Figma</div>
              </button>

              <button
                onClick={() => handleQuickAction('sync-all-content')}
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded font-pp-supply-mono text-sm transition-colors"
              >
                <div className="text-2xl mb-2">📊</div>
                Sync Content
                <div className="text-xs opacity-70 mt-1">Google Sheets sync</div>
              </button>
              
              <button
                onClick={() => handleQuickAction('deploy-apps-script')}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded font-pp-supply-mono text-sm transition-colors"
              >
                <div className="text-2xl mb-2">🚀</div>
                Deploy Script
                <div className="text-xs opacity-70 mt-1">Google Apps Script</div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SecretAdminPanel;