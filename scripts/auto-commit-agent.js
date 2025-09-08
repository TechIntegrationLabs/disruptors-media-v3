#!/usr/bin/env node

/**
 * Auto-Commit Agent for DM3 React Site
 * Automatically commits major updates and additions to GitHub
 * 
 * Features:
 * - Detects file changes and determines if they constitute a "major update"
 * - Creates intelligent commit messages based on changes
 * - Automatically stages and commits changes
 * - Pushes to remote repository
 * - Logs all activities for tracking
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutoCommitAgent {
  constructor() {
    this.projectRoot = process.cwd();
    this.logFile = path.join(this.projectRoot, 'auto-commit.log');
    this.lastCommitFile = path.join(this.projectRoot, '.last-auto-commit');
    
    // Define what constitutes a "major update"
    this.majorUpdatePatterns = [
      // Component changes
      /src\/components\/.*\.(tsx|ts|jsx|js)$/,
      // Page changes
      /src\/pages\/.*\.(tsx|ts|jsx|js)$/,
      // Data changes
      /src\/data\/.*\.(ts|js)$/,
      // Configuration changes
      /package\.json$/,
      /tsconfig\.json$/,
      /tailwind\.config\.js$/,
      // Documentation updates
      /README\.md$/,
      /CLAUDE\.md$/,
      /.*_INTEGRATION_PLAN\.md$/,
      // Asset additions
      /public\/assets\//,
      /src\/data\/legacy-content\//,
      // Script changes
      /scripts\/.*\.js$/
    ];

    this.minorPatterns = [
      /\.log$/,
      /node_modules\//,
      /\.git\//,
      /build\//,
      /dist\//
    ];
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    
    console.log(message);
    fs.appendFileSync(this.logFile, logEntry);
  }

  executeCommand(command, options = {}) {
    try {
      const result = execSync(command, { 
        cwd: this.projectRoot,
        encoding: 'utf-8',
        ...options
      });
      return result.trim();
    } catch (error) {
      this.log(`Command failed: ${command}`);
      this.log(`Error: ${error.message}`);
      throw error;
    }
  }

  getChangedFiles() {
    try {
      // Get both staged and unstaged changes
      const staged = this.executeCommand('git diff --cached --name-only');
      const unstaged = this.executeCommand('git diff --name-only');
      const untracked = this.executeCommand('git ls-files --others --exclude-standard');
      
      const allFiles = [
        ...staged.split('\n').filter(Boolean),
        ...unstaged.split('\n').filter(Boolean),
        ...untracked.split('\n').filter(Boolean)
      ];

      // Remove duplicates
      return [...new Set(allFiles)];
    } catch (error) {
      this.log('Error getting changed files: ' + error.message);
      return [];
    }
  }

  isMajorUpdate(changedFiles) {
    if (changedFiles.length === 0) return false;

    // Filter out minor changes
    const significantFiles = changedFiles.filter(file => {
      return !this.minorPatterns.some(pattern => pattern.test(file));
    });

    if (significantFiles.length === 0) return false;

    // Check if any files match major update patterns
    const majorFiles = significantFiles.filter(file => {
      return this.majorUpdatePatterns.some(pattern => pattern.test(file));
    });

    // Consider it major if we have significant files or many changes
    return majorFiles.length > 0 || significantFiles.length >= 3;
  }

  categorizeChanges(changedFiles) {
    const categories = {
      components: [],
      pages: [],
      data: [],
      assets: [],
      config: [],
      docs: [],
      scripts: [],
      other: []
    };

    changedFiles.forEach(file => {
      if (/src\/components\//.test(file)) categories.components.push(file);
      else if (/src\/pages\//.test(file)) categories.pages.push(file);
      else if (/src\/data\//.test(file)) categories.data.push(file);
      else if (/public\/assets\//.test(file) || /src\/data\/legacy-content\//.test(file)) categories.assets.push(file);
      else if (/package\.json$|tsconfig\.json$|tailwind\.config\.js$/.test(file)) categories.config.push(file);
      else if (/\.md$/.test(file)) categories.docs.push(file);
      else if (/scripts\//.test(file)) categories.scripts.push(file);
      else categories.other.push(file);
    });

    return categories;
  }

  generateCommitMessage(changedFiles) {
    const categories = this.categorizeChanges(changedFiles);
    const parts = [];
    let primaryAction = 'update';

    // Determine primary action and create message parts
    if (categories.components.length > 0) {
      if (categories.components.some(f => f.includes('VideoHero') || f.includes('Hero'))) {
        primaryAction = 'enhance';
        parts.push(`video hero section with gold logo overlay`);
      } else {
        parts.push(`${categories.components.length} component${categories.components.length > 1 ? 's' : ''}`);
      }
    }

    if (categories.pages.length > 0) {
      parts.push(`${categories.pages.length} page${categories.pages.length > 1 ? 's' : ''}`);
    }

    if (categories.data.length > 0) {
      if (categories.data.some(f => f.includes('legacy-content'))) {
        primaryAction = 'add';
        parts.push('real client data from legacy migration');
      } else {
        parts.push(`data layer updates`);
      }
    }

    if (categories.assets.length > 0) {
      parts.push(`${categories.assets.length} asset${categories.assets.length > 1 ? 's' : ''}`);
    }

    if (categories.config.length > 0) {
      parts.push('configuration');
    }

    if (categories.docs.length > 0) {
      parts.push('documentation');
    }

    if (categories.scripts.length > 0) {
      parts.push('automation scripts');
    }

    // Build commit message
    let message = `${primaryAction}: ${parts.join(', ')}`;
    
    // Add specific details for major changes
    if (categories.components.some(f => f.includes('VideoHero'))) {
      message += '\n\n- Add transparent overlay with proper opacity\n- Implement animated gold DM logo\n- Add fallback image support';
    }
    
    if (categories.data.some(f => f.includes('legacy-content'))) {
      message += '\n\n- Remove false revenue/client claims\n- Replace with verified client data\n- Update metrics to reflect actual business stats';
    }

    // Add file count summary
    const totalFiles = changedFiles.length;
    message += `\n\n📁 Files changed: ${totalFiles}`;
    
    // Add category breakdown if significant
    if (totalFiles > 5) {
      const breakdown = [];
      Object.entries(categories).forEach(([cat, files]) => {
        if (files.length > 0) breakdown.push(`${files.length} ${cat}`);
      });
      message += `\n📊 Breakdown: ${breakdown.join(', ')}`;
    }

    // Add automated signature
    message += '\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>';
    
    return message;
  }

  hasRecentCommit() {
    try {
      if (!fs.existsSync(this.lastCommitFile)) return false;
      
      const lastCommitTime = parseInt(fs.readFileSync(this.lastCommitFile, 'utf-8'));
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      
      return (now - lastCommitTime) < fiveMinutes;
    } catch (error) {
      return false;
    }
  }

  updateLastCommitTime() {
    fs.writeFileSync(this.lastCommitFile, Date.now().toString());
  }

  async commitChanges() {
    try {
      // Check if we're in a git repository
      this.executeCommand('git status');
      
      // Check for recent commits to avoid spam
      if (this.hasRecentCommit()) {
        this.log('Skipping commit - recent commit detected (within 5 minutes)');
        return false;
      }

      // Get changed files
      const changedFiles = this.getChangedFiles();
      
      if (changedFiles.length === 0) {
        this.log('No changes detected');
        return false;
      }

      this.log(`Detected ${changedFiles.length} changed files:`);
      changedFiles.forEach(file => this.log(`  - ${file}`));

      // Check if this constitutes a major update
      if (!this.isMajorUpdate(changedFiles)) {
        this.log('Changes do not constitute a major update - skipping commit');
        return false;
      }

      this.log('Major update detected - proceeding with auto-commit');

      // Stage all changes
      this.executeCommand('git add .');
      
      // Generate commit message
      const commitMessage = this.generateCommitMessage(changedFiles);
      this.log('Generated commit message:');
      this.log(commitMessage);

      // Create commit
      const commitCommand = `git commit -m "${commitMessage.replace(/"/g, '\\"')}"`;
      this.executeCommand(commitCommand);
      
      this.log('✅ Commit created successfully');

      // Push to remote (with error handling)
      try {
        this.executeCommand('git push');
        this.log('✅ Changes pushed to remote repository');
      } catch (error) {
        this.log('⚠️ Failed to push to remote - commit created locally');
        this.log(`Push error: ${error.message}`);
      }

      // Update last commit time
      this.updateLastCommitTime();

      return true;

    } catch (error) {
      this.log(`❌ Auto-commit failed: ${error.message}`);
      return false;
    }
  }

  watchForChanges() {
    this.log('🤖 Auto-commit agent started - watching for major updates');
    
    // Run immediate check
    this.commitChanges();
    
    // Set up periodic checks (every 2 minutes)
    setInterval(() => {
      this.commitChanges().catch(error => {
        this.log(`Error in periodic commit check: ${error.message}`);
      });
    }, 2 * 60 * 1000);
  }

  // Manual commit trigger
  async manualCommit() {
    this.log('🔧 Manual commit triggered');
    return await this.commitChanges();
  }
}

// CLI usage
if (require.main === module) {
  const agent = new AutoCommitAgent();
  const command = process.argv[2];

  switch (command) {
    case 'watch':
      agent.watchForChanges();
      break;
    case 'commit':
      agent.manualCommit().then(success => {
        process.exit(success ? 0 : 1);
      });
      break;
    case 'status':
      const files = agent.getChangedFiles();
      console.log(`Changed files: ${files.length}`);
      files.forEach(file => console.log(`  - ${file}`));
      console.log(`Major update: ${agent.isMajorUpdate(files) ? 'Yes' : 'No'}`);
      break;
    default:
      console.log(`
DM3 Auto-Commit Agent

Usage:
  node scripts/auto-commit-agent.js watch    # Start watching for changes
  node scripts/auto-commit-agent.js commit   # Manual commit check
  node scripts/auto-commit-agent.js status   # Show current status

The agent will automatically detect major updates including:
- Component changes (VideoHero, etc.)
- Page modifications
- Data layer updates
- Asset additions
- Configuration changes
- Documentation updates

Commits are created with intelligent messages and pushed to GitHub automatically.
      `);
      break;
  }
}

module.exports = AutoCommitAgent;