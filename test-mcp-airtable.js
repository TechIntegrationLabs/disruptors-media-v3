/**
 * Test script to verify MCP Airtable integration
 * This helps debug MCP server connectivity issues
 */

console.log('🔍 Testing MCP Airtable Integration');
console.log('='.repeat(50));

// Check if we're running in an MCP-enabled environment
console.log('Environment check:');
console.log('- Node.js version:', process.version);
console.log('- Working directory:', process.cwd());
console.log('- Arguments:', process.argv);

// Check for MCP-specific environment variables
const mcpEnvVars = Object.keys(process.env).filter(key => 
  key.includes('MCP') || key.includes('CLAUDE') || key.includes('CURSOR')
);

if (mcpEnvVars.length > 0) {
  console.log('- MCP-related env vars:', mcpEnvVars);
} else {
  console.log('- No MCP environment variables found');
}

// Test if MCP tools are available (this would work in Claude Desktop context)
try {
  // In a proper MCP environment, we might have access to tools
  console.log('\n🧪 MCP Tools Test:');
  console.log('This script is running in Node.js context.');
  console.log('MCP tools are only available within Claude Desktop sessions.');
  console.log('');
  console.log('✅ To enable MCP Airtable access:');
  console.log('1. Restart Claude Desktop');
  console.log('2. Ensure ~/.cursor/mcp.json is properly configured');
  console.log('3. Start a new conversation');
  console.log('4. MCP tools will be available in that session');
  
} catch (error) {
  console.error('MCP test failed:', error.message);
}

console.log('\n' + '='.repeat(50));
console.log('Current MCP Configuration:');
console.log('File: /Users/disruptors/.cursor/mcp.json');

try {
  const fs = require('fs');
  const mcpConfig = JSON.parse(fs.readFileSync('/Users/disruptors/.cursor/mcp.json', 'utf8'));
  
  if (mcpConfig.mcpServers && mcpConfig.mcpServers.airtable) {
    console.log('✅ Airtable MCP server is configured');
    console.log('   Command:', mcpConfig.mcpServers.airtable.command);
    console.log('   Args:', mcpConfig.mcpServers.airtable.args);
    console.log('   API Key configured:', !!mcpConfig.mcpServers.airtable.env?.AIRTABLE_API_KEY);
  } else {
    console.log('❌ Airtable MCP server not found in configuration');
  }
} catch (error) {
  console.error('Error reading MCP config:', error.message);
}

console.log('\n💡 Next Steps:');
console.log('1. The MCP server is configured in your ~/.cursor/mcp.json');
console.log('2. Restart Claude Desktop to load the new configuration');
console.log('3. In a new Claude Desktop session, I should have access to:');
console.log('   - airtable_list_bases()');
console.log('   - airtable_list_tables()');
console.log('   - airtable_create_table()');
console.log('   - airtable_create_field()');
console.log('   - airtable_create_record()');
console.log('   - airtable_update_record()');
console.log('4. This will allow me to set up your bases automatically!');