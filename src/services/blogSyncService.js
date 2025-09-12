/**
 * Bidirectional Blog Content Sync Service
 * Keeps Airtable and Google Sheets blog content synchronized
 */

require('dotenv').config();

// Import existing services
const { fetchBlogPostsFromSheet, isPostVisible } = require('./googleSheetsService.js');
const { fetchBlogPostsFromAirtable, createBlogPost, updateBlogPost } = require('./airtableService.js');

// Configuration
const SYNC_CONFIG = {
  // Sync direction preferences
  MASTER_SOURCE: 'airtable', // 'airtable' | 'google_sheets' | 'bidirectional'
  
  // Conflict resolution
  CONFLICT_RESOLUTION: 'newest_wins', // 'newest_wins' | 'airtable_wins' | 'google_sheets_wins'
  
  // Sync options
  SYNC_APPROVED_ONLY: false, // If true, only sync approved posts
  SYNC_FUTURE_POSTS: true,   // If true, sync posts with future publish dates
  
  // Rate limiting
  MAX_OPERATIONS_PER_MINUTE: 30,
  BATCH_SIZE: 10
};

/**
 * Get all blog posts from both sources with metadata
 */
async function getAllBlogPosts() {
  console.log('🔍 Fetching blog posts from both sources...');
  
  try {
    const [airtablePosts, googleSheetsPosts] = await Promise.all([
      fetchBlogPostsFromAirtable().catch(err => {
        console.warn('⚠️ Airtable fetch failed:', err.message);
        return [];
      }),
      fetchBlogPostsFromSheet().catch(err => {
        console.warn('⚠️ Google Sheets fetch failed:', err.message);
        return [];
      })
    ]);
    
    console.log(`📊 Found ${airtablePosts.length} posts in Airtable, ${googleSheetsPosts.length} in Google Sheets`);
    
    return {
      airtable: airtablePosts.map(post => ({
        ...post,
        source: 'airtable',
        lastModified: new Date().toISOString() // Airtable doesn't provide last modified by default
      })),
      googleSheets: googleSheetsPosts.map(post => ({
        ...post,
        source: 'google_sheets',
        lastModified: new Date().toISOString()
      }))
    };
    
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    throw error;
  }
}

/**
 * Create a unique identifier for each post for matching
 */
function createPostIdentifier(post) {
  // Use title + primary keyword as unique identifier
  const title = (post.title || '').toLowerCase().trim();
  const keyword = (post.primaryKeyword || '').toLowerCase().trim();
  return `${title}|${keyword}`.replace(/[^a-z0-9|]/g, '-');
}

/**
 * Find matching posts between sources
 */
function findMatchingPosts(airtablePosts, googleSheetsPosts) {
  console.log('🔗 Matching posts between sources...');
  
  const matches = [];
  const airtableOnly = [];
  const googleSheetsOnly = [];
  
  // Create lookup maps
  const airtableMap = new Map();
  const googleSheetsMap = new Map();
  
  airtablePosts.forEach(post => {
    const id = createPostIdentifier(post);
    airtableMap.set(id, post);
  });
  
  googleSheetsPosts.forEach(post => {
    const id = createPostIdentifier(post);
    googleSheetsMap.set(id, post);
  });
  
  // Find matches and unique posts
  for (const [id, airtablePost] of airtableMap.entries()) {
    if (googleSheetsMap.has(id)) {
      matches.push({
        id,
        airtable: airtablePost,
        googleSheets: googleSheetsMap.get(id)
      });
      googleSheetsMap.delete(id); // Remove from processing
    } else {
      airtableOnly.push(airtablePost);
    }
  }
  
  // Remaining Google Sheets posts are unique
  for (const post of googleSheetsMap.values()) {
    googleSheetsOnly.push(post);
  }
  
  console.log(`✅ Found ${matches.length} matches, ${airtableOnly.length} Airtable-only, ${googleSheetsOnly.length} Google Sheets-only`);
  
  return { matches, airtableOnly, googleSheetsOnly };
}

/**
 * Determine which version of a matched post should be the master
 */
function resolveConflict(airtablePost, googleSheetsPost) {
  switch (SYNC_CONFIG.CONFLICT_RESOLUTION) {
    case 'airtable_wins':
      return { winner: 'airtable', master: airtablePost, target: googleSheetsPost };
    
    case 'google_sheets_wins':
      return { winner: 'google_sheets', master: googleSheetsPost, target: airtablePost };
    
    case 'newest_wins':
    default:
      // Compare last modified dates (fallback to approved status, then title length)
      const airtableTime = new Date(airtablePost.lastModified || airtablePost.date || '2020-01-01');
      const googleSheetsTime = new Date(googleSheetsPost.lastModified || googleSheetsPost.date || '2020-01-01');
      
      if (airtableTime > googleSheetsTime) {
        return { winner: 'airtable', master: airtablePost, target: googleSheetsPost };
      } else if (googleSheetsTime > airtableTime) {
        return { winner: 'google_sheets', master: googleSheetsPost, target: airtablePost };
      } else {
        // If times are equal, prefer approved posts
        if (airtablePost.approved && !googleSheetsPost.approved) {
          return { winner: 'airtable', master: airtablePost, target: googleSheetsPost };
        } else if (googleSheetsPost.approved && !airtablePost.approved) {
          return { winner: 'google_sheets', master: googleSheetsPost, target: airtablePost };
        } else {
          // Default to Airtable if master source
          return SYNC_CONFIG.MASTER_SOURCE === 'airtable' 
            ? { winner: 'airtable', master: airtablePost, target: googleSheetsPost }
            : { winner: 'google_sheets', master: googleSheetsPost, target: airtablePost };
        }
      }
  }
}

/**
 * Sync posts from Google Sheets to Airtable
 */
async function syncToAirtable(posts, syncType = 'create') {
  console.log(`📤 Syncing ${posts.length} posts to Airtable (${syncType})...`);
  
  const results = [];
  
  for (let i = 0; i < posts.length; i += SYNC_CONFIG.BATCH_SIZE) {
    const batch = posts.slice(i, i + SYNC_CONFIG.BATCH_SIZE);
    
    for (const post of batch) {
      try {
        if (syncType === 'create') {
          const airtablePost = await createBlogPost({
            title: post.title,
            postUrl: post.postUrl || post.content,
            author: post.author || post.client || 'Disruptors Media',
            status: post.approved ? 'Approved' : 'Draft',
            primaryKeyword: post.primaryKeyword,
            date: post.date,
            approved: post.approved,
            image: post.image
          });
          results.push({ success: true, post: airtablePost, original: post });
        } else if (syncType === 'update' && post.airtableId) {
          const updatedPost = await updateBlogPost(post.airtableId, {
            'Title': post.title,
            'Post URL': post.postUrl || post.content,
            'Client': post.author || post.client || 'Disruptors Media',
            'Primary Keyword': post.primaryKeyword,
            'Publish Date': post.date,
            'Approved': post.approved,
            'Feature Image': post.image
          });
          results.push({ success: true, post: updatedPost, original: post });
        }
        
        console.log(`✅ ${syncType === 'create' ? 'Created' : 'Updated'} in Airtable: ${post.title}`);
        
      } catch (error) {
        console.error(`❌ Error syncing "${post.title}" to Airtable:`, error.message);
        results.push({ success: false, error: error.message, original: post });
      }
    }
    
    // Rate limiting
    if (i + SYNC_CONFIG.BATCH_SIZE < posts.length) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay between batches
    }
  }
  
  return results;
}

/**
 * Sync posts from Airtable to Google Sheets
 */
async function syncToGoogleSheets(posts, syncType = 'create') {
  console.log(`📤 Syncing ${posts.length} posts to Google Sheets (${syncType})...`);
  
  // Import the write service
  const { batchUpdateBlogPosts } = require('./googleSheetsWriteService.js');
  
  try {
    const results = await batchUpdateBlogPosts(posts);
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`✅ Google Sheets sync complete: ${successful} successful, ${failed} failed`);
    
    return results.map(result => ({
      success: result.success,
      action: result.action,
      post: result.post,
      error: result.error,
      original: posts.find(p => p.title === result.post)
    }));
    
  } catch (error) {
    console.error('❌ Google Sheets sync failed:', error);
    
    // Fallback to logging what would be synced
    const results = posts.map(post => {
      console.log(`📝 Would ${syncType} in Google Sheets:`, {
        title: post.title,
        approved: post.approved,
        publishDate: post.date,
        primaryKeyword: post.primaryKeyword
      });
      
      return { 
        success: false, 
        error: error.message,
        original: post 
      };
    });
    
    return results;
  }
}

/**
 * Perform full bidirectional sync
 */
async function performBidirectionalSync() {
  console.log('🚀 Starting bidirectional blog content sync...');
  console.log('='.repeat(60));
  
  try {
    // 1. Fetch all posts from both sources
    const { airtable, googleSheets } = await getAllBlogPosts();
    
    // 2. Find matches and unique posts
    const { matches, airtableOnly, googleSheetsOnly } = findMatchingPosts(airtable, googleSheets);
    
    const syncResults = {
      matched: [],
      airtableToSheets: [],
      sheetsToAirtable: [],
      conflicts: [],
      errors: []
    };
    
    // 3. Handle matched posts (resolve conflicts)
    console.log('\n📊 Resolving conflicts for matched posts...');
    for (const match of matches) {
      try {
        const resolution = resolveConflict(match.airtable, match.googleSheets);
        
        console.log(`🔀 Conflict resolution for "${match.airtable.title}": ${resolution.winner} wins`);
        
        if (resolution.winner === 'airtable') {
          // Update Google Sheets with Airtable data
          const result = await syncToGoogleSheets([resolution.master], 'update');
          syncResults.airtableToSheets.push(...result);
        } else {
          // Update Airtable with Google Sheets data  
          const postWithId = { ...resolution.master, airtableId: match.airtable.id };
          const result = await syncToAirtable([postWithId], 'update');
          syncResults.sheetsToAirtable.push(...result);
        }
        
        syncResults.matched.push({
          id: match.id,
          winner: resolution.winner,
          title: resolution.master.title
        });
        
      } catch (error) {
        console.error(`❌ Error resolving conflict for "${match.id}":`, error.message);
        syncResults.errors.push({ id: match.id, error: error.message });
      }
    }
    
    // 4. Sync unique posts
    if (SYNC_CONFIG.MASTER_SOURCE === 'bidirectional' || SYNC_CONFIG.MASTER_SOURCE === 'airtable') {
      // Sync Airtable-only posts to Google Sheets
      if (airtableOnly.length > 0) {
        console.log(`\n📤 Syncing ${airtableOnly.length} Airtable-only posts to Google Sheets...`);
        const result = await syncToGoogleSheets(airtableOnly, 'create');
        syncResults.airtableToSheets.push(...result);
      }
    }
    
    if (SYNC_CONFIG.MASTER_SOURCE === 'bidirectional' || SYNC_CONFIG.MASTER_SOURCE === 'google_sheets') {
      // Sync Google Sheets-only posts to Airtable
      if (googleSheetsOnly.length > 0) {
        console.log(`\n📤 Syncing ${googleSheetsOnly.length} Google Sheets-only posts to Airtable...`);
        const result = await syncToAirtable(googleSheetsOnly, 'create');
        syncResults.sheetsToAirtable.push(...result);
      }
    }
    
    // 5. Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 SYNC SUMMARY:');
    console.log(`✅ Matched posts resolved: ${syncResults.matched.length}`);
    console.log(`📤 Synced to Google Sheets: ${syncResults.airtableToSheets.filter(r => r.success).length}`);
    console.log(`📥 Synced to Airtable: ${syncResults.sheetsToAirtable.filter(r => r.success).length}`);
    console.log(`❌ Errors: ${syncResults.errors.length}`);
    
    if (syncResults.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      syncResults.errors.forEach(err => console.log(`  - ${err.id || 'Unknown'}: ${err.error}`));
    }
    
    return syncResults;
    
  } catch (error) {
    console.error('❌ Bidirectional sync failed:', error);
    throw error;
  }
}

/**
 * One-way sync from Airtable to Google Sheets
 */
async function syncAirtableToSheets() {
  console.log('🔄 One-way sync: Airtable → Google Sheets');
  
  try {
    const airtablePosts = await fetchBlogPostsFromAirtable();
    
    if (airtablePosts.length === 0) {
      console.log('ℹ️ No posts found in Airtable to sync');
      return;
    }
    
    const results = await syncToGoogleSheets(airtablePosts, 'create');
    
    console.log(`✅ Sync complete: ${results.filter(r => r.success).length}/${results.length} posts processed`);
    return results;
    
  } catch (error) {
    console.error('❌ Airtable to Sheets sync failed:', error);
    throw error;
  }
}

/**
 * One-way sync from Google Sheets to Airtable
 */
async function syncSheetsToAirtable() {
  console.log('🔄 One-way sync: Google Sheets → Airtable');
  
  try {
    const googleSheetsPosts = await fetchBlogPostsFromSheet();
    
    if (googleSheetsPosts.length === 0) {
      console.log('ℹ️ No posts found in Google Sheets to sync');
      return;
    }
    
    const results = await syncToAirtable(googleSheetsPosts, 'create');
    
    console.log(`✅ Sync complete: ${results.filter(r => r.success).length}/${results.length} posts processed`);
    return results;
    
  } catch (error) {
    console.error('❌ Sheets to Airtable sync failed:', error);
    throw error;
  }
}

/**
 * Get sync status and statistics
 */
async function getSyncStatus() {
  console.log('📊 Getting sync status...');
  
  try {
    const { airtable, googleSheets } = await getAllBlogPosts();
    const { matches, airtableOnly, googleSheetsOnly } = findMatchingPosts(airtable, googleSheets);
    
    return {
      lastCheck: new Date().toISOString(),
      airtableCount: airtable.length,
      googleSheetsCount: googleSheets.length,
      matchedPosts: matches.length,
      airtableOnlyCount: airtableOnly.length,
      googleSheetsOnlyCount: googleSheetsOnly.length,
      syncRecommendation: airtableOnly.length > 0 || googleSheetsOnly.length > 0 
        ? 'Sync recommended' 
        : 'Sources are synchronized'
    };
    
  } catch (error) {
    console.error('❌ Error getting sync status:', error);
    return { error: error.message, lastCheck: new Date().toISOString() };
  }
}

// Export functions
module.exports = {
  performBidirectionalSync,
  syncAirtableToSheets,
  syncSheetsToAirtable,
  getSyncStatus,
  getAllBlogPosts,
  SYNC_CONFIG
};

// CLI usage
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'bidirectional':
      performBidirectionalSync().catch(console.error);
      break;
    case 'airtable-to-sheets':
      syncAirtableToSheets().catch(console.error);
      break;
    case 'sheets-to-airtable':
      syncSheetsToAirtable().catch(console.error);
      break;
    case 'status':
      getSyncStatus().then(status => console.log(JSON.stringify(status, null, 2))).catch(console.error);
      break;
    default:
      console.log('Usage: node blogSyncService.js [bidirectional|airtable-to-sheets|sheets-to-airtable|status]');
  }
}