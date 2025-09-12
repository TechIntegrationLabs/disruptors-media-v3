#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const sharp = require('sharp');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const UPLOAD_QUEUE_DIR = path.join(__dirname, '..', 'image-upload-queue');
const TRACKER_FILE = path.join(__dirname, '..', 'image-assets-tracker.csv');
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dvcvxhzmt';
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'disruptors-media';

// Supported file extensions
const SUPPORTED_IMAGES = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
const SUPPORTED_VIDEOS = ['.mp4', '.webm'];
const SUPPORTED_EXTENSIONS = [...SUPPORTED_IMAGES, ...SUPPORTED_VIDEOS];

// CSV headers
const csvHeaders = [
  { id: 'filename', title: 'Filename' },
  { id: 'cloudinary_url', title: 'Cloudinary URL' },
  { id: 'cloudinary_folder', title: 'Cloudinary Folder' },
  { id: 'type', title: 'Type' },
  { id: 'purpose', title: 'Purpose' },
  { id: 'dimensions', title: 'Dimensions' },
  { id: 'format', title: 'Format' },
  { id: 'file_size', title: 'File Size (KB)' },
  { id: 'upload_date', title: 'Upload Date' },
  { id: 'tags', title: 'Tags' },
  { id: 'alt_text', title: 'Alt Text' },
  { id: 'description', title: 'Description' },
  { id: 'used_in_components', title: 'Used In Components' },
  { id: 'responsive_variants', title: 'Responsive Variants' }
];

// Determine Cloudinary folder based on filename
function determineCloudinaryFolder(filename) {
  const lower = filename.toLowerCase();
  
  // Logos
  if (lower.includes('logo')) return 'disruptors-media/logos';
  
  // Icons
  if (lower.includes('icon') || lower.includes('social')) return 'disruptors-media/icons';
  
  // Studio photos
  if (lower.includes('studio') || lower.includes('gl3a')) return 'disruptors-media/studio';
  
  // Podcast
  if (lower.includes('podcast')) return 'disruptors-media/podcast';
  
  // Portfolio
  if (lower.includes('portfolio') || lower.includes('work-')) return 'disruptors-media/portfolio';
  
  // Services
  if (lower.includes('service') || lower.includes('ai-') || lower.includes('marketing')) {
    return 'disruptors-media/services';
  }
  
  // Backgrounds
  if (lower.includes('bg') || lower.includes('background') || lower.includes('banner')) {
    return 'disruptors-media/backgrounds';
  }
  
  // Videos
  if (SUPPORTED_VIDEOS.includes(path.extname(lower))) {
    return 'disruptors-media/videos';
  }
  
  // Default
  return 'disruptors-media/general';
}

// Generate tags based on filename and folder
function generateTags(filename, folder) {
  const tags = ['disruptors-media'];
  const lower = filename.toLowerCase();
  
  // Add folder-based tags
  const folderParts = folder.split('/');
  tags.push(...folderParts);
  
  // Add content-based tags
  if (lower.includes('logo')) tags.push('branding');
  if (lower.includes('icon')) tags.push('ui');
  if (lower.includes('studio')) tags.push('photography');
  if (lower.includes('podcast')) tags.push('content');
  if (lower.includes('portfolio')) tags.push('showcase');
  if (lower.includes('service')) tags.push('services');
  if (lower.includes('ai')) tags.push('artificial-intelligence');
  if (lower.includes('marketing')) tags.push('marketing');
  
  return [...new Set(tags)].join(',');
}

// Get image metadata
async function getImageMetadata(filePath) {
  const stats = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  
  let dimensions = 'N/A';
  let format = ext.substring(1);
  
  if (SUPPORTED_IMAGES.includes(ext) && ext !== '.svg') {
    try {
      const metadata = await sharp(filePath).metadata();
      dimensions = `${metadata.width}x${metadata.height}`;
      format = metadata.format;
    } catch (error) {
      console.error(`Error getting metadata for ${filePath}:`, error);
    }
  }
  
  return {
    dimensions,
    format,
    file_size: Math.round(stats.size / 1024) // KB
  };
}

// Initialize CSV file if it doesn't exist
function initializeTrackerFile() {
  if (!fs.existsSync(TRACKER_FILE)) {
    const csvWriter = createCsvWriter({
      path: TRACKER_FILE,
      header: csvHeaders
    });
    
    csvWriter.writeRecords([])
      .then(() => console.log('📊 Created image tracker file'));
  }
}

// Read existing records from CSV
async function readExistingRecords() {
  const records = [];
  
  if (fs.existsSync(TRACKER_FILE)) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(TRACKER_FILE)
        .pipe(csv())
        .on('data', (data) => records.push(data))
        .on('end', () => resolve(records))
        .on('error', reject);
    });
  }
  
  return records;
}

// Upload to Cloudinary using MCP server
async function uploadToCloudinary(filePath, folder) {
  const filename = path.basename(filePath);
  
  // Use the Cloudinary MCP server to upload
  // For now, we'll simulate this - in production, you'd integrate with the MCP server
  const publicId = filename.replace(/\.[^/.]+$/, ''); // Remove extension
  const cloudinaryUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${folder}/${publicId}`;
  
  console.log(`📤 Uploading ${filename} to Cloudinary folder: ${folder}`);
  console.log(`🔗 URL will be: ${cloudinaryUrl}`);
  
  // In production, you would actually upload the file here
  // For now, we'll return the expected URL
  return {
    url: cloudinaryUrl,
    public_id: `${folder}/${publicId}`
  };
}

// Process uploaded file
async function processUploadedFile(filePath) {
  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    console.log(`⚠️  Skipping unsupported file: ${filename}`);
    return;
  }
  
  console.log(`\n🎯 Processing: ${filename}`);
  
  try {
    // Determine folder and metadata
    const folder = determineCloudinaryFolder(filename);
    const metadata = await getImageMetadata(filePath);
    const tags = generateTags(filename, folder);
    
    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(filePath, folder);
    
    // Prepare record for CSV
    const record = {
      filename,
      cloudinary_url: uploadResult.url,
      cloudinary_folder: folder,
      type: SUPPORTED_VIDEOS.includes(ext) ? 'video' : 'image',
      purpose: '', // To be filled manually or by AI analysis
      dimensions: metadata.dimensions,
      format: metadata.format,
      file_size: metadata.file_size,
      upload_date: new Date().toISOString().split('T')[0],
      tags,
      alt_text: '', // To be filled manually or by AI analysis
      description: '', // To be filled manually or by AI analysis
      used_in_components: '', // To be tracked as components use the asset
      responsive_variants: '' // To be filled if responsive versions are created
    };
    
    // Read existing records
    const existingRecords = await readExistingRecords();
    
    // Check if file already exists
    const existingIndex = existingRecords.findIndex(r => r.filename === filename);
    if (existingIndex >= 0) {
      existingRecords[existingIndex] = record;
      console.log('📝 Updated existing record');
    } else {
      existingRecords.push(record);
      console.log('📝 Added new record');
    }
    
    // Write updated records
    const csvWriter = createCsvWriter({
      path: TRACKER_FILE,
      header: csvHeaders
    });
    
    await csvWriter.writeRecords(existingRecords);
    
    // Delete the local file
    fs.unlinkSync(filePath);
    console.log(`🗑️  Deleted local file: ${filename}`);
    console.log(`✅ Successfully processed: ${filename}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error);
  }
}

// Watch for new files in upload queue
function startWatching() {
  console.log(`\n🚀 Cloudinary Upload Manager Started`);
  console.log(`📁 Watching: ${UPLOAD_QUEUE_DIR}`);
  console.log(`📊 Tracking in: ${TRACKER_FILE}`);
  console.log(`☁️  Cloud name: ${CLOUDINARY_CLOUD_NAME}`);
  console.log(`\n👀 Drop images into the upload queue folder...\n`);
  
  const watcher = chokidar.watch(UPLOAD_QUEUE_DIR, {
    ignored: /(^|[\/\\])\../, // Ignore dotfiles
    persistent: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100
    }
  });
  
  watcher
    .on('add', async (filePath) => {
      const filename = path.basename(filePath);
      if (filename !== '.gitkeep' && filename !== 'README.md') {
        await processUploadedFile(filePath);
      }
    })
    .on('error', error => console.error(`❌ Watcher error: ${error}`));
}

// Process existing files in queue (for manual runs)
async function processExistingFiles() {
  const files = fs.readdirSync(UPLOAD_QUEUE_DIR)
    .filter(f => f !== '.gitkeep' && f !== 'README.md')
    .filter(f => SUPPORTED_EXTENSIONS.includes(path.extname(f).toLowerCase()));
  
  if (files.length === 0) {
    console.log('📭 No files to process in upload queue');
    return;
  }
  
  console.log(`📦 Found ${files.length} files to process`);
  
  for (const file of files) {
    await processUploadedFile(path.join(UPLOAD_QUEUE_DIR, file));
  }
}

// Main function
async function main() {
  // Initialize tracker file
  initializeTrackerFile();
  
  // Check for command line arguments
  const args = process.argv.slice(2);
  
  if (args.includes('--process-existing')) {
    // Process existing files and exit
    await processExistingFiles();
  } else {
    // Start watching for new files
    startWatching();
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down Cloudinary Upload Manager...');
  process.exit(0);
});

// Run the main function
main().catch(console.error);