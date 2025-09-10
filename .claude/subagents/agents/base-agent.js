const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

class BaseAgent {
  constructor(context) {
    this.context = context;
    this.projectRoot = context.projectRoot;
    this.config = context.config;
    this.tools = this.config.tools || [];
    this.name = context.agent;
    
    // Initialize logging
    this.logPath = path.join(__dirname, '..', 'logs', `${this.name}.log`);
    this.log(`Agent ${this.name} initialized with trigger: ${context.trigger}`);
  }

  // Logging utilities
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    
    fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
    fs.appendFileSync(this.logPath, logEntry);
    
    if (level === 'error') {
      console.error(`❌ [${this.name}] ${message}`);
    } else {
      console.log(`🤖 [${this.name}] ${message}`);
    }
  }

  error(message, error = null) {
    this.log(message, 'error');
    if (error) {
      this.log(error.stack, 'error');
    }
  }

  // Tool implementations mimicking Claude Code tools
  async read(filePath, options = {}) {
    try {
      if (!this.tools.includes('Read')) {
        throw new Error('Read tool not available for this agent');
      }

      const fullPath = path.resolve(this.projectRoot, filePath);
      if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      
      const start = options.offset || 0;
      const limit = options.limit || lines.length;
      
      return lines.slice(start, start + limit).join('\n');
    } catch (error) {
      this.error(`Failed to read file ${filePath}`, error);
      throw error;
    }
  }

  async write(filePath, content) {
    try {
      if (!this.tools.includes('Write') && !this.tools.includes('Edit')) {
        throw new Error('Write/Edit tool not available for this agent');
      }

      const fullPath = path.resolve(this.projectRoot, filePath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content, 'utf8');
      
      this.log(`Wrote file: ${filePath}`);
      return true;
    } catch (error) {
      this.error(`Failed to write file ${filePath}`, error);
      throw error;
    }
  }

  async edit(filePath, oldString, newString, replaceAll = false) {
    try {
      if (!this.tools.includes('Edit')) {
        throw new Error('Edit tool not available for this agent');
      }

      const content = await this.read(filePath);
      let newContent;
      
      if (replaceAll) {
        newContent = content.replace(new RegExp(this.escapeRegex(oldString), 'g'), newString);
      } else {
        newContent = content.replace(oldString, newString);
      }

      if (newContent === content) {
        throw new Error(`String not found in file: ${oldString}`);
      }

      await this.write(filePath, newContent);
      this.log(`Edited file: ${filePath}`);
      return true;
    } catch (error) {
      this.error(`Failed to edit file ${filePath}`, error);
      throw error;
    }
  }

  async multiEdit(filePath, edits) {
    try {
      if (!this.tools.includes('MultiEdit')) {
        throw new Error('MultiEdit tool not available for this agent');
      }

      let content = await this.read(filePath);
      
      for (const edit of edits) {
        const { oldString, newString, replaceAll = false } = edit;
        
        if (replaceAll) {
          content = content.replace(new RegExp(this.escapeRegex(oldString), 'g'), newString);
        } else {
          content = content.replace(oldString, newString);
        }
      }

      await this.write(filePath, content);
      this.log(`Multi-edited file: ${filePath} with ${edits.length} changes`);
      return true;
    } catch (error) {
      this.error(`Failed to multi-edit file ${filePath}`, error);
      throw error;
    }
  }

  async grep(pattern, options = {}) {
    try {
      if (!this.tools.includes('Grep')) {
        throw new Error('Grep tool not available for this agent');
      }

      const {
        glob = '**/*',
        type = null,
        outputMode = 'files_with_matches',
        caseSensitive = true,
        context = 0
      } = options;

      let cmd = `rg "${pattern}"`;
      
      if (!caseSensitive) cmd += ' -i';
      if (type) cmd += ` --type ${type}`;
      if (glob !== '**/*') cmd += ` --glob "${glob}"`;
      if (outputMode === 'files_with_matches') cmd += ' -l';
      if (outputMode === 'count') cmd += ' -c';
      if (context > 0) cmd += ` -C ${context}`;

      const { stdout } = await execAsync(cmd, { cwd: this.projectRoot });
      return stdout.trim().split('\n').filter(line => line.length > 0);
    } catch (error) {
      if (error.code === 1) {
        // No matches found
        return [];
      }
      this.error(`Failed to grep pattern ${pattern}`, error);
      throw error;
    }
  }

  async glob(pattern, directory = null) {
    try {
      if (!this.tools.includes('Glob')) {
        throw new Error('Glob tool not available for this agent');
      }

      const searchDir = directory ? path.resolve(this.projectRoot, directory) : this.projectRoot;
      const cmd = `find "${searchDir}" -name "${pattern}" -type f`;
      
      const { stdout } = await execAsync(cmd);
      return stdout.trim().split('\n').filter(line => line.length > 0);
    } catch (error) {
      this.error(`Failed to glob pattern ${pattern}`, error);
      return [];
    }
  }

  async bash(command, description = '') {
    try {
      if (!this.tools.includes('Bash')) {
        throw new Error('Bash tool not available for this agent');
      }

      this.log(`Executing: ${command} - ${description}`);
      const { stdout, stderr } = await execAsync(command, { cwd: this.projectRoot });
      
      if (stderr) {
        this.log(`Command stderr: ${stderr}`, 'warn');
      }
      
      return stdout;
    } catch (error) {
      this.error(`Failed to execute command: ${command}`, error);
      throw error;
    }
  }

  async webFetch(url, prompt) {
    try {
      if (!this.tools.includes('WebFetch')) {
        throw new Error('WebFetch tool not available for this agent');
      }

      // This would need to be implemented with actual web fetching
      // For now, return a placeholder
      this.log(`WebFetch requested for: ${url}`);
      return `Fetched content from ${url} with prompt: ${prompt}`;
    } catch (error) {
      this.error(`Failed to fetch ${url}`, error);
      throw error;
    }
  }

  // Utility methods
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async fileExists(filePath) {
    const fullPath = path.resolve(this.projectRoot, filePath);
    return fs.existsSync(fullPath);
  }

  async getProjectFiles(extension = null, directory = 'src') {
    try {
      const pattern = extension ? `*.${extension}` : '*';
      return await this.glob(pattern, directory);
    } catch (error) {
      this.error(`Failed to get project files`, error);
      return [];
    }
  }

  async analyzeFileContent(filePath, analysisType = 'basic') {
    try {
      const content = await this.read(filePath);
      const analysis = {
        filePath,
        lineCount: content.split('\n').length,
        charCount: content.length,
        isEmpty: content.trim().length === 0,
        hasTypeScript: filePath.endsWith('.tsx') || filePath.endsWith('.ts'),
        hasReact: content.includes('import React') || content.includes('from \'react\''),
        hasFramerMotion: content.includes('framer-motion'),
        hasGSAP: content.includes('gsap'),
        hasCloudinary: content.includes('cloudinary') || content.includes('dvcvxhzmt'),
        imports: this.extractImports(content),
        exports: this.extractExports(content)
      };

      if (analysisType === 'detailed') {
        analysis.functions = this.extractFunctions(content);
        analysis.components = this.extractComponents(content);
        analysis.hooks = this.extractHooks(content);
      }

      return analysis;
    } catch (error) {
      this.error(`Failed to analyze file ${filePath}`, error);
      return null;
    }
  }

  extractImports(content) {
    const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
    const imports = [];
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    return imports;
  }

  extractExports(content) {
    const exportRegex = /export\s+(?:default\s+)?(?:const|function|class)\s+(\w+)/g;
    const exports = [];
    let match;
    
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }
    
    return exports;
  }

  extractFunctions(content) {
    const functionRegex = /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:\([^)]*\)\s*=>|\([^)]*\)\s*=>\s*{|function))/g;
    const functions = [];
    let match;
    
    while ((match = functionRegex.exec(content)) !== null) {
      functions.push(match[1] || match[2]);
    }
    
    return functions;
  }

  extractComponents(content) {
    const componentRegex = /(?:export\s+(?:default\s+)?)?(?:const|function)\s+([A-Z][a-zA-Z0-9]*)/g;
    const components = [];
    let match;
    
    while ((match = componentRegex.exec(content)) !== null) {
      components.push(match[1]);
    }
    
    return components;
  }

  extractHooks(content) {
    const hookRegex = /use[A-Z][a-zA-Z0-9]*\(/g;
    const hooks = new Set();
    let match;
    
    while ((match = hookRegex.exec(content)) !== null) {
      hooks.add(match[0].slice(0, -1)); // Remove the opening parenthesis
    }
    
    return Array.from(hooks);
  }

  // Abstract method that each agent must implement
  async execute() {
    throw new Error('Execute method must be implemented by subclass');
  }

  // Common validation and setup
  async validateTrigger() {
    // Override in subclasses for specific trigger validation
    return true;
  }

  async setupExecution() {
    // Override in subclasses for specific setup
    return true;
  }

  async cleanupExecution() {
    // Override in subclasses for specific cleanup
    return true;
  }
}

module.exports = BaseAgent;