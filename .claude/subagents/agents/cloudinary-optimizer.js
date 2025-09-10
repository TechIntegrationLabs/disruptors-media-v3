const BaseAgent = require('./base-agent');
const path = require('path');

class CloudinaryOptimizerAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.cloudinaryConfig = {
      cloudName: 'dvcvxhzmt',
      baseUrl: 'https://res.cloudinary.com/dvcvxhzmt/image/upload',
      defaultTransforms: 'f_auto,q_auto',
      assetCategories: {
        'photos/studio/': { defaultSize: 'w_1200,h_800', quality: 'q_auto:good' },
        'logos/': { defaultSize: 'w_400,h_300', quality: 'q_auto:best' },
        'backgrounds/': { defaultSize: 'w_1920,h_1080', quality: 'q_auto' },
        'gallery/': { defaultSize: 'w_800,h_600', quality: 'q_auto' },
        'team/': { defaultSize: 'w_400,h_400', quality: 'q_auto:good' }
      }
    };
    this.assetRegistry = new Map();
    this.optimizationReports = [];
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_created':
        case 'file_modified':
          await this.handleFileChange(context.filePath);
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.performFullOptimization();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute cloudinary optimizer agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load existing asset registry and documentation
    await this.loadAssetDocumentation();
    await this.buildAssetRegistry();
  }

  async loadAssetDocumentation() {
    try {
      // Read Cloudinary documentation
      if (await this.fileExists('CLOUDINARY_ASSET_MAPPING.md')) {
        const assetDoc = await this.read('CLOUDINARY_ASSET_MAPPING.md');
        this.parseAssetDocumentation(assetDoc);
      }
      
      if (await this.fileExists('docs/CLOUDINARY_ASSETS_DOCUMENTATION.md')) {
        const cloudinaryDoc = await this.read('docs/CLOUDINARY_ASSETS_DOCUMENTATION.md');
        this.parseCloudinaryDocumentation(cloudinaryDoc);
      }
      
      this.log('Asset documentation loaded');
    } catch (error) {
      this.error('Failed to load asset documentation', error);
    }
  }

  parseAssetDocumentation(content) {
    // Parse existing asset mappings from documentation
    const urlRegex = /https:\/\/res\.cloudinary\.com\/dvcvxhzmt\/image\/upload\/([^\\s)]+)/g;
    let match;
    
    while ((match = urlRegex.exec(content)) !== null) {
      const fullUrl = match[0];
      const transformPath = match[1];
      this.assetRegistry.set(fullUrl, {
        transforms: transformPath,
        documented: true,
        category: this.determineAssetCategory(transformPath)
      });
    }
  }

  parseCloudinaryDocumentation(content) {
    // Extract optimization patterns from documentation
    const patterns = {
      optimization: /f_auto,q_auto/g,
      responsive: /w_\d+,h_\d+/g,
      categories: /photos\/studio\/|logos\/|backgrounds\/|gallery\/|team\//g
    };
    
    // Store patterns for validation
    this.optimizationPatterns = patterns;
  }

  async buildAssetRegistry() {
    try {
      // Scan all React files for Cloudinary URLs
      const reactFiles = await this.grep('\\.tsx?$', {
        glob: 'src/**/*',
        outputMode: 'files_with_matches'
      });
      
      for (const filePath of reactFiles) {
        await this.scanFileForAssets(filePath);
      }
      
      this.log(`Built asset registry with ${this.assetRegistry.size} assets`);
    } catch (error) {
      this.error('Failed to build asset registry', error);
    }
  }

  async scanFileForAssets(filePath) {
    try {
      const content = await this.read(filePath);
      
      // Find Cloudinary URLs
      const cloudinaryRegex = /https:\/\/res\.cloudinary\.com\/dvcvxhzmt\/image\/upload\/([^\\s"'`]+)/g;
      let match;
      
      while ((match = cloudinaryRegex.exec(content)) !== null) {
        const fullUrl = match[0];
        const transformPath = match[1];
        
        if (!this.assetRegistry.has(fullUrl)) {
          this.assetRegistry.set(fullUrl, {
            transforms: transformPath,
            usedIn: [filePath],
            category: this.determineAssetCategory(transformPath),
            optimized: this.isOptimized(transformPath),
            responsive: this.isResponsive(transformPath)
          });
        } else {
          const existing = this.assetRegistry.get(fullUrl);
          if (!existing.usedIn.includes(filePath)) {
            existing.usedIn.push(filePath);
          }
        }
      }
      
      // Find stock image URLs (Unsplash, etc.)
      const stockRegex = /https:\/\/images\.unsplash\.com\/[^\\s"'`]+/g;
      while ((match = stockRegex.exec(content)) !== null) {
        const stockUrl = match[0];
        this.assetRegistry.set(stockUrl, {
          type: 'stock',
          usedIn: [filePath],
          needsOptimization: !stockUrl.includes('w=') || !stockUrl.includes('h=')
        });
      }
      
    } catch (error) {
      this.error(`Failed to scan file for assets: ${filePath}`, error);
    }
  }

  determineAssetCategory(transformPath) {
    for (const [category, config] of Object.entries(this.cloudinaryConfig.assetCategories)) {
      if (transformPath.includes(category)) {
        return category;
      }
    }
    return 'uncategorized';
  }

  isOptimized(transformPath) {
    return transformPath.includes('f_auto') && transformPath.includes('q_auto');
  }

  isResponsive(transformPath) {
    return transformPath.includes('w_') && transformPath.includes('h_');
  }

  async handleFileChange(filePath) {
    this.log(`Analyzing file for asset optimization: ${filePath}`);
    
    try {
      await this.scanFileForAssets(filePath);
      
      const content = await this.read(filePath);
      const optimizations = await this.analyzeAssetUsage(content, filePath);
      
      if (optimizations.length > 0) {
        await this.applyOptimizations(filePath, optimizations);
      }
      
    } catch (error) {
      this.error(`Failed to handle file change for ${filePath}`, error);
    }
  }

  async analyzeAssetUsage(content, filePath) {
    const optimizations = [];
    
    try {
      // Check for unoptimized Cloudinary URLs
      const unoptimizedRegex = /https:\/\/res\.cloudinary\.com\/dvcvxhzmt\/image\/upload\/(?!.*f_auto)([^\\s"'`]+)/g;
      let match;
      
      while ((match = unoptimizedRegex.exec(content)) !== null) {
        const originalUrl = match[0];
        const path = match[1];
        const optimizedUrl = this.generateOptimizedUrl(path);
        
        optimizations.push({
          type: 'add-optimization',
          original: originalUrl,
          optimized: optimizedUrl,
          reason: 'Missing f_auto,q_auto optimization'
        });
      }
      
      // Check for missing responsive sizing
      const nonResponsiveRegex = /https:\/\/res\.cloudinary\.com\/dvcvxhzmt\/image\/upload\/(?!.*w_\\d+)([^\\s"'`]+)/g;
      while ((match = nonResponsiveRegex.exec(content)) !== null) {
        const originalUrl = match[0];
        const path = match[1];
        const category = this.determineAssetCategory(path);
        
        if (category !== 'uncategorized') {
          const config = this.cloudinaryConfig.assetCategories[category];
          const responsiveUrl = this.addResponsiveSizing(originalUrl, config.defaultSize);
          
          optimizations.push({
            type: 'add-responsive',
            original: originalUrl,
            optimized: responsiveUrl,
            reason: `Missing responsive sizing for ${category}`
          });
        }
      }
      
      // Check for hardcoded stock images that could be replaced
      const stockRegex = /https:\/\/images\.unsplash\.com\/([^\\s"'`]+)/g;
      while ((match = stockRegex.exec(content)) !== null) {
        const stockUrl = match[0];
        if (!stockUrl.includes('w=') || !stockUrl.includes('h=')) {
          const optimizedStock = this.optimizeStockImage(stockUrl);
          
          optimizations.push({
            type: 'optimize-stock',
            original: stockUrl,
            optimized: optimizedStock,
            reason: 'Stock image needs size optimization'
          });
        }
      }
      
      // Suggest Cloudinary alternatives for stock images
      if (content.includes('unsplash.com') && filePath.includes('src/')) {
        optimizations.push({
          type: 'suggest-cloudinary',
          reason: 'Consider migrating stock images to Cloudinary for better performance',
          suggestion: 'Use Cloudinary-hosted alternatives for better caching and optimization'
        });
      }
      
    } catch (error) {
      this.error(`Failed to analyze asset usage in ${filePath}`, error);
    }
    
    return optimizations;
  }

  generateOptimizedUrl(path) {
    const basePath = path.replace(/^\/+/, '');
    return `${this.cloudinaryConfig.baseUrl}/${this.cloudinaryConfig.defaultTransforms}/${basePath}`;
  }

  addResponsiveSizing(url, sizing) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      const [base, path] = parts;
      const existingTransforms = path.split('/')[0];
      const imagePath = path.substring(existingTransforms.length + 1);
      
      const newTransforms = existingTransforms ? `${existingTransforms},${sizing}` : sizing;
      return `${base}/upload/${newTransforms}/${imagePath}`;
    }
    return url;
  }

  optimizeStockImage(stockUrl) {
    const url = new URL(stockUrl);
    url.searchParams.set('w', '800');
    url.searchParams.set('h', '600');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('crop', 'center');
    return url.toString();
  }

  async applyOptimizations(filePath, optimizations) {
    try {
      let content = await this.read(filePath);
      let applied = 0;
      
      for (const optimization of optimizations) {
        switch (optimization.type) {
          case 'add-optimization':
          case 'add-responsive':
          case 'optimize-stock':
            if (content.includes(optimization.original)) {
              content = content.replace(optimization.original, optimization.optimized);
              applied++;
              this.log(`Applied ${optimization.type}: ${optimization.reason}`);
            }
            break;
            
          case 'suggest-cloudinary':
            this.log(`Suggestion for ${filePath}: ${optimization.suggestion}`);
            break;
        }
      }
      
      if (applied > 0) {
        await this.write(filePath, content);
        this.log(`Applied ${applied} optimizations to ${filePath}`);
        
        // Track optimization for reporting
        this.optimizationReports.push({
          filePath,
          timestamp: new Date().toISOString(),
          optimizations: applied,
          details: optimizations
        });
      }
      
    } catch (error) {
      this.error(`Failed to apply optimizations to ${filePath}`, error);
    }
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'cloudinary':
        await this.optimizeCloudinaryUsage();
        break;
      case 'image':
        await this.auditImageUsage();
        break;
      case 'asset':
        await this.performAssetAudit();
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async optimizeCloudinaryUsage() {
    this.log('Optimizing Cloudinary usage across project');
    
    try {
      const optimizationCount = {};
      
      for (const [url, assetInfo] of this.assetRegistry) {
        if (url.includes('cloudinary.com') && assetInfo.usedIn) {
          for (const filePath of assetInfo.usedIn) {
            if (!optimizationCount[filePath]) {
              optimizationCount[filePath] = 0;
            }
            
            const content = await this.read(filePath);
            const optimizations = await this.analyzeAssetUsage(content, filePath);
            
            if (optimizations.length > 0) {
              await this.applyOptimizations(filePath, optimizations);
              optimizationCount[filePath] += optimizations.length;
            }
          }
        }
      }
      
      const totalFiles = Object.keys(optimizationCount).length;
      const totalOptimizations = Object.values(optimizationCount).reduce((a, b) => a + b, 0);
      
      this.log(`Cloudinary optimization complete: ${totalOptimizations} optimizations across ${totalFiles} files`);
      
    } catch (error) {
      this.error('Failed to optimize Cloudinary usage', error);
    }
  }

  async auditImageUsage() {
    this.log('Performing image usage audit');
    
    try {
      const auditReport = {
        totalAssets: this.assetRegistry.size,
        optimizedAssets: 0,
        unoptimizedAssets: 0,
        stockImages: 0,
        cloudinaryImages: 0,
        categories: {},
        recommendations: []
      };
      
      for (const [url, assetInfo] of this.assetRegistry) {
        if (assetInfo.type === 'stock') {
          auditReport.stockImages++;
          if (assetInfo.needsOptimization) {
            auditReport.recommendations.push(`Optimize stock image: ${url}`);
          }
        } else if (url.includes('cloudinary.com')) {
          auditReport.cloudinaryImages++;
          if (assetInfo.optimized) {
            auditReport.optimizedAssets++;
          } else {
            auditReport.unoptimizedAssets++;
            auditReport.recommendations.push(`Optimize Cloudinary image: ${url}`);
          }
          
          // Count by category
          if (!auditReport.categories[assetInfo.category]) {
            auditReport.categories[assetInfo.category] = 0;
          }
          auditReport.categories[assetInfo.category]++;
        }
      }
      
      // Generate additional recommendations
      if (auditReport.stockImages > auditReport.cloudinaryImages * 0.3) {
        auditReport.recommendations.push('Consider migrating more stock images to Cloudinary for better performance');
      }
      
      if (auditReport.unoptimizedAssets > auditReport.optimizedAssets * 0.1) {
        auditReport.recommendations.push('Significant number of unoptimized assets found - run full optimization');
      }
      
      // Save audit report
      const reportPath = '.claude/subagents/logs/image-audit-report.json';
      await this.write(reportPath, JSON.stringify(auditReport, null, 2));
      
      this.log(`Image audit complete. Report saved to ${reportPath}`);
      this.log(`Summary: ${auditReport.optimizedAssets}/${auditReport.totalAssets} assets optimized`);
      
    } catch (error) {
      this.error('Failed to perform image audit', error);
    }
  }

  async performAssetAudit() {
    this.log('Performing comprehensive asset audit');
    
    try {
      // Check for missing assets
      const missingAssets = await this.findMissingAssets();
      
      // Check for unused assets
      const unusedAssets = await this.findUnusedAssets();
      
      // Check for duplicate assets
      const duplicateAssets = await this.findDuplicateAssets();
      
      const auditReport = {
        timestamp: new Date().toISOString(),
        missingAssets,
        unusedAssets,
        duplicateAssets,
        optimizationReports: this.optimizationReports,
        recommendations: []
      };
      
      // Generate recommendations
      if (missingAssets.length > 0) {
        auditReport.recommendations.push(`${missingAssets.length} missing assets need attention`);
      }
      
      if (unusedAssets.length > 0) {
        auditReport.recommendations.push(`${unusedAssets.length} unused assets could be removed`);
      }
      
      if (duplicateAssets.length > 0) {
        auditReport.recommendations.push(`${duplicateAssets.length} duplicate assets found`);
      }
      
      // Save comprehensive audit report
      const reportPath = '.claude/subagents/logs/comprehensive-asset-audit.json';
      await this.write(reportPath, JSON.stringify(auditReport, null, 2));
      
      this.log(`Comprehensive asset audit complete. Report saved to ${reportPath}`);
      
    } catch (error) {
      this.error('Failed to perform asset audit', error);
    }
  }

  async findMissingAssets() {
    const missingAssets = [];
    
    try {
      // Check for broken image references
      const imageRefs = await this.grep('\\.(jpg|jpeg|png|webp|svg)', {
        glob: 'src/**/*.tsx',
        outputMode: 'content'
      });
      
      // This would need more sophisticated checking
      // For now, just return empty array
      
    } catch (error) {
      this.error('Failed to find missing assets', error);
    }
    
    return missingAssets;
  }

  async findUnusedAssets() {
    // This would check assets that exist but aren't referenced
    return [];
  }

  async findDuplicateAssets() {
    const duplicates = [];
    const seen = new Map();
    
    for (const [url, assetInfo] of this.assetRegistry) {
      // Extract base asset path without transforms
      let basePath = url;
      if (url.includes('cloudinary.com')) {
        const parts = url.split('/upload/');
        if (parts.length === 2) {
          const pathPart = parts[1];
          basePath = pathPart.split('/').slice(1).join('/'); // Remove transforms
        }
      }
      
      if (seen.has(basePath)) {
        duplicates.push({
          basePath,
          urls: [seen.get(basePath), url]
        });
      } else {
        seen.set(basePath, url);
      }
    }
    
    return duplicates;
  }

  async performFullOptimization() {
    this.log('Performing full asset optimization');
    
    try {
      // Rebuild asset registry
      await this.buildAssetRegistry();
      
      // Optimize all assets
      await this.optimizeCloudinaryUsage();
      
      // Generate performance report
      const performanceReport = await this.generatePerformanceReport();
      
      // Update asset documentation
      await this.updateAssetDocumentation();
      
      this.log('Full optimization complete');
      
    } catch (error) {
      this.error('Failed to perform full optimization', error);
    }
  }

  async generatePerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalAssets: this.assetRegistry.size,
      optimizationSummary: {
        optimized: 0,
        needsOptimization: 0,
        stock: 0
      },
      categoryBreakdown: {},
      recommendations: []
    };
    
    for (const [url, assetInfo] of this.assetRegistry) {
      if (assetInfo.type === 'stock') {
        report.optimizationSummary.stock++;
      } else if (assetInfo.optimized) {
        report.optimizationSummary.optimized++;
      } else {
        report.optimizationSummary.needsOptimization++;
      }
      
      if (assetInfo.category) {
        if (!report.categoryBreakdown[assetInfo.category]) {
          report.categoryBreakdown[assetInfo.category] = 0;
        }
        report.categoryBreakdown[assetInfo.category]++;
      }
    }
    
    // Calculate optimization percentage
    const optimizationPercentage = 
      (report.optimizationSummary.optimized / 
       (report.optimizationSummary.optimized + report.optimizationSummary.needsOptimization)) * 100;
    
    report.optimizationPercentage = optimizationPercentage;
    
    // Save performance report
    const reportPath = '.claude/subagents/logs/performance-report.json';
    await this.write(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  async updateAssetDocumentation() {
    try {
      // Update asset mapping documentation
      const mappingDoc = this.generateAssetMappingDoc();
      await this.write('CLOUDINARY_ASSET_MAPPING.md', mappingDoc);
      
      this.log('Asset documentation updated');
      
    } catch (error) {
      this.error('Failed to update asset documentation', error);
    }
  }

  generateAssetMappingDoc() {
    let doc = `# Cloudinary Asset Mapping\n\n`;
    doc += `Generated: ${new Date().toISOString()}\n\n`;
    doc += `Total Assets: ${this.assetRegistry.size}\n\n`;
    
    // Group by category
    const byCategory = {};
    for (const [url, assetInfo] of this.assetRegistry) {
      const category = assetInfo.category || 'uncategorized';
      if (!byCategory[category]) {
        byCategory[category] = [];
      }
      byCategory[category].push({ url, ...assetInfo });
    }
    
    for (const [category, assets] of Object.entries(byCategory)) {
      doc += `## ${category}\n\n`;
      
      for (const asset of assets) {
        doc += `- \`${asset.url}\`\n`;
        if (asset.usedIn && asset.usedIn.length > 0) {
          doc += `  - Used in: ${asset.usedIn.join(', ')}\n`;
        }
        if (asset.optimized !== undefined) {
          doc += `  - Optimized: ${asset.optimized ? '✅' : '❌'}\n`;
        }
        doc += '\n';
      }
    }
    
    return doc;
  }
}

module.exports = CloudinaryOptimizerAgent;