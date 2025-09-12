#!/usr/bin/env node

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvcvxhzmt',
  api_key: '935251962635945',
  api_secret: 'CNppaSbbi3IevxjuRvg5-8CKCds'
});

// Priority assets configuration
const STUDIO_PHOTOS = [
  'GL3A0022.JPG',
  'GL3A0026.JPG', 
  'GL3A0030.JPG',
  'GL3A0042.JPG',
  'Photo Nov 15 2024, 3 36 11 PM.jpg'
];

const PORTFOLIO_WORK = [
  'work-1.jpg',
  'work-2.jpg',
  'work-3.jpg',
  'work-4.jpg',
  'work-5.jpg',
  'work-6.jpg'
];

// Upload tracking
const uploadResults = {
  success: [],
  failed: [],
  urls: {}
};

// Upload a single file to Cloudinary
async function uploadFile(filePath, folder, filename) {
  console.log(`📤 Uploading: ${filename} → ${folder}/`);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  // Get file size for logging
  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`   📊 Size: ${sizeMB}MB`);
  
  try {
    // Create public ID from filename (remove extension, sanitize)
    const publicId = filename.replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .replace(/Photo_Nov_15_2024__3_36_11_PM/g, 'photo_nov_15_2024')
      .toLowerCase();
    
    // Check file size and compress if needed
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB limit for free plan
    const needsCompression = stats.size > maxSizeBytes;
    
    const uploadOptions = {
      folder: folder,
      public_id: publicId,
      resource_type: 'image',
      overwrite: true,
      // Apply compression for large files
      ...(needsCompression ? {
        transformation: [
          {
            quality: 'auto:best',
            fetch_format: 'auto'
          }
        ]
      } : {})
    };
    
    console.log(`   🔧 Public ID: ${publicId}`);
    
    const result = await cloudinary.uploader.upload(filePath, uploadOptions);
    
    console.log(`   ✅ Success: ${result.secure_url}`);
    
    return {
      success: true,
      filename: filename,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
    
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    throw error;
  }
}

// Upload studio photos
async function uploadStudioPhotos() {
  console.log('\n📂 UPLOADING STUDIO PHOTOS');
  console.log('='.repeat(50));
  
  const folder = 'disruptors-media/content/studio';
  const basePath = 'public/assets/images';
  
  for (const filename of STUDIO_PHOTOS) {
    try {
      const filePath = path.join(basePath, filename);
      const result = await uploadFile(filePath, folder, filename);
      
      uploadResults.success.push({
        ...result,
        category: 'studio'
      });
      
      uploadResults.urls[filename] = result.url;
      
      // Brief pause between uploads
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Failed to upload ${filename}: ${error.message}`);
      uploadResults.failed.push({
        filename,
        category: 'studio',
        error: error.message
      });
    }
    
    console.log(''); // Empty line for readability
  }
}

// Upload portfolio work images
async function uploadPortfolioWork() {
  console.log('\n📂 UPLOADING PORTFOLIO WORK');
  console.log('='.repeat(50));
  
  const folder = 'disruptors-media/content/portfolio';
  const basePath = 'public/assets/images/portfolio';
  
  for (const filename of PORTFOLIO_WORK) {
    try {
      const filePath = path.join(basePath, filename);
      const result = await uploadFile(filePath, folder, filename);
      
      uploadResults.success.push({
        ...result,
        category: 'portfolio'
      });
      
      uploadResults.urls[filename] = result.url;
      
      // Brief pause between uploads
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`❌ Failed to upload ${filename}: ${error.message}`);
      uploadResults.failed.push({
        filename,
        category: 'portfolio',
        error: error.message
      });
    }
    
    console.log(''); // Empty line for readability
  }
}

// Verify uploaded assets are accessible
async function verifyUploads() {
  console.log('\n🔍 VERIFYING UPLOADS');
  console.log('='.repeat(50));
  
  const verificationPromises = uploadResults.success.map(async (item) => {
    try {
      // Use Cloudinary's API to check if the asset exists
      const result = await cloudinary.api.resource(item.publicId);
      console.log(`✅ ${item.filename}: ${result.secure_url}`);
      return { ...item, verified: true };
    } catch (error) {
      console.log(`❌ ${item.filename}: Not accessible`);
      return { ...item, verified: false };
    }
  });
  
  const verificationResults = await Promise.all(verificationPromises);
  
  const accessibleCount = verificationResults.filter(item => item.verified).length;
  const totalCount = verificationResults.length;
  
  console.log(`\n📊 Verification: ${accessibleCount}/${totalCount} assets accessible`);
  
  return verificationResults;
}

// Create tracking CSV
async function createTrackingFile() {
  console.log('\n📄 CREATING TRACKING FILE');
  console.log('='.repeat(50));
  
  const trackingData = uploadResults.success.map(item => ({
    filename: item.filename,
    category: item.category,
    cloudinary_url: item.url,
    public_id: item.publicId,
    width: item.width || 'N/A',
    height: item.height || 'N/A',
    format: item.format || 'N/A',
    size_bytes: item.bytes || 'N/A',
    upload_date: new Date().toISOString().split('T')[0],
    tags: `disruptors-media,priority,${item.category}`,
    migration_notes: 'Priority upload - Critical assets for DM3 site'
  }));
  
  // Create CSV content
  const headers = Object.keys(trackingData[0] || {});
  const csvContent = [
    headers.join(','),
    ...trackingData.map(row => 
      headers.map(header => `"${row[header] || ''}"`).join(',')
    )
  ].join('\n');
  
  const trackingFile = path.join(__dirname, '..', 'priority-uploads-tracking.csv');
  fs.writeFileSync(trackingFile, csvContent, 'utf8');
  
  console.log(`✅ Tracking file created: ${path.basename(trackingFile)}`);
  return trackingFile;
}

// Update constants file with new URLs
async function updateConstantsFile() {
  console.log('\n🔧 UPDATING CONSTANTS FILE');
  console.log('='.repeat(50));
  
  const constantsFile = path.join(__dirname, '..', 'src', 'constants', 'cloudinaryAssets.ts');
  
  // Create constants object for uploaded assets
  const constants = {};
  
  uploadResults.success.forEach(item => {
    // Convert filename to constant name
    const constantName = item.filename
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/[^a-zA-Z0-9]/g, '_') // Replace special chars with underscore
      .replace(/_+/g, '_') // Replace multiple underscores with single
      .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
      .toLowerCase();
    
    constants[constantName] = item.url;
  });
  
  // Read existing file if it exists
  let existingContent = '';
  if (fs.existsSync(constantsFile)) {
    existingContent = fs.readFileSync(constantsFile, 'utf8');
    console.log('📝 Found existing constants file, will update it');
  } else {
    console.log('📝 Creating new constants file');
  }
  
  // Generate new constants section
  const newConstantsSection = Object.entries(constants)
    .map(([key, url]) => `  ${key}: '${url}',`)
    .join('\n');
  
  // Create updated file content
  const fileContent = `// Auto-updated Cloudinary Assets
// Last updated: ${new Date().toISOString()}
// Priority assets: ${uploadResults.success.length} uploaded

export const cloudinaryAssets = {
${newConstantsSection}
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
  format?: string;
  quality?: string | number;
} = {}): string => {
  const baseUrl = 'https://res.cloudinary.com/dvcvxhzmt/image/upload';
  const transformations = [];
  
  if (options.format !== undefined) transformations.push(\`f_\${options.format}\`);
  else transformations.push('f_auto');
  
  if (options.quality !== undefined) transformations.push(\`q_\${options.quality}\`);
  else transformations.push('q_auto');
  
  if (options.width) transformations.push(\`w_\${options.width}\`);
  if (options.height) transformations.push(\`h_\${options.height}\`);
  if (options.crop) transformations.push(\`c_\${options.crop}\`);
  if (options.gravity) transformations.push(\`g_\${options.gravity}\`);
  
  const transformString = transformations.join(',');
  return \`\${baseUrl}/\${transformString}/\${publicId}\`;
};
`;
  
  fs.writeFileSync(constantsFile, fileContent, 'utf8');
  console.log(`✅ Constants file updated: ${path.relative(process.cwd(), constantsFile)}`);
  console.log(`📊 Added ${Object.keys(constants).length} asset constants`);
}

// Main execution function
async function main() {
  console.log('🎯 PRIORITY CLOUDINARY ASSET UPLOAD');
  console.log('='.repeat(60));
  console.log('📤 Uploading critical assets to Cloudinary:');
  console.log(`   • ${STUDIO_PHOTOS.length} studio photos (high-resolution)`);
  console.log(`   • ${PORTFOLIO_WORK.length} portfolio work images`);
  console.log(`☁️  Target cloud: dvcvxhzmt`);
  console.log('');
  
  const startTime = Date.now();
  
  try {
    // Test Cloudinary connection first
    console.log('🔌 Testing Cloudinary connection...');
    await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful\n');
    
    // Upload studio photos
    await uploadStudioPhotos();
    
    // Upload portfolio work
    await uploadPortfolioWork();
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 UPLOAD SUMMARY');
    console.log('='.repeat(60));
    
    const totalAssets = STUDIO_PHOTOS.length + PORTFOLIO_WORK.length;
    const successCount = uploadResults.success.length;
    const failedCount = uploadResults.failed.length;
    
    console.log(`✅ Successful uploads: ${successCount}/${totalAssets}`);
    console.log(`❌ Failed uploads: ${failedCount}`);
    console.log(`📊 Success rate: ${((successCount / totalAssets) * 100).toFixed(1)}%`);
    
    if (successCount === 0) {
      console.log('❌ No assets were uploaded successfully. Exiting.');
      return;
    }
    
    // Verify uploads
    await verifyUploads();
    
    // Create tracking file
    await createTrackingFile();
    
    // Update constants file
    await updateConstantsFile();
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    // Final summary
    console.log('\n' + '🎉'.repeat(20));
    console.log('✅ PRIORITY MIGRATION COMPLETE!');
    console.log('🎉'.repeat(20));
    console.log(`⏱️  Total time: ${duration}s`);
    console.log(`📊 Assets uploaded: ${successCount}/${totalAssets}`);
    
    if (successCount > 0) {
      console.log('\n🔗 UPLOADED ASSET URLS:');
      console.log('-'.repeat(60));
      
      // Group by category
      const studioAssets = uploadResults.success.filter(item => item.category === 'studio');
      const portfolioAssets = uploadResults.success.filter(item => item.category === 'portfolio');
      
      if (studioAssets.length > 0) {
        console.log('📸 Studio Photos:');
        studioAssets.forEach(item => {
          console.log(`   ${item.filename}: ${item.url}`);
        });
      }
      
      if (portfolioAssets.length > 0) {
        console.log('\n💼 Portfolio Work:');
        portfolioAssets.forEach(item => {
          console.log(`   ${item.filename}: ${item.url}`);
        });
      }
    }
    
    console.log('\n📝 NEXT STEPS:');
    console.log('1. ✅ Test URLs above in your browser');
    console.log('2. 🔄 Update React components to use new Cloudinary URLs');
    console.log('3. 📱 Import constants: import { cloudinaryAssets } from \'./constants/cloudinaryAssets\'');
    console.log('4. 🚀 Continue with full migration for remaining assets');
    console.log('5. 🧹 Remove local assets after verification');
    
  } catch (error) {
    console.error('\n💥 UPLOAD FAILED:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  uploadStudioPhotos,
  uploadPortfolioWork,
  verifyUploads,
  createTrackingFile,
  updateConstantsFile,
  uploadResults
};