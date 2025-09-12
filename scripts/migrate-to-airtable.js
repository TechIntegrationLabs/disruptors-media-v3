#!/usr/bin/env node

/**
 * Migration script: Google Sheets → Airtable
 * This script moves your existing blog posts and client data from Google Sheets to Airtable
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Import your existing Google Sheets services
const { fetchBlogPostsFromSheet } = require('../src/services/googleSheetsService.js');
const { fetchFromGoogleSheets } = require('../src/data/clients/clients-sync.js');

// Airtable configuration
const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BLOG_BASE_ID = process.env.REACT_APP_AIRTABLE_BLOG_BASE_ID;
const CLIENT_BASE_ID = process.env.REACT_APP_AIRTABLE_CLIENT_BASE_ID;

const AIRTABLE_API_BASE = 'https://api.airtable.com/v0';

/**
 * Generic Airtable API request
 */
async function airtableRequest(baseId, tableName, options = {}) {
  if (!AIRTABLE_API_KEY) {
    throw new Error('❌ Airtable API key not configured in .env file');
  }
  
  if (!baseId) {
    throw new Error(`❌ Base ID not configured for ${tableName}`);
  }

  const { method = 'GET', body } = options;
  const url = `${AIRTABLE_API_BASE}/${baseId}/${tableName}`;
  
  const requestOptions = {
    method,
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestOptions);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Airtable API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
 * Create records in Airtable in batches (max 10 per request)
 */
async function createRecordsInBatches(baseId, tableName, records) {
  const results = [];
  const batchSize = 10; // Airtable limit
  
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    console.log(`📤 Creating batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(records.length/batchSize)} (${batch.length} records)`);
    
    try {
      const data = await airtableRequest(baseId, tableName, {
        method: 'POST',
        body: { records: batch }
      });
      
      results.push(...data.records);
      console.log(`✅ Successfully created ${data.records.length} records`);
      
      // Rate limiting: wait 200ms between batches
      if (i + batchSize < records.length) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
    } catch (error) {
      console.error(`❌ Error creating batch starting at record ${i}:`, error.message);
      // Continue with next batch rather than failing completely
    }
  }
  
  return results;
}

/**
 * Migrate blog posts from Google Sheets to Airtable
 */
async function migrateBlogPosts() {
  console.log('\n🔄 MIGRATING BLOG POSTS FROM GOOGLE SHEETS TO AIRTABLE\n');
  
  try {
    // Check if we have the required base ID
    if (!BLOG_BASE_ID || BLOG_BASE_ID === 'your_blog_base_id_here') {
      console.log('⚠️  Blog base ID not configured. Please update REACT_APP_AIRTABLE_BLOG_BASE_ID in .env file');
      console.log('   You can find your base ID in the Airtable URL: https://airtable.com/[BASE_ID]/...');
      return;
    }
    
    // Fetch from Google Sheets (using existing service)
    console.log('📥 Fetching blog posts from Google Sheets...');
    const googleSheetsPosts = await fetchBlogPostsFromSheet();
    
    if (googleSheetsPosts.length === 0) {
      console.log('ℹ️  No blog posts found in Google Sheets');
      return;
    }
    
    console.log(`📊 Found ${googleSheetsPosts.length} blog posts in Google Sheets`);
    
    // Transform to Airtable format
    const airtableRecords = googleSheetsPosts.map(post => ({
      fields: {
        'Title': post.title || '',
        'Post URL': post.postUrl || post.content || '',
        'Client': post.author || 'Disruptors Media',
        'Status': post.approved ? 'Approved' : 'Draft',
        'Primary Keyword': post.primaryKeyword || '',
        'Publish Date': post.date,
        'Approved': post.approved || false,
        'Feature Image': post.image || 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/default-blog-image'
      }
    }));
    
    // Create in Airtable
    console.log('📤 Creating records in Airtable...');
    const createdRecords = await createRecordsInBatches(BLOG_BASE_ID, 'Table 1', airtableRecords);
    
    console.log(`🎉 Successfully migrated ${createdRecords.length} blog posts to Airtable!`);
    
    // Save migration log
    const migrationLog = {
      timestamp: new Date().toISOString(),
      type: 'blog_posts',
      googleSheetsCount: googleSheetsPosts.length,
      airtableCount: createdRecords.length,
      records: createdRecords.map(r => ({ id: r.id, title: r.fields.Title }))
    };
    
    fs.writeFileSync(
      path.join(__dirname, `blog-migration-log-${Date.now()}.json`),
      JSON.stringify(migrationLog, null, 2)
    );
    
  } catch (error) {
    console.error('❌ Error migrating blog posts:', error.message);
  }
}

/**
 * Migrate client data from Google Sheets to Airtable
 */
async function migrateClients() {
  console.log('\n🔄 MIGRATING CLIENT DATA FROM GOOGLE SHEETS TO AIRTABLE\n');
  
  try {
    // Check if we have the required base ID
    if (!CLIENT_BASE_ID || CLIENT_BASE_ID === 'your_client_base_id_here') {
      console.log('⚠️  Client base ID not configured. Please update REACT_APP_AIRTABLE_CLIENT_BASE_ID in .env file');
      console.log('   You can find your base ID in the Airtable URL: https://airtable.com/[BASE_ID]/...');
      return;
    }
    
    // Fetch from Google Sheets
    console.log('📥 Fetching client data from Google Sheets...');
    const googleSheetsClients = await fetchFromGoogleSheets();
    
    if (googleSheetsClients.length === 0) {
      console.log('ℹ️  No client data found in Google Sheets');
      return;
    }
    
    console.log(`📊 Found ${googleSheetsClients.length} client records in Google Sheets`);
    
    // Transform to Airtable format (skip header row)
    const headers = googleSheetsClients[0];
    const clientRows = googleSheetsClients.slice(1);
    
    const airtableRecords = clientRows.map(row => {
      const clientData = {};
      headers.forEach((header, index) => {
        clientData[header] = row[index] || '';
      });
      
      return {
        fields: {
          'client_id': parseInt(clientData.client_id) || 0,
          'company_name': clientData.company_name || '',
          'industry': clientData.industry || '',
          'contact_name': clientData.contact_name || '',
          'contact_email': clientData.contact_email || '',
          'contact_phone': clientData.contact_phone || '',
          'website_url': clientData.website_url || '',
          'logo_url': clientData.logo_url || '',
          'testimonial_quote': clientData.testimonial_quote || '',
          'testimonial_author': clientData.testimonial_author || '',
          'case_study_url': clientData.case_study_url || ''
        }
      };
    }).filter(record => record.fields.company_name); // Only include records with company names
    
    // Create in Airtable
    console.log('📤 Creating client records in Airtable...');
    const createdRecords = await createRecordsInBatches(CLIENT_BASE_ID, 'Table 1', airtableRecords);
    
    console.log(`🎉 Successfully migrated ${createdRecords.length} clients to Airtable!`);
    
    // Save migration log
    const migrationLog = {
      timestamp: new Date().toISOString(),
      type: 'clients',
      googleSheetsCount: clientRows.length,
      airtableCount: createdRecords.length,
      records: createdRecords.map(r => ({ id: r.id, company: r.fields.company_name }))
    };
    
    fs.writeFileSync(
      path.join(__dirname, `client-migration-log-${Date.now()}.json`),
      JSON.stringify(migrationLog, null, 2)
    );
    
  } catch (error) {
    console.error('❌ Error migrating client data:', error.message);
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 STARTING GOOGLE SHEETS → AIRTABLE MIGRATION');
  console.log('='.repeat(60));
  
  // Check configuration
  if (!AIRTABLE_API_KEY) {
    console.error('❌ REACT_APP_AIRTABLE_API_KEY not found in .env file');
    process.exit(1);
  }
  
  console.log('✅ Airtable API key found');
  console.log(`📋 Blog Base ID: ${BLOG_BASE_ID}`);
  console.log(`👥 Client Base ID: ${CLIENT_BASE_ID}`);
  
  // Run migrations
  await migrateBlogPosts();
  await migrateClients();
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 MIGRATION COMPLETE!');
  console.log('\nNext steps:');
  console.log('1. Check your Airtable bases to verify the data');
  console.log('2. Update your React app to use the new Airtable service');
  console.log('3. Test the integration with: npm start');
}

// Run migration if called directly
if (require.main === module) {
  migrate().catch(console.error);
}

module.exports = { migrate, migrateBlogPosts, migrateClients };