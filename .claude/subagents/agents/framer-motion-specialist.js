const BaseAgent = require('./base-agent');
const path = require('path');

class FramerMotionSpecialistAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.motionPatterns = {
      variants: {
        container: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        },
        item: {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }
      },
      animations: {
        fadeIn: {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6 }
        },
        slideUp: {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: "easeOut" }
        },
        scale: {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, ease: "easeOut" }
        }
      },
      gestures: {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
        focus: { scale: 1.02 }
      },
      transitions: {
        smooth: { duration: 0.3, ease: "easeInOut" },
        bouncy: { type: "spring", stiffness: 300, damping: 20 },
        slow: { duration: 0.8, ease: "easeOut" }
      }
    };
    this.motionRegistry = new Map();
    this.componentUsage = new Map();
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_created':
        case 'file_modified':
          await this.handleMotionFile(context.filePath);
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.performMotionAudit();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute Framer Motion specialist agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load existing motion patterns and build registry
    await this.loadMotionDocumentation();
    await this.buildMotionRegistry();
  }

  async loadMotionDocumentation() {
    try {
      // Check for existing motion documentation
      if (await this.fileExists('src/CLAUDE.md')) {
        const srcDoc = await this.read('src/CLAUDE.md');
        this.parseMotionDocumentation(srcDoc);
      }
      
      this.log('Motion documentation loaded');
    } catch (error) {
      this.error('Failed to load motion documentation', error);
    }
  }

  parseMotionDocumentation(content) {
    // Extract documented motion patterns
    if (content.includes('Framer Motion')) {
      this.motionPatterns.documented = true;
    }
    
    // Extract animation patterns from documentation
    const animationRegex = /initial=\{\{([^}]+)\}\}/g;
    let match;
    
    while ((match = animationRegex.exec(content)) !== null) {
      const props = match[1];
      this.motionPatterns.documentedAnimations = this.motionPatterns.documentedAnimations || [];
      this.motionPatterns.documentedAnimations.push(props);
    }
  }

  async buildMotionRegistry() {
    try {
      // Find all files using Framer Motion
      const motionFiles = await this.grep('framer-motion', {
        glob: 'src/**/*.tsx',
        outputMode: 'files_with_matches'
      });
      
      for (const filePath of motionFiles) {
        await this.analyzeMotionFile(filePath);
      }
      
      this.log(`Built motion registry with ${this.motionRegistry.size} motion files`);
    } catch (error) {
      this.error('Failed to build motion registry', error);
    }
  }

  async analyzeMotionFile(filePath) {
    try {
      const content = await this.read(filePath);
      const analysis = {
        filePath,
        hasFramerMotion: content.includes('framer-motion'),
        motionComponents: this.extractMotionComponents(content),
        animations: this.extractAnimations(content),
        variants: this.extractVariants(content),
        gestures: this.extractGestures(content),
        layoutAnimations: this.extractLayoutAnimations(content),
        issues: [],
        suggestions: [],
        complexity: 'low'
      };
      
      // Determine complexity
      analysis.complexity = this.assessComplexity(analysis);
      
      // Detect issues
      analysis.issues = await this.detectMotionIssues(content, analysis);
      
      // Generate suggestions
      analysis.suggestions = await this.generateMotionSuggestions(content, analysis);
      
      this.motionRegistry.set(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to analyze motion file: ${filePath}`, error);
    }
  }

  extractMotionComponents(content) {
    const components = [];
    const motionRegex = /<motion\.(\w+)/g;
    let match;
    
    while ((match = motionRegex.exec(content)) !== null) {
      components.push({
        element: match[1],
        line: this.getLineNumber(content, match.index)
      });
    }
    
    return components;
  }

  extractAnimations(content) {
    const animations = [];
    
    // Extract initial animations
    const initialRegex = /initial=\{\{([^}]+)\}\}/g;
    let match;
    
    while ((match = initialRegex.exec(content)) !== null) {
      animations.push({
        type: 'initial',
        properties: this.parseAnimationObject(match[1]),
        line: this.getLineNumber(content, match.index)
      });
    }
    
    // Extract animate animations
    const animateRegex = /animate=\{\{([^}]+)\}\}/g;
    while ((match = animateRegex.exec(content)) !== null) {
      animations.push({
        type: 'animate',
        properties: this.parseAnimationObject(match[1]),
        line: this.getLineNumber(content, match.index)
      });
    }
    
    // Extract exit animations
    const exitRegex = /exit=\{\{([^}]+)\}\}/g;
    while ((match = exitRegex.exec(content)) !== null) {
      animations.push({
        type: 'exit',
        properties: this.parseAnimationObject(match[1]),
        line: this.getLineNumber(content, match.index)
      });
    }
    
    return animations;
  }

  parseAnimationObject(objString) {
    const props = {};
    
    // Handle nested objects and arrays
    try {
      // Simple property extraction - could be enhanced with proper parsing
      const propertyRegex = /(\w+):\s*([^,}]+)/g;
      let match;
      
      while ((match = propertyRegex.exec(objString)) !== null) {
        const key = match[1].trim();
        let value = match[2].trim();
        
        // Handle numeric values
        if (!isNaN(value) && value !== '') {
          value = parseFloat(value);
        } else if (value.startsWith('"') || value.startsWith("'")) {
          value = value.slice(1, -1);
        }
        
        props[key] = value;
      }
    } catch (error) {
      this.error(`Failed to parse animation object: ${objString}`, error);
    }
    
    return props;
  }

  extractVariants(content) {
    const variants = [];
    const variantRegex = /const\s+(\w+Variants?)\s*=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/g;
    let match;
    
    while ((match = variantRegex.exec(content)) !== null) {
      variants.push({
        name: match[1],
        definition: match[2],
        line: this.getLineNumber(content, match.index)
      });
    }
    
    return variants;
  }

  extractGestures(content) {
    const gestures = [];
    const gestureTypes = ['whileHover', 'whileTap', 'whileFocus', 'whileDrag'];
    
    for (const gesture of gestureTypes) {
      const regex = new RegExp(`${gesture}=\\{\\{([^}]+)\\}\\}`, 'g');
      let match;
      
      while ((match = regex.exec(content)) !== null) {
        gestures.push({
          type: gesture,
          properties: this.parseAnimationObject(match[1]),
          line: this.getLineNumber(content, match.index)
        });
      }
    }
    
    return gestures;
  }

  extractLayoutAnimations(content) {
    const layoutAnimations = [];
    
    if (content.includes('layout=')) {
      const layoutRegex = /layout(?:=\{?([^}\s]+)\}?)?/g;
      let match;
      
      while ((match = layoutRegex.exec(content)) !== null) {
        layoutAnimations.push({
          type: 'layout',
          value: match[1] || true,
          line: this.getLineNumber(content, match.index)
        });
      }
    }
    
    if (content.includes('layoutId=')) {
      const layoutIdRegex = /layoutId=["']([^"']+)["']/g;
      let match;
      
      while ((match = layoutIdRegex.exec(content)) !== null) {
        layoutAnimations.push({
          type: 'layoutId',
          value: match[1],
          line: this.getLineNumber(content, match.index)
        });
      }
    }
    
    return layoutAnimations;
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  }

  assessComplexity(analysis) {
    let score = 0;
    
    score += analysis.motionComponents.length;
    score += analysis.variants.length * 2;
    score += analysis.layoutAnimations.length * 2;
    score += analysis.gestures.length;
    
    if (score < 3) return 'low';
    if (score < 8) return 'medium';
    return 'high';
  }

  async detectMotionIssues(content, analysis) {
    const issues = [];
    
    // Check for missing AnimatePresence
    if (analysis.animations.some(anim => anim.type === 'exit') && !content.includes('AnimatePresence')) {
      issues.push({
        type: 'missing-animate-presence',
        severity: 'high',
        message: 'Exit animations require AnimatePresence wrapper',
        suggestion: 'Wrap components with AnimatePresence for exit animations'
      });
    }
    
    // Check for missing transitions
    for (const animation of analysis.animations) {
      if (!animation.properties.transition && animation.type !== 'initial') {
        issues.push({
          type: 'missing-transition',
          severity: 'medium',
          message: `Animation at line ${animation.line} missing transition`,
          suggestion: 'Add transition property for smoother animations'
        });
      }
    }
    
    // Check for performance issues
    for (const animation of analysis.animations) {
      if (animation.properties.width || animation.properties.height) {
        issues.push({
          type: 'performance',
          severity: 'medium',
          message: `Animation at line ${animation.line} animating layout properties`,
          suggestion: 'Use transform properties instead of width/height for better performance'
        });
      }
    }
    
    // Check for missing variants in complex components
    if (analysis.motionComponents.length > 3 && analysis.variants.length === 0) {
      issues.push({
        type: 'missing-variants',
        severity: 'low',
        message: 'Multiple motion components without variants',
        suggestion: 'Consider using variants for better organization and control'
      });
    }
    
    // Check for inconsistent easing
    const easings = analysis.animations
      .map(anim => anim.properties.ease)
      .filter(Boolean);
    
    if (easings.length > 1 && new Set(easings).size === easings.length) {
      issues.push({
        type: 'inconsistent-easing',
        severity: 'low',
        message: 'Inconsistent easing functions used',
        suggestion: 'Use consistent easing for better user experience'
      });
    }
    
    return issues;
  }

  async generateMotionSuggestions(content, analysis) {
    const suggestions = [];
    
    // Suggest stagger animations for lists
    if (analysis.motionComponents.length > 2) {
      suggestions.push({
        type: 'stagger',
        message: 'Consider using stagger animations for multiple elements',
        implementation: 'Use variants with staggerChildren for list animations'
      });
    }
    
    // Suggest layout animations for dynamic content
    if (content.includes('useState') && analysis.layoutAnimations.length === 0) {
      suggestions.push({
        type: 'layout',
        message: 'Consider adding layout animations for dynamic content',
        implementation: 'Add layout prop to motion components that change size/position'
      });
    }
    
    // Suggest gesture animations for interactive elements
    if ((content.includes('onClick') || content.includes('button')) && analysis.gestures.length === 0) {
      suggestions.push({
        type: 'gestures',
        message: 'Add gesture animations to interactive elements',
        implementation: 'Use whileHover and whileTap for better interactivity'
      });
    }
    
    // Suggest exit animations for conditional rendering
    if (content.includes('&&') && analysis.animations.every(anim => anim.type !== 'exit')) {
      suggestions.push({
        type: 'exit-animations',
        message: 'Consider adding exit animations for smoother transitions',
        implementation: 'Add exit prop with AnimatePresence wrapper'
      });
    }
    
    // Suggest custom hooks for reusable animations
    if (analysis.complexity === 'high') {
      suggestions.push({
        type: 'custom-hook',
        message: 'Extract complex animations into custom hooks',
        implementation: 'Create useAnimations hook for reusable animation logic'
      });
    }
    
    return suggestions;
  }

  async handleMotionFile(filePath) {
    this.log(`Analyzing motion file: ${filePath}`);
    
    try {
      await this.analyzeMotionFile(filePath);
      const analysis = this.motionRegistry.get(filePath);
      
      if (!analysis) return;
      
      // Apply automatic fixes
      if (analysis.issues.length > 0) {
        await this.applyMotionFixes(filePath, analysis.issues);
      }
      
      // Suggest optimizations
      if (analysis.complexity === 'high' || analysis.suggestions.length > 0) {
        await this.suggestMotionOptimizations(filePath, analysis);
      }
      
      // Update component usage tracking
      this.updateComponentUsage(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to handle motion file ${filePath}`, error);
    }
  }

  async applyMotionFixes(filePath, issues) {
    try {
      let content = await this.read(filePath);
      let modified = false;
      
      for (const issue of issues) {
        switch (issue.type) {
          case 'missing-animate-presence':
            // Add AnimatePresence import
            if (!content.includes('AnimatePresence')) {
              content = content.replace(
                /import.*motion.*from ['"]framer-motion['"];?/,
                '$&'.replace('motion', 'motion, AnimatePresence')
              );
              modified = true;
              this.log('Added AnimatePresence import');
            }
            break;
            
          case 'missing-transition':
            // Add basic transitions to animations
            content = content.replace(
              /animate=\{\{([^}]+)\}\}/g,
              (match, props) => {
                if (!props.includes('transition')) {
                  const newProps = props.trim() + ', transition: { duration: 0.6, ease: "easeOut" }';
                  return `animate={{ ${newProps} }}`;
                }
                return match;
              }
            );
            modified = true;
            this.log('Added missing transitions');
            break;
            
          case 'performance':
            // Replace layout properties with transform
            content = content.replace(/width:\s*([^,}]+)/g, 'scaleX: $1');
            content = content.replace(/height:\s*([^,}]+)/g, 'scaleY: $1');
            modified = true;
            this.log('Replaced layout properties with transform');
            break;
        }
      }
      
      if (modified) {
        await this.write(filePath, content);
        this.log(`Applied ${issues.length} motion fixes to ${filePath}`);
      }
      
    } catch (error) {
      this.error(`Failed to apply motion fixes to ${filePath}`, error);
    }
  }

  async suggestMotionOptimizations(filePath, analysis) {
    const optimizations = [];
    
    // Suggest variants for complex animations
    if (analysis.motionComponents.length > 2 && analysis.variants.length === 0) {
      optimizations.push({
        type: 'variants',
        description: 'Create variants for better animation organization',
        implementation: this.generateVariantsExample(analysis)
      });
    }
    
    // Suggest stagger for multiple components
    if (analysis.motionComponents.length > 3) {
      optimizations.push({
        type: 'stagger',
        description: 'Use stagger animation for multiple elements',
        implementation: this.generateStaggerExample()
      });
    }
    
    // Suggest gesture animations
    if (analysis.gestures.length === 0 && analysis.motionComponents.length > 0) {
      optimizations.push({
        type: 'gestures',
        description: 'Add gesture animations for better interactivity',
        implementation: this.generateGestureExample()
      });
    }
    
    // Suggest layout animations
    if (analysis.layoutAnimations.length === 0 && analysis.complexity !== 'low') {
      optimizations.push({
        type: 'layout',
        description: 'Add layout animations for dynamic content',
        implementation: 'Add layout prop to motion components'
      });
    }
    
    this.log(`Generated ${optimizations.length} optimization suggestions for ${filePath}`);
    
    // Log suggestions for developer review
    for (const opt of optimizations) {
      this.log(`Suggestion: ${opt.description}`);
    }
    
    return optimizations;
  }

  generateVariantsExample(analysis) {
    return `const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
};`;
  }

  generateStaggerExample() {
    return `<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, index) => (
    <motion.div key={index} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>`;
  }

  generateGestureExample() {
    return `<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  Click me
</motion.button>`;
  }

  updateComponentUsage(filePath, analysis) {
    // Track component usage patterns
    for (const component of analysis.motionComponents) {
      const key = component.element;
      if (!this.componentUsage.has(key)) {
        this.componentUsage.set(key, { count: 0, files: [] });
      }
      
      const usage = this.componentUsage.get(key);
      usage.count++;
      if (!usage.files.includes(filePath)) {
        usage.files.push(filePath);
      }
    }
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'motion':
        await this.optimizeMotionUsage();
        break;
      case 'framer':
        await this.analyzeFramerImplementation();
        break;
      case 'animate':
        await this.performMotionAudit();
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async optimizeMotionUsage() {
    this.log('Optimizing Framer Motion usage across project');
    
    try {
      let totalOptimizations = 0;
      
      for (const [filePath, analysis] of this.motionRegistry) {
        if (analysis.issues.length > 0) {
          await this.applyMotionFixes(filePath, analysis.issues);
          totalOptimizations += analysis.issues.length;
        }
        
        if (analysis.complexity === 'high' || analysis.suggestions.length > 2) {
          await this.suggestMotionOptimizations(filePath, analysis);
        }
      }
      
      this.log(`Motion optimization complete: ${totalOptimizations} fixes applied`);
      
    } catch (error) {
      this.error('Failed to optimize motion usage', error);
    }
  }

  async analyzeFramerImplementation() {
    this.log('Analyzing Framer Motion implementation patterns');
    
    try {
      const implementationStats = {
        totalFiles: this.motionRegistry.size,
        totalComponents: 0,
        complexityDistribution: { low: 0, medium: 0, high: 0 },
        mostUsedElements: {},
        commonPatterns: {
          fadeIn: 0,
          slideUp: 0,
          scale: 0,
          stagger: 0
        }
      };
      
      for (const [filePath, analysis] of this.motionRegistry) {
        implementationStats.totalComponents += analysis.motionComponents.length;
        implementationStats.complexityDistribution[analysis.complexity]++;
        
        // Count element usage
        for (const component of analysis.motionComponents) {
          implementationStats.mostUsedElements[component.element] = 
            (implementationStats.mostUsedElements[component.element] || 0) + 1;
        }
        
        // Detect common patterns
        for (const animation of analysis.animations) {
          if (animation.properties.opacity === 0) {
            implementationStats.commonPatterns.fadeIn++;
          }
          if (animation.properties.y && animation.properties.y > 0) {
            implementationStats.commonPatterns.slideUp++;
          }
          if (animation.properties.scale) {
            implementationStats.commonPatterns.scale++;
          }
        }
        
        for (const variant of analysis.variants) {
          if (variant.definition.includes('stagger')) {
            implementationStats.commonPatterns.stagger++;
          }
        }
      }
      
      this.log(`Framer Motion analysis complete:`);
      this.log(`- ${implementationStats.totalFiles} files using Framer Motion`);
      this.log(`- ${implementationStats.totalComponents} motion components`);
      this.log(`- Complexity: ${implementationStats.complexityDistribution.high} high, ${implementationStats.complexityDistribution.medium} medium, ${implementationStats.complexityDistribution.low} low`);
      
      // Save detailed analysis
      const analysisPath = '.claude/subagents/logs/framer-motion-analysis.json';
      await this.write(analysisPath, JSON.stringify(implementationStats, null, 2));
      
    } catch (error) {
      this.error('Failed to analyze Framer implementation', error);
    }
  }

  async performMotionAudit() {
    this.log('Performing comprehensive Framer Motion audit');
    
    try {
      // Rebuild motion registry
      await this.buildMotionRegistry();
      
      const auditReport = {
        timestamp: new Date().toISOString(),
        summary: {
          totalFiles: this.motionRegistry.size,
          totalAnimations: 0,
          totalVariants: 0,
          totalGestures: 0,
          averageComplexity: 0
        },
        issues: {
          high: [],
          medium: [],
          low: []
        },
        suggestions: [],
        componentUsage: Object.fromEntries(this.componentUsage),
        bestPractices: this.generateBestPractices()
      };
      
      // Collect data from all files
      for (const [filePath, analysis] of this.motionRegistry) {
        auditReport.summary.totalAnimations += analysis.animations.length;
        auditReport.summary.totalVariants += analysis.variants.length;
        auditReport.summary.totalGestures += analysis.gestures.length;
        
        // Categorize issues by severity
        for (const issue of analysis.issues) {
          auditReport.issues[issue.severity].push({
            file: filePath,
            ...issue
          });
        }
        
        auditReport.suggestions.push(...analysis.suggestions.map(s => ({ file: filePath, ...s })));
      }
      
      // Calculate average complexity
      const complexityScores = Array.from(this.motionRegistry.values()).map(a => {
        switch (a.complexity) {
          case 'high': return 3;
          case 'medium': return 2;
          case 'low': return 1;
          default: return 1;
        }
      });
      
      auditReport.summary.averageComplexity = 
        complexityScores.reduce((a, b) => a + b, 0) / complexityScores.length;
      
      // Generate recommendations
      auditReport.recommendations = this.generateAuditRecommendations(auditReport);
      
      // Save audit report
      const reportPath = '.claude/subagents/logs/framer-motion-audit.json';
      await this.write(reportPath, JSON.stringify(auditReport, null, 2));
      
      this.log(`Framer Motion audit complete. Report saved to ${reportPath}`);
      this.log(`Summary: ${auditReport.summary.totalAnimations} animations in ${auditReport.summary.totalFiles} files`);
      
    } catch (error) {
      this.error('Failed to perform motion audit', error);
    }
  }

  generateBestPractices() {
    return {
      performance: [
        'Use transform properties instead of layout properties',
        'Prefer opacity and transform for smooth animations',
        'Use variants for complex animation sequences',
        'Add will-change: transform to animated elements CSS'
      ],
      organization: [
        'Define variants outside component for reusability',
        'Use consistent easing functions across animations',
        'Group related animations into variants',
        'Extract complex animations into custom hooks'
      ],
      accessibility: [
        'Respect user\'s prefers-reduced-motion preference',
        'Provide alternative interactions for essential animations',
        'Keep animations under 500ms for micro-interactions',
        'Use semantic motion that supports content understanding'
      ],
      react: [
        'Wrap exit animations with AnimatePresence',
        'Use layout animations for dynamic content',
        'Clean up animations in useEffect cleanup',
        'Optimize re-renders with useMemo for variants'
      ]
    };
  }

  generateAuditRecommendations(auditReport) {
    const recommendations = [];
    
    // Performance recommendations
    if (auditReport.issues.high.length > 0) {
      recommendations.push('Address high-severity issues first (missing AnimatePresence, performance problems)');
    }
    
    if (auditReport.summary.averageComplexity > 2.5) {
      recommendations.push('Consider simplifying complex animations or extracting into custom hooks');
    }
    
    // Organization recommendations
    const totalIssues = auditReport.issues.high.length + auditReport.issues.medium.length + auditReport.issues.low.length;
    if (totalIssues > auditReport.summary.totalFiles * 0.5) {
      recommendations.push('High issue-to-file ratio suggests need for animation standards');
    }
    
    // Usage recommendations
    const gestureRatio = auditReport.summary.totalGestures / auditReport.summary.totalAnimations;
    if (gestureRatio < 0.3) {
      recommendations.push('Low gesture usage - consider adding more interactive animations');
    }
    
    return recommendations;
  }
}

module.exports = FramerMotionSpecialistAgent;