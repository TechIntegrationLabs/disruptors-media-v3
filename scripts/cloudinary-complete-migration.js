#!/usr/bin/env node

/**
 * Cloudinary Complete Migration Script
 * Systematically uploads all remaining local assets to Cloudinary
 * Organizes assets into proper folder structure
 * Updates constants file with all asset URLs
 */

const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dvcvxhzmt',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Base paths
const PUBLIC_PATH = path.join(__dirname, '..', 'public', 'assets');
const CONSTANTS_PATH = path.join(__dirname, '..', 'src', 'constants', 'cloudinaryAssets.ts');

// Migration mapping configuration
const MIGRATION_CONFIG = {
  logos: {
    sourceDir: path.join(PUBLIC_PATH, 'images', 'logos'),
    cloudinaryFolder: 'disruptors-media/brand/logos',
    files: [
      'gold-logo-banner.png',
      'gold-logo.png', 
      'logo-emboss.png',
      'logo-menu.png',
      'logo.svg',
      'mobile-menu-logo.png'
    ]
  },
  icons: {
    sourceDir: path.join(PUBLIC_PATH, 'images', 'icons'),
    cloudinaryFolder: 'disruptors-media/ui/icons',
    files: [
      'arrow-cta.svg',
      'favicon.png',
      'fb.svg',
      'insta.svg',
      'logo.svg', // Duplicate, handle in dedup
      'minus-icon.png',
      'more-pd.svg',
      'mute-icon.png',
      'pause-icon.png',
      'play-icon.png',
      'plus-icon.png',
      'twitter.svg',
      'youtube.svg'
    ]
  },
  services: {
    sourceDir: path.join(PUBLIC_PATH, 'images', 'services'),
    cloudinaryFolder: 'disruptors-media/services/graphics',
    files: [
      'hand-human.png',
      'hand-robot.png',
      'hand-srv.png',
      'services-img.png',
      'what-we-do-abt.png',
      'what-we-do-abt-1.png',
      'what-we-do-abt-2.png',
      'what-we-do-abt-3.png',
      'what-we-do-bx.png',
      'what-we-do-bx-1.png',
      'what-we-do-bx-2.png',
      'what-we-do-bx-3.png',
      'what-we-do-frame.png'
    ]
  },
  backgrounds: {
    sourceDir: path.join(PUBLIC_PATH, 'images'),
    cloudinaryFolder: 'disruptors-media/ui/backgrounds',
    files: [
      'book-a-call-bg.png',
      'main-bg.jpg',
      'mobile-sec-bg.jpg',
      'poster-abt.jpg',
      'poster.jpg'
    ]
  },
  servicesRoot: {
    sourceDir: path.join(PUBLIC_PATH, 'images'),
    cloudinaryFolder: 'disruptors-media/services/graphics',
    files: [
      'after-phone-sec.png',
      'phone.png'
    ]
  },
  podcast: {
    sourceDir: path.join(PUBLIC_PATH, 'images'),
    cloudinaryFolder: 'disruptors-media/content/podcast',
    files: [
      'pd-new-sm.png',
      'pd-new-sm-1.png',
      'pd-new-sm-2.png', 
      'pd-new-sm-3.png',
      'pd-new-sm1.jpg',
      'pd-new-sm1-1.jpg',
      'pd-new-sm1-2.jpg',
      'pd-new-sm1-3.jpg',
      'podcast-new-lg.jpg',
      'podcast-new-lg-1.jpg',
      '1729541402_podcast-2.jpg',
      '1729541474_podcast-3.jpg',
      '1730321778_Show Reel DM (16 x 9 in).jpg',
      '1730759549_Thumbnail Avo.jpg'
    ]
  },
  clients: {
    sourceDir: path.join(PUBLIC_PATH, 'images'),
    cloudinaryFolder: 'disruptors-media/clients/assets',
    files: [
      'client-1.png',
      'client-2.png'
    ]
  },
  videos: {
    sourceDir: path.join(PUBLIC_PATH, 'videos'),
    cloudinaryFolder: 'disruptors-media/videos',
    files: [
      'gallery-1.mp4',
      'gallery-2.mp4', 
      'gallery-bg.mp4',
      'main-banner-video.mp4',
      'mobile-video-bg.mp4'
    ]
  },
  gallery: {
    sourceDir: path.join(PUBLIC_PATH, 'images'),
    cloudinaryFolder: 'disruptors-media/content/gallery',
    files: [
      'img-3.png',
      'bg-what-we-do.jpg',
      'loader-lft.jpg',
      'Disrupting.png'
    ]
  },
  studioImages: {
    sourceDir: path.join(PUBLIC_PATH, 'images'),
    cloudinaryFolder: 'disruptors-media/content/studio',
    files: [
      'GL3A0022.JPG',
      'GL3A0026.JPG', 
      'GL3A0030.JPG',
      'GL3A0042.JPG',
      'Photo Nov 15 2024, 3 36 11 PM.jpg'
    ]
  }
};

// Utility functions
function generateSlug(filename) {
  return filename
    .toLowerCase()
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[^a-z0-9]/g, '_') // Replace non-alphanumeric with underscore
    .replace(/_+/g, '_') // Remove multiple underscores
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
}

function getResourceType(filepath) {
  const ext = path.extname(filepath).toLowerCase();
  return ['.mp4', '.mov', '.avi', '.webm'].includes(ext) ? 'video' : 'image';
}

async function uploadAsset(filePath, cloudinaryFolder, originalName) {
  const resourceType = getResourceType(filePath);
  const publicId = `${cloudinaryFolder}/${generateSlug(originalName)}`;
  
  console.log(`📤 Uploading: ${originalName} → ${publicId}`);
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: resourceType,
      folder: cloudinaryFolder,
      use_filename: false,
      unique_filename: false,
      overwrite: true,
      tags: ['dm3-migration', path.basename(cloudinaryFolder)]
    });
    
    console.log(`✅ Success: ${result.public_id}`);
    return {
      success: true,
      originalName,
      publicId: result.public_id,
      url: result.secure_url,
      resourceType
    };
  } catch (error) {
    console.error(`❌ Failed: ${originalName} - ${error.message}`);
    return {
      success: false,
      originalName,
      error: error.message
    };
  }
}

async function migrateCategory(categoryName, config) {
  console.log(`\n🗂️  Migrating ${categoryName.toUpperCase()}: ${config.files.length} files`);
  console.log(`📁 Source: ${config.sourceDir}`);
  console.log(`☁️  Target: ${config.cloudinaryFolder}`);
  
  const results = [];
  
  for (const filename of config.files) {
    const filePath = path.join(config.sourceDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filename} (skipping)`);
      continue;
    }
    
    const result = await uploadAsset(filePath, config.cloudinaryFolder, filename);
    results.push(result);
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return results;
}

function generateConstantsFile(allResults, existingAssets = {}) {
  const newAssets = { ...existingAssets };
  
  allResults.forEach(result => {
    if (result.success) {
      const slug = generateSlug(result.originalName);
      newAssets[slug] = result.url;
    }
  });
  
  const timestamp = new Date().toISOString();
  const totalAssets = Object.keys(newAssets).length;
  
  const constantsContent = `// Auto-updated Cloudinary Assets
// Last updated: ${timestamp}
// Total assets: ${totalAssets}

export const cloudinaryAssets = {
${Object.entries(newAssets)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([key, url]) => `  ${key}: '${url}'`)
  .join(',\n')}
};

// Helper function for responsive images
export const getResponsiveImage = (publicId: string, width?: number, height?: number): string => {
  const baseUrl = 'https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto';
  const dimensions = width && height ? \`,w_\${width},h_\${height}\` : '';
  return \`\${baseUrl}\${dimensions}/\${publicId}\`;
};

// Helper function for optimized images with transformations
export const getOptimizedImage = (publicId: string, options: {
  width?: number;
  height?: number;
  crop?: string;
  gravity?: string;
  quality?: string | number;
} = {}): string => {
  const baseUrl = 'https://res.cloudinary.com/dvcvxhzmt/image/upload';
  const transformations = [];
  
  transformations.push('f_auto'); // Auto format
  
  if (options.quality !== undefined) transformations.push(\`q_\${options.quality}\`);
  else transformations.push('q_auto');
  
  if (options.width) transformations.push(\`w_\${options.width}\`);
  if (options.height) transformations.push(\`h_\${options.height}\`);
  if (options.crop) transformations.push(\`c_\${options.crop}\`);
  if (options.gravity) transformations.push(\`g_\${options.gravity}\`);
  
  const transformString = transformations.join(',');
  return \`\${baseUrl}/\${transformString}/\${publicId}\`;
};

// Category-based asset getters for better organization
export const getBrandAsset = (assetName: string) => cloudinaryAssets[assetName];
export const getIconAsset = (assetName: string) => cloudinaryAssets[assetName];
export const getServiceAsset = (assetName: string) => cloudinaryAssets[assetName];
export const getBackgroundAsset = (assetName: string) => cloudinaryAssets[assetName];
export const getPodcastAsset = (assetName: string) => cloudinaryAssets[assetName];
export const getClientAsset = (assetName: string) => cloudinaryAssets[assetName];
export const getVideoAsset = (assetName: string) => cloudinaryAssets[assetName];
export const getGalleryAsset = (assetName: string) => cloudinaryAssets[assetName];
`;

  return constantsContent;
}

function generateTrackingCSV(allResults) {
  const headers = [
    'Original Filename',
    'Category', 
    'Cloudinary Public ID',
    'Cloudinary URL',
    'Resource Type',
    'File Extension',
    'Upload Status',
    'Upload Date',
    'Tags',
    'Folder Structure',
    'Error Message'
  ];
  
  const rows = allResults.map(result => {
    const category = result.publicId ? result.publicId.split('/')[1] || 'unknown' : 'unknown';
    const extension = path.extname(result.originalName);
    const uploadDate = new Date().toISOString();
    const tags = result.publicId ? `dm3-migration,${path.basename(result.publicId.split('/').slice(0, -1).join('/'))}` : '';
    const folderStructure = result.publicId ? result.publicId.split('/').slice(0, -1).join('/') : '';
    
    return [
      result.originalName,
      category,
      result.publicId || '',
      result.url || '',
      result.resourceType || '',
      extension,
      result.success ? 'SUCCESS' : 'FAILED',
      uploadDate,
      tags,
      folderStructure,
      result.error || ''
    ];
  });
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
    
  return csvContent;
}

async function readExistingAssets() {
  try {
    if (fs.existsSync(CONSTANTS_PATH)) {
      const content = fs.readFileSync(CONSTANTS_PATH, 'utf8');
      const assetsMatch = content.match(/export const cloudinaryAssets = \{([\s\S]*?)\}/);
      if (assetsMatch) {
        const assetsStr = assetsMatch[1];
        const assets = {};
        const lines = assetsStr.split('\n').filter(line => line.trim());
        
        lines.forEach(line => {
          const match = line.match(/^\s*(\w+):\s*['"`](.*?)['"`]/);
          if (match) {
            assets[match[1]] = match[2];
          }
        });
        
        return assets;
      }
    }
  } catch (error) {
    console.warn('⚠️  Could not read existing assets file:', error.message);
  }
  
  return {};
}

async function main() {
  console.log('🚀 Starting Cloudinary Complete Migration');
  console.log('='.repeat(50));
  
  // Check credentials
  if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Missing Cloudinary credentials!');
    console.error('Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET environment variables');
    process.exit(1);
  }
  
  // Read existing assets
  console.log('📖 Reading existing assets...');
  const existingAssets = await readExistingAssets();
  console.log(`📊 Found ${Object.keys(existingAssets).length} existing assets`);
  
  // Migrate all categories
  const allResults = [];
  
  for (const [categoryName, config] of Object.entries(MIGRATION_CONFIG)) {
    const categoryResults = await migrateCategory(categoryName, config);
    allResults.push(...categoryResults);
  }
  
  // Generate summary
  const successful = allResults.filter(r => r.success).length;
  const failed = allResults.filter(r => !r.success).length;
  
  console.log('\n📊 MIGRATION SUMMARY');
  console.log('='.repeat(30));
  console.log(`✅ Successful uploads: ${successful}`);
  console.log(`❌ Failed uploads: ${failed}`);
  console.log(`📁 Total processed: ${allResults.length}`);
  
  // Update constants file
  console.log('\n📝 Updating constants file...');
  const constantsContent = generateConstantsFile(allResults, existingAssets);
  fs.writeFileSync(CONSTANTS_PATH, constantsContent);
  console.log(`✅ Updated: ${CONSTANTS_PATH}`);
  
  // Generate tracking CSV
  console.log('\n📋 Generating tracking CSV...');
  const csvContent = generateTrackingCSV(allResults);
  const csvPath = path.join(__dirname, '..', 'cloudinary-migration-tracking.csv');
  fs.writeFileSync(csvPath, csvContent);
  console.log(`✅ Generated: ${csvPath}`);
  
  // Final summary
  const totalAssets = Object.keys(existingAssets).length + successful;
  console.log('\n🎉 MIGRATION COMPLETE!');
  console.log('='.repeat(30));
  console.log(`📊 Total assets in Cloudinary: ${totalAssets}`);
  console.log(`📁 Constants file updated with all assets`);
  console.log(`📋 Tracking spreadsheet generated`);
  console.log('\n🔗 Next steps:');
  console.log('  1. Review the tracking CSV for any failed uploads');
  console.log('  2. Update your React components to use the new asset constants');
  console.log('  3. Test the application to ensure all assets load correctly');
  console.log('  4. Consider removing local assets after verification');
}

// Execute if run directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });
}

module.exports = { 
  migrateCategory, 
  generateConstantsFile, 
  generateTrackingCSV,
  MIGRATION_CONFIG 
};