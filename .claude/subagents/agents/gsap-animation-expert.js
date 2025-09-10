const BaseAgent = require('./base-agent');
const path = require('path');

class GSAPAnimationExpertAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.animationPatterns = {
      timeline: {
        basic: 'gsap.timeline()',
        withProps: 'gsap.timeline({ repeat: -1, yoyo: true })',
        scrollTrigger: 'gsap.timeline({ scrollTrigger: { trigger: element } })'
      },
      transforms: {
        fade: { opacity: 0 },
        slideUp: { y: 50, opacity: 0 },
        slideDown: { y: -50, opacity: 0 },
        slideLeft: { x: 50, opacity: 0 },
        slideRight: { x: -50, opacity: 0 },
        scale: { scale: 0, opacity: 0 },
        rotate: { rotation: 180, opacity: 0 }
      },
      easings: {
        power1: 'power1.out',
        power2: 'power2.out',
        power3: 'power3.out',
        back: 'back.out(1.7)',
        elastic: 'elastic.out(1, 0.3)',
        bounce: 'bounce.out'
      },
      performance: {
        force3D: true,
        willChange: 'transform',
        transformOrigin: 'center center'
      }
    };
    this.animationRegistry = new Map();
    this.performanceIssues = [];
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_created':
        case 'file_modified':
          await this.handleAnimationFile(context.filePath);
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.performAnimationAudit();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute GSAP animation expert agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load existing animation documentation and patterns
    await this.loadAnimationDocumentation();
    await this.buildAnimationRegistry();
  }

  async loadAnimationDocumentation() {
    try {
      // Read GSAP documentation
      if (await this.fileExists('todo/GSAP_ANIMATIONS_DOCUMENTATION.md')) {
        const gsapDoc = await this.read('todo/GSAP_ANIMATIONS_DOCUMENTATION.md');
        this.parseAnimationDocumentation(gsapDoc);
      }
      
      // Read animation strategy document
      if (await this.fileExists('FUTURISTIC_ANIMATION_STRATEGY.md')) {
        const strategyDoc = await this.read('FUTURISTIC_ANIMATION_STRATEGY.md');
        this.parseAnimationStrategy(strategyDoc);
      }
      
      this.log('Animation documentation loaded');
    } catch (error) {
      this.error('Failed to load animation documentation', error);
    }
  }

  parseAnimationDocumentation(content) {
    // Extract existing animation patterns from documentation
    const timelineRegex = /gsap\.timeline\(\)([^;]+);/g;
    const fromRegex = /\.from\(['"]([^'"]+)['"],\s*\{([^}]+)\}/g;
    const toRegex = /\.to\(['"]([^'"]+)['"],\s*\{([^}]+)\}/g;
    
    let match;
    
    // Parse timeline patterns
    while ((match = timelineRegex.exec(content)) !== null) {
      this.animationPatterns.documentedTimelines = this.animationPatterns.documentedTimelines || [];
      this.animationPatterns.documentedTimelines.push(match[0]);
    }
    
    // Parse animation properties
    while ((match = fromRegex.exec(content)) !== null) {
      const selector = match[1];
      const props = match[2];
      this.animationPatterns.documentedAnimations = this.animationPatterns.documentedAnimations || {};
      this.animationPatterns.documentedAnimations[selector] = props;
    }
  }

  parseAnimationStrategy(content) {
    // Extract animation strategy patterns
    if (content.includes('magnetic cursor')) {
      this.animationPatterns.specialEffects = this.animationPatterns.specialEffects || [];
      this.animationPatterns.specialEffects.push('magnetic-cursor');
    }
    
    if (content.includes('particle field')) {
      this.animationPatterns.specialEffects = this.animationPatterns.specialEffects || [];
      this.animationPatterns.specialEffects.push('particle-field');
    }
    
    if (content.includes('scroll trigger')) {
      this.animationPatterns.scrollAnimations = true;
    }
  }

  async buildAnimationRegistry() {
    try {
      // Scan animation files
      const animationFiles = await this.grep('gsap', {
        glob: 'src/**/*.tsx',
        outputMode: 'files_with_matches'
      });
      
      for (const filePath of animationFiles) {
        await this.analyzeAnimationFile(filePath);
      }
      
      this.log(`Built animation registry with ${this.animationRegistry.size} animation files`);
    } catch (error) {
      this.error('Failed to build animation registry', error);
    }
  }

  async analyzeAnimationFile(filePath) {
    try {
      const content = await this.read(filePath);
      const analysis = {
        filePath,
        hasGSAP: content.includes('gsap'),
        hasScrollTrigger: content.includes('ScrollTrigger'),
        timelines: this.extractTimelines(content),
        animations: this.extractAnimations(content),
        performanceOptimizations: this.checkPerformanceOptimizations(content),
        issues: [],
        suggestions: []
      };
      
      // Analyze for common issues
      analysis.issues = await this.detectAnimationIssues(content, analysis);
      analysis.suggestions = await this.generateAnimationSuggestions(content, analysis);
      
      this.animationRegistry.set(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to analyze animation file: ${filePath}`, error);
    }
  }

  extractTimelines(content) {
    const timelines = [];
    const timelineRegex = /gsap\.timeline\(([^)]*)\)/g;
    let match;
    
    while ((match = timelineRegex.exec(content)) !== null) {
      timelines.push({
        declaration: match[0],
        options: match[1] || '',
        hasScrollTrigger: match[1].includes('scrollTrigger'),
        hasRepeat: match[1].includes('repeat'),
        hasYoyo: match[1].includes('yoyo')
      });
    }
    
    return timelines;
  }

  extractAnimations(content) {
    const animations = [];
    
    // Extract .from() animations
    const fromRegex = /\.from\(['"]([^'"]+)['"],\s*\{([^}]+)\}/g;
    let match;
    
    while ((match = fromRegex.exec(content)) !== null) {
      animations.push({
        type: 'from',
        selector: match[1],
        properties: this.parseAnimationProperties(match[2]),
        line: this.getLineNumber(content, match.index)
      });
    }
    
    // Extract .to() animations
    const toRegex = /\.to\(['"]([^'"]+)['"],\s*\{([^}]+)\}/g;
    while ((match = toRegex.exec(content)) !== null) {
      animations.push({
        type: 'to',
        selector: match[1],
        properties: this.parseAnimationProperties(match[2]),
        line: this.getLineNumber(content, match.index)
      });
    }
    
    // Extract .fromTo() animations
    const fromToRegex = /\.fromTo\(['"]([^'"]+)['"],\s*\{([^}]+)\},\s*\{([^}]+)\}/g;
    while ((match = fromToRegex.exec(content)) !== null) {
      animations.push({
        type: 'fromTo',
        selector: match[1],
        fromProperties: this.parseAnimationProperties(match[2]),
        toProperties: this.parseAnimationProperties(match[3]),
        line: this.getLineNumber(content, match.index)
      });
    }
    
    return animations;
  }

  parseAnimationProperties(propsString) {
    const props = {};
    
    // Basic property extraction
    const propertyRegex = /(\w+):\s*([^,}]+)/g;
    let match;
    
    while ((match = propertyRegex.exec(propsString)) !== null) {
      const key = match[1].trim();
      let value = match[2].trim();
      
      // Handle numeric values
      if (!isNaN(value) && value !== '') {
        value = parseFloat(value);
      } else if (value.startsWith('"') || value.startsWith("'")) {
        value = value.slice(1, -1); // Remove quotes
      }
      
      props[key] = value;
    }
    
    return props;
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  checkPerformanceOptimizations(content) {
    const optimizations = {
      force3D: content.includes('force3D'),
      willChange: content.includes('will-change'),
      transformOrigin: content.includes('transformOrigin'),
      transform: content.includes('transform'),
      opacity: content.includes('opacity'),
      scale: content.includes('scale'),
      rotation: content.includes('rotation')
    };
    
    optimizations.score = Object.values(optimizations).filter(Boolean).length;
    
    return optimizations;
  }

  async detectAnimationIssues(content, analysis) {
    const issues = [];
    
    // Check for performance issues
    if (content.includes('left:') || content.includes('top:')) {
      issues.push({
        type: 'performance',
        severity: 'high',
        message: 'Using left/top properties instead of transform (x/y) for animations',
        suggestion: 'Use x, y properties instead of left, top for better performance'
      });
    }
    
    if (content.includes('width:') || content.includes('height:')) {
      issues.push({
        type: 'performance',
        severity: 'medium',
        message: 'Animating width/height properties can cause layout thrashing',
        suggestion: 'Use scale transform instead of width/height when possible'
      });
    }
    
    // Check for missing performance optimizations
    if (analysis.hasGSAP && !analysis.performanceOptimizations.force3D) {
      issues.push({
        type: 'optimization',
        severity: 'medium',
        message: 'Missing force3D optimization for hardware acceleration',
        suggestion: 'Add force3D: true to animation properties'
      });
    }
    
    // Check for timeline issues
    for (const timeline of analysis.timelines) {
      if (!timeline.options) {
        issues.push({
          type: 'timeline',
          severity: 'low',
          message: 'Timeline created without options',
          suggestion: 'Consider adding timeline options for better control'
        });
      }
    }
    
    // Check for missing easing
    for (const animation of analysis.animations) {
      if (!animation.properties.ease && !animation.toProperties?.ease) {
        issues.push({
          type: 'easing',
          severity: 'low',
          message: `Animation at line ${animation.line} missing easing function`,
          suggestion: 'Add ease property for smoother animations'
        });
      }
    }
    
    // Check for ScrollTrigger without proper setup
    if (analysis.hasScrollTrigger && !content.includes('ScrollTrigger.register')) {
      issues.push({
        type: 'scrolltrigger',
        severity: 'high',
        message: 'Using ScrollTrigger without proper registration',
        suggestion: 'Add gsap.registerPlugin(ScrollTrigger) at the top of the file'
      });
    }
    
    return issues;
  }

  async generateAnimationSuggestions(content, analysis) {
    const suggestions = [];
    
    // Suggest timeline optimizations
    if (analysis.animations.length > 3 && analysis.timelines.length === 0) {
      suggestions.push({
        type: 'optimization',
        message: 'Multiple animations detected - consider using a timeline for better sequencing',
        implementation: 'const tl = gsap.timeline(); tl.from(...).to(...);'
      });
    }
    
    // Suggest scroll animations
    if (content.includes('useEffect') && analysis.hasGSAP && !analysis.hasScrollTrigger) {
      suggestions.push({
        type: 'enhancement',
        message: 'Consider adding scroll-triggered animations for better user experience',
        implementation: 'Add ScrollTrigger to create scroll-based animations'
      });
    }
    
    // Suggest stagger animations
    if (analysis.animations.some(anim => anim.selector.includes('.'))) {
      suggestions.push({
        type: 'enhancement',
        message: 'Consider using stagger for multiple element animations',
        implementation: 'gsap.from(".elements", { y: 50, opacity: 0, stagger: 0.1 })'
      });
    }
    
    // Suggest magnetic cursor for interactive elements
    if (content.includes('button') || content.includes('onClick')) {
      suggestions.push({
        type: 'enhancement',
        message: 'Consider adding magnetic cursor effects to interactive elements',
        implementation: 'Use MagneticCursor component for enhanced interactivity'
      });
    }
    
    return suggestions;
  }

  async handleAnimationFile(filePath) {
    this.log(`Analyzing animation file: ${filePath}`);
    
    try {
      await this.analyzeAnimationFile(filePath);
      const analysis = this.animationRegistry.get(filePath);
      
      if (!analysis) return;
      
      // Apply automatic fixes for common issues
      if (analysis.issues.length > 0) {
        await this.applyAnimationFixes(filePath, analysis.issues);
      }
      
      // Generate performance improvements
      if (analysis.performanceOptimizations.score < 3) {
        await this.suggestPerformanceImprovements(filePath, analysis);
      }
      
      // Update animation documentation if needed
      if (analysis.animations.length > 0) {
        await this.updateAnimationDocumentation(filePath, analysis);
      }
      
    } catch (error) {
      this.error(`Failed to handle animation file ${filePath}`, error);
    }
  }

  async applyAnimationFixes(filePath, issues) {
    try {
      let content = await this.read(filePath);
      let modified = false;
      
      for (const issue of issues) {
        switch (issue.type) {
          case 'performance':
            if (issue.message.includes('left/top')) {
              // Replace left/top with x/y
              content = content.replace(/left:\s*([^,}]+)/g, 'x: $1');
              content = content.replace(/top:\s*([^,}]+)/g, 'y: $1');
              modified = true;
              this.log(`Fixed performance issue: replaced left/top with x/y`);
            }
            break;
            
          case 'optimization':
            if (issue.message.includes('force3D')) {
              // Add force3D to animation properties
              content = content.replace(
                /(\{[^}]*)(opacity|x|y|scale|rotation)([^}]*\})/g,
                '$1$2$3'.replace('}', ', force3D: true}')
              );
              modified = true;
              this.log(`Added force3D optimization`);
            }
            break;
            
          case 'scrolltrigger':
            if (issue.message.includes('registration')) {
              // Add ScrollTrigger registration
              const importIndex = content.indexOf("import");
              if (importIndex !== -1) {
                const gsapImportRegex = /import.*gsap.*from ['"]gsap['"];?/;
                if (gsapImportRegex.test(content)) {
                  content = content.replace(
                    gsapImportRegex,
                    '$&\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);'
                  );
                  modified = true;
                  this.log(`Added ScrollTrigger registration`);
                }
              }
            }
            break;
        }
      }
      
      if (modified) {
        await this.write(filePath, content);
        this.log(`Applied ${issues.length} animation fixes to ${filePath}`);
      }
      
    } catch (error) {
      this.error(`Failed to apply animation fixes to ${filePath}`, error);
    }
  }

  async suggestPerformanceImprovements(filePath, analysis) {
    const improvements = [];
    
    // Suggest hardware acceleration
    if (!analysis.performanceOptimizations.force3D) {
      improvements.push({
        type: 'hardware-acceleration',
        description: 'Add force3D: true for hardware acceleration',
        implementation: 'force3D: true'
      });
    }
    
    // Suggest will-change CSS property
    if (!analysis.performanceOptimizations.willChange) {
      improvements.push({
        type: 'css-optimization',
        description: 'Add will-change CSS property for better performance',
        implementation: 'CSS: will-change: transform, opacity'
      });
    }
    
    // Suggest timeline instead of individual animations
    if (analysis.animations.length > 2 && analysis.timelines.length === 0) {
      improvements.push({
        type: 'timeline-optimization',
        description: 'Use timeline for better performance with multiple animations',
        implementation: this.generateTimelineExample(analysis.animations)
      });
    }
    
    this.log(`Generated ${improvements.length} performance suggestions for ${filePath}`);
    
    // Log suggestions for developer review
    for (const improvement of improvements) {
      this.log(`Suggestion: ${improvement.description}`);
    }
  }

  generateTimelineExample(animations) {
    let timeline = 'const tl = gsap.timeline();\n';
    
    for (const anim of animations.slice(0, 3)) {
      const method = anim.type;
      const selector = anim.selector;
      const props = JSON.stringify(anim.properties || anim.toProperties || {});
      timeline += `tl.${method}("${selector}", ${props});\n`;
    }
    
    return timeline;
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'gsap':
        await this.optimizeGSAPUsage();
        break;
      case 'timeline':
        await this.analyzeTimelineUsage();
        break;
      case 'animation':
        await this.performAnimationAudit();
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async optimizeGSAPUsage() {
    this.log('Optimizing GSAP usage across project');
    
    try {
      let totalOptimizations = 0;
      
      for (const [filePath, analysis] of this.animationRegistry) {
        if (analysis.issues.length > 0) {
          await this.applyAnimationFixes(filePath, analysis.issues);
          totalOptimizations += analysis.issues.length;
        }
        
        if (analysis.performanceOptimizations.score < 3) {
          await this.suggestPerformanceImprovements(filePath, analysis);
        }
      }
      
      this.log(`GSAP optimization complete: ${totalOptimizations} fixes applied`);
      
    } catch (error) {
      this.error('Failed to optimize GSAP usage', error);
    }
  }

  async analyzeTimelineUsage() {
    this.log('Analyzing timeline usage patterns');
    
    try {
      const timelineStats = {
        totalTimelines: 0,
        withScrollTrigger: 0,
        withRepeat: 0,
        withYoyo: 0,
        recommendations: []
      };
      
      for (const [filePath, analysis] of this.animationRegistry) {
        timelineStats.totalTimelines += analysis.timelines.length;
        
        for (const timeline of analysis.timelines) {
          if (timeline.hasScrollTrigger) timelineStats.withScrollTrigger++;
          if (timeline.hasRepeat) timelineStats.withRepeat++;
          if (timeline.hasYoyo) timelineStats.withYoyo++;
        }
        
        // Generate recommendations
        if (analysis.animations.length > 3 && analysis.timelines.length === 0) {
          timelineStats.recommendations.push(`${filePath}: Consider using timeline for ${analysis.animations.length} animations`);
        }
      }
      
      this.log(`Timeline analysis: ${timelineStats.totalTimelines} timelines found`);
      this.log(`ScrollTrigger usage: ${timelineStats.withScrollTrigger} timelines`);
      
      if (timelineStats.recommendations.length > 0) {
        this.log('Timeline recommendations:');
        timelineStats.recommendations.forEach(rec => this.log(`  - ${rec}`));
      }
      
    } catch (error) {
      this.error('Failed to analyze timeline usage', error);
    }
  }

  async performAnimationAudit() {
    this.log('Performing comprehensive animation audit');
    
    try {
      // Rebuild animation registry
      await this.buildAnimationRegistry();
      
      // Generate audit report
      const auditReport = {
        timestamp: new Date().toISOString(),
        totalFiles: this.animationRegistry.size,
        totalAnimations: 0,
        totalTimelines: 0,
        performanceScore: 0,
        issues: [],
        suggestions: [],
        statistics: {
          byType: {},
          byProperty: {},
          performanceOptimizations: {}
        }
      };
      
      // Collect statistics
      for (const [filePath, analysis] of this.animationRegistry) {
        auditReport.totalAnimations += analysis.animations.length;
        auditReport.totalTimelines += analysis.timelines.length;
        auditReport.performanceScore += analysis.performanceOptimizations.score;
        
        auditReport.issues.push(...analysis.issues);
        auditReport.suggestions.push(...analysis.suggestions);
        
        // Statistics by animation type
        for (const anim of analysis.animations) {
          auditReport.statistics.byType[anim.type] = (auditReport.statistics.byType[anim.type] || 0) + 1;
          
          // Statistics by animated properties
          const props = anim.properties || anim.toProperties || {};
          for (const prop of Object.keys(props)) {
            auditReport.statistics.byProperty[prop] = (auditReport.statistics.byProperty[prop] || 0) + 1;
          }
        }
        
        // Performance optimization statistics
        for (const [opt, enabled] of Object.entries(analysis.performanceOptimizations)) {
          if (enabled && opt !== 'score') {
            auditReport.statistics.performanceOptimizations[opt] = 
              (auditReport.statistics.performanceOptimizations[opt] || 0) + 1;
          }
        }
      }
      
      // Calculate average performance score
      auditReport.averagePerformanceScore = auditReport.performanceScore / auditReport.totalFiles;
      
      // Generate recommendations
      if (auditReport.averagePerformanceScore < 3) {
        auditReport.recommendations = [
          'Low overall performance score - focus on hardware acceleration',
          'Add force3D: true to animation properties',
          'Use transform properties (x, y, scale) instead of layout properties'
        ];
      }
      
      // Save audit report
      const reportPath = '.claude/subagents/logs/animation-audit-report.json';
      await this.write(reportPath, JSON.stringify(auditReport, null, 2));
      
      this.log(`Animation audit complete. Report saved to ${reportPath}`);
      this.log(`Summary: ${auditReport.totalAnimations} animations across ${auditReport.totalFiles} files`);
      this.log(`Average performance score: ${auditReport.averagePerformanceScore.toFixed(2)}/7`);
      
    } catch (error) {
      this.error('Failed to perform animation audit', error);
    }
  }

  async updateAnimationDocumentation(filePath, analysis) {
    try {
      // Update animation registry documentation
      const docPath = '.claude/subagents/logs/animation-registry.json';
      const registryDoc = {
        lastUpdated: new Date().toISOString(),
        totalFiles: this.animationRegistry.size,
        animations: {}
      };
      
      // Convert Map to serializable object
      for (const [path, data] of this.animationRegistry) {
        registryDoc.animations[path] = data;
      }
      
      await this.write(docPath, JSON.stringify(registryDoc, null, 2));
      
      this.log(`Animation documentation updated`);
      
    } catch (error) {
      this.error('Failed to update animation documentation', error);
    }
  }

  async generateAnimationBestPractices() {
    const bestPractices = {
      performance: [
        'Use transform properties (x, y, scale, rotation) instead of layout properties',
        'Add force3D: true for hardware acceleration',
        'Use will-change CSS property sparingly',
        'Prefer opacity and transform for smooth animations'
      ],
      timeline: [
        'Use timelines for complex sequential animations',
        'Leverage stagger for multiple element animations',
        'Add proper easing functions for natural motion',
        'Use ScrollTrigger for scroll-based animations'
      ],
      code: [
        'Register GSAP plugins at the top of files',
        'Use useLayoutEffect for animation setup in React',
        'Clean up animations in useEffect cleanup functions',
        'Cache DOM references for better performance'
      ]
    };
    
    const practicesPath = '.claude/subagents/logs/animation-best-practices.json';
    await this.write(practicesPath, JSON.stringify(bestPractices, null, 2));
    
    return bestPractices;
  }
}

module.exports = GSAPAnimationExpertAgent;