#!/usr/bin/env node

/**
 * Blog Content Sync Scheduler
 * Automated scheduling and monitoring for blog content synchronization
 */

const fs = require('fs');
const path = require('path');
const cron = require('node-cron'); // Will need to install
const { 
  performBidirectionalSync, 
  getSyncStatus,
  syncAirtableToSheets,
  syncSheetsToAirtable
} = require('../src/services/blogSyncService.js');

// Configuration
const SYNC_SCHEDULE = {
  // Cron schedule for automatic sync (every 30 minutes)
  AUTO_SYNC: '*/30 * * * *',
  
  // Status check every 5 minutes
  STATUS_CHECK: '*/5 * * * *',
  
  // Full sync every 2 hours
  FULL_SYNC: '0 */2 * * *'
};

const LOG_FILE = path.join(__dirname, '../logs/blog-sync.log');
const STATUS_FILE = path.join(__dirname, '../logs/sync-status.json');

/**
 * Ensure log directory exists
 */
function ensureLogDirectory() {
  const logDir = path.dirname(LOG_FILE);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

/**
 * Log messages to both console and file
 */
function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] [${level}] ${message}\n`;
  
  console.log(logLine.trim());
  
  try {
    fs.appendFileSync(LOG_FILE, logLine);
  } catch (error) {
    console.error('Failed to write to log file:', error.message);
  }
}

/**
 * Save sync status to file
 */
function saveSyncStatus(status) {
  try {
    const statusWithTimestamp = {
      ...status,
      lastUpdate: new Date().toISOString()
    };
    fs.writeFileSync(STATUS_FILE, JSON.stringify(statusWithTimestamp, null, 2));
  } catch (error) {
    log(`Failed to save sync status: ${error.message}`, 'ERROR');
  }
}

/**
 * Load last sync status
 */
function loadSyncStatus() {
  try {
    if (fs.existsSync(STATUS_FILE)) {
      return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
    }
  } catch (error) {
    log(`Failed to load sync status: ${error.message}`, 'WARN');
  }
  return null;
}

/**
 * Perform scheduled sync with error handling
 */
async function scheduledSync(syncType = 'bidirectional') {
  log(`Starting scheduled ${syncType} sync...`);
  
  try {
    let result;
    
    switch (syncType) {
      case 'bidirectional':
        result = await performBidirectionalSync();
        break;
      case 'airtable-to-sheets':
        result = await syncAirtableToSheets();
        break;
      case 'sheets-to-airtable':
        result = await syncSheetsToAirtable();
        break;
      default:
        throw new Error(`Unknown sync type: ${syncType}`);
    }
    
    log(`Scheduled ${syncType} sync completed successfully`);
    
    // Update status
    const status = await getSyncStatus();
    saveSyncStatus({ ...status, lastSync: new Date().toISOString(), result });
    
    return result;
    
  } catch (error) {
    log(`Scheduled ${syncType} sync failed: ${error.message}`, 'ERROR');
    
    // Save error status
    const status = { 
      error: error.message, 
      lastSync: new Date().toISOString(),
      syncType 
    };
    saveSyncStatus(status);
    
    throw error;
  }
}

/**
 * Check sync status and log if needed
 */
async function statusCheck() {
  try {
    const status = await getSyncStatus();
    const lastStatus = loadSyncStatus();
    
    // Only log if something changed
    if (!lastStatus || 
        lastStatus.airtableCount !== status.airtableCount ||
        lastStatus.googleSheetsCount !== status.googleSheetsCount ||
        lastStatus.syncRecommendation !== status.syncRecommendation) {
      
      log(`Status: ${status.airtableCount} Airtable, ${status.googleSheetsCount} Sheets, ${status.matchedPosts} matched`);
      
      if (status.syncRecommendation === 'Sync recommended') {
        log('⚠️ Sync recommended - content differences detected', 'WARN');
      }
    }
    
    saveSyncStatus(status);
    
  } catch (error) {
    log(`Status check failed: ${error.message}`, 'ERROR');
  }
}

/**
 * Start the scheduler
 */
function startScheduler() {
  ensureLogDirectory();
  log('🚀 Blog sync scheduler starting...');
  
  // Status checks every 5 minutes
  cron.schedule(SYNC_SCHEDULE.STATUS_CHECK, async () => {
    await statusCheck();
  });
  
  // Quick sync every 30 minutes
  cron.schedule(SYNC_SCHEDULE.AUTO_SYNC, async () => {
    await scheduledSync('sheets-to-airtable'); // Prioritize bringing Google Sheets content to Airtable
  });
  
  // Full bidirectional sync every 2 hours
  cron.schedule(SYNC_SCHEDULE.FULL_SYNC, async () => {
    await scheduledSync('bidirectional');
  });
  
  log('✅ Scheduler started with the following schedule:');
  log(`   Status checks: ${SYNC_SCHEDULE.STATUS_CHECK}`);
  log(`   Quick sync: ${SYNC_SCHEDULE.AUTO_SYNC}`);
  log(`   Full sync: ${SYNC_SCHEDULE.FULL_SYNC}`);
  
  // Initial status check
  statusCheck();
}

/**
 * Stop the scheduler gracefully
 */
function stopScheduler() {
  log('🛑 Blog sync scheduler stopping...');
  cron.destroy();
  process.exit(0);
}

/**
 * Manual sync commands
 */
async function runManualSync(command) {
  ensureLogDirectory();
  
  switch (command) {
    case 'sync':
    case 'bidirectional':
      await scheduledSync('bidirectional');
      break;
    case 'airtable-to-sheets':
      await scheduledSync('airtable-to-sheets');
      break;
    case 'sheets-to-airtable':
      await scheduledSync('sheets-to-airtable');
      break;
    case 'status':
      const status = await getSyncStatus();
      console.log(JSON.stringify(status, null, 2));
      break;
    case 'logs':
      if (fs.existsSync(LOG_FILE)) {
        const logs = fs.readFileSync(LOG_FILE, 'utf8');
        console.log(logs.split('\n').slice(-50).join('\n')); // Last 50 lines
      } else {
        console.log('No log file found');
      }
      break;
    case 'clear-logs':
      if (fs.existsSync(LOG_FILE)) {
        fs.unlinkSync(LOG_FILE);
        console.log('Logs cleared');
      }
      break;
    default:
      console.log(`
🔄 Blog Content Sync Scheduler

Usage: node blog-sync-scheduler.js [command]

Commands:
  start                 Start the automatic sync scheduler
  sync | bidirectional  Run manual bidirectional sync
  airtable-to-sheets   Sync from Airtable to Google Sheets
  sheets-to-airtable   Sync from Google Sheets to Airtable
  status               Check current sync status
  logs                 Show recent sync logs
  clear-logs           Clear log files
  
Automatic Schedule:
  Status checks: Every 5 minutes
  Quick sync:    Every 30 minutes (Sheets → Airtable)
  Full sync:     Every 2 hours (Bidirectional)
      `);
  }
}

// Handle process signals for graceful shutdown
process.on('SIGINT', stopScheduler);
process.on('SIGTERM', stopScheduler);

// CLI handling
const command = process.argv[2];

if (command === 'start') {
  startScheduler();
} else {
  runManualSync(command).catch(error => {
    console.error('❌ Command failed:', error.message);
    process.exit(1);
  });
}

module.exports = {
  startScheduler,
  stopScheduler,
  scheduledSync,
  statusCheck,
  SYNC_SCHEDULE
};