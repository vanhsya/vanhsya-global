'use client';
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'button';
  lines?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  variant = 'text',
  lines = 1 
}) => {
  const baseClasses = 'bg-gray-200 animate-pulse rounded';
  
  const variants = {
    text: 'h-4 w-full',
    card: 'h-48 w-full',
    avatar: 'h-12 w-12 rounded-full',
    button: 'h-10 w-24'
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, index) => (
          <div 
            key={index}
            className={`${baseClasses} ${variants[variant]} ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} ${className}`}
    >
      <svg 
        className="w-full h-full text-blue-600" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
};

interface LoadingButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`relative flex items-center justify-center transition-all duration-200 ${
        loading || disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-105'
      } ${className}`}
    >
      {loading && (
        <LoadingSpinner size="sm" className="mr-2" />
      )}
      <span className={loading ? 'opacity-75' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
};

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ 
  message = 'Loading your immigration journey...' 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          VANHSYA Global Migration
        </h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

interface ServiceCardSkeletonProps {
  count?: number;
}

const ServiceCardSkeleton: React.FC<ServiceCardSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
          <LoadingSkeleton variant="avatar" className="mb-4" />
          <LoadingSkeleton variant="text" className="mb-2 h-6" />
          <LoadingSkeleton variant="text" lines={3} className="mb-4" />
          <LoadingSkeleton variant="text" className="mb-4 h-8 w-20" />
          <LoadingSkeleton variant="button" className="w-full" />
        </div>
      ))}
    </div>
  );
};

interface CountryCardSkeletonProps {
  count?: number;
}

const CountryCardSkeleton: React.FC<CountryCardSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-md">
          <LoadingSkeleton variant="card" className="mb-4 h-32" />
          <LoadingSkeleton variant="text" className="mb-2 h-5" />
          <LoadingSkeleton variant="text" lines={2} className="mb-3" />
          <LoadingSkeleton variant="button" className="w-full h-8" />
        </div>
      ))}
    </div>
  );
};

export {
  LoadingSkeleton,
  LoadingSpinner,
  LoadingButton,
  LoadingPage,
  ServiceCardSkeleton,
  CountryCardSkeleton
};
