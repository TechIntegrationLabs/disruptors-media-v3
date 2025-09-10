const BaseAgent = require('./base-agent');
const path = require('path');

class AutoCommitManagerAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.commitConfig = {
      maxFilesPerCommit: 10,
      excludePatterns: [
        '.env',
        'node_modules',
        '.DS_Store',
        '*.log',
        'package-lock.json',
        '.claude/subagents/logs'
      ],
      commitTypes: {
        feat: 'New features and functionality',
        fix: 'Bug fixes and corrections',
        docs: 'Documentation updates',
        style: 'Styling and UI changes',
        refactor: 'Code refactoring and optimization',
        test: 'Test additions and updates',
        chore: 'Maintenance and configuration',
        perf: 'Performance improvements',
        ci: 'CI/CD and build system changes'
      },
      messagePatterns: {
        components: 'feat(components): ',
        pages: 'feat(pages): ',
        styles: 'style: ',
        docs: 'docs: ',
        config: 'chore(config): ',
        scripts: 'chore(scripts): ',
        tests: 'test: ',
        assets: 'feat(assets): ',
        api: 'feat(api): '
      }
    };
    this.pendingChanges = new Map();
    this.commitHistory = [];
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_modified':
          await this.handleFileChange(context.filePath);
          break;
        case 'interval':
          await this.performScheduledCommit();
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.performManualCommit();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute auto-commit manager agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Check git status and load existing configuration
    await this.loadCommitConfiguration();
    await this.analyzeRepositoryState();
  }

  async loadCommitConfiguration() {
    try {
      // Check if auto-commit is enabled
      const autoCommitQuickstart = await this.fileExists('AUTO_COMMIT_QUICKSTART.md');
      const autoCommitScript = await this.fileExists('scripts/auto-commit-agent.js');
      
      if (autoCommitQuickstart) {
        const quickstartContent = await this.read('AUTO_COMMIT_QUICKSTART.md');
        this.parseQuickstartConfig(quickstartContent);
      }
      
      this.log('Auto-commit configuration loaded');
    } catch (error) {
      this.error('Failed to load commit configuration', error);
    }
  }

  parseQuickstartConfig(content) {
    // Extract configuration from quickstart guide
    if (content.includes('auto-commit:watch')) {
      this.commitConfig.watchModeEnabled = true;
    }
    
    if (content.includes('AUTO_COMMIT_INTERVAL')) {
      const match = content.match(/AUTO_COMMIT_INTERVAL[=:](\d+)/);
      if (match) {
        this.commitConfig.interval = parseInt(match[1]);
      }
    }
  }

  async analyzeRepositoryState() {
    try {
      // Get current git status
      const status = await this.bash('git status --porcelain', 'Check git status');
      const branch = await this.bash('git branch --show-current', 'Get current branch');
      
      this.repositoryState = {
        currentBranch: branch.trim(),
        hasChanges: status.trim().length > 0,
        changedFiles: this.parseGitStatus(status),
        lastCommit: await this.getLastCommitInfo()
      };
      
      this.log(`Repository state: ${this.repositoryState.changedFiles.length} changed files on branch ${this.repositoryState.currentBranch}`);
      
    } catch (error) {
      this.error('Failed to analyze repository state', error);
    }
  }

  parseGitStatus(statusOutput) {
    const files = [];
    const lines = statusOutput.trim().split('\n').filter(line => line.length > 0);
    
    for (const line of lines) {
      const status = line.substring(0, 2);
      const filePath = line.substring(3);
      
      files.push({
        path: filePath,
        status: this.interpretGitStatus(status),
        excluded: this.isFileExcluded(filePath)
      });
    }
    
    return files;
  }

  interpretGitStatus(status) {
    const statusMap = {
      'M ': 'modified',
      'A ': 'added',
      'D ': 'deleted',
      'R ': 'renamed',
      'C ': 'copied',
      'U ': 'unmerged',
      '??': 'untracked'
    };
    
    return statusMap[status] || 'unknown';
  }

  isFileExcluded(filePath) {
    return this.commitConfig.excludePatterns.some(pattern => {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        return regex.test(filePath);
      }
      return filePath.includes(pattern);
    });
  }

  async getLastCommitInfo() {
    try {
      const lastCommit = await this.bash('git log -1 --pretty=format:"%h|%s|%an|%ad" --date=iso', 'Get last commit info');
      const [hash, message, author, date] = lastCommit.split('|');
      
      return {
        hash,
        message,
        author,
        date: new Date(date)
      };
    } catch (error) {
      this.error('Failed to get last commit info', error);
      return null;
    }
  }

  async handleFileChange(filePath) {
    this.log(`Tracking file change: ${filePath}`);
    
    try {
      // Skip excluded files
      if (this.isFileExcluded(filePath)) {
        this.log(`File excluded from auto-commit: ${filePath}`);
        return;
      }
      
      // Analyze the change
      const changeAnalysis = await this.analyzeFileChange(filePath);
      
      // Add to pending changes
      this.pendingChanges.set(filePath, {
        timestamp: Date.now(),
        analysis: changeAnalysis,
        commitType: this.determineCommitType(filePath, changeAnalysis),
        priority: this.determineChangePriority(filePath, changeAnalysis)
      });
      
      this.log(`Change tracked: ${filePath} (${changeAnalysis.changeType}, priority: ${this.pendingChanges.get(filePath).priority})`);
      
      // Check if we should auto-commit immediately
      if (this.shouldAutoCommitImmediately(filePath, changeAnalysis)) {
        await this.performImmediateCommit([filePath]);
      }
      
    } catch (error) {
      this.error(`Failed to handle file change for ${filePath}`, error);
    }
  }

  async analyzeFileChange(filePath) {
    try {
      const analysis = {
        filePath,
        changeType: 'modification',
        significance: 'medium',
        category: this.categorizeFile(filePath),
        linesChanged: 0,
        hasBreakingChanges: false,
        hasNewFeature: false,
        hasBugFix: false
      };
      
      // Check if file exists (could be deleted)
      if (!(await this.fileExists(filePath))) {
        analysis.changeType = 'deletion';
        return analysis;
      }
      
      // Get diff information
      try {
        const diff = await this.bash(`git diff HEAD -- "${filePath}"`, 'Get file diff');
        analysis.linesChanged = this.countLinesChanged(diff);
        analysis.hasBreakingChanges = this.detectBreakingChanges(diff, filePath);
        analysis.hasNewFeature = this.detectNewFeature(diff, filePath);
        analysis.hasBugFix = this.detectBugFix(diff, filePath);
      } catch (diffError) {
        // File might be untracked
        analysis.changeType = 'addition';
      }
      
      // Determine significance
      if (analysis.linesChanged > 100 || analysis.hasBreakingChanges) {
        analysis.significance = 'high';
      } else if (analysis.linesChanged < 10 && !analysis.hasNewFeature) {
        analysis.significance = 'low';
      }
      
      return analysis;
      
    } catch (error) {
      this.error(`Failed to analyze file change for ${filePath}`, error);
      return { filePath, changeType: 'unknown', significance: 'medium' };
    }
  }

  categorizeFile(filePath) {
    const categories = {
      'src/components/': 'components',
      'src/pages/': 'pages',
      'src/data/': 'data',
      'docs/': 'documentation',
      'scripts/': 'scripts',
      'public/': 'assets',
      '.md': 'documentation',
      '.json': 'configuration',
      '.js': 'scripts',
      '.tsx': 'components',
      '.ts': 'typescript'
    };
    
    for (const [pattern, category] of Object.entries(categories)) {
      if (filePath.includes(pattern)) {
        return category;
      }
    }
    
    return 'other';
  }

  countLinesChanged(diff) {
    const lines = diff.split('\n');
    let added = 0;
    let removed = 0;
    
    for (const line of lines) {
      if (line.startsWith('+') && !line.startsWith('+++')) {
        added++;
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        removed++;
      }
    }
    
    return added + removed;
  }

  detectBreakingChanges(diff, filePath) {
    const breakingPatterns = [
      /export.*interface.*{[^}]*}/s, // Interface changes
      /export.*function.*\(/,        // Function signature changes
      /import.*from/,                // Import changes
      /className.*=.*"/,             // Major styling changes
      /props\./                      // Props changes
    ];
    
    return breakingPatterns.some(pattern => pattern.test(diff));
  }

  detectNewFeature(diff, filePath) {
    const featurePatterns = [
      /\+.*export.*const.*=/,        // New component exports
      /\+.*function.*\(/,            // New functions
      /\+.*interface.*{/,            // New interfaces
      /\+.*useState\(/,              // New state
      /\+.*useEffect\(/,             // New effects
      /\+.*import.*from/             // New imports
    ];
    
    return featurePatterns.some(pattern => pattern.test(diff));
  }

  detectBugFix(diff, filePath) {
    const bugFixPatterns = [
      /\+.*fix/i,
      /\+.*bug/i,
      /\+.*error/i,
      /\-.*console\.log/,             // Removing debug logs
      /\+.*catch\(/,                 // Adding error handling
      /\+.*if.*null/,                // Null checks
      /\+.*\?\./                     // Optional chaining
    ];
    
    return bugFixPatterns.some(pattern => pattern.test(diff));
  }

  determineCommitType(filePath, analysis) {
    if (analysis.hasBugFix) {
      return 'fix';
    } else if (analysis.hasNewFeature) {
      return 'feat';
    } else if (analysis.category === 'documentation') {
      return 'docs';
    } else if (analysis.category === 'configuration') {
      return 'chore';
    } else if (filePath.includes('style') || filePath.includes('.css')) {
      return 'style';
    } else if (analysis.changeType === 'addition') {
      return 'feat';
    } else {
      return 'refactor';
    }
  }

  determineChangePriority(filePath, analysis) {
    if (analysis.hasBreakingChanges) {
      return 'critical';
    } else if (analysis.significance === 'high' || analysis.hasNewFeature) {
      return 'high';
    } else if (analysis.hasBugFix) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  shouldAutoCommitImmediately(filePath, analysis) {
    // Immediately commit critical changes or specific file types
    return (
      analysis.priority === 'critical' ||
      analysis.category === 'configuration' ||
      filePath.includes('.env.example') ||
      filePath.includes('package.json')
    );
  }

  async performImmediateCommit(filePaths) {
    this.log(`Performing immediate commit for: ${filePaths.join(', ')}`);
    
    try {
      const commitMessage = await this.generateCommitMessage(filePaths);
      await this.executeCommit(filePaths, commitMessage);
      
      // Remove from pending changes
      filePaths.forEach(filePath => this.pendingChanges.delete(filePath));
      
    } catch (error) {
      this.error('Failed to perform immediate commit', error);
    }
  }

  async performScheduledCommit() {
    this.log('Performing scheduled commit check');
    
    try {
      if (this.pendingChanges.size === 0) {
        this.log('No pending changes for scheduled commit');
        return;
      }
      
      // Group changes by priority and type
      const groupedChanges = this.groupPendingChanges();
      
      // Commit high priority changes first
      if (groupedChanges.high.length > 0) {
        await this.commitChangeGroup(groupedChanges.high, 'high priority');
      }
      
      // Commit medium priority changes if enough accumulated
      if (groupedChanges.medium.length >= 3) {
        await this.commitChangeGroup(groupedChanges.medium, 'medium priority');
      }
      
      // Commit low priority changes if many accumulated or old enough
      const oldLowPriority = groupedChanges.low.filter(change => 
        Date.now() - change.timestamp > 600000 // 10 minutes
      );
      
      if (groupedChanges.low.length >= 5 || oldLowPriority.length > 0) {
        await this.commitChangeGroup(groupedChanges.low, 'low priority');
      }
      
    } catch (error) {
      this.error('Failed to perform scheduled commit', error);
    }
  }

  groupPendingChanges() {
    const grouped = {
      critical: [],
      high: [],
      medium: [],
      low: []
    };
    
    for (const [filePath, changeInfo] of this.pendingChanges) {
      grouped[changeInfo.priority].push({
        filePath,
        ...changeInfo
      });
    }
    
    return grouped;
  }

  async commitChangeGroup(changes, groupDescription) {
    try {
      const filePaths = changes.map(change => change.filePath);
      const commitMessage = await this.generateCommitMessage(filePaths, groupDescription);
      
      await this.executeCommit(filePaths, commitMessage);
      
      // Remove committed changes from pending
      filePaths.forEach(filePath => this.pendingChanges.delete(filePath));
      
      this.log(`Committed ${filePaths.length} files (${groupDescription})`);
      
    } catch (error) {
      this.error(`Failed to commit change group: ${groupDescription}`, error);
    }
  }

  async generateCommitMessage(filePaths, groupDescription = '') {
    try {
      // Analyze the changes to generate appropriate message
      const categories = new Set();
      const commitTypes = new Set();
      const descriptions = [];
      
      for (const filePath of filePaths) {
        const changeInfo = this.pendingChanges.get(filePath);
        if (changeInfo) {
          categories.add(changeInfo.analysis.category);
          commitTypes.add(changeInfo.commitType);
          
          if (changeInfo.analysis.hasNewFeature) {
            descriptions.push(`add ${this.getFeatureDescription(filePath)}`);
          } else if (changeInfo.analysis.hasBugFix) {
            descriptions.push(`fix ${this.getBugDescription(filePath)}`);
          } else {
            descriptions.push(`update ${this.getUpdateDescription(filePath)}`);
          }
        }
      }
      
      // Determine primary commit type
      const primaryType = this.selectPrimaryCommitType(Array.from(commitTypes));
      const primaryCategory = this.selectPrimaryCategory(Array.from(categories));
      
      // Generate message
      let scope = '';
      if (primaryCategory && primaryCategory !== 'other') {
        scope = `(${primaryCategory})`;
      }
      
      const description = descriptions.length > 3 
        ? `update ${filePaths.length} files`
        : descriptions.slice(0, 2).join(' and ');
      
      const commitMessage = `${primaryType}${scope}: ${description}`;
      
      return this.appendAutoCommitSignature(commitMessage);
      
    } catch (error) {
      this.error('Failed to generate commit message', error);
      return this.appendAutoCommitSignature(`chore: update ${filePaths.length} files`);
    }
  }

  selectPrimaryCommitType(types) {
    const priority = ['fix', 'feat', 'refactor', 'style', 'docs', 'chore'];
    
    for (const type of priority) {
      if (types.includes(type)) {
        return type;
      }
    }
    
    return types[0] || 'chore';
  }

  selectPrimaryCategory(categories) {
    const priority = ['components', 'pages', 'api', 'data', 'scripts', 'documentation'];
    
    for (const category of priority) {
      if (categories.includes(category)) {
        return category;
      }
    }
    
    return categories[0] || 'other';
  }

  getFeatureDescription(filePath) {
    const fileName = path.basename(filePath, path.extname(filePath));
    
    if (filePath.includes('components/')) {
      return `${fileName} component`;
    } else if (filePath.includes('pages/')) {
      return `${fileName} page`;
    } else if (filePath.includes('api/')) {
      return `${fileName} API endpoint`;
    } else {
      return fileName;
    }
  }

  getBugDescription(filePath) {
    return `issues in ${path.basename(filePath)}`;
  }

  getUpdateDescription(filePath) {
    return path.basename(filePath);
  }

  appendAutoCommitSignature(message) {
    return `${message}\n\n🤖 Generated with [Claude Code](https://claude.ai/code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>`;
  }

  async executeCommit(filePaths, commitMessage) {
    try {
      // Add files to staging
      for (const filePath of filePaths) {
        await this.bash(`git add "${filePath}"`, `Stage ${filePath}`);
      }
      
      // Create commit
      const escapedMessage = commitMessage.replace(/"/g, '\\"');
      await this.bash(`git commit -m "${escapedMessage}"`, 'Create commit');
      
      // Log commit info
      const commitHash = await this.bash('git rev-parse --short HEAD', 'Get commit hash');
      
      this.commitHistory.push({
        hash: commitHash.trim(),
        message: commitMessage,
        files: filePaths,
        timestamp: new Date().toISOString()
      });
      
      this.log(`Commit created: ${commitHash.trim()}`);
      
    } catch (error) {
      this.error('Failed to execute commit', error);
      throw error;
    }
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'commit':
        await this.performManualCommit();
        break;
      case 'git':
        await this.analyzeRepositoryState();
        this.log(`Repository status: ${this.repositoryState.changedFiles.length} changed files`);
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async performManualCommit() {
    this.log('Performing manual commit of all pending changes');
    
    try {
      if (this.pendingChanges.size === 0) {
        // Check for any unstaged changes
        await this.analyzeRepositoryState();
        
        if (this.repositoryState.hasChanges) {
          const eligibleFiles = this.repositoryState.changedFiles
            .filter(file => !file.excluded)
            .map(file => file.path);
          
          if (eligibleFiles.length > 0) {
            const commitMessage = await this.generateCommitMessage(eligibleFiles, 'manual commit');
            await this.executeCommit(eligibleFiles, commitMessage);
          } else {
            this.log('No eligible files for commit');
          }
        } else {
          this.log('No changes to commit');
        }
      } else {
        // Commit all pending changes
        const allPending = Array.from(this.pendingChanges.keys());
        const commitMessage = await this.generateCommitMessage(allPending, 'manual commit');
        await this.executeCommit(allPending, commitMessage);
        
        // Clear pending changes
        this.pendingChanges.clear();
      }
      
    } catch (error) {
      this.error('Failed to perform manual commit', error);
    }
  }

  async generateCommitReport() {
    const report = {
      timestamp: new Date().toISOString(),
      pendingChanges: this.pendingChanges.size,
      commitHistory: this.commitHistory,
      repositoryState: this.repositoryState,
      statistics: {
        totalCommits: this.commitHistory.length,
        commitsByType: {},
        filesByCategory: {}
      }
    };
    
    // Calculate statistics
    for (const commit of this.commitHistory) {
      const type = commit.message.split(':')[0];
      report.statistics.commitsByType[type] = (report.statistics.commitsByType[type] || 0) + 1;
    }
    
    for (const [filePath, changeInfo] of this.pendingChanges) {
      const category = changeInfo.analysis.category;
      report.statistics.filesByCategory[category] = (report.statistics.filesByCategory[category] || 0) + 1;
    }
    
    // Save report
    const reportPath = '.claude/subagents/logs/auto-commit-report.json';
    await this.write(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }
}

module.exports = AutoCommitManagerAgent;