"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type MapPin = {
  id: string;
  label: string;
  x: number;
  y: number;
  accent: "gold" | "violet" | "cyan";
};

export type MapMode = "Immigration" | "Tourism" | "Work";

const pins: MapPin[] = [
  { id: "canada", label: "Canada", x: 210, y: 130, accent: "cyan" },
  { id: "usa", label: "USA", x: 230, y: 175, accent: "cyan" },
  { id: "uk", label: "UK", x: 485, y: 135, accent: "gold" },
  { id: "germany", label: "Germany", x: 520, y: 150, accent: "gold" },
  { id: "uae", label: "UAE", x: 590, y: 215, accent: "gold" },
  { id: "singapore", label: "Singapore", x: 705, y: 275, accent: "violet" },
  { id: "australia", label: "Australia", x: 845, y: 350, accent: "violet" },
  { id: "new-zealand", label: "New Zealand", x: 925, y: 380, accent: "violet" },
];

const routesByMode: Record<MapMode, Array<{ from: string; to: string; intensity: number }>> = {
  Immigration: [
    { from: "uae", to: "canada", intensity: 1 },
    { from: "uae", to: "uk", intensity: 0.9 },
    { from: "germany", to: "usa", intensity: 0.75 },
    { from: "singapore", to: "australia", intensity: 0.85 },
    { from: "uk", to: "canada", intensity: 0.7 },
  ],
  Tourism: [
    { from: "uae", to: "singapore", intensity: 1 },
    { from: "uae", to: "uk", intensity: 0.8 },
    { from: "usa", to: "germany", intensity: 0.7 },
    { from: "australia", to: "new-zealand", intensity: 0.9 },
    { from: "uk", to: "germany", intensity: 0.75 },
  ],
  Work: [
    { from: "singapore", to: "canada", intensity: 1 },
    { from: "uae", to: "germany", intensity: 0.85 },
    { from: "uk", to: "usa", intensity: 0.8 },
    { from: "australia", to: "singapore", intensity: 0.75 },
    { from: "germany", to: "canada", intensity: 0.7 },
  ],
};

function pinColor(accent: MapPin["accent"]) {
  switch (accent) {
    case "gold":
      return { core: "rgba(251, 191, 36, 0.95)", glow: "rgba(251, 191, 36, 0.55)" };
    case "violet":
      return { core: "rgba(168, 85, 247, 0.95)", glow: "rgba(168, 85, 247, 0.55)" };
    case "cyan":
      return { core: "rgba(56, 189, 248, 0.95)", glow: "rgba(56, 189, 248, 0.55)" };
  }
}

function arcPath(a: MapPin, b: MapPin) {
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  const lift = Math.max(28, Math.min(140, (dx + dy) * 0.18));
  const c1x = (a.x + midX) / 2;
  const c2x = (b.x + midX) / 2;
  const c1y = (a.y + midY) / 2 - lift;
  const c2y = (b.y + midY) / 2 - lift;
  return `M ${a.x} ${a.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${b.x} ${b.y}`;
}

export default function WorldMapVisualization({
  className,
  mode = "Immigration",
}: {
  className?: string;
  mode?: MapMode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const target = React.useRef({ x: 0, y: 0 });
  const [parallax, setParallax] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.current = { x: nx, y: ny };

      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        setParallax({
          x: target.current.x,
          y: target.current.y,
        });
      });
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      el.removeEventListener("pointermove", onMove);
    };
  }, [prefersReducedMotion]);

  const translate = prefersReducedMotion
    ? "translate3d(0,0,0)"
    : `translate3d(${parallax.x * 10}px, ${parallax.y * 10}px, 0)`;

  const byId = React.useMemo(() => {
    const map = new Map<string, MapPin>();
    for (const p of pins) map.set(p.id, p);
    return map;
  }, []);

  const routes = routesByMode[mode] ?? routesByMode.Immigration;

  const routeStroke =
    mode === "Tourism"
      ? "rgba(56, 189, 248, 0.45)"
      : mode === "Work"
      ? "rgba(168, 85, 247, 0.45)"
      : "rgba(251, 191, 36, 0.45)";

  return (
    <div ref={containerRef} className={className}>
      <div
        className="absolute inset-0"
        style={{
          transform: translate,
          transition: prefersReducedMotion ? undefined : "transform 120ms ease-out",
          willChange: prefersReducedMotion ? undefined : "transform",
        }}
      >
        <svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="World map with migration corridors"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="vanhsya-land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgba(99, 102, 241, 0.22)" />
              <stop offset="0.6" stopColor="rgba(168, 85, 247, 0.18)" />
              <stop offset="1" stopColor="rgba(251, 191, 36, 0.12)" />
            </linearGradient>
            <radialGradient id="vanhsya-glow" cx="50%" cy="40%" r="60%">
              <stop
                offset="0"
                stopColor={
                  mode === "Tourism"
                    ? "rgba(56, 189, 248, 0.18)"
                    : mode === "Work"
                    ? "rgba(168, 85, 247, 0.18)"
                    : "rgba(251, 191, 36, 0.18)"
                }
              />
              <stop offset="0.5" stopColor="rgba(168, 85, 247, 0.12)" />
              <stop offset="1" stopColor="rgba(15, 23, 42, 0)" />
            </radialGradient>
            <pattern id="vanhsya-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(226, 232, 240, 0.08)" />
            </pattern>
            <filter id="vanhsya-softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -7"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width="1000" height="500" fill="url(#vanhsya-glow)" opacity="0.85" />

          <g opacity="0.95">
            <path
              d="M120 140 C 130 110, 165 90, 205 105 C 245 120, 280 110, 310 130 C 340 150, 340 175, 315 185 C 290 195, 275 220, 260 235 C 245 250, 215 252, 190 240 C 165 228, 152 208, 140 190 C 128 172, 110 165, 120 140 Z"
              fill="url(#vanhsya-land)"
              stroke="rgba(226,232,240,0.10)"
              strokeWidth="1"
            />
            <path
              d="M255 265 C 270 250, 292 248, 315 260 C 340 272, 350 295, 340 320 C 330 345, 312 358, 298 382 C 286 402, 270 408, 255 392 C 240 376, 236 355, 240 334 C 245 310, 240 282, 255 265 Z"
              fill="url(#vanhsya-land)"
              stroke="rgba(226,232,240,0.10)"
              strokeWidth="1"
            />
            <path
              d="M445 150 C 460 130, 495 122, 520 134 C 545 146, 555 166, 540 182 C 522 202, 505 204, 488 210 C 470 216, 455 210, 448 194 C 440 176, 432 166, 445 150 Z"
              fill="url(#vanhsya-land)"
              stroke="rgba(226,232,240,0.10)"
              strokeWidth="1"
            />
            <path
              d="M500 215 C 520 205, 545 212, 560 232 C 576 252, 576 274, 562 292 C 548 312, 540 330, 536 352 C 532 372, 510 384, 492 372 C 474 360, 468 336, 472 312 C 476 286, 470 238, 500 215 Z"
              fill="url(#vanhsya-land)"
              stroke="rgba(226,232,240,0.10)"
              strokeWidth="1"
            />
            <path
              d="M585 145 C 625 120, 680 120, 725 140 C 770 160, 805 155, 845 165 C 885 175, 910 200, 900 222 C 888 250, 855 246, 825 252 C 795 258, 785 280, 760 292 C 735 304, 710 292, 690 282 C 670 272, 650 276, 628 270 C 605 264, 590 248, 600 220 C 610 192, 560 165, 585 145 Z"
              fill="url(#vanhsya-land)"
              stroke="rgba(226,232,240,0.10)"
              strokeWidth="1"
            />
            <path
              d="M800 320 C 826 300, 862 300, 890 314 C 918 328, 930 352, 914 370 C 896 390, 870 392, 848 386 C 824 380, 800 370, 792 352 C 784 334, 786 332, 800 320 Z"
              fill="url(#vanhsya-land)"
              stroke="rgba(226,232,240,0.10)"
              strokeWidth="1"
            />
          </g>

          <g opacity="0.6">
            <rect x="0" y="0" width="1000" height="500" fill="url(#vanhsya-dots)" />
          </g>

          <g filter="url(#vanhsya-softGlow)">
            {routes.map((r) => {
              const a = byId.get(r.from);
              const b = byId.get(r.to);
              if (!a || !b) return null;
              return (
                <motion.path
                  key={`${r.from}-${r.to}`}
                  d={arcPath(a, b)}
                  fill="none"
                  stroke={routeStroke}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeDasharray="6 10"
                  initial={prefersReducedMotion ? false : { strokeDashoffset: 40, opacity: 0.2 }}
                  animate={
                    prefersReducedMotion
                      ? { opacity: 0.22 + r.intensity * 0.12 }
                      : { strokeDashoffset: -40, opacity: 0.18 + r.intensity * 0.22 }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 6, ease: "linear", repeat: Infinity }
                  }
                />
              );
            })}
          </g>

          <g>
            {pins.map((p) => {
              const c = pinColor(p.accent);
              return (
                <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
                  <motion.circle
                    r="3.6"
                    fill={c.core}
                    initial={false}
                    animate={prefersReducedMotion ? { opacity: 0.9 } : { opacity: [0.6, 1, 0.6] }}
                    transition={prefersReducedMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.circle
                    r="9"
                    fill="none"
                    stroke={c.glow}
                    strokeWidth="1"
                    initial={false}
                    animate={
                      prefersReducedMotion
                        ? { opacity: 0.2 }
                        : { opacity: [0.05, 0.35, 0.05], r: [7, 13, 7] }
                    }
                    transition={prefersReducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </g>
              );
            })}
          </g>

          <g opacity="0.35">
            <image href="/images/originallogo.png" x="455" y="205" width="90" height="90" />
          </g>
        </svg>
      </div>
    </div>
  );
}
