#!/usr/bin/env node

/**
 * Direct Gemini Image Generation Script
 * Replicates nano-banana MCP functionality for generating blog images
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const https = require('https');
const path = require('path');

// Gemini API configuration
const GEMINI_API_KEY = 'AIzaSyBJe5deyzERd1gqz-PvwYnEoAWhVCrgIVQ';

// Blog posts for image generation
const blogPosts = [
  {
    id: '1',
    title: 'How We Generated 2M+ Views for an MMA Fighter Using AI-Driven Content Strategy',
    slug: 'bruce-leeroy-case-study',
    prompt: 'Professional MMA fighter in intense training pose hitting heavy bag, modern gym with dramatic cinematic lighting, holographic social media metrics showing "2M+ VIEWS" floating around, viral dashboard elements, upward trending charts, blue and gray gradient background with gold accents, tech grid pattern overlay, clean space at top for text overlay, professional digital marketing aesthetic, landscape 16:9 format, high resolution'
  },
  {
    id: '2',
    title: 'From Startup to $100K Revenue: The Desjardins Brands Digital Transformation',
    slug: 'desjardins-transformation', 
    prompt: 'Elegant luxury food products and gourmet ingredients arranged artistically, sophisticated brand packaging, digital transformation elements like growth charts and revenue graphs floating above, premium gold and dark color scheme, modern minimalist design, professional lighting, clean space for text overlay, 16:9 landscape format'
  },
  {
    id: '3',
    title: 'The Complete Guide to Professional Podcast Production in 2024',
    slug: 'podcast-production-guide',
    prompt: 'Modern podcast studio setup with professional microphones, mixing console, acoustic panels, warm ambient lighting, floating audio waveforms and production graphics, sleek professional equipment, dark and gold color scheme, cinematic lighting, clean space for text overlay, 16:9 landscape format'
  },
  {
    id: '4',
    title: 'Why Traditional Wellness Businesses Need Modern Marketing: Master Lu\'s Success Story',
    slug: 'wellness-marketing',
    prompt: 'Serene wellness center with traditional elements like zen stones and bamboo, seamlessly integrated with modern digital marketing graphics, holistic health symbols meeting tech UI elements, calming earth tones with modern blue accents, balanced composition, professional lighting, clean space for text overlay, 16:9 landscape format'
  },
  {
    id: '5',
    title: 'Building Community Through Podcasting: The Community Curescast Approach',
    slug: 'community-podcast-strategy',
    prompt: 'Diverse group of people connected through podcast listening, community building visualization with interconnected network lines, warm community colors, modern podcast equipment in background, inclusive and welcoming atmosphere, professional design, clean space for text overlay, 16:9 landscape format'
  },
  {
    id: '6',
    title: 'Real Estate Marketing Revolution: How E-District Increased Revenue by 120%',
    slug: 'e-district-success',
    prompt: 'Modern commercial property building with sleek architecture, digital billboard displays, revenue growth charts overlaid on building facade, professional real estate marketing aesthetic, urban cityscape background, blue and gray color scheme, professional lighting, clean space for text overlay, 16:9 landscape format'
  },
  {
    id: '7',
    title: 'Fashion E-commerce Launch Strategy: Psyched Out Clothing\'s $15K First Month',
    slug: 'fashion-ecommerce-launch',
    prompt: 'Stylish fashion clothing items arranged artistically, e-commerce elements like shopping carts and sales metrics, modern fashion photography aesthetic, trendy color palette, floating UI elements showing sales growth, professional product photography lighting, clean space for text overlay, 16:9 landscape format'
  },
  {
    id: '8',
    title: 'The Power of High-Profile Guests: BF4Real Podcast\'s Growth Strategy',
    slug: 'high-profile-podcast-guests',
    prompt: 'Premium podcast interview setup with multiple professional microphones, celebrity-quality lighting setup, VIP lounge aesthetic, floating social media follower counts and engagement metrics, luxury podcast studio environment, professional cinematic lighting, clean space for text overlay, 16:9 landscape format'
  },
  {
    id: '9',
    title: '12 Years of Digital Marketing Evolution: What We\'ve Learned Since 2012',
    slug: 'digital-marketing-evolution',
    prompt: 'Timeline visualization showing digital marketing evolution from 2012 to 2024, vintage social media icons transforming into modern AI and tech elements, growth trajectory visualization, professional infographic style, blue and gold color scheme, clean modern design, clean space for text overlay, 16:9 landscape format'
  },
  {
    id: '10',
    title: 'Behind the Scenes: Our North Salt Lake Studio Setup and Why Location Matters',
    slug: 'studio-behind-scenes',
    prompt: 'Behind-the-scenes view of professional media studio, high-end video and audio equipment, studio lighting rigs, clean modern studio design, Utah mountain landscape visible through window, professional studio aesthetic, warm lighting, clean space for text overlay, 16:9 landscape format'
  }
];

/**
 * Initialize Gemini AI
 */
async function initializeGemini() {
  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  } catch (error) {
    console.error('❌ Failed to initialize Gemini AI:', error.message);
    throw error;
  }
}

/**
 * Generate image using Gemini (if supported) or provide instructions
 */
async function generateImage(prompt, filename) {
  console.log(`🎨 Generating image: ${filename}`);
  console.log(`📝 Prompt: ${prompt}`);
  
  // Note: Gemini 1.5 Flash primarily does text generation
  // For actual image generation, we'd need Imagen or similar
  
  console.log('⚠️  Note: Gemini 1.5 Flash is primarily a text model.');
  console.log('For image generation, you would need:');
  console.log('1. Google\'s Imagen API (separate service)');
  console.log('2. Vertex AI Image Generation');
  console.log('3. Alternative: Use the prompt with other image generators');
  
  return {
    success: false,
    prompt: prompt,
    filename: filename,
    message: 'Prompt ready for image generation service'
  };
}

/**
 * Generate all blog images
 */
async function generateAllImages() {
  console.log('🚀 Starting nano-banana style image generation...');
  
  const outputDir = path.join(__dirname, 'nano-banana-outputs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create prompt files for each image
  console.log('\n📝 Creating optimized prompts for image generation...');
  
  const promptsFile = path.join(outputDir, 'blog-image-prompts.json');
  const promptData = {
    generated_at: new Date().toISOString(),
    total_images: blogPosts.length,
    images: []
  };

  for (const post of blogPosts) {
    try {
      const result = await generateImage(post.prompt, post.slug);
      
      promptData.images.push({
        id: post.id,
        title: post.title,
        slug: post.slug,
        filename: `${post.slug}.jpg`,
        prompt: post.prompt,
        status: 'ready_for_generation',
        cloudinary_url: `https://res.cloudinary.com/dvcvxhzmt/image/upload/f_auto,q_auto,w_1200,h_675,c_fill/blog/${post.slug}.jpg`,
        recommended_generators: [
          'DeepAI (https://deepai.org/machine-learning-model/text2img)',
          'Stability AI DreamStudio',
          'Midjourney',
          'DALL-E 3'
        ]
      });
      
      console.log(`✅ Prompt ready: ${post.slug}`);
      
    } catch (error) {
      console.error(`❌ Error processing ${post.title}:`, error.message);
    }
  }

  // Save prompts to JSON file
  fs.writeFileSync(promptsFile, JSON.stringify(promptData, null, 2));
  
  console.log(`\n🎉 Generated ${promptData.images.length} optimized prompts`);
  console.log(`📁 Prompts saved to: ${promptsFile}`);
  
  console.log('\n📋 Next Steps:');
  console.log('1. Use the prompts from the JSON file with any AI image generator');
  console.log('2. Save generated images with the specified filenames');
  console.log('3. Upload to Cloudinary using the provided URLs');
  console.log('4. Update blog.ts with the new image URLs');
  
  // Create HTML guide
  createHTMLGuide(promptData, outputDir);
}

/**
 * Create HTML guide for easy image generation
 */
function createHTMLGuide(promptData, outputDir) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Image Generation Guide - Disruptors Media</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        .image-card { border: 1px solid #ddd; margin: 20px 0; padding: 20px; border-radius: 8px; }
        .prompt { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .generators { display: flex; gap: 10px; margin: 10px 0; }
        .generator-btn { padding: 10px 15px; background: #007cba; color: white; text-decoration: none; border-radius: 5px; }
        .filename { font-family: monospace; background: #e8f4f8; padding: 5px; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>🎨 Blog Featured Images Generation Guide</h1>
    <p><strong>Generated:</strong> ${promptData.generated_at}</p>
    <p><strong>Total Images:</strong> ${promptData.total_images}</p>
    
    ${promptData.images.map(image => `
    <div class="image-card">
        <h3>${image.title}</h3>
        <p><strong>Filename:</strong> <span class="filename">${image.filename}</span></p>
        
        <h4>📝 Optimized Prompt:</h4>
        <div class="prompt">${image.prompt}</div>
        
        <h4>🎯 Quick Generate Links:</h4>
        <div class="generators">
            <a href="https://deepai.org/machine-learning-model/text2img" class="generator-btn" target="_blank">DeepAI (Free)</a>
            <a href="https://beta.dreamstudio.ai/" class="generator-btn" target="_blank">DreamStudio</a>
            <a href="https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev" class="generator-btn" target="_blank">FLUX.1 (Free)</a>
        </div>
        
        <h4>🌐 Cloudinary URL:</h4>
        <div class="prompt">${image.cloudinary_url}</div>
    </div>
    `).join('')}
    
    <div style="margin-top: 40px; padding: 20px; background: #e8f4f8; border-radius: 8px;">
        <h3>📋 Instructions:</h3>
        <ol>
            <li>Click any "Quick Generate" button above</li>
            <li>Copy and paste the prompt for each image</li>
            <li>Generate the image (1200x675px recommended)</li>
            <li>Save with the exact filename shown</li>
            <li>Upload to Cloudinary or use the provided URL structure</li>
        </ol>
    </div>
</body>
</html>`;

  const htmlFile = path.join(outputDir, 'blog-image-generation-guide.html');
  fs.writeFileSync(htmlFile, html);
  
  console.log(`📄 HTML guide created: ${htmlFile}`);
  console.log('💡 Open the HTML file in your browser for an easy generation workflow!');
}

// Install required package if not available
async function ensurePackage() {
  try {
    require('@google/generative-ai');
  } catch (error) {
    console.log('📦 Installing required package...');
    const { execSync } = require('child_process');
    execSync('npm install @google/generative-ai', { stdio: 'inherit' });
  }
}

// Run the script
if (require.main === module) {
  ensurePackage()
    .then(() => generateAllImages())
    .catch(console.error);
}

module.exports = { generateImage, generateAllImages };