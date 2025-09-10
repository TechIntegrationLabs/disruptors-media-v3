const BaseAgent = require('./base-agent');
const path = require('path');

class ComponentArchitectAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.projectPatterns = null;
    this.componentRegistry = new Map();
  }

  async execute() {
    try {
      await this.setupExecution();
      
      // Analyze the trigger context
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_created':
          await this.handleNewComponent(context.filePath);
          break;
        case 'file_modified':
          await this.handleModifiedComponent(context.filePath);
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.performArchitectureReview();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute component architect agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load project patterns and component registry
    await this.loadProjectPatterns();
    await this.buildComponentRegistry();
  }

  async loadProjectPatterns() {
    try {
      // Read CLAUDE.md files to understand project patterns
      const mainClaude = await this.read('CLAUDE.md');
      const srcClaude = await this.read('src/CLAUDE.md');
      
      this.projectPatterns = {
        // Component structure patterns
        componentDirs: ['components/animations', 'components/common', 'components/layout', 'components/sections'],
        pagesDirs: ['pages', 'pages/services'],
        
        // TypeScript patterns
        interfacePattern: /interface\s+(\w+Props?)\s*\{([^}]+)\}/g,
        componentPattern: /export\s+const\s+(\w+):\s*React\.FC<([^>]+)>/g,
        
        // Naming conventions
        componentNaming: /^[A-Z][a-zA-Z0-9]*$/,
        propsNaming: /^[A-Z][a-zA-Z0-9]*Props$/,
        
        // Required imports
        requiredImports: {
          react: "import React from 'react';",
          framerMotion: "import { motion } from 'framer-motion';",
          tailwind: "className",
          typescript: "interface"
        },
        
        // Animation patterns
        animationPatterns: {
          fadeIn: 'initial={{ opacity: 0, y: 20 }}',
          stagger: 'variants={{ container: { transition: { staggerChildren: 0.1 } } }}',
          hover: 'whileHover={{ scale: 1.05 }}'
        }
      };
      
      this.log('Project patterns loaded successfully');
    } catch (error) {
      this.error('Failed to load project patterns', error);
    }
  }

  async buildComponentRegistry() {
    try {
      // Scan all component files
      const componentFiles = await this.grep('\\.tsx$', { 
        glob: 'src/components/**/*',
        outputMode: 'files_with_matches'
      });
      
      for (const filePath of componentFiles) {
        const analysis = await this.analyzeFileContent(filePath, 'detailed');
        if (analysis) {
          this.componentRegistry.set(filePath, analysis);
        }
      }
      
      this.log(`Built component registry with ${this.componentRegistry.size} components`);
    } catch (error) {
      this.error('Failed to build component registry', error);
    }
  }

  async handleNewComponent(filePath) {
    this.log(`Analyzing new component: ${filePath}`);
    
    try {
      // Check if it's in the right directory
      await this.validateComponentLocation(filePath);
      
      // Analyze the component
      const analysis = await this.analyzeFileContent(filePath, 'detailed');
      if (!analysis) return;
      
      // Check for architectural compliance
      const issues = await this.checkArchitecturalCompliance(filePath, analysis);
      
      if (issues.length > 0) {
        await this.fixArchitecturalIssues(filePath, issues);
      }
      
      // Add to registry
      this.componentRegistry.set(filePath, analysis);
      
      // Generate documentation update if needed
      await this.updateComponentDocumentation(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to handle new component ${filePath}`, error);
    }
  }

  async handleModifiedComponent(filePath) {
    this.log(`Analyzing modified component: ${filePath}`);
    
    try {
      const oldAnalysis = this.componentRegistry.get(filePath);
      const newAnalysis = await this.analyzeFileContent(filePath, 'detailed');
      
      if (!newAnalysis) return;
      
      // Compare changes
      const changes = this.compareAnalysis(oldAnalysis, newAnalysis);
      
      if (changes.significant) {
        this.log(`Significant changes detected in ${filePath}: ${changes.description}`);
        
        // Check if changes maintain architectural compliance
        const issues = await this.checkArchitecturalCompliance(filePath, newAnalysis);
        
        if (issues.length > 0) {
          await this.fixArchitecturalIssues(filePath, issues);
        }
        
        // Update dependent components if needed
        await this.updateDependentComponents(filePath, changes);
      }
      
      // Update registry
      this.componentRegistry.set(filePath, newAnalysis);
      
    } catch (error) {
      this.error(`Failed to handle modified component ${filePath}`, error);
    }
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'component':
        await this.suggestComponentImprovements();
        break;
      case 'typescript':
        await this.validateTypeScriptPatterns();
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async validateComponentLocation(filePath) {
    const validDirs = this.projectPatterns.componentDirs.concat(this.projectPatterns.pagesDirs);
    const isInValidDir = validDirs.some(dir => filePath.includes(dir));
    
    if (!isInValidDir && filePath.includes('src/')) {
      this.log(`Component may be in wrong directory: ${filePath}`, 'warn');
      // Could suggest moving to appropriate directory
    }
  }

  async checkArchitecturalCompliance(filePath, analysis) {
    const issues = [];
    
    try {
      const content = await this.read(filePath);
      
      // Check TypeScript interface patterns
      if (analysis.hasTypeScript) {
        if (!content.includes('interface') && content.includes('Props')) {
          issues.push({
            type: 'missing-interface',
            description: 'Component should define TypeScript interface for props',
            suggestion: this.generatePropsInterface(analysis)
          });
        }
      }
      
      // Check React patterns
      if (analysis.hasReact) {
        if (!content.includes('React.FC') && content.includes('export const')) {
          issues.push({
            type: 'missing-fc-type',
            description: 'Component should use React.FC type',
            suggestion: 'Add React.FC<PropsInterface> type annotation'
          });
        }
      }
      
      // Check animation patterns
      if (analysis.hasFramerMotion) {
        if (!content.includes('initial=') && content.includes('<motion.')) {
          issues.push({
            type: 'missing-animation-props',
            description: 'Motion components should include initial animation state',
            suggestion: 'Add initial={{ opacity: 0, y: 20 }} prop'
          });
        }
      }
      
      // Check Tailwind patterns
      if (content.includes('className')) {
        const classNames = this.extractClassNames(content);
        const invalidClasses = this.validateTailwindClasses(classNames);
        if (invalidClasses.length > 0) {
          issues.push({
            type: 'invalid-tailwind-classes',
            description: `Invalid Tailwind classes found: ${invalidClasses.join(', ')}`,
            suggestion: 'Use valid Tailwind CSS classes'
          });
        }
      }
      
      // Check for missing SEO component in pages
      if (filePath.includes('pages/') && !content.includes('SEO')) {
        issues.push({
          type: 'missing-seo',
          description: 'Page components should include SEO component',
          suggestion: 'Import and use SEO component from ../components/common/SEO'
        });
      }
      
    } catch (error) {
      this.error(`Failed to check architectural compliance for ${filePath}`, error);
    }
    
    return issues;
  }

  async fixArchitecturalIssues(filePath, issues) {
    try {
      let content = await this.read(filePath);
      let modified = false;
      
      for (const issue of issues) {
        this.log(`Fixing issue: ${issue.description}`);
        
        switch (issue.type) {
          case 'missing-interface':
            if (issue.suggestion) {
              // Add interface at the top of the file after imports
              const importEndIndex = content.lastIndexOf("import");
              const nextLineIndex = content.indexOf('\n', importEndIndex);
              const beforeInterface = content.substring(0, nextLineIndex + 1);
              const afterInterface = content.substring(nextLineIndex + 1);
              content = beforeInterface + '\n' + issue.suggestion + '\n' + afterInterface;
              modified = true;
            }
            break;
            
          case 'missing-fc-type':
            // Add React.FC type annotation
            const componentMatch = content.match(/export const (\w+) = \(/);
            if (componentMatch) {
              const componentName = componentMatch[1];
              const propsInterfaceName = `${componentName}Props`;
              content = content.replace(
                `export const ${componentName} = (`,
                `export const ${componentName}: React.FC<${propsInterfaceName}> = (`
              );
              modified = true;
            }
            break;
            
          case 'missing-animation-props':
            // Add basic animation props to motion components
            content = content.replace(
              /<motion\.(\w+)(?!\s+initial)/g,
              '<motion.$1\n      initial={{ opacity: 0, y: 20 }}\n      animate={{ opacity: 1, y: 0 }}\n      transition={{ duration: 0.6 }}'
            );
            modified = true;
            break;
            
          case 'missing-seo':
            // Add SEO import and component
            if (!content.includes("import { SEO }")) {
              content = content.replace(
                "import React from 'react';",
                "import React from 'react';\nimport { SEO } from '../components/common/SEO';"
              );
            }
            
            // Add SEO component to the JSX
            if (!content.includes('<SEO')) {
              content = content.replace(
                'return (',
                'return (\n    <>\n      <SEO title="Page Title" description="Page description" />'
              );
              content = content.replace(/\);$/, '\n    </>\n  );');
            }
            modified = true;
            break;
        }
      }
      
      if (modified) {
        await this.write(filePath, content);
        this.log(`Fixed ${issues.length} architectural issues in ${filePath}`);
      }
      
    } catch (error) {
      this.error(`Failed to fix architectural issues in ${filePath}`, error);
    }
  }

  generatePropsInterface(analysis) {
    const componentName = analysis.components[0] || 'Component';
    return `interface ${componentName}Props {
  className?: string;
  children?: React.ReactNode;
}`;
  }

  extractClassNames(content) {
    const classRegex = /className\s*=\s*["']([^"']*)["']/g;
    const classes = [];
    let match;
    
    while ((match = classRegex.exec(content)) !== null) {
      classes.push(...match[1].split(' ').filter(cls => cls.length > 0));
    }
    
    return classes;
  }

  validateTailwindClasses(classNames) {
    // Basic Tailwind validation - could be expanded
    const invalidClasses = [];
    const commonPatterns = [
      /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
      /^text-(black|white|gray|red|yellow|green|blue|indigo|purple|pink)-\d{2,3}$/,
      /^bg-(black|white|gray|red|yellow|green|blue|indigo|purple|pink)-\d{2,3}$/,
      /^p[xyrtbl]?-\d+$/,
      /^m[xyrtbl]?-\d+$/,
      /^w-(\d+|full|auto|screen|min|max|fit)$/,
      /^h-(\d+|full|auto|screen|min|max|fit)$/
    ];
    
    for (const className of classNames) {
      const isValid = commonPatterns.some(pattern => pattern.test(className)) ||
                     ['flex', 'grid', 'block', 'inline', 'hidden', 'relative', 'absolute', 'fixed', 'sticky'].includes(className);
      
      if (!isValid && !className.startsWith('hover:') && !className.startsWith('focus:')) {
        invalidClasses.push(className);
      }
    }
    
    return invalidClasses;
  }

  compareAnalysis(oldAnalysis, newAnalysis) {
    if (!oldAnalysis) {
      return { significant: true, description: 'New component created' };
    }
    
    const changes = {
      significant: false,
      description: '',
      details: []
    };
    
    // Check for new imports
    const newImports = newAnalysis.imports.filter(imp => !oldAnalysis.imports.includes(imp));
    if (newImports.length > 0) {
      changes.significant = true;
      changes.details.push(`New imports: ${newImports.join(', ')}`);
    }
    
    // Check for new components
    const newComponents = newAnalysis.components.filter(comp => !oldAnalysis.components.includes(comp));
    if (newComponents.length > 0) {
      changes.significant = true;
      changes.details.push(`New components: ${newComponents.join(', ')}`);
    }
    
    // Check for new hooks
    const newHooks = newAnalysis.hooks.filter(hook => !oldAnalysis.hooks.includes(hook));
    if (newHooks.length > 0) {
      changes.significant = true;
      changes.details.push(`New hooks: ${newHooks.join(', ')}`);
    }
    
    changes.description = changes.details.join('; ');
    
    return changes;
  }

  async updateDependentComponents(filePath, changes) {
    try {
      // Find components that import this file
      const importPath = filePath.replace(/\\/g, '/').replace('.tsx', '').replace('src/', '../');
      const dependents = await this.grep(`from ['"]${importPath}['"]`, {
        glob: 'src/**/*.tsx',
        outputMode: 'files_with_matches'
      });
      
      if (dependents.length > 0) {
        this.log(`Found ${dependents.length} dependent components for ${filePath}`);
        
        // Could implement specific update logic based on changes
        for (const dependent of dependents) {
          this.log(`Dependent component may need review: ${dependent}`);
        }
      }
      
    } catch (error) {
      this.error(`Failed to update dependent components for ${filePath}`, error);
    }
  }

  async suggestComponentImprovements() {
    this.log('Analyzing components for improvement suggestions');
    
    try {
      for (const [filePath, analysis] of this.componentRegistry) {
        const suggestions = [];
        
        // Suggest memoization for complex components
        if (analysis.functions.length > 5 && !analysis.imports.includes('memo')) {
          suggestions.push('Consider using React.memo for performance optimization');
        }
        
        // Suggest custom hooks for repeated logic
        if (analysis.hooks.length > 3) {
          suggestions.push('Consider extracting custom hooks for reusable logic');
        }
        
        // Suggest proper TypeScript usage
        if (!analysis.hasTypeScript && analysis.hasReact) {
          suggestions.push('Consider adding TypeScript interfaces for better type safety');
        }
        
        if (suggestions.length > 0) {
          this.log(`Suggestions for ${filePath}:`);
          suggestions.forEach(suggestion => this.log(`  - ${suggestion}`));
        }
      }
      
    } catch (error) {
      this.error('Failed to suggest component improvements', error);
    }
  }

  async validateTypeScriptPatterns() {
    this.log('Validating TypeScript patterns across components');
    
    try {
      const tsFiles = await this.grep('\\.tsx?$', {
        glob: 'src/**/*',
        outputMode: 'files_with_matches'
      });
      
      for (const filePath of tsFiles) {
        const content = await this.read(filePath);
        const issues = [];
        
        // Check for any types
        if (content.includes(': any')) {
          issues.push('Contains "any" types - consider using specific types');
        }
        
        // Check for proper interface naming
        const interfaces = content.match(/interface\s+(\w+)/g);
        if (interfaces) {
          interfaces.forEach(interfaceDecl => {
            const name = interfaceDecl.split(' ')[1];
            if (!this.projectPatterns.propsNaming.test(name) && !name.endsWith('Data')) {
              issues.push(`Interface "${name}" doesn't follow naming convention`);
            }
          });
        }
        
        if (issues.length > 0) {
          this.log(`TypeScript issues in ${filePath}:`);
          issues.forEach(issue => this.log(`  - ${issue}`));
        }
      }
      
    } catch (error) {
      this.error('Failed to validate TypeScript patterns', error);
    }
  }

  async performArchitectureReview() {
    this.log('Performing comprehensive architecture review');
    
    try {
      // Rebuild component registry
      await this.buildComponentRegistry();
      
      // Generate architecture report
      const report = {
        totalComponents: this.componentRegistry.size,
        componentsByType: this.categorizeComponents(),
        architecturalHealth: await this.assessArchitecturalHealth(),
        recommendations: await this.generateRecommendations()
      };
      
      // Write report
      const reportPath = '.claude/subagents/logs/architecture-report.json';
      await this.write(reportPath, JSON.stringify(report, null, 2));
      
      this.log(`Architecture review completed. Report saved to ${reportPath}`);
      
    } catch (error) {
      this.error('Failed to perform architecture review', error);
    }
  }

  categorizeComponents() {
    const categories = {
      animations: 0,
      common: 0,
      layout: 0,
      sections: 0,
      pages: 0,
      other: 0
    };
    
    for (const filePath of this.componentRegistry.keys()) {
      if (filePath.includes('animations/')) categories.animations++;
      else if (filePath.includes('common/')) categories.common++;
      else if (filePath.includes('layout/')) categories.layout++;
      else if (filePath.includes('sections/')) categories.sections++;
      else if (filePath.includes('pages/')) categories.pages++;
      else categories.other++;
    }
    
    return categories;
  }

  async assessArchitecturalHealth() {
    let score = 100;
    const issues = [];
    
    for (const [filePath, analysis] of this.componentRegistry) {
      // Check TypeScript usage
      if (!analysis.hasTypeScript) {
        score -= 5;
        issues.push(`${filePath}: Missing TypeScript`);
      }
      
      // Check for proper React patterns
      if (analysis.hasReact && !analysis.imports.includes('React')) {
        score -= 3;
        issues.push(`${filePath}: Missing React import`);
      }
      
      // Check component complexity
      if (analysis.functions.length > 10) {
        score -= 2;
        issues.push(`${filePath}: High complexity (${analysis.functions.length} functions)`);
      }
    }
    
    return {
      score: Math.max(0, score),
      issues,
      grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D'
    };
  }

  async generateRecommendations() {
    const recommendations = [];
    
    // Analyze component distribution
    const categories = this.categorizeComponents();
    if (categories.other > categories.animations + categories.common) {
      recommendations.push('Consider organizing miscellaneous components into appropriate categories');
    }
    
    // Analyze TypeScript adoption
    let tsComponents = 0;
    for (const analysis of this.componentRegistry.values()) {
      if (analysis.hasTypeScript) tsComponents++;
    }
    
    const tsPercentage = (tsComponents / this.componentRegistry.size) * 100;
    if (tsPercentage < 90) {
      recommendations.push(`Increase TypeScript adoption (currently ${tsPercentage.toFixed(1)}%)`);
    }
    
    return recommendations;
  }

  async updateComponentDocumentation(filePath, analysis) {
    // Could generate or update component documentation
    // For now, just log the component info
    this.log(`Component documented: ${analysis.components.join(', ')} in ${filePath}`);
  }
}

module.exports = ComponentArchitectAgent;