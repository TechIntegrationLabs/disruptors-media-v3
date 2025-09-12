require('dotenv').config();

const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const BLOG_BASE_ID = process.env.REACT_APP_AIRTABLE_BLOG_BASE_ID;
const CLIENT_BASE_ID = process.env.REACT_APP_AIRTABLE_CLIENT_BASE_ID;

console.log('🔍 TESTING AIRTABLE CONNECTION');
console.log('='.repeat(40));
console.log('API Key:', AIRTABLE_API_KEY ? AIRTABLE_API_KEY.substring(0, 15) + '...' : 'Missing');
console.log('Blog Base ID:', BLOG_BASE_ID);
console.log('Client Base ID:', CLIENT_BASE_ID);
console.log('');

async function testTableAccess(baseId, tableName, baseName) {
  try {
    console.log(`🔍 Testing ${baseName} - Table: "${tableName}"`);
    
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?maxRecords=1`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`
      }
    });
    
    console.log(`   Status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ SUCCESS - Found ${data.records?.length || 0} records`);
      if (data.records && data.records.length > 0) {
        console.log(`   📋 Sample fields:`, Object.keys(data.records[0].fields));
      }
      return { success: true, tableName, data };
    } else {
      const errorText = await response.text();
      console.log(`   ❌ ERROR: ${errorText}`);
      return { success: false, tableName, error: errorText };
    }
  } catch (error) {
    console.log(`   💥 EXCEPTION: ${error.message}`);
    return { success: false, tableName, error: error.message };
  }
}

async function findWorkingTables() {
  console.log('🔍 TESTING COMMON TABLE NAMES\n');
  
  const commonTableNames = [
    'Table 1',
    'Blog Posts', 
    'Posts',
    'Content',
    'Clients',
    'Client Data',
    'Table1',
    'tbl1',
    'Default'
  ];
  
  // Test blog base
  console.log('📝 TESTING BLOG BASE:');
  const blogResults = [];
  for (const tableName of commonTableNames) {
    const result = await testTableAccess(BLOG_BASE_ID, tableName, 'Blog Base');
    blogResults.push(result);
    if (result.success) {
      console.log(`   🎯 FOUND WORKING TABLE: "${tableName}"`);
      break; // Stop at first working table
    }
  }
  
  console.log('\n👥 TESTING CLIENT BASE:');
  const clientResults = [];
  for (const tableName of commonTableNames) {
    const result = await testTableAccess(CLIENT_BASE_ID, tableName, 'Client Base');
    clientResults.push(result);
    if (result.success) {
      console.log(`   🎯 FOUND WORKING TABLE: "${tableName}"`);
      break; // Stop at first working table
    }
  }
  
  console.log('\n' + '='.repeat(40));
  console.log('📋 SUMMARY:');
  
  const workingBlogTable = blogResults.find(r => r.success);
  const workingClientTable = clientResults.find(r => r.success);
  
  if (workingBlogTable) {
    console.log(`✅ Blog table found: "${workingBlogTable.tableName}"`);
  } else {
    console.log('❌ No working blog table found');
  }
  
  if (workingClientTable) {
    console.log(`✅ Client table found: "${workingClientTable.tableName}"`);
  } else {
    console.log('❌ No working client table found');
  }
  
  return {
    blogTable: workingBlogTable?.tableName,
    clientTable: workingClientTable?.tableName
  };
}

// Run the test
if (require.main === module) {
  findWorkingTables().catch(console.error);
}

module.exports = { findWorkingTables };