// Test script for blog integration
const fetch = require('cross-fetch');

// Test CSV endpoint directly  
const SHEET_ID = '1KWGeHUOjKtYINSqeneEF8U9hKjEs3U1UTUPaff6OWpA';
const SHEET_GID = '0'; // Content tab (gid 0)

async function testGoogleSheetsAccess() {
  try {
    console.log('Testing Google Sheets CSV access...');
    
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
    console.log('CSV URL:', csvUrl);
    
    const response = await fetch(csvUrl);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers.get('content-type'));
    
    if (response.ok) {
      const csvText = await response.text();
      console.log('CSV data length:', csvText.length);
      console.log('First 200 characters:', csvText.substring(0, 200));
      
      // Parse first line to see headers
      const firstLine = csvText.split('\n')[0];
      console.log('Headers:', firstLine);
      
      return true;
    } else {
      console.error('Failed to fetch CSV:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error testing Google Sheets access:', error.message);
    return false;
  }
}

async function testAPIAccess() {
  try {
    console.log('\nTesting Google Sheets API access...');
    
    const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || 'AIzaSyA_udsKqNNG-aaPumHadHsqiz6nPP6f8L0';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Content!A1:Z100?key=${API_KEY}`;
    
    console.log('API URL:', url);
    
    const response = await fetch(url);
    console.log('API Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('API Response data:', {
        range: data.range,
        majorDimension: data.majorDimension,
        rowCount: data.values ? data.values.length : 0
      });
      
      if (data.values && data.values.length > 0) {
        console.log('Headers:', data.values[0]);
        console.log('First data row:', data.values[1]);
      }
      
      return true;
    } else {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Error testing API access:', error.message);
    return false;
  }
}

async function main() {
  console.log('=== DM3 Blog Integration Test ===\n');
  
  const csvSuccess = await testGoogleSheetsAccess();
  const apiSuccess = await testAPIAccess();
  
  console.log('\n=== Test Results ===');
  console.log('CSV Access:', csvSuccess ? '✅ Success' : '❌ Failed');
  console.log('API Access:', apiSuccess ? '✅ Success' : '❌ Failed');
  
  if (csvSuccess || apiSuccess) {
    console.log('\n🎉 Blog integration is ready to use!');
    console.log('Next steps:');
    console.log('1. Start the development server: npm start');
    console.log('2. Navigate to /blog to see dynamic content');
    console.log('3. Check browser console for loading status');
  } else {
    console.log('\n❌ Blog integration needs configuration');
    console.log('Check:');
    console.log('1. Google Sheet permissions (public access)');
    console.log('2. API key configuration');
    console.log('3. Sheet ID and structure');
  }
}

main().catch(console.error);