"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

type Stat = { label: string; value: number; suffix: string; decimals?: number };

const stats: Stat[] = [
  { label: "Success Rate %", value: 99.8, suffix: "", decimals: 1 },
  { label: "Clients Served", value: 50000, suffix: "+", decimals: 0 },
  { label: "Countries Covered", value: 195, suffix: "+", decimals: 0 },
];

function format(n: number, decimals: number) {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.round(n).toLocaleString();
}

function StatCounter({ stat }: { stat: Stat }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [v, setV] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2000;

    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(stat.value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-black text-purple-300 tabular-nums">
        {format(v, stat.decimals ?? 0)}
        {stat.suffix}
      </div>
      <div className="mt-2 text-lg text-slate-400">{stat.label}</div>
    </div>
  );
}

export default function LandingStatsStrip() {
  return (
    <section className="py-12 bg-black/20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className={idx < 2 ? "md:border-r md:border-white/10 md:pr-8" : ""}
            >
              <StatCounter stat={s} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

