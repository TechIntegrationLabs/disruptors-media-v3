const BaseAgent = require('./base-agent');
const path = require('path');

class DocumentationMaintainerAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.documentationConfig = {
      mainClaude: 'CLAUDE.md',
      directories: {
        'src': {
          purpose: 'Source code structure and component architecture',
          sections: ['Overview', 'Component Architecture', 'Pages Structure', 'Data Management', 'Development Patterns']
        },
        'docs': {
          purpose: 'Comprehensive documentation ecosystem and project specifications',
          sections: ['Overview', 'Documentation Structure', 'Project Management', 'Asset Management', 'Legacy Content']
        },
        'public': {
          purpose: 'Static assets management and optimization strategies',
          sections: ['Overview', 'Asset Organization', 'PWA Configuration', 'SEO Management', 'Performance Guidelines']
        },
        'scripts': {
          purpose: 'Automation scripts and development workflow tools',
          sections: ['Overview', 'Automation Scripts', 'Content Generation', 'Development Environment', 'Monitoring']
        },
        'todo': {
          purpose: 'Project management system and task tracking',
          sections: ['Overview', 'Project Status', 'Development Roadmap', 'Technical Architecture', 'Quality Assurance']
        },
        'build': {
          purpose: 'Build artifacts and production optimization',
          sections: ['Overview', 'Build Process', 'Optimization', 'Deployment', 'Performance Metrics']
        },
        '.claude': {
          purpose: 'Claude Code configuration and subagent system',
          sections: ['Overview', 'Subagent System', 'Configuration', 'Monitoring', 'Tool Integration']
        }
      },
      templates: {
        header: `# CLAUDE.md - {DirectoryName}

This file provides guidance for working with the {directoryPurpose} of the Disruptors Media v3 project.

## Overview

{overview}

## Directory Structure

\`\`\`
{directoryStructure}
\`\`\`
`,
        section: `## {SectionName}

{sectionContent}
`,
        footer: `
---

**Part of the Disruptors Media v3 Documentation Ecosystem**

- [Main Documentation](../CLAUDE.md) - Project overview and core guidance
- [Source Code](../src/CLAUDE.md) - Component architecture and development patterns  
- [Documentation System](../docs/CLAUDE.md) - Comprehensive project documentation
- [Public Assets](../public/CLAUDE.md) - Asset management and optimization
- [Project Management](../todo/CLAUDE.md) - Status tracking and roadmap
- [Automation Scripts](../scripts/CLAUDE.md) - Development workflow automation

*Last updated: {timestamp}*
*Maintained by: Documentation Maintainer Agent*
`
      },
      monitoring: {
        checkInterval: 3600000, // 1 hour
        outdatedThreshold: 604800000, // 1 week
        syncWithMain: true,
        autoUpdate: true
      }
    };
    this.documentationRegistry = new Map();
    this.crossReferences = new Map();
    this.lastSync = null;
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_created':
        case 'file_modified':
          await this.handleDocumentationChange(context.filePath);
          break;
        case 'interval':
          await this.performScheduledMaintenance();
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.performFullDocumentationSync();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute documentation maintainer agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load existing documentation structure
    await this.scanDocumentationStructure();
    await this.loadCrossReferences();
    await this.validateMainClaude();
  }

  async scanDocumentationStructure() {
    try {
      // Find all CLAUDE.md files
      const claudeFiles = await this.glob('CLAUDE.md', '.');
      const nestedClaudeFiles = await this.glob('**/CLAUDE.md', '.');
      const allClaudeFiles = [...claudeFiles, ...nestedClaudeFiles];
      
      for (const filePath of allClaudeFiles) {
        await this.analyzeDocumentationFile(filePath);
      }
      
      // Find directories that should have CLAUDE.md files
      await this.identifyMissingDocumentation();
      
      this.log(`Found ${this.documentationRegistry.size} documentation files`);
    } catch (error) {
      this.error('Failed to scan documentation structure', error);
    }
  }

  async analyzeDocumentationFile(filePath) {
    try {
      const content = await this.read(filePath);
      const directory = path.dirname(filePath);
      
      const analysis = {
        filePath,
        directory,
        lastModified: await this.getFileModificationTime(filePath),
        wordCount: this.countWords(content),
        sections: this.extractSections(content),
        crossReferences: this.extractCrossReferences(content),
        isMainClaude: filePath === this.documentationConfig.mainClaude,
        isOutdated: await this.checkIfOutdated(filePath),
        hasProperStructure: this.validateDocumentationStructure(content),
        issues: [],
        suggestions: []
      };
      
      // Detect documentation issues
      analysis.issues = await this.detectDocumentationIssues(content, analysis);
      
      // Generate improvement suggestions
      analysis.suggestions = await this.generateDocumentationSuggestions(content, analysis);
      
      this.documentationRegistry.set(filePath, analysis);
      
    } catch (error) {
      this.error(`Failed to analyze documentation file: ${filePath}`, error);
    }
  }

  async getFileModificationTime(filePath) {
    try {
      const stats = await this.bash(`stat -c %Y "${filePath}"`, 'Get file modification time');
      return new Date(parseInt(stats.trim()) * 1000);
    } catch (error) {
      return new Date();
    }
  }

  countWords(content) {
    const textContent = content.replace(/```[\\s\\S]*?```/g, '').replace(/`[^`]*`/g, '');
    return textContent.split(/\\s+/).filter(word => word.length > 0).length;
  }

  extractSections(content) {
    const sections = [];
    const headingRegex = /^(#+)\\s+(.+)$/gm;
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      sections.push({
        level: match[1].length,
        title: match[2].trim(),
        line: this.getLineNumber(content, match.index)
      });
    }
    
    return sections;
  }

  getLineNumber(content, index) {
    return content.substring(0, index).split('\\n').length;
  }

  extractCrossReferences(content) {
    const references = [];
    
    // Extract markdown links
    const linkRegex = /\\[([^\\]]+)\\]\\(([^)]+)\\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const text = match[1];
      const url = match[2];
      
      if (url.endsWith('.md') || url.includes('CLAUDE.md')) {
        references.push({
          text,
          url,
          type: 'internal',
          valid: null // Will be validated later
        });
      }
    }
    
    return references;
  }

  async checkIfOutdated(filePath) {
    try {
      const fileModTime = await this.getFileModificationTime(filePath);
      const directory = path.dirname(filePath);
      
      // Check if directory has been modified more recently than documentation
      const dirFiles = await this.glob('*', directory);
      
      for (const file of dirFiles) {
        if (file !== filePath && !file.includes('.git')) {
          const fileTime = await this.getFileModificationTime(file);
          if (fileTime > fileModTime) {
            return true;
          }
        }
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  validateDocumentationStructure(content) {
    const requiredElements = [
      '# CLAUDE.md',
      '## Overview',
      'This file provides guidance'
    ];
    
    return requiredElements.every(element => content.includes(element));
  }

  async detectDocumentationIssues(content, analysis) {
    const issues = [];
    
    // Check for missing required sections
    const expectedSections = this.documentationConfig.directories[analysis.directory]?.sections || [];
    for (const expectedSection of expectedSections) {
      if (!analysis.sections.some(section => section.title.includes(expectedSection))) {
        issues.push({
          type: 'missing-section',
          severity: 'medium',
          message: `Missing required section: ${expectedSection}`,
          suggestion: `Add section ## ${expectedSection}`
        });
      }
    }
    
    // Check for broken cross-references
    for (const ref of analysis.crossReferences) {
      const isValid = await this.validateCrossReference(ref, analysis.directory);
      if (!isValid) {
        issues.push({
          type: 'broken-reference',
          severity: 'high',
          message: `Broken reference: ${ref.text} -> ${ref.url}`,
          suggestion: 'Fix or remove broken link'
        });
      }
    }
    
    // Check for outdated content
    if (analysis.isOutdated) {
      issues.push({
        type: 'outdated-content',
        severity: 'medium',
        message: 'Documentation appears outdated compared to source files',
        suggestion: 'Review and update documentation to reflect recent changes'
      });
    }
    
    // Check word count
    if (analysis.wordCount < 100) {
      issues.push({
        type: 'insufficient-content',
        severity: 'high',
        message: `Documentation is too brief (${analysis.wordCount} words)`,
        suggestion: 'Expand documentation with more detailed guidance'
      });
    }
    
    // Check for proper structure
    if (!analysis.hasProperStructure) {
      issues.push({
        type: 'invalid-structure',
        severity: 'high',
        message: 'Documentation does not follow standard CLAUDE.md structure',
        suggestion: 'Use standard template structure'
      });
    }
    
    return issues;
  }

  async validateCrossReference(ref, fromDirectory) {
    try {
      const targetPath = path.resolve(fromDirectory, ref.url);
      return await this.fileExists(targetPath);
    } catch (error) {
      return false;
    }
  }

  async generateDocumentationSuggestions(content, analysis) {
    const suggestions = [];
    
    // Suggest cross-references to related documentation
    if (analysis.crossReferences.length < 3) {
      suggestions.push({
        type: 'cross-references',
        message: 'Add more cross-references to related documentation',
        implementation: 'Link to relevant CLAUDE.md files in other directories'
      });
    }
    
    // Suggest code examples
    if (!content.includes('```') && analysis.directory === 'src') {
      suggestions.push({
        type: 'code-examples',
        message: 'Add code examples to illustrate concepts',
        implementation: 'Include TypeScript/React code snippets'
      });
    }
    
    // Suggest usage patterns
    if (!content.includes('Usage:') && !content.includes('Example:')) {
      suggestions.push({
        type: 'usage-patterns',
        message: 'Add usage patterns and examples',
        implementation: 'Include practical usage examples'
      });
    }
    
    // Suggest integration points
    if (!content.includes('Integration') && analysis.directory !== '.') {
      suggestions.push({
        type: 'integration-info',
        message: 'Document integration points with other systems',
        implementation: 'Explain how this directory integrates with the project'
      });
    }
    
    return suggestions;
  }

  async identifyMissingDocumentation() {
    try {
      // Check each configured directory
      for (const [dirName, dirConfig] of Object.entries(this.documentationConfig.directories)) {
        const claudePath = path.join(dirName, 'CLAUDE.md');
        
        if (await this.fileExists(dirName) && !await this.fileExists(claudePath)) {
          this.log(`Missing documentation: ${claudePath}`);
          await this.createMissingDocumentation(dirName, dirConfig);
        }
      }
    } catch (error) {
      this.error('Failed to identify missing documentation', error);
    }
  }

  async createMissingDocumentation(directory, config) {
    try {
      const claudePath = path.join(directory, 'CLAUDE.md');
      
      // Generate documentation content
      const content = await this.generateDocumentationContent(directory, config);
      
      // Write documentation file
      await this.write(claudePath, content);
      
      this.log(`Created documentation: ${claudePath}`);
      
      // Analyze the new file
      await this.analyzeDocumentationFile(claudePath);
      
    } catch (error) {
      this.error(`Failed to create documentation for ${directory}`, error);
    }
  }

  async generateDocumentationContent(directory, config) {
    const directoryName = directory.charAt(0).toUpperCase() + directory.slice(1);
    const overview = await this.generateDirectoryOverview(directory);
    const directoryStructure = await this.generateDirectoryStructure(directory);
    
    // Start with header
    let content = this.documentationConfig.templates.header
      .replace('{DirectoryName}', directoryName)
      .replace('{directoryPurpose}', config.purpose)
      .replace('{overview}', overview)
      .replace('{directoryStructure}', directoryStructure);
    
    // Add sections
    for (const sectionName of config.sections) {
      const sectionContent = await this.generateSectionContent(directory, sectionName);
      const section = this.documentationConfig.templates.section
        .replace('{SectionName}', sectionName)
        .replace('{sectionContent}', sectionContent);
      
      content += section;
    }
    
    // Add footer with cross-references
    const footer = this.documentationConfig.templates.footer
      .replace('{timestamp}', new Date().toISOString().split('T')[0]);
    
    content += footer;
    
    return content;
  }

  async generateDirectoryOverview(directory) {
    const config = this.documentationConfig.directories[directory];
    
    switch (directory) {
      case 'src':
        return `The \`/src/\` directory contains all React components, pages, and data management logic. This is a modern React 19 application with TypeScript, organized using a clear component-based architecture with separation of concerns.`;
      
      case 'docs':
        return `The \`/docs/\` directory contains a comprehensive documentation ecosystem covering project specifications, technical implementation, asset management, and legacy content archives. This system serves as the knowledge base for development, deployment, and maintenance.`;
      
      case 'public':
        return `The \`/public/\` directory contains static assets, PWA configuration, and SEO-related files. This includes optimized images, fonts, manifest files, and other resources served directly by the web server.`;
      
      case 'scripts':
        return `The \`/scripts/\` directory contains automation tools for streamlining development workflows, content generation, and repository management. These scripts enhance developer productivity through automated processes.`;
      
      case 'todo':
        return `The \`/todo/\` directory contains comprehensive project management documentation, status assessments, technical architecture summaries, and development roadmaps for tracking project evolution.`;
      
      case 'build':
        return `The \`/build/\` directory contains production build artifacts, optimized bundles, and deployment-ready files generated by the build process.`;
      
      case '.claude':
        return `The \`/.claude/\` directory contains Claude Code configuration, subagent system files, and monitoring tools for enhanced development workflow automation.`;
      
      default:
        return `The \`/${directory}/\` directory ${config.purpose}.`;
    }
  }

  async generateDirectoryStructure(directory) {
    try {
      const files = await this.bash(`find "${directory}" -type f -name "*.md" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.json" | head -20`, 'Get directory structure');
      
      const structure = files.trim().split('\\n')
        .filter(file => file.length > 0)
        .map(file => file.replace(directory + '/', ''))
        .sort()
        .map(file => `├── ${file}`)
        .join('\\n');
      
      return `${directory}/\\n${structure}`;
    } catch (error) {
      return `${directory}/\\n├── (files)`;
    }
  }

  async generateSectionContent(directory, sectionName) {
    // Generate contextual content based on directory and section
    const contentMap = {
      'src': {
        'Overview': 'React 19 application with TypeScript, component-based architecture.',
        'Component Architecture': 'Organized into animations/, common/, layout/, and sections/ directories.',
        'Pages Structure': 'Route-level components with nested service pages and dynamic routes.',
        'Data Management': 'Static data files with Google Sheets integration for client data.',
        'Development Patterns': 'TypeScript-first approach with React Hook Form and Framer Motion.'
      },
      'docs': {
        'Overview': 'Comprehensive documentation ecosystem with specialized guides.',
        'Documentation Structure': 'Organized by purpose with cross-references and navigation.',
        'Project Management': 'Status tracking, roadmaps, and development priorities.',
        'Asset Management': 'Cloudinary integration guides and optimization strategies.',
        'Legacy Content': 'Historical content archives and migration documentation.'
      },
      'public': {
        'Overview': 'Static assets served directly by the web server.',
        'Asset Organization': 'Images, fonts, icons organized by category and usage.',
        'PWA Configuration': 'Manifest.json and service worker configuration.',
        'SEO Management': 'Robots.txt, sitemap.xml, and meta tag optimization.',
        'Performance Guidelines': 'Asset optimization and caching strategies.'
      },
      'scripts': {
        'Overview': 'Automation tools for development workflow enhancement.',
        'Automation Scripts': 'Git automation, content generation, and monitoring tools.',
        'Content Generation': 'AI-powered content creation and image generation.',
        'Development Environment': 'Development server integration and process management.',
        'Monitoring': 'Script health checks, logging, and performance tracking.'
      },
      'todo': {
        'Overview': 'Project management and task tracking system.',
        'Project Status': 'Current completion metrics and milestone tracking.',
        'Development Roadmap': 'Prioritized development timeline and feature planning.',
        'Technical Architecture': 'System architecture documentation and integration points.',
        'Quality Assurance': 'Testing strategies and launch readiness checklists.'
      }
    };
    
    const content = contentMap[directory]?.[sectionName];
    return content || `Documentation for ${sectionName} in ${directory} directory.`;
  }

  async loadCrossReferences() {
    try {
      // Build map of all cross-references for validation
      for (const [filePath, analysis] of this.documentationRegistry) {
        for (const ref of analysis.crossReferences) {
          this.crossReferences.set(`${filePath}->${ref.url}`, ref);
        }
      }
      
      this.log(`Loaded ${this.crossReferences.size} cross-references`);
    } catch (error) {
      this.error('Failed to load cross-references', error);
    }
  }

  async validateMainClaude() {
    try {
      if (!await this.fileExists(this.documentationConfig.mainClaude)) {
        this.log('Main CLAUDE.md not found - creating comprehensive version');
        await this.createMainClaude();
      } else {
        // Validate and update main CLAUDE.md
        await this.updateMainClaude();
      }
    } catch (error) {
      this.error('Failed to validate main CLAUDE.md', error);
    }
  }

  async createMainClaude() {
    const mainContent = await this.generateMainClaudeContent();
    await this.write(this.documentationConfig.mainClaude, mainContent);
    this.log('Created comprehensive main CLAUDE.md');
  }

  async generateMainClaudeContent() {
    return `# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Disruptors Media v3 React application - a modern marketing website built with React 19, TypeScript, and comprehensive automation systems.

## Documentation Ecosystem

This repository uses a comprehensive CLAUDE.md documentation system to provide detailed guidance for each major directory:

### Core Documentation Files

- **[Source Code Structure](src/CLAUDE.md)** - Component architecture, pages, and development patterns
- **[Documentation System](docs/CLAUDE.md)** - Project specifications and comprehensive guides  
- **[Public Assets](public/CLAUDE.md)** - Static asset management and optimization
- **[Automation Scripts](scripts/CLAUDE.md)** - Development workflow automation tools
- **[Project Management](todo/CLAUDE.md)** - Status tracking and development roadmap
- **[Build System](build/CLAUDE.md)** - Production build and deployment artifacts
- **[Claude Configuration](.claude/CLAUDE.md)** - Subagent system and tool integration

## Quick Start Commands

### Core Development
\`\`\`bash
npm install          # Install dependencies
npm start           # Development server (localhost:3000)
npm run build       # Production build
npm test            # Run tests
\`\`\`

### Specialized Workflows
\`\`\`bash
npm run auto-commit         # Automated git commits
npm run clients:sync        # Sync client data from Google Sheets
npm run dev:auto           # Development with auto-commit enabled
\`\`\`

## Technology Stack

- **React 19.1.1** with TypeScript 4.9.5
- **Framer Motion 12.23.12** + **GSAP 3.13.0** for animations
- **Tailwind CSS 3.4.17** with custom design system
- **Cloudinary** (cloud name: dvcvxhzmt) for asset management
- **Google Sheets** integration for client data

## Architecture Highlights

- Component-based architecture with 20+ reusable sections
- Advanced animation system with GSAP and Framer Motion
- Automated git commit system with intelligent message generation
- Comprehensive documentation ecosystem with cross-references
- Performance optimization with bundle analysis and monitoring

## Subagent System

This project includes an advanced subagent system for automated development workflows:

- **Component Architect** - TypeScript pattern recognition and component optimization
- **Cloudinary Optimizer** - Asset management automation
- **Performance Auditor** - Automated optimization checks
- **SEO Optimizer** - Content analysis and optimization
- **Form Integration Expert** - Backend connection automation
- **Content Generator** - Automated content workflows
- **Documentation Maintainer** - CLAUDE.md ecosystem management

## Important Instructions

- **ALWAYS** prefer editing existing files over creating new ones
- **NEVER** create documentation files unless explicitly requested
- Follow the established TypeScript and React patterns
- Use the existing CLAUDE.md files for context and guidance
- Reference the appropriate directory-specific documentation

---

*This documentation is maintained by the Documentation Maintainer Agent*
*Last updated: ${new Date().toISOString().split('T')[0]}*
`;
  }

  async updateMainClaude() {
    try {
      const mainContent = await this.read(this.documentationConfig.mainClaude);
      const analysis = await this.analyzeDocumentationFile(this.documentationConfig.mainClaude);
      
      if (analysis.issues.length > 0) {
        this.log('Updating main CLAUDE.md with improvements');
        const updatedContent = await this.generateMainClaudeContent();
        await this.write(this.documentationConfig.mainClaude, updatedContent);
      }
      
    } catch (error) {
      this.error('Failed to update main CLAUDE.md', error);
    }
  }

  async handleDocumentationChange(filePath) {
    this.log(`Documentation change detected: ${filePath}`);
    
    try {
      if (filePath.endsWith('CLAUDE.md')) {
        // Re-analyze the changed documentation
        await this.analyzeDocumentationFile(filePath);
        
        // Update cross-references if needed
        await this.updateCrossReferences(filePath);
        
        // Check if main CLAUDE.md needs updating
        await this.checkMainClaudeSync();
      }
      
    } catch (error) {
      this.error(`Failed to handle documentation change for ${filePath}`, error);
    }
  }

  async updateCrossReferences(filePath) {
    try {
      const analysis = this.documentationRegistry.get(filePath);
      if (!analysis) return;
      
      // Validate all cross-references from this file
      for (const ref of analysis.crossReferences) {
        const isValid = await this.validateCrossReference(ref, analysis.directory);
        ref.valid = isValid;
        
        if (!isValid) {
          this.log(`Broken reference in ${filePath}: ${ref.text} -> ${ref.url}`);
        }
      }
      
    } catch (error) {
      this.error(`Failed to update cross-references for ${filePath}`, error);
    }
  }

  async checkMainClaudeSync() {
    try {
      // Check if directory structure has changed
      const directories = Object.keys(this.documentationConfig.directories);
      const missingDocs = [];
      
      for (const dir of directories) {
        const claudePath = path.join(dir, 'CLAUDE.md');
        if (await this.fileExists(dir) && !await this.fileExists(claudePath)) {
          missingDocs.push(dir);
        }
      }
      
      if (missingDocs.length > 0) {
        this.log(`Missing documentation detected: ${missingDocs.join(', ')}`);
        await this.updateMainClaude();
      }
      
    } catch (error) {
      this.error('Failed to check main CLAUDE.md sync', error);
    }
  }

  async performScheduledMaintenance() {
    this.log('Performing scheduled documentation maintenance');
    
    try {
      // Re-scan all documentation
      await this.scanDocumentationStructure();
      
      // Check for outdated documentation
      const outdatedDocs = Array.from(this.documentationRegistry.values())
        .filter(analysis => analysis.isOutdated);
      
      if (outdatedDocs.length > 0) {
        this.log(`Found ${outdatedDocs.length} outdated documentation files`);
        
        for (const doc of outdatedDocs) {
          await this.updateOutdatedDocumentation(doc);
        }
      }
      
      // Validate all cross-references
      await this.validateAllCrossReferences();
      
      // Update last sync time
      this.lastSync = new Date();
      
    } catch (error) {
      this.error('Failed to perform scheduled maintenance', error);
    }
  }

  async updateOutdatedDocumentation(docAnalysis) {
    try {
      this.log(`Updating outdated documentation: ${docAnalysis.filePath}`);
      
      const directory = docAnalysis.directory;
      const config = this.documentationConfig.directories[directory];
      
      if (config) {
        // Regenerate content for the directory
        const updatedContent = await this.generateDocumentationContent(directory, config);
        
        // Preserve any custom content from existing file
        const existingContent = await this.read(docAnalysis.filePath);
        const mergedContent = await this.mergeDocumentationContent(existingContent, updatedContent);
        
        await this.write(docAnalysis.filePath, mergedContent);
        this.log(`Updated documentation: ${docAnalysis.filePath}`);
      }
      
    } catch (error) {
      this.error(`Failed to update outdated documentation: ${docAnalysis.filePath}`, error);
    }
  }

  async mergeDocumentationContent(existing, generated) {
    // Simple merge strategy - keep custom sections, update standard ones
    const lines = existing.split('\\n');
    const customSections = [];
    let inCustomSection = false;
    
    for (const line of lines) {
      if (line.startsWith('## ') && !this.isStandardSection(line)) {
        inCustomSection = true;
        customSections.push(line);
      } else if (line.startsWith('## ') && this.isStandardSection(line)) {
        inCustomSection = false;
      } else if (inCustomSection) {
        customSections.push(line);
      }
    }
    
    // Append custom sections to generated content
    if (customSections.length > 0) {
      return generated + '\\n\\n' + customSections.join('\\n');
    }
    
    return generated;
  }

  isStandardSection(line) {
    const standardSections = ['Overview', 'Directory Structure', 'Component Architecture', 'Documentation Structure'];
    return standardSections.some(section => line.includes(section));
  }

  async validateAllCrossReferences() {
    try {
      let totalRefs = 0;
      let brokenRefs = 0;
      
      for (const [filePath, analysis] of this.documentationRegistry) {
        for (const ref of analysis.crossReferences) {
          totalRefs++;
          const isValid = await this.validateCrossReference(ref, analysis.directory);
          
          if (!isValid) {
            brokenRefs++;
            this.log(`Broken reference: ${filePath} -> ${ref.url}`);
          }
        }
      }
      
      this.log(`Cross-reference validation: ${brokenRefs}/${totalRefs} broken references`);
      
    } catch (error) {
      this.error('Failed to validate cross-references', error);
    }
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'documentation':
        await this.performFullDocumentationSync();
        break;
      case 'claude':
        await this.syncAllClaudeFiles();
        break;
      case 'docs':
        await this.generateDocumentationReport();
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async syncAllClaudeFiles() {
    this.log('Syncing all CLAUDE.md files');
    
    try {
      // Ensure all directories have CLAUDE.md files
      await this.identifyMissingDocumentation();
      
      // Update all existing CLAUDE.md files
      for (const [filePath, analysis] of this.documentationRegistry) {
        if (analysis.issues.length > 0) {
          const directory = analysis.directory;
          const config = this.documentationConfig.directories[directory];
          
          if (config) {
            await this.updateOutdatedDocumentation(analysis);
          }
        }
      }
      
      // Update main CLAUDE.md
      await this.updateMainClaude();
      
      this.log('All CLAUDE.md files synchronized');
      
    } catch (error) {
      this.error('Failed to sync all CLAUDE files', error);
    }
  }

  async generateDocumentationReport() {
    try {
      const report = {
        timestamp: new Date().toISOString(),
        summary: {
          totalFiles: this.documentationRegistry.size,
          outdatedFiles: 0,
          missingFiles: 0,
          totalIssues: 0,
          totalWords: 0
        },
        files: [],
        crossReferences: {
          total: 0,
          broken: 0
        },
        recommendations: []
      };
      
      // Analyze each documentation file
      for (const [filePath, analysis] of this.documentationRegistry) {
        report.summary.totalWords += analysis.wordCount;
        report.summary.totalIssues += analysis.issues.length;
        
        if (analysis.isOutdated) {
          report.summary.outdatedFiles++;
        }
        
        report.files.push({
          path: filePath,
          wordCount: analysis.wordCount,
          issues: analysis.issues.length,
          sections: analysis.sections.length,
          crossReferences: analysis.crossReferences.length,
          isOutdated: analysis.isOutdated
        });
        
        // Count cross-references
        report.crossReferences.total += analysis.crossReferences.length;
        report.crossReferences.broken += analysis.crossReferences.filter(ref => ref.valid === false).length;
      }
      
      // Generate recommendations
      if (report.summary.outdatedFiles > 0) {
        report.recommendations.push(`Update ${report.summary.outdatedFiles} outdated documentation files`);
      }
      
      if (report.crossReferences.broken > 0) {
        report.recommendations.push(`Fix ${report.crossReferences.broken} broken cross-references`);
      }
      
      if (report.summary.totalWords / report.summary.totalFiles < 300) {
        report.recommendations.push('Expand documentation with more detailed content');
      }
      
      // Save report
      const reportPath = '.claude/subagents/logs/documentation-report.json';
      await this.write(reportPath, JSON.stringify(report, null, 2));
      
      this.log(`Documentation report generated: ${reportPath}`);
      this.log(`Summary: ${report.summary.totalFiles} files, ${report.summary.totalIssues} issues, ${report.summary.outdatedFiles} outdated`);
      
    } catch (error) {
      this.error('Failed to generate documentation report', error);
    }
  }

  async performFullDocumentationSync() {
    this.log('Performing full documentation synchronization');
    
    try {
      // Complete documentation scan and update
      await this.scanDocumentationStructure();
      await this.identifyMissingDocumentation();
      await this.syncAllClaudeFiles();
      await this.validateAllCrossReferences();
      
      // Generate comprehensive report
      await this.generateDocumentationReport();
      
      this.log('Full documentation synchronization complete');
      
    } catch (error) {
      this.error('Failed to perform full documentation sync', error);
    }
  }
}

module.exports = DocumentationMaintainerAgent;