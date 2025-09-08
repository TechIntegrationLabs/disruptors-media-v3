# Auto-Commit Agent Documentation

## Overview

The Auto-Commit Agent is a smart subagent that automatically detects major updates and commits them to GitHub with intelligent commit messages. It helps maintain a clean git history and ensures no important work is lost.

## Features

### 🤖 **Intelligent Change Detection**
- Analyzes file changes to determine if they constitute a "major update"
- Categorizes changes by type (components, pages, data, assets, config, docs, scripts)
- Filters out minor changes (logs, node_modules, build artifacts)
- Prevents spam commits with 5-minute cooldown

### 📝 **Smart Commit Messages**
- Generates descriptive commit messages based on change analysis
- Includes file breakdown and change categories
- Adds specific details for major features (e.g., VideoHero enhancements)
- Follows conventional commit format with automated signatures

### 🔄 **Automated Workflow**
- Stages all changes automatically
- Creates commits with detailed messages
- Pushes to remote repository
- Logs all activities for tracking
- Handles errors gracefully with fallbacks

## Usage

### **Quick Commands**

```bash
# Manual commit check (recommended)
npm run auto-commit

# Check current status
npm run auto-commit:status

# Start watching for changes (continuous)
npm run auto-commit:watch

# Direct script usage
node scripts/auto-commit-agent.js commit
node scripts/auto-commit-agent.js status
node scripts/auto-commit-agent.js watch
```

### **Integration Workflow**

1. **Development**: Make changes to components, pages, data, etc.
2. **Auto-Detection**: Agent detects major updates automatically
3. **Smart Commit**: Creates commit with intelligent message
4. **Push**: Automatically pushes to GitHub repository
5. **Logging**: Records all activities in `auto-commit.log`

## Major Update Criteria

### **What Triggers Auto-Commits:**

✅ **Components**: Changes to React components (VideoHero, etc.)  
✅ **Pages**: Updates to page-level components  
✅ **Data Layer**: Modifications to data files and content  
✅ **Assets**: New images, videos, or media files  
✅ **Configuration**: package.json, tsconfig.json, tailwind.config.js  
✅ **Documentation**: README.md, CLAUDE.md, integration plans  
✅ **Scripts**: Automation and build scripts  

### **What Gets Filtered Out:**

❌ **Build Artifacts**: node_modules/, build/, dist/  
❌ **Logs**: *.log files  
❌ **Git Files**: .git/ directory  
❌ **Minor Changes**: Single-line tweaks, formatting only  

## Commit Message Format

### **Example Generated Messages:**

```
enhance: video hero section with gold logo overlay, 1 page, configuration

- Add transparent overlay with proper opacity
- Implement animated gold DM logo
- Add fallback image support

📁 Files changed: 4
📊 Breakdown: 2 components, 1 pages, 1 config

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### **Message Components:**

1. **Action Type**: enhance, add, update, fix
2. **Primary Changes**: Video hero, client data, etc.
3. **Change Summary**: Brief description of modifications
4. **Detailed Bullets**: Specific features added/changed
5. **File Statistics**: Count and breakdown by category
6. **Automated Signature**: Claude Code attribution

## Safety Features

### **Spam Prevention**
- 5-minute cooldown between commits
- Tracks last commit time in `.last-auto-commit`
- Skips commits for minor or frequent changes

### **Error Handling**
- Graceful fallbacks for git errors
- Continues operation if push fails
- Comprehensive logging for debugging
- Safe command execution with error catching

### **Change Validation**
- Minimum threshold for major updates
- Pattern matching for significant files
- Category-based change analysis
- Intelligent filtering of irrelevant changes

## Configuration

### **Customizing Update Patterns**

Edit `scripts/auto-commit-agent.js` to modify detection rules:

```javascript
// Add new major update patterns
this.majorUpdatePatterns = [
  /src\/components\/.*\.(tsx|ts|jsx|js)$/,  // Components
  /src\/pages\/.*\.(tsx|ts|jsx|js)$/,       // Pages
  /src\/data\/.*\.(ts|js)$/,                // Data
  // Add your custom patterns here
];

// Add new minor patterns to ignore
this.minorPatterns = [
  /\.log$/,
  /node_modules\//,
  // Add patterns to ignore
];
```

### **Adjusting Commit Frequency**

```javascript
// Change cooldown period (currently 5 minutes)
const fiveMinutes = 5 * 60 * 1000;

// Change watch interval (currently 2 minutes)
setInterval(() => {
  // Check for changes
}, 2 * 60 * 1000);
```

## Monitoring & Logs

### **Log File Location**
- **File**: `auto-commit.log` (project root)
- **Format**: `[ISO timestamp] message`
- **Contents**: All agent activities, errors, commit details

### **Log Analysis**
```bash
# View recent activity
tail -20 auto-commit.log

# Search for specific events
grep "✅ Commit created" auto-commit.log
grep "Major update detected" auto-commit.log
grep "❌" auto-commit.log  # View errors
```

### **Status Monitoring**
```bash
# Check what would be committed
npm run auto-commit:status

# View git status
git status

# See recent commits
git log --oneline -10
```

## Best Practices

### **Development Workflow**
1. Make logical, related changes together
2. Run `npm run auto-commit:status` to preview
3. Use `npm run auto-commit` for manual control
4. Let the agent handle routine commits automatically

### **Manual Overrides**
- Use standard `git commit` for custom messages
- Add `[skip-auto]` to commit messages to prevent conflicts
- Review auto-generated commits periodically

### **Team Usage**
- Share auto-commit.log for team visibility
- Coordinate on major update criteria
- Use consistent development patterns for better categorization

## Troubleshooting

### **Common Issues**

**Agent not detecting changes:**
```bash
# Check git status
git status

# Verify patterns match your files
npm run auto-commit:status
```

**Push failures:**
```bash
# Check remote connection
git remote -v

# Verify authentication
git push origin main
```

**Too many/few commits:**
```bash
# Adjust cooldown in auto-commit-agent.js
# Modify majorUpdatePatterns array
```

### **Emergency Controls**

**Stop watching mode:**
```bash
# Kill the watch process
pkill -f "auto-commit-agent.js watch"
```

**Manual git operations:**
```bash
# Override auto-commit with manual commit
git add .
git commit -m "manual override"
git push
```

## Integration Examples

### **CI/CD Integration**
```bash
# In build scripts
npm run auto-commit  # Commit before build
npm run build
npm run auto-commit  # Commit build artifacts if needed
```

### **Development Scripts**
```bash
# Combined development workflow
npm run dev &          # Start dev server
npm run auto-commit:watch &  # Start auto-commit watching
wait
```

## Performance Impact

- **Minimal CPU usage**: Only runs checks every 2 minutes
- **Small memory footprint**: Simple Node.js process
- **Fast execution**: Git operations are efficient
- **Non-blocking**: Doesn't interfere with development server

## Future Enhancements

- [ ] Web dashboard for commit history
- [ ] Integration with CI/CD webhooks
- [ ] Custom commit templates per project
- [ ] Slack/Discord notifications
- [ ] Rollback capabilities
- [ ] Branch-aware commit strategies

The Auto-Commit Agent ensures that all your important work is safely committed and pushed to GitHub automatically, giving you peace of mind and maintaining a clean development workflow.