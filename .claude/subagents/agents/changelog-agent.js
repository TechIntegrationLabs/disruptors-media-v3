const BaseAgent = require('./base-agent');
const path = require('path');

class ChangelogAgent extends BaseAgent {
  constructor(context) {
    super(context);
    this.changelogConfig = {
      outputFile: 'CHANGELOG.md',
      versioning: {
        format: 'semver', // semantic versioning
        autoIncrement: true,
        releaseTypes: {
          major: ['breaking', 'BREAKING CHANGE'],
          minor: ['feat', 'feature'],
          patch: ['fix', 'bug', 'patch', 'hotfix']
        }
      },
      categories: {
        'Breaking Changes': ['breaking', 'BREAKING CHANGE'],
        'New Features': ['feat', 'feature', 'add'],
        'Bug Fixes': ['fix', 'bug', 'patch', 'hotfix'],
        'Improvements': ['enhance', 'improve', 'update', 'refactor'],
        'Documentation': ['docs', 'doc', 'documentation'],
        'Performance': ['perf', 'performance', 'optimize'],
        'Styling': ['style', 'css', 'ui', 'design'],
        'Configuration': ['config', 'chore', 'build', 'ci'],
        'Testing': ['test', 'spec'],
        'Dependencies': ['deps', 'dependencies', 'upgrade']
      },
      ignore: [
        'merge', 'wip', 'temp', 'temporary', 'debug',
        'log', 'console', 'comment', 'typo'
      ],
      format: {
        dateFormat: 'YYYY-MM-DD',
        includeHash: true,
        includeAuthor: true,
        groupByType: true,
        showCommitMessages: true
      }
    };
    this.commitHistory = [];
    this.versionHistory = [];
    this.lastProcessedCommit = null;
  }

  async execute() {
    try {
      await this.setupExecution();
      
      const { trigger, context } = this.context;
      
      switch (trigger) {
        case 'file_modified':
          if (context.filePath && !context.filePath.includes('.git')) {
            await this.handleFileChange(context.filePath);
          }
          break;
        case 'interval':
          await this.performScheduledUpdate();
          break;
        case 'keyword':
          await this.handleKeywordTrigger(context.keyword);
          break;
        case 'manual':
          await this.generateFullChangelog();
          break;
        default:
          this.log(`Unknown trigger type: ${trigger}`);
      }
      
      await this.cleanupExecution();
    } catch (error) {
      this.error('Failed to execute changelog agent', error);
      throw error;
    }
  }

  async setupExecution() {
    // Load existing changelog and commit history
    await this.loadExistingChangelog();
    await this.loadCommitHistory();
    await this.detectLastProcessedCommit();
  }

  async loadExistingChangelog() {
    try {
      if (await this.fileExists(this.changelogConfig.outputFile)) {
        const changelogContent = await this.read(this.changelogConfig.outputFile);
        this.parseExistingChangelog(changelogContent);
      }
      
      this.log('Existing changelog loaded');
    } catch (error) {
      this.error('Failed to load existing changelog', error);
    }
  }

  parseExistingChangelog(content) {
    // Parse version history from existing changelog
    const versionRegex = /## \\[([\\d.]+)\\] - (\\d{4}-\\d{2}-\\d{2})/g;
    let match;
    
    while ((match = versionRegex.exec(content)) !== null) {
      this.versionHistory.push({
        version: match[1],
        date: match[2],
        released: true
      });
    }
    
    this.log(`Found ${this.versionHistory.length} existing versions in changelog`);
  }

  async loadCommitHistory() {
    try {
      // Get all commits since last processed
      const gitLogCmd = 'git log --oneline --pretty=format:"%H|%s|%an|%ad|%D" --date=short';
      const commitData = await this.bash(gitLogCmd, 'Get commit history');
      
      const commits = commitData.trim().split('\\n').filter(line => line.length > 0);
      
      for (const commitLine of commits) {
        const [hash, message, author, date, refs] = commitLine.split('|');
        
        this.commitHistory.push({
          hash: hash.substring(0, 7),
          fullHash: hash,
          message: message.trim(),
          author: author.trim(),
          date,
          refs: refs ? refs.trim() : '',
          category: this.categorizeCommit(message),
          type: this.extractCommitType(message),
          breaking: this.isBreakingChange(message),
          processed: false
        });
      }
      
      this.log(`Loaded ${this.commitHistory.length} commits from git history`);
    } catch (error) {
      this.error('Failed to load commit history', error);
    }
  }

  categorizeCommit(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [category, keywords] of Object.entries(this.changelogConfig.categories)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
        return category;
      }
    }
    
    return 'Other Changes';
  }

  extractCommitType(message) {
    // Extract conventional commit type (feat:, fix:, etc.)
    const typeMatch = message.match(/^(\\w+)(\\(.+\\))?:/);
    return typeMatch ? typeMatch[1] : 'other';
  }

  isBreakingChange(message) {
    const lowerMessage = message.toLowerCase();
    return this.changelogConfig.versioning.releaseTypes.major.some(keyword =>
      lowerMessage.includes(keyword.toLowerCase())
    );
  }

  async detectLastProcessedCommit() {
    try {
      // Check for last processed commit marker
      const markerPath = '.claude/subagents/logs/last-changelog-commit.txt';
      if (await this.fileExists(markerPath)) {
        this.lastProcessedCommit = await this.read(markerPath);
        this.lastProcessedCommit = this.lastProcessedCommit.trim();
        
        // Mark commits as processed up to this point
        let foundLastCommit = false;
        for (const commit of this.commitHistory) {
          if (commit.fullHash === this.lastProcessedCommit) {
            foundLastCommit = true;
          }
          if (foundLastCommit) {
            commit.processed = true;
          }
        }
      }
      
      this.log(`Last processed commit: ${this.lastProcessedCommit || 'none'}`);
    } catch (error) {
      this.error('Failed to detect last processed commit', error);
    }
  }

  async handleFileChange(filePath) {
    // Don't trigger on every file change, just log for potential batch processing
    this.log(`File changed: ${filePath} - queued for next changelog update`);
  }

  async performScheduledUpdate() {
    this.log('Performing scheduled changelog update');
    
    try {
      // Get new commits since last update
      const newCommits = this.commitHistory.filter(commit => !commit.processed);
      
      if (newCommits.length === 0) {
        this.log('No new commits to process');
        return;
      }
      
      this.log(`Processing ${newCommits.length} new commits`);
      
      // Determine if we need a new release
      const releaseInfo = this.analyzeReleaseNeeds(newCommits);
      
      if (releaseInfo.shouldRelease) {
        await this.createNewRelease(newCommits, releaseInfo);
      } else {
        await this.updateUnreleasedSection(newCommits);
      }
      
      // Mark commits as processed
      this.markCommitsAsProcessed(newCommits);
      
    } catch (error) {
      this.error('Failed to perform scheduled update', error);
    }
  }

  analyzeReleaseNeeds(commits) {
    const analysis = {
      shouldRelease: false,
      releaseType: 'patch',
      hasBreaking: false,
      hasFeatures: false,
      hasFixes: false,
      commitCount: commits.length
    };
    
    for (const commit of commits) {
      if (commit.breaking) {
        analysis.hasBreaking = true;
        analysis.releaseType = 'major';
      } else if (commit.type === 'feat' || commit.type === 'feature') {
        analysis.hasFeatures = true;
        if (analysis.releaseType === 'patch') {
          analysis.releaseType = 'minor';
        }
      } else if (commit.type === 'fix' || commit.type === 'bug') {
        analysis.hasFixes = true;
      }
    }
    
    // Determine if auto-release should happen
    analysis.shouldRelease = this.changelogConfig.versioning.autoIncrement && (
      analysis.hasBreaking ||
      analysis.hasFeatures ||
      (analysis.hasFixes && analysis.commitCount >= 5) ||
      analysis.commitCount >= 10
    );
    
    return analysis;
  }

  async createNewRelease(commits, releaseInfo) {
    this.log(`Creating new ${releaseInfo.releaseType} release`);
    
    try {
      // Calculate new version
      const newVersion = this.calculateNewVersion(releaseInfo.releaseType);
      
      // Generate changelog entry
      const changelogEntry = await this.generateChangelogEntry(newVersion, commits);
      
      // Update changelog file
      await this.updateChangelogFile(changelogEntry);
      
      // Update version history
      this.versionHistory.unshift({
        version: newVersion,
        date: new Date().toISOString().split('T')[0],
        released: true,
        commits: commits.length
      });
      
      this.log(`Released version ${newVersion} with ${commits.length} changes`);
      
    } catch (error) {
      this.error('Failed to create new release', error);
    }
  }

  calculateNewVersion(releaseType) {
    const currentVersion = this.getCurrentVersion();
    const [major, minor, patch] = currentVersion.split('.').map(n => parseInt(n));
    
    switch (releaseType) {
      case 'major':
        return `${major + 1}.0.0`;
      case 'minor':
        return `${major}.${minor + 1}.0`;
      case 'patch':
      default:
        return `${major}.${minor}.${patch + 1}`;
    }
  }

  getCurrentVersion() {
    if (this.versionHistory.length > 0) {
      return this.versionHistory[0].version;
    }
    
    // Try to get version from package.json
    try {
      const packageJson = JSON.parse(this.read('package.json'));
      return packageJson.version || '0.1.0';
    } catch (error) {
      return '0.1.0'; // Default starting version
    }
  }

  async generateChangelogEntry(version, commits) {
    const date = new Date().toISOString().split('T')[0];
    let entry = `## [${version}] - ${date}\\n\\n`;
    
    // Group commits by category
    const groupedCommits = this.groupCommitsByCategory(commits);
    
    // Generate sections for each category
    for (const [category, categoryCommits] of Object.entries(groupedCommits)) {
      if (categoryCommits.length > 0) {
        entry += `### ${category}\\n\\n`;
        
        for (const commit of categoryCommits) {
          const commitLine = this.formatCommitLine(commit);
          entry += `- ${commitLine}\\n`;
        }
        
        entry += '\\n';
      }
    }
    
    return entry;
  }

  groupCommitsByCategory(commits) {
    const grouped = {};
    
    // Initialize all categories
    for (const category of Object.keys(this.changelogConfig.categories)) {
      grouped[category] = [];
    }
    grouped['Other Changes'] = [];
    
    // Sort commits into categories
    for (const commit of commits) {
      if (!this.shouldIgnoreCommit(commit)) {
        grouped[commit.category].push(commit);
      }
    }
    
    // Remove empty categories
    for (const [category, commits] of Object.entries(grouped)) {
      if (commits.length === 0) {
        delete grouped[category];
      }
    }
    
    return grouped;
  }

  shouldIgnoreCommit(commit) {
    const lowerMessage = commit.message.toLowerCase();
    return this.changelogConfig.ignore.some(keyword =>
      lowerMessage.includes(keyword.toLowerCase())
    );
  }

  formatCommitLine(commit) {
    let line = commit.message;
    
    // Clean up conventional commit format
    line = line.replace(/^\\w+(\\(.+\\))?:\\s*/, '');
    
    // Capitalize first letter
    line = line.charAt(0).toUpperCase() + line.slice(1);
    
    // Add commit hash if configured
    if (this.changelogConfig.format.includeHash) {
      line += ` (${commit.hash})`;
    }
    
    // Add author if configured
    if (this.changelogConfig.format.includeAuthor) {
      line += ` [@${commit.author.replace(/\\s+/g, '')}]`;
    }
    
    return line;
  }

  async updateChangelogFile(newEntry) {
    try {
      let changelog = '';
      
      if (await this.fileExists(this.changelogConfig.outputFile)) {
        changelog = await this.read(this.changelogConfig.outputFile);
      } else {
        changelog = this.createChangelogHeader();
      }
      
      // Insert new entry after header
      const headerEnd = changelog.indexOf('\\n\\n') + 2;
      const updatedChangelog = changelog.substring(0, headerEnd) + newEntry + '\\n' + changelog.substring(headerEnd);
      
      await this.write(this.changelogConfig.outputFile, updatedChangelog);
      
      this.log(`Updated changelog file: ${this.changelogConfig.outputFile}`);
      
    } catch (error) {
      this.error('Failed to update changelog file', error);
    }
  }

  createChangelogHeader() {
    return `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`;
  }

  async updateUnreleasedSection(commits) {
    this.log('Updating unreleased section with new commits');
    
    try {
      let changelog = '';
      
      if (await this.fileExists(this.changelogConfig.outputFile)) {
        changelog = await this.read(this.changelogConfig.outputFile);
      } else {
        changelog = this.createChangelogHeader();
      }
      
      // Generate unreleased section
      const unreleasedEntry = await this.generateUnreleasedEntry(commits);
      
      // Update or add unreleased section
      if (changelog.includes('## [Unreleased]')) {
        // Update existing unreleased section
        const unreleasedRegex = /(## \\[Unreleased\\].*?)(?=## \\[|$)/s;
        changelog = changelog.replace(unreleasedRegex, unreleasedEntry);
      } else {
        // Add new unreleased section
        const headerEnd = changelog.indexOf('\\n\\n') + 2;
        changelog = changelog.substring(0, headerEnd) + unreleasedEntry + '\\n' + changelog.substring(headerEnd);
      }
      
      await this.write(this.changelogConfig.outputFile, changelog);
      
    } catch (error) {
      this.error('Failed to update unreleased section', error);
    }
  }

  async generateUnreleasedEntry(commits) {
    let entry = `## [Unreleased]\\n\\n`;
    
    // Group commits by category
    const groupedCommits = this.groupCommitsByCategory(commits);
    
    // Generate sections for each category
    for (const [category, categoryCommits] of Object.entries(groupedCommits)) {
      if (categoryCommits.length > 0) {
        entry += `### ${category}\\n\\n`;
        
        for (const commit of categoryCommits) {
          const commitLine = this.formatCommitLine(commit);
          entry += `- ${commitLine}\\n`;
        }
        
        entry += '\\n';
      }
    }
    
    return entry;
  }

  markCommitsAsProcessed(commits) {
    for (const commit of commits) {
      commit.processed = true;
    }
    
    // Save last processed commit
    if (commits.length > 0) {
      const lastCommit = commits[commits.length - 1];
      this.saveLastProcessedCommit(lastCommit.fullHash);
    }
  }

  async saveLastProcessedCommit(commitHash) {
    try {
      const markerPath = '.claude/subagents/logs/last-changelog-commit.txt';
      await this.write(markerPath, commitHash);
      this.lastProcessedCommit = commitHash;
    } catch (error) {
      this.error('Failed to save last processed commit', error);
    }
  }

  async handleKeywordTrigger(keyword) {
    this.log(`Handling keyword trigger: ${keyword}`);
    
    switch (keyword) {
      case 'changelog':
        await this.generateFullChangelog();
        break;
      case 'release':
        await this.createManualRelease();
        break;
      case 'version':
        await this.showVersionInfo();
        break;
      default:
        this.log(`No specific handler for keyword: ${keyword}`);
    }
  }

  async createManualRelease() {
    this.log('Creating manual release');
    
    try {
      const unprocessedCommits = this.commitHistory.filter(commit => !commit.processed);
      
      if (unprocessedCommits.length === 0) {
        this.log('No unprocessed commits for release');
        return;
      }
      
      const releaseInfo = this.analyzeReleaseNeeds(unprocessedCommits);
      releaseInfo.shouldRelease = true; // Force release for manual trigger
      
      await this.createNewRelease(unprocessedCommits, releaseInfo);
      this.markCommitsAsProcessed(unprocessedCommits);
      
    } catch (error) {
      this.error('Failed to create manual release', error);
    }
  }

  async showVersionInfo() {
    const currentVersion = this.getCurrentVersion();
    const unprocessedCommits = this.commitHistory.filter(commit => !commit.processed);
    
    this.log(`Current version: ${currentVersion}`);
    this.log(`Unprocessed commits: ${unprocessedCommits.length}`);
    
    if (unprocessedCommits.length > 0) {
      const releaseInfo = this.analyzeReleaseNeeds(unprocessedCommits);
      const nextVersion = this.calculateNewVersion(releaseInfo.releaseType);
      this.log(`Next version would be: ${nextVersion} (${releaseInfo.releaseType})`);
    }
  }

  async generateFullChangelog() {
    this.log('Generating full changelog from scratch');
    
    try {
      // Get all commits
      const allCommits = this.commitHistory.slice().reverse(); // Oldest first
      
      // Group commits by logical releases (every 10-15 commits or significant changes)
      const releases = this.createLogicalReleases(allCommits);
      
      // Generate full changelog
      let fullChangelog = this.createChangelogHeader();
      
      for (const release of releases) {
        const entry = await this.generateChangelogEntry(release.version, release.commits);
        fullChangelog += entry + '\\n';
      }
      
      // Write complete changelog
      await this.write(this.changelogConfig.outputFile, fullChangelog);
      
      this.log(`Generated full changelog with ${releases.length} releases`);
      
    } catch (error) {
      this.error('Failed to generate full changelog', error);
    }
  }

  createLogicalReleases(commits) {
    const releases = [];
    let currentVersion = '0.1.0';
    let currentCommits = [];
    let commitsSinceRelease = 0;
    
    for (const commit of commits) {
      currentCommits.push(commit);
      commitsSinceRelease++;
      
      // Create release on breaking changes, major features, or every 10-15 commits
      const shouldCreateRelease = (
        commit.breaking ||
        (commit.type === 'feat' && commitsSinceRelease >= 5) ||
        commitsSinceRelease >= 15
      );
      
      if (shouldCreateRelease) {
        const releaseType = commit.breaking ? 'major' : 
                           commit.type === 'feat' ? 'minor' : 'patch';
        
        releases.push({
          version: currentVersion,
          commits: [...currentCommits],
          type: releaseType
        });
        
        currentVersion = this.incrementVersion(currentVersion, releaseType);
        currentCommits = [];
        commitsSinceRelease = 0;
      }
    }
    
    // Add remaining commits as latest release
    if (currentCommits.length > 0) {
      releases.push({
        version: currentVersion,
        commits: currentCommits,
        type: 'patch'
      });
    }
    
    return releases.reverse(); // Newest first for changelog
  }

  incrementVersion(version, type) {
    const [major, minor, patch] = version.split('.').map(n => parseInt(n));
    
    switch (type) {
      case 'major':
        return `${major + 1}.0.0`;
      case 'minor':
        return `${major}.${minor + 1}.0`;
      case 'patch':
      default:
        return `${major}.${minor}.${patch + 1}`;
    }
  }

  async generateChangelogReport() {
    const report = {
      timestamp: new Date().toISOString(),
      currentVersion: this.getCurrentVersion(),
      totalVersions: this.versionHistory.length,
      totalCommits: this.commitHistory.length,
      unprocessedCommits: this.commitHistory.filter(c => !c.processed).length,
      commitsByType: {},
      commitsByAuthor: {},
      recentActivity: this.getRecentActivity()
    };
    
    // Analyze commit patterns
    for (const commit of this.commitHistory) {
      // By type
      if (!report.commitsByType[commit.type]) {
        report.commitsByType[commit.type] = 0;
      }
      report.commitsByType[commit.type]++;
      
      // By author
      if (!report.commitsByAuthor[commit.author]) {
        report.commitsByAuthor[commit.author] = 0;
      }
      report.commitsByAuthor[commit.author]++;
    }
    
    // Save report
    const reportPath = '.claude/subagents/logs/changelog-report.json';
    await this.write(reportPath, JSON.stringify(report, null, 2));
    
    return report;
  }

  getRecentActivity() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return this.commitHistory.filter(commit => {
      const commitDate = new Date(commit.date);
      return commitDate >= thirtyDaysAgo;
    }).length;
  }
}

module.exports = ChangelogAgent;