"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCheckCircle, FiLoader, FiAlertCircle } from 'react-icons/fi';
import type { CardTier } from '@/data/card/tiers';

type CardWaitlistProps = {
  tier?: CardTier;
};

export default function CardWaitlist({ tier = 'standard' }: CardWaitlistProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/card/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier })
      });
      const json = (await res.json().catch(() => null)) as { id?: string; error?: string } | null;
      if (!res.ok) {
        setStatus('error');
        setMessage(json?.error || 'Failed to join waitlist');
        return;
      }
      setStatus('success');
      setMessage("You're on the list! We'll notify you soon.");
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 group-focus-within:text-amber-400 transition-colors">
            <FiMail className="w-5 h-5" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="Enter your email for early access"
            className="w-full pl-12 pr-32 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20"
          >
            {status === 'loading' ? (
              <FiLoader className="w-5 h-5 animate-spin mx-auto" />
            ) : status === 'success' ? (
              <FiCheckCircle className="w-5 h-5 mx-auto" />
            ) : (
              'Join Waitlist'
            )}
          </button>
        </div>

        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-8 left-0 flex items-center space-x-2 text-red-400 text-sm mt-2"
            >
              <FiAlertCircle className="w-4 h-4" />
              <span>{message}</span>
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-8 left-0 flex items-center space-x-2 text-green-400 text-sm mt-2"
            >
              <FiCheckCircle className="w-4 h-4" />
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      <p className="text-[10px] text-slate-500 mt-10 text-center lg:text-left">
        By joining, you agree to our Privacy Policy and Terms of Service.
      </p>
    </div>
  );
}
