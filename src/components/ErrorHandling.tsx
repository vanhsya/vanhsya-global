'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaExclamationTriangle, FaRedo, FaHome } from 'react-icons/fa';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{error?: Error}> },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType<{error?: Error}> }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log error to monitoring service (replace with your actual service)
    if (typeof window !== 'undefined') {
      // Example: Send to error tracking service
      console.error('Error logged for monitoring:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={() => this.setState({ hasError: false, error: undefined })} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      if (resetError) {
        resetError();
      } else {
        window.location.reload();
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center relative z-10"
      >
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <div className="bg-red-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
            <FaExclamationTriangle className="text-3xl text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            System Turbulence
          </h1>
          
          <p className="text-slate-400 mb-10 leading-relaxed">
            We've encountered an unexpected turbulence in the migration portal. 
            Our systems are currently recalibrating.
          </p>
          
          {process.env.NODE_ENV === 'development' && error && (
            <div className="mb-8 text-left bg-black/40 p-4 rounded-xl border border-white/5 max-h-40 overflow-auto">
              <pre className="text-xs font-mono text-red-400/80 leading-relaxed">
                {error.message}
              </pre>
            </div>
          )}
          
          <div className="flex flex-col gap-4">
            <motion.button
              onClick={handleRetry}
              disabled={isRetrying}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center space-x-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 rounded-2xl text-white font-bold transition-all duration-300 shadow-lg shadow-indigo-600/20"
            >
              <FaRedo className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>{isRetrying ? 'Recalibrating...' : 'Try Again'}</span>
            </motion.button>
            
            <Link
               href="/"
               className="w-full inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all duration-300 backdrop-blur-md"
             >
               <FaHome className="w-4 h-4" />
               <span>Return to Hub</span>
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface NotFoundPageProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  showHomeButton = true
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
        
        <p className="text-gray-600 mb-8">{message}</p>
        
        {showHomeButton && (
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary inline-flex items-center"
          >
            <FaHome className="mr-2" />
            Return Home
          </motion.a>
        )}
      </motion.div>
    </div>
  );
};

interface FormErrorProps {
  message: string;
  onRetry?: () => void;
}

const FormError: React.FC<FormErrorProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
    >
      <div className="flex items-start">
        <FaExclamationTriangle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-red-700 text-sm">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-red-600 hover:text-red-700 text-sm font-medium mt-2 underline"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface NetworkErrorProps {
  onRetry?: () => void;
}

const NetworkError: React.FC<NetworkErrorProps> = ({ onRetry }) => {
  return (
    <div className="text-center py-12">
      <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaExclamationTriangle className="text-2xl text-orange-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Connection Problem
      </h3>
      
      <p className="text-gray-600 mb-6">
        Please check your internet connection and try again.
      </p>
      
      {onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary"
        >
          <FaRedo className="mr-2" />
          Retry
        </motion.button>
      )}
    </div>
  );
};

export {
  DefaultErrorFallback,
  NotFoundPage,
  FormError,
  NetworkError
};
