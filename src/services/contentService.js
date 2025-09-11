// Content Service for fetching blog content from Google Docs

// Extract document ID from Google Docs URL
export const extractGoogleDocId = (url) => {
  if (!url) return null;
  const match = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

// Convert Google Docs edit URL to export URL
export const getGoogleDocsExportUrl = (url, format = 'html') => {
  const docId = extractGoogleDocId(url);
  if (!docId) return null;
  return `https://docs.google.com/document/d/${docId}/export?format=${format}`;
};

// Fetch and process Google Docs content
export const fetchGoogleDocsContent = async (url) => {
  try {
    const exportUrl = getGoogleDocsExportUrl(url, 'html');
    if (!exportUrl) {
      throw new Error('Invalid Google Docs URL');
    }

    const response = await fetch(exportUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract body content and clean it up for blog display
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!bodyMatch) {
      throw new Error('Could not extract body content from document');
    }

    let content = bodyMatch[1];
    
    // Clean up the HTML for better blog display
    content = cleanupGoogleDocsHTML(content);
    
    return {
      html: content,
      plainText: content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    };
    
  } catch (error) {
    console.error('Error fetching Google Docs content:', error);
    throw error;
  }
};

// Clean up Google Docs HTML for blog display
const cleanupGoogleDocsHTML = (html) => {
  let cleaned = html;
  
  // Remove empty paragraphs at the start
  cleaned = cleaned.replace(/^(<p[^>]*><span[^>]*><\/span><\/p>\s*)+/, '');
  
  // Remove Google Docs specific classes but keep basic styling
  cleaned = cleaned.replace(/class="c\d+"/g, '');
  
  // Convert Google Docs headings to proper blog headings with DM3 styling
  cleaned = cleaned.replace(/<h1[^>]*>/g, '<h1 class="text-4xl font-bold mb-6 text-brand-charcoal">');
  cleaned = cleaned.replace(/<h2[^>]*>/g, '<h2 class="text-3xl font-bold mb-4 text-brand-charcoal">');
  cleaned = cleaned.replace(/<h3[^>]*>/g, '<h3 class="text-2xl font-semibold mb-3 text-brand-charcoal">');
  
  // Clean up paragraphs with DM3 styling
  cleaned = cleaned.replace(/<p[^>]*>/g, '<p class="mb-4 text-gray-700 leading-relaxed">');
  
  // Clean up spans (remove most styling, keep content)
  cleaned = cleaned.replace(/<span[^>]*>/g, '<span>');
  
  // Convert lists to styled lists
  cleaned = cleaned.replace(/<ul[^>]*>/g, '<ul class="list-disc list-inside mb-4 space-y-2">');
  cleaned = cleaned.replace(/<ol[^>]*>/g, '<ol class="list-decimal list-inside mb-4 space-y-2">');
  cleaned = cleaned.replace(/<li[^>]*>/g, '<li class="text-gray-700">');
  
  // Style links
  cleaned = cleaned.replace(/<a([^>]*)>/g, '<a$1 class="text-accent-gold hover:underline">');
  
  // Style images
  cleaned = cleaned.replace(/<img([^>]*)>/g, '<img$1 class="w-full max-w-2xl mx-auto my-6 rounded-lg shadow-md">');
  
  // Remove excessive empty paragraphs
  cleaned = cleaned.replace(/(<p[^>]*><span><\/span><\/p>\s*){2,}/g, '<div class="my-6"></div>');
  
  // Fix HTML entities
  cleaned = cleaned.replace(/&#39;/g, "'");
  cleaned = cleaned.replace(/&quot;/g, '"');
  cleaned = cleaned.replace(/&amp;/g, '&');
  
  return cleaned;
};

// Validate image URL (mainly for Cloudinary)
export const validateImageUrl = async (url) => {
  try {
    if (!url) return false;
    
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch (error) {
    console.error('Error validating image URL:', error);
    return false;
  }
};

// Get optimized image URL (for Cloudinary - DM3 specific)
export const getOptimizedImageUrl = (url, width = 800, height = 600) => {
  if (!url) return 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_800,h_400/v1/blog/default-blog-image';
  
  // If it's a Cloudinary URL, we can add transformations
  if (url.includes('cloudinary.com')) {
    // Insert transformation parameters
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`);
  }
  
  return url;
};

// Create excerpt from content
export const createExcerpt = (content, maxLength = 200) => {
  if (!content) return '';
  
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  if (plainText.length <= maxLength) return plainText;
  
  // Find the last complete sentence within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSentence = truncated.lastIndexOf('.');
  
  if (lastSentence > maxLength * 0.7) {
    return truncated.substring(0, lastSentence + 1);
  }
  
  return truncated + '...';
};