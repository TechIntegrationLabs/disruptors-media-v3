#!/usr/bin/env node

const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
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

// File size limits
const MAX_FILE_SIZE = 9 * 1024 * 1024; // 9MB to be safe under 10MB limit
const TEMP_DIR = path.join(__dirname, '..', 'temp-compressed');

// Create temp directory if it doesn't exist
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Upload tracking
const uploadResults = {
  success: [],
  failed: [],
  urls: {}
};

// Compress image if needed
async function compressImage(inputPath, outputPath, maxSizeBytes) {
  console.log(`   🗜️  Compressing: ${path.basename(inputPath)}`);
  
  const stats = fs.statSync(inputPath);
  console.log(`   📊 Original size: ${(stats.size / (1024 * 1024)).toFixed(2)}MB`);
  
  if (stats.size <= maxSizeBytes) {
    console.log(`   ✅ No compression needed`);
    return inputPath; // Return original if already under limit
  }
  
  try {
    // Start with high quality and reduce if needed
    let quality = 85;
    let compressed = false;
    
    while (quality >= 60 && !compressed) {
      await sharp(inputPath)
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .toFile(outputPath);
      
      const compressedStats = fs.statSync(outputPath);
      console.log(`   🧪 Quality ${quality}: ${(compressedStats.size / (1024 * 1024)).toFixed(2)}MB`);
      
      if (compressedStats.size <= maxSizeBytes) {
        compressed = true;
        console.log(`   ✅ Compressed successfully at quality ${quality}`);
      } else {
        quality -= 10;
      }
    }
    
    if (!compressed) {
      // If still too large, try resizing
      console.log(`   ⚡ Trying resize approach...`);
      
      // Get image dimensions
      const metadata = await sharp(inputPath).metadata();
      console.log(`   📐 Original dimensions: ${metadata.width}x${metadata.height}`);
      
      // Resize to 85% and compress
      const newWidth = Math.floor(metadata.width * 0.85);
      const newHeight = Math.floor(metadata.height * 0.85);
      
      await sharp(inputPath)
        .resize(newWidth, newHeight, { 
          kernel: sharp.kernel.lanczos3,
          withoutEnlargement: true 
        })
        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
        .toFile(outputPath);
      
      const finalStats = fs.statSync(outputPath);
      console.log(`   📊 Final size: ${(finalStats.size / (1024 * 1024)).toFixed(2)}MB`);
      console.log(`   📐 Final dimensions: ${newWidth}x${newHeight}`);
      
      if (finalStats.size > maxSizeBytes) {
        throw new Error(`Could not compress ${path.basename(inputPath)} under size limit`);
      }
    }
    
    return outputPath;
    
  } catch (error) {
    console.error(`   ❌ Compression failed: ${error.message}`);
    throw error;
  }
}

// Upload a single file to Cloudinary
async function uploadFile(filePath, folder, originalFilename) {
  console.log(`📤 Processing: ${originalFilename} → ${folder}/`);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  try {
    // Prepare compressed version if needed
    const tempPath = path.join(TEMP_DIR, `compressed_${originalFilename}`);
    const finalPath = await compressImage(filePath, tempPath, MAX_FILE_SIZE);
    
    // Create public ID from filename
    const publicId = originalFilename.replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_]/g, '_')
      .replace(/Photo_Nov_15_2024__3_36_11_PM/g, 'photo_nov_15_2024')
      .toLowerCase();
    
    const uploadOptions = {
      folder: folder,
      public_id: publicId,
      resource_type: 'image',
      overwrite: true
    };
    
    console.log(`   🔧 Public ID: ${publicId}`);
    console.log(`   ⬆️  Uploading...`);
    
    const result = await cloudinary.uploader.upload(finalPath, uploadOptions);
    
    console.log(`   ✅ Success: ${result.secure_url}`);
    
    // Clean up temp file if it was created
    if (finalPath !== filePath && fs.existsSync(finalPath)) {
      fs.unlinkSync(finalPath);
    }
    
    return {
      success: true,
      filename: originalFilename,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      wasCompressed: finalPath !== filePath
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
      console.error(`❌ Failed to process ${filename}: ${error.message}`);
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
      console.error(`❌ Failed to process ${filename}: ${error.message}`);
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
    was_compressed: item.wasCompressed ? 'Yes' : 'No',
    upload_date: new Date().toISOString().split('T')[0],
    tags: `disruptors-media,priority,${item.category}`,
    migration_notes: `Priority upload - ${item.wasCompressed ? 'Compressed for size limit' : 'Original quality'}`
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
  
  // Generate constants section
  const newConstantsSection = Object.entries(constants)
    .map(([key, url]) => `  ${key}: '${url}',`)
    .join('\n');
  
  // Create file content
  const fileContent = `// Auto-updated Cloudinary Assets
// Last updated: ${new Date().toISOString()}
// Priority assets uploaded: ${uploadResults.success.length}

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
`;
  
  fs.writeFileSync(constantsFile, fileContent, 'utf8');
  console.log(`✅ Constants file updated: ${path.relative(process.cwd(), constantsFile)}`);
  console.log(`📊 Added ${Object.keys(constants).length} asset constants`);
}

// Cleanup function
function cleanup() {
  console.log('\n🧹 CLEANING UP TEMP FILES');
  console.log('='.repeat(50));
  
  if (fs.existsSync(TEMP_DIR)) {
    const files = fs.readdirSync(TEMP_DIR);
    console.log(`🗑️  Removing ${files.length} temporary files...`);
    
    files.forEach(file => {
      const filePath = path.join(TEMP_DIR, file);
      fs.unlinkSync(filePath);
    });
    
    fs.rmdirSync(TEMP_DIR);
    console.log('✅ Cleanup complete');
  }
}

// Main execution function
async function main() {
  console.log('🎯 PRIORITY CLOUDINARY ASSET UPLOAD WITH COMPRESSION');
  console.log('='.repeat(70));
  console.log('📤 Processing critical assets for Cloudinary:');
  console.log(`   • ${STUDIO_PHOTOS.length} studio photos (will compress if >9MB)`);
  console.log(`   • ${PORTFOLIO_WORK.length} portfolio work images`);
  console.log(`☁️  Target cloud: dvcvxhzmt`);
  console.log(`📐 Max file size: ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(1)}MB`);
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
    console.log('\n' + '='.repeat(70));
    console.log('📋 UPLOAD SUMMARY');
    console.log('='.repeat(70));
    
    const totalAssets = STUDIO_PHOTOS.length + PORTFOLIO_WORK.length;
    const successCount = uploadResults.success.length;
    const failedCount = uploadResults.failed.length;
    const compressedCount = uploadResults.success.filter(item => item.wasCompressed).length;
    
    console.log(`✅ Successful uploads: ${successCount}/${totalAssets}`);
    console.log(`❌ Failed uploads: ${failedCount}`);
    console.log(`🗜️  Compressed files: ${compressedCount}`);
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
    console.log('\n' + '🎉'.repeat(25));
    console.log('✅ PRIORITY MIGRATION COMPLETE!');
    console.log('🎉'.repeat(25));
    console.log(`⏱️  Total time: ${duration}s`);
    console.log(`📊 Assets uploaded: ${successCount}/${totalAssets}`);
    
    if (successCount > 0) {
      console.log('\n🔗 UPLOADED ASSET URLS:');
      console.log('-'.repeat(70));
      
      // Group by category
      const studioAssets = uploadResults.success.filter(item => item.category === 'studio');
      const portfolioAssets = uploadResults.success.filter(item => item.category === 'portfolio');
      
      if (studioAssets.length > 0) {
        console.log('📸 Studio Photos:');
        studioAssets.forEach(item => {
          const compressed = item.wasCompressed ? ' (compressed)' : '';
          console.log(`   ${item.filename}${compressed}: ${item.url}`);
        });
      }
      
      if (portfolioAssets.length > 0) {
        console.log('\n💼 Portfolio Work:');
        portfolioAssets.forEach(item => {
          const compressed = item.wasCompressed ? ' (compressed)' : '';
          console.log(`   ${item.filename}${compressed}: ${item.url}`);
        });
      }
    }
    
    console.log('\n📝 NEXT STEPS:');
    console.log('1. ✅ Test URLs above in your browser');
    console.log('2. 🔄 Update React components to use new Cloudinary URLs');
    console.log('3. 📱 Import: import { cloudinaryAssets } from \'./constants/cloudinaryAssets\'');
    console.log('4. 🚀 Continue with remaining assets migration');
    console.log('5. 🧹 Remove local assets after verification');
    
  } catch (error) {
    console.error('\n💥 UPLOAD FAILED:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    cleanup();
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