import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Here you could send error reports to a service like Sentry
    // reportErrorToService(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 max-w-md w-full text-center"
          >
            <ExclamationTriangleIcon className="h-16 w-16 text-red-400 mx-auto mb-6" />
            
            <h1 className="text-2xl font-bold text-white mb-4">
              Something went wrong
            </h1>
            
            <p className="text-gray-300 mb-6">
              We're sorry, but something unexpected happened. Please try again or contact support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-gold cursor-pointer mb-2">
                  Error Details (Development)
                </summary>
                <pre className="bg-dark-light p-4 rounded text-xs text-gray-300 overflow-auto">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleRetry}
                className="btn-primary flex items-center justify-center"
              >
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Try Again
              </button>
              
              <a 
                href="/"
                className="btn-secondary text-center"
              >
                Go Home
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-gray-400">
                Need help? Contact us at{' '}
                <a 
                  href="mailto:support@disruptorsmedia.com"
                  className="text-gold hover:text-gold-light"
                >
                  support@disruptorsmedia.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;