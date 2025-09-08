/**
 * Google Sheets sync script for client data
 * Run with: node src/data/clients/clients-sync.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const CLIENTS_GOOGLE_SHEET_ID = process.env.CLIENTS_GOOGLE_SHEET_ID;
const CLIENTS_GOOGLE_SHEET_RANGE = process.env.CLIENTS_GOOGLE_SHEET_RANGE || 'Sheet1!A1:Z1000';

/**
 * Fetch data from Google Sheets API
 */
async function fetchFromGoogleSheets() {
  if (!GOOGLE_SHEETS_API_KEY || !CLIENTS_GOOGLE_SHEET_ID) {
    console.error('❌ Error: Google Sheets credentials not configured in .env file');
    console.log('Required environment variables:');
    console.log('  - GOOGLE_SHEETS_API_KEY');
    console.log('  - CLIENTS_GOOGLE_SHEET_ID');
    process.exit(1);
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${CLIENTS_GOOGLE_SHEET_ID}/values/${CLIENTS_GOOGLE_SHEET_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;
  
  console.log('🔄 Fetching data from Google Sheets...');
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error('❌ Error fetching from Google Sheets:', error.message);
    throw error;
  }
}

/**
 * Convert rows to TypeScript data
 */
function convertToTypeScript(rows) {
  if (rows.length === 0) {
    return { clients: [], lastSyncDate: new Date().toISOString(), totalCount: 0 };
  }

  const headers = rows[0];
  const clients = [];

  // Parse data rows
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 0) continue; // Skip empty rows

    // Convert row array to object using headers
    const rowObject = {};
    headers.forEach((header, index) => {
      rowObject[header] = row[index] || '';
    });

    // Convert to TypeScript client object
    const client = {
      clientId: parseInt(rowObject.client_id) || 0,
      companyName: rowObject.company_name || '',
      industry: rowObject.industry || '',
      contactName: rowObject.contact_name || '',
      contactEmail: rowObject.contact_email || '',
      contactPhone: rowObject.contact_phone || undefined,
      websiteUrl: rowObject.website_url || undefined,
      logoUrl: rowObject.logo_url || undefined,
      projectStartDate: rowObject.project_start_date || undefined,
      projectEndDate: rowObject.project_end_date || undefined,
      projectStatus: rowObject.project_status || 'proposal_sent',
      projectType: rowObject.project_type || undefined,
      budgetRange: rowObject.budget_range || undefined,
      testimonialQuote: rowObject.testimonial_quote || undefined,
      testimonialAuthor: rowObject.testimonial_author || undefined,
      testimonialPosition: rowObject.testimonial_position || undefined,
      caseStudyUrl: rowObject.case_study_url || undefined,
      portfolioUrl: rowObject.portfolio_url || undefined,
      workExamples: rowObject.work_examples || undefined,
      socialMedia: {
        facebook: rowObject.social_media_facebook || undefined,
        instagram: rowObject.social_media_instagram || undefined,
        linkedin: rowObject.social_media_linkedin || undefined,
        twitter: rowObject.social_media_twitter || undefined,
      },
      notes: rowObject.notes || undefined,
      tags: rowObject.tags ? rowObject.tags.split(',').map(tag => tag.trim()) : [],
      updatedAt: new Date().toISOString(),
    };

    clients.push(client);
  }

  return {
    clients,
    lastSyncDate: new Date().toISOString(),
    totalCount: clients.length,
  };
}

/**
 * Generate TypeScript file
 */
function generateTypeScriptFile(clientsData) {
  const content = `/**
 * Auto-generated client data from Google Sheets
 * Last sync: ${clientsData.lastSyncDate}
 * Total clients: ${clientsData.totalCount}
 */

import { Client, ClientsData } from './clients-types';

export const clientsData: ClientsData = ${JSON.stringify(clientsData, null, 2)};

export const clients: Client[] = clientsData.clients;

export default clientsData;
`;

  const filePath = path.join(__dirname, 'clients-data.ts');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Generated TypeScript file: ${filePath}`);
}

/**
 * Generate CSV backup
 */
function generateCsvBackup(rows) {
  if (rows.length === 0) return;

  const csvContent = rows.map(row => 
    row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filePath = path.join(__dirname, `clients-backup-${timestamp}.csv`);
  
  fs.writeFileSync(filePath, csvContent, 'utf8');
  console.log(`💾 Created CSV backup: ${filePath}`);
}

/**
 * Validate client data
 */
function validateClients(clientsData) {
  const issues = [];
  
  clientsData.clients.forEach((client, index) => {
    const rowNumber = index + 2; // +2 because row 1 is headers and array is 0-indexed

    // Required fields
    if (!client.companyName) {
      issues.push(`Row ${rowNumber}: Missing company_name`);
    }
    if (!client.contactEmail) {
      issues.push(`Row ${rowNumber}: Missing contact_email`);
    }
    if (!client.clientId || client.clientId === 0) {
      issues.push(`Row ${rowNumber}: Missing or invalid client_id`);
    }

    // Email validation
    if (client.contactEmail && !/\S+@\S+\.\S+/.test(client.contactEmail)) {
      issues.push(`Row ${rowNumber}: Invalid email format for ${client.contactEmail}`);
    }

    // URL validation
    const urls = [client.websiteUrl, client.logoUrl, client.caseStudyUrl, client.portfolioUrl];
    urls.forEach(url => {
      if (url && !url.match(/^https?:\/\/.+/)) {
        issues.push(`Row ${rowNumber}: Invalid URL format: ${url}`);
      }
    });
  });

  if (issues.length > 0) {
    console.log('⚠️  Validation Issues:');
    issues.forEach(issue => console.log(`  ${issue}`));
  } else {
    console.log('✅ All client data validated successfully');
  }

  return issues.length === 0;
}

/**
 * Main sync function
 */
async function syncClients() {
  try {
    console.log('🚀 Starting Google Sheets sync...\n');
    
    // Fetch data from Google Sheets
    const rows = await fetchFromGoogleSheets();
    console.log(`📊 Fetched ${rows.length - 1} client records\n`);
    
    // Convert to TypeScript format
    const clientsData = convertToTypeScript(rows);
    
    // Validate data
    const isValid = validateClients(clientsData);
    console.log('');
    
    // Generate files
    generateTypeScriptFile(clientsData);
    generateCsvBackup(rows);
    
    console.log('\n🎉 Sync completed successfully!');
    console.log(`📈 Total clients synced: ${clientsData.totalCount}`);
    
    if (!isValid) {
      console.log('\n⚠️  Note: Some validation issues were found. Please review and fix them in the Google Sheet.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Sync failed:', error.message);
    process.exit(1);
  }
}

// Run sync if called directly
if (require.main === module) {
  syncClients();
}

module.exports = { syncClients, fetchFromGoogleSheets, validateClients };