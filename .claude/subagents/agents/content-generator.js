const BaseAgent = require('./base-agent');
const path = require('path');

class ContentGeneratorAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.contentConfig = {
      templates: {
        blogPost: {
          title: '[Topic] - [Number] [Action] for [Audience]',
          structure: ['introduction', 'main-points', 'conclusion', 'cta'],
          minWordCount: 800,
          seoKeywords: 3
        },
        caseStudy: {
          title: 'How [Client] Achieved [Result] with [Service]',
          structure: ['challenge', 'solution', 'results', 'testimonial'],
          minWordCount: 600,
          includeMetrics: true
        },
        serviceDescription: {
          structure: ['overview', 'benefits', 'process', 'pricing'],
          tone: 'professional',
          includeCallToAction: true
        }
      },
      aiPrompts: {
        blogPost: `Write a professional blog post about {topic} for {audience}. 
                   Include practical insights, actionable advice, and industry expertise.
                   Target length: {wordCount} words. SEO keywords: {keywords}.
                   Tone: {tone}. Include a compelling call-to-action.`,
        caseStudy: `Create a detailed case study about {client} achieving {result} using {service}.
                    Include specific challenges, solutions implemented, and quantifiable results.
                    Format for a marketing website. Include client testimonial.`,
        serviceDescription: `Write a compelling service description for {service}.
                            Focus on benefits, unique value proposition, and clear process.
                            Target audience: {audience}. Include pricing guidance and strong CTA.`
      },
      contentSources: {
        existing: ['src/data/blog.ts', 'src/data/portfolio.ts', 'src/data/services.ts'],
        generated: ['scripts/nano-banana-outputs/', 'generated-images/'],
        documentation: ['docs/', 'DISRUPTORS_MEDIA_BUSINESS_BRAIN.md']
      }
    };
    this.contentRegistry = new Map();
    this.generationQueue = [];
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_created':
        case 'file_modified':
          await this.handleContentFile(context.filePath);
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.performContentGeneration();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute content generator agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load existing content and business context
    await this.loadBusinessContext();
    await this.buildContentRegistry();
    await this.loadExistingScripts();
  }

  async loadBusinessContext() {
    try {
      // Load business brain document
      if (await this.fileExists('DISRUPTORS_MEDIA_BUSINESS_BRAIN.md')) {
        const businessBrain = await this.read('DISRUPTORS_MEDIA_BUSINESS_BRAIN.md');
        this.parseBusinessContext(businessBrain);
      }
      
      // Load blog system setup
      if (await this.fileExists('BLOG_SYSTEM_SETUP.md')) {
        const blogSetup = await this.read('BLOG_SYSTEM_SETUP.md');
        this.parseBlogSystemConfig(blogSetup);
      }
      
      this.log('Business context loaded');
    } catch (error) {
      this.error('Failed to load business context', error);
    }
  }

  parseBusinessContext(content) {
    // Extract business information
    this.businessContext = {
      services: this.extractServices(content),
      targetAudience: this.extractTargetAudience(content),
      valuePropositions: this.extractValuePropositions(content),
      keywords: this.extractKeywords(content),
      tone: this.extractTone(content),
      brandVoice: this.extractBrandVoice(content)
    };
  }

  extractServices(content) {
    const services = [];
    const serviceRegex = /#+ ([^\\n]*(?:marketing|AI|studio|content|digital|transformation)[^\\n]*)/gi;
    let match;
    
    while ((match = serviceRegex.exec(content)) !== null) {
      services.push(match[1].trim());
    }
    
    return services;
  }

  extractTargetAudience(content) {
    const audienceKeywords = [
      'businesses', 'startups', 'enterprises', 'SMBs', 'SMEs',
      'marketing teams', 'executives', 'decision makers'
    ];
    
    const audiences = [];
    for (const keyword of audienceKeywords) {
      if (content.toLowerCase().includes(keyword.toLowerCase())) {
        audiences.push(keyword);
      }
    }
    
    return audiences;
  }

  extractValuePropositions(content) {
    const propositions = [];
    
    // Look for bullet points or numbered lists that describe benefits
    const valueRegex = /[•\\-\\*]\\s*([^\\n]+(?:increase|improve|boost|enhance|optimize|transform)[^\\n]*)/gi;
    let match;
    
    while ((match = valueRegex.exec(content)) !== null) {
      propositions.push(match[1].trim());
    }
    
    return propositions;
  }

  extractKeywords(content) {
    const keywords = [
      'AI marketing', 'digital transformation', 'marketing automation',
      'content marketing', 'ROI optimization', 'data analytics',
      'brand strategy', 'customer experience', 'lead generation'
    ];
    
    return keywords.filter(keyword => 
      content.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  extractTone(content) {
    if (content.includes('professional') || content.includes('enterprise')) {
      return 'professional';
    } else if (content.includes('innovative') || content.includes('cutting-edge')) {
      return 'innovative';
    } else if (content.includes('friendly') || content.includes('approachable')) {
      return 'friendly';
    }
    return 'professional';
  }

  extractBrandVoice(content) {
    const voiceIndicators = {
      authoritative: ['expert', 'leader', 'proven', 'established'],
      innovative: ['cutting-edge', 'revolutionary', 'advanced', 'breakthrough'],
      supportive: ['guide', 'support', 'help', 'partner'],
      results-driven: ['ROI', 'results', 'performance', 'metrics']
    };
    
    for (const [voice, indicators] of Object.entries(voiceIndicators)) {
      if (indicators.some(indicator => content.toLowerCase().includes(indicator))) {
        return voice;
      }
    }
    
    return 'authoritative';
  }

  parseBlogSystemConfig(content) {
    // Extract blog configuration
    this.blogConfig = {
      enabled: content.includes('blog system'),
      categories: this.extractBlogCategories(content),
      postFormat: this.extractPostFormat(content)
    };
  }

  extractBlogCategories(content) {
    const categories = [];
    const categoryRegex = /category[:\\s]+([^\\n,]+)/gi;
    let match;
    
    while ((match = categoryRegex.exec(content)) !== null) {
      categories.push(match[1].trim());
    }
    
    return categories.length > 0 ? categories : [
      'AI Marketing', 'Digital Strategy', 'Case Studies', 'Industry Insights'
    ];
  }

  extractPostFormat(content) {
    if (content.includes('markdown')) {
      return 'markdown';
    } else if (content.includes('JSON')) {
      return 'json';
    }
    return 'typescript';
  }

  async buildContentRegistry() {
    try {
      // Scan existing content files
      const contentFiles = await this.glob('*.ts', 'src/data');
      
      for (const filePath of contentFiles) {
        await this.analyzeContentFile(filePath);
      }
      
      // Check for generated content
      if (await this.fileExists('scripts/nano-banana-outputs')) {
        const generatedFiles = await this.glob('*.md', 'scripts/nano-banana-outputs');
        for (const filePath of generatedFiles) {
          await this.analyzeGeneratedContent(filePath);
        }
      }
      
      this.log(`Built content registry with ${this.contentRegistry.size} content files`);
    } catch (error) {
      this.error('Failed to build content registry', error);
    }
  }

  async analyzeContentFile(filePath) {
    try {
      const content = await this.read(filePath);
      const analysis = {
        filePath,
        type: this.determineContentType(filePath),
        wordCount: this.countWords(content),
        hasMetadata: content.includes('title:') || content.includes('description:'),
        hasSEO: content.includes('seo') || content.includes('keywords'),
        lastModified: await this.getFileModificationTime(filePath),
        contentQuality: this.assessContentQuality(content),
        suggestions: []
      };
      
      // Generate content suggestions
      analysis.suggestions = await this.generateContentSuggestions(content, analysis);
      
      this.contentRegistry.set(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to analyze content file: ${filePath}`, error);
    }
  }

  determineContentType(filePath) {
    if (filePath.includes('blog')) return 'blog';
    if (filePath.includes('portfolio')) return 'portfolio';
    if (filePath.includes('services')) return 'services';
    if (filePath.includes('clients')) return 'clients';
    if (filePath.includes('team')) return 'team';
    return 'general';
  }

  countWords(content) {
    // Remove code blocks and count words
    const textContent = content
      .replace(/```[\\s\\S]*?```/g, '')
      .replace(/`[^`]*`/g, '')
      .replace(/\\[[^\\]]*\\]/g, '')
      .replace(/\\([^)]*\\)/g, '');
    
    return textContent.split(/\\s+/).filter(word => word.length > 0).length;
  }

  async getFileModificationTime(filePath) {
    try {
      const stats = await this.bash(`stat -c %Y "${filePath}"`, 'Get file modification time');
      return new Date(parseInt(stats.trim()) * 1000);
    } catch (error) {
      return new Date();
    }
  }

  assessContentQuality(content) {
    let score = 0;
    const checks = {
      hasTitle: content.includes('title'),
      hasDescription: content.includes('description'),
      hasStructure: content.includes('##') || content.includes('###'),
      hasLinks: content.includes('http') || content.includes('['),
      hasCallToAction: /call.to.action|contact|learn more|get started/i.test(content),
      hasSEOElements: /seo|keywords|meta/i.test(content),
      minimumLength: this.countWords(content) >= 200
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score >= 6) return 'high';
    if (score >= 4) return 'medium';
    return 'low';
  }

  async generateContentSuggestions(content, analysis) {
    const suggestions = [];
    
    // SEO suggestions
    if (!analysis.hasSEO) {
      suggestions.push({
        type: 'seo',
        priority: 'high',
        message: 'Add SEO metadata (title, description, keywords)',
        implementation: 'Add meta fields to content structure'
      });
    }
    
    // Content length suggestions
    if (analysis.wordCount < 300 && analysis.type === 'blog') {
      suggestions.push({
        type: 'content-length',
        priority: 'medium',
        message: 'Blog post is too short for good SEO (< 300 words)',
        implementation: 'Expand content with more details, examples, or sections'
      });
    }
    
    // Structure suggestions
    if (!content.includes('##') && analysis.wordCount > 200) {
      suggestions.push({
        type: 'structure',
        priority: 'medium',
        message: 'Add headings and subheadings for better readability',
        implementation: 'Break content into sections with descriptive headings'
      });
    }
    
    // Call-to-action suggestions
    if (!content.toLowerCase().includes('contact') && !content.toLowerCase().includes('learn more')) {
      suggestions.push({
        type: 'cta',
        priority: 'medium',
        message: 'Add call-to-action to drive engagement',
        implementation: 'Include clear next steps for readers'
      });
    }
    
    // Image suggestions
    if (!content.includes('image') && !content.includes('![') && analysis.type === 'blog') {
      suggestions.push({
        type: 'media',
        priority: 'low',
        message: 'Consider adding images for visual appeal',
        implementation: 'Add relevant images or infographics'
      });
    }
    
    return suggestions;
  }

  async analyzeGeneratedContent(filePath) {
    try {
      const content = await this.read(filePath);
      const analysis = {
        filePath,
        type: 'generated',
        source: 'nano-banana',
        wordCount: this.countWords(content),
        contentQuality: this.assessContentQuality(content),
        needsReview: true,
        generatedDate: await this.getFileModificationTime(filePath)
      };
      
      this.contentRegistry.set(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to analyze generated content: ${filePath}`, error);
    }
  }

  async loadExistingScripts() {
    try {
      // Check for existing content generation scripts
      const scripts = [
        'generate-blog-images.js',
        'nano-banana-generate.js',
        'scripts/auto-commit-agent.js'
      ];
      
      this.availableScripts = {};
      
      for (const script of scripts) {
        if (await this.fileExists(script)) {
          this.availableScripts[script] = {
            exists: true,
            lastModified: await this.getFileModificationTime(script)
          };
        }
      }
      
      this.log(`Found ${Object.keys(this.availableScripts).length} content generation scripts`);
    } catch (error) {
      this.error('Failed to load existing scripts', error);
    }
  }

  async handleContentFile(filePath) {
    this.log(`Analyzing content file: ${filePath}`);
    
    try {
      await this.analyzeContentFile(filePath);
      const analysis = this.contentRegistry.get(filePath);
      
      if (!analysis) return;
      
      // Auto-improve content if needed
      if (analysis.contentQuality === 'low' || analysis.suggestions.length > 2) {
        await this.improveContent(filePath, analysis);
      }
      
      // Generate related content suggestions
      if (analysis.type === 'blog' && analysis.contentQuality === 'high') {
        await this.suggestRelatedContent(filePath, analysis);
      }
      
      // Update content index
      await this.updateContentIndex(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to handle content file ${filePath}`, error);
    }
  }

  async improveContent(filePath, analysis) {
    try {
      let content = await this.read(filePath);
      let modified = false;
      
      for (const suggestion of analysis.suggestions) {
        switch (suggestion.type) {
          case 'seo':
            if (suggestion.priority === 'high' && !content.includes('// SEO')) {
              // Add SEO comment placeholder
              content = `// SEO: Add title, description, keywords\\n${content}`;
              modified = true;
              this.log('Added SEO placeholder');
            }
            break;
            
          case 'structure':
            // Add basic structure if missing
            if (!content.includes('##') && analysis.wordCount > 200) {
              content = this.addBasicStructure(content);
              modified = true;
              this.log('Added basic content structure');
            }
            break;
            
          case 'cta':
            if (!content.toLowerCase().includes('contact')) {
              content += '\\n\\n// TODO: Add call-to-action section';
              modified = true;
              this.log('Added CTA placeholder');
            }
            break;
        }
      }
      
      if (modified) {
        await this.write(filePath, content);
        this.log(`Improved content in ${filePath}`);
      }
      
    } catch (error) {
      this.error(`Failed to improve content in ${filePath}`, error);
    }
  }

  addBasicStructure(content) {
    // Add basic structure to unstructured content
    const sections = content.split('\\n\\n');
    if (sections.length >= 3) {
      return `## Introduction\\n\\n${sections[0]}\\n\\n## Main Content\\n\\n${sections.slice(1, -1).join('\\n\\n')}\\n\\n## Conclusion\\n\\n${sections[sections.length - 1]}`;
    }
    return content;
  }

  async suggestRelatedContent(filePath, analysis) {
    try {
      const suggestions = [];
      
      // Analyze content for topic extraction
      const content = await this.read(filePath);
      const topics = this.extractTopics(content);
      
      // Suggest blog series
      if (topics.length > 0) {
        suggestions.push({
          type: 'blog-series',
          topic: topics[0],
          titles: this.generateBlogSeriesTitles(topics[0]),
          description: `Create a blog series about ${topics[0]}`
        });
      }
      
      // Suggest case studies
      if (content.includes('client') || content.includes('result')) {
        suggestions.push({
          type: 'case-study',
          description: 'Convert successful examples into detailed case studies',
          implementation: 'Extract specific metrics and create dedicated case study pages'
        });
      }
      
      // Suggest social media content
      suggestions.push({
        type: 'social-media',
        description: 'Create social media posts from blog content',
        implementation: 'Extract key points for LinkedIn posts and Twitter threads'
      });
      
      this.log(`Generated ${suggestions.length} content suggestions for ${filePath}`);
      
      // Save suggestions for later use
      const suggestionsPath = `.claude/subagents/logs/content-suggestions-${Date.now()}.json`;
      await this.write(suggestionsPath, JSON.stringify(suggestions, null, 2));
      
    } catch (error) {
      this.error(`Failed to suggest related content for ${filePath}`, error);
    }
  }

  extractTopics(content) {
    const topics = [];
    
    // Extract from headings
    const headingRegex = /#+\\s*([^\\n]+)/g;
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      topics.push(match[1].trim());
    }
    
    // Extract key phrases
    const keyPhrases = [
      'AI marketing', 'digital transformation', 'content strategy',
      'ROI optimization', 'automation', 'analytics', 'branding'
    ];
    
    for (const phrase of keyPhrases) {
      if (content.toLowerCase().includes(phrase.toLowerCase())) {
        topics.push(phrase);
      }
    }
    
    return [...new Set(topics)].slice(0, 5);
  }

  generateBlogSeriesTitles(topic) {
    const templates = [
      `The Complete Guide to ${topic}`,
      `${topic} Best Practices for 2024`,
      `Common ${topic} Mistakes to Avoid`,
      `Advanced ${topic} Strategies`,
      `${topic} Case Studies and Success Stories`
    ];
    
    return templates;
  }

  async updateContentIndex(filePath, analysis) {
    try {
      // Update content index for search and organization
      const indexPath = '.claude/subagents/logs/content-index.json';
      let contentIndex = {};
      
      if (await this.fileExists(indexPath)) {
        const indexContent = await this.read(indexPath);
        contentIndex = JSON.parse(indexContent);
      }
      
      contentIndex[filePath] = {
        type: analysis.type,
        wordCount: analysis.wordCount,
        quality: analysis.contentQuality,
        lastAnalyzed: new Date().toISOString(),
        topics: this.extractTopics(await this.read(filePath)),
        needsUpdate: analysis.suggestions.length > 0
      };
      
      await this.write(indexPath, JSON.stringify(contentIndex, null, 2));
      
    } catch (error) {
      this.error(`Failed to update content index for ${filePath}`, error);
    }
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'content':
        await this.generateContentSuggestions();
        break;
      case 'blog':
        await this.generateBlogContent();
        break;
      case 'generate':
        await this.performContentGeneration();
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async generateContentSuggestions() {
    this.log('Generating content suggestions based on business context');
    
    try {
      const suggestions = [];
      
      // Blog post suggestions
      if (this.businessContext.services) {
        for (const service of this.businessContext.services.slice(0, 3)) {
          suggestions.push({
            type: 'blog-post',
            title: `How ${service} Can Transform Your Business in 2024`,
            category: 'Service Spotlight',
            keywords: this.businessContext.keywords.slice(0, 3),
            estimatedWordCount: 1200
          });
        }
      }
      
      // Case study suggestions
      suggestions.push({
        type: 'case-study',
        title: 'Client Success Story: [Client Name] ROI Improvement',
        category: 'Case Studies',
        includeMetrics: true,
        estimatedWordCount: 800
      });
      
      // Industry insight suggestions
      suggestions.push({
        type: 'industry-insight',
        title: 'Marketing Technology Trends for 2024',
        category: 'Industry Insights',
        researchRequired: true,
        estimatedWordCount: 1000
      });
      
      // Save suggestions
      const suggestionsPath = '.claude/subagents/logs/content-generation-suggestions.json';
      await this.write(suggestionsPath, JSON.stringify(suggestions, null, 2));
      
      this.log(`Generated ${suggestions.length} content suggestions`);
      
    } catch (error) {
      this.error('Failed to generate content suggestions', error);
    }
  }

  async generateBlogContent() {
    this.log('Generating blog content using available templates');
    
    try {
      if (!this.businessContext) {
        this.log('Business context not loaded, skipping blog generation');
        return;
      }
      
      // Generate blog post based on business context
      const blogPost = await this.createBlogPost({
        topic: this.businessContext.services[0] || 'Digital Marketing',
        audience: this.businessContext.targetAudience[0] || 'businesses',
        tone: this.businessContext.tone || 'professional',
        keywords: this.businessContext.keywords.slice(0, 3)
      });
      
      // Save generated blog post
      const fileName = this.generateBlogFileName(blogPost.title);
      const blogPath = `scripts/nano-banana-outputs/blog-posts/${fileName}`;
      
      await this.write(blogPath, this.formatBlogPost(blogPost));
      
      this.log(`Generated blog post: ${blogPost.title}`);
      
      // Queue for review
      this.generationQueue.push({
        type: 'blog-post',
        filePath: blogPath,
        title: blogPost.title,
        needsReview: true,
        generatedAt: new Date().toISOString()
      });
      
    } catch (error) {
      this.error('Failed to generate blog content', error);
    }
  }

  async createBlogPost(params) {
    const { topic, audience, tone, keywords } = params;
    
    const blogPost = {
      title: `${topic}: A Complete Guide for ${audience}`,
      description: `Learn how ${topic} can benefit your business with expert insights and practical strategies.`,
      category: 'Strategy',
      keywords: keywords,
      content: this.generateBlogContent(topic, audience, tone),
      author: 'Disruptors Media Team',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: '8 min read',
      seo: {
        metaTitle: `${topic} Guide for ${audience} | Disruptors Media`,
        metaDescription: `Comprehensive ${topic} guide for ${audience}. Expert strategies and actionable insights.`,
        canonicalUrl: `/blog/${this.generateSlug(topic + ' guide for ' + audience)}`
      }
    };
    
    return blogPost;
  }

  generateBlogContent(topic, audience, tone) {
    return `# ${topic}: A Complete Guide for ${audience}

## Introduction

In today's competitive landscape, ${topic} has become essential for ${audience} looking to stay ahead. This comprehensive guide will walk you through everything you need to know about implementing effective ${topic} strategies.

## Why ${topic} Matters

${topic} offers numerous benefits for ${audience}:

- Increased efficiency and productivity
- Better ROI on marketing investments
- Enhanced customer experience
- Competitive advantage in your industry

## Key Strategies

### 1. Foundation Setup

Before diving into ${topic}, it's crucial to establish a solid foundation. This includes understanding your target audience, setting clear objectives, and choosing the right tools and platforms.

### 2. Implementation Best Practices

Successful ${topic} implementation requires careful planning and execution. Consider these best practices:

- Start with a pilot program
- Set measurable goals and KPIs
- Regularly monitor and optimize performance
- Stay updated with industry trends

### 3. Measuring Success

To ensure your ${topic} efforts are paying off, track these key metrics:

- Conversion rates
- Customer acquisition cost
- Return on investment
- Customer lifetime value

## Common Pitfalls to Avoid

Many ${audience} make these common mistakes when implementing ${topic}:

1. Lack of clear strategy
2. Insufficient budget allocation
3. Poor tool selection
4. Inadequate team training

## Getting Started

Ready to implement ${topic} for your business? Here's how to begin:

1. Assess your current situation
2. Define your goals and objectives
3. Research and select appropriate tools
4. Create an implementation timeline
5. Train your team

## Conclusion

${topic} represents a significant opportunity for ${audience} to improve their operations and achieve better results. By following the strategies outlined in this guide, you'll be well-positioned to succeed.

## Ready to Transform Your Business?

At Disruptors Media, we specialize in helping ${audience} implement effective ${topic} strategies. Contact us today to learn how we can help you achieve your goals.

[Contact Us](/contact) | [Learn More About Our Services](/services)`;
  }

  generateBlogFileName(title) {
    const slug = this.generateSlug(title);
    const date = new Date().toISOString().split('T')[0];
    return `${date}-${slug}.md`;
  }

  generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  formatBlogPost(blogPost) {
    return `---
title: "${blogPost.title}"
description: "${blogPost.description}"
category: "${blogPost.category}"
keywords: [${blogPost.keywords.map(k => `"${k}"`).join(', ')}]
author: "${blogPost.author}"
publishDate: "${blogPost.publishDate}"
readTime: "${blogPost.readTime}"
seo:
  metaTitle: "${blogPost.seo.metaTitle}"
  metaDescription: "${blogPost.seo.metaDescription}"
  canonicalUrl: "${blogPost.seo.canonicalUrl}"
---

${blogPost.content}`;
  }

  async performContentGeneration() {
    this.log('Performing comprehensive content generation');
    
    try {
      // Generate multiple content types
      await this.generateBlogContent();
      
      // Generate case study template
      await this.generateCaseStudyTemplate();
      
      // Generate service descriptions
      await this.generateServiceDescriptions();
      
      // Update content analytics
      await this.generateContentAnalytics();
      
      this.log('Content generation complete');
      
    } catch (error) {
      this.error('Failed to perform content generation', error);
    }
  }

  async generateCaseStudyTemplate() {
    const caseStudy = {
      title: 'Client Success Story Template',
      client: '[Client Name]',
      industry: '[Industry]',
      challenge: '[Describe the challenge the client was facing]',
      solution: '[Describe the solution you provided]',
      results: {
        metric1: '[Quantifiable result 1]',
        metric2: '[Quantifiable result 2]',
        metric3: '[Quantifiable result 3]'
      },
      testimonial: '[Client testimonial quote]',
      services: ['[Service 1]', '[Service 2]']
    };
    
    const templatePath = 'scripts/nano-banana-outputs/templates/case-study-template.json';
    await this.write(templatePath, JSON.stringify(caseStudy, null, 2));
    
    this.log('Generated case study template');
  }

  async generateServiceDescriptions() {
    if (!this.businessContext.services) return;
    
    for (const service of this.businessContext.services.slice(0, 3)) {
      const description = {
        name: service,
        overview: `Professional ${service} services designed to help businesses achieve their goals.`,
        benefits: [
          'Increased efficiency and productivity',
          'Better ROI on investments',
          'Enhanced customer experience',
          'Competitive advantage'
        ],
        process: [
          'Initial consultation and assessment',
          'Strategy development',
          'Implementation and optimization',
          'Ongoing monitoring and support'
        ],
        pricing: 'Contact us for custom pricing',
        cta: 'Ready to get started? Contact us today to discuss your needs.'
      };
      
      const descPath = `scripts/nano-banana-outputs/services/${this.generateSlug(service)}-description.json`;
      await this.write(descPath, JSON.stringify(description, null, 2));
    }
    
    this.log('Generated service descriptions');
  }

  async generateContentAnalytics() {
    const analytics = {
      timestamp: new Date().toISOString(),
      totalContent: this.contentRegistry.size,
      contentByType: {},
      qualityDistribution: { high: 0, medium: 0, low: 0 },
      averageWordCount: 0,
      contentGaps: [],
      recommendations: []
    };
    
    let totalWords = 0;
    
    for (const [filePath, analysis] of this.contentRegistry) {
      // Count by type
      analytics.contentByType[analysis.type] = (analytics.contentByType[analysis.type] || 0) + 1;
      
      // Count by quality
      analytics.qualityDistribution[analysis.contentQuality]++;
      
      // Sum word counts
      totalWords += analysis.wordCount;
    }
    
    analytics.averageWordCount = Math.round(totalWords / this.contentRegistry.size);
    
    // Identify content gaps
    const requiredContentTypes = ['blog', 'services', 'portfolio', 'about'];
    for (const type of requiredContentTypes) {
      if (!analytics.contentByType[type]) {
        analytics.contentGaps.push(type);
      }
    }
    
    // Generate recommendations
    if (analytics.qualityDistribution.low > analytics.qualityDistribution.high) {
      analytics.recommendations.push('Focus on improving content quality');
    }
    
    if (analytics.contentGaps.length > 0) {
      analytics.recommendations.push(`Create content for: ${analytics.contentGaps.join(', ')}`);
    }
    
    if (analytics.averageWordCount < 500) {
      analytics.recommendations.push('Increase average content length for better SEO');
    }
    
    // Save analytics
    const analyticsPath = '.claude/subagents/logs/content-analytics.json';
    await this.write(analyticsPath, JSON.stringify(analytics, null, 2));
    
    this.log(`Content analytics generated - ${analytics.totalContent} pieces analyzed`);
    
    return analytics;
  }
}

module.exports = ContentGeneratorAgent;