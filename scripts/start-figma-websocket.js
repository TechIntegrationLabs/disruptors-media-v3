#!/usr/bin/env node

/**
 * Helper script to start the Figma WebSocket server
 * This script checks if the cursor-talk-to-figma-mcp directory exists and starts the WebSocket server
 */

const { exec, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkBunInstalled() {
  return new Promise((resolve) => {
    exec('bun --version', (error) => {
      resolve(!error);
    });
  });
}

function checkFigmaMCPExists() {
  const figmaPath = path.join(process.cwd(), 'cursor-talk-to-figma-mcp');
  return fs.existsSync(figmaPath);
}

async function startWebSocketServer() {
  log('🎨 Figma WebSocket Server Launcher', colors.bright + colors.magenta);
  log('=====================================', colors.magenta);
  
  // Check if Bun is installed
  const bunInstalled = await checkBunInstalled();
  if (!bunInstalled) {
    log('❌ Bun is not installed!', colors.red);
    log('💡 Install Bun first: curl -fsSL https://bun.sh/install | bash', colors.yellow);
    process.exit(1);
  }
  
  log('✅ Bun is installed', colors.green);
  
  // Check if Figma MCP directory exists
  if (!checkFigmaMCPExists()) {
    log('❌ cursor-talk-to-figma-mcp directory not found!', colors.red);
    log('💡 Make sure you are in the correct directory', colors.yellow);
    process.exit(1);
  }
  
  log('✅ Figma MCP directory found', colors.green);
  log('🚀 Starting WebSocket server...', colors.blue);
  log('', colors.reset);
  
  // Change to the figma directory and start the socket server
  const figmaPath = path.join(process.cwd(), 'cursor-talk-to-figma-mcp');
  
  const child = spawn('bun', ['socket'], {
    cwd: figmaPath,
    stdio: 'inherit'
  });
  
  child.on('error', (error) => {
    log(`❌ Error starting server: ${error.message}`, colors.red);
  });
  
  child.on('close', (code) => {
    if (code !== 0) {
      log(`❌ Server exited with code ${code}`, colors.red);
    } else {
      log('✅ Server stopped gracefully', colors.green);
    }
  });
  
  // Handle process termination
  process.on('SIGINT', () => {
    log('\n🛑 Stopping WebSocket server...', colors.yellow);
    child.kill('SIGINT');
  });
  
  process.on('SIGTERM', () => {
    child.kill('SIGTERM');
  });
}

// Run if called directly
if (require.main === module) {
  startWebSocketServer().catch(console.error);
}

module.exports = { startWebSocketServer };