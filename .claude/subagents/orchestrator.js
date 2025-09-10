#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { spawn } = require('child_process');

class SubAgentOrchestrator {
  constructor() {
    this.config = this.loadConfig();
    this.activeAgents = new Map();
    this.triggerQueue = [];
    this.isProcessing = false;
    this.intervals = new Map();
    
    console.log('🤖 SubAgent Orchestrator initialized');
    this.setupWatchers();
    this.setupIntervals();
  }

  loadConfig() {
    const configPath = path.join(__dirname, 'subagent-config.json');
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  setupWatchers() {
    if (!this.config.global.enableFileTriggers) return;

    // Watch for file changes
    const watcher = chokidar.watch(['src/**/*', 'public/**/*', 'docs/**/*'], {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/build/**',
        '**/dist/**'
      ],
      persistent: true
    });

    watcher
      .on('add', (filePath) => this.handleFileEvent('file_created', filePath))
      .on('change', (filePath) => this.handleFileEvent('file_modified', filePath))
      .on('unlink', (filePath) => this.handleFileEvent('file_deleted', filePath));

    console.log('📁 File watchers initialized');
  }

  setupIntervals() {
    if (!this.config.global.enableIntervalTriggers) return;

    Object.entries(this.config.subagents).forEach(([agentName, config]) => {
      config.triggers.forEach(trigger => {
        if (trigger.startsWith('interval:')) {
          const interval = parseInt(trigger.split(':')[1]);
          const intervalId = setInterval(() => {
            this.triggerAgent(agentName, 'interval', { interval });
          }, interval);
          
          this.intervals.set(`${agentName}_${interval}`, intervalId);
          console.log(`⏰ Interval trigger set for ${agentName}: ${interval}ms`);
        }
      });
    });
  }

  handleFileEvent(eventType, filePath) {
    const normalizedPath = filePath.replace(/\\/g, '/');
    
    Object.entries(this.config.subagents).forEach(([agentName, config]) => {
      if (!config.enabled) return;

      config.triggers.forEach(trigger => {
        if (trigger.startsWith(eventType + ':')) {
          const pattern = trigger.split(':')[1];
          if (this.matchPattern(normalizedPath, pattern)) {
            console.log(`🎯 File trigger matched: ${agentName} for ${filePath}`);
            this.triggerAgent(agentName, eventType, { filePath: normalizedPath });
          }
        }
      });
    });
  }

  handleKeywordTrigger(keyword) {
    if (!this.config.global.enableKeywordTriggers) return;

    Object.entries(this.config.subagents).forEach(([agentName, config]) => {
      if (!config.enabled) return;

      config.triggers.forEach(trigger => {
        if (trigger === `keyword:${keyword}`) {
          console.log(`🔑 Keyword trigger matched: ${agentName} for "${keyword}"`);
          this.triggerAgent(agentName, 'keyword', { keyword });
        }
      });
    });
  }

  matchPattern(filePath, pattern) {
    // Convert glob pattern to regex
    const regexPattern = pattern
      .replace(/\*\*/g, '.*')
      .replace(/\*/g, '[^/]*')
      .replace(/\?/g, '[^/]');
    
    const regex = new RegExp('^' + regexPattern + '$');
    return regex.test(filePath);
  }

  async triggerAgent(agentName, triggerType, context = {}) {
    const config = this.config.subagents[agentName];
    if (!config || !config.enabled) return;

    // Check if agent should auto-run
    if (!config.autoRun && triggerType !== 'manual') return;

    // Prevent duplicate triggers within delay period
    const triggerId = `${agentName}_${triggerType}_${JSON.stringify(context)}`;
    if (this.activeAgents.has(triggerId)) return;

    this.activeAgents.set(triggerId, Date.now());
    
    // Add to queue with priority
    this.triggerQueue.push({
      agentName,
      triggerType,
      context,
      priority: this.getPriorityValue(config.priority),
      timestamp: Date.now()
    });

    // Sort queue by priority
    this.triggerQueue.sort((a, b) => b.priority - a.priority);

    // Process queue if not already processing
    if (!this.isProcessing) {
      this.processQueue();
    }

    // Clean up old triggers
    setTimeout(() => {
      this.activeAgents.delete(triggerId);
    }, this.config.global.triggerDelay);
  }

  getPriorityValue(priority) {
    const values = { critical: 4, high: 3, medium: 2, low: 1 };
    return values[priority] || 1;
  }

  async processQueue() {
    if (this.isProcessing || this.triggerQueue.length === 0) return;

    this.isProcessing = true;
    const maxConcurrent = this.config.global.maxConcurrentAgents;
    const processing = [];

    while (this.triggerQueue.length > 0 && processing.length < maxConcurrent) {
      const trigger = this.triggerQueue.shift();
      processing.push(this.executeAgent(trigger));
    }

    await Promise.all(processing);
    this.isProcessing = false;

    // Process more if queue still has items
    if (this.triggerQueue.length > 0) {
      setTimeout(() => this.processQueue(), 100);
    }
  }

  async executeAgent(trigger) {
    const { agentName, triggerType, context } = trigger;
    console.log(`🚀 Executing ${agentName} for ${triggerType}`);

    try {
      // Create execution context
      const executionContext = {
        agent: agentName,
        trigger: triggerType,
        context,
        timestamp: new Date().toISOString(),
        projectRoot: process.cwd(),
        config: this.config.subagents[agentName]
      };

      // Execute the specific agent
      await this.runSpecificAgent(executionContext);
      
      console.log(`✅ ${agentName} completed successfully`);
    } catch (error) {
      console.error(`❌ Error executing ${agentName}:`, error.message);
      this.logError(agentName, error);
    }
  }

  async runSpecificAgent(context) {
    const agentPath = path.join(__dirname, 'agents', `${context.agent}.js`);
    
    if (!fs.existsSync(agentPath)) {
      throw new Error(`Agent file not found: ${agentPath}`);
    }

    // Import and execute the agent
    const AgentClass = require(agentPath);
    const agent = new AgentClass(context);
    await agent.execute();
  }

  logError(agentName, error) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      agent: agentName,
      error: error.message,
      stack: error.stack
    };

    const logPath = path.join(__dirname, 'logs', 'errors.log');
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
  }

  // Public API for manual triggers
  manualTrigger(agentName, context = {}) {
    this.triggerAgent(agentName, 'manual', context);
  }

  keywordTrigger(keyword) {
    this.handleKeywordTrigger(keyword);
  }

  stop() {
    // Clear all intervals
    this.intervals.forEach(intervalId => clearInterval(intervalId));
    this.intervals.clear();
    console.log('🛑 SubAgent Orchestrator stopped');
  }
}

// Export for use as module or run as script
if (require.main === module) {
  const orchestrator = new SubAgentOrchestrator();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down SubAgent Orchestrator...');
    orchestrator.stop();
    process.exit(0);
  });

  // Stay alive
  console.log('🤖 SubAgent Orchestrator running. Press Ctrl+C to stop.');
} else {
  module.exports = SubAgentOrchestrator;
}