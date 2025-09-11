#!/usr/bin/env node

/**
 * Setup script to help configure Google Apps Script
 * This generates the exact code and instructions needed
 */

const fs = require('fs');
const path = require('path');

console.log('=== Google Apps Script Setup Helper ===\n');

// Read the Apps Script code
const scriptPath = path.join(__dirname, 'google-apps-script-auto-populate.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Generate setup instructions
const instructions = `
GOOGLE APPS SCRIPT QUICK SETUP
==============================

1. OPEN GOOGLE APPS SCRIPT:
   https://script.google.com

2. CREATE NEW PROJECT:
   - Click "New Project"
   - Name it: "DM3 Blog Auto-Population"

3. COPY THE SCRIPT:
   - Delete all default code
   - Copy everything from google-apps-script-auto-populate.js
   - Paste into the editor
   - Save (Ctrl+S or Cmd+S)

4. AUTHORIZE & TEST:
   - Select function dropdown → choose "testSync"
   - Click "Run" button
   - Grant permissions when prompted
   - Check execution log for success

5. ENABLE AUTO-SYNC:
   - Select function dropdown → choose "setupTriggers"
   - Click "Run" button
   - This sets up hourly sync + edit triggers

6. VERIFY IT'S WORKING:
   - Check your main sheet for new "Blog Posts" tab
   - Approved posts should appear there
   - Check "Sync Metadata" tab for status

SHEET IDs CONFIGURED:
- Blog Content Sheet: 1KWGeHUOjKtYINSqeneEF8U9hKjEs3U1UTUPaff6OWpA
- Main Sheet: 1xkoXzGy4q-xkMZRQpqGCN4QR3o-FHOI_4YcTxBUDQYg

THAT'S IT! Your blog posts will now auto-sync every hour.
`;

console.log(instructions);

// Create a direct link to create the Apps Script
const createScriptUrl = 'https://script.google.com/home/projects/create';
console.log(`\nDIRECT LINK TO CREATE SCRIPT:\n${createScriptUrl}\n`);

// Generate a test command
console.log('TEST YOUR INTEGRATION:');
console.log('npm start');
console.log('Then visit: http://localhost:3000/blog\n');

// Save instructions to file
const instructionsPath = path.join(__dirname, 'GOOGLE_APPS_SCRIPT_QUICK_SETUP.txt');
fs.writeFileSync(instructionsPath, instructions + `\n\nSCRIPT CONTENT:\n\n${scriptContent}`);
console.log(`Complete instructions saved to: ${instructionsPath}\n`);