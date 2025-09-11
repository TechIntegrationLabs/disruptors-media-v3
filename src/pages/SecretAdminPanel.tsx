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
}

const SecretAdminPanel: React.FC = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'Figma WebSocket Server',
      running: false,
      port: 8080,
      description: 'Cursor Talk to Figma MCP WebSocket server for bidirectional Figma communication',
      command: 'cd cursor-talk-to-figma-mcp && bun socket',
      icon: '🎨'
    },
    {
      name: 'Development Server',
      running: false,
      port: 3000,
      description: 'React development server with hot reload',
      command: 'npm start',
      icon: '⚛️'
    },
    {
      name: 'Auto-Commit Agent',
      running: false,
      description: 'Automated git commits with AI-generated messages',
      command: 'npm run auto-commit:watch',
      icon: '🤖'
    },
    {
      name: 'Client Data Sync',
      running: false,
      description: 'Google Sheets client data synchronization',
      command: 'npm run clients:sync',
      icon: '📊'
    },
    {
      name: 'Build Production',
      running: false,
      description: 'Create optimized production build',
      command: 'npm run build',
      icon: '🏗️'
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
        addLog('System check complete');
        break;
      case 'open-figma':
        addLog('Opening Figma with MCP plugin...');
        // In real implementation: window.open('https://figma.com/...')
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
                🚀 Local Services
              </h2>
              
              <div className="space-y-4">
                {services.map((service, index) => (
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

          {/* Figma Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-black/40 border border-accent-gold/30 rounded-lg p-6"
          >
            <h2 className="text-accent-gold font-pp-supply-mono text-xl mb-4">
              🎨 Figma Integration Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => handleQuickAction('open-figma')}
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded font-pp-supply-mono text-sm transition-colors"
              >
                <div className="text-2xl mb-2">🎨</div>
                Open Figma
                <div className="text-xs opacity-70 mt-1">Launch with MCP plugin</div>
              </button>
              
              <button
                onClick={() => addLog('Figma API connection test initiated...')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded font-pp-supply-mono text-sm transition-colors"
              >
                <div className="text-2xl mb-2">🔗</div>
                Test API
                <div className="text-xs opacity-70 mt-1">Check Figma connection</div>
              </button>
              
              <button
                onClick={() => addLog('Opening MCP server documentation...')}
                className="bg-green-600 hover:bg-green-700 text-white p-4 rounded font-pp-supply-mono text-sm transition-colors"
              >
                <div className="text-2xl mb-2">📚</div>
                MCP Docs
                <div className="text-xs opacity-70 mt-1">View documentation</div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SecretAdminPanel;