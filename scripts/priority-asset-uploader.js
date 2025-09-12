#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const CLOUDINARY_CLOUD_NAME = 'dvcvxhzmt';
const CLOUDINARY_API_KEY = '935251962635945';
const CLOUDINARY_API_SECRET = 'CNppaSbbi3IevxjuRvg5-8CKCds';

// Priority assets to upload first
const PRIORITY_ASSETS = {
  studio: {
    folder: 'disruptors-media/content/studio',
    files: [
      'GL3A0022.JPG',
      'GL3A0026.JPG', 
      'GL3A0030.JPG',
      'GL3A0042.JPG',
      'Photo Nov 15 2024, 3 36 11 PM.jpg'
    ],
    basePath: 'public/assets/images'
  },
  portfolio: {
    folder: 'disruptors-media/content/portfolio',
    files: [
      'work-1.jpg',
      'work-2.jpg',
      'work-3.jpg',
      'work-4.jpg',
      'work-5.jpg',
      'work-6.jpg'
    ],
    basePath: 'public/assets/images/portfolio'
  }
};

// Upload results tracking
const uploadResults = {
  success: [],
  failed: [],
  urls: {}
};

// Function to upload a single file to Cloudinary
async function uploadToCloudinary(filePath, publicId, folder, resourceType = 'image') {
  const fullPath = path.resolve(filePath);
  
  console.log(`📤 Uploading: ${path.basename(filePath)} → ${folder}/${publicId}`);
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  
  // Get file stats for logging
  const stats = fs.statSync(fullPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`   📊 Size: ${sizeMB}MB`);
  
  try {
    // Use Cloudinary CLI to upload (requires cloudinary-cli package)
    const uploadCommand = `npx cloudinary-cli upload "${fullPath}" ` +
      `--public-id "${publicId}" ` +
      `--folder "${folder}" ` +
      `--resource-type "${resourceType}" ` +
      `--overwrite ` +
      `--format "auto" ` +
      `--quality "auto" ` +
      `--cloud-name "${CLOUDINARY_CLOUD_NAME}" ` +
      `--api-key "${CLOUDINARY_API_KEY}" ` +
      `--api-secret "${CLOUDINARY_API_SECRET}"`;
    
    console.log(`   🔧 Executing upload...`);
    const { stdout, stderr } = await execAsync(uploadCommand);
    
    if (stderr && !stderr.includes('successfully uploaded')) {
      console.error(`   ⚠️  Upload warning: ${stderr}`);
    }
    
    // Parse the response to get the URL
    const publicIdPath = `${folder}/${publicId}`;
    const cloudinaryUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload/f_auto,q_auto/${publicIdPath}`;
    
    console.log(`   ✅ Success: ${cloudinaryUrl}`);
    
    return {
      success: true,
      url: cloudinaryUrl,
      publicId: publicIdPath,
      originalPath: filePath
    };
    
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    throw error;
  }
}

// Function to verify uploaded assets are accessible
async function verifyUpload(url) {
  try {
    // Simple fetch to check if the URL returns 200
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Main upload function for priority assets
async function uploadPriorityAssets() {
  console.log('🚀 Starting Priority Asset Upload to Cloudinary\n');
  console.log(`☁️  Cloud: ${CLOUDINARY_CLOUD_NAME}`);
  console.log(`📁 Target folders: studio, portfolio\n`);
  
  // Track overall progress
  let totalFiles = 0;
  let processedFiles = 0;
  
  // Count total files
  Object.values(PRIORITY_ASSETS).forEach(category => {
    totalFiles += category.files.length;
  });
  
  console.log(`📊 Total files to upload: ${totalFiles}\n`);
  
  // Upload each category
  for (const [categoryName, category] of Object.entries(PRIORITY_ASSETS)) {
    console.log(`\n📂 UPLOADING ${categoryName.toUpperCase()} (${category.files.length} files):`);
    console.log(`   📁 Destination: ${category.folder}\n`);
    
    for (const filename of category.files) {
      processedFiles++;
      
      try {
        const filePath = path.join(category.basePath, filename);
        
        // Create public ID (remove extension and sanitize)
        const publicId = filename.replace(/\.[^/.]+$/, '')
          .replace(/[^a-zA-Z0-9-_]/g, '_')
          .toLowerCase();
        
        console.log(`[${processedFiles}/${totalFiles}] ${filename}`);
        
        const result = await uploadToCloudinary(filePath, publicId, category.folder);
        
        uploadResults.success.push({
          filename,
          category: categoryName,
          url: result.url,
          publicId: result.publicId,
          originalPath: result.originalPath
        });
        
        uploadResults.urls[filename] = result.url;
        
        // Brief pause between uploads
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`   ❌ Upload failed: ${error.message}`);
        
        uploadResults.failed.push({
          filename,
          category: categoryName,
          error: error.message
        });
      }
      
      console.log(''); // Empty line for readability
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📋 UPLOAD SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful uploads: ${uploadResults.success.length}`);
  console.log(`❌ Failed uploads: ${uploadResults.failed.length}`);
  console.log(`📊 Success rate: ${((uploadResults.success.length / totalFiles) * 100).toFixed(1)}%`);
  
  if (uploadResults.success.length > 0) {
    console.log('\n✅ SUCCESSFULLY UPLOADED:');
    uploadResults.success.forEach(item => {
      console.log(`   📸 ${item.filename} → ${item.url}`);
    });
  }
  
  if (uploadResults.failed.length > 0) {
    console.log('\n❌ FAILED UPLOADS:');
    uploadResults.failed.forEach(item => {
      console.log(`   💥 ${item.filename}: ${item.error}`);
    });
  }
  
  return uploadResults;
}

// Function to verify all uploaded assets
async function verifyAllUploads(results) {
  console.log('\n🔍 VERIFYING UPLOADED ASSETS\n');
  
  const verificationPromises = results.success.map(async (item) => {
    console.log(`🔗 Checking: ${item.filename}...`);
    
    const isAccessible = await verifyUpload(item.url);
    
    if (isAccessible) {
      console.log(`   ✅ Accessible: ${item.url}`);
      return { ...item, verified: true };
    } else {
      console.log(`   ❌ Not accessible: ${item.url}`);
      return { ...item, verified: false };
    }
  });
  
  const verificationResults = await Promise.all(verificationPromises);
  
  const accessibleCount = verificationResults.filter(item => item.verified).length;
  const inaccessibleCount = verificationResults.filter(item => !item.verified).length;
  
  console.log('\n' + '='.repeat(60));
  console.log('🔍 VERIFICATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Accessible URLs: ${accessibleCount}`);
  console.log(`❌ Inaccessible URLs: ${inaccessibleCount}`);
  console.log(`📊 Accessibility rate: ${((accessibleCount / verificationResults.length) * 100).toFixed(1)}%`);
  
  return verificationResults;
}

// Function to create tracking CSV for uploaded assets
async function createTrackingFile(results) {
  console.log('\n📄 CREATING TRACKING FILE\n');
  
  const trackingData = results.success.map(item => ({
    filename: item.filename,
    category: item.category,
    original_path: item.originalPath,
    cloudinary_url: item.url,
    cloudinary_folder: PRIORITY_ASSETS[item.category].folder,
    upload_date: new Date().toISOString().split('T')[0],
    public_id: item.publicId,
    tags: `disruptors-media,priority-upload,${item.category}`,
    migration_notes: `Priority upload - Phase 1 migration`
  }));
  
  // Create CSV content
  const headers = Object.keys(trackingData[0]);
  const csvContent = [
    headers.join(','),
    ...trackingData.map(row => 
      headers.map(header => `"${row[header] || ''}"`).join(',')
    )
  ].join('\n');
  
  const trackingFile = path.join(__dirname, '..', 'priority-assets-tracking.csv');
  fs.writeFileSync(trackingFile, csvContent, 'utf8');
  
  console.log(`📄 Tracking file created: ${trackingFile}`);
  console.log(`📊 Entries logged: ${trackingData.length}`);
  
  return trackingFile;
}

// Main execution function
async function main() {
  console.log('🎯 PRIORITY CLOUDINARY ASSET MIGRATION\n');
  console.log('This will upload the most critical assets:');
  console.log('• 5 high-quality studio photos (GL3A*.JPG + Photo Nov 15...)');
  console.log('• 6 portfolio work images (work-1.jpg through work-6.jpg)');
  console.log('');
  
  try {
    // Step 1: Upload priority assets
    const uploadResults = await uploadPriorityAssets();
    
    if (uploadResults.success.length === 0) {
      console.log('❌ No assets were successfully uploaded. Exiting.');
      return;
    }
    
    // Step 2: Verify uploads are accessible
    console.log('\n⏳ Waiting 2 seconds for Cloudinary processing...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const verificationResults = await verifyAllUploads(uploadResults);
    
    // Step 3: Create tracking file
    const trackingFile = await createTrackingFile(uploadResults);
    
    // Step 4: Summary and next steps
    console.log('\n' + '🎉'.repeat(20));
    console.log('✅ PRIORITY MIGRATION COMPLETE!');
    console.log('🎉'.repeat(20));
    console.log(`\n📊 Results:`);
    console.log(`   • ${uploadResults.success.length} assets uploaded successfully`);
    console.log(`   • ${uploadResults.failed.length} failed uploads`);
    console.log(`   • Tracking file: ${path.basename(trackingFile)}`);
    
    if (uploadResults.success.length > 0) {
      console.log('\n🔗 Asset URLs for immediate use:');
      Object.entries(uploadResults.urls).forEach(([filename, url]) => {
        console.log(`   ${filename}: ${url}`);
      });
    }
    
    console.log('\n📝 Next Steps:');
    console.log('1. Test the URLs above in your browser');
    console.log('2. Update React components to use these Cloudinary URLs');
    console.log('3. Run the full migration for remaining assets');
    console.log('4. Update src/constants/cloudinaryAssets.ts with new URLs');
    
  } catch (error) {
    console.error('\n💥 Migration failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Command line interface
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'upload':
    case 'start':
    default:
      main();
      break;
    case 'verify-only':
      // Would verify existing uploads without uploading
      console.log('Verify-only mode not yet implemented');
      break;
  }
}

module.exports = {
  uploadPriorityAssets,
  verifyAllUploads,
  createTrackingFile,
  uploadResults,
  PRIORITY_ASSETS
};