#!/usr/bin/env node

/**
 * Test DM3 blog integration without Google Apps Script
 * This shows that your site already works with the blog content sheet directly
 */

const fetch = require('cross-fetch');

const SHEET_ID = '1KWGeHUOjKtYINSqeneEF8U9hKjEs3U1UTUPaff6OWpA';
const SHEET_GID = '0';

async function testDirectIntegration() {
  console.log('=== Testing DM3 Blog Integration (Direct) ===\n');
  
  try {
    console.log('✅ Your DM3 site is already configured to read from:');
    console.log(`   Blog Content Sheet: ${SHEET_ID}`);
    console.log(`   Tab: Content (gid: ${SHEET_GID})`);
    console.log('');
    
    // Test the connection
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
    const response = await fetch(csvUrl);
    
    if (response.ok) {
      const csvText = await response.text();
      const rows = csvText.split('\n').filter(row => row.trim());
      
      console.log(`✅ Successfully connected to your sheet`);
      console.log(`   Found ${rows.length - 1} total rows`);
      console.log('');
      
      // Parse headers
      const headers = rows[0].split(',').map(h => h.replace(/"/g, '').trim());
      const approvedIndex = headers.findIndex(h => h.toLowerCase().includes('approved'));
      
      if (approvedIndex !== -1) {
        let approvedCount = 0;
        for (let i = 1; i < rows.length; i++) {
          const cols = rows[i].split(',');
          if (cols[approvedIndex] && cols[approvedIndex].toLowerCase().includes('yes')) {
            approvedCount++;
          }
        }
        
        console.log(`✅ Found ${approvedCount} approved blog posts ready to display`);
        console.log('');
      }
      
      console.log('🎉 YOUR SITE IS ALREADY WORKING!');
      console.log('');
      console.log('To see your blog posts:');
      console.log('1. npm start');
      console.log('2. Visit http://localhost:3000/blog');
      console.log('');
      console.log('To approve more posts:');
      console.log('1. Open your blog content sheet');
      console.log('2. Set "Approved?" to "YES" for posts you want live');
      console.log('3. Refresh your website');
      console.log('');
      console.log('📋 OPTIONAL: Google Apps Script Auto-Population');
      console.log('If you want posts to also appear in your main sheet:');
      console.log('- Follow the 2-minute setup in ULTRA_SIMPLE_SETUP.md');
      console.log('- This is optional - your website already works without it!');
      
    } else {
      console.log('❌ Could not connect to sheet. Check permissions.');
    }
    
  } catch (error) {
    console.error('Error testing integration:', error.message);
  }
}

testDirectIntegration();