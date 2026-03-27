"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import CountryOrbitGlobe from "@/components/CountryOrbitGlobe";
import GlassCard from "@/components/GlassCard";
import { ArrowLeftRight, Gauge, Pause, Play, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

type CountryRef = { id: string; name: string };

function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const onChange = () => setReduced(Boolean(mql.matches));
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useParallax5(enabled: boolean) {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);
  const latest = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      latest.current = window.scrollY || 0;
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        setOffset(latest.current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  const layers = useMemo(() => {
    const y = offset;
    return {
      l1: `translate3d(0, ${Math.round(y * 0.02)}px, 0)`,
      l2: `translate3d(0, ${Math.round(y * 0.04)}px, 0)`,
      l3: `translate3d(0, ${Math.round(y * 0.06)}px, 0)`,
      l4: `translate3d(0, ${Math.round(y * 0.08)}px, 0)`,
      l5: `translate3d(0, ${Math.round(y * 0.1)}px, 0)`,
    };
  }, [offset]);

  return layers;
}

function useInViewOnce(threshold = 0.35) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/**
 * WebGLCountryVisualizationSection
 * Landing section that showcases an interactive globe with inertial rotation, hover/select, zoom, and performance stats.
 */
export default function WebGLCountryVisualizationSection() {
  const reducedMotion = useReducedMotionPref();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<CountryRef | null>(null);
  const [selected, setSelected] = useState<CountryRef | null>(null);
  const [stats, setStats] = useState<{ fps: number; frameTimeMs: number; glVendor?: string; glRenderer?: string } | null>(
    null
  );
  const [showStats, setShowStats] = useState(false);
  const [resetNonce, setResetNonce] = useState(0);

  const parallax = useParallax5(!reducedMotion);
  const { ref, inView } = useInViewOnce(0.25);

  const instructionId = "country-vis-instructions";
  const liveId = "country-vis-live";

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a10] via-[#07070c] to-[#0a0a10]" style={{ transform: parallax.l1 }} />
        <div className="absolute inset-0 hero-glow-vanhsya opacity-80" style={{ transform: parallax.l2 }} />
        <div
          className="absolute -top-48 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-700/25 via-indigo-700/18 to-purple-700/25 blur-3xl"
          style={{ transform: parallax.l3 }}
        />
        <div
          className="absolute -bottom-56 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-700/18 via-purple-700/14 to-indigo-700/18 blur-3xl"
          style={{ transform: parallax.l4 }}
        />
        <div className="absolute inset-0 bg-grid-vanhsya opacity-[0.35]" style={{ transform: parallax.l5 }} />
        <div className="absolute inset-0 neo-noise opacity-[0.06]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.25em] text-purple-200/80">
                <ArrowLeftRight className="h-4 w-4" />
                Circular Country System
              </div>

              <h2 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-purple-200 via-white to-slate-200 bg-clip-text text-transparent">
                  Global visualization
                </span>
              </h2>
              <p className="mt-4 text-slate-400 leading-relaxed max-w-xl">
                Hover to highlight, click to select, pinch/scroll to zoom. Momentum-based rotation with progressive detail.
              </p>

              <div id={instructionId} className="mt-6 text-xs text-white/60 leading-relaxed">
                Desktop: drag to rotate, scroll to zoom, click a marker to select. Keyboard: arrows rotate, +/− zoom, Enter selects, Esc resets.
              </div>
              <div id={liveId} className="sr-only" aria-live="polite">
                {selected ? `Selected ${selected.name}` : hovered ? `Hovering ${hovered.name}` : "No country selected"}
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GlassCard className="p-6 border-white/10" hover={false}>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Hover</div>
                  <div className="mt-3 text-lg font-black text-white">{hovered?.name ?? "—"}</div>
                  <p className="mt-2 text-sm text-slate-400">Instant highlight + 3D halo.</p>
                </GlassCard>
                <GlassCard className="p-6 border-white/10" hover={false}>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Selected</div>
                  <div className="mt-3 text-lg font-black text-white">{selected?.name ?? "—"}</div>
                  <p className="mt-2 text-sm text-slate-400">Zooms to country-level detail.</p>
                </GlassCard>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-colors font-black shadow-lg shadow-purple-600/25"
                  aria-label={paused ? "Resume animations" : "Pause animations"}
                >
                  {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  {paused ? "Resume" : "Pause"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(null);
                    setHovered(null);
                    setResetNonce((n) => n + 1);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-colors font-black"
                  aria-label="Reset view"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowStats((s) => !s)}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-colors font-black"
                  aria-label="Toggle performance stats"
                >
                  <Gauge className="h-4 w-4" />
                  {showStats ? "Hide Stats" : "Show Stats"}
                </button>

                <div className="ml-auto flex items-center gap-2 text-xs text-white/60">
                  <ZoomOut className="h-4 w-4" />
                  <span>Pinch/Scroll</span>
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>

              {reducedMotion && (
                <div className="mt-6 text-xs text-amber-200/80 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-3">
                  Reduced motion is enabled. Animations and parallax are minimized.
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="absolute -inset-6 rounded-[32px] bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-purple-500/10 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative h-[460px] md:h-[560px] rounded-[32px] bg-black/25 border border-white/10 backdrop-blur-md overflow-hidden">
                <CountryOrbitGlobe
                  key={resetNonce}
                  className="absolute inset-0"
                  paused={paused}
                  reducedMotion={reducedMotion}
                  selectedCountryId={selected?.id ?? null}
                  onCountryHover={(c) => setHovered(c)}
                  onCountrySelect={(c) => setSelected(c)}
                  onStats={(s) => setStats(s)}
                />

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 pointer-events-none">
                  <div className="pointer-events-none select-none rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md px-4 py-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Interaction</div>
                    <div className="mt-1 text-sm font-black text-white">
                      {selected?.name ? `Selected: ${selected.name}` : hovered?.name ? `Hover: ${hovered.name}` : "Move over markers"}
                    </div>
                  </div>

                  {showStats && stats && (
                    <div className="pointer-events-none select-none rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md px-4 py-3 text-right">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Performance</div>
                      <div className="mt-1 text-sm font-black text-white">
                        {stats.fps} fps · {Math.round(stats.frameTimeMs)} ms
                      </div>
                      {(stats.glVendor || stats.glRenderer) && (
                        <div className="mt-1 text-[10px] text-white/50 max-w-[240px]">
                          {stats.glVendor ? `${stats.glVendor} · ` : ""}
                          {stats.glRenderer ?? ""}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {selected && (
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-4 right-4 w-[320px] max-w-[80vw] pointer-events-none"
                    style={{ transform: "translate3d(0,0,0)" }}
                  >
                    <div className="pointer-events-none rounded-3xl bg-black/45 border border-white/10 backdrop-blur-xl p-5">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Country Panel</div>
                      <div className="mt-2 text-lg font-black text-white">{selected.name}</div>
                      <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                        This panel is hardware-accelerated (transform/opacity). Hook this to live country metrics later (no backend required).
                      </p>
                      <div className="mt-4 text-xs text-white/60">Tip: press Esc to reset selection.</div>
                    </div>
                  </motion.div>
                )}

                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
