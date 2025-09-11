// Netlify Function: Health check and system status
// Endpoint: /.netlify/functions/health-check

export const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const timestamp = new Date().toISOString();
    
    // Check environment variables
    const envStatus = {
      hasOpenAI: !!process.env.REACT_APP_OPENAI_API_KEY || !!process.env.OPENAI_API_KEY,
      hasGoogleSheets: !!process.env.REACT_APP_GOOGLE_SHEETS_API_KEY,
      hasCloudinary: !!process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      blogSheetId: !!process.env.REACT_APP_BLOG_GOOGLE_SHEET_ID
    };

    // Check external service connectivity
    const servicesStatus = await checkExternalServices();

    const healthStatus = {
      status: 'healthy',
      timestamp,
      environment: {
        nodeVersion: process.version,
        ...envStatus
      },
      services: servicesStatus,
      functions: {
        'blog-posts': 'active',
        'google-docs-content': 'active',
        'contact-form': 'active',
        'ai-chat': envStatus.hasOpenAI ? 'active' : 'inactive - no API key',
        'validate-image': 'active',
        'health-check': 'active'
      }
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(healthStatus)
    };

  } catch (error) {
    console.error('Health check failed:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message
      })
    };
  }
};

async function checkExternalServices() {
  const services = {
    cloudinary: 'unknown',
    googleSheets: 'unknown',
    openai: 'unknown'
  };

  try {
    // Check Cloudinary (basic ping)
    const cloudinaryResponse = await fetch('https://res.cloudinary.com/dvcvxhzmt/image/upload/w_10,h_10,c_fill,q_1,f_auto/v1/blog/default-blog-image', {
      method: 'HEAD',
      timeout: 3000
    });
    services.cloudinary = cloudinaryResponse.ok ? 'healthy' : 'error';
  } catch (error) {
    services.cloudinary = 'error';
  }

  try {
    // Check Google Sheets API (if API key available)
    if (process.env.REACT_APP_GOOGLE_SHEETS_API_KEY && process.env.REACT_APP_BLOG_GOOGLE_SHEET_ID) {
      const sheetsResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_BLOG_GOOGLE_SHEET_ID}?key=${process.env.REACT_APP_GOOGLE_SHEETS_API_KEY}`,
        { timeout: 3000 }
      );
      services.googleSheets = sheetsResponse.ok ? 'healthy' : 'error';
    } else {
      services.googleSheets = 'not configured';
    }
  } catch (error) {
    services.googleSheets = 'error';
  }

  try {
    // Check OpenAI API (if API key available)
    if (process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY) {
      const openaiResponse = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY}`
        },
        timeout: 3000
      });
      services.openai = openaiResponse.ok ? 'healthy' : 'error';
    } else {
      services.openai = 'not configured';
    }
  } catch (error) {
    services.openai = 'error';
  }

  return services;
}

// Example usage from frontend:
/*
const response = await fetch('/.netlify/functions/health-check');
const healthData = await response.json();
console.log('System health:', healthData);
*/