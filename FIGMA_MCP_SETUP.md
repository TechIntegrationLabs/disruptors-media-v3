# Figma MCP Setup Documentation

## Overview

We have configured two Figma MCP servers for different use cases:

### 1. figma-developer (Framelink) - For One-Shot Design Implementation
- **Purpose**: Read-only access optimized for converting Figma designs to code
- **Best for**: Implementing designs, extracting layout/styling information
- **Setup**: Already configured with your Figma API key

### 2. cursor-talk-to-figma - For Bidirectional Communication
- **Purpose**: Real-time read/write access to Figma via WebSocket
- **Best for**: Interactive design modifications, annotations, prototyping
- **Setup**: Requires additional setup (see below)

## Usage

### Using figma-developer (Already Active)
Simply paste a Figma link in Cursor's chat and ask to implement the design:
```
https://www.figma.com/file/YOUR_FILE_KEY/...
"Implement this design as a React component"
```

### Using cursor-talk-to-figma (Advanced Features)

#### First-Time Setup:
1. Install Bun if not already installed:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. Start the WebSocket server:
   ```bash
   cd cursor-talk-to-figma-mcp
   bun socket
   ```

3. Install the Figma plugin:
   - Go to Figma > Plugins > Development > New Plugin
   - Choose "Link existing plugin"
   - Select `cursor-talk-to-figma-mcp/src/cursor_mcp_plugin/manifest.json`

4. In Figma, run the "Cursor Talk to Figma MCP Plugin"

5. In Cursor, use the `join_channel` tool to connect

#### Available Tools:
- Document & Selection: `get_document_info`, `get_selection`, `read_my_design`
- Creating Elements: `create_frame`, `create_text`, `create_rectangle`
- Modifying: `set_text_content`, `set_fill_color`, `move_node`, `resize_node`
- Components: `get_local_components`, `create_component_instance`
- Annotations: `set_annotation`, `get_annotations`
- And many more...

## API Keys

Your Figma API key is already configured:
```
YOUR_FIGMA_TOKEN_HERE
```

## Best Practices

1. **For implementing designs**: Use `figma-developer` - it's simpler and optimized for this
2. **For modifying designs**: Use `cursor-talk-to-figma` with the WebSocket server running
3. **Always start with**: `get_document_info` to understand the file structure
4. **For large files**: Use `depth=1` parameter and increase as needed

## Troubleshooting

- If MCP servers don't appear, restart Cursor
- For cursor-talk-to-figma, ensure the WebSocket server is running
- Check that your Figma API key has proper permissions

## Windows/WSL Users

For cursor-talk-to-figma on Windows:
1. Install Bun via PowerShell:
   ```powershell
   powershell -c "irm bun.sh/install.ps1|iex"
   ```
2. Edit `src/socket.ts` and uncomment the hostname "0.0.0.0" line