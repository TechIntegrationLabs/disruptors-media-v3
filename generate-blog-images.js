#!/usr/bin/env node

/**
 * Blog Image Generator using OpenAI DALL-E 3
 * Generates featured images for DM3 blog posts and uploads to Cloudinary
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Blog post data for image generation
const blogPosts = [
  {
    id: '1',
    title: 'How We Generated 2M+ Views for an MMA Fighter Using AI-Driven Content Strategy',
    slug: 'bruce-leeroy-case-study',
    prompt: 'Professional blog header image: Dynamic MMA fighter in intense training pose, modern gym setting with dramatic lighting, floating holographic social media UI elements showing viral metrics like "2M+ VIEWS", upward trending charts, blue and gray gradient background with subtle tech grid pattern, clean space at top for text overlay, cinematic lighting, professional digital marketing aesthetic, landscape 16:9 format'
  },
  {
    id: '2', 
    title: 'From Startup to $100K Revenue: The Desjardins Brands Digital Transformation',
    slug: 'desjardins-transformation',
    prompt: 'Professional blog header image: Elegant luxury food products and gourmet ingredients arranged artistically, sophisticated brand packaging, digital transformation elements like growth charts and revenue graphs floating above, premium gold and dark color scheme, modern minimalist design, professional lighting, landscape 16:9 format'
  },
  {
    id: '3',
    title: 'The Complete Guide to Professional Podcast Production in 2024',
    slug: 'podcast-production-guide',
    prompt: 'Professional blog header image: Modern podcast studio setup with professional microphones, mixing console, acoustic panels, warm ambient lighting, floating audio waveforms and production graphics, sleek professional equipment, dark and gold color scheme, cinematic lighting, landscape 16:9 format'
  },
  {
    id: '4',
    title: 'Why Traditional Wellness Businesses Need Modern Marketing: Master Lu\'s Success Story',
    slug: 'wellness-marketing',
    prompt: 'Professional blog header image: Serene wellness center with traditional elements like zen stones and bamboo, seamlessly integrated with modern digital marketing graphics, holistic health symbols meeting tech UI elements, calming earth tones with modern blue accents, balanced composition, professional lighting, landscape 16:9 format'
  },
  {
    id: '5',
    title: 'Building Community Through Podcasting: The Community Curescast Approach',
    slug: 'community-podcast-strategy', 
    prompt: 'Professional blog header image: Diverse group of people connected through podcast listening, community building visualization with interconnected network lines, warm community colors, modern podcast equipment in background, inclusive and welcoming atmosphere, professional design, landscape 16:9 format'
  },
  {
    id: '6',
    title: 'Real Estate Marketing Revolution: How E-District Increased Revenue by 120%',
    slug: 'e-district-success',
    prompt: 'Professional blog header image: Modern commercial property building with sleek architecture, digital billboard displays, revenue growth charts overlaid on building facade, professional real estate marketing aesthetic, urban cityscape background, blue and gray color scheme, professional lighting, landscape 16:9 format'
  },
  {
    id: '7',
    title: 'Fashion E-commerce Launch Strategy: Psyched Out Clothing\'s $15K First Month',
    slug: 'fashion-ecommerce-launch',
    prompt: 'Professional blog header image: Stylish fashion clothing items arranged artistically, e-commerce elements like shopping carts and sales metrics, modern fashion photography aesthetic, trendy color palette, floating UI elements showing sales growth, professional product photography lighting, landscape 16:9 format'
  },
  {
    id: '8',
    title: 'The Power of High-Profile Guests: BF4Real Podcast\'s Growth Strategy',
    slug: 'high-profile-podcast-guests',
    prompt: 'Professional blog header image: Premium podcast interview setup with multiple professional microphones, celebrity-quality lighting setup, VIP lounge aesthetic, floating social media follower counts and engagement metrics, luxury podcast studio environment, professional cinematic lighting, landscape 16:9 format'
  },
  {
    id: '9',
    title: '12 Years of Digital Marketing Evolution: What We\'ve Learned Since 2012',
    slug: 'digital-marketing-evolution',
    prompt: 'Professional blog header image: Timeline visualization showing digital marketing evolution from 2012 to 2024, vintage social media icons transforming into modern AI and tech elements, growth trajectory visualization, professional infographic style, blue and gold color scheme, clean modern design, landscape 16:9 format'
  },
  {
    id: '10',
    title: 'Behind the Scenes: Our North Salt Lake Studio Setup and Why Location Matters',
    slug: 'studio-behind-scenes',
    prompt: 'Professional blog header image: Behind-the-scenes view of professional media studio, high-end video and audio equipment, studio lighting rigs, clean modern studio design, Utah mountain landscape visible through window, professional studio aesthetic, warm lighting, landscape 16:9 format'
  }
];

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_MASTER || 'YOUR_API_KEY_HERE';

// Cloudinary configuration  
const CLOUDINARY_CONFIG = {
  cloud_name: 'dvcvxhzmt',
  api_key: process.env.CLOUDINARY_API_KEY || '935251962635945',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'CNppaSbbi3IevxjuRvg5-8CKCds'
};

/**
 * Generate image using OpenAI DALL-E 3
 */
async function generateImage(prompt, filename) {
  console.log(`🎨 Generating image: ${filename}`);
  
  const requestData = JSON.stringify({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    size: "1792x1024", // Landscape format for blog headers
    quality: "hd",
    style: "natural"
  });

  const options = {
    hostname: 'api.openai.com',
    port: 443,
    path: '/v1/images/generations',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestData)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.data && response.data[0] && response.data[0].url) {
            console.log(`✅ Generated: ${filename}`);
            resolve(response.data[0].url);
          } else {
            console.error(`❌ Error generating ${filename}:`, response);
            reject(new Error(`Failed to generate image: ${JSON.stringify(response)}`));
          }
        } catch (error) {
          console.error(`❌ Parse error for ${filename}:`, error);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error for ${filename}:`, error);
      reject(error);
    });

    req.write(requestData);
    req.end();
  });
}

/**
 * Download image from URL
 */
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`💾 Downloaded: ${path.basename(filepath)}`);
        resolve(filepath);
      });
      
      file.on('error', (error) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(error);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Main function to generate all blog images
 */
async function generateAllImages() {
  console.log('🚀 Starting blog image generation...');
  
  if (OPENAI_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
    process.exit(1);
  }

  // Create output directory
  const outputDir = path.join(__dirname, 'generated-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let successCount = 0;
  let errorCount = 0;

  for (const post of blogPosts) {
    try {
      console.log(`\n📝 Processing: ${post.title}`);
      
      // Generate image
      const imageUrl = await generateImage(post.prompt, post.slug);
      
      // Download image
      const filepath = path.join(outputDir, `${post.slug}.jpg`);
      await downloadImage(imageUrl, filepath);
      
      successCount++;
      
      // Add delay to respect rate limits
      console.log('⏳ Waiting 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Failed to process ${post.title}:`, error.message);
      errorCount++;
    }
  }

  console.log(`\n🎉 Generation complete!`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📁 Images saved to: ${outputDir}`);
  
  if (successCount > 0) {
    console.log('\n📋 Next steps:');
    console.log('1. Review generated images in the generated-images folder');
    console.log('2. Upload images to Cloudinary manually or use the Cloudinary MCP');
    console.log('3. Update the image URLs in your blog.ts data file');
  }
}

// Run the script
if (require.main === module) {
  generateAllImages().catch(console.error);
}

module.exports = { generateImage, downloadImage, blogPosts };