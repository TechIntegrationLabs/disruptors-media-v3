/**
 * Feature Wrapper Components
 * Intelligent UI rendering based on deployment context and feature availability
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, InformationCircleIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { DeploymentFeatures, DeploymentContext, isFeatureAvailable, getFeatureMessage, getPlatformDisplayName } from '../../utils/deploymentContext';

interface FeatureWrapperProps {
  feature: keyof DeploymentFeatures;
  context: DeploymentContext;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showMessage?: boolean;
  className?: string;
}

/**
 * Main feature wrapper component
 * Shows children if feature is available, otherwise shows fallback or disabled state
 */
export const FeatureWrapper: React.FC<FeatureWrapperProps> = ({
  feature,
  context,
  children,
  fallback,
  showMessage = true,
  className = ""
}) => {
  const available = isFeatureAvailable(feature, context);
  const message = getFeatureMessage(feature, context);

  if (available) {
    return <div className={className}>{children}</div>;
  }

  if (fallback) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Disabled overlay */}
      <div className="relative opacity-50 pointer-events-none">
        {children}
      </div>
      
      {/* Feature unavailable indicator */}
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-lg backdrop-blur-sm"
        >
          <div className="text-center p-4 max-w-sm">
            <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-gray-300 mb-2">Feature Not Available</p>
            <p className="text-xs text-gray-400">{message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/**
 * Button wrapper for features that require specific capabilities
 */
interface FeatureButtonProps {
  feature: keyof DeploymentFeatures;
  context: DeploymentContext;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const FeatureButton: React.FC<FeatureButtonProps> = ({
  feature,
  context,
  onClick,
  children,
  className = "",
  variant = 'primary'
}) => {
  const available = isFeatureAvailable(feature, context);
  const message = getFeatureMessage(feature, context);

  const baseClasses = "relative transition-all duration-200";
  const variantClasses = {
    primary: available 
      ? "bg-gold text-black hover:bg-yellow-400" 
      : "bg-gray-600 text-gray-400 cursor-not-allowed",
    secondary: available 
      ? "bg-gray-700 text-white hover:bg-gray-600" 
      : "bg-gray-800 text-gray-500 cursor-not-allowed",
    danger: available 
      ? "bg-red-600 text-white hover:bg-red-500" 
      : "bg-gray-600 text-gray-400 cursor-not-allowed"
  };

  return (
    <div className="relative group">
      <button
        onClick={available ? onClick : undefined}
        disabled={!available}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        title={available ? undefined : message}
      >
        {children}
      </button>
      
      {/* Tooltip for disabled state */}
      {!available && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {message}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

/**
 * Tab wrapper for admin panel tabs
 */
interface FeatureTabProps {
  feature: keyof DeploymentFeatures;
  context: DeploymentContext;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const FeatureTab: React.FC<FeatureTabProps> = ({
  feature,
  context,
  isActive,
  onClick,
  children
}) => {
  const available = isFeatureAvailable(feature, context);
  const message = getFeatureMessage(feature, context);

  const baseClasses = "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative";
  const activeClasses = isActive 
    ? "bg-gray-800 text-white border-b-2 border-gold" 
    : "text-gray-400 hover:text-white";
  
  const disabledClasses = !available ? "opacity-60" : "";

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`${baseClasses} ${activeClasses} ${disabledClasses}`}
        title={available ? undefined : `Limited functionality: ${message}`}
      >
        <span className="flex items-center gap-2">
          {children}
          {!available && (
            <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400" />
          )}
        </span>
      </button>
      
      {/* Limited functionality indicator */}
      {!available && isActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-yellow-900/50 border-l-4 border-yellow-400 p-2 text-xs text-yellow-200 z-10"
        >
          <div className="flex items-start gap-2">
            <InformationCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/**
 * Deployment status indicator
 */
interface DeploymentStatusProps {
  context: DeploymentContext;
  className?: string;
}

export const DeploymentStatus: React.FC<DeploymentStatusProps> = ({
  context,
  className = ""
}) => {
  const platformName = getPlatformDisplayName(context.platform);
  const availableFeatures = Object.values(context.features).filter(Boolean).length;
  const totalFeatures = Object.keys(context.features).length;

  const statusColor = context.isLocal 
    ? "text-green-400" 
    : availableFeatures > totalFeatures / 2 
      ? "text-yellow-400" 
      : "text-red-400";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-gray-800 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Deployment Status</h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          context.isLocal 
            ? "bg-green-900 text-green-200" 
            : "bg-gray-700 text-gray-300"
        }`}>
          {platformName}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-sm text-gray-400">Environment</p>
          <p className="text-white">{context.isLocal ? 'Development' : 'Production'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Backend</p>
          <p className={statusColor}>{context.hasBackend ? 'Connected' : 'Unavailable'}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-400">Available Features</p>
          <p className={`text-sm ${statusColor}`}>
            {availableFeatures}/{totalFeatures}
          </p>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              availableFeatures === totalFeatures 
                ? 'bg-green-400' 
                : availableFeatures > totalFeatures / 2 
                  ? 'bg-yellow-400' 
                  : 'bg-red-400'
            }`}
            style={{ width: `${(availableFeatures / totalFeatures) * 100}%` }}
          />
        </div>
      </div>

      {context.limitations.length > 0 && (
        <div>
          <p className="text-sm text-gray-400 mb-2">Current Limitations</p>
          <div className="space-y-1">
            {context.limitations.map((limitation, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-gray-300">
                <ExclamationTriangleIcon className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>{limitation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!context.isLocal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-blue-900/30 border border-blue-400/30 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <CommandLineIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-200 mb-1">
                Enable Full Functionality
              </p>
              <p className="text-xs text-blue-300 mb-2">
                Clone this repository locally for complete admin panel features including Claude Code integration.
              </p>
              <code className="text-xs bg-gray-800 px-2 py-1 rounded text-green-400">
                git clone [repo-url] && npm install && npm run dev:full
              </code>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};