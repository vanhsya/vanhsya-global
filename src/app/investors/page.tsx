 'use client';
 
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
 import NavigationPremium from '@/components/NavigationPremium';
 import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import { COMPANY } from '@/lib/company';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileText,
  LineChart,
  Lock,
  Mail,
  Target,
  Users
} from 'lucide-react';
 
 export default function InvestorsPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    stage: 'Angel / Seed',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const traction = useMemo(
    () => [
      { label: 'Success Rate', value: '99.9%', hint: 'Quality systems, verified workflows' },
      { label: 'Clients Served', value: '15,623', hint: 'Operational baseline across regions' },
      { label: 'Roadmap', value: '100+ AI modules', hint: 'Automation + compliance guardrails' }
    ],
    []
  );

  const pillars = useMemo(
    () => [
      {
        icon: LineChart,
        title: 'Infrastructure Thesis',
        items: [
          'Migration as a measurable workflow (not an opaque service)',
          'Verification layers that reduce fraud and increase conversion',
          'AI that scales case preparation without losing accuracy'
        ]
      },
      {
        icon: Building2,
        title: 'Business Model',
        items: [
          'Premium service + AI modules (subscription)',
          'Partner network distribution and verification products',
          'Payments and escalation/escrow primitives (milestone aligned)'
        ]
      },
      {
        icon: Target,
        title: 'Risk Controls',
        items: [
          'Transparency-first approach with audit trails',
          'Policy-aware automation and human review layers',
          'Abuse prevention: rate limits, verification, tier gating'
        ]
      }
    ],
    []
  );

  const timeline = useMemo(
    () => [
      {
        phase: 'Phase 1',
        title: 'Premium platform foundation',
        items: ['Luxury UX + trust layer', 'Expose platform and case intelligence', 'AI concierge + tooling suite']
      },
      {
        phase: 'Phase 2',
        title: 'Partner rails and verification',
        items: ['Verified partner network', 'Automated compliance checks', 'SLA-driven case operations']
      },
      {
        phase: 'Phase 3',
        title: 'Payments / card ecosystem',
        items: ['Tiered card experiences', 'Escrow primitives for milestones', 'Cross-border settlement integrations']
      }
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: 'What makes VANHSYA defensible?',
        a: 'The defensibility comes from verified workflows, operational data loops, and trust infrastructure that becomes harder to replicate as partner and case volume grows.'
      },
      {
        q: 'What do you share in the investor deck?',
        a: 'Thesis, product roadmap, traction narrative, go-to-market, unit economics assumptions, and a milestone-based plan. We share the detailed model after initial qualification.'
      },
      {
        q: 'How do you approach compliance?',
        a: 'We treat compliance as a system: policy-aware automation, verification checkpoints, and clear audit trails. Payments/settlement features are staged with conservative rollout gates.'
      }
    ],
    []
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');
    try {
      const res = await fetch('/api/investors/deck-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'investors_page' })
      });
      const json = (await res.json().catch(() => null)) as { id?: string; error?: string } | null;
      if (!res.ok) {
        setStatus('error');
        setFeedback(json?.error || 'Submission failed');
        return;
      }
      setStatus('success');
      setFeedback('Request received. We will respond with next steps.');
      setForm((p) => ({ ...p, message: '' }));
    } catch {
      setStatus('error');
      setFeedback('Network error');
    }
  };

   return (
     <main className="min-h-screen bg-slate-950 text-white">
       <NavigationPremium variant="neo" />
 
       <section className="pt-28 pb-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya">
              <BadgeCheck className="w-4 h-4 text-amber-300" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Invest</span>
             </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              VANHSYA is building migration infrastructure — with premium trust built-in.
             </h1>
             <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              We engineer verified workflows, fraud-resistant partner rails, and AI systems that scale high-stakes cross-border outcomes with precision.
             </p>
           </div>
 
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {traction.map((t) => (
              <GlassCard key={t.label} className="p-6 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">{t.label}</div>
                <div className="mt-3 text-3xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  {t.value}
                </div>
                <div className="mt-2 text-sm text-white/60">{t.hint}</div>
              </GlassCard>
            ))}
          </div>
 
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Investment Overview</div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {pillars.map((p) => (
                  <GlassCard key={p.title} className="p-6 border-white/10" hover={false}>
                    <div className="flex items-center gap-3">
                      <p.icon className="w-5 h-5 text-amber-200" />
                      <div className="font-extrabold">{p.title}</div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-white/70">
                      {p.items.map((i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span>{i}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>

              <div className="mt-10">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Roadmap</div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {timeline.map((t) => (
                    <GlassCard key={t.phase} className="p-6 border-white/10" hover={false}>
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
                        {t.phase}
                      </div>
                      <div className="mt-2 text-white font-extrabold">{t.title}</div>
                      <div className="mt-4 space-y-2 text-sm text-white/70">
                        {t.items.map((i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                            <span>{i}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">FAQ</div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {faqs.map((f) => (
                    <GlassCard key={f.q} className="p-6 border-white/10" hover={false}>
                      <div className="text-white font-extrabold">{f.q}</div>
                      <div className="mt-3 text-sm text-white/70 leading-relaxed">{f.a}</div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <GlassCard className="p-7 border-white/10" hover={false}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Request Deck</div>
                    <Lock className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="mt-3 text-white font-extrabold text-xl">Investor deck + model (curated access)</div>
                  <div className="mt-3 text-sm text-white/70 leading-relaxed">
                    Share a few details. We respond quickly with the deck and next steps.
                  </div>

                  <form onSubmit={submit} className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Full name"
                        className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                      />
                      <input
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="Email"
                        className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        value={form.organization}
                        onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))}
                        placeholder="Fund / organization"
                        className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                      />
                      <input
                        value={form.role}
                        onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                        placeholder="Role"
                        className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                      />
                    </div>
                    <select
                      value={form.stage}
                      onChange={(e) => setForm((p) => ({ ...p, stage: e.target.value }))}
                      aria-label="Investment stage"
                      className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    >
                      <option value="Angel / Seed">Angel / Seed</option>
                      <option value="Pre-Seed">Pre-Seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Strategic Partner">Strategic Partner</option>
                      <option value="Other">Other</option>
                    </select>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="What are you most interested in?"
                      className="min-h-[110px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    />

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-60"
                    >
                      <FileText className="w-5 h-5" />
                      {status === 'loading' ? 'Submitting…' : 'Request deck'}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {feedback ? (
                      <div className={`text-sm ${status === 'success' ? 'text-emerald-200' : 'text-amber-200'}`}>
                        {feedback}
                      </div>
                    ) : null}
                  </form>

                  <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                    <a
                      href={`mailto:${COMPANY.emails.founder}`}
                      className="inline-flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Mail className="w-4 h-4 text-white/80" />
                        {COMPANY.emails.founder}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <Link
                      href="/expose"
                      className="inline-flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-colors"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/80" />
                        Transparency layer (Expose)
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </GlassCard>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <GlassCard className="p-6 border-white/10" hover={false}>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Disclosure</div>
                    <div className="mt-3 text-sm text-white/70 leading-relaxed">
                      This page is informational and not an offer to sell securities. Materials are shared privately after qualification.
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          </div>
         </div>
       </section>
 
       <Footer />
     </main>
   );
 }
