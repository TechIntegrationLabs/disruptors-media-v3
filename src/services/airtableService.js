// Airtable API Service for DM3 Blog Integration
// This service fetches blog posts from Airtable and manages content

const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY || process.env.AIRTABLE_API_KEY;
const BLOG_BASE_ID = process.env.REACT_APP_AIRTABLE_BLOG_BASE_ID;
const CLIENT_BASE_ID = process.env.REACT_APP_AIRTABLE_CLIENT_BASE_ID;

const AIRTABLE_API_BASE = 'https://api.airtable.com/v0';

/**
 * Generic Airtable API request handler
 */
async function airtableRequest(baseId, tableName, options = {}) {
  if (!AIRTABLE_API_KEY) {
    throw new Error('Airtable API key not configured');
  }
  
  if (!baseId) {
    throw new Error(`Base ID not configured for ${tableName}`);
  }

  const { method = 'GET', body, params = {} } = options;
  
  // Build URL with query parameters
  const searchParams = new URLSearchParams(params);
  const url = `${AIRTABLE_API_BASE}/${baseId}/${tableName}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
  
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

  console.log(`Airtable API Request: ${method} ${url}`);
  
  const response = await fetch(url, requestOptions);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Airtable API Error:', response.status, errorText);
    throw new Error(`Airtable API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

/**
 * Fetch blog posts from Airtable Blog Content base
 */
export const fetchBlogPostsFromAirtable = async () => {
  try {
    console.log('🔄 Fetching blog posts from Airtable...');
    
    // Fetch records with filtering for approved posts
    const params = {
      filterByFormula: '{Approved} = TRUE()',
      maxRecords: 100
    };
    
    const data = await airtableRequest(BLOG_BASE_ID, 'Table 1', { params });
    const records = data.records || [];
    
    console.log(`📊 Found ${records.length} approved blog posts`);
    
    const blogPosts = [];
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Include today's posts
    
    records.forEach((record, index) => {
      const fields = record.fields;
      
      // Skip posts without required fields
      if (!fields.Title || !fields.Title.trim()) {
        console.log(`⚠️ Skipping post ${record.id}: Missing title`);
        return;
      }
      
      // Check if post should be visible (published date <= today)
      const publishDate = new Date(fields['Publish Date'] || Date.now());
      if (publishDate > today) {
        console.log(`⏰ Skipping future post: ${fields.Title} (${fields['Publish Date']})`);
        return;
      }
      
      // Transform Airtable record to blog post format
      const blogPost = {
        id: record.id,
        title: fields.Title || '',
        excerpt: createExcerptFromTitle(fields.Title, fields['Primary Keyword']),
        slug: createSlugFromTitle(fields.Title),
        category: determineCategoryFromTitle(fields.Title, fields['Primary Keyword']),
        author: fields.Client || 'Disruptors Media',
        date: fields['Publish Date'] || new Date().toISOString().split('T')[0],
        image: fields['Feature Image'] || getDefaultBlogImage(),
        readTime: calculateReadTime(fields.Title + ' ' + (fields['Primary Keyword'] || '')),
        content: fields['Post URL'] || '', // Store the Google Docs link
        postUrl: fields['Post URL'] || '',
        primaryKeyword: fields['Primary Keyword'] || '',
        status: fields.Status || 'Draft',
        approved: fields.Approved || false,
        tags: fields['Primary Keyword'] ? [fields['Primary Keyword']] : [],
        featured: fields.Status === 'Published' && fields.Approved
      };
      
      console.log(`✅ Added blog post: ${blogPost.title}`);
      blogPosts.push(blogPost);
    });
    
    console.log(`🎉 Successfully processed ${blogPosts.length} blog posts from Airtable`);
    return blogPosts;
    
  } catch (error) {
    console.error('❌ Error fetching blog posts from Airtable:', error);
    
    // Fallback to Google Sheets if Airtable fails
    console.log('🔄 Falling back to Google Sheets...');
    try {
      const { fetchBlogPostsFromSheet } = await import('./googleSheetsService.js');
      return await fetchBlogPostsFromSheet();
    } catch (fallbackError) {
      console.error('❌ Fallback to Google Sheets also failed:', fallbackError);
      return [];
    }
  }
};

/**
 * Create a new blog post in Airtable
 */
export const createBlogPost = async (blogPostData) => {
  try {
    const record = {
      fields: {
        'Title': blogPostData.title,
        'Post URL': blogPostData.postUrl || blogPostData.content,
        'Client': blogPostData.author || 'Disruptors Media',
        'Status': blogPostData.status || 'Draft',
        'Primary Keyword': blogPostData.primaryKeyword || '',
        'Publish Date': blogPostData.date,
        'Approved': blogPostData.approved || false,
        'Feature Image': blogPostData.image || getDefaultBlogImage()
      }
    };
    
    const data = await airtableRequest(BLOG_BASE_ID, 'Table 1', {
      method: 'POST',
      body: { records: [record] }
    });
    
    console.log('✅ Created blog post in Airtable:', data.records[0].id);
    return data.records[0];
    
  } catch (error) {
    console.error('❌ Error creating blog post in Airtable:', error);
    throw error;
  }
};

/**
 * Update blog post in Airtable
 */
export const updateBlogPost = async (recordId, updates) => {
  try {
    const record = {
      id: recordId,
      fields: updates
    };
    
    const data = await airtableRequest(BLOG_BASE_ID, 'Table 1', {
      method: 'PATCH',
      body: { records: [record] }
    });
    
    console.log('✅ Updated blog post in Airtable:', recordId);
    return data.records[0];
    
  } catch (error) {
    console.error('❌ Error updating blog post in Airtable:', error);
    throw error;
  }
};

/**
 * Approve blog post (set Approved = true, Status = "Approved")
 */
export const approveBlogPost = async (recordId) => {
  return await updateBlogPost(recordId, {
    'Approved': true,
    'Status': 'Approved'
  });
};

/**
 * Publish blog post (set Status = "Published", Publish Date = today)
 */
export const publishBlogPost = async (recordId, publishDate = null) => {
  return await updateBlogPost(recordId, {
    'Status': 'Published',
    'Approved': true,
    'Publish Date': publishDate || new Date().toISOString().split('T')[0]
  });
};

/**
 * Fetch client data from Airtable
 */
export const fetchClientsFromAirtable = async () => {
  try {
    console.log('🔄 Fetching client data from Airtable...');
    
    const data = await airtableRequest(CLIENT_BASE_ID, 'Table 1');
    const records = data.records || [];
    
    console.log(`📊 Found ${records.length} client records`);
    
    const clients = records.map(record => {
      const fields = record.fields;
      
      return {
        id: record.id,
        clientId: fields.client_id || 0,
        companyName: fields.company_name || '',
        industry: fields.industry || '',
        contactName: fields.contact_name || '',
        contactEmail: fields.contact_email || '',
        contactPhone: fields.contact_phone || '',
        websiteUrl: fields.website_url || '',
        logoUrl: fields.logo_url || '',
        testimonialQuote: fields.testimonial_quote || '',
        testimonialAuthor: fields.testimonial_author || '',
        caseStudyUrl: fields.case_study_url || '',
        updatedAt: new Date().toISOString()
      };
    });
    
    console.log(`✅ Successfully processed ${clients.length} clients from Airtable`);
    return {
      clients,
      lastSyncDate: new Date().toISOString(),
      totalCount: clients.length
    };
    
  } catch (error) {
    console.error('❌ Error fetching clients from Airtable:', error);
    
    // Fallback to existing client data
    try {
      const clientData = await import('../data/clients/clients-data.ts');
      return clientData.clientsData;
    } catch (fallbackError) {
      console.error('❌ Fallback to local client data also failed:', fallbackError);
      return { clients: [], lastSyncDate: new Date().toISOString(), totalCount: 0 };
    }
  }
};

/**
 * Create a new client in Airtable
 */
export const createClient = async (clientData) => {
  try {
    const record = {
      fields: {
        'client_id': clientData.clientId,
        'company_name': clientData.companyName,
        'industry': clientData.industry || '',
        'contact_name': clientData.contactName || '',
        'contact_email': clientData.contactEmail || '',
        'contact_phone': clientData.contactPhone || '',
        'website_url': clientData.websiteUrl || '',
        'logo_url': clientData.logoUrl || '',
        'testimonial_quote': clientData.testimonialQuote || '',
        'testimonial_author': clientData.testimonialAuthor || '',
        'case_study_url': clientData.caseStudyUrl || ''
      }
    };
    
    const data = await airtableRequest(CLIENT_BASE_ID, 'Table 1', {
      method: 'POST',
      body: { records: [record] }
    });
    
    console.log('✅ Created client in Airtable:', data.records[0].id);
    return data.records[0];
    
  } catch (error) {
    console.error('❌ Error creating client in Airtable:', error);
    throw error;
  }
};

// Helper functions
const createExcerptFromTitle = (title, primaryKeyword = '') => {
  if (title && title.length > 150) return title.substring(0, 150) + '...';
  
  if (primaryKeyword && primaryKeyword.length > 10) {
    return `Discover how ${primaryKeyword.toLowerCase()} can transform your business. Learn practical strategies and insights that drive real results.`;
  }
  
  return `Explore insights and strategies to help grow your business through effective ${title?.toLowerCase().includes('content') ? 'content creation' : 'marketing'} approaches.`;
};

const determineCategoryFromTitle = (title, primaryKeyword = '') => {
  const searchText = `${title || ''} ${primaryKeyword || ''}`.toLowerCase();
  
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
  if (!title) return 'untitled-post';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

const calculateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = (content || '').split(' ').length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};

const getDefaultBlogImage = () => {
  return 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/default-blog-image';
};

// Export for backwards compatibility
export const fetchBlogPostsFromSheet = fetchBlogPostsFromAirtable;

const airtableService = {
  fetchBlogPostsFromAirtable,
  createBlogPost,
  updateBlogPost,
  approveBlogPost,
  publishBlogPost,
  fetchClientsFromAirtable,
  createClient
};

export default airtableService;