"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { FiArrowRight, FiCpu, FiShield, FiGlobe, FiCompass, FiTrendingUp } from "react-icons/fi";

type BlogCard = {
  title: string;
  kicker: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
  tag: string;
};

const cards: BlogCard[] = [
  {
    kicker: "AI Migration Intel",
    title: "Visa Timeline Predictor: See your likely approval window",
    description: "A smarter way to plan travel, study, and relocation with milestone forecasting and risk-aware buffers.",
    href: "/ai-tools/visa-timeline-predictor",
    icon: <FiTrendingUp className="h-5 w-5" />,
    gradient: "from-amber-400/20 via-purple-500/10 to-transparent",
    tag: "New AI Tool",
  },
  {
    kicker: "Tourism + Immigration",
    title: "Entry Requirements Radar: Border-ready checklists in seconds",
    description: "Auto-generates a border-ready pack: documents, insurance, biometrics, and consulate rules by route.",
    href: "/ai-tools/entry-requirements-radar",
    icon: <FiShield className="h-5 w-5" />,
    gradient: "from-cyan-400/15 via-indigo-500/10 to-transparent",
    tag: "Zero Guesswork",
  },
  {
    kicker: "Web3 Ready",
    title: "Travel Itinerary AI: Build a visa-smart plan that adapts",
    description: "Optimizes your trip plan around visa timelines, embassy closures, and local peak seasons.",
    href: "/ai-tools/travel-itinerary-ai",
    icon: <FiCompass className="h-5 w-5" />,
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    tag: "Tourism AI",
  },
  {
    kicker: "Success Strategy",
    title: "AI Profile Optimizer: Convert your profile into points",
    description: "Map your skills, education, and experience into a clearer pathway and actionable upgrades.",
    href: "/ai-tools/eligibility",
    icon: <FiCpu className="h-5 w-5" />,
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    tag: "Top Rated",
  },
  {
    kicker: "Global Reach",
    title: "Country Playbooks: Learn the fastest pathways by destination",
    description: "Curated migration and tourism playbooks with AI summaries and red-flag warnings.",
    href: "/countries",
    icon: <FiGlobe className="h-5 w-5" />,
    gradient: "from-emerald-400/15 via-indigo-500/10 to-transparent",
    tag: "Guides",
  },
  {
    kicker: "Risk Shield",
    title: "Scam Detector: Verify offers, agencies, and communications",
    description: "Protect yourself with fraud pattern detection and instant red-flag intelligence.",
    href: "/ai-tools/scam-detector",
    icon: <FiShield className="h-5 w-5" />,
    gradient: "from-red-500/15 via-amber-500/10 to-transparent",
    tag: "Protection",
  },
];

export default function LandingBlogSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="absolute -bottom-48 right-[-10%] h-[700px] w-[700px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.65)]" />
            AI Tools + Insights
          </div>
          <h2 className="mt-6 text-3xl md:text-5xl font-black tracking-tight">
            <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              A smarter ecosystem
            </span>{" "}
            <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              for migration & tourism
            </span>
          </h2>
          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            Card-based intelligence built for global mobility—tools, playbooks, and automation that don’t exist in
            traditional agencies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <Link href={card.href} className="block h-full">
                <GlassCard className="h-full p-8 border-white/10 hover:border-amber-400/25 transition-colors duration-500 group relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 text-amber-200/80 text-xs font-bold">
                        <span className="h-9 w-9 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md flex items-center justify-center text-white">
                          {card.icon}
                        </span>
                        <span className="uppercase tracking-widest text-[10px]">{card.kicker}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-black/30 border border-white/10 px-3 py-1 rounded-full">
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-black tracking-tight text-white group-hover:text-amber-100 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                        Open
                      </span>
                      <span className="inline-flex items-center gap-2 text-amber-200/80 text-sm font-bold">
                        View <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
          >
            Explore Blog
            <FiArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

