# CLAUDE.md - Automation & Scripts System

This file provides guidance for working with the automation scripts and development tools in the Disruptors Media v3 project.

## Overview

The `/scripts/` directory contains automation tools for streamlining development workflows, content generation, and repository management. These scripts enhance developer productivity through automated git commits, content generation, and development environment management.

## Directory Structure

```
scripts/
├── auto-commit-agent.js        # Intelligent Git commit automation
├── dev-with-auto-commit.sh     # Development workflow automation
├── generate-blog-images.js     # AI-powered image generation
├── nano-banana-generate.js     # Content automation tool
├── generated-images/           # AI-generated blog images  
└── nano-banana-outputs/        # Generated content files
```

## Core Automation Scripts

### Intelligent Git Automation (`auto-commit-agent.js`)

**Purpose**: Automated git commit system with intelligent message generation

**Key Features**:
- **Intelligent Commit Messages**: AI-generated commit messages based on file changes
- **Change Detection**: Monitors file modifications and additions
- **Pattern Recognition**: Understands code changes and generates appropriate commit types
- **Safety Checks**: Prevents commits of sensitive data and validates changes

**Configuration**:
```javascript
const AUTO_COMMIT_CONFIG = {
  watchMode: true,                    // Enable continuous monitoring
  commitInterval: 300000,             // 5-minute commit intervals
  excludePatterns: ['.env', 'node_modules', '.DS_Store'],
  messagePatterns: {
    feat: 'New features and functionality',
    fix: 'Bug fixes and corrections', 
    docs: 'Documentation updates',
    style: 'Styling and UI changes',
    refactor: 'Code refactoring and optimization'
  }
};
```

**Usage Commands**:
```bash
npm run auto-commit         # Single auto-commit execution
npm run auto-commit:watch   # Continuous monitoring mode
npm run auto-commit:status  # Check system status
```

**Commit Message Generation**:
- Analyzes changed files and content
- Generates semantic commit messages following conventional commits
- Includes scope and description based on file patterns
- Handles multiple file types and change categories

**Example Generated Commits**:
```
feat(components): add responsive navigation dropdown system
fix(assets): resolve broken image paths in gallery section  
docs(readme): update installation and development instructions
style(layout): improve mobile responsiveness for header navigation
```

### Development Workflow Automation (`dev-with-auto-commit.sh`)

**Purpose**: Streamlined development environment with integrated auto-commit

**Features**:
- **Development Server**: Starts React development server
- **Auto-Commit Integration**: Enables automatic git commits during development
- **Process Management**: Handles multiple processes concurrently
- **Error Handling**: Graceful shutdown and error recovery

**Script Execution**:
```bash
#!/bin/bash
# Start development server with auto-commit monitoring
npm start &
DEV_SERVER_PID=$!

# Start auto-commit agent in watch mode
node scripts/auto-commit-agent.js --watch &
AUTO_COMMIT_PID=$!

# Handle script termination
trap "kill $DEV_SERVER_PID $AUTO_COMMIT_PID; exit" SIGINT SIGTERM

wait
```

**Usage**:
```bash
npm run dev:auto           # Development with auto-commit enabled
npm run dev:safe           # Development without auto-commit
./scripts/dev-with-auto-commit.sh  # Direct script execution
```

## Content Generation System

### AI Image Generation (`generate-blog-images.js`)

**Purpose**: Automated generation of blog post images using AI

**Capabilities**:
- **AI-Powered Generation**: Creates blog post header images
- **Style Consistency**: Maintains brand-consistent visual style
- **Batch Processing**: Generates multiple images in single execution
- **Optimization**: Automatically optimizes generated images

**Configuration**:
```javascript
const IMAGE_GENERATION_CONFIG = {
  style: 'professional marketing',
  dimensions: { width: 1200, height: 630 },
  format: 'webp',
  quality: 85,
  brandColors: ['#FFD700', '#2B2B2B', '#F1EDE9']
};
```

**Generated Image Storage**:
```
scripts/generated-images/
├── blog-ai-marketing-trends-2024.webp
├── studio-services-portfolio-showcase.webp
├── digital-transformation-case-study.webp
└── roi-calculator-announcement.webp
```

**Usage Commands**:
```bash
node scripts/generate-blog-images.js --topic="AI Marketing Trends"
npm run generate:images --batch  # Batch generation for all blog posts
```

### Content Automation Tool (`nano-banana-generate.js`)

**Purpose**: Automated content generation for blog posts, case studies, and marketing copy

**Features**:
- **Content Templates**: Pre-defined templates for different content types
- **AI Content Generation**: Leverages Google Generative AI for content creation
- **SEO Optimization**: Generates SEO-friendly titles, descriptions, and meta tags
- **Markdown Output**: Creates structured markdown files for easy integration

**Content Types**:
- Blog posts with SEO optimization
- Case study templates
- Service page content
- Social media copy
- Email newsletter content

**Output Structure**:
```
scripts/nano-banana-outputs/
├── blog-posts/
│   ├── 2024-ai-marketing-trends.md
│   └── studio-photography-guide.md  
├── case-studies/
│   ├── client-transformation-story.md
│   └── roi-improvement-case-study.md
└── marketing-copy/
    ├── service-descriptions.md
    └── social-media-posts.md
```

**Usage Examples**:
```bash
# Generate blog post
node scripts/nano-banana-generate.js --type=blog --topic="AI Marketing ROI"

# Generate case study  
npm run generate:content --type=case-study --client="TechCorp"

# Batch content generation
npm run generate:batch --template=all
```

## Development Environment Integration

### Workflow Integration Commands

**Specialized Development Workflows**:
```bash
npm run dev:auto           # Development server with auto-commit
npm run dev:safe           # Development server without automation
npm run dev:content        # Development with content generation tools
npm run dev:full           # Full development environment with all automations
```

**Content Generation Workflows**:
```bash
npm run generate:images    # Generate blog images
npm run generate:content   # Generate written content  
npm run generate:all       # Generate all content types
npm run content:optimize   # Optimize generated content for SEO
```

**Automation Status Commands**:
```bash
npm run automation:status  # Check all automation systems
npm run automation:logs    # View automation logs
npm run automation:reset   # Reset automation configurations
```

### Script Configuration Management

**Environment Variables**:
```bash
# Auto-commit configuration
AUTO_COMMIT_ENABLED=true
AUTO_COMMIT_INTERVAL=300000
AUTO_COMMIT_MESSAGE_PREFIX="auto: "

# Content generation API keys
GOOGLE_AI_API_KEY=your_api_key_here
OPENAI_API_KEY=your_openai_key_here
CLOUDINARY_API_KEY=your_cloudinary_key_here
```

**Configuration Files**:
- `.autocommitrc.json` - Auto-commit settings
- `.contentgen.config.js` - Content generation preferences  
- `.automation.env` - Automation-specific environment variables

## Script Development Patterns

### Node.js Script Structure

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  // Script-specific configuration
};

// Main execution function
async function main() {
  try {
    console.log('Starting script execution...');
    
    // Script logic here
    
    console.log('Script completed successfully');
  } catch (error) {
    console.error('Script execution failed:', error);
    process.exit(1);
  }
}

// Command line argument handling
if (require.main === module) {
  main();
}

module.exports = { main };
```

### Error Handling and Logging

```javascript
// Comprehensive error handling
const handleScriptError = (error, context) => {
  console.error(`Error in ${context}:`, error.message);
  
  // Log to file for debugging
  const logEntry = {
    timestamp: new Date().toISOString(),
    context,
    error: error.message,
    stack: error.stack
  };
  
  fs.appendFileSync('scripts/automation.log', JSON.stringify(logEntry) + '\n');
};

// Progress logging
const logProgress = (step, total, message) => {
  console.log(`[${step}/${total}] ${message}`);
};
```

## Security and Best Practices

### Security Considerations

**API Key Management**:
- Never commit API keys to repository
- Use environment variables for sensitive configuration
- Validate API key presence before script execution

**File System Safety**:
```javascript
// Safe file operations
const safeWriteFile = (filePath, content) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Backup existing file
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, `${filePath}.backup`);
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
};
```

### Performance Optimization

**Async Operations**:
```javascript
// Batch processing for performance
const processInBatches = async (items, batchSize, processor) => {
  const results = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );
    results.push(...batchResults);
    
    // Progress reporting
    logProgress(Math.min(i + batchSize, items.length), items.length, 'Processing batch');
  }
  
  return results;
};
```

## Monitoring and Debugging

### Script Monitoring

**Log Analysis**:
```bash
# View recent automation logs
tail -f scripts/automation.log

# Search for specific script activities
grep "auto-commit" scripts/automation.log

# Monitor script performance
npm run scripts:monitor
```

**Health Checks**:
```javascript
// Script health check function
const performHealthCheck = () => {
  const checks = [
    { name: 'Auto-commit agent', status: checkAutoCommitStatus() },
    { name: 'Content generation', status: checkContentGenerationStatus() },
    { name: 'Image generation', status: checkImageGenerationStatus() }
  ];
  
  return checks.every(check => check.status) ? 'healthy' : 'degraded';
};
```

This automation system provides comprehensive development workflow enhancement through intelligent automation, content generation capabilities, and streamlined development processes while maintaining security and performance standards.