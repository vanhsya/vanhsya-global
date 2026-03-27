'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiRefreshCw, FiHome, FiAlertCircle, FiChevronRight } from 'react-icons/fi';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Log the error to an analytics service
    console.error('Application Error:', error);
  }, [error]);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount((prev) => prev + 1);
    
    // Implement exponential backoff for simulated retry
    const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
    
    setTimeout(() => {
      reset();
      setIsRetrying(false);
    }, delay);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Cosmic Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center">
          {/* Error Icon */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-500/20"
          >
            <FiAlertCircle className="w-10 h-10 text-red-500" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Systems Interrupted
          </h1>
          
          <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
            We've encountered an unexpected turbulence in the migration portal. 
            Our AI systems are currently recalibrating.
          </p>

          {/* Error Details (Only in development or with specific digest) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-10 p-4 bg-black/40 rounded-xl border border-white/5 text-left overflow-auto max-h-40">
              <p className="text-xs font-mono text-red-400/80 leading-relaxed">
                {error.message || 'Unknown technical error'}
                {error.digest && <span className="block mt-2 text-slate-500 italic">Digest: {error.digest}</span>}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 rounded-2xl text-white font-bold transition-all duration-300 shadow-lg shadow-indigo-600/20"
            >
              <FiRefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>{isRetrying ? `Recalibrating...` : 'Try Again'}</span>
            </motion.button>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/"
                className="w-full inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold transition-all duration-300 backdrop-blur-md"
              >
                <FiHome className="w-5 h-5" />
                <span>Return to Hub</span>
              </Link>
            </motion.div>
          </div>

          {/* Help Links */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="text-sm text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
              Contact Support <FiChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/status" className="text-sm text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1 group">
              System Status <FiChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
