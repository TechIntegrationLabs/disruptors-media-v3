/**
 * Google Sheets Write Service
 * Handles writing/updating blog posts to Google Sheets
 * This extends the read-only googleSheetsService with write capabilities
 */

require('dotenv').config();

const GOOGLE_SHEETS_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || process.env.GOOGLE_SHEETS_API_KEY;
const BLOG_SHEET_ID = process.env.REACT_APP_BLOG_GOOGLE_SHEET_ID;
const SHEET_NAME = 'Content'; // The main content sheet

/**
 * Google Sheets API request helper
 */
async function sheetsApiRequest(method, endpoint, data = null) {
  if (!GOOGLE_SHEETS_API_KEY) {
    throw new Error('Google Sheets API key not configured');
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${BLOG_SHEET_ID}${endpoint}?key=${GOOGLE_SHEETS_API_KEY}`;
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  console.log(`📡 Google Sheets API ${method}: ${endpoint}`);

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Get the current sheet data to understand structure
 */
async function getSheetStructure() {
  try {
    const data = await sheetsApiRequest('GET', `/values/${SHEET_NAME}!A1:Z1`);
    const headers = data.values?.[0] || [];
    
    console.log('📋 Current sheet headers:', headers);
    
    // Map headers to column indices
    const columnMap = {};
    headers.forEach((header, index) => {
      const key = header.toLowerCase().replace(/[^a-z0-9]/g, '_');
      columnMap[key] = {
        index,
        column: String.fromCharCode(65 + index), // A, B, C, etc.
        header: header
      };
    });
    
    return { headers, columnMap };
    
  } catch (error) {
    console.error('❌ Error getting sheet structure:', error);
    throw error;
  }
}

/**
 * Find the next empty row in the sheet
 */
async function getNextEmptyRow() {
  try {
    const data = await sheetsApiRequest('GET', `/values/${SHEET_NAME}!A:A`);
    const rows = data.values || [];
    return rows.length + 1; // Next row after the last one with data
  } catch (error) {
    console.error('❌ Error finding next empty row:', error);
    return 2; // Default to row 2 if we can't determine
  }
}

/**
 * Convert blog post data to Google Sheets row format
 */
function blogPostToSheetRow(post, columnMap) {
  // Create an array for the row, filled with empty strings
  const maxColumns = Math.max(...Object.values(columnMap).map(col => col.index)) + 1;
  const row = new Array(maxColumns).fill('');
  
  // Map blog post fields to sheet columns
  const fieldMapping = {
    title: post.title || '',
    post_url: post.postUrl || post.content || '',
    client: post.author || post.client || 'Disruptors Media',
    status: post.status || (post.approved ? 'Approved' : 'Draft'),
    primary_keyword: post.primaryKeyword || '',
    publish_date: post.date || new Date().toISOString().split('T')[0],
    approved: post.approved ? 'YES' : 'NO',
    feature_image: post.image || ''
  };
  
  // Fill in the row based on column mapping
  Object.entries(fieldMapping).forEach(([key, value]) => {
    if (columnMap[key]) {
      row[columnMap[key].index] = value;
    }
  });
  
  return row;
}

/**
 * Add a new blog post to Google Sheets
 */
async function addBlogPostToSheet(post) {
  console.log(`📝 Adding blog post to Google Sheets: "${post.title}"`);
  
  try {
    // Get sheet structure
    const { columnMap } = await getSheetStructure();
    
    // Convert post to row format
    const row = blogPostToSheetRow(post, columnMap);
    
    // Find next empty row
    const nextRow = await getNextEmptyRow();
    const range = `${SHEET_NAME}!A${nextRow}:Z${nextRow}`;
    
    // Add the row
    const response = await sheetsApiRequest('PUT', `/values/${range}`, {
      values: [row],
      valueInputOption: 'USER_ENTERED'
    });
    
    console.log(`✅ Added blog post to row ${nextRow}`);
    return { success: true, row: nextRow, response };
    
  } catch (error) {
    console.error(`❌ Error adding blog post "${post.title}" to sheet:`, error);
    throw error;
  }
}

/**
 * Update an existing blog post in Google Sheets
 */
async function updateBlogPostInSheet(post, rowNumber) {
  console.log(`📝 Updating blog post in Google Sheets: "${post.title}" (row ${rowNumber})`);
  
  try {
    // Get sheet structure
    const { columnMap } = await getSheetStructure();
    
    // Convert post to row format
    const row = blogPostToSheetRow(post, columnMap);
    
    // Update the specific row
    const range = `${SHEET_NAME}!A${rowNumber}:Z${rowNumber}`;
    
    const response = await sheetsApiRequest('PUT', `/values/${range}`, {
      values: [row],
      valueInputOption: 'USER_ENTERED'
    });
    
    console.log(`✅ Updated blog post in row ${rowNumber}`);
    return { success: true, row: rowNumber, response };
    
  } catch (error) {
    console.error(`❌ Error updating blog post "${post.title}" in sheet:`, error);
    throw error;
  }
}

/**
 * Find a blog post in the sheet by title and primary keyword
 */
async function findBlogPostInSheet(title, primaryKeyword = '') {
  try {
    console.log(`🔍 Searching for blog post: "${title}"`);
    
    const data = await sheetsApiRequest('GET', `/values/${SHEET_NAME}!A:Z`);
    const rows = data.values || [];
    
    if (rows.length === 0) return null;
    
    const headers = rows[0];
    const titleCol = headers.findIndex(h => h.toLowerCase().includes('title'));
    const keywordCol = headers.findIndex(h => h.toLowerCase().includes('primary keyword'));
    
    // Search through data rows (skip header)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const rowTitle = (row[titleCol] || '').toLowerCase().trim();
      const rowKeyword = (row[keywordCol] || '').toLowerCase().trim();
      
      if (rowTitle === title.toLowerCase().trim() && 
          (!primaryKeyword || rowKeyword === primaryKeyword.toLowerCase().trim())) {
        return {
          found: true,
          rowNumber: i + 1, // Sheet rows are 1-indexed
          data: row
        };
      }
    }
    
    return { found: false };
    
  } catch (error) {
    console.error(`❌ Error searching for blog post "${title}":`, error);
    throw error;
  }
}

/**
 * Batch update multiple blog posts
 */
async function batchUpdateBlogPosts(posts) {
  console.log(`📝 Batch updating ${posts.length} blog posts in Google Sheets`);
  
  const results = [];
  
  for (const post of posts) {
    try {
      // Check if post exists
      const existing = await findBlogPostInSheet(post.title, post.primaryKeyword);
      
      if (existing.found) {
        // Update existing post
        const result = await updateBlogPostInSheet(post, existing.rowNumber);
        results.push({ ...result, action: 'updated', post: post.title });
      } else {
        // Add new post
        const result = await addBlogPostToSheet(post);
        results.push({ ...result, action: 'added', post: post.title });
      }
      
      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error processing post "${post.title}":`, error);
      results.push({ 
        success: false, 
        error: error.message, 
        post: post.title,
        action: 'error'
      });
    }
  }
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Batch update complete: ${successful} successful, ${failed} failed`);
  
  return results;
}

/**
 * Approve a blog post (set Approved column to YES)
 */
async function approveBlogPost(title, primaryKeyword = '') {
  console.log(`✅ Approving blog post: "${title}"`);
  
  try {
    const existing = await findBlogPostInSheet(title, primaryKeyword);
    
    if (!existing.found) {
      throw new Error('Blog post not found in sheet');
    }
    
    // Get sheet structure to find approved column
    const { columnMap } = await getSheetStructure();
    const approvedCol = columnMap.approved;
    
    if (!approvedCol) {
      throw new Error('Approved column not found in sheet');
    }
    
    // Update just the approved column
    const range = `${SHEET_NAME}!${approvedCol.column}${existing.rowNumber}`;
    
    const response = await sheetsApiRequest('PUT', `/values/${range}`, {
      values: [['YES']],
      valueInputOption: 'USER_ENTERED'
    });
    
    console.log(`✅ Approved blog post "${title}"`);
    return { success: true, response };
    
  } catch (error) {
    console.error(`❌ Error approving blog post "${title}":`, error);
    throw error;
  }
}

/**
 * Test the write functionality
 */
async function testWriteOperations() {
  console.log('🧪 Testing Google Sheets write operations...');
  
  try {
    // Test getting structure
    const structure = await getSheetStructure();
    console.log('✅ Got sheet structure');
    
    // Test finding next row
    const nextRow = await getNextEmptyRow();
    console.log(`✅ Next empty row: ${nextRow}`);
    
    // Test creating a sample post
    const testPost = {
      title: 'Test Post - Google Sheets Write Test',
      postUrl: 'https://docs.google.com/document/d/test-write',
      author: 'Test Author',
      primaryKeyword: 'test write',
      date: new Date().toISOString().split('T')[0],
      approved: false,
      image: 'https://example.com/test.jpg'
    };
    
    const result = await addBlogPostToSheet(testPost);
    console.log('✅ Test post added:', result);
    
    return { success: true, structure, nextRow, testResult: result };
    
  } catch (error) {
    console.error('❌ Write operations test failed:', error);
    return { success: false, error: error.message };
  }
}

// Export functions
module.exports = {
  addBlogPostToSheet,
  updateBlogPostInSheet,
  findBlogPostInSheet,
  batchUpdateBlogPosts,
  approveBlogPost,
  getSheetStructure,
  testWriteOperations
};

// CLI usage
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'test':
      testWriteOperations().then(console.log).catch(console.error);
      break;
    case 'structure':
      getSheetStructure().then(console.log).catch(console.error);
      break;
    default:
      console.log('Usage: node googleSheetsWriteService.js [test|structure]');
  }
}