// Netlify Function: Fetch blog posts from Google Sheets
// Endpoint: /.netlify/functions/blog-posts

const SHEET_ID = process.env.REACT_APP_BLOG_GOOGLE_SHEET_ID || '1KWGeHUOjKtYINSqeneEF8U9hKjEs3U1UTUPaff6OWpA';
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || '';
const SHEET_NAME = 'Content';
const RANGE = 'A1:Z100';

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
    // If no API key, use CSV fallback
    if (!API_KEY) {
      console.log('Google Sheets API key not configured. Using CSV fallback.');
      return await fetchBlogPostsFromCSV(headers);
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.status}`);
    }

    const data = await response.json();
    const rows = data.values || [];
    
    if (rows.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([])
      };
    }

    const headers_row = rows[0];
    const blogPosts = [];
    
    // Find column indices
    const columnIndices = {
      title: headers_row.findIndex(h => h.toLowerCase().includes('title')),
      content: headers_row.findIndex(h => h.toLowerCase().includes('post url')),
      image: headers_row.findIndex(h => h.toLowerCase().includes('feature image')),
      postDate: headers_row.findIndex(h => h.toLowerCase().includes('publish date')),
      approved: headers_row.findIndex(h => h.toLowerCase().includes('approved')),
      client: headers_row.findIndex(h => h.toLowerCase().includes('client')),
      primaryKeyword: headers_row.findIndex(h => h.toLowerCase().includes('primary keyword'))
    };

    // Process each row (skip header row)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      
      if (!row || row.length === 0 || !row[columnIndices.title] || row[columnIndices.title].trim() === '') continue;

      // Only include approved posts
      const approved = row[columnIndices.approved] || '';
      if (approved.toLowerCase() !== 'yes') continue;

      // Check if post should be visible (past posts only)
      const postDateStr = row[columnIndices.postDate] || '';
      if (!isPostVisible(postDateStr)) continue;
      
      const title = row[columnIndices.title] || '';
      const contentUrl = row[columnIndices.content] || '';
      const imageUrl = row[columnIndices.image] || 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/default-blog-image';
      const client = row[columnIndices.client] || 'Disruptors Media';
      const primaryKeyword = row[columnIndices.primaryKeyword] || '';
      
      const excerpt = createExcerptFromTitle(title, primaryKeyword);
      const category = determineCategoryFromTitle(title, primaryKeyword);
      const slug = createSlugFromTitle(title);

      const blogPost = {
        id: i,
        title: title,
        excerpt: excerpt,
        slug: slug,
        category: category,
        author: client,
        date: postDateStr || new Date().toISOString().split('T')[0],
        image: imageUrl,
        readTime: calculateReadTime(excerpt),
        content: contentUrl,
        postUrl: contentUrl,
        primaryKeyword: primaryKeyword,
        tags: [],
        featured: false
      };

      blogPosts.push(blogPost);
    }

    // Sort by date (newest first)
    blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(blogPosts)
    };

  } catch (error) {
    console.error('Error fetching blog posts from Google Sheets API:', error);
    
    // Fall back to CSV method
    return await fetchBlogPostsFromCSV(headers);
  }
};

// CSV fallback function
async function fetchBlogPostsFromCSV(headers) {
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
    
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch CSV data');
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    if (rows.length === 0) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify([])
      };
    }

    const headers_row = rows[0];
    const blogPosts = [];
    
    const columnIndices = {
      title: headers_row.findIndex(h => h.toLowerCase().includes('title')),
      content: headers_row.findIndex(h => h.toLowerCase().includes('post url')),
      image: headers_row.findIndex(h => h.toLowerCase().includes('feature image')),
      postDate: headers_row.findIndex(h => h.toLowerCase().includes('publish date')),
      approved: headers_row.findIndex(h => h.toLowerCase().includes('approved')),
      client: headers_row.findIndex(h => h.toLowerCase().includes('client')),
      primaryKeyword: headers_row.findIndex(h => h.toLowerCase().includes('primary keyword'))
    };

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0 || !row[columnIndices.title] || row[columnIndices.title].trim() === '') continue;

      const approved = row[columnIndices.approved] || '';
      if (approved.toLowerCase() !== 'yes') continue;

      const postDateStr = row[columnIndices.postDate] || '';
      if (!isPostVisible(postDateStr)) continue;
      
      const title = row[columnIndices.title] || '';
      const contentUrl = row[columnIndices.content] || '';
      const imageUrl = row[columnIndices.image] || 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/default-blog-image';
      const client = row[columnIndices.client] || 'Disruptors Media';
      const primaryKeyword = row[columnIndices.primaryKeyword] || '';
      
      const excerpt = createExcerptFromTitle(title, primaryKeyword);
      const category = determineCategoryFromTitle(title, primaryKeyword);
      const slug = createSlugFromTitle(title);

      const blogPost = {
        id: i,
        title: title,
        excerpt: excerpt,
        slug: slug,
        category: category,
        author: client,
        date: postDateStr || new Date().toISOString().split('T')[0],
        image: imageUrl,
        readTime: calculateReadTime(excerpt),
        content: contentUrl,
        postUrl: contentUrl,
        primaryKeyword: primaryKeyword,
        tags: [],
        featured: false
      };

      blogPosts.push(blogPost);
    }

    blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(blogPosts)
    };

  } catch (error) {
    console.error('Error fetching blog posts from CSV:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch blog posts' })
    };
  }
}

// Helper functions
function isPostVisible(postDate) {
  if (!postDate) return true;
  
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  const postDateObj = new Date(postDate);
  return postDateObj <= today;
}

function createExcerptFromTitle(title, primaryKeyword = '') {
  if (title.length > 150) return title.substring(0, 150) + '...';
  
  if (primaryKeyword && primaryKeyword.length > 10) {
    return `Discover how ${primaryKeyword.toLowerCase()} can transform your business. Learn practical strategies and insights that drive real results.`;
  }
  
  return `Explore insights and strategies to help grow your business through effective ${title.toLowerCase().includes('content') ? 'content creation' : 'marketing'} approaches.`;
}

function determineCategoryFromTitle(title, primaryKeyword = '') {
  const searchText = `${title} ${primaryKeyword}`.toLowerCase();
  
  if (searchText.includes('tech') || searchText.includes('digital') || searchText.includes('software')) return 'technology';
  if (searchText.includes('design') || searchText.includes('visual') || searchText.includes('creative')) return 'design';
  if (searchText.includes('brand') || searchText.includes('identity') || searchText.includes('logo')) return 'branding';
  if (searchText.includes('strategy') || searchText.includes('strategic') || searchText.includes('plan')) return 'strategy';
  if (searchText.includes('system') || searchText.includes('automation') || searchText.includes('workflow')) return 'systems';
  if (searchText.includes('ai') || searchText.includes('artificial intelligence') || searchText.includes('machine learning')) return 'ai';
  if (searchText.includes('social') || searchText.includes('media') || searchText.includes('instagram') || searchText.includes('facebook')) return 'social media';
  if (searchText.includes('seo') || searchText.includes('search') || searchText.includes('ranking')) return 'seo';
  if (searchText.includes('content') || searchText.includes('blog') || searchText.includes('writing')) return 'content';
  
  return 'marketing';
}

function createSlugFromTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(' ').length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
}

function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const result = [];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    const row = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    row.push(current.trim());
    result.push(row);
  }
  
  return result;
}