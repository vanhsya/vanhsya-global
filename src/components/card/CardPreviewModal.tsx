'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { CardTier } from '@/data/card/tiers';
import CardImage from '@/components/card/CardImage';

type CardPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  tier: CardTier;
};

export default function CardPreviewModal({ open, onClose, tier }: CardPreviewModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90]"
          role="dialog"
          aria-modal="true"
          aria-label="Card preview"
        >
          <button type="button" onClick={onClose} className="absolute inset-0 bg-black/70" aria-label="Close preview" />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-1/2 w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="text-white font-extrabold">VANHSYA Card — {tier.toUpperCase()}</div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-6">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 bg-black">
                  <CardImage tier={tier} priority className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

