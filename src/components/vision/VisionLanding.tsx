'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import OptimizedImage from '@/components/OptimizedImage';
import { COMPANY } from '@/lib/company';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Boxes,
  BrainCircuit,
  FileCheck2,
  Fingerprint,
  Globe2,
  Lock,
  Network,
  Radar,
  ShieldCheck
} from 'lucide-react';
import { useMemo, useState } from 'react';

type ModuleId = 'trust' | 'policy' | 'workflow' | 'identity' | 'settlement';

type Module = {
  id: ModuleId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  bullets: string[];
  outputs: { label: string; value: string }[];
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

export default function VisionLanding() {
  const modules: Module[] = useMemo(
    () => [
      {
        id: 'trust',
        title: 'Trust Ledger',
        subtitle: 'Fraud-resistant proof of progress before money moves.',
        icon: ShieldCheck,
        bullets: [
          'Risk signals from scams, patterns, and partner verification',
          'Evidence-aware workflows with safe publishing and audit trails',
          'Transparent rules for incentives, lotteries, and referrals'
        ],
        outputs: [
          { label: 'Fraud Signals', value: 'Real-time' },
          { label: 'Audit Trail', value: 'Immutable-like logs' },
          { label: 'Verification', value: 'Partner + user' }
        ]
      },
      {
        id: 'policy',
        title: 'Policy Graph Engine',
        subtitle: 'A living model of requirements and constraints.',
        icon: Radar,
        bullets: [
          'Country and visa rules expressed as a structured graph',
          'Changes tracked as versioned snapshots for explainability',
          'Personalized eligibility deltas and next-step decisions'
        ],
        outputs: [
          { label: 'Eligibility', value: 'Explainable' },
          { label: 'Diffs', value: 'Versioned' },
          { label: 'Coverage', value: 'Multi-country' }
        ]
      },
      {
        id: 'workflow',
        title: 'Mobility Workflow OS',
        subtitle: 'From chaos to a guided, verified journey.',
        icon: Boxes,
        bullets: [
          'One canonical checklist: intake → docs → submissions → outcomes',
          'AI copilots for drafting, validation, and timeline prediction',
          'Human-in-the-loop gates for high-stakes steps'
        ],
        outputs: [
          { label: 'Timeline', value: 'Predictive' },
          { label: 'Documents', value: 'Validated' },
          { label: 'Ops', value: 'SLA-ready' }
        ]
      },
      {
        id: 'identity',
        title: 'Identity & Proof',
        subtitle: 'Verification that scales without ruining privacy.',
        icon: Fingerprint,
        bullets: [
          'Tiered verification to unlock sensitive actions safely',
          'Consent-first data handling with minimal retention',
          'Future-ready identity layer for regulated integrations'
        ],
        outputs: [
          { label: 'Consent', value: 'Default' },
          { label: 'Tiers', value: 'Risk-based' },
          { label: 'Privacy', value: 'Minimized' }
        ]
      },
      {
        id: 'settlement',
        title: 'Settlement + Escrow',
        subtitle: 'Milestone-aligned payments designed for trust.',
        icon: Banknote,
        bullets: [
          'Milestone escrow primitives for predictable deliverables',
          'Transparent fee breakdowns and progress checkpoints',
          'Designed to integrate with regulated payment partners'
        ],
        outputs: [
          { label: 'Escrow', value: 'Milestone-based' },
          { label: 'Fees', value: 'Transparent' },
          { label: 'Partners', value: 'Regulated' }
        ]
      }
    ],
    []
  );

  const [active, setActive] = useState<ModuleId>('trust');
  const selected = modules.find((m) => m.id === active) || modules[0];

  const nodes = useMemo(
    () => [
      { id: 'user', label: 'User', icon: Globe2 },
      { id: 'copilot', label: 'AI Copilots', icon: BrainCircuit },
      { id: 'workflow', label: 'Workflow OS', icon: Boxes },
      { id: 'policy', label: 'Policy Graph', icon: Radar },
      { id: 'trust', label: 'Trust Ledger', icon: ShieldCheck },
      { id: 'partners', label: 'Partner Network', icon: Network },
      { id: 'docs', label: 'Document Intelligence', icon: FileCheck2 },
      { id: 'settlement', label: 'Settlement', icon: Banknote }
    ],
    []
  );

  const [highlight, setHighlight] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_80%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_45%_80%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <BadgeCheck className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Vanhsya Vision</span>
            </div>

            <div className="mt-7 flex items-center justify-center">
              <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
                <OptimizedImage src="/images/originallogo.png" alt="VANHSYA logo" width={56} height={56} className="w-full h-full" />
              </div>
            </div>

            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                The Mobility Operating System
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                for verified cross-border outcomes.
              </span>
            </h1>

            <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              VANHSYA is evolving beyond “visa help” into a trust-first infrastructure layer: policy intelligence, workflow automation,
              fraud resistance, and milestone-aligned settlement — stitched into a premium experience.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/expose"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
              >
                Explore Trust Layer <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/ai-tools"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
              >
                See AI Modules <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/investors"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 font-bold transition-colors"
              >
                Partner / Invest <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-amber-200" />
                <div className="text-white font-extrabold">Unprecedented trust primitives</div>
              </div>
              <div className="mt-3 text-sm text-white/70 leading-relaxed">
                Proof-of-progress, evidence handling, and verifiable partner signals — designed to reduce scams and align incentives.
              </div>
            </GlassCard>
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="flex items-center gap-3">
                <BrainCircuit className="w-5 h-5 text-purple-200" />
                <div className="text-white font-extrabold">Policy intelligence at scale</div>
              </div>
              <div className="mt-3 text-sm text-white/70 leading-relaxed">
                A policy graph that enables explainable eligibility, personalized deltas, and safer automation under changing rules.
              </div>
            </GlassCard>
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="flex items-center gap-3">
                <Banknote className="w-5 h-5 text-emerald-200" />
                <div className="text-white font-extrabold">Milestone-aligned settlement</div>
              </div>
              <div className="mt-3 text-sm text-white/70 leading-relaxed">
                Transparent payment primitives and escrow concepts that match real-world deliverables — built for regulated partners.
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">System Architecture</div>
            <div className="mt-4 text-2xl md:text-4xl font-black">A connected stack — not disconnected tools.</div>
            <div className="mt-4 text-white/70 max-w-3xl mx-auto">
              Each layer reinforces the next: policy intelligence informs workflows, workflows produce proof, proof reduces fraud, and settlement aligns incentives.
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-7 p-7 border-white/10" hover={false}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {nodes.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onMouseEnter={() => setHighlight(n.id)}
                    onMouseLeave={() => setHighlight(null)}
                    onFocus={() => setHighlight(n.id)}
                    onBlur={() => setHighlight(null)}
                    className={`text-left rounded-2xl border px-4 py-4 transition-colors ${
                      highlight === n.id ? 'bg-white/10 border-white/20' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <n.icon className={`w-5 h-5 ${highlight === n.id ? 'text-amber-200' : 'text-white/70'}`} />
                      <div className="font-extrabold text-white">{n.label}</div>
                    </div>
                    <div className="mt-2 text-xs text-white/60">
                      {n.id === 'copilot' && 'Draft, validate, predict, route actions'}
                      {n.id === 'workflow' && 'Canonical journey with checkpoints'}
                      {n.id === 'policy' && 'Rules graph + explainable deltas'}
                      {n.id === 'trust' && 'Signals, evidence, and verification'}
                      {n.id === 'partners' && 'Verified operators and SLAs'}
                      {n.id === 'docs' && 'Readiness checks + structured extraction'}
                      {n.id === 'settlement' && 'Milestone-aligned payments'}
                      {n.id === 'user' && 'Premium experience across devices'}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">How it flows</div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/75">
                  <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                    User → AI Copilot → Workflow OS → Policy Graph → Document Intelligence
                  </div>
                  <div className="rounded-2xl bg-black/30 border border-white/10 p-4">
                    Workflow Proof → Trust Ledger → Verified Partners → Settlement → Outcome + Audit Trail
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-5 p-7 border-white/10" hover={false}>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-200" />
                <div className="text-white font-extrabold">Why this wins</div>
              </div>
              <div className="mt-4 space-y-3 text-sm text-white/70">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>Trust is embedded as a product layer, not a marketing claim.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>Policy intelligence is explainable and versioned, improving reliability.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>Milestone-aligned settlement reduces disputes and aligns incentives.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>Premium UX across web + mobile with a single canonical journey.</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Network className="w-5 h-5 text-purple-200" />
                  <div className="text-white font-extrabold">Built for partners</div>
                </div>
                <div className="mt-3 text-sm text-white/70 leading-relaxed">
                  Universities, employers, agencies, and regulated rails can integrate into a single system with verification and auditability.
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Vision Console</div>
            <div className="mt-4 text-2xl md:text-4xl font-black">Pick a module. See what it unlocks.</div>
            <div className="mt-4 text-white/70 max-w-3xl mx-auto">
              A world-class platform is composable. Each module stands alone — and becomes exponentially stronger when connected.
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <GlassCard className="lg:col-span-4 p-4 border-white/10" hover={false}>
              <div className="space-y-2">
                {modules.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActive(m.id)}
                    aria-current={active === m.id ? 'true' : undefined}
                    className={`w-full text-left rounded-2xl px-4 py-4 border transition-colors ${
                      active === m.id ? 'bg-white/10 border-white/20' : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <m.icon className={`w-5 h-5 ${active === m.id ? 'text-amber-200' : 'text-white/70'}`} />
                        <div className="font-extrabold text-white">{m.title}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/50" />
                    </div>
                    <div className="mt-2 text-sm text-white/60">{m.subtitle}</div>
                  </button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-8 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-white font-extrabold text-2xl">{selected.title}</div>
                  <div className="mt-2 text-white/70">{selected.subtitle}</div>
                </div>
                <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center">
                  <selected.icon className="w-6 h-6 text-amber-200" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">What it does</div>
                  <div className="mt-4 space-y-3 text-sm text-white/75">
                    {selected.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Outputs</div>
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {selected.outputs.map((o) => (
                      <div key={o.label} className="rounded-2xl border border-white/10 bg-black/30 p-4 flex items-center justify-between gap-4">
                        <div className="text-white/70 text-sm">{o.label}</div>
                        <div className="text-white font-extrabold">{o.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                >
                  Build with us <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/card"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                >
                  See VANHSYA Card <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-10 border-white/10" hover={false}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Invitation</div>
                <div className="mt-4 text-3xl md:text-4xl font-black">If you’re building the future of mobility, build it with VANHSYA.</div>
                <div className="mt-5 text-white/70 leading-relaxed max-w-2xl">
                  Partnerships, integrations, and investor conversations are handled privately. We share materials after qualification and align on milestones.
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:${COMPANY.emails.founder}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-300 to-amber-600 text-black font-extrabold transition-colors"
                  >
                    <span>Invest: {COMPANY.emails.founder}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${COMPANY.emails.career}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    <span>Careers: {COMPANY.emails.career}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-white/70" />
                    <div className="text-white font-extrabold">Safety + Governance</div>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-white/70">
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>Privacy-by-design and tiered access for sensitive workflows.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>Abuse prevention: verification, throttles, and auditability.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>Designed for regulated integrations and conservative rollouts.</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <Link
                      href="/expose/victim-stories"
                      className="inline-flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-200" />
                        Submit a case to Expose
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <Footer />
    </main>
  );
}

