// Google Sheets API Service for DM3 Blog Integration
// This service fetches blog posts from Google Sheets and filters by post date

const SHEET_ID = '1KWGeHUOjKtYINSqeneEF8U9hKjEs3U1UTUPaff6OWpA'; // Blog Content Sheet ID
const SHEET_GID = '0'; // Content tab (gid 0)
const SHEET_NAME = 'Content'; // Content sheet name
const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || '';
const RANGE = 'A1:Z100'; // Adjust based on your data range

export const fetchBlogPostsFromSheet = async () => {
  try {
    // If no API key, return empty array and fall back to CSV
    if (!API_KEY) {
      console.warn('Google Sheets API key not configured. Using CSV fallback.');
      return await fetchBlogPostsFromCSV();
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${RANGE}?key=${API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data');
    }

    const data = await response.json();
    const rows = data.values || [];
    
    if (rows.length === 0) {
      return [];
    }

    // First row contains headers
    const headers = rows[0];
    const blogPosts = [];
    
    console.log('Google Sheets Headers:', headers);
    console.log('Total rows:', rows.length);
    
    // Find column indices based on blog content sheet headers
    const columnIndices = {
      title: headers.findIndex(h => h.toLowerCase().includes('title')),
      content: headers.findIndex(h => h.toLowerCase().includes('post url')), // Post URL column
      image: headers.findIndex(h => h.toLowerCase().includes('feature image')), // Feature Image column
      postDate: headers.findIndex(h => h.toLowerCase().includes('publish date')), // Publish date column
      approved: headers.findIndex(h => h.toLowerCase().includes('approved')), // Approved column
      client: headers.findIndex(h => h.toLowerCase().includes('client')),
      status: headers.findIndex(h => h.toLowerCase().includes('status')),
      primaryKeyword: headers.findIndex(h => h.toLowerCase().includes('primary keyword'))
    };
    
    console.log('Column indices:', columnIndices);

    // Process each row (skip header row)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      
      // Skip empty rows
      if (!row || row.length === 0 || !row[columnIndices.title] || row[columnIndices.title].trim() === '') continue;

      // Only include approved posts
      const approved = row[columnIndices.approved] || '';
      if (approved.toLowerCase() !== 'yes') {
        console.log(`Skipping non-approved post: ${row[columnIndices.title]}`);
        continue;
      }

      // Parse the post date
      const postDateStr = row[columnIndices.postDate] || '';
      
      // Check if post should be visible (past posts only)
      const shouldInclude = isPostVisible(postDateStr);
      
      if (shouldInclude) {
        const title = row[columnIndices.title] || '';
        const contentUrl = row[columnIndices.content] || '';
        const imageUrl = row[columnIndices.image] || 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/default-blog-image';
        const client = row[columnIndices.client] || 'Disruptors Media';
        const primaryKeyword = row[columnIndices.primaryKeyword] || '';
        
        // Create excerpt from title or primary keyword
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
          content: contentUrl, // Store the Google Docs link
          postUrl: contentUrl,
          primaryKeyword: primaryKeyword
        };

        console.log('Adding approved blog post:', blogPost);
        blogPosts.push(blogPost);
      }
    }

    console.log('Final blog posts:', blogPosts);

    // Sort by date (newest first)
    blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    return blogPosts;

  } catch (error) {
    console.error('Error fetching blog posts from Google Sheets API:', error);
    // Fall back to CSV method
    return await fetchBlogPostsFromCSV();
  }
};

// Helper function to check if a post should be visible based on its date
export const isPostVisible = (postDate) => {
  if (!postDate) return true; // Show posts without dates
  
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Include today's posts
  
  const postDateObj = new Date(postDate);
  return postDateObj <= today;
};

// Alternative: Direct public CSV export (no API key needed)
export const fetchBlogPostsFromCSV = async () => {
  try {
    // Google Sheets public CSV export URL
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
    
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch CSV data');
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    if (rows.length === 0) {
      return [];
    }

    // Process CSV data similar to API method
    const headers = rows[0];
    const blogPosts = [];
    
    console.log('CSV Headers:', headers);
    console.log('CSV Total rows:', rows.length);
    
    // Find column indices based on blog content sheet headers (same as API method)
    const columnIndices = {
      title: headers.findIndex(h => h.toLowerCase().includes('title')),
      content: headers.findIndex(h => h.toLowerCase().includes('post url')), // Post URL column
      image: headers.findIndex(h => h.toLowerCase().includes('feature image')), // Feature Image column
      postDate: headers.findIndex(h => h.toLowerCase().includes('publish date')), // Publish date column
      approved: headers.findIndex(h => h.toLowerCase().includes('approved')), // Approved column
      client: headers.findIndex(h => h.toLowerCase().includes('client')),
      status: headers.findIndex(h => h.toLowerCase().includes('status')),
      primaryKeyword: headers.findIndex(h => h.toLowerCase().includes('primary keyword'))
    };
    
    console.log('CSV Column indices:', columnIndices);

    // Process each row (same logic as API method)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.length === 0 || !row[columnIndices.title] || row[columnIndices.title].trim() === '') continue;

      // Only include approved posts
      const approved = row[columnIndices.approved] || '';
      if (approved.toLowerCase() !== 'yes') {
        console.log(`CSV: Skipping non-approved post: ${row[columnIndices.title]}`);
        continue;
      }

      const postDateStr = row[columnIndices.postDate] || '';
      const shouldInclude = isPostVisible(postDateStr);
      
      if (shouldInclude) {
        const title = row[columnIndices.title] || '';
        const contentUrl = row[columnIndices.content] || '';
        const imageUrl = row[columnIndices.image] || 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/default-blog-image';
        const client = row[columnIndices.client] || 'Disruptors Media';
        const primaryKeyword = row[columnIndices.primaryKeyword] || '';
        
        // Create excerpt from title or primary keyword
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
          content: contentUrl, // Store the Google Docs link
          postUrl: contentUrl,
          primaryKeyword: primaryKeyword
        };

        blogPosts.push(blogPost);
      }
    }

    blogPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });

    return blogPosts;

  } catch (error) {
    console.error('Error fetching blog posts from CSV:', error);
    return [];
  }
};

// Helper functions
const createExcerptFromTitle = (title, primaryKeyword = '') => {
  if (title.length > 150) return title.substring(0, 150) + '...';
  
  // Use primary keyword to create more relevant excerpt
  if (primaryKeyword && primaryKeyword.length > 10) {
    return `Discover how ${primaryKeyword.toLowerCase()} can transform your business. Learn practical strategies and insights that drive real results.`;
  }
  
  return `Explore insights and strategies to help grow your business through effective ${title.toLowerCase().includes('content') ? 'content creation' : 'marketing'} approaches.`;
};

const determineCategoryFromTitle = (title, primaryKeyword = '') => {
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
};

const createSlugFromTitle = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(' ').length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};

// Simple CSV parser
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const result = [];
  
  for (const line of lines) {
    if (!line.trim()) continue; // Skip empty lines
    
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