'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, PlayCircle, Video } from 'lucide-react';
import type { MusicTrack } from '@/data/musicTracks';

type Props = {
  open: boolean;
  onClose: () => void;
  track: MusicTrack;
};

function getMediaKind(fileName: string): 'audio' | 'video' {
  const lower = fileName.toLowerCase();

  // Your track filenames are currently like "*.m4a.mp4".
  // Treat anything containing audio extensions as audio, even if ".mp4" is also present.
  if (/\.(m4a|mp3|wav|aac|flac|ogg)\b/.test(lower) || lower.includes('.m4a')) return 'audio';

  // Treat only known video extensions as video.
  if (/\.(mp4|webm|mov|mkv|avi|mpeg|mpg)\b/.test(lower) || lower.includes('.mp4')) return 'video';

  // Default to audio for this feature since musicTracks is meant for audio playback.
  return 'audio';
}

export default function TrackPlayerModal({ open, onClose, track }: Props) {
  const src = useMemo(() => {
    // Served from /public/vanhsya-media/
    const cleanedFileName = encodeURIComponent(track.fileName);
    return `/vanhsya-media/${cleanedFileName}`;
  }, [track.fileName]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    // Defer to avoid cascading-render lint warnings.
    requestAnimationFrame(() => setError(null));
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const mediaKind = getMediaKind(track.fileName);

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
          aria-label={`Player: ${track.title}`}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute inset-0 bg-black/70"
            aria-label="Close player"
          />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-1/2 w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-white font-extrabold truncate">
                    {mediaKind === 'video' ? (
                      <Video className="w-5 h-5 text-indigo-300" />
                    ) : (
                      <PlayCircle className="w-5 h-5 text-amber-300" />
                    )}
                    <span className="truncate">{track.title}</span>
                  </div>
                  <div className="text-xs text-white/60 font-semibold mt-1">{track.category}</div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-4">
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
                  <div className="aspect-video bg-slate-900 flex items-center justify-center">
                    {mediaKind === 'video' ? (
                      <video
                        className="w-full h-full bg-black"
                        controls
                        preload="metadata"
                        playsInline
                        onError={() =>
                          setError(
                            'Media failed to load as video. Verify the file is a playable video. Expected URL: ' + src
                          )
                        }
                      >
                        <source src={src} type="video/mp4" />
                      </video>
                    ) : (
                      <audio
                        controls
                        preload="auto"
                        className="w-full p-4"
                        onError={() =>
                          setError('Media not found or failed to load. Please verify the file is present and playable at: ' + src)
                        }
                      >
                        <source src={src} type="audio/mp4" />
                      </audio>
                    )}
                  </div>

                  {error && (
                    <div className="p-4 border-t border-white/10 bg-black/30">
                      <div className="text-amber-200 font-extrabold text-sm">
                        Media missing
                      </div>
                      <div className="text-white/70 text-xs mt-1 break-all">
                        {error}
                      </div>
                      <div className="text-white/60 text-xs mt-3">
                        Expected URL: <span className="text-white/80">{src}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-sm transition-colors"
                  >
                    Open file
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-white font-bold text-sm transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
