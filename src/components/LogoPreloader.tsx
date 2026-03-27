"use client";

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';

type LogoPreloaderProps = {
  enabled?: boolean;
};

export default function LogoPreloader({ enabled = true }: LogoPreloaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    try {
      const seen = sessionStorage.getItem('vanhsya.preloader.seen');
      if (seen) return;
      sessionStorage.setItem('vanhsya.preloader.seen', '1');
    } catch {}

    const raf = window.requestAnimationFrame(() => setOpen(true));
    const t = window.setTimeout(() => setOpen(false), prefersReducedMotion ? 450 : 950);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [enabled, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
          role="status"
          aria-live="polite"
          aria-label="Loading VANHSYA"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="flex flex-col items-center gap-6 px-6"
          >
            <BrandLogo
              href=""
              lockup="stacked"
              priority
              enableParallax={false}
              enableReveal={false}
              experimentKey="logoPreloader.v1"
              className="pointer-events-none"
            />

            <div className="w-44 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-300 via-yellow-400 to-purple-400"
                initial={{ x: '-60%' }}
                animate={{ x: '120%' }}
                transition={{ duration: prefersReducedMotion ? 0.6 : 1.0, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
