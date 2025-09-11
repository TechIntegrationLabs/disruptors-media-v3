// Netlify Function: Validate and optimize image URLs
// Endpoint: /.netlify/functions/validate-image

export const handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
    const { url, width, height } = event.queryStringParameters || {};
    
    if (!url) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Image URL is required' })
      };
    }

    // Validate the image URL
    const isValid = await validateImageUrl(url);
    
    if (!isValid) {
      // Return default image if validation fails
      const defaultImage = 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/default-blog-image';
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          valid: false,
          originalUrl: url,
          optimizedUrl: defaultImage,
          fallback: true
        })
      };
    }

    // Get optimized URL
    const optimizedUrl = getOptimizedImageUrl(url, parseInt(width) || 800, parseInt(height) || 600);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        valid: true,
        originalUrl: url,
        optimizedUrl: optimizedUrl,
        fallback: false
      })
    };

  } catch (error) {
    console.error('Error validating image URL:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to validate image URL',
        message: error.message
      })
    };
  }
};

// Validate image URL
async function validateImageUrl(url) {
  try {
    if (!url) return false;
    
    const response = await fetch(url, { 
      method: 'HEAD',
      timeout: 5000 // 5 second timeout
    });
    
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch (error) {
    console.error('Error validating image URL:', error);
    return false;
  }
}

// Get optimized image URL (for Cloudinary - DM3 specific)
function getOptimizedImageUrl(url, width = 800, height = 600) {
  if (!url) {
    return 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/default-blog-image';
  }
  
  // If it's a Cloudinary URL, we can add transformations
  if (url.includes('cloudinary.com')) {
    // Insert transformation parameters
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`);
  }
  
  return url;
}

// Example usage from frontend:
/*
const response = await fetch(`/.netlify/functions/validate-image?url=${encodeURIComponent(imageUrl)}&width=800&height=600`);
const data = await response.json();

if (data.valid) {
  console.log('Image is valid:', data.optimizedUrl);
} else {
  console.log('Using fallback image:', data.optimizedUrl);
}
*/