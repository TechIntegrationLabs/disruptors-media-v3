/**
 * Deployment Context Detection
 * Smart feature detection based on environment and platform capabilities
 */

export interface DeploymentFeatures {
  claudeIntegration: boolean;
  webSockets: boolean;
  processControl: boolean;
  realTimeSync: boolean;
  serviceManagement: boolean;
  mcpServers: boolean;
  dataSync: boolean;
  fileSystem: boolean;
}

export interface DeploymentContext {
  isLocal: boolean;
  isProduction: boolean;
  hasBackend: boolean;
  platform: 'local' | 'netlify' | 'railway' | 'digitalocean' | 'vercel' | 'unknown';
  features: DeploymentFeatures;
  bridgeUrl?: string;
  limitations: string[];
}

/**
 * Detect current deployment environment and available features
 */
export const detectDeploymentContext = async (): Promise<DeploymentContext> => {
  const isLocal = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Platform detection
  let platform: DeploymentContext['platform'] = 'unknown';
  if (isLocal) {
    platform = 'local';
  } else if (process.env.REACT_APP_NETLIFY === 'true' || window.location.hostname.includes('netlify')) {
    platform = 'netlify';
  } else if (process.env.REACT_APP_RAILWAY === 'true' || window.location.hostname.includes('railway')) {
    platform = 'railway';
  } else if (process.env.REACT_APP_DIGITALOCEAN === 'true' || window.location.hostname.includes('digitalocean')) {
    platform = 'digitalocean';
  } else if (process.env.REACT_APP_VERCEL === 'true' || window.location.hostname.includes('vercel')) {
    platform = 'vercel';
  }

  // Backend availability detection
  const bridgeUrl = process.env.REACT_APP_CLAUDE_BRIDGE_URL || 'ws://localhost:3456';
  let hasBackend = false;
  
  if (isLocal) {
    // Check if local bridge server is running
    try {
      const response = await fetch('http://localhost:3456/health');
      hasBackend = response.ok;
    } catch {
      hasBackend = false;
    }
  } else if (platform === 'railway' || platform === 'digitalocean') {
    // Check if production backend is available
    try {
      const healthUrl = bridgeUrl.replace('ws:', 'http:').replace('wss:', 'https:') + '/health';
      const response = await fetch(healthUrl);
      hasBackend = response.ok;
    } catch {
      hasBackend = false;
    }
  }

  // Feature availability based on platform and backend
  const features: DeploymentFeatures = {
    claudeIntegration: isLocal && hasBackend,
    webSockets: hasBackend && (platform === 'local' || platform === 'railway' || platform === 'digitalocean'),
    processControl: isLocal,
    realTimeSync: hasBackend,
    serviceManagement: hasBackend || isLocal,
    mcpServers: hasBackend && (platform === 'local' || platform === 'railway' || platform === 'digitalocean'),
    dataSync: true, // Available through APIs even on static hosting
    fileSystem: isLocal
  };

  // Platform limitations
  const limitations: string[] = [];
  
  if (platform === 'netlify' || platform === 'vercel') {
    limitations.push('WebSocket connections not supported');
    limitations.push('Claude Code integration requires local development');
    limitations.push('Real-time features limited to static data');
    limitations.push('Service management not available');
  }
  
  if (!isLocal && !hasBackend) {
    limitations.push('Backend services not available');
    limitations.push('MCP server integration disabled');
    limitations.push('Real-time synchronization disabled');
  }

  if (!features.claudeIntegration) {
    limitations.push('Claude Code CLI integration requires local environment with bridge server');
  }

  return {
    isLocal,
    isProduction,
    hasBackend,
    platform,
    features,
    bridgeUrl: hasBackend ? bridgeUrl : undefined,
    limitations
  };
};

// Export React for the hook
import React from 'react';

/**
 * Hook for using deployment context in React components
 */
export const useDeploymentContext = () => {
  const [context, setContext] = React.useState<DeploymentContext | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    detectDeploymentContext().then(ctx => {
      setContext(ctx);
      setLoading(false);
    });
  }, []);

  return { context, loading };
};

/**
 * Feature availability checker
 */
export const isFeatureAvailable = (feature: keyof DeploymentFeatures, context?: DeploymentContext): boolean => {
  return context?.features[feature] ?? false;
};

/**
 * Get user-friendly platform name
 */
export const getPlatformDisplayName = (platform: DeploymentContext['platform']): string => {
  const names = {
    local: 'Local Development',
    netlify: 'Netlify',
    railway: 'Railway',
    digitalocean: 'DigitalOcean',
    vercel: 'Vercel',
    unknown: 'Unknown Platform'
  };
  return names[platform];
};

/**
 * Get feature status message
 */
export const getFeatureMessage = (feature: keyof DeploymentFeatures, context: DeploymentContext): string => {
  const isAvailable = isFeatureAvailable(feature, context);
  
  if (isAvailable) return 'Available';
  
  const messages = {
    claudeIntegration: 'Requires local development environment with Claude Code CLI',
    webSockets: 'Requires full-stack deployment platform (Railway, DigitalOcean)',
    processControl: 'Only available in local development',
    realTimeSync: 'Requires backend server connection',
    serviceManagement: 'Requires backend server or local environment',
    mcpServers: 'Requires backend with MCP server configuration',
    dataSync: 'Available through API calls',
    fileSystem: 'Only available in local development'
  };

  return messages[feature] || 'Not available in current environment';
};