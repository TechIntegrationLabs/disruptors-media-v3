const { v2: cloudinary } = require('cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvcvxhzmt',
  api_key: '935251962635945',
  api_secret: 'CNppaSbbi3IevxjuRvg5-8CKCds'
});

async function analyzeDmsiteFolder() {
  console.log('🔍 Analyzing Cloudinary dmsite folder assets...\n');

  try {
    // Get all resources with dmsite prefix
    const resources = await cloudinary.search
      .expression('folder:dmsite*')
      .with_field('context')
      .with_field('metadata')
      .with_field('tags')
      .max_results(500)
      .execute();

    console.log(`📊 Found ${resources.resources.length} assets in dmsite folder\n`);

    if (resources.resources.length === 0) {
      console.log('ℹ️ No assets found in dmsite folder. Checking root folder for dmsite assets...');
      
      // Try searching by prefix instead
      const rootSearch = await cloudinary.search
        .expression('public_id:dmsite*')
        .with_field('context')
        .with_field('metadata')
        .with_field('tags')
        .max_results(500)
        .execute();

      if (rootSearch.resources.length === 0) {
        console.log('❌ No dmsite assets found in root either.');
        return;
      }
      
      resources.resources = rootSearch.resources;
      console.log(`📊 Found ${resources.resources.length} dmsite assets in root folder\n`);
    }

    // Organize assets by type and folder structure
    const assetInventory = {
      images: [],
      videos: [],
      raw: [],
      folderStructure: {},
      totalSize: 0,
      formats: {},
      dimensions: {}
    };

    resources.resources.forEach(asset => {
      const pathParts = asset.public_id.split('/');
      const filename = pathParts[pathParts.length - 1];
      const folderPath = pathParts.slice(0, -1).join('/');

      // Organize by folder structure
      if (!assetInventory.folderStructure[folderPath]) {
        assetInventory.folderStructure[folderPath] = [];
      }
      assetInventory.folderStructure[folderPath].push(filename);

      // Count formats
      if (!assetInventory.formats[asset.format]) {
        assetInventory.formats[asset.format] = 0;
      }
      assetInventory.formats[asset.format]++;

      // Track dimensions for images
      if (asset.resource_type === 'image' && asset.width && asset.height) {
        const dimensionKey = `${asset.width}x${asset.height}`;
        if (!assetInventory.dimensions[dimensionKey]) {
          assetInventory.dimensions[dimensionKey] = 0;
        }
        assetInventory.dimensions[dimensionKey]++;
      }

      // Add to total size
      assetInventory.totalSize += asset.bytes || 0;

      // Organize by resource type
      const assetInfo = {
        public_id: asset.public_id,
        filename: filename,
        folder: folderPath,
        format: asset.format,
        resource_type: asset.resource_type,
        width: asset.width || null,
        height: asset.height || null,
        bytes: asset.bytes || 0,
        size_mb: asset.bytes ? (asset.bytes / 1024 / 1024).toFixed(2) : '0',
        created_at: asset.created_at,
        url: asset.secure_url,
        tags: asset.tags || [],
        context: asset.context || {},
        metadata: asset.metadata || {}
      };

      if (asset.resource_type === 'image') {
        assetInventory.images.push(assetInfo);
      } else if (asset.resource_type === 'video') {
        assetInventory.videos.push(assetInfo);
      } else {
        assetInventory.raw.push(assetInfo);
      }
    });

    // Display comprehensive inventory
    console.log('📋 COMPREHENSIVE ASSET INVENTORY');
    console.log('=' .repeat(50));

    // Summary statistics
    console.log('\n📊 SUMMARY STATISTICS:');
    console.log(`Total Assets: ${resources.resources.length}`);
    console.log(`Images: ${assetInventory.images.length}`);
    console.log(`Videos: ${assetInventory.videos.length}`);
    console.log(`Other Files: ${assetInventory.raw.length}`);
    console.log(`Total Size: ${(assetInventory.totalSize / 1024 / 1024).toFixed(2)} MB`);

    // Folder structure
    console.log('\n📁 FOLDER STRUCTURE:');
    Object.keys(assetInventory.folderStructure).sort().forEach(folder => {
      const folderName = folder || '(root)';
      const fileCount = assetInventory.folderStructure[folder].length;
      console.log(`  ${folderName}/  (${fileCount} files)`);
      assetInventory.folderStructure[folder].forEach(file => {
        console.log(`    - ${file}`);
      });
    });

    // Format distribution
    console.log('\n📄 FORMAT DISTRIBUTION:');
    Object.entries(assetInventory.formats)
      .sort((a, b) => b[1] - a[1])
      .forEach(([format, count]) => {
        console.log(`  ${format.toUpperCase()}: ${count} files`);
      });

    // Common dimensions for images
    if (Object.keys(assetInventory.dimensions).length > 0) {
      console.log('\n📐 IMAGE DIMENSIONS:');
      Object.entries(assetInventory.dimensions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10) // Top 10 dimensions
        .forEach(([dimension, count]) => {
          console.log(`  ${dimension}: ${count} images`);
        });
    }

    // Detailed asset list
    console.log('\n📝 DETAILED ASSET LIST:');
    console.log('-'.repeat(50));

    if (assetInventory.images.length > 0) {
      console.log('\n🖼️  IMAGES:');
      assetInventory.images.forEach((asset, index) => {
        console.log(`  ${index + 1}. ${asset.public_id}`);
        console.log(`     Format: ${asset.format.toUpperCase()}`);
        if (asset.width && asset.height) {
          console.log(`     Dimensions: ${asset.width}x${asset.height}px`);
        }
        console.log(`     Size: ${asset.size_mb} MB`);
        console.log(`     URL: ${asset.url}`);
        if (asset.tags.length > 0) {
          console.log(`     Tags: ${asset.tags.join(', ')}`);
        }
        console.log('');
      });
    }

    if (assetInventory.videos.length > 0) {
      console.log('\n🎥 VIDEOS:');
      assetInventory.videos.forEach((asset, index) => {
        console.log(`  ${index + 1}. ${asset.public_id}`);
        console.log(`     Format: ${asset.format.toUpperCase()}`);
        if (asset.width && asset.height) {
          console.log(`     Dimensions: ${asset.width}x${asset.height}px`);
        }
        console.log(`     Size: ${asset.size_mb} MB`);
        console.log(`     URL: ${asset.url}`);
        if (asset.tags.length > 0) {
          console.log(`     Tags: ${asset.tags.join(', ')}`);
        }
        console.log('');
      });
    }

    if (assetInventory.raw.length > 0) {
      console.log('\n📄 OTHER FILES:');
      assetInventory.raw.forEach((asset, index) => {
        console.log(`  ${index + 1}. ${asset.public_id}`);
        console.log(`     Format: ${asset.format.toUpperCase()}`);
        console.log(`     Type: ${asset.resource_type}`);
        console.log(`     Size: ${asset.size_mb} MB`);
        console.log(`     URL: ${asset.url}`);
        if (asset.tags.length > 0) {
          console.log(`     Tags: ${asset.tags.join(', ')}`);
        }
        console.log('');
      });
    }

    // Save inventory to JSON file for further processing
    const fs = require('fs');
    const inventoryFile = 'dmsite-asset-inventory.json';
    fs.writeFileSync(inventoryFile, JSON.stringify(assetInventory, null, 2));
    console.log(`\n💾 Full inventory saved to: ${inventoryFile}`);

    // Migration recommendations
    console.log('\n🔄 MIGRATION RECOMMENDATIONS:');
    console.log('-'.repeat(50));
    
    const recommendations = [];
    
    if (assetInventory.images.length > 0) {
      recommendations.push('• Create organized folder structure: /portfolio/, /services/, /team/, /blog/');
      recommendations.push('• Standardize naming convention: kebab-case with descriptive names');
      recommendations.push('• Add consistent tags for better searchability');
    }
    
    if (Object.keys(assetInventory.formats).length > 3) {
      recommendations.push('• Consider format optimization (WebP for images, MP4 for videos)');
    }
    
    if (assetInventory.totalSize > 50 * 1024 * 1024) { // 50MB
      recommendations.push('• Implement image compression and optimization');
      recommendations.push('• Use responsive image transformations');
    }
    
    recommendations.forEach(rec => console.log(rec));

    return assetInventory;

  } catch (error) {
    console.error('❌ Error analyzing dmsite folder:', error.message);
    if (error.http_code) {
      console.error(`HTTP Code: ${error.http_code}`);
    }
  }
}

// Run the analysis
if (require.main === module) {
  analyzeDmsiteFolder();
}

module.exports = { analyzeDmsiteFolder };