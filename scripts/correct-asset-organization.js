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

// Correct folder mappings based on asset type
const CORRECT_FOLDER_MAPPINGS = {
  // Backgrounds
  'bg-what-we-do': 'disruptors-media/ui/backgrounds',
  'book-a-call-bg': 'disruptors-media/ui/backgrounds',
  'main-bg': 'disruptors-media/ui/backgrounds',
  'mobile-sec-bg': 'disruptors-media/ui/backgrounds',
  'poster': 'disruptors-media/ui/backgrounds',
  'poster-abt': 'disruptors-media/ui/backgrounds',
  
  // Logos
  'gold-logo': 'disruptors-media/brand/logos',
  'gold-logo-banner': 'disruptors-media/brand/logos',
  'logo': 'disruptors-media/brand/logos',
  'logo-emboss': 'disruptors-media/brand/logos',
  'logo-menu': 'disruptors-media/brand/logos',
  'mobile-menu-logo': 'disruptors-media/brand/logos',
  
  // Social Icons
  'fb': 'disruptors-media/ui/icons/social',
  'insta': 'disruptors-media/ui/icons/social',
  'twitter': 'disruptors-media/ui/icons/social',
  'youtube': 'disruptors-media/ui/icons/social',
  
  // UI Elements
  'arrow-cta': 'disruptors-media/ui/elements',
  'favicon': 'disruptors-media/ui/elements',
  'minus-icon': 'disruptors-media/ui/elements',
  'mute-icon': 'disruptors-media/ui/elements',
  'pause-icon': 'disruptors-media/ui/elements',
  'play-ico': 'disruptors-media/ui/elements',
  'play-icon': 'disruptors-media/ui/elements',
  'plus-icon': 'disruptors-media/ui/elements',
  'prev-arrow': 'disruptors-media/ui/elements',
  
  // Feature Graphics (Services)
  'after-phone-sec': 'disruptors-media/services/graphics',
  'hand-human': 'disruptors-media/services/graphics',
  'hand-robot': 'disruptors-media/services/graphics',
  'hand-srv': 'disruptors-media/services/graphics',
  'phone': 'disruptors-media/services/graphics',
  'services-img': 'disruptors-media/services/graphics',
  'what-we-do-abt': 'disruptors-media/services/graphics',
  'what-we-do-abt-1': 'disruptors-media/services/graphics',
  'what-we-do-abt-2': 'disruptors-media/services/graphics',
  'what-we-do-abt-3': 'disruptors-media/services/graphics',
  'what-we-do-bx': 'disruptors-media/services/graphics',
  'what-we-do-bx-1': 'disruptors-media/services/graphics',
  'what-we-do-bx-2': 'disruptors-media/services/graphics',
  'what-we-do-bx-3': 'disruptors-media/services/graphics',
  'what-we-do-frame': 'disruptors-media/services/graphics',
  
  // Podcast Content
  'pd-new-sm': 'disruptors-media/content/podcast',
  'pd-new-sm-1': 'disruptors-media/content/podcast',
  'pd-new-sm-2': 'disruptors-media/content/podcast',
  'pd-new-sm-3': 'disruptors-media/content/podcast',
  'pd-new-sm1': 'disruptors-media/content/podcast',
  'pd-new-sm1-1': 'disruptors-media/content/podcast',
  'pd-new-sm1-2': 'disruptors-media/content/podcast',
  'pd-new-sm1-3': 'disruptors-media/content/podcast',
  'podcast-new-lg': 'disruptors-media/content/podcast',
  'podcast-new-lg-1': 'disruptors-media/content/podcast',
  
  // Client Assets
  'client-1': 'disruptors-media/clients/assets',
  'client-2': 'disruptors-media/clients/assets'
};

class AssetOrganizationCorrector {
  constructor() {
    this.correctedAssets = [];
    this.errors = [];
  }

  async getMisplacedAssets() {
    console.log('📋 Finding assets that need reorganization...');
    const misplacedAssets = [];
    
    try {
      // Get assets from misc/unmapped folder
      const unmappedResult = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'disruptors-media/misc/unmapped/',
        max_results: 500,
        resource_type: 'image'
      });
      
      misplacedAssets.push(...unmappedResult.resources);
      console.log(`📦 Found ${unmappedResult.resources.length} assets in misc/unmapped`);
      
    } catch (error) {
      console.error('❌ Error fetching misplaced assets:', error.message);
    }
    
    return misplacedAssets;
  }

  getCorrectFolderPath(filename) {
    return CORRECT_FOLDER_MAPPINGS[filename] || 'disruptors-media/misc/legacy';
  }

  async correctAssetLocation(asset) {
    const oldPublicId = asset.public_id;
    const filename = oldPublicId.split('/').pop();
    const correctFolderPath = this.getCorrectFolderPath(filename);
    const newPublicId = `${correctFolderPath}/${filename}`;
    
    // Skip if already in correct location
    if (oldPublicId === newPublicId) {
      console.log(`✅ Already correct: ${oldPublicId}`);
      return { skipped: true, oldPublicId, newPublicId, reason: 'already_correct' };
    }
    
    try {
      console.log(`🔄 Correcting ${oldPublicId} → ${newPublicId}`);
      
      // Rename/move the asset to correct location
      await cloudinary.uploader.rename(oldPublicId, newPublicId);
      
      const correctionRecord = {
        oldPublicId,
        newPublicId,
        correctFolderPath,
        filename,
        correctedAt: new Date().toISOString(),
        success: true
      };
      
      this.correctedAssets.push(correctionRecord);
      
      console.log(`✅ Successfully corrected ${oldPublicId}`);
      return correctionRecord;
      
    } catch (error) {
      const errorRecord = {
        oldPublicId,
        newPublicId,
        error: error.message,
        correctedAt: new Date().toISOString(),
        success: false
      };
      
      this.errors.push(errorRecord);
      console.error(`❌ Failed to correct ${oldPublicId}:`, error.message);
      return errorRecord;
    }
  }

  async correctAllAssets() {
    console.log('🔧 Starting asset organization correction...\n');
    
    const misplacedAssets = await this.getMisplacedAssets();
    
    if (misplacedAssets.length === 0) {
      console.log('ℹ️ No misplaced assets found to correct');
      return;
    }
    
    // Process assets in batches to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < misplacedAssets.length; i += batchSize) {
      const batch = misplacedAssets.slice(i, i + batchSize);
      
      console.log(`\n📦 Processing correction batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(misplacedAssets.length/batchSize)}`);
      
      const batchPromises = batch.map(asset => this.correctAssetLocation(asset));
      await Promise.all(batchPromises);
      
      // Small delay between batches
      if (i + batchSize < misplacedAssets.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log('\n📊 Correction Summary:');
    console.log(`✅ Successfully corrected: ${this.correctedAssets.length}`);
    console.log(`❌ Failed: ${this.errors.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.errors.forEach(err => {
        console.log(`  - ${err.oldPublicId}: ${err.error}`);
      });
    }
  }

  async generateFinalReport() {
    const report = {
      correctionDate: new Date().toISOString(),
      summary: {
        totalCorrected: this.correctedAssets.length,
        totalErrors: this.errors.length,
        correctMappings: CORRECT_FOLDER_MAPPINGS
      },
      correctedAssets: this.correctedAssets,
      errors: this.errors,
      finalFolderStructure: {}
    };
    
    // Group corrected assets by final folder
    this.correctedAssets.forEach(asset => {
      if (!report.finalFolderStructure[asset.correctFolderPath]) {
        report.finalFolderStructure[asset.correctFolderPath] = [];
      }
      report.finalFolderStructure[asset.correctFolderPath].push({
        filename: asset.filename,
        oldPath: asset.oldPublicId,
        finalPath: asset.newPublicId
      });
    });
    
    // Save the report
    const reportPath = path.join(__dirname, '..', 'asset-organization-final-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log(`\n📄 Final organization report saved to: ${reportPath}`);
    return report;
  }

  async generateUpdatedTrackingCsv() {
    console.log('\n📝 Generating final asset tracking CSV...');
    
    // Get all organized assets for complete inventory
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'disruptors-media/',
        max_results: 500,
        resource_type: 'image'
      });
      
      const csvHeaders = 'Asset Path,Folder,Filename,Format,Size (bytes),Width,Height,Created At,URL\n';
      const csvRows = result.resources.map(asset => {
        const folder = asset.public_id.split('/').slice(0, -1).join('/');
        const filename = asset.public_id.split('/').pop();
        return `"${asset.public_id}","${folder}","${filename}","${asset.format}","${asset.bytes}","${asset.width}","${asset.height}","${asset.created_at}","${asset.url}"`;
      }).join('\n');
      
      const csvContent = csvHeaders + csvRows;
      
      const csvPath = path.join(__dirname, '..', 'disruptors-media-final-assets.csv');
      fs.writeFileSync(csvPath, csvContent);
      
      console.log(`✅ Final asset inventory CSV saved to: ${csvPath}`);
      console.log(`📊 Total organized assets: ${result.resources.length}`);
      
    } catch (error) {
      console.error('❌ Error generating final CSV:', error.message);
    }
  }
}

// Main execution
async function main() {
  const corrector = new AssetOrganizationCorrector();
  
  try {
    await corrector.correctAllAssets();
    await corrector.generateFinalReport();
    await corrector.generateUpdatedTrackingCsv();
    
    console.log('\n🎉 Asset organization correction complete!');
    console.log('\n📋 Final organized folder structure:');
    console.log('📁 disruptors-media/');
    console.log('├── 📁 brand/logos/          - Company logos and branding');
    console.log('├── 📁 ui/backgrounds/       - Background images and textures');
    console.log('├── 📁 ui/elements/          - UI components and icons');  
    console.log('├── 📁 ui/icons/social/      - Social media icons');
    console.log('├── 📁 services/graphics/    - Service-related graphics');
    console.log('├── 📁 content/podcast/      - Podcast imagery and thumbnails');
    console.log('├── 📁 clients/assets/       - Client logos and materials');
    console.log('└── 📁 misc/legacy/          - Miscellaneous legacy items');
    
    console.log('\n📋 Final steps:');
    console.log('1. Update cloudinaryAssets.ts constants to use new paths');
    console.log('2. Test all pages to ensure assets load correctly');
    console.log('3. Remove any old dmsite folder references from code');
    console.log('4. Clean up any empty folders in Cloudinary (optional)');
    
  } catch (error) {
    console.error('\n💥 Fatal error during correction:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = AssetOrganizationCorrector;