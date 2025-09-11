# Spline MCP Server Integration

## Overview

The Spline MCP Server is a comprehensive Model Context Protocol (MCP) integration that enables Claude to programmatically control and interact with Spline.design 3D scenes. This integration allows for natural language-driven 3D design, animation, and interactive experience creation.

## Installation Status

✅ **Status**: Successfully installed and configured  
📍 **Location**: `/Users/disruptors/Documents/ProjectsD/DisruptorEcosystem/DM3/disruptors-media-v3/spline-mcp-server/`  
🔧 **Configuration**: Added to `/Users/disruptors/.cursor/mcp.json`

## Features & Capabilities

### 🎨 3D Object Management
- **Create, modify, and delete any 3D object** programmatically
- **Control positioning, rotation, scaling, and visibility**
- **Generate runtime code** for object interactions
- Support for complex 3D geometries and parametric objects

### ⚡ Runtime API Integration
- **Direct integration** with `@splinetool/runtime` for programmatic control
- **Generate ready-to-use code** in JavaScript, React, and Next.js
- **Create interactive animations and behaviors**
- **Implement custom event handling** and scene manipulation

### 🎭 Advanced Material System
- **Create layered materials** with extensive customization options
- **Support for all Spline material types** and properties
- **Configure complex shading options** including:
  - PBR (Physically Based Rendering) materials
  - Custom shaders and effects
  - Texture mapping and UV coordinates
  - Material blending and transparency

### 🎯 Complete Event & Action System
- **20+ event types supported**:
  - Mouse events (click, hover, drag)
  - Keyboard interactions
  - Physics collisions
  - Animation triggers
  - Custom events
- **15+ action types**:
  - Object transformations
  - Animation playback
  - State changes
  - Camera movements
  - Material updates
- **Create complex event chains** and conditional logic

### 🔗 Webhook Integration
- **Create webhooks** to receive external data
- **Build real-time data visualizations**
- **Connect with external services**:
  - Zapier automation
  - IFTTT workflows
  - n8n custom integrations
  - Custom API endpoints

## Operating Modes

### 1. MCP Server Mode (Default)
Full Model Context Protocol integration for Claude Desktop with stdio transport.

```bash
# Default mode - configured in mcp.json
node src/index.js
```

### 2. Webhook Server Mode
Standalone webhook support for data-driven visualizations.

```bash
# Start webhook server on port 3000
node bin/cli.js --mode webhook --port 3000
```

### 3. Minimal Server Mode
Lightweight option with essential functionality only.

```bash
# Minimal mode for basic operations
node bin/cli.js --mode minimal
```

## Configuration

### MCP Configuration
The server is configured in `/Users/disruptors/.cursor/mcp.json`:

```json
{
  "spline": {
    "command": "node",
    "args": [
      "/Users/disruptors/Documents/ProjectsD/DisruptorEcosystem/DM3/disruptors-media-v3/spline-mcp-server/src/index.js"
    ],
    "env": {
      "SPLINE_API_KEY": "",
      "NODE_ENV": "production",
      "MCP_MODE": "stdio"
    }
  }
}
```

### Environment Variables
Set these environment variables or create a `.env` file in the server directory:

```bash
SPLINE_API_KEY=your_spline_api_key_here
NODE_ENV=production
MCP_MODE=stdio
```

### Getting a Spline API Key
1. Visit [Spline.design](https://spline.design)
2. Create an account or log in
3. Navigate to your account settings
4. Generate an API key in the Developer section
5. Add the API key to your environment configuration

## Usage Examples

### Basic 3D Object Creation
```javascript
// Create a basic cube with material
createObject({
  type: "cube",
  name: "mycube",
  position: { x: 0, y: 0, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  material: {
    type: "basic",
    color: "#ff6b6b"
  }
});
```

### Advanced Animation Setup
```javascript
// Create complex animation with events
createAnimation({
  target: "myObject",
  properties: [
    { property: "rotation.y", to: 360, duration: 2 },
    { property: "scale", to: { x: 1.5, y: 1.5, z: 1.5 }, duration: 1 }
  ],
  events: {
    onComplete: "playNextAnimation",
    onHover: "pauseAnimation"
  }
});
```

### Webhook Data Integration
```javascript
// Setup webhook for real-time data
createWebhook({
  endpoint: "/api/data-update",
  method: "POST",
  actions: [
    {
      type: "updateMaterial",
      target: "dataVisualization",
      property: "color",
      dataPath: "payload.status"
    }
  ]
});
```

### React Component Generation
```javascript
// Generate React component with Spline integration
generateReactComponent({
  componentName: "Interactive3DScene",
  splineFile: "scene.splinecode",
  interactions: [
    {
      object: "button3D",
      event: "onClick",
      action: "navigateToPage('/products')"
    }
  ]
});
```

## Available Tools & Commands

### Object Management Tools
- `createObject` - Create 3D objects with specified properties
- `modifyObject` - Update existing object properties
- `deleteObject` - Remove objects from the scene
- `listObjects` - Get all objects in the current scene

### Animation Tools
- `createAnimation` - Define custom animations
- `playAnimation` - Start animation playback
- `pauseAnimation` - Pause ongoing animations
- `stopAnimation` - Stop and reset animations

### Material Tools
- `createMaterial` - Define custom materials
- `applyMaterial` - Apply materials to objects
- `updateMaterial` - Modify material properties
- `listMaterials` - Get all available materials

### Scene Management Tools
- `exportScene` - Export scene to various formats
- `importScene` - Import external scene files
- `saveScene` - Save current scene state
- `loadScene` - Load previously saved scenes

### Event System Tools
- `addEventListener` - Attach event handlers to objects
- `removeEventListener` - Remove event handlers
- `triggerEvent` - Manually trigger events
- `createEventChain` - Build complex event sequences

### Runtime Code Generation
- `generateJavaScript` - Generate vanilla JS runtime code
- `generateReact` - Generate React component code
- `generateNextJS` - Generate Next.js integration code
- `generateWebGL` - Generate low-level WebGL code

## Integration with Disruptors Media

### Use Cases for DM3 Project
1. **Interactive Portfolio Displays**
   - 3D product showcases
   - Interactive case study presentations
   - Immersive client testimonials

2. **Marketing Animations**
   - Branded 3D animations
   - Interactive service demonstrations
   - Dynamic data visualizations

3. **Website Enhancements**
   - 3D hero sections
   - Interactive navigation elements
   - Animated call-to-action buttons

4. **Client Presentations**
   - Interactive proposal presentations
   - 3D mockups and prototypes
   - Real-time design modifications

### Example Implementation for DM3
```javascript
// Create interactive service showcase
createServiceShowcase({
  services: [
    {
      name: "AI Marketing",
      model: "brain3D.spline",
      animation: "pulseEffect",
      interactivity: {
        hover: "highlightConnections",
        click: "showDetails"
      }
    },
    {
      name: "Studio Services",
      model: "studio3D.spline",
      animation: "rotateShowcase",
      interactivity: {
        hover: "zoomIn",
        click: "playShowreel"
      }
    }
  ]
});
```

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Verify the API key is correct
   - Check that the key has proper permissions
   - Ensure the key is properly set in environment variables

2. **Server Not Starting**
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check for port conflicts

3. **MCP Connection Issues**
   - Restart Claude Desktop
   - Verify mcp.json syntax is correct
   - Check file paths are absolute and correct

4. **Scene Loading Errors**
   - Verify Spline file format compatibility
   - Check file permissions
   - Ensure proper API authentication

### Debug Commands
```bash
# Test server functionality
cd spline-mcp-server
node src/index.js --test

# Verbose logging
NODE_ENV=development node src/index.js

# Check MCP inspector
npx @modelcontextprotocol/inspector@latest
```

## Development Notes

### Dependencies
- `@modelcontextprotocol/sdk`: ^1.17.5 (updated from ^2.0.0)
- `axios`: ^1.6.2
- `dotenv`: ^16.3.1
- `express`: ^4.18.2
- `node-fetch`: ^3.3.2
- `zod`: ^3.22.4

### File Structure
```
spline-mcp-server/
├── src/
│   ├── index.js              # Main MCP server entry point
│   ├── tools/               # MCP tool implementations
│   ├── resources/           # Resource definitions
│   ├── prompts/            # AI prompt templates
│   └── utils/              # Utility functions
├── bin/                    # CLI scripts
├── examples/               # Usage examples
├── docs/                   # Additional documentation
└── package.json           # Dependencies and scripts
```

### Security Considerations
- API keys should never be committed to version control
- Use environment variables for sensitive configuration
- Implement proper input validation for all operations
- Regular security audits of dependencies

## Future Enhancements

### Planned Features
1. **Advanced Physics Integration**
   - Real-time physics simulations
   - Collision detection and response
   - Particle systems

2. **AI-Powered Design Assistance**
   - Natural language to 3D object conversion
   - Automated scene optimization
   - Intelligent material suggestions

3. **Enhanced Export Options**
   - glTF/GLB export support
   - Unity integration
   - Unreal Engine compatibility

4. **Collaborative Features**
   - Multi-user scene editing
   - Real-time collaboration
   - Version control for 3D scenes

### Integration Roadmap
- [ ] Integrate with existing DM3 animation system (GSAP)
- [ ] Create reusable 3D component library
- [ ] Implement dynamic content integration
- [ ] Add performance monitoring and optimization
- [ ] Develop automated testing suite

## Resources

- [Spline.design Official Documentation](https://docs.spline.design/)
- [Spline Runtime API Reference](https://docs.spline.design/runtime)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)

## Support & Community

- **Issues**: Report problems via the server's GitHub repository
- **Documentation**: Refer to the docs/ folder for detailed guides
- **Examples**: Check examples/ folder for implementation patterns
- **Updates**: Monitor for new features and security patches

---

*Last Updated: January 11, 2025*  
*Version: 1.0.0*  
*Status: Production Ready*