// AI Image Generation Service using OpenAI DALL-E API
// Automatically generates professional blog images based on content

class AIImageService {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.baseUrl = 'https://api.openai.com/v1';
    this.imageCache = new Map();
    this.cloudinaryCloudName = 'dvcvxhzmt'; // DM3 Cloudinary cloud name
  }

  // Generate hero image for blog post
  async generateHeroImage(title, excerpt, category = 'marketing') {
    try {
      const cacheKey = `hero_${title}_${category}`;
      if (this.imageCache.has(cacheKey)) {
        return this.imageCache.get(cacheKey);
      }

      const prompt = this.createHeroImagePrompt(title, excerpt, category);
      const imageUrl = await this.generateImage(prompt, 'hero');
      
      this.imageCache.set(cacheKey, imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error generating hero image:', error);
      return this.getFallbackImage('hero', category);
    }
  }

  // Generate section illustrations
  async generateSectionImage(heading, context, style = 'illustration') {
    try {
      const cacheKey = `section_${heading}_${style}`;
      if (this.imageCache.has(cacheKey)) {
        return this.imageCache.get(cacheKey);
      }

      const prompt = this.createSectionImagePrompt(heading, context, style);
      const imageUrl = await this.generateImage(prompt, 'section');
      
      this.imageCache.set(cacheKey, imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error generating section image:', error);
      return this.getFallbackImage('section', style);
    }
  }

  // Core image generation using OpenAI's DALL-E
  async generateImage(prompt, type = 'general') {
    if (!this.apiKey) {
      console.warn('OpenAI API key not configured. Using fallback images.');
      return this.getFallbackImage(type, 'default');
    }

    try {
      const response = await fetch(`${this.baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          size: this.getImageSize(type),
          quality: 'hd',
          style: 'natural',
          response_format: 'url',
          n: 1
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`OpenAI API Error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.data[0].url;
    } catch (error) {
      console.error('OpenAI API request failed:', error);
      return this.getFallbackImage(type, 'default');
    }
  }

  // Create optimized prompts for different image types
  createHeroImagePrompt(title, excerpt, category) {
    const styleGuide = this.getStyleGuide(category);
    
    return `Create a professional, high-quality hero image for a blog post titled "${title}". 
    
    Content context: ${excerpt}
    
    Style requirements:
    - ${styleGuide.style}
    - Clean, modern design suitable for Disruptors Media brand
    - ${styleGuide.colors}
    - Professional business aesthetic with gold accent touches
    - High contrast and readability
    - Abstract geometric elements or icons related to the topic
    - No text overlays (text will be added separately)
    - Modern, sophisticated design
    
    The image should convey: ${this.extractKeyThemes(title, excerpt)}`;
  }

  createSectionImagePrompt(heading, context, style) {
    return `Create a clean, modern illustration for a blog section titled "${heading}".
    
    Context: ${context}
    Style: ${style === 'illustration' ? 'Clean vector-style illustration' : 'Modern geometric design'}
    
    Requirements:
    - Professional Disruptors Media brand aesthetic
    - Clean, minimalist design
    - Color palette: charcoal (#222222), cream (#FAFAFA), gold (#FFD700) accents
    - Suitable for embedding within blog content
    - Abstract representation of the concept
    - No text or labels needed
    - High-quality, scalable style`;
  }

  // Extract key themes from content for better image generation
  extractKeyThemes(title, excerpt) {
    const keywords = [...title.toLowerCase().split(' '), ...excerpt.toLowerCase().split(' ')]
      .filter(word => word.length > 3)
      .filter(word => !['that', 'with', 'this', 'they', 'were', 'been', 'have', 'their', 'would', 'there', 'could'].includes(word))
      .slice(0, 5);

    const themes = {
      'marketing': 'engagement, branding, audience, communication, strategy',
      'technology': 'digital transformation, connectivity, automation, innovation',
      'business': 'growth, success, strategy, leadership, development',
      'design': 'creativity, aesthetics, user experience, visual appeal',
      'ai': 'artificial intelligence, automation, machine learning, future tech',
      'content': 'storytelling, creation, media, publishing, communication'
    };

    // Determine primary theme
    for (const [theme, concepts] of Object.entries(themes)) {
      if (keywords.some(keyword => concepts.includes(keyword) || title.toLowerCase().includes(theme))) {
        return concepts;
      }
    }

    return keywords.join(', ');
  }

  // Style guides for different content categories (DM3 brand aligned)
  getStyleGuide(category) {
    const styles = {
      'marketing': {
        style: 'Dynamic marketing visuals with creative and engaging elements',
        colors: 'Disruptors Media brand colors: charcoal (#222222), cream (#FAFAFA), gold (#FFD700) accents'
      },
      'technology': {
        style: 'Modern tech aesthetic with clean lines and digital elements',
        colors: 'Tech-inspired palette with DM3 brand colors and blue accents'
      },
      'business': {
        style: 'Professional corporate design with sophisticated elements',
        colors: 'Corporate DM3 palette: charcoal, cream, gold with professional accents'
      },
      'design': {
        style: 'Creative and artistic with design-focused elements',
        colors: 'Designer color palette with DM3 brand colors and creative accents'
      },
      'ai': {
        style: 'Futuristic AI and technology aesthetic',
        colors: 'AI-themed colors with DM3 brand base and tech accents'
      },
      'content': {
        style: 'Content creation and media focused visuals',
        colors: 'Media-friendly palette with DM3 brand colors and creative accents'
      },
      'default': {
        style: 'Clean, professional Disruptors Media aesthetic',
        colors: 'DM3 brand colors: charcoal (#222222), cream (#FAFAFA), gold (#FFD700)'
      }
    };

    return styles[category.toLowerCase()] || styles.default;
  }

  // Determine optimal image size based on usage
  getImageSize(type) {
    const sizes = {
      'hero': '1792x1024',     // Blog hero images
      'section': '1024x1024',   // Section illustrations
      'thumbnail': '512x512',   // Blog thumbnails
      'general': '1024x1024'
    };
    return sizes[type] || sizes.general;
  }

  // Fallback images using Cloudinary (DM3 specific)
  getFallbackImage(type, category) {
    const cloudinaryBase = `https://res.cloudinary.com/${this.cloudinaryCloudName}/image/upload/f_auto,q_auto`;
    
    const fallbacks = {
      'hero': {
        'marketing': `${cloudinaryBase},w_1792,h_1024/v1/blog/fallbacks/marketing-hero`,
        'technology': `${cloudinaryBase},w_1792,h_1024/v1/blog/fallbacks/tech-hero`,
        'business': `${cloudinaryBase},w_1792,h_1024/v1/blog/fallbacks/business-hero`,
        'ai': `${cloudinaryBase},w_1792,h_1024/v1/blog/fallbacks/ai-hero`,
        'design': `${cloudinaryBase},w_1792,h_1024/v1/blog/fallbacks/design-hero`,
        'content': `${cloudinaryBase},w_1792,h_1024/v1/blog/fallbacks/content-hero`,
        'default': `${cloudinaryBase},w_1792,h_1024/v1/blog/default-hero`
      },
      'section': {
        'illustration': `${cloudinaryBase},w_1024,h_1024/v1/blog/fallbacks/section-illustration`,
        'diagram': `${cloudinaryBase},w_1024,h_1024/v1/blog/fallbacks/section-diagram`,
        'default': `${cloudinaryBase},w_1024,h_1024/v1/blog/fallbacks/section-default`
      },
      'thumbnail': {
        'default': `${cloudinaryBase},w_512,h_512/v1/blog/fallbacks/thumbnail-default`
      }
    };

    return fallbacks[type]?.[category] || fallbacks[type]?.default || `${cloudinaryBase},w_800,h_400/v1/blog/default-blog-image`;
  }

  // Clear image cache
  clearCache() {
    this.imageCache.clear();
  }

  // Get cache statistics
  getCacheStats() {
    return {
      size: this.imageCache.size,
      keys: Array.from(this.imageCache.keys())
    };
  }
}

export default new AIImageService();