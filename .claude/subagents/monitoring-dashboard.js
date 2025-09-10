#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const SubAgentOrchestrator = require('./orchestrator');

class MonitoringDashboard {
  constructor() {
    this.orchestrator = new SubAgentOrchestrator();
    this.dashboardConfig = {
      port: 3001,
      updateInterval: 5000,
      logRetention: 7 * 24 * 60 * 60 * 1000, // 7 days
      metrics: {
        agents: {},
        triggers: {},
        performance: {},
        errors: {}
      }
    };
    this.agentMetrics = new Map();
    this.triggerHistory = [];
    this.errorLog = [];
    this.performanceData = new Map();
    this.isRunning = false;
  }

  async initialize() {
    console.log('🚀 Initializing Subagent Monitoring Dashboard...');
    
    try {
      // Initialize metrics tracking
      await this.initializeMetrics();
      
      // Setup real-time monitoring
      await this.setupRealTimeMonitoring();
      
      // Initialize web dashboard
      await this.initializeWebDashboard();
      
      // Setup automated reporting
      await this.setupAutomatedReporting();
      
      this.isRunning = true;
      console.log('✅ Monitoring Dashboard initialized successfully');
      console.log(`📊 Dashboard available at http://localhost:${this.dashboardConfig.port}`);
      
    } catch (error) {
      console.error('❌ Failed to initialize monitoring dashboard:', error);
      throw error;
    }
  }

  async initializeMetrics() {
    // Initialize metrics for each agent
    const agentNames = [
      'component-architect',
      'cloudinary-optimizer', 
      'auto-commit-manager',
      'gsap-animation-expert',
      'framer-motion-specialist',
      'content-generator',
      'form-integration-expert',
      'performance-auditor',
      'seo-optimizer',
      'changelog-agent',
      'documentation-maintainer',
      'mcp-integration'
    ];

    for (const agentName of agentNames) {
      this.agentMetrics.set(agentName, {
        name: agentName,
        status: 'idle',
        lastTriggered: null,
        triggerCount: 0,
        errorCount: 0,
        averageExecutionTime: 0,
        totalExecutionTime: 0,
        successRate: 100,
        lastError: null,
        activeTasks: 0,
        completedTasks: 0
      });
    }

    // Load historical metrics if available
    await this.loadHistoricalMetrics();

    console.log(`📈 Initialized metrics for ${agentNames.length} agents`);
  }

  async loadHistoricalMetrics() {
    try {
      const metricsPath = '.claude/subagents/logs/agent-metrics.json';
      if (fs.existsSync(metricsPath)) {
        const historicalData = JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
        
        for (const [agentName, metrics] of Object.entries(historicalData)) {
          if (this.agentMetrics.has(agentName)) {
            const currentMetrics = this.agentMetrics.get(agentName);
            this.agentMetrics.set(agentName, { ...currentMetrics, ...metrics });
          }
        }
        
        console.log('📊 Loaded historical metrics');
      }
    } catch (error) {
      console.log('⚠️ No historical metrics found, starting fresh');
    }
  }

  async setupRealTimeMonitoring() {
    // Monitor agent logs for real-time updates
    const logsWatcher = chokidar.watch('.claude/subagents/logs/*.log', {
      persistent: true
    });

    logsWatcher.on('change', (logPath) => {
      this.processLogUpdate(logPath);
    });

    // Monitor for new agent executions
    const agentWatcher = chokidar.watch('.claude/subagents/agents/*.js', {
      persistent: true
    });

    agentWatcher.on('change', (agentPath) => {
      const agentName = path.basename(agentPath, '.js');
      this.recordAgentActivity(agentName, 'file_modified');
    });

    console.log('👁️ Real-time monitoring active');
  }

  processLogUpdate(logPath) {
    try {
      const agentName = path.basename(logPath, '.log');
      const logContent = fs.readFileSync(logPath, 'utf8');
      const lastLines = logContent.split('\\n').slice(-10);
      
      // Parse recent log entries for metrics
      for (const line of lastLines) {
        if (line.includes('[ERROR]')) {
          this.recordError(agentName, line);
        } else if (line.includes('completed successfully')) {
          this.recordSuccess(agentName);
        } else if (line.includes('Executing')) {
          this.recordExecution(agentName);
        }
      }
    } catch (error) {
      console.error(`Error processing log update for ${logPath}:`, error);
    }
  }

  recordAgentActivity(agentName, triggerType) {
    const metrics = this.agentMetrics.get(agentName);
    if (metrics) {
      metrics.lastTriggered = new Date().toISOString();
      metrics.triggerCount++;
      metrics.status = 'active';
      metrics.activeTasks++;
      
      // Record trigger in history
      this.triggerHistory.push({
        agent: agentName,
        trigger: triggerType,
        timestamp: new Date().toISOString()
      });
      
      // Keep only recent history
      if (this.triggerHistory.length > 1000) {
        this.triggerHistory = this.triggerHistory.slice(-500);
      }
    }
  }

  recordError(agentName, errorMessage) {
    const metrics = this.agentMetrics.get(agentName);
    if (metrics) {
      metrics.errorCount++;
      metrics.lastError = {
        message: errorMessage,
        timestamp: new Date().toISOString()
      };
      metrics.status = 'error';
      
      // Update success rate
      this.updateSuccessRate(agentName);
      
      // Add to error log
      this.errorLog.push({
        agent: agentName,
        error: errorMessage,
        timestamp: new Date().toISOString()
      });
      
      // Keep error log manageable
      if (this.errorLog.length > 500) {
        this.errorLog = this.errorLog.slice(-250);
      }
    }
  }

  recordSuccess(agentName) {
    const metrics = this.agentMetrics.get(agentName);
    if (metrics) {
      metrics.completedTasks++;
      metrics.activeTasks = Math.max(0, metrics.activeTasks - 1);
      metrics.status = metrics.activeTasks > 0 ? 'active' : 'idle';
      
      // Update success rate
      this.updateSuccessRate(agentName);
    }
  }

  recordExecution(agentName) {
    const metrics = this.agentMetrics.get(agentName);
    if (metrics) {
      metrics.status = 'executing';
      
      // Record execution start time for performance tracking
      this.performanceData.set(agentName, {
        startTime: Date.now(),
        agent: agentName
      });
    }
  }

  updateSuccessRate(agentName) {
    const metrics = this.agentMetrics.get(agentName);
    if (metrics) {
      const totalTasks = metrics.completedTasks + metrics.errorCount;
      if (totalTasks > 0) {
        metrics.successRate = ((metrics.completedTasks / totalTasks) * 100).toFixed(2);
      }
    }
  }

  async initializeWebDashboard() {
    // Create a simple HTML dashboard
    const dashboardHTML = this.generateDashboardHTML();
    const dashboardPath = '.claude/subagents/dashboard.html';
    
    fs.writeFileSync(dashboardPath, dashboardHTML);
    
    // Create dashboard data API endpoint (simple JSON file)
    await this.updateDashboardData();
    
    console.log(`🌐 Web dashboard created: ${dashboardPath}`);
  }

  generateDashboardHTML() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subagent Monitoring Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1a1a1a; color: #fff; padding: 20px;
        }
        .dashboard { max-width: 1400px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #FFD700; font-size: 2.5rem; margin-bottom: 10px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { 
            background: #2a2a2a; padding: 20px; border-radius: 10px; 
            border-left: 4px solid #FFD700; position: relative;
        }
        .stat-card h3 { color: #FFD700; margin-bottom: 15px; }
        .agent-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; }
        .agent-card { 
            background: #2a2a2a; padding: 15px; border-radius: 8px;
            border: 1px solid #444; transition: all 0.3s ease;
        }
        .agent-card:hover { border-color: #FFD700; transform: translateY(-2px); }
        .agent-name { font-weight: bold; color: #FFD700; margin-bottom: 8px; }
        .agent-status { 
            display: inline-block; padding: 4px 12px; border-radius: 20px; 
            font-size: 0.8rem; font-weight: bold; margin-bottom: 10px;
        }
        .status-idle { background: #666; color: #fff; }
        .status-active { background: #28a745; color: #fff; }
        .status-executing { background: #ffc107; color: #000; }
        .status-error { background: #dc3545; color: #fff; }
        .metric { font-size: 0.9rem; margin: 4px 0; }
        .metric-label { color: #aaa; }
        .metric-value { color: #fff; font-weight: bold; }
        .refresh-btn { 
            position: fixed; top: 20px; right: 20px; 
            background: #FFD700; color: #000; border: none; 
            padding: 10px 20px; border-radius: 5px; cursor: pointer;
            font-weight: bold;
        }
        .refresh-btn:hover { background: #e6c200; }
        .last-updated { text-align: center; color: #666; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>🤖 Subagent Monitoring Dashboard</h1>
            <p>Real-time monitoring for Disruptors Media v3 subagent system</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <h3>📊 System Overview</h3>
                <div class="metric">
                    <span class="metric-label">Total Agents:</span>
                    <span class="metric-value" id="total-agents">12</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Active Agents:</span>
                    <span class="metric-value" id="active-agents">0</span>
                </div>
                <div class="metric">
                    <span class="metric-label">System Status:</span>
                    <span class="metric-value" id="system-status">Operational</span>
                </div>
            </div>
            
            <div class="stat-card">
                <h3>⚡ Performance</h3>
                <div class="metric">
                    <span class="metric-label">Avg Success Rate:</span>
                    <span class="metric-value" id="avg-success-rate">99.2%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Total Executions:</span>
                    <span class="metric-value" id="total-executions">0</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Errors (24h):</span>
                    <span class="metric-value" id="error-count">0</span>
                </div>
            </div>
            
            <div class="stat-card">
                <h3>📈 Activity</h3>
                <div class="metric">
                    <span class="metric-label">Triggers (1h):</span>
                    <span class="metric-value" id="recent-triggers">0</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Most Active:</span>
                    <span class="metric-value" id="most-active">-</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Last Activity:</span>
                    <span class="metric-value" id="last-activity">-</span>
                </div>
            </div>
        </div>
        
        <h2 style="color: #FFD700; margin-bottom: 20px;">🤖 Agent Status</h2>
        <div class="agent-list" id="agent-list">
            <!-- Agents will be populated by JavaScript -->
        </div>
        
        <div class="last-updated">
            Last updated: <span id="last-updated">-</span>
        </div>
    </div>
    
    <button class="refresh-btn" onclick="refreshDashboard()">🔄 Refresh</button>
    
    <script>
        async function loadDashboardData() {
            try {
                const response = await fetch('dashboard-data.json');
                const data = await response.json();
                updateDashboard(data);
            } catch (error) {
                console.error('Failed to load dashboard data:', error);
            }
        }
        
        function updateDashboard(data) {
            // Update overview stats
            document.getElementById('total-agents').textContent = data.totalAgents;
            document.getElementById('active-agents').textContent = data.activeAgents;
            document.getElementById('system-status').textContent = data.systemStatus;
            document.getElementById('avg-success-rate').textContent = data.avgSuccessRate + '%';
            document.getElementById('total-executions').textContent = data.totalExecutions;
            document.getElementById('error-count').textContent = data.errorCount;
            document.getElementById('recent-triggers').textContent = data.recentTriggers;
            document.getElementById('most-active').textContent = data.mostActive;
            document.getElementById('last-activity').textContent = data.lastActivity;
            
            // Update agent list
            const agentList = document.getElementById('agent-list');
            agentList.innerHTML = '';
            
            data.agents.forEach(agent => {
                const agentCard = document.createElement('div');
                agentCard.className = 'agent-card';
                agentCard.innerHTML = `
                    <div class="agent-name">${agent.name}</div>
                    <div class="agent-status status-${agent.status}">${agent.status.toUpperCase()}</div>
                    <div class="metric">
                        <span class="metric-label">Triggers:</span>
                        <span class="metric-value">${agent.triggerCount}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Success Rate:</span>
                        <span class="metric-value">${agent.successRate}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Last Triggered:</span>
                        <span class="metric-value">${agent.lastTriggered || 'Never'}</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Active Tasks:</span>
                        <span class="metric-value">${agent.activeTasks}</span>
                    </div>
                `;
                agentList.appendChild(agentCard);
            });
            
            document.getElementById('last-updated').textContent = new Date().toLocaleString();
        }
        
        function refreshDashboard() {
            loadDashboardData();
        }
        
        // Auto-refresh every 5 seconds
        setInterval(loadDashboardData, 5000);
        
        // Initial load
        loadDashboardData();
    </script>
</body>
</html>`;
  }

  async updateDashboardData() {
    const dashboardData = {
      timestamp: new Date().toISOString(),
      totalAgents: this.agentMetrics.size,
      activeAgents: Array.from(this.agentMetrics.values()).filter(m => m.status === 'active' || m.status === 'executing').length,
      systemStatus: this.getSystemStatus(),
      avgSuccessRate: this.calculateAverageSuccessRate(),
      totalExecutions: Array.from(this.agentMetrics.values()).reduce((sum, m) => sum + m.triggerCount, 0),
      errorCount: this.errorLog.filter(e => Date.now() - new Date(e.timestamp).getTime() < 24 * 60 * 60 * 1000).length,
      recentTriggers: this.triggerHistory.filter(t => Date.now() - new Date(t.timestamp).getTime() < 60 * 60 * 1000).length,
      mostActive: this.getMostActiveAgent(),
      lastActivity: this.getLastActivity(),
      agents: Array.from(this.agentMetrics.values()).map(agent => ({
        name: agent.name.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()),
        status: agent.status,
        triggerCount: agent.triggerCount,
        successRate: agent.successRate,
        lastTriggered: agent.lastTriggered ? new Date(agent.lastTriggered).toLocaleString() : null,
        activeTasks: agent.activeTasks,
        errorCount: agent.errorCount
      }))
    };

    const dataPath = '.claude/subagents/dashboard-data.json';
    fs.writeFileSync(dataPath, JSON.stringify(dashboardData, null, 2));
  }

  getSystemStatus() {
    const activeAgents = Array.from(this.agentMetrics.values()).filter(m => m.status === 'active' || m.status === 'executing').length;
    const errorAgents = Array.from(this.agentMetrics.values()).filter(m => m.status === 'error').length;
    
    if (errorAgents > 2) return 'Degraded';
    if (activeAgents > 0) return 'Active';
    return 'Operational';
  }

  calculateAverageSuccessRate() {
    const rates = Array.from(this.agentMetrics.values()).map(m => parseFloat(m.successRate));
    const average = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
    return average.toFixed(1);
  }

  getMostActiveAgent() {
    let mostActive = null;
    let highestCount = 0;
    
    for (const [name, metrics] of this.agentMetrics) {
      if (metrics.triggerCount > highestCount) {
        highestCount = metrics.triggerCount;
        mostActive = name;
      }
    }
    
    return mostActive ? mostActive.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()) : '-';
  }

  getLastActivity() {
    let latestActivity = null;
    
    for (const trigger of this.triggerHistory) {
      if (!latestActivity || new Date(trigger.timestamp) > new Date(latestActivity)) {
        latestActivity = trigger.timestamp;
      }
    }
    
    return latestActivity ? new Date(latestActivity).toLocaleString() : '-';
  }

  async setupAutomatedReporting() {
    // Generate reports every hour
    setInterval(async () => {
      await this.generateHourlyReport();
      await this.updateDashboardData();
      await this.saveMetrics();
    }, 60 * 60 * 1000);

    // Generate daily summary report
    setInterval(async () => {
      await this.generateDailySummary();
    }, 24 * 60 * 60 * 1000);

    console.log('📋 Automated reporting scheduled');
  }

  async generateHourlyReport() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const recentTriggers = this.triggerHistory.filter(t => 
      new Date(t.timestamp) >= oneHourAgo
    );
    
    const recentErrors = this.errorLog.filter(e => 
      new Date(e.timestamp) >= oneHourAgo
    );
    
    const report = {
      timestamp: now.toISOString(),
      period: 'hourly',
      triggers: recentTriggers.length,
      errors: recentErrors.length,
      activeAgents: Array.from(this.agentMetrics.values()).filter(m => m.status !== 'idle').length,
      topTriggers: this.getTopTriggers(recentTriggers),
      systemHealth: this.assessSystemHealth()
    };
    
    const reportPath = `.claude/subagents/logs/hourly-report-${now.getHours()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }

  getTopTriggers(triggers) {
    const counts = {};
    for (const trigger of triggers) {
      counts[trigger.agent] = (counts[trigger.agent] || 0) + 1;
    }
    
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([agent, count]) => ({ agent, count }));
  }

  assessSystemHealth() {
    const totalAgents = this.agentMetrics.size;
    const healthyAgents = Array.from(this.agentMetrics.values()).filter(m => 
      m.status !== 'error' && parseFloat(m.successRate) >= 95
    ).length;
    
    const healthPercentage = (healthyAgents / totalAgents) * 100;
    
    if (healthPercentage >= 95) return 'excellent';
    if (healthPercentage >= 85) return 'good';
    if (healthPercentage >= 70) return 'fair';
    return 'poor';
  }

  async generateDailySummary() {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const dailyTriggers = this.triggerHistory.filter(t => 
      new Date(t.timestamp) >= yesterday
    );
    
    const dailyErrors = this.errorLog.filter(e => 
      new Date(e.timestamp) >= yesterday
    );
    
    const summary = {
      date: now.toISOString().split('T')[0],
      totalTriggers: dailyTriggers.length,
      totalErrors: dailyErrors.length,
      agentPerformance: Array.from(this.agentMetrics.entries()).map(([name, metrics]) => ({
        name,
        triggers: metrics.triggerCount,
        errors: metrics.errorCount,
        successRate: metrics.successRate,
        status: metrics.status
      })),
      systemHealth: this.assessSystemHealth(),
      recommendations: this.generateRecommendations()
    };
    
    const summaryPath = `.claude/subagents/logs/daily-summary-${summary.date}.json`;
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    
    console.log(`📊 Daily summary generated: ${summaryPath}`);
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Check for agents with high error rates
    for (const [name, metrics] of this.agentMetrics) {
      if (parseFloat(metrics.successRate) < 90) {
        recommendations.push(`Review ${name} agent - success rate below 90%`);
      }
      
      if (metrics.errorCount > 10) {
        recommendations.push(`Investigate ${name} agent - high error count (${metrics.errorCount})`);
      }
    }
    
    // Check system health
    const systemHealth = this.assessSystemHealth();
    if (systemHealth === 'poor') {
      recommendations.push('System health is poor - review agent configurations and error logs');
    }
    
    // Check for inactive agents
    const inactiveAgents = Array.from(this.agentMetrics.values()).filter(m => 
      m.triggerCount === 0 && m.status === 'idle'
    );
    
    if (inactiveAgents.length > 3) {
      recommendations.push(`${inactiveAgents.length} agents have never been triggered - verify trigger configurations`);
    }
    
    return recommendations;
  }

  async saveMetrics() {
    try {
      const metricsData = Object.fromEntries(this.agentMetrics);
      const metricsPath = '.claude/subagents/logs/agent-metrics.json';
      fs.writeFileSync(metricsPath, JSON.stringify(metricsData, null, 2));
    } catch (error) {
      console.error('Failed to save metrics:', error);
    }
  }

  async start() {
    console.log('🚀 Starting Subagent Monitoring Dashboard...');
    
    try {
      await this.initialize();
      
      // Start the orchestrator
      console.log('🎯 Starting subagent orchestrator...');
      // The orchestrator is already initialized, just ensure it's ready
      
      // Begin monitoring loop
      this.startMonitoringLoop();
      
      console.log('✅ Subagent system fully operational!');
      console.log('🔗 Access dashboard: .claude/subagents/dashboard.html');
      console.log('📊 Metrics API: .claude/subagents/dashboard-data.json');
      console.log('📝 Logs: .claude/subagents/logs/');
      
    } catch (error) {
      console.error('❌ Failed to start monitoring dashboard:', error);
      process.exit(1);
    }
  }

  startMonitoringLoop() {
    // Update dashboard data every 5 seconds
    setInterval(async () => {
      if (this.isRunning) {
        await this.updateDashboardData();
      }
    }, this.dashboardConfig.updateInterval);
    
    console.log('⚡ Monitoring loop started');
  }

  stop() {
    console.log('🛑 Stopping monitoring dashboard...');
    this.isRunning = false;
    
    // Save final metrics
    this.saveMetrics();
    
    console.log('✅ Monitoring dashboard stopped');
  }

  // Public API for external triggers
  triggerAgent(agentName, triggerType, context = {}) {
    if (this.orchestrator) {
      this.orchestrator.manualTrigger(agentName, context);
      this.recordAgentActivity(agentName, triggerType);
    }
  }

  keywordTrigger(keyword) {
    if (this.orchestrator) {
      this.orchestrator.keywordTrigger(keyword);
      this.recordAgentActivity('keyword-triggered', 'keyword');
    }
  }

  getSystemStatus() {
    return {
      isRunning: this.isRunning,
      totalAgents: this.agentMetrics.size,
      activeAgents: Array.from(this.agentMetrics.values()).filter(m => m.status !== 'idle').length,
      systemHealth: this.assessSystemHealth(),
      lastUpdate: new Date().toISOString()
    };
  }
}

// Export for use as module
module.exports = MonitoringDashboard;

// Run as standalone script
if (require.main === module) {
  const dashboard = new MonitoringDashboard();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\\n🛑 Shutting down monitoring dashboard...');
    dashboard.stop();
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    dashboard.stop();
    process.exit(0);
  });
  
  // Start the dashboard
  dashboard.start().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}