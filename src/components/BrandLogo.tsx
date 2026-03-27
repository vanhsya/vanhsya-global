"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

type LogoVariant = 'A' | 'B';
type LogoLockup = 'icon' | 'stacked' | 'horizontal';

type BrandLogoProps = {
  lockup?: LogoLockup;
  href?: string;
  className?: string;
  priority?: boolean;
  emblemSize?: number;
  chrome?: 'full' | 'none';
  enableParallax?: boolean;
  enableReveal?: boolean;
  experimentKey?: string;
  forcedVariant?: LogoVariant;
  showDescriptor?: boolean;
  onEngage?: (event: 'impression' | 'hover' | 'click', variant: LogoVariant) => void;
};

const DEFAULT_EXPERIMENT_KEY = 'logoHero.v1';

const getQueryVariant = () => {
  if (typeof globalThis === 'undefined' || !globalThis.location) return undefined;
  const url = new URL(globalThis.location.href);
  const v = url.searchParams.get('logoVariant');
  if (v === 'A' || v === 'B') return v;
  return undefined;
};

const getStoredVariant = (key: string) => {
  try {
    const v = localStorage.getItem(key);
    if (v === 'A' || v === 'B') return v;
  } catch {}
  return undefined;
};

const setStoredVariant = (key: string, v: LogoVariant) => {
  try {
    localStorage.setItem(key, v);
  } catch {}
};

const recordEvent = (key: string, event: string, variant: LogoVariant) => {
  try {
    const storageKey = `${key}.events`;
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? (JSON.parse(raw) as Record<string, number>) : {};
    const k = `${variant}.${event}`;
    parsed[k] = (parsed[k] ?? 0) + 1;
    localStorage.setItem(storageKey, JSON.stringify(parsed));
  } catch {}
};

const pickVariant = (): LogoVariant => (Math.random() < 0.5 ? 'A' : 'B');

export default function BrandLogo({
  lockup = 'stacked',
  href = '/',
  className = '',
  priority = false,
  emblemSize,
  chrome = 'full',
  enableParallax = false,
  enableReveal = true,
  experimentKey = DEFAULT_EXPERIMENT_KEY,
  forcedVariant,
  showDescriptor = true,
  onEngage,
}: BrandLogoProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const storageKey = useMemo(() => `vanhsya.ab.${experimentKey}`, [experimentKey]);
  const [variant, setVariant] = useState<LogoVariant>('A');
  const [hasImpressed, setHasImpressed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side only initialization
  useEffect(() => {
    const raf = globalThis.requestAnimationFrame(() => {
      setMounted(true);
      const v = forcedVariant ?? getQueryVariant() ?? getStoredVariant(storageKey) ?? pickVariant();
      setVariant(v);
      setStoredVariant(storageKey, v);
    });
    return () => globalThis.cancelAnimationFrame(raf);
  }, [forcedVariant, storageKey]);

  const lockupConfig = useMemo(() => {
    // Default to 'logo.png' during SSR to avoid mismatch
    const emblemSrc = '/images/originallogo.png';
    const resolvedEmblemSize = emblemSize ?? (lockup === 'icon' ? 44 : 120);

    return {
      emblemSrc,
      emblemSize: resolvedEmblemSize,
      showWordmark: lockup !== 'icon',
      wordmarkText: 'VANHSYA',
      taglineText: lockup === 'horizontal' ? 'Global Migration' : 'Global Migration Platform',
    };
  }, [emblemSize, lockup]);

  useEffect(() => {
    if (!mounted || hasImpressed) return;
    queueMicrotask(() => {
      setHasImpressed(true);
      recordEvent(storageKey, 'impression', variant);
      onEngage?.('impression', variant);
    });
  }, [mounted, hasImpressed, onEngage, storageKey, variant]);

  const containerVariants = {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 18, filter: 'blur(10px)' },
    in: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  const parallaxY = useTransform(scrollY, [0, 700], [0, prefersReducedMotion ? 0 : -24]);
  const shimmerOpacity = useTransform(scrollY, [0, 400], [0.9, 0.25]);

  const content = (
    <motion.div
      ref={ref}
      initial={enableReveal ? 'initial' : false}
      whileInView={enableReveal ? 'in' : undefined}
      viewport={enableReveal ? { once: true, amount: 0.4 } : undefined}
      variants={containerVariants}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      style={enableParallax ? { y: parallaxY } : undefined}
      className={`group relative inline-flex items-center ${lockup === 'horizontal' ? 'gap-4' : 'flex-col gap-4'} ${className}`}
      onMouseEnter={() => {
        recordEvent(storageKey, 'hover', variant);
        onEngage?.('hover', variant);
      }}
      onClick={() => {
        recordEvent(storageKey, 'click', variant);
        onEngage?.('click', variant);
      }}
    >
      <motion.div
        whileHover={prefersReducedMotion ? undefined : { rotate: -2, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        className="relative"
      >
        {chrome === 'full' ? (
          <>
            <div className="absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-amber-300/20 via-purple-500/20 to-indigo-500/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
            <div
              className={`relative rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40 ${
                lockupConfig.emblemSize <= 44 ? 'p-2' : 'p-4'
              }`}
            >
              <div className="relative" style={{ width: lockupConfig.emblemSize, height: lockupConfig.emblemSize }}>
                <Image
                  src={lockupConfig.emblemSrc}
                  alt="VANHSYA logo"
                  fill
                  className="object-contain"
                  priority={priority}
                  sizes={
                    lockup === 'icon'
                      ? '(max-width: 768px) 44px, 44px'
                      : '(max-width: 768px) 120px, 140px'
                  }
                  quality={90}
                />
              </div>

              <motion.div
                aria-hidden="true"
                style={{ opacity: shimmerOpacity }}
                className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={prefersReducedMotion ? undefined : { x: ['-40%', '140%'] }}
                transition={prefersReducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </>
        ) : (
          <div className="relative" style={{ width: lockupConfig.emblemSize, height: lockupConfig.emblemSize }}>
            <Image
              src={lockupConfig.emblemSrc}
              alt="VANHSYA logo"
              fill
              className="object-contain"
              priority={priority}
              sizes="(max-width: 768px) 28px, 28px"
              quality={90}
            />
          </div>
        )}
      </motion.div>

      {lockupConfig.showWordmark && (
        <div className={`${lockup === 'horizontal' ? 'text-left' : 'text-center'}`}>
          {showDescriptor && (
            <div className="font-heading tracking-[0.22em] uppercase text-[0.7rem] text-white/70">
              {variant === 'A' ? 'Premium Brand' : 'Modern Brand'}
            </div>
          )}
          <div className="font-heading text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
            {lockupConfig.wordmarkText}
          </div>
          <div className="text-sm md:text-base text-white/70">
            {lockupConfig.taglineText}
          </div>
        </div>
      )}
    </motion.div>
  );

  return href ? (
    <Link href={href} aria-label="Go to VANHSYA home page">
      {content}
    </Link>
  ) : (
    content
  );
}
