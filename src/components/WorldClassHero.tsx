"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiActivity, FiBriefcase, FiCompass } from 'react-icons/fi';
import { Play } from 'lucide-react';
import { FaHandshake, FaUserCheck, FaAward } from 'react-icons/fa';
import WorldMapVisualization, { type MapMode } from './WorldMapVisualization';

// Dynamically import the 3D globe for performance
const WorldClassGlobe = dynamic(() => import('./WorldClassGlobe'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/20 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  ),
});

export default function WorldClassHero() {
  const [mounted, setMounted] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [mapMode, setMapMode] = useState<MapMode>('Immigration');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use window scroll for the hero section to avoid target hydration issues
  const { scrollY } = useScroll();
  
  // Map scrollY to opacity/scale/y based on a fixed range (e.g., 0 to 500px)
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);
  const y = useTransform(scrollY, [0, 500], [0, 50]);
  const globeOpacity = useTransform(scrollY, [0, 300], [1, 0.2]);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  const particles = React.useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const a = (i * 97) % 360;
      const b = (i * 57) % 100;
      const left = ((Math.sin(a) + 1) / 2) * 100;
      const top = ((Math.cos(a * 0.8) + 1) / 2) * 100;
      const size = 1 + (b % 3);
      const duration = 2.8 + (b % 5) * 0.35;
      const delay = (b % 7) * 0.4;
      return { left, top, size, duration, delay };
    });
  }, []);

  const partners = [
    { name: "Global HR", logo: <FaHandshake className="w-8 h-8" /> },
    { name: "Visa Pro", logo: <FaUserCheck className="w-8 h-8" /> },
    { name: "Travel Safe", logo: <FiCompass className="w-8 h-8" /> },
    { name: "Edu Path", logo: <FiActivity className="w-8 h-8" /> },
    { name: "Work Force", logo: <FiBriefcase className="w-8 h-8" /> },
    { name: "Elite Trust", logo: <FaAward className="w-8 h-8" /> },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 bg-grid-vanhsya hero-glow-vanhsya text-white selection:bg-indigo-500/30 selection:text-indigo-200"
      aria-labelledby="hero-heading"
    >
      {/* 3D/Cosmic Background Layer */}
      <motion.div 
        style={mounted ? { opacity: globeOpacity } : { opacity: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#120b1f] via-slate-950 to-[#0a1426] mix-blend-overlay z-1" />
        <WorldMapVisualization mode={mapMode} className="absolute inset-0 opacity-70" />
        {mounted && show3D && (
          <div className="absolute inset-0 opacity-50">
            <WorldClassGlobe />
          </div>
        )}
      </motion.div>

      {/* Main Content Container */}
      <motion.div 
        style={mounted ? { opacity, scale, y } : {}}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center"
      >
        {/* Live AI Pulse Indicator */}
        <div className="absolute top-8 right-8 hidden xl:flex items-center space-x-3 bg-white/[0.03] backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">AI System Operational</span>
        </div>
        <button
          type="button"
          onClick={() => setShow3D((v) => !v)}
          className="absolute top-8 left-8 hidden xl:inline-flex items-center gap-2 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-amber-200/80 transition-colors"
          aria-label="Toggle 3D globe overlay"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]" />
          {show3D ? 'Hide 3D Globe' : 'Show 3D Globe'}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
          {/* Left Column: Text Content */}
          <div className="flex flex-col space-y-10 text-center lg:text-left">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center self-center lg:self-start space-x-3 px-5 py-2.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-200 text-sm font-bold header-blur-vanhsya shadow-[0_0_20px_rgba(160,120,255,0.12)]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
              </span>
              <span className="tracking-wide uppercase text-[10px]">AI-Powered Immigration Platform</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
              aria-label="World map mode selection"
            >
              {(['Immigration', 'Tourism', 'Work'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMapMode(m)}
                  className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.25em] transition-colors ${
                    mapMode === m
                      ? 'bg-white/[0.06] border-amber-400/40 text-amber-200/90'
                      : 'bg-black/20 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {m}
                </button>
              ))}
              <span className="text-xs text-slate-500 font-bold ml-2">
                Map routes adapt to your goal
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
              >
                Transform Your <span className="text-purple-400">Global Journey</span> With AI
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Experience the future of immigration. Our AI-driven platform provides expert guidance and guaranteed results.
                Operates across 195+ countries with real transparency and zero-agent practices.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4"
            >
              <Link
                href="/ai-tools/eligibility"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-bold transition-all duration-300 shadow-lg shadow-purple-600/30 active:scale-95 outline-none focus:ring-2 focus:ring-purple-500/40"
              >
                <span className="text-lg">Start Free Assessment</span>
                <FiArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <span className="text-[10px] text-white/60 -mt-2 sm:mt-0">No credit card required • Takes only 2 minutes</span>
              
              <Link
                href="/ai-tools"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition-all duration-300 header-blur-vanhsya active:scale-95 group"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </Link>
            </motion.div>

            {/* Partner Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="pt-12 border-t border-white/10"
            >
              <p className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-[0.3em]">Verified Global Partnerships</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-10 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                {partners.map((partner, i) => (
                  <div key={i} title={partner.name} className="flex items-center group cursor-pointer">
                    <div className="transition-transform duration-300 group-hover:scale-110">
                      {partner.logo}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Orbit Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative w-[520px] h-[520px] flex items-center justify-center opacity-90">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[12.5%] rounded-full border-2 border-purple-500/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[25%] rounded-full border border-purple-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              <div className="relative w-32 h-32 rounded-full bg-purple-900/40 flex items-center justify-center shadow-[0_0_30px_rgba(160,120,255,0.45)] header-blur-vanhsya">
                <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse" />
                <div className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center">
                  <Image src="/images/originallogo.png" alt="VANHSYA" width={74} height={74} priority />
                </div>
              </div>

              {[
                { label: "Canada", x: "50%", y: "-6%" },
                { label: "Australia", x: "50%", y: "106%" },
                { label: "Germany", x: "88%", y: "18%" },
                { label: "UK", x: "22%", y: "78%" },
              ].map((m) => (
                <div key={m.label} className="absolute" style={{ left: m.x, top: m.y, transform: "translate(-50%, -50%)" }}>
                  <div className="group relative">
                    <div className="w-4 h-4 bg-purple-300 rounded-full border-2 border-white/70 shadow-[0_0_20px_rgba(255,255,255,0.45)] transition-transform group-hover:scale-125" />
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="px-3 py-1 rounded-lg bg-black/80 header-blur-vanhsya border border-white/30 text-xs text-white font-bold whitespace-nowrap">
                        {m.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute right-[-10%] top-[35%] bg-black/35 header-blur-vanhsya border border-white/10 rounded-xl px-4 py-3 text-sm text-white">
                Germany <span className="text-slate-400 text-xs">Available</span>
              </div>
              <div className="absolute left-[-6%] bottom-[30%] bg-black/35 header-blur-vanhsya border border-white/10 rounded-xl px-4 py-3 text-sm text-white">
                UK <span className="text-slate-400 text-xs">Available</span>
              </div>
              <div className="absolute right-[-8%] bottom-[18%] bg-black/35 header-blur-vanhsya border border-white/10 rounded-xl px-4 py-3 text-sm text-white">
                Australia <span className="text-slate-400 text-xs">Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_55%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_120%,rgba(168,85,247,0.14),transparent_55%)]" />
        <div className="absolute inset-0 opacity-25">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                opacity: [0.15, 0.55, 0.15],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
