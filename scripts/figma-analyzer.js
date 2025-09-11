#!/usr/bin/env node

/**
 * Figma Design Analyzer
 * Extracts design specifications from Figma files using the Figma REST API
 * 
 * Usage: node scripts/figma-analyzer.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const FIGMA_API_KEY = process.env.FIGMA_API_KEY || 'YOUR_FIGMA_TOKEN_HERE';
const FILE_KEY = 'LQNjsFtf6FHRemllaCGYvt';
const NODE_ID = '1152-3680';

// Figma API endpoints
const API_BASE = 'https://api.figma.com/v1';
const endpoints = {
  file: `${API_BASE}/files/${FILE_KEY}`,
  fileNodes: `${API_BASE}/files/${FILE_KEY}/nodes`,
  images: `${API_BASE}/images/${FILE_KEY}`,
  styles: `${API_BASE}/files/${FILE_KEY}/styles`
};

// API headers
const headers = {
  'X-Figma-Token': FIGMA_API_KEY,
  'Content-Type': 'application/json'
};

/**
 * Extract color information from a paint object
 */
function extractColor(paint) {
  if (!paint) return null;
  
  switch (paint.type) {
    case 'SOLID':
      const { r, g, b, a = 1 } = paint.color;
      const hex = '#' + [r, g, b].map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('');
      return {
        type: 'solid',
        hex,
        rgba: `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`
      };
    case 'GRADIENT_LINEAR':
    case 'GRADIENT_RADIAL':
    case 'GRADIENT_ANGULAR':
      return {
        type: 'gradient',
        gradientType: paint.type,
        stops: paint.gradientStops?.map(stop => ({
          position: stop.position,
          color: extractColor({ type: 'SOLID', color: stop.color })
        }))
      };
    default:
      return { type: paint.type };
  }
}

/**
 * Extract typography information from text style
 */
function extractTypography(style) {
  return {
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    lineHeight: style.lineHeightPx || style.lineHeightPercentFontSize,
    letterSpacing: style.letterSpacing,
    textCase: style.textCase,
    textDecoration: style.textDecoration
  };
}

/**
 * Extract spacing and layout information
 */
function extractLayout(node) {
  return {
    width: node.absoluteBoundingBox?.width,
    height: node.absoluteBoundingBox?.height,
    x: node.absoluteBoundingBox?.x,
    y: node.absoluteBoundingBox?.y,
    constraints: node.constraints,
    layoutMode: node.layoutMode,
    paddingLeft: node.paddingLeft,
    paddingRight: node.paddingRight,
    paddingTop: node.paddingTop,
    paddingBottom: node.paddingBottom,
    itemSpacing: node.itemSpacing,
    counterAxisSpacing: node.counterAxisSpacing
  };
}

/**
 * Recursively analyze nodes to extract design tokens
 */
function analyzeNode(node, depth = 0) {
  const analysis = {
    id: node.id,
    name: node.name,
    type: node.type,
    depth
  };

  // Extract colors
  if (node.fills && node.fills.length > 0) {
    analysis.fills = node.fills.map(extractColor).filter(Boolean);
  }

  if (node.strokes && node.strokes.length > 0) {
    analysis.strokes = node.strokes.map(extractColor).filter(Boolean);
  }

  // Extract typography for text nodes
  if (node.type === 'TEXT' && node.style) {
    analysis.typography = extractTypography(node.style);
  }

  // Extract layout information
  analysis.layout = extractLayout(node);

  // Extract effects (shadows, blurs, etc.)
  if (node.effects && node.effects.length > 0) {
    analysis.effects = node.effects.map(effect => ({
      type: effect.type,
      visible: effect.visible,
      radius: effect.radius,
      color: effect.color ? extractColor({ type: 'SOLID', color: effect.color }) : null,
      offset: effect.offset,
      spread: effect.spread
    }));
  }

  // Recursively analyze children
  if (node.children && node.children.length > 0) {
    analysis.children = node.children.map(child => analyzeNode(child, depth + 1));
  }

  return analysis;
}

/**
 * Extract design tokens from the analysis
 */
function extractDesignTokens(analysis) {
  const tokens = {
    colors: new Set(),
    typography: new Set(),
    spacing: new Set(),
    effects: new Set()
  };

  function traverse(node) {
    // Collect colors
    if (node.fills) {
      node.fills.forEach(fill => {
        if (fill.hex) tokens.colors.add(JSON.stringify(fill));
      });
    }
    
    if (node.strokes) {
      node.strokes.forEach(stroke => {
        if (stroke.hex) tokens.colors.add(JSON.stringify(stroke));
      });
    }

    // Collect typography
    if (node.typography) {
      tokens.typography.add(JSON.stringify(node.typography));
    }

    // Collect spacing values
    if (node.layout) {
      const { width, height, paddingLeft, paddingRight, paddingTop, paddingBottom, itemSpacing } = node.layout;
      [width, height, paddingLeft, paddingRight, paddingTop, paddingBottom, itemSpacing]
        .filter(val => val != null && val > 0)
        .forEach(val => tokens.spacing.add(val));
    }

    // Collect effects
    if (node.effects) {
      node.effects.forEach(effect => tokens.effects.add(JSON.stringify(effect)));
    }

    // Traverse children
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  traverse(analysis);

  return {
    colors: Array.from(tokens.colors).map(JSON.parse),
    typography: Array.from(tokens.typography).map(JSON.parse),
    spacing: Array.from(tokens.spacing).sort((a, b) => a - b),
    effects: Array.from(tokens.effects).map(JSON.parse)
  };
}

/**
 * Main analysis function
 */
async function analyzeFigmaFile() {
  try {
    console.log('🎨 Analyzing Figma file...');
    
    // Get file information
    console.log('📄 Fetching file data...');
    const fileResponse = await axios.get(endpoints.file, { headers });
    const fileData = fileResponse.data;

    console.log(`File: ${fileData.name}`);
    console.log(`Last Modified: ${fileData.lastModified}`);
    console.log(`Version: ${fileData.version}`);

    // Get specific node if NODE_ID is provided
    let targetNodes = fileData.document.children;
    if (NODE_ID) {
      console.log(`🎯 Fetching specific node: ${NODE_ID}...`);
      const nodesResponse = await axios.get(`${endpoints.fileNodes}?ids=${NODE_ID}`, { headers });
      if (nodesResponse.data.nodes[NODE_ID]) {
        targetNodes = [nodesResponse.data.nodes[NODE_ID]];
      }
    }

    // Analyze nodes
    console.log('🔍 Analyzing design elements...');
    const analysis = targetNodes.map(node => analyzeNode(node));

    // Extract design tokens
    console.log('🎨 Extracting design tokens...');
    const designTokens = analysis.map(extractDesignTokens).reduce((acc, tokens) => ({
      colors: [...acc.colors, ...tokens.colors],
      typography: [...acc.typography, ...tokens.typography],
      spacing: [...new Set([...acc.spacing, ...tokens.spacing])].sort((a, b) => a - b),
      effects: [...acc.effects, ...tokens.effects]
    }), { colors: [], typography: [], spacing: [], effects: [] });

    // Create comprehensive report
    const report = {
      meta: {
        fileName: fileData.name,
        fileKey: FILE_KEY,
        nodeId: NODE_ID,
        lastModified: fileData.lastModified,
        version: fileData.version,
        analyzedAt: new Date().toISOString()
      },
      designTokens,
      fullAnalysis: analysis,
      summary: {
        totalColors: designTokens.colors.length,
        uniqueTypographyStyles: designTokens.typography.length,
        spacingValues: designTokens.spacing.length,
        effects: designTokens.effects.length
      }
    };

    // Save report
    const outputPath = path.join(__dirname, '..', 'figma-analysis-report.json');
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`✅ Analysis complete! Report saved to: ${outputPath}`);

    // Print summary
    console.log('\n📊 DESIGN ANALYSIS SUMMARY');
    console.log('========================');
    console.log(`Colors Found: ${report.summary.totalColors}`);
    console.log(`Typography Styles: ${report.summary.uniqueTypographyStyles}`);
    console.log(`Spacing Values: ${report.summary.spacingValues}`);
    console.log(`Effects: ${report.summary.effects}`);

    // Print key colors
    if (designTokens.colors.length > 0) {
      console.log('\n🎨 KEY COLORS:');
      designTokens.colors
        .filter(color => color.hex)
        .slice(0, 10)
        .forEach(color => console.log(`  ${color.hex} (${color.rgba})`));
    }

    // Print typography styles
    if (designTokens.typography.length > 0) {
      console.log('\n📝 TYPOGRAPHY STYLES:');
      designTokens.typography
        .slice(0, 5)
        .forEach(typo => console.log(`  ${typo.fontFamily} ${typo.fontWeight} ${typo.fontSize}px`));
    }

    return report;

  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

// Run analysis if called directly
if (require.main === module) {
  analyzeFigmaFile();
}

module.exports = { analyzeFigmaFile, extractDesignTokens, analyzeNode };