'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Compass,
  Disc3,
  Headphones,
  Pause,
  Play,
  Shuffle,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Wand2,
  X
} from 'lucide-react';
import type { MusicTrack } from '@/data/musicTracks';
import type { StudioTheme } from '@/lib/musicStudioPersonalization';

type Settings = {
  volume: number;
  muted: boolean;
  loop: boolean;
  journeyMode: boolean;
  shuffle: boolean;
  eqLowDb: number;
  eqMidDb: number;
  eqHighDb: number;
  space: number;
  visualIntensity: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  theme: StudioTheme;
  tracks: MusicTrack[];
  orderedTrackIds: string[];
  activeTrackId: string | null;
  statusLabel: string;
  canPlay: boolean;
  onPlayPause: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectTrackId: (trackId: string) => void;
  settings: Settings;
  onPatchSettings: (patch: Partial<Settings>) => void;
  getAnalyser: () => AnalyserNode | null;
  requestFxWarmup: () => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatDb(v: number) {
  const n = Math.round(v * 10) / 10;
  if (n === 0) return '0.0 dB';
  return `${n > 0 ? '+' : ''}${n.toFixed(1)} dB`;
}

function formatPct(v: number) {
  return `${Math.round(clamp(v, 0, 1) * 100)}%`;
}

function formatHz(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}kHz`;
  return `${Math.round(v)}Hz`;
}

function trackById(tracks: MusicTrack[], id: string | null) {
  if (!id) return null;
  return tracks.find((t) => t.id === id) ?? null;
}

function ModeCard({
  title,
  subtitle,
  icon,
  accentCss,
  onApply
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentCss: string;
  onApply: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onApply}
      className="group text-left rounded-3xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-colors px-5 py-4"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div
              className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center"
              style={{ background: accentCss }}
            >
              {icon}
            </div>
            <div className="min-w-0">
              <div className="text-white font-extrabold truncate">{title}</div>
              <div className="text-xs text-white/60 font-semibold mt-0.5">{subtitle}</div>
            </div>
          </div>
        </div>
        <Wand2 className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors" />
      </div>
    </button>
  );
}

function StudioVisualizer({
  open,
  theme,
  getAnalyser,
  intensity
}: {
  open: boolean;
  theme: StudioTheme;
  getAnalyser: () => AnalyserNode | null;
  intensity: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(320, Math.floor(rect.width));
      const h = Math.max(180, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const analyser = getAnalyser();
    const bins = analyser ? analyser.frequencyBinCount : 128;
    const data = new Uint8Array(bins);

    const hueA = theme.accent.h;
    const hueB = theme.accent2.h;
    const hueC = theme.accent3.h;

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, `hsla(${hueA} 90% 60% / 0.35)`);
      g.addColorStop(0.52, `hsla(${hueB} 92% 62% / 0.32)`);
      g.addColorStop(1, `hsla(${hueC} 88% 58% / 0.30)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      if (analyser) analyser.getByteFrequencyData(data);
      else data.fill(0);

      const barCount = Math.max(28, Math.min(72, Math.floor(w / 12)));
      const stride = Math.max(1, Math.floor(data.length / barCount));
      const barW = w / barCount;
      const pad = Math.max(1, barW * 0.18);
      const maxH = h * 0.62;
      const baseY = h * 0.82;
      const amp = clamp(intensity, 0.1, 1);

      for (let i = 0; i < barCount; i++) {
        const idx = i * stride;
        const v = data[idx] ?? 0;
        const n = v / 255;
        const curve = Math.pow(n, 1.35);
        const bh = Math.max(2, curve * maxH * (0.4 + amp * 0.9));

        const x = i * barW + pad * 0.5;
        const y = baseY - bh;
        const r = Math.max(6, Math.min(14, barW * 0.45));

        const mix = i / Math.max(1, barCount - 1);
        const hue = hueA + (hueB - hueA) * (mix < 0.55 ? mix / 0.55 : 1) + (hueC - hueB) * Math.max(0, (mix - 0.55) / 0.45);
        ctx.fillStyle = `hsla(${hue} 92% 62% / ${0.35 + curve * 0.55})`;

        ctx.beginPath();
        ctx.roundRect(x, y, Math.max(1, barW - pad), bh, r);
        ctx.fill();
      }

      const sheen = ctx.createRadialGradient(w * 0.32, h * 0.2, 0, w * 0.32, h * 0.2, Math.max(w, h));
      sheen.addColorStop(0, 'rgba(255,255,255,0.12)');
      sheen.addColorStop(0.35, 'rgba(255,255,255,0.06)');
      sheen.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [open, theme.textureSeed, theme.accent.h, theme.accent2.h, theme.accent3.h, getAnalyser, intensity]);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-[260px] sm:h-[320px]" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
      </div>
      <div className="absolute left-5 bottom-5 right-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur text-[11px] font-black uppercase tracking-[0.22em] text-white/70">
          <AudioLines className="w-4 h-4 text-white/70" />
          <span>Sound Signature</span>
        </div>
        <div className="mt-3 text-white font-black text-2xl sm:text-3xl tracking-tight">{theme.signatureName}</div>
        <div className="mt-1 text-white/70 text-sm">
          Your mix is tuned uniquely for you. Every adjustment here reshapes your personal session atmosphere.
        </div>
      </div>
    </div>
  );
}

export default function MusicStudioModal({
  open,
  onClose,
  theme,
  tracks,
  orderedTrackIds,
  activeTrackId,
  statusLabel,
  canPlay,
  onPlayPause,
  onPrev,
  onNext,
  onSelectTrackId,
  settings,
  onPatchSettings,
  getAnalyser,
  requestFxWarmup
}: Props) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'journey' | 'mix' | 'library'>('journey');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => requestFxWarmup());
  }, [open, requestFxWarmup]);

  const active = useMemo(() => trackById(tracks, activeTrackId), [tracks, activeTrackId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const ids = orderedTrackIds.length ? orderedTrackIds : tracks.map((t) => t.id);
    const list = ids.map((id) => tracks.find((t) => t.id === id)).filter(Boolean) as MusicTrack[];
    if (!q) return list;
    return list.filter((t) => {
      const text = `${t.title} ${t.category} ${t.tags?.join(' ') || ''}`.toLowerCase();
      return text.includes(q);
    });
  }, [query, orderedTrackIds, tracks]);

  const bgStyle = useMemo(() => ({ backgroundImage: theme.gradientCss }), [theme.gradientCss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[98]"
          role="dialog"
          aria-modal="true"
          aria-label="Music Studio"
        >
          <button type="button" onClick={onClose} className="absolute inset-0 bg-black/70" aria-label="Close Music Studio" />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.22 }}
            className="absolute left-1/2 top-1/2 w-[94vw] max-w-6xl -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-[2.2rem] overflow-hidden border border-white/10 shadow-2xl" style={bgStyle}>
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-black/30 backdrop-blur">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-white font-black text-xl tracking-tight">
                    <SlidersHorizontal className="w-5 h-5 text-white/80" />
                    <span className="truncate">VANHSYA Music Studio</span>
                  </div>
                  <div className="mt-1 text-xs text-white/65 font-semibold">
                    A fully personalized control room for your session audio
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-6 space-y-5">
                  <StudioVisualizer open={open} theme={theme} getAnalyser={getAnalyser} intensity={settings.visualIntensity} />

                  <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-white font-extrabold truncate">{active?.title ?? 'Session track'}</div>
                        <div className="text-xs text-white/60 font-semibold mt-1">
                          {active?.category ?? 'VANHSYA Library'} • {statusLabel}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={onPrev}
                          className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center"
                          aria-label="Previous"
                        >
                          <ArrowLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                          type="button"
                          onClick={onPlayPause}
                          className="w-12 h-12 rounded-2xl bg-white/15 hover:bg-white/20 border border-white/10 flex items-center justify-center"
                          aria-label={canPlay ? 'Pause' : 'Play'}
                        >
                          {canPlay ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={onNext}
                          className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center"
                          aria-label="Next"
                        >
                          <ArrowRight className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <button
                        type="button"
                        onClick={() => onPatchSettings({ muted: !settings.muted })}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] px-4 py-3 transition-colors flex items-center gap-2 justify-center"
                        aria-label={settings.muted ? 'Unmute' : 'Mute'}
                      >
                        {settings.muted ? <VolumeX className="w-4 h-4 text-amber-200" /> : <Volume2 className="w-4 h-4 text-white/70" />}
                        <span className="text-white/90 font-extrabold text-sm">{settings.muted ? 'Muted' : 'Sound'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onPatchSettings({ shuffle: !settings.shuffle })}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] px-4 py-3 transition-colors flex items-center gap-2 justify-center"
                        aria-label={settings.shuffle ? 'Disable shuffle' : 'Enable shuffle'}
                      >
                        <Shuffle className={`w-4 h-4 ${settings.shuffle ? 'text-emerald-200' : 'text-white/60'}`} />
                        <span className="text-white/90 font-extrabold text-sm">Shuffle</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onPatchSettings({ loop: !settings.loop, journeyMode: false })}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] px-4 py-3 transition-colors flex items-center gap-2 justify-center"
                        aria-label={settings.loop ? 'Disable loop' : 'Enable loop'}
                      >
                        <Disc3 className={`w-4 h-4 ${settings.loop ? 'text-indigo-200' : 'text-white/60'}`} />
                        <span className="text-white/90 font-extrabold text-sm">Loop</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onPatchSettings({ journeyMode: !settings.journeyMode, loop: false })}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] px-4 py-3 transition-colors flex items-center gap-2 justify-center"
                        aria-label={settings.journeyMode ? 'Disable journey mode' : 'Enable journey mode'}
                      >
                        <Compass className={`w-4 h-4 ${settings.journeyMode ? 'text-amber-200' : 'text-white/60'}`} />
                        <span className="text-white/90 font-extrabold text-sm">Journey</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-black/25 backdrop-blur p-2">
                    {[
                      { id: 'journey', label: 'Experience', icon: <Headphones className="w-4 h-4" /> },
                      { id: 'mix', label: 'Mix', icon: <SlidersHorizontal className="w-4 h-4" /> },
                      { id: 'library', label: 'Library', icon: <AudioLines className="w-4 h-4" /> }
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveTab(t.id as any)}
                        className={`flex-1 rounded-2xl px-4 py-3 font-extrabold text-sm transition-colors flex items-center justify-center gap-2 ${
                          activeTab === t.id ? 'bg-white/12 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                        aria-current={activeTab === t.id ? 'page' : undefined}
                      >
                        {t.icon}
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5">
                    {activeTab === 'journey' ? (
                      <div className="space-y-4">
                        <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur p-5">
                          <div className="flex items-center gap-2 text-white font-black">
                            <Headphones className="w-5 h-5 text-white/80" />
                            <span>One-tap Atmospheres</span>
                          </div>
                          <div className="mt-2 text-sm text-white/70 leading-relaxed">
                            Each atmosphere is tuned to feel different. Your signature defaults are already personalized. Try these
                            to reshape the session instantly.
                          </div>

                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <ModeCard
                              title="Focus Glass"
                              subtitle="Clear mids, light space, steady energy"
                              icon={<Wand2 className="w-5 h-5 text-white" />}
                              accentCss={`linear-gradient(135deg, hsl(${theme.accent.h} 85% 55%), hsl(${theme.accent2.h} 90% 55%))`}
                              onApply={() => onPatchSettings({ eqLowDb: 1.5, eqMidDb: 2.0, eqHighDb: 1.0, space: 0.12, visualIntensity: 0.7 })}
                            />
                            <ModeCard
                              title="Night Drive"
                              subtitle="Warm low-end, wider space, cinematic vibe"
                              icon={<Disc3 className="w-5 h-5 text-white" />}
                              accentCss={`linear-gradient(135deg, hsl(${theme.accent2.h} 90% 50%), hsl(${theme.accent3.h} 86% 50%))`}
                              onApply={() => onPatchSettings({ eqLowDb: 3.5, eqMidDb: -0.5, eqHighDb: 1.5, space: 0.42, visualIntensity: 0.86 })}
                            />
                            <ModeCard
                              title="Aerial Bright"
                              subtitle="Crisp highs, reduced space, punchy"
                              icon={<AudioLines className="w-5 h-5 text-white" />}
                              accentCss={`linear-gradient(135deg, hsl(${theme.accent3.h} 88% 54%), hsl(${theme.accent.h} 92% 54%))`}
                              onApply={() => onPatchSettings({ eqLowDb: 0.5, eqMidDb: -0.2, eqHighDb: 4.2, space: 0.08, visualIntensity: 0.8 })}
                            />
                            <ModeCard
                              title="Oasis Wide"
                              subtitle="Balanced EQ, expansive space, smooth"
                              icon={<Headphones className="w-5 h-5 text-white" />}
                              accentCss={`linear-gradient(135deg, hsl(${theme.accent.h} 80% 52%), hsl(${theme.accent3.h} 80% 52%))`}
                              onApply={() => onPatchSettings({ eqLowDb: 2.0, eqMidDb: 0.5, eqHighDb: 2.0, space: 0.58, visualIntensity: 0.92 })}
                            />
                          </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur p-5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-white font-black flex items-center gap-2">
                                <Volume2 className="w-5 h-5 text-white/80" />
                                <span>Master Volume</span>
                              </div>
                              <div className="mt-1 text-xs text-white/60 font-semibold">Applied across the entire site</div>
                            </div>
                            <div className="text-white/80 font-extrabold text-sm">{formatPct(settings.volume)}</div>
                          </div>

                          <input
                            aria-label="Volume"
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={settings.volume}
                            onChange={(e) => onPatchSettings({ volume: Number(e.target.value) })}
                            className="mt-4 w-full"
                          />
                        </div>
                      </div>
                    ) : null}

                    {activeTab === 'mix' ? (
                      <div className="space-y-4">
                        <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur p-5">
                          <div className="flex items-center gap-2 text-white font-black">
                            <SlidersHorizontal className="w-5 h-5 text-white/80" />
                            <span>EQ</span>
                          </div>
                          <div className="mt-2 text-sm text-white/70 leading-relaxed">
                            Sculpt the sound without changing the track. Your EQ is saved to your user signature.
                          </div>

                          <div className="mt-4 grid grid-cols-1 gap-4">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                              <div className="flex items-center justify-between gap-4">
                                <div className="text-white/90 font-extrabold text-sm">Low</div>
                                <div className="text-white/70 text-xs font-bold">{formatHz(80)} • {formatDb(settings.eqLowDb)}</div>
                              </div>
                              <input
                                aria-label="Low EQ"
                                type="range"
                                min={-12}
                                max={12}
                                step={0.1}
                                value={settings.eqLowDb}
                                onChange={(e) => onPatchSettings({ eqLowDb: Number(e.target.value) })}
                                className="mt-3 w-full"
                              />
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                              <div className="flex items-center justify-between gap-4">
                                <div className="text-white/90 font-extrabold text-sm">Mid</div>
                                <div className="text-white/70 text-xs font-bold">{formatHz(1000)} • {formatDb(settings.eqMidDb)}</div>
                              </div>
                              <input
                                aria-label="Mid EQ"
                                type="range"
                                min={-12}
                                max={12}
                                step={0.1}
                                value={settings.eqMidDb}
                                onChange={(e) => onPatchSettings({ eqMidDb: Number(e.target.value) })}
                                className="mt-3 w-full"
                              />
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                              <div className="flex items-center justify-between gap-4">
                                <div className="text-white/90 font-extrabold text-sm">High</div>
                                <div className="text-white/70 text-xs font-bold">{formatHz(8000)} • {formatDb(settings.eqHighDb)}</div>
                              </div>
                              <input
                                aria-label="High EQ"
                                type="range"
                                min={-12}
                                max={12}
                                step={0.1}
                                value={settings.eqHighDb}
                                onChange={(e) => onPatchSettings({ eqHighDb: Number(e.target.value) })}
                                className="mt-3 w-full"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur p-5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-white font-black flex items-center gap-2">
                                <Disc3 className="w-5 h-5 text-white/80" />
                                <span>Space</span>
                              </div>
                              <div className="mt-1 text-xs text-white/60 font-semibold">Adds a subtle room feel unique to your signature</div>
                            </div>
                            <div className="text-white/80 font-extrabold text-sm">{formatPct(settings.space)}</div>
                          </div>

                          <input
                            aria-label="Space"
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={settings.space}
                            onChange={(e) => onPatchSettings({ space: Number(e.target.value) })}
                            className="mt-4 w-full"
                          />
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur p-5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <div className="text-white font-black flex items-center gap-2">
                                <AudioLines className="w-5 h-5 text-white/80" />
                                <span>Visual Intensity</span>
                              </div>
                              <div className="mt-1 text-xs text-white/60 font-semibold">Controls how dramatic your signature visualizer feels</div>
                            </div>
                            <div className="text-white/80 font-extrabold text-sm">{formatPct(settings.visualIntensity)}</div>
                          </div>

                          <input
                            aria-label="Visual intensity"
                            type="range"
                            min={0.1}
                            max={1}
                            step={0.01}
                            value={settings.visualIntensity}
                            onChange={(e) => onPatchSettings({ visualIntensity: Number(e.target.value) })}
                            className="mt-4 w-full"
                          />
                        </div>
                      </div>
                    ) : null}

                    {activeTab === 'library' ? (
                      <div className="space-y-4">
                        <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur p-5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="text-white font-black flex items-center gap-2">
                              <AudioLines className="w-5 h-5 text-white/80" />
                              <span>Library</span>
                            </div>
                            <div className="text-xs text-white/60 font-semibold">{filtered.length} tracks</div>
                          </div>
                          <div className="mt-4">
                            <label className="text-xs font-black uppercase tracking-[0.22em] text-white/55" htmlFor="studio-search">
                              Search
                            </label>
                            <input
                              id="studio-search"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Type a title or category…"
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-white/25"
                            />
                          </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur overflow-hidden">
                          <div className="max-h-[380px] overflow-auto">
                            <div className="divide-y divide-white/10">
                              {filtered.map((t) => {
                                const active = t.id === activeTrackId;
                                return (
                                  <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => onSelectTrackId(t.id)}
                                    className={`w-full text-left px-5 py-4 transition-colors ${
                                      active ? 'bg-white/[0.08]' : 'hover:bg-white/[0.05]'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-4">
                                      <div className="min-w-0">
                                        <div className="text-white font-extrabold truncate flex items-center gap-2">
                                          {active ? <Play className="w-4 h-4 text-emerald-200" /> : <AudioLines className="w-4 h-4 text-white/50" />}
                                          <span className="truncate">{t.title}</span>
                                        </div>
                                        <div className="mt-1 text-xs text-white/60 font-semibold truncate">{t.category}</div>
                                      </div>
                                      <ArrowRight className="w-4 h-4 text-white/35" />
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 border-t border-white/10 bg-black/30 backdrop-blur flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div className="text-xs text-white/60 font-semibold flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-white/60" />
                  <span>Personalized per user and saved across sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/ai-tools"
                    className="px-4 py-2 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] text-white font-extrabold text-sm transition-colors flex items-center gap-2"
                  >
                    <Headphones className="w-4 h-4 text-white/70" />
                    <span>Back to Tools</span>
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 text-white font-extrabold text-sm transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4 text-white/80" />
                    <span>Done</span>
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
