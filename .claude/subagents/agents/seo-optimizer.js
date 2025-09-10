const BaseAgent = require('./base-agent');
const path = require('path');

class SEOOptimizerAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.seoConfig = {
      meta: {
        titleLength: { min: 30, max: 60 },
        descriptionLength: { min: 120, max: 160 },
        keywordDensity: { min: 0.5, max: 3.0 }
      },
      structure: {
        headings: {
          h1: { required: true, max: 1 },
          h2: { min: 2, max: 6 },
          h3: { min: 0, max: 10 }
        },
        content: {
          minWordCount: 300,
          maxWordCount: 3000,
          readabilityScore: 60
        }
      },
      technical: {
        sitemap: { required: true, format: 'xml' },
        robots: { required: true },
        schema: { required: true, types: ['Organization', 'WebSite', 'Service'] },
        canonicalUrls: { required: true },
        hreflang: { required: false }
      },
      performance: {
        coreWebVitals: {
          FCP: 1.8, // First Contentful Paint (seconds)
          LCP: 2.5, // Largest Contentful Paint (seconds)
          CLS: 0.1, // Cumulative Layout Shift
          FID: 100  // First Input Delay (milliseconds)
        }
      }
    };
    this.seoRegistry = new Map();
    this.keywordRegistry = new Map();
    this.schemaRegistry = new Map();
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_created':
        case 'file_modified':
          await this.handleSEOFile(context.filePath);
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.performComprehensiveSEOAudit();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute SEO optimizer agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load SEO configuration and existing data
    await this.loadBusinessContext();
    await this.buildSEORegistry();
    await this.loadKeywordData();
  }

  async loadBusinessContext() {
    try {
      // Load business brain for SEO context
      if (await this.fileExists('DISRUPTORS_MEDIA_BUSINESS_BRAIN.md')) {
        const businessBrain = await this.read('DISRUPTORS_MEDIA_BUSINESS_BRAIN.md');
        this.businessContext = this.parseBusinessContext(businessBrain);
      }
      
      this.log('Business context loaded for SEO optimization');
    } catch (error) {
      this.error('Failed to load business context', error);
    }
  }

  parseBusinessContext(content) {
    return {
      primaryKeywords: this.extractPrimaryKeywords(content),
      services: this.extractServices(content),
      targetAudience: this.extractTargetAudience(content),
      businessName: this.extractBusinessName(content),
      location: this.extractLocation(content),
      industry: this.extractIndustry(content)
    };
  }

  extractPrimaryKeywords(content) {
    const keywords = [
      'AI marketing', 'digital transformation', 'marketing automation',
      'content marketing', 'ROI optimization', 'data analytics',
      'brand strategy', 'customer experience', 'lead generation',
      'marketing technology', 'conversion optimization'
    ];
    
    return keywords.filter(keyword => 
      content.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  extractServices(content) {
    const serviceKeywords = [
      'AI marketing', 'studio services', 'content production',
      'digital transformation', 'marketing automation', 'brand strategy'
    ];
    
    return serviceKeywords.filter(service => 
      content.toLowerCase().includes(service.toLowerCase())
    );
  }

  extractTargetAudience(content) {
    const audiences = [
      'small businesses', 'startups', 'enterprises', 'marketing teams',
      'business owners', 'marketing directors', 'executives'
    ];
    
    return audiences.filter(audience => 
      content.toLowerCase().includes(audience.toLowerCase())
    );
  }

  extractBusinessName(content) {
    if (content.includes('Disruptors Media')) {
      return 'Disruptors Media';
    }
    return 'Disruptors Media'; // Default
  }

  extractLocation(content) {
    // Extract location information for local SEO
    const locationRegex = /(\\b[A-Z][a-z]+,\\s*[A-Z]{2}\\b|\\b[A-Z][a-z]+\\s+[A-Z][a-z]+\\b)/g;
    const matches = content.match(locationRegex);
    return matches ? matches[0] : null;
  }

  extractIndustry(content) {
    const industries = [
      'marketing', 'advertising', 'digital marketing', 'technology',
      'consulting', 'media', 'creative services'
    ];
    
    return industries.find(industry => 
      content.toLowerCase().includes(industry.toLowerCase())
    ) || 'marketing';
  }

  async buildSEORegistry() {
    try {
      // Find pages and components with SEO potential
      const seoFiles = await this.grep('title|description|meta|SEO', {
        glob: 'src/**/*.tsx',
        outputMode: 'files_with_matches'
      });
      
      for (const filePath of seoFiles) {
        await this.analyzeSEOFile(filePath);
      }
      
      // Also check for existing SEO files
      const publicFiles = ['sitemap.xml', 'robots.txt', 'manifest.json'];
      for (const file of publicFiles) {
        if (await this.fileExists(`public/${file}`)) {
          await this.analyzeSEOFile(`public/${file}`);
        }
      }
      
      this.log(`Built SEO registry with ${this.seoRegistry.size} SEO-relevant files`);
    } catch (error) {
      this.error('Failed to build SEO registry', error);
    }
  }

  async analyzeSEOFile(filePath) {
    try {
      const content = await this.read(filePath);
      const analysis = {
        filePath,
        type: this.determineSEOFileType(filePath),
        seoElements: this.extractSEOElements(content),
        content: this.analyzeContent(content),
        technical: this.analyzeTechnicalSEO(content),
        issues: [],
        suggestions: []
      };
      
      // Detect SEO issues
      analysis.issues = await this.detectSEOIssues(content, analysis);
      
      // Generate SEO suggestions
      analysis.suggestions = await this.generateSEOSuggestions(content, analysis);
      
      this.seoRegistry.set(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to analyze SEO file: ${filePath}`, error);
    }
  }

  determineSEOFileType(filePath) {
    if (filePath.includes('pages/')) return 'page';
    if (filePath.includes('components/')) return 'component';
    if (filePath.includes('sitemap')) return 'sitemap';
    if (filePath.includes('robots')) return 'robots';
    if (filePath.includes('manifest')) return 'manifest';
    return 'other';
  }

  extractSEOElements(content) {
    const elements = {
      title: this.extractTitles(content),
      metaDescription: this.extractMetaDescriptions(content),
      headings: this.extractHeadings(content),
      images: this.extractImages(content),
      links: this.extractLinks(content),
      schema: this.extractSchemaMarkup(content)
    };
    
    return elements;
  }

  extractTitles(content) {
    const titles = [];
    
    // Extract title tags
    const titleRegex = /<title[^>]*>([^<]+)<\\/title>/gi;
    let match;
    
    while ((match = titleRegex.exec(content)) !== null) {
      titles.push({
        type: 'title-tag',
        content: match[1].trim(),
        length: match[1].trim().length
      });
    }
    
    // Extract SEO component titles
    const seoTitleRegex = /title=['"]([^'"]+)['"]/gi;
    while ((match = seoTitleRegex.exec(content)) !== null) {
      titles.push({
        type: 'seo-component',
        content: match[1].trim(),
        length: match[1].trim().length
      });
    }
    
    return titles;
  }

  extractMetaDescriptions(content) {
    const descriptions = [];
    
    // Extract meta description tags
    const metaRegex = /<meta[^>]*name=['"]description['"][^>]*content=['"]([^'"]+)['"]/gi;
    let match;
    
    while ((match = metaRegex.exec(content)) !== null) {
      descriptions.push({
        type: 'meta-tag',
        content: match[1].trim(),
        length: match[1].trim().length
      });
    }
    
    // Extract SEO component descriptions
    const seoDescRegex = /description=['"]([^'"]+)['"]/gi;
    while ((match = seoDescRegex.exec(content)) !== null) {
      descriptions.push({
        type: 'seo-component',
        content: match[1].trim(),
        length: match[1].trim().length
      });
    }
    
    return descriptions;
  }

  extractHeadings(content) {
    const headings = { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [] };
    
    for (let i = 1; i <= 6; i++) {
      const regex = new RegExp(`<h${i}[^>]*>([^<]+)</h${i}>`, 'gi');
      let match;
      
      while ((match = regex.exec(content)) !== null) {
        headings[`h${i}`].push({
          content: match[1].trim(),
          length: match[1].trim().length
        });
      }
    }
    
    return headings;
  }

  extractImages(content) {
    const images = [];
    const imgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*alt=['"]([^'"]*)['"]/gi;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      images.push({
        src: match[1],
        alt: match[2],
        hasAlt: match[2].length > 0,
        altLength: match[2].length
      });
    }
    
    return images;
  }

  extractLinks(content) {
    const links = [];
    const linkRegex = /<a[^>]*href=['"]([^'"]+)['"][^>]*>([^<]*)</a>/gi;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const href = match[1];
      const linkText = match[2].trim();
      
      links.push({
        href,
        text: linkText,
        isInternal: !href.startsWith('http') || href.includes(this.businessContext?.businessName?.toLowerCase()),
        isExternal: href.startsWith('http') && !href.includes(this.businessContext?.businessName?.toLowerCase()),
        hasText: linkText.length > 0,
        textLength: linkText.length
      });
    }
    
    return links;
  }

  extractSchemaMarkup(content) {
    const schemas = [];
    const schemaRegex = /<script[^>]*type=['"]application\\/ld\\+json['"][^>]*>([^<]+)<\\/script>/gi;
    let match;
    
    while ((match = schemaRegex.exec(content)) !== null) {
      try {
        const schemaData = JSON.parse(match[1]);
        schemas.push({
          type: schemaData['@type'],
          data: schemaData,
          valid: true
        });
      } catch (error) {
        schemas.push({
          type: 'invalid',
          data: match[1],
          valid: false,
          error: error.message
        });
      }
    }
    
    return schemas;
  }

  analyzeContent(content) {
    // Remove HTML tags and analyze text content
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\\s+/g, ' ').trim();
    const words = textContent.split(' ').filter(word => word.length > 0);
    
    return {
      wordCount: words.length,
      characterCount: textContent.length,
      readabilityScore: this.calculateReadabilityScore(textContent),
      keywordDensity: this.calculateKeywordDensity(textContent),
      avgWordsPerSentence: this.calculateAvgWordsPerSentence(textContent)
    };
  }

  calculateReadabilityScore(text) {
    // Simplified Flesch Reading Ease score
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\\s+/).filter(w => w.length > 0);
    const syllables = words.reduce((count, word) => count + this.countSyllables(word), 0);
    
    if (sentences.length === 0 || words.length === 0) return 0;
    
    const avgSentenceLength = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;
    
    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  countSyllables(word) {
    // Simple syllable counting algorithm
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    
    return matches ? matches.length : 1;
  }

  calculateKeywordDensity(text) {
    if (!this.businessContext?.primaryKeywords) return {};
    
    const density = {};
    const words = text.toLowerCase().split(/\\s+/);
    const totalWords = words.length;
    
    for (const keyword of this.businessContext.primaryKeywords) {
      const keywordWords = keyword.toLowerCase().split(' ');
      let count = 0;
      
      if (keywordWords.length === 1) {
        count = words.filter(word => word === keywordWords[0]).length;
      } else {
        // Multi-word keyword
        const keywordText = keyword.toLowerCase();
        const regex = new RegExp(`\\\\b${keywordText}\\\\b`, 'gi');
        const matches = text.toLowerCase().match(regex);
        count = matches ? matches.length : 0;
      }
      
      density[keyword] = totalWords > 0 ? (count / totalWords) * 100 : 0;
    }
    
    return density;
  }

  calculateAvgWordsPerSentence(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\\s+/).filter(w => w.length > 0);
    
    return sentences.length > 0 ? Math.round(words.length / sentences.length) : 0;
  }

  analyzeTechnicalSEO(content) {
    return {
      hasCanonical: content.includes('rel="canonical"'),
      hasViewport: content.includes('name="viewport"'),
      hasCharset: content.includes('charset='),
      hasOGTags: content.includes('property="og:'),
      hasTwitterCards: content.includes('name="twitter:'),
      hasStructuredData: content.includes('application/ld+json'),
      hasHreflang: content.includes('hreflang=')
    };
  }

  async detectSEOIssues(content, analysis) {
    const issues = [];
    
    // Title issues
    for (const title of analysis.seoElements.title) {
      if (title.length < this.seoConfig.meta.titleLength.min) {
        issues.push({
          type: 'title-too-short',
          severity: 'high',
          message: `Title is too short (${title.length} chars, min ${this.seoConfig.meta.titleLength.min})`,
          element: title.content
        });
      }
      
      if (title.length > this.seoConfig.meta.titleLength.max) {
        issues.push({
          type: 'title-too-long',
          severity: 'medium',
          message: `Title is too long (${title.length} chars, max ${this.seoConfig.meta.titleLength.max})`,
          element: title.content
        });
      }
    }
    
    // Meta description issues
    for (const desc of analysis.seoElements.metaDescription) {
      if (desc.length < this.seoConfig.meta.descriptionLength.min) {
        issues.push({
          type: 'description-too-short',
          severity: 'high',
          message: `Meta description is too short (${desc.length} chars, min ${this.seoConfig.meta.descriptionLength.min})`,
          element: desc.content
        });
      }
      
      if (desc.length > this.seoConfig.meta.descriptionLength.max) {
        issues.push({
          type: 'description-too-long',
          severity: 'medium',
          message: `Meta description is too long (${desc.length} chars, max ${this.seoConfig.meta.descriptionLength.max})`,
          element: desc.content
        });
      }
    }
    
    // Heading structure issues
    if (analysis.seoElements.headings.h1.length === 0) {
      issues.push({
        type: 'missing-h1',
        severity: 'high',
        message: 'Page is missing H1 heading',
        suggestion: 'Add a single H1 heading that describes the main topic'
      });
    }
    
    if (analysis.seoElements.headings.h1.length > 1) {
      issues.push({
        type: 'multiple-h1',
        severity: 'medium',
        message: `Page has ${analysis.seoElements.headings.h1.length} H1 headings (should be 1)`,
        suggestion: 'Use only one H1 heading per page'
      });
    }
    
    // Image optimization issues
    const imagesWithoutAlt = analysis.seoElements.images.filter(img => !img.hasAlt);
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        type: 'missing-alt-text',
        severity: 'medium',
        message: `${imagesWithoutAlt.length} images missing alt text`,
        suggestion: 'Add descriptive alt text to all images'
      });
    }
    
    // Content issues
    if (analysis.content.wordCount < this.seoConfig.structure.content.minWordCount) {
      issues.push({
        type: 'insufficient-content',
        severity: 'high',
        message: `Content is too short (${analysis.content.wordCount} words, min ${this.seoConfig.structure.content.minWordCount})`,
        suggestion: 'Add more comprehensive content'
      });
    }
    
    // Technical SEO issues
    if (!analysis.technical.hasCanonical) {
      issues.push({
        type: 'missing-canonical',
        severity: 'medium',
        message: 'Missing canonical URL',
        suggestion: 'Add canonical link tag'
      });
    }
    
    if (!analysis.technical.hasOGTags) {
      issues.push({
        type: 'missing-og-tags',
        severity: 'low',
        message: 'Missing Open Graph tags',
        suggestion: 'Add OG tags for social media optimization'
      });
    }
    
    return issues;
  }

  async generateSEOSuggestions(content, analysis) {
    const suggestions = [];
    
    // Keyword optimization suggestions
    if (this.businessContext?.primaryKeywords) {
      for (const [keyword, density] of Object.entries(analysis.content.keywordDensity)) {
        if (density < this.seoConfig.meta.keywordDensity.min) {
          suggestions.push({
            type: 'keyword-optimization',
            message: `Low keyword density for "${keyword}" (${density.toFixed(2)}%)`,
            suggestion: `Increase usage of "${keyword}" in content naturally`
          });
        }
        
        if (density > this.seoConfig.meta.keywordDensity.max) {
          suggestions.push({
            type: 'keyword-over-optimization',
            message: `High keyword density for "${keyword}" (${density.toFixed(2)}%)`,
            suggestion: `Reduce usage of "${keyword}" to avoid over-optimization`
          });
        }
      }
    }
    
    // Content structure suggestions
    if (analysis.seoElements.headings.h2.length < 2) {
      suggestions.push({
        type: 'heading-structure',
        message: 'Add more H2 headings for better content structure',
        suggestion: 'Break content into sections with descriptive H2 headings'
      });
    }
    
    // Internal linking suggestions
    const internalLinks = analysis.seoElements.links.filter(link => link.isInternal);
    if (internalLinks.length < 3) {
      suggestions.push({
        type: 'internal-linking',
        message: 'Add more internal links to improve site structure',
        suggestion: 'Link to relevant pages and services within your site'
      });
    }
    
    // Schema markup suggestions
    if (analysis.seoElements.schema.length === 0) {
      suggestions.push({
        type: 'schema-markup',
        message: 'Add structured data markup',
        suggestion: 'Implement JSON-LD schema for better search engine understanding'
      });
    }
    
    // Performance suggestions
    if (analysis.content.readabilityScore < this.seoConfig.structure.content.readabilityScore) {
      suggestions.push({
        type: 'readability',
        message: `Low readability score (${analysis.content.readabilityScore})`,
        suggestion: 'Simplify language and use shorter sentences'
      });
    }
    
    return suggestions;
  }

  async loadKeywordData() {
    try {
      // Load keyword research data if available
      const keywordPath = '.claude/subagents/logs/keyword-data.json';
      if (await this.fileExists(keywordPath)) {
        const keywordContent = await this.read(keywordPath);
        const keywordData = JSON.parse(keywordContent);
        
        for (const [keyword, data] of Object.entries(keywordData)) {
          this.keywordRegistry.set(keyword, data);
        }
      }
      
      this.log('Keyword data loaded');
    } catch (error) {
      this.error('Failed to load keyword data', error);
    }
  }

  async handleSEOFile(filePath) {
    this.log(`Analyzing SEO for file: ${filePath}`);
    
    try {
      await this.analyzeSEOFile(filePath);
      const analysis = this.seoRegistry.get(filePath);
      
      if (!analysis) return;
      
      // Auto-fix critical SEO issues
      const criticalIssues = analysis.issues.filter(issue => issue.severity === 'high');
      if (criticalIssues.length > 0) {
        await this.fixCriticalSEOIssues(filePath, criticalIssues);
      }
      
      // Generate SEO enhancements
      if (analysis.type === 'page') {
        await this.generateSEOEnhancements(filePath, analysis);
      }
      
      // Update SEO documentation
      await this.updateSEODocumentation(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to handle SEO file ${filePath}`, error);
    }
  }

  async fixCriticalSEOIssues(filePath, issues) {
    try {
      let content = await this.read(filePath);
      let modified = false;
      
      for (const issue of issues) {
        switch (issue.type) {
          case 'missing-h1':
            // Add H1 heading if missing
            if (!content.includes('<h1') && !content.includes('# ')) {
              const titleElement = this.extractPageTitle(content);
              if (titleElement) {
                const h1Element = `<h1 className="text-4xl font-bold text-gold mb-6">${titleElement}</h1>\\n`;
                content = this.insertAfterJSXStart(content, h1Element);
                modified = true;
                this.log('Added missing H1 heading');
              }
            }
            break;
            
          case 'missing-alt-text':
            // Add basic alt text to images without it
            content = content.replace(/<img([^>]*src=['"]([^'"]+)['"][^>]*)(?![^>]*alt=)/g, 
              '<img$1 alt="$2"');
            modified = true;
            this.log('Added basic alt text to images');
            break;
            
          case 'title-too-short':
            // Suggest title improvement (log only, don't auto-change)
            this.log(`Title needs improvement: "${issue.element}"`);
            break;
        }
      }
      
      if (modified) {
        await this.write(filePath, content);
        this.log(`Fixed ${issues.length} critical SEO issues in ${filePath}`);
      }
      
    } catch (error) {
      this.error(`Failed to fix critical SEO issues in ${filePath}`, error);
    }
  }

  extractPageTitle(content) {
    // Try to extract a suitable title from the content
    const titleMatch = content.match(/title=['"]([^'"]+)['"]/);
    if (titleMatch) return titleMatch[1];
    
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\\/h1>/);
    if (h1Match) return h1Match[1];
    
    return null;
  }

  insertAfterJSXStart(content, element) {
    // Find the start of JSX return and insert element
    const returnIndex = content.indexOf('return (');
    if (returnIndex !== -1) {
      const nextLine = content.indexOf('\\n', returnIndex);
      if (nextLine !== -1) {
        return content.substring(0, nextLine + 1) + '      ' + element + content.substring(nextLine + 1);
      }
    }
    return content;
  }

  async generateSEOEnhancements(filePath, analysis) {
    try {
      // Generate schema markup if missing
      if (analysis.seoElements.schema.length === 0) {
        const schemaMarkup = await this.generateSchemaMarkup(filePath, analysis);
        if (schemaMarkup) {
          await this.addSchemaMarkup(filePath, schemaMarkup);
        }
      }
      
      // Generate meta tags if missing
      await this.generateMetaTags(filePath, analysis);
      
      // Generate sitemap entry
      await this.updateSitemap(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to generate SEO enhancements for ${filePath}`, error);
    }
  }

  async generateSchemaMarkup(filePath, analysis) {
    const businessName = this.businessContext?.businessName || 'Disruptors Media';
    const services = this.businessContext?.services || [];
    
    // Generate appropriate schema based on page type
    if (filePath.includes('services/')) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': this.extractServiceName(filePath),
        'provider': {
          '@type': 'Organization',
          'name': businessName
        },
        'description': this.generateServiceDescription(filePath),
        'offers': {
          '@type': 'Offer',
          'availability': 'https://schema.org/InStock'
        }
      };
    } else if (filePath.includes('about')) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': businessName,
        'description': 'Professional marketing and digital transformation services',
        'url': 'https://disruptorsmedia.com',
        'industry': this.businessContext?.industry || 'Marketing',
        'foundingDate': '2020'
      };
    } else if (filePath.includes('contact')) {
      return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': 'Contact Us',
        'description': 'Get in touch with our marketing experts'
      };
    }
    
    return null;
  }

  extractServiceName(filePath) {
    const fileName = path.basename(filePath, path.extname(filePath));
    return fileName.replace(/([A-Z])/g, ' $1').trim();
  }

  generateServiceDescription(filePath) {
    const serviceName = this.extractServiceName(filePath);
    return `Professional ${serviceName.toLowerCase()} services to help your business grow and succeed.`;
  }

  async addSchemaMarkup(filePath, schema) {
    try {
      let content = await this.read(filePath);
      
      // Add schema markup to the document head or component
      const schemaScript = `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(${JSON.stringify(schema, null, 2)})
        }}
      />`;
      
      // Insert before closing head tag or at component end
      if (content.includes('</Head>')) {
        content = content.replace('</Head>', `  ${schemaScript}\\n</Head>`);
      } else {
        content = this.insertSchemaInComponent(content, schemaScript);
      }
      
      await this.write(filePath, content);
      this.log(`Added schema markup to ${filePath}`);
      
    } catch (error) {
      this.error(`Failed to add schema markup to ${filePath}`, error);
    }
  }

  insertSchemaInComponent(content, schemaScript) {
    // Find appropriate place to insert schema
    const returnIndex = content.lastIndexOf('return (');
    if (returnIndex !== -1) {
      const openParenIndex = content.indexOf('(', returnIndex);
      const nextLineIndex = content.indexOf('\\n', openParenIndex);
      if (nextLineIndex !== -1) {
        return content.substring(0, nextLineIndex + 1) + 
               '    <>' + schemaScript + '\\n' +
               content.substring(nextLineIndex + 1).replace(/\\);$/, '\\n    </>\\n  );');
      }
    }
    return content;
  }

  async generateMetaTags(filePath, analysis) {
    // Generate enhanced meta tags if current ones are insufficient
    const suggestions = {
      title: this.generateOptimizedTitle(filePath, analysis),
      description: this.generateOptimizedDescription(filePath, analysis),
      keywords: this.generateKeywords(filePath, analysis)
    };
    
    this.log(`Meta tag suggestions for ${filePath}:`);
    this.log(`  Title: ${suggestions.title}`);
    this.log(`  Description: ${suggestions.description}`);
    this.log(`  Keywords: ${suggestions.keywords.join(', ')}`);
  }

  generateOptimizedTitle(filePath, analysis) {
    const serviceName = this.extractServiceName(filePath);
    const businessName = this.businessContext?.businessName || 'Disruptors Media';
    
    if (filePath.includes('services/')) {
      return `${serviceName} Services | ${businessName}`;
    } else if (filePath.includes('about')) {
      return `About ${businessName} - Professional Marketing Services`;
    } else if (filePath.includes('contact')) {
      return `Contact ${businessName} - Get Your Free Marketing Consultation`;
    }
    
    return `${serviceName} | ${businessName}`;
  }

  generateOptimizedDescription(filePath, analysis) {
    const serviceName = this.extractServiceName(filePath);
    const businessName = this.businessContext?.businessName || 'Disruptors Media';
    
    if (filePath.includes('services/')) {
      return `Professional ${serviceName.toLowerCase()} services from ${businessName}. Transform your business with our expert marketing solutions. Get started today.`;
    } else if (filePath.includes('about')) {
      return `Learn about ${businessName}, a leading marketing agency specializing in AI-powered solutions and digital transformation for businesses.`;
    } else if (filePath.includes('contact')) {
      return `Contact ${businessName} for expert marketing consultation. Our team of professionals is ready to help transform your business. Free consultation available.`;
    }
    
    return `${serviceName} solutions from ${businessName}. Expert marketing services to grow your business.`;
  }

  generateKeywords(filePath, analysis) {
    const baseKeywords = this.businessContext?.primaryKeywords || [];
    const serviceName = this.extractServiceName(filePath);
    
    const pageKeywords = [
      serviceName.toLowerCase(),
      'marketing services',
      'digital marketing',
      'business growth'
    ];
    
    return [...baseKeywords, ...pageKeywords].slice(0, 10);
  }

  async updateSitemap(filePath, analysis) {
    try {
      // Update or create sitemap with page information
      const sitemapPath = 'public/sitemap.xml';
      let sitemap = '';
      
      if (await this.fileExists(sitemapPath)) {
        sitemap = await this.read(sitemapPath);
      } else {
        sitemap = this.createBaseSitemap();
      }
      
      // Add page to sitemap if not already present
      const pageUrl = this.generatePageUrl(filePath);
      if (!sitemap.includes(pageUrl)) {
        const sitemapEntry = this.generateSitemapEntry(pageUrl, analysis);
        sitemap = this.insertSitemapEntry(sitemap, sitemapEntry);
        
        await this.write(sitemapPath, sitemap);
        this.log(`Updated sitemap with ${pageUrl}`);
      }
      
    } catch (error) {
      this.error(`Failed to update sitemap for ${filePath}`, error);
    }
  }

  createBaseSitemap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
  }

  generatePageUrl(filePath) {
    const basePath = filePath.replace('src/pages/', '').replace('.tsx', '');
    return `https://disruptorsmedia.com/${basePath === 'index' ? '' : basePath}`;
  }

  generateSitemapEntry(url, analysis) {
    const lastmod = new Date().toISOString().split('T')[0];
    const priority = this.calculatePagePriority(url);
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }

  calculatePagePriority(url) {
    if (url.endsWith('disruptorsmedia.com/')) return '1.0';
    if (url.includes('/services/')) return '0.8';
    if (url.includes('/about') || url.includes('/contact')) return '0.7';
    return '0.6';
  }

  insertSitemapEntry(sitemap, entry) {
    return sitemap.replace('</urlset>', `${entry}\\n</urlset>`);
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'seo':
        await this.performComprehensiveSEOAudit();
        break;
      case 'meta':
        await this.auditMetaTags();
        break;
      case 'structured':
        await this.auditStructuredData();
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async auditMetaTags() {
    this.log('Auditing meta tags across all pages');
    
    try {
      let totalPages = 0;
      let pagesWithIssues = 0;
      
      for (const [filePath, analysis] of this.seoRegistry) {
        if (analysis.type === 'page') {
          totalPages++;
          
          const titleIssues = analysis.issues.filter(issue => 
            issue.type.includes('title'));
          const descIssues = analysis.issues.filter(issue => 
            issue.type.includes('description'));
          
          if (titleIssues.length > 0 || descIssues.length > 0) {
            pagesWithIssues++;
            this.log(`Meta issues in ${filePath}: ${titleIssues.length + descIssues.length} issues`);
          }
        }
      }
      
      this.log(`Meta audit complete: ${pagesWithIssues}/${totalPages} pages have meta tag issues`);
      
    } catch (error) {
      this.error('Failed to audit meta tags', error);
    }
  }

  async auditStructuredData() {
    this.log('Auditing structured data implementation');
    
    try {
      let pagesWithSchema = 0;
      let pagesWithoutSchema = 0;
      
      for (const [filePath, analysis] of this.seoRegistry) {
        if (analysis.type === 'page') {
          if (analysis.seoElements.schema.length > 0) {
            pagesWithSchema++;
          } else {
            pagesWithoutSchema++;
            this.log(`Missing schema: ${filePath}`);
          }
        }
      }
      
      this.log(`Schema audit: ${pagesWithSchema} pages with schema, ${pagesWithoutSchema} without`);
      
    } catch (error) {
      this.error('Failed to audit structured data', error);
    }
  }

  async performComprehensiveSEOAudit() {
    this.log('Performing comprehensive SEO audit');
    
    try {
      // Rebuild SEO registry
      await this.buildSEORegistry();
      
      const auditReport = {
        timestamp: new Date().toISOString(),
        summary: {
          totalPages: 0,
          pagesWithIssues: 0,
          criticalIssues: 0,
          averageScore: 0
        },
        technicalSEO: {
          hasSitemap: await this.fileExists('public/sitemap.xml'),
          hasRobots: await this.fileExists('public/robots.txt'),
          hasManifest: await this.fileExists('public/manifest.json')
        },
        pages: [],
        recommendations: []
      };
      
      // Analyze each page
      for (const [filePath, analysis] of this.seoRegistry) {
        if (analysis.type === 'page') {
          auditReport.summary.totalPages++;
          
          const pageScore = this.calculateSEOScore(analysis);
          auditReport.summary.averageScore += pageScore;
          
          if (analysis.issues.length > 0) {
            auditReport.summary.pagesWithIssues++;
          }
          
          auditReport.summary.criticalIssues += 
            analysis.issues.filter(issue => issue.severity === 'high').length;
          
          auditReport.pages.push({
            path: filePath,
            score: pageScore,
            issues: analysis.issues.length,
            suggestions: analysis.suggestions.length,
            wordCount: analysis.content.wordCount,
            readabilityScore: analysis.content.readabilityScore
          });
        }
      }
      
      // Calculate average score
      if (auditReport.summary.totalPages > 0) {
        auditReport.summary.averageScore = Math.round(
          auditReport.summary.averageScore / auditReport.summary.totalPages
        );
      }
      
      // Generate recommendations
      auditReport.recommendations = this.generateAuditRecommendations(auditReport);
      
      // Save audit report
      const reportPath = '.claude/subagents/logs/seo-audit-comprehensive.json';
      await this.write(reportPath, JSON.stringify(auditReport, null, 2));
      
      this.log(`SEO audit complete. Report saved to ${reportPath}`);
      this.log(`Summary: ${auditReport.summary.totalPages} pages, average score ${auditReport.summary.averageScore}/100`);
      
    } catch (error) {
      this.error('Failed to perform comprehensive SEO audit', error);
    }
  }

  calculateSEOScore(analysis) {
    let score = 100;
    
    // Deduct points for issues
    for (const issue of analysis.issues) {
      switch (issue.severity) {
        case 'high': score -= 15; break;
        case 'medium': score -= 10; break;
        case 'low': score -= 5; break;
      }
    }
    
    // Bonus points for good practices
    if (analysis.technical.hasCanonical) score += 5;
    if (analysis.technical.hasOGTags) score += 5;
    if (analysis.seoElements.schema.length > 0) score += 10;
    if (analysis.content.wordCount >= this.seoConfig.structure.content.minWordCount) score += 5;
    
    return Math.max(0, Math.min(100, score));
  }

  generateAuditRecommendations(auditReport) {
    const recommendations = [];
    
    if (auditReport.summary.criticalIssues > 0) {
      recommendations.push('Address critical SEO issues immediately (missing titles, descriptions, H1 tags)');
    }
    
    if (auditReport.summary.averageScore < 70) {
      recommendations.push('Overall SEO score is low - focus on content optimization and technical SEO');
    }
    
    if (!auditReport.technicalSEO.hasSitemap) {
      recommendations.push('Create XML sitemap for better search engine indexing');
    }
    
    if (!auditReport.technicalSEO.hasRobots) {
      recommendations.push('Add robots.txt file for search engine crawling guidance');
    }
    
    return recommendations;
  }

  async updateSEODocumentation(filePath, analysis) {
    try {
      // Update SEO status documentation
      const docPath = '.claude/subagents/logs/seo-status.json';
      let seoDoc = {
        lastUpdated: new Date().toISOString(),
        pages: {},
        overallHealth: 'unknown'
      };
      
      if (await this.fileExists(docPath)) {
        const existingDoc = await this.read(docPath);
        seoDoc = { ...JSON.parse(existingDoc), ...seoDoc };
      }
      
      seoDoc.pages[filePath] = {
        score: this.calculateSEOScore(analysis),
        issues: analysis.issues.length,
        criticalIssues: analysis.issues.filter(i => i.severity === 'high').length,
        lastAnalyzed: new Date().toISOString()
      };
      
      // Calculate overall health
      const scores = Object.values(seoDoc.pages).map(page => page.score);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      
      if (avgScore >= 80) seoDoc.overallHealth = 'excellent';
      else if (avgScore >= 70) seoDoc.overallHealth = 'good';
      else if (avgScore >= 60) seoDoc.overallHealth = 'fair';
      else seoDoc.overallHealth = 'poor';
      
      await this.write(docPath, JSON.stringify(seoDoc, null, 2));
      
    } catch (error) {
      this.error('Failed to update SEO documentation', error);
    }
  }
}

module.exports = SEOOptimizerAgent;