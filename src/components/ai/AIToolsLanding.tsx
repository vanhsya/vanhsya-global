'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  ClipboardCheck,
  FileCheck2,
  Gamepad2,
  GraduationCap,
  LineChart,
  Mic,
  ScanText,
  Timer
} from 'lucide-react';
import { useMemo } from 'react';

type Tool = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  accent: 'amber' | 'purple' | 'indigo' | 'emerald';
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

const accentClass = (accent: Tool['accent']) => {
  if (accent === 'amber') return 'from-amber-300/30 via-amber-500/15 to-transparent';
  if (accent === 'emerald') return 'from-emerald-300/25 via-emerald-500/10 to-transparent';
  if (accent === 'indigo') return 'from-indigo-300/25 via-indigo-500/10 to-transparent';
  return 'from-purple-300/25 via-purple-500/10 to-transparent';
};

export default function AIToolsLanding() {
  const tools: Tool[] = useMemo(
    () => [
      {
        title: 'IELTS Trainer AI',
        description: 'Adaptive practice with writing assessment, band estimate, and personalized 14-day plans.',
        href: '/ai-tools/ielts-trainer',
        icon: GraduationCap,
        tags: ['Speaking', 'Writing', 'Plan'],
        accent: 'amber'
      },
      {
        title: 'Visa Interview Coach',
        description: 'Mock interviews with structured feedback, cultural tips, and red-flag risk signals.',
        href: '/ai-tools/visa-interview-coach',
        icon: Mic,
        tags: ['USA', 'UK', 'Canada', 'AU', 'EU'],
        accent: 'purple'
      },
      {
        title: 'Visa Rejection Analyzer',
        description: 'Paste a refusal letter and get failure points, evidence gaps, and a targeted improvement plan.',
        href: '/ai-tools/visa-rejection-analyzer',
        icon: ScanText,
        tags: ['Evidence', 'Fixes', 'Checklist'],
        accent: 'indigo'
      },
      {
        title: 'Immigration Simulations',
        description: 'Interactive visa journey games: document prep challenges and interview scenarios.',
        href: '/ai-tools/immigration-simulations',
        icon: Gamepad2,
        tags: ['Study', 'Work', 'PR'],
        accent: 'emerald'
      },
      {
        title: 'Document Verification Assistant',
        description: 'Country/pathway document packs, readiness checks, and verification guidance.',
        href: '/ai-tools/document-verification',
        icon: FileCheck2,
        tags: ['Pack', 'Readiness', 'Index'],
        accent: 'amber'
      },
      {
        title: 'Timeline Optimizer',
        description: 'Build a milestone plan with buffers and risk flags based on your country and pathway.',
        href: '/ai-tools/timeline-optimizer',
        icon: Timer,
        tags: ['Milestones', 'Buffers', 'Risk'],
        accent: 'indigo'
      },
      {
        title: 'Success Predictor',
        description: 'Estimate risk band and success probability using profile factors and calibration.',
        href: '/ai-tools/success-predictor',
        icon: LineChart,
        tags: ['Risk band', 'Factors', 'Improvements'],
        accent: 'purple'
      },
      {
        title: 'Progress Dashboard',
        description: 'Track progress, practice history, and outcomes across all tools.',
        href: '/ai-tools/dashboard',
        icon: ClipboardCheck,
        tags: ['Tracking', 'Outcomes'],
        accent: 'emerald'
      }
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <BadgeCheck className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">AI Tools</span>
            </div>

            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Advanced AI for students
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                and global professionals.
              </span>
            </h1>

            <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Practice, simulate, verify, optimize, and reduce risk — with expert-structured rubrics, progress tracking, and a trust-first approach.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/ai-tools/ielts-trainer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
              >
                Start IELTS Trainer <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ai-tools/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
              >
                Open Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tools.map((t) => (
              <Link key={t.href} href={t.href} className="group">
                <GlassCard className="p-7 border-white/10 h-full" hover={false}>
                  <div className="relative">
                    <div className={`absolute -inset-6 rounded-3xl bg-gradient-to-br ${accentClass(t.accent)} opacity-60`} />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
                          <t.icon className="w-6 h-6 text-amber-200" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/60 transition-transform group-hover:translate-x-1" />
                      </div>

                      <div className="mt-5 text-white font-extrabold text-xl">{t.title}</div>
                      <div className="mt-3 text-sm text-white/70 leading-relaxed">{t.description}</div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <GlassCard className="p-9 border-white/10" hover={false}>
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-5 h-5 text-emerald-200" />
                <div className="text-white font-extrabold">Continuous improvement</div>
              </div>
              <div className="mt-3 text-sm text-white/70 leading-relaxed">
                Your progress and outcomes can be tracked locally to refine estimates and training focus. AI outputs are guidance and not a guarantee of approval.
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

