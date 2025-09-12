#!/usr/bin/env node

const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvcvxhzmt',
  api_key: '935251962635945',
  api_secret: 'CNppaSbbi3IevxjuRvg5-8CKCds'
});

// Mapping of old dmsite folders to new organized structure
const FOLDER_MAPPINGS = {
  'dmsite/backgrounds': 'disruptors-media/ui/backgrounds',
  'dmsite/logos': 'disruptors-media/brand/logos',
  'dmsite/social-icons': 'disruptors-media/ui/icons/social',
  'dmsite/ui-elements': 'disruptors-media/ui/elements',
  'dmsite/feature-graphics': 'disruptors-media/services/graphics',
  'dmsite/podcast-content': 'disruptors-media/content/podcast',
  'dmsite/client-assets': 'disruptors-media/clients/assets',
  'dmsite/miscellaneous': 'disruptors-media/misc/legacy' // Put miscellaneous items in legacy folder
};

// Content-based mappings for dmsite/miscellaneous items
const MISC_CONTENT_MAPPINGS = {
  'more-pd': 'disruptors-media/ui/icons/misc',
  'loader-lft': 'disruptors-media/ui/backgrounds',
  'img-3': 'disruptors-media/content/marketing',
  'gallery-frame': 'disruptors-media/ui/elements'
};

class CloudinaryAssetReorganizer {
  constructor() {
    this.movedAssets = [];
    this.errors = [];
    this.existingAssets = new Set();
  }

  async getExistingAssets() {
    console.log('📋 Scanning existing organized assets...');
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'disruptors-media/',
        max_results: 500,
        resource_type: 'image'
      });
      
      result.resources.forEach(asset => {
        this.existingAssets.add(asset.public_id);
      });
      
      console.log(`✅ Found ${this.existingAssets.size} existing organized assets`);
    } catch (error) {
      console.error('❌ Error fetching existing assets:', error.message);
    }
  }

  async getDmsiteAssets() {
    console.log('📋 Scanning dmsite assets...');
    const dmsiteAssets = [];
    
    try {
      // Get assets with dmsite/ prefix
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'dmsite/',
        max_results: 500,
        resource_type: 'image'
      });
      
      dmsiteAssets.push(...result.resources);
      
      // Also check for assets in the old folder structure based on our inventory
      const folderPrefixes = ['backgrounds/', 'logos/', 'social-icons/', 'ui-elements/', 
                             'feature-graphics/', 'podcast-content/', 'client-assets/', 'miscellaneous/'];
      
      for (const prefix of folderPrefixes) {
        try {
          const folderResult = await cloudinary.api.resources({
            type: 'upload',
            prefix: prefix,
            max_results: 500,
            resource_type: 'image'
          });
          
          // Add these assets as if they have dmsite/ prefix for consistency
          folderResult.resources.forEach(asset => {
            if (!asset.public_id.startsWith('disruptors-media/')) {
              dmsiteAssets.push({
                ...asset,
                original_public_id: asset.public_id,
                public_id: `dmsite/${asset.public_id}` // Add dmsite prefix for mapping
              });
            }
          });
        } catch (err) {
          // Folder might not exist, continue
          console.log(`⚠️ No assets found in ${prefix}`);
        }
      }
      
      console.log(`📦 Found ${dmsiteAssets.length} dmsite assets to reorganize`);
      return dmsiteAssets;
    } catch (error) {
      console.error('❌ Error fetching dmsite assets:', error.message);
      return [];
    }
  }

  getNewFolderPath(oldPublicId) {
    // Remove dmsite/ prefix if present for mapping
    const cleanPath = oldPublicId.replace(/^dmsite\//, '');
    
    // Handle special cases for miscellaneous items
    if (cleanPath.includes('miscellaneous/')) {
      const filename = cleanPath.split('/').pop();
      if (MISC_CONTENT_MAPPINGS[filename]) {
        return MISC_CONTENT_MAPPINGS[filename];
      }
      return 'disruptors-media/misc/legacy';
    }
    
    // Apply folder mappings based on the clean path
    if (cleanPath.startsWith('backgrounds/')) {
      return 'disruptors-media/ui/backgrounds';
    } else if (cleanPath.startsWith('logos/')) {
      return 'disruptors-media/brand/logos';
    } else if (cleanPath.startsWith('social-icons/')) {
      return 'disruptors-media/ui/icons/social';
    } else if (cleanPath.startsWith('ui-elements/')) {
      return 'disruptors-media/ui/elements';
    } else if (cleanPath.startsWith('feature-graphics/')) {
      return 'disruptors-media/services/graphics';
    } else if (cleanPath.startsWith('podcast-content/')) {
      return 'disruptors-media/content/podcast';
    } else if (cleanPath.startsWith('client-assets/')) {
      return 'disruptors-media/clients/assets';
    }
    
    // Default fallback for any unmapped items
    return 'disruptors-media/misc/unmapped';
  }

  async moveAsset(asset) {
    const oldPublicId = asset.original_public_id || asset.public_id;
    const newFolderPath = this.getNewFolderPath(oldPublicId);
    
    // Extract filename from old path
    const filename = oldPublicId.split('/').pop();
    const newPublicId = `${newFolderPath}/${filename}`;
    
    // Check if asset already exists in new location
    if (this.existingAssets.has(newPublicId)) {
      console.log(`⏭️  Skipping ${oldPublicId} → already exists at ${newPublicId}`);
      return { skipped: true, oldPublicId, newPublicId, reason: 'already_exists' };
    }
    
    try {
      console.log(`🔄 Moving ${oldPublicId} → ${newPublicId}`);
      
      // Rename/move the asset
      await cloudinary.uploader.rename(oldPublicId, newPublicId);
      
      const moveRecord = {
        oldPublicId,
        newPublicId,
        newFolderPath,
        filename,
        movedAt: new Date().toISOString(),
        success: true
      };
      
      this.movedAssets.push(moveRecord);
      this.existingAssets.add(newPublicId);
      
      console.log(`✅ Successfully moved ${oldPublicId}`);
      return moveRecord;
      
    } catch (error) {
      const errorRecord = {
        oldPublicId,
        newPublicId,
        error: error.message,
        movedAt: new Date().toISOString(),
        success: false
      };
      
      this.errors.push(errorRecord);
      console.error(`❌ Failed to move ${oldPublicId}:`, error.message);
      return errorRecord;
    }
  }

  async reorganizeAllAssets() {
    console.log('🚀 Starting dmsite asset reorganization...\n');
    
    // Get existing organized assets first
    await this.getExistingAssets();
    
    // Get all dmsite assets
    const dmsiteAssets = await this.getDmsiteAssets();
    
    if (dmsiteAssets.length === 0) {
      console.log('ℹ️ No dmsite assets found to reorganize');
      return;
    }
    
    // Process assets in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < dmsiteAssets.length; i += batchSize) {
      const batch = dmsiteAssets.slice(i, i + batchSize);
      
      console.log(`\n📦 Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(dmsiteAssets.length/batchSize)}`);
      
      const batchPromises = batch.map(asset => this.moveAsset(asset));
      await Promise.all(batchPromises);
      
      // Small delay between batches
      if (i + batchSize < dmsiteAssets.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log('\n📊 Reorganization Summary:');
    console.log(`✅ Successfully moved: ${this.movedAssets.length}`);
    console.log(`⏭️  Skipped (already exist): ${dmsiteAssets.length - this.movedAssets.length - this.errors.length}`);
    console.log(`❌ Failed: ${this.errors.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.errors.forEach(err => {
        console.log(`  - ${err.oldPublicId}: ${err.error}`);
      });
    }
  }

  async generateReport() {
    const report = {
      reorganizationDate: new Date().toISOString(),
      summary: {
        totalMoved: this.movedAssets.length,
        totalErrors: this.errors.length,
        folderMappings: FOLDER_MAPPINGS,
        miscContentMappings: MISC_CONTENT_MAPPINGS
      },
      movedAssets: this.movedAssets,
      errors: this.errors,
      newFolderStructure: {}
    };
    
    // Group moved assets by new folder for the report
    this.movedAssets.forEach(asset => {
      if (!report.newFolderStructure[asset.newFolderPath]) {
        report.newFolderStructure[asset.newFolderPath] = [];
      }
      report.newFolderStructure[asset.newFolderPath].push({
        filename: asset.filename,
        oldPath: asset.oldPublicId,
        newPath: asset.newPublicId
      });
    });
    
    // Save the report
    const reportPath = path.join(__dirname, '..', 'dmsite-reorganization-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    return report;
  }

  async updateTrackingCsv() {
    console.log('\n📝 Updating asset tracking CSV...');
    
    // Generate CSV content for moved assets
    const csvHeaders = 'Old Path,New Path,Folder,Filename,Status,Moved Date\n';
    const csvRows = this.movedAssets.map(asset => 
      `"${asset.oldPublicId}","${asset.newPublicId}","${asset.newFolderPath}","${asset.filename}","moved","${asset.movedAt}"`
    ).join('\n');
    
    const csvContent = csvHeaders + csvRows;
    
    const csvPath = path.join(__dirname, '..', 'dmsite-asset-moves.csv');
    fs.writeFileSync(csvPath, csvContent);
    
    console.log(`✅ CSV tracking file saved to: ${csvPath}`);
  }
}

// Main execution
async function main() {
  const reorganizer = new CloudinaryAssetReorganizer();
  
  try {
    await reorganizer.reorganizeAllAssets();
    await reorganizer.generateReport();
    await reorganizer.updateTrackingCsv();
    
    console.log('\n🎉 Dmsite asset reorganization complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the reorganization report');
    console.log('2. Update your application code to use new asset paths');
    console.log('3. Test that all assets are loading correctly');
    console.log('4. Clean up any old dmsite folder references');
    
  } catch (error) {
    console.error('\n💥 Fatal error during reorganization:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = CloudinaryAssetReorganizer;