const express = require('express');
const { WebSocketServer } = require('ws');
const { spawn } = require('child_process');
const cors = require('cors');
const path = require('path');

// Create Express app
const app = express();
const PORT = process.env.CLAUDE_BRIDGE_PORT || 3456;

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = app.listen(PORT, () => {
  console.log(`🤖 Claude Code Bridge Server running on port ${PORT}`);
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Track active Claude Code sessions
const claudeSessions = new Map();

// API Routes
app.get('/health', (req, res) => {
  res.json({ 
    status: 'running',
    sessions: claudeSessions.size,
    uptime: process.uptime()
  });
});

app.get('/mcp-status', (req, res) => {
  // Check MCP server availability
  const mcpStatus = {
    'dataforseo': checkMCPServer('dataforseo'),
    'firecrawl': checkMCPServer('firecrawl'),
    'cloudinary': checkMCPServer('cloudinary'),
    'gohighlevel': checkMCPServer('gohighlevel'),
    'n8n-mcp': checkMCPServer('n8n-mcp'),
    'netlify': checkMCPServer('netlify'),
    'filesystem': true, // Always available locally
    'gsap-master': checkMCPServer('gsap-master')
  };
  res.json(mcpStatus);
});

// WebSocket connection handler
wss.on('connection', (ws) => {
  const sessionId = generateSessionId();
  console.log(`✅ New WebSocket connection: ${sessionId}`);
  
  // Create Claude Code session
  const claudeProcess = createClaudeSession(sessionId);
  claudeSessions.set(sessionId, { process: claudeProcess, ws });
  
  // Handle messages from client
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      handleClientMessage(sessionId, message);
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        content: 'Failed to process message'
      }));
    }
  });
  
  // Handle disconnection
  ws.on('close', () => {
    console.log(`❌ WebSocket disconnected: ${sessionId}`);
    cleanupSession(sessionId);
  });
  
  // Send initial connection confirmation
  ws.send(JSON.stringify({
    type: 'connected',
    sessionId,
    mcpStatus: getMCPStatus()
  }));
});

// Create Claude Code session
function createClaudeSession(sessionId) {
  // Spawn Claude Code process
  const claudeProcess = spawn('claude-code', ['--mode', 'api'], {
    env: {
      ...process.env,
      CLAUDE_SESSION_ID: sessionId,
      MCP_CONFIG_PATH: path.join(__dirname, '../../../mcp-servers.json')
    }
  });
  
  // Handle Claude Code output
  claudeProcess.stdout.on('data', (data) => {
    const session = claudeSessions.get(sessionId);
    if (session && session.ws.readyState === 1) {
      session.ws.send(JSON.stringify({
        type: 'response',
        content: data.toString()
      }));
    }
  });
  
  // Handle errors
  claudeProcess.stderr.on('data', (data) => {
    console.error(`Claude Code error (${sessionId}):`, data.toString());
  });
  
  claudeProcess.on('error', (error) => {
    console.error(`Failed to start Claude Code (${sessionId}):`, error);
    const session = claudeSessions.get(sessionId);
    if (session && session.ws.readyState === 1) {
      session.ws.send(JSON.stringify({
        type: 'error',
        content: 'Failed to start Claude Code. Make sure it is installed.'
      }));
    }
  });
  
  return claudeProcess;
}

// Handle messages from client
function handleClientMessage(sessionId, message) {
  const session = claudeSessions.get(sessionId);
  if (!session) return;
  
  switch (message.type) {
    case 'chat':
      // Send message to Claude Code stdin
      session.process.stdin.write(message.content + '\n');
      break;
      
    case 'command':
      // Handle special commands
      handleSpecialCommand(sessionId, message.command);
      break;
      
    case 'context':
      // Inject context into Claude Code
      injectContext(sessionId, message.context);
      break;
      
    default:
      console.warn(`Unknown message type: ${message.type}`);
  }
}

// Handle special commands
function handleSpecialCommand(sessionId, command) {
  const session = claudeSessions.get(sessionId);
  if (!session) return;
  
  switch (command) {
    case '@analyze-component':
      session.process.stdin.write('analyze the current component for performance and best practices\n');
      break;
      
    case '@generate-blog':
      session.process.stdin.write('generate a blog post with SEO optimization\n');
      break;
      
    case '@seo-check':
      session.process.stdin.write('perform an SEO analysis of the current page\n');
      break;
      
    case '@sync-data':
      session.process.stdin.write('sync data from Google Sheets\n');
      break;
      
    default:
      session.process.stdin.write(command + '\n');
  }
}

// Inject context into Claude Code
function injectContext(sessionId, context) {
  const session = claudeSessions.get(sessionId);
  if (!session) return;
  
  // Format context for Claude Code
  const contextMessage = `
Context Update:
- Current File: ${context.currentFile || 'None'}
- Active Tab: ${context.activeTab || 'None'}
- Selected Data: ${context.selectedData ? JSON.stringify(context.selectedData) : 'None'}
---
`;
  
  session.process.stdin.write(contextMessage);
}

// Cleanup session
function cleanupSession(sessionId) {
  const session = claudeSessions.get(sessionId);
  if (session) {
    // Kill Claude Code process
    session.process.kill();
    claudeSessions.delete(sessionId);
  }
}

// Helper functions
function generateSessionId() {
  return `claude-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function checkMCPServer(serverId) {
  // TODO: Implement actual MCP server health checks
  // For now, return random status for demo
  return Math.random() > 0.3;
}

function getMCPStatus() {
  return {
    'dataforseo': checkMCPServer('dataforseo'),
    'firecrawl': checkMCPServer('firecrawl'),
    'cloudinary': checkMCPServer('cloudinary'),
    'gohighlevel': checkMCPServer('gohighlevel'),
    'n8n-mcp': checkMCPServer('n8n-mcp'),
    'netlify': checkMCPServer('netlify'),
    'filesystem': true,
    'gsap-master': checkMCPServer('gsap-master')
  };
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down Claude Code Bridge Server...');
  
  // Close all sessions
  claudeSessions.forEach((session, sessionId) => {
    cleanupSession(sessionId);
  });
  
  // Close WebSocket server
  wss.close(() => {
    console.log('WebSocket server closed');
  });
  
  // Close HTTP server
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});