'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Pause, Play, RotateCcw, Zap } from 'lucide-react';

type Difficulty = 'calm' | 'normal' | 'chaos';

type Props = {
  title?: string;
  subtitle?: string;
  seed?: string;
  compact?: boolean;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 }
};

export default function MaintenanceArcade({ title = 'Maintenance Arcade', subtitle, seed = 'vanhsya', compact = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const pointerRef = useRef<{ active: boolean; x: number; y: number }>({ active: false, x: 0, y: 0 });
  const keysRef = useRef<Record<string, boolean>>({});
  const scoreRef = useRef(0);
  const bestRef = useRef(0);

  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [hint, setHint] = useState('Use arrow keys or drag/touch to dodge. Collect sparks.');

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    bestRef.current = best;
  }, [best]);

  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  }, []);

  const params = useMemo(() => {
    const base = difficulty === 'calm' ? 0.9 : difficulty === 'chaos' ? 1.6 : 1.2;
    return {
      speed: 70 * base,
      spawnPerSecond: 0.75 * base,
      coinPerSecond: 0.55 * base,
      maxHazards: difficulty === 'calm' ? 14 : difficulty === 'chaos' ? 26 : 20
    };
  }, [difficulty]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(`vanhsya.arcade.best.${seed}`);
      const parsed = raw ? Number(raw) : 0;
      if (Number.isFinite(parsed)) {
        bestRef.current = parsed;
        queueMicrotask(() => setBest(parsed));
      }
    } catch {
      bestRef.current = 0;
      queueMicrotask(() => setBest(0));
    }
  }, [seed]);

  const bumpScore = (delta: number) => {
    setScore((prev) => {
      const next = prev + delta;
      scoreRef.current = next;
      if (next > bestRef.current) {
        bestRef.current = next;
        setBest(next);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!running) return;
    try {
      window.localStorage.setItem(`vanhsya.arcade.best.${seed}`, String(best));
    } catch {
      void 0;
    }
  }, [best, running, seed]);

  useEffect(() => {
    if (!running) return;
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = {
      w: 960,
      h: compact ? 320 : 420,
      ship: { x: 0.5, y: 0.72, vx: 0, vy: 0 },
      hazards: [] as { x: number; y: number; r: number; vx: number; vy: number }[],
      sparks: [] as { x: number; y: number; r: number; vy: number }[],
      stars: [] as { x: number; y: number; z: number }[],
      alive: true,
      time: 0,
      spawnAcc: 0,
      coinAcc: 0
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const width = rect ? Math.max(320, Math.floor(rect.width)) : 840;
      const height = state.h;
      canvas.width = width * (window.devicePixelRatio || 1);
      canvas.height = height * (window.devicePixelRatio || 1);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
      state.w = width;
      state.h = height;
    };

    const initStars = () => {
      state.stars = Array.from({ length: compact ? 120 : 180 }).map(() => ({
        x: Math.random() * state.w,
        y: Math.random() * state.h,
        z: 0.3 + Math.random() * 0.9
      }));
    };

    resize();
    initStars();

    const onResize = () => {
      resize();
      initStars();
    };
    window.addEventListener('resize', onResize);

    const onPointerDown = (e: PointerEvent) => {
      pointerRef.current.active = true;
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!pointerRef.current.active) return;
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
    };
    const onPointerUp = () => {
      pointerRef.current.active = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    const reset = () => {
      state.ship = { x: 0.5, y: 0.72, vx: 0, vy: 0 };
      state.hazards = [];
      state.sparks = [];
      state.alive = true;
      state.time = 0;
      state.spawnAcc = 0;
      state.coinAcc = 0;
      lastRef.current = performance.now();
      setScore(0);
      scoreRef.current = 0;
      setHint('Calibrate your controls. Then survive.');
    };

    reset();

    const hit = (ax: number, ay: number, ar: number, bx: number, by: number, br: number) => {
      const dx = ax - bx;
      const dy = ay - by;
      const rr = ar + br;
      return dx * dx + dy * dy <= rr * rr;
    };

    const draw = () => {
      ctx.clearRect(0, 0, state.w, state.h);

      const bg = ctx.createLinearGradient(0, 0, state.w, state.h);
      bg.addColorStop(0, '#05050b');
      bg.addColorStop(1, '#0a0a10');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, state.w, state.h);

      const glow = ctx.createRadialGradient(state.w * 0.2, state.h * 0.25, 40, state.w * 0.2, state.h * 0.25, state.w * 0.9);
      glow.addColorStop(0, 'rgba(245,199,106,0.10)');
      glow.addColorStop(0.45, 'rgba(168,85,247,0.14)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, state.w, state.h);

      for (const s of state.stars) {
        ctx.globalAlpha = 0.35 + 0.55 * s.z;
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(s.x, s.y, 1.2 * s.z, 1.2 * s.z);
      }
      ctx.globalAlpha = 1;

      const shipX = state.ship.x * state.w;
      const shipY = state.ship.y * state.h;
      const shipR = compact ? 10 : 12;

      for (const h of state.hazards) {
        const x = h.x * state.w;
        const y = h.y * state.h;
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.strokeStyle = 'rgba(255,255,255,0.18)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, h.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      for (const c of state.sparks) {
        const x = c.x * state.w;
        const y = c.y * state.h;
        const g = ctx.createRadialGradient(x, y, 0, x, y, c.r * 2.4);
        g.addColorStop(0, 'rgba(245,199,106,0.95)');
        g.addColorStop(0.6, 'rgba(245,199,106,0.28)');
        g.addColorStop(1, 'rgba(245,199,106,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, c.r * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      const shipGlow = ctx.createRadialGradient(shipX, shipY, 0, shipX, shipY, shipR * 3.2);
      shipGlow.addColorStop(0, 'rgba(99,102,241,0.85)');
      shipGlow.addColorStop(0.65, 'rgba(168,85,247,0.20)');
      shipGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shipGlow;
      ctx.beginPath();
      ctx.arc(shipX, shipY, shipR * 2.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.beginPath();
      ctx.moveTo(shipX, shipY - shipR * 1.25);
      ctx.lineTo(shipX - shipR, shipY + shipR * 1.15);
      ctx.lineTo(shipX + shipR, shipY + shipR * 1.15);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(0,0,0,0.35)';
      ctx.fillRect(0, 0, state.w, 42);
      ctx.fillStyle = 'rgba(255,255,255,0.86)';
      ctx.font = '700 12px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto';
      ctx.fillText(`SCORE ${scoreRef.current}`, 14, 26);
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillText(`BEST ${bestRef.current}`, 118, 26);

      if (!state.alive) {
        ctx.fillStyle = 'rgba(0,0,0,0.58)';
        ctx.fillRect(0, 0, state.w, state.h);
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.font = '900 28px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto';
        ctx.fillText('SYSTEM GLITCH', Math.max(16, state.w * 0.5 - 120), state.h * 0.46);
        ctx.fillStyle = 'rgba(255,255,255,0.70)';
        ctx.font = '700 13px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto';
        ctx.fillText('Tap Reset to try again', Math.max(16, state.w * 0.5 - 92), state.h * 0.52);
      }
    };

    const step = (now: number) => {
      const dt = clamp((now - lastRef.current) / 1000, 0, 0.045);
      lastRef.current = now;

      if (!running || paused) {
        draw();
        rafRef.current = window.requestAnimationFrame(step);
        return;
      }

      state.time += dt;

      for (const s of state.stars) {
        s.y += (22 + 60 * s.z) * dt;
        if (s.y > state.h) {
          s.y = -2;
          s.x = Math.random() * state.w;
        }
      }

      const key = keysRef.current;
      const ax = (key.ArrowLeft ? -1 : 0) + (key.ArrowRight ? 1 : 0) + (key.a ? -1 : 0) + (key.d ? 1 : 0);
      const ay = (key.ArrowUp ? -1 : 0) + (key.ArrowDown ? 1 : 0) + (key.w ? -1 : 0) + (key.s ? 1 : 0);

      const shipSpeed = (params.speed / state.w) * 0.9;
      state.ship.vx = clamp(state.ship.vx + ax * shipSpeed * dt * 80, -0.9, 0.9);
      state.ship.vy = clamp(state.ship.vy + ay * shipSpeed * dt * 80, -0.9, 0.9);

      if (pointerRef.current.active) {
        const rect = canvas.getBoundingClientRect();
        const px = (pointerRef.current.x - rect.left) / rect.width;
        const py = (pointerRef.current.y - rect.top) / rect.height;
        state.ship.x += (px - state.ship.x) * dt * 6;
        state.ship.y += (py - state.ship.y) * dt * 6;
        state.ship.vx *= 0.6;
        state.ship.vy *= 0.6;
      } else {
        state.ship.x += state.ship.vx * dt;
        state.ship.y += state.ship.vy * dt;
      }

      state.ship.vx *= 0.92;
      state.ship.vy *= 0.92;
      state.ship.x = clamp(state.ship.x, 0.05, 0.95);
      state.ship.y = clamp(state.ship.y, 0.14, 0.92);

      state.spawnAcc += dt * params.spawnPerSecond;
      while (state.spawnAcc >= 1 && state.hazards.length < params.maxHazards) {
        state.spawnAcc -= 1;
        const r = (compact ? 7 : 9) + Math.random() * (compact ? 7 : 10);
        const x = 0.06 + Math.random() * 0.88;
        state.hazards.push({
          x,
          y: -0.08,
          r,
          vx: (-0.18 + Math.random() * 0.36) * 0.18,
          vy: (0.25 + Math.random() * 0.65) * (params.speed / 160)
        });
      }

      state.coinAcc += dt * params.coinPerSecond;
      while (state.coinAcc >= 1 && state.sparks.length < 6) {
        state.coinAcc -= 1;
        const x = 0.08 + Math.random() * 0.84;
        state.sparks.push({ x, y: -0.06, r: compact ? 6 : 7.5, vy: (0.32 + Math.random() * 0.5) * (params.speed / 170) });
      }

      for (const h of state.hazards) {
        h.x += h.vx * dt;
        h.y += h.vy * dt;
        if (h.x < 0.03 || h.x > 0.97) h.vx *= -1;
      }
      state.hazards = state.hazards.filter((h) => h.y < 1.12);

      for (const c of state.sparks) c.y += c.vy * dt;
      state.sparks = state.sparks.filter((c) => c.y < 1.18);

      const shipX = state.ship.x * state.w;
      const shipY = state.ship.y * state.h;
      const shipR = compact ? 10 : 12;

      for (const h of state.hazards) {
        const hx = h.x * state.w;
        const hy = h.y * state.h;
        if (hit(shipX, shipY, shipR, hx, hy, h.r)) {
          state.alive = false;
          setRunning(false);
          setPaused(false);
          setHint('Impact detected. Reset and try a calmer lane.');
          break;
        }
      }

      if (state.alive) {
        for (const c of [...state.sparks]) {
          const cx = c.x * state.w;
          const cy = c.y * state.h;
          if (hit(shipX, shipY, shipR, cx, cy, c.r * 2.2)) {
            state.sparks = state.sparks.filter((s) => s !== c);
            bumpScore(25);
          }
        }
      }

      if (state.alive) {
        bumpScore(Math.round(6 + params.speed * 0.02));
      }

      draw();
      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame((t) => {
      lastRef.current = t;
      step(t);
    });

    return () => {
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [compact, difficulty, params, running, paused]);

  const start = () => {
    setPaused(false);
    setRunning(true);
  };

  const pause = () => setPaused((p) => !p);

  const reset = () => {
    setRunning(false);
    setPaused(false);
    setScore(0);
    scoreRef.current = 0;
    setHint('Reset complete. Start when ready.');
    setTimeout(() => setRunning(true), 20);
  };

  const densityClass = compact ? 'p-5' : 'p-6';

  return (
    <div className="w-full">
      <motion.div {...fadeUp} transition={{ duration: 0.45 }} className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white font-extrabold text-xl">{title}</div>
          {subtitle ? <div className="mt-2 text-sm text-white/70 leading-relaxed max-w-xl">{subtitle}</div> : null}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDifficulty('calm')}
            className={`h-10 px-4 rounded-2xl border transition-colors font-extrabold ${
              difficulty === 'calm' ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            Calm
          </button>
          <button
            type="button"
            onClick={() => setDifficulty('normal')}
            className={`h-10 px-4 rounded-2xl border transition-colors font-extrabold ${
              difficulty === 'normal' ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            Normal
          </button>
          <button
            type="button"
            onClick={() => setDifficulty('chaos')}
            className={`h-10 px-4 rounded-2xl border transition-colors font-extrabold ${
              difficulty === 'chaos' ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
          >
            Chaos
          </button>
        </div>
      </motion.div>

      <div className={`mt-5 rounded-3xl border border-white/10 bg-white/[0.03] ${densityClass}`}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-white/60">
            <Zap className="w-4 h-4 text-amber-200" />
            <span>Arcade uptime protocol</span>
          </div>
          <div className="text-sm text-white/70">
            Score <span className="text-white font-extrabold">{score}</span> · Best{' '}
            <span className="text-white font-extrabold">{best}</span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
          <canvas ref={canvasRef} className="block w-full" />
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="text-sm text-white/70 leading-relaxed">{hint}</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={start}
              className="h-10 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={pause}
              className="h-10 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors inline-flex items-center gap-2"
            >
              <Pause className="w-4 h-4" />
              {paused ? 'Resume' : 'Pause'}
            </button>
            <button
              type="button"
              onClick={reset}
              className="h-10 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 font-bold transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {reducedMotion ? (
          <div className="mt-4 text-xs text-white/50">
            Reduced motion detected. Visual effects are simplified.
          </div>
        ) : null}
      </div>
    </div>
  );
}
