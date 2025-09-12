#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SUPPORTED_IMAGES = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
const SUPPORTED_VIDEOS = ['.mp4', '.webm', '.mov', '.avi'];
const SUPPORTED_EXTENSIONS = [...SUPPORTED_IMAGES, ...SUPPORTED_VIDEOS];

// Function to get file size in KB
function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

// Function to recursively find all media files
function findMediaFiles(dir, baseDir = dir) {
  let files = [];
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(findMediaFiles(fullPath, baseDir));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        files.push({
          name: item,
          path: fullPath,
          relativePath: relativePath,
          extension: ext,
          directory: path.dirname(relativePath),
          sizeKB: getFileSizeKB(fullPath),
          type: SUPPORTED_VIDEOS.includes(ext) ? 'video' : 'image'
        });
      }
    }
  }
  
  return files;
}

// Function to categorize files based on directory and name
function categorizeFile(file) {
  const dir = file.directory.toLowerCase();
  const name = file.name.toLowerCase();
  
  // Logos
  if (dir.includes('logo') || name.includes('logo') || name.includes('emboss')) {
    return 'logos';
  }
  
  // Icons
  if (dir.includes('icon') || name.includes('icon') || name.includes('play') || 
      name.includes('pause') || name.includes('mute') || name.includes('plus') ||
      name.includes('minus') || name.includes('arrow') || name.includes('fb') ||
      name.includes('youtube') || name.includes('twitter') || name.includes('insta') ||
      name.includes('favicon')) {
    return 'icons';
  }
  
  // Portfolio/Work
  if (dir.includes('portfolio') || name.includes('work-') || name.includes('case-study')) {
    return 'portfolio';
  }
  
  // Services
  if (dir.includes('service') || name.includes('service') || name.includes('hand-') ||
      name.includes('what-we-do') || name.includes('phone')) {
    return 'services';
  }
  
  // Backgrounds
  if (name.includes('bg') || name.includes('background') || name.includes('poster') ||
      name.includes('mobile-sec') || name.includes('main-bg') || name.includes('book-a-call')) {
    return 'backgrounds';
  }
  
  // Podcast
  if (name.includes('podcast') || name.includes('pd-') || name.includes('thumbnail')) {
    return 'podcast';
  }
  
  // Studio Photos (GL3A series)
  if (name.includes('gl3a') || name.includes('photo nov')) {
    return 'studio';
  }
  
  // Videos
  if (file.type === 'video') {
    return 'videos';
  }
  
  // Client assets
  if (name.includes('client-')) {
    return 'clients';
  }
  
  // Everything else
  return 'general';
}

// Main analysis function
function analyzeLocalAssets() {
  console.log('🔍 Analyzing Local Assets in Repository\n');
  
  // Find all media files
  const allFiles = findMediaFiles(PUBLIC_DIR);
  
  // Exclude fonts (SVG fonts)
  const mediaFiles = allFiles.filter(f => !f.relativePath.includes('fonts/'));
  
  console.log(`📊 Found ${mediaFiles.length} media files (excluding fonts)\n`);
  
  // Categorize files
  const categories = {};
  let totalSize = 0;
  
  mediaFiles.forEach(file => {
    const category = categorizeFile(file);
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(file);
    totalSize += file.sizeKB;
  });
  
  // Print categorized results
  console.log('📁 Files by Category:\n');
  
  Object.keys(categories).sort().forEach(category => {
    const files = categories[category];
    const categorySize = files.reduce((sum, f) => sum + f.sizeKB, 0);
    
    console.log(`**${category.toUpperCase()}** (${files.length} files, ${categorySize} KB):`);
    files.forEach(file => {
      console.log(`  - ${file.name} (${file.sizeKB} KB) - ${file.directory}`);
    });
    console.log('');
  });
  
  // Summary
  console.log('📈 Summary:');
  console.log(`Total files: ${mediaFiles.length}`);
  console.log(`Total size: ${totalSize} KB (${Math.round(totalSize/1024)} MB)`);
  console.log(`Images: ${mediaFiles.filter(f => f.type === 'image').length}`);
  console.log(`Videos: ${mediaFiles.filter(f => f.type === 'video').length}`);
  
  const formats = {};
  mediaFiles.forEach(file => {
    formats[file.extension] = (formats[file.extension] || 0) + 1;
  });
  
  console.log('\n📋 File formats:');
  Object.keys(formats).sort().forEach(format => {
    console.log(`  ${format}: ${formats[format]} files`);
  });
  
  // Return data for further processing
  return {
    files: mediaFiles,
    categories,
    totalSize,
    summary: {
      totalFiles: mediaFiles.length,
      totalSizeMB: Math.round(totalSize/1024),
      images: mediaFiles.filter(f => f.type === 'image').length,
      videos: mediaFiles.filter(f => f.type === 'video').length,
      formats
    }
  };
}

// Run analysis if called directly
if (require.main === module) {
  analyzeLocalAssets();
}

module.exports = { analyzeLocalAssets };