'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: 'low' | 'medium' | 'high';
  onClick?: () => void;
}

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true,
  blur = 'md',
  opacity = 'medium',
  onClick
}: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  const opacityClasses = {
    low: 'bg-white/5',
    medium: 'bg-white/10',
    high: 'bg-white/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        ${opacityClasses[opacity]} 
        ${blurClasses[blur]}
        border border-white/20 
        rounded-2xl 
        p-6 
        shadow-lg 
        shadow-black/10
        hover:shadow-xl 
        hover:shadow-black/20
        hover:border-white/30
        transition-all 
        duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

// Specialized Glass Card Variants
export function GlassServiceCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <GlassCard 
      className={`group cursor-pointer ${className}`}
      blur="lg"
      opacity="medium"
    >
      {children}
    </GlassCard>
  );
}

export function GlassStatCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <GlassCard 
      className={`text-center ${className}`}
      blur="md"
      opacity="high"
    >
      {children}
    </GlassCard>
  );
}

export function GlassFeatureCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <GlassCard 
      className={`h-full ${className}`}
      blur="lg"
      opacity="medium"
    >
      {children}
    </GlassCard>
  );
}
