const { spawn } = require('child_process');
const EventEmitter = require('events');

class ClaudeInterface extends EventEmitter {
  constructor(sessionId, mcpConfigPath) {
    super();
    this.sessionId = sessionId;
    this.mcpConfigPath = mcpConfigPath;
    this.process = null;
    this.isReady = false;
    this.messageQueue = [];
  }

  async start() {
    try {
      // Spawn Claude Code with proper configuration
      this.process = spawn('claude', ['chat', '--mcp-config', this.mcpConfigPath], {
        env: {
          ...process.env,
          CLAUDE_SESSION_ID: this.sessionId,
          CLAUDE_MODE: 'api'
        },
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Handle stdout
      this.process.stdout.on('data', (data) => {
        const output = data.toString();
        this.handleOutput(output);
      });

      // Handle stderr
      this.process.stderr.on('data', (data) => {
        console.error(`Claude stderr (${this.sessionId}):`, data.toString());
        this.emit('error', data.toString());
      });

      // Handle process errors
      this.process.on('error', (error) => {
        console.error(`Claude process error (${this.sessionId}):`, error);
        this.emit('error', error.message);
      });

      // Handle process exit
      this.process.on('exit', (code, signal) => {
        console.log(`Claude process exited (${this.sessionId}): code=${code}, signal=${signal}`);
        this.emit('exit', { code, signal });
      });

      // Wait for Claude to be ready
      await this.waitForReady();
      
      // Process any queued messages
      this.processQueue();
      
      return true;
    } catch (error) {
      console.error(`Failed to start Claude (${this.sessionId}):`, error);
      throw error;
    }
  }

  waitForReady() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Claude Code startup timeout'));
      }, 10000);

      const checkReady = (data) => {
        if (data.includes('Ready') || data.includes('>>>')) {
          this.isReady = true;
          clearTimeout(timeout);
          this.process.stdout.removeListener('data', checkReady);
          resolve();
        }
      };

      this.process.stdout.on('data', checkReady);
    });
  }

  sendMessage(message) {
    if (!this.isReady) {
      this.messageQueue.push(message);
      return;
    }

    try {
      this.process.stdin.write(message + '\n');
    } catch (error) {
      console.error(`Failed to send message (${this.sessionId}):`, error);
      this.emit('error', 'Failed to send message');
    }
  }

  processQueue() {
    while (this.messageQueue.length > 0 && this.isReady) {
      const message = this.messageQueue.shift();
      this.sendMessage(message);
    }
  }

  handleOutput(output) {
    // Parse Claude's output
    const lines = output.split('\n').filter(line => line.trim());
    
    lines.forEach(line => {
      // Detect different types of output
      if (line.startsWith('Error:')) {
        this.emit('error', line);
      } else if (line.includes('MCP:')) {
        // MCP server status update
        this.emit('mcp-status', this.parseMCPStatus(line));
      } else if (line.includes('>>>')) {
        // Ready for input
        this.emit('ready');
      } else {
        // Regular response
        this.emit('response', line);
      }
    });
  }

  parseMCPStatus(line) {
    // Parse MCP status updates
    const match = line.match(/MCP: (\w+) - (\w+)/);
    if (match) {
      return {
        server: match[1],
        status: match[2]
      };
    }
    return null;
  }

  injectContext(context) {
    const contextMessage = `
[Context Update]
Current File: ${context.currentFile || 'None'}
Active Tab: ${context.activeTab || 'None'}
Selected Data: ${context.selectedData ? JSON.stringify(context.selectedData, null, 2) : 'None'}
Working Directory: ${process.cwd()}
---
`;
    this.sendMessage(contextMessage);
  }

  executeCommand(command, args = {}) {
    // Format special commands for Claude
    const commands = {
      '@analyze-component': `Please analyze the component at ${args.file || 'current file'} for performance, best practices, and potential improvements.`,
      '@generate-blog': `Generate a blog post about "${args.topic || 'web development'}" with SEO optimization, proper structure, and engaging content.`,
      '@seo-check': `Perform an SEO analysis of ${args.url || 'the current page'}, checking meta tags, content structure, and optimization opportunities.`,
      '@sync-data': `Sync data from Google Sheets for ${args.dataType || 'clients'} and update the local database.`,
      '@run-subagent': `Execute the ${args.agent || 'component-architect'} subagent with context: ${args.context || 'current file'}.`,
      '@mcp-call': `Use ${args.mcp || 'dataforseo'} MCP server to ${args.action || 'perform task'}.`
    };

    const message = commands[command] || command;
    this.sendMessage(message);
  }

  stop() {
    if (this.process) {
      this.process.kill('SIGTERM');
      this.process = null;
      this.isReady = false;
      this.messageQueue = [];
    }
  }
}

module.exports = ClaudeInterface;