'use client';

import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import { COMPANY } from '@/lib/company';
import { EXPOSE_CASES } from '@/data/expose/cases';
import { EXPOSE_INTERVIEWS } from '@/data/expose/interviews';
import { INDUSTRY_WATCH } from '@/data/expose/industryWatch';
import { ArrowRight, BadgeCheck, Gavel, Landmark, ShieldAlert, Wallet } from 'lucide-react';

export default function ExposeLanding() {
  const featuredCases = EXPOSE_CASES.slice(0, 3);
  const featuredInterviews = EXPOSE_INTERVIEWS.slice(0, 2);
  const featuredWatch = INDUSTRY_WATCH.slice(0, 2);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
              <ShieldAlert className="h-4 w-4" />
              Expose + Victim Support
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              The complete platform to{' '}
              <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                expose migration fraud
              </span>
              .
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              Submit your case with evidence, get a tracking ID, and help protect others. VANHSYA publishes verified, public-safe
              information and connects victims to lawful recovery pathways.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/expose/victim-stories"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold transition-colors"
              >
                Submit a Victim Story <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/expose/interviews"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
              >
                YouTube Interviews <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/expose/industry-watch"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
              >
                Industry Watch <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={COMPANY.social.youtubeChannel}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
              >
                Watch VANHSYA Live <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={COMPANY.social.youtubeSubscribe}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
              >
                Subscribe <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <GlassCard className="p-8 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">VANHSYA Action Plan</div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Collect', body: 'Structured form, evidence upload, and a tracking ID for each case.' },
                    { title: 'Verify', body: 'Cross-check claims, documents, and identity signals before publishing.' },
                    { title: 'Expose', body: 'Publish public-safe verified cases, profiles, and fraud patterns.' },
                    { title: 'Recover', body: 'Guidance for legal escalation and financial recovery steps.' }
                  ].map((s) => (
                    <div key={s.title} className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                      <div className="text-white font-extrabold">{s.title}</div>
                      <div className="mt-2 text-sm text-white/70 leading-relaxed">{s.body}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <GlassCard className="p-6 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Dedicated help routes</div>
                <div className="mt-5 grid grid-cols-1 gap-3">
                  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                    <div className="flex items-center gap-3">
                      <Landmark className="h-5 w-5 text-purple-200" />
                      <div className="font-black text-white">Immigration Lawyers</div>
                    </div>
                    <div className="mt-3 text-sm text-white/70 leading-relaxed">
                      Strategy reviews, affidavit support, documentation correction, and lawful escalation paths.
                    </div>
                    <div className="mt-4">
                      <Link href="/consultation" className="inline-flex items-center gap-2 text-purple-200 hover:text-white font-black">
                        Book consult <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                    <div className="flex items-center gap-3">
                      <Gavel className="h-5 w-5 text-amber-200" />
                      <div className="font-black text-white">Criminal Lawyers</div>
                    </div>
                    <div className="mt-3 text-sm text-white/70 leading-relaxed">
                      Fraud complaint guidance, evidence packaging, and jurisdiction-aware reporting routes.
                    </div>
                    <div className="mt-4">
                      <a
                        href={COMPANY.whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black"
                      >
                        WhatsApp support <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-emerald-200" />
                      <div className="font-black text-white">Financial Advisors</div>
                    </div>
                    <div className="mt-3 text-sm text-white/70 leading-relaxed">
                      Loss assessment, chargeback guidance, payment trail mapping, and financial recovery planning.
                    </div>
                    <div className="mt-4">
                      <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white font-black">
                        Ask for recovery plan <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 border-white/10" hover={false}>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Commitments</div>
                  <BadgeCheck className="h-5 w-5 text-green-300" />
                </div>
                <div className="mt-4 space-y-3 text-sm text-white/70 leading-relaxed">
                  <div>We commit only to what we can deliver.</div>
                  <div>We publish public-safe verified information.</div>
                  <div>We do not promise guaranteed outcomes.</div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    Talk to VANHSYA <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/expose/scammers"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    Scammer profiles <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Victim Stories</div>
              <div className="mt-3 text-white font-extrabold text-xl">Submit + track your case</div>
              <div className="mt-3 text-sm text-white/70 leading-relaxed">
                Upload evidence, receive a tracking ID, and follow the review status.
              </div>
              <div className="mt-6">
                <Link href="/expose/victim-stories" className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black">
                  Go to submissions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">YouTube Interviews</div>
              <div className="mt-3 text-white font-extrabold text-xl">Human stories + evidence</div>
              <div className="mt-3 text-sm text-white/70 leading-relaxed">
                Watch interviews that explain scams, prevention, and recovery routes.
              </div>
              <div className="mt-6">
                <Link href="/expose/interviews" className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black">
                  View interviews <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Industry Watch</div>
              <div className="mt-3 text-white font-extrabold text-xl">Fraud patterns + signals</div>
              <div className="mt-3 text-sm text-white/70 leading-relaxed">
                A living ledger of tactics, verification workflows, and red flags.
              </div>
              <div className="mt-6">
                <Link href="/expose/industry-watch" className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black">
                  Open watch <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </GlassCard>
          </div>

          <div className="mt-14">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-black text-white">Featured cases</h2>
              <span className="text-xs text-white/50">{EXPOSE_CASES.length} published</span>
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredCases.map((c) => (
                <GlassCard key={c.id} className="p-7 border-white/10" hover={false}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-white font-extrabold">{c.title}</div>
                      <div className="mt-2 text-sm text-white/60">{c.country} · {c.scamType}</div>
                    </div>
                    <span className="neo-badge neo-badge-security">{c.severity.toUpperCase()}</span>
                  </div>
                  <div className="mt-4 text-sm text-white/75 leading-relaxed line-clamp-4">{c.summary}</div>
                  <div className="mt-6">
                    <Link href={`/expose/cases/${c.slug}`} className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black">
                      Read case <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Latest Interviews</div>
              <div className="mt-5 space-y-4">
                {featuredInterviews.map((v) => (
                  <Link
                    key={v.id}
                    href="/expose/interviews"
                    className="block rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="text-white font-extrabold">{v.title}</div>
                    <div className="mt-2 text-sm text-white/70">{v.summary}</div>
                  </Link>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Industry Watch</div>
              <div className="mt-5 space-y-4">
                {featuredWatch.map((w) => (
                  <Link
                    key={w.id}
                    href="/expose/industry-watch"
                    className="block rounded-2xl bg-white/[0.04] border border-white/10 p-5 hover:bg-white/[0.07] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-white font-extrabold">{w.title}</div>
                      <span className="neo-badge neo-badge-security">{w.severity.toUpperCase()}</span>
                    </div>
                    <div className="mt-2 text-sm text-white/70">{w.summary}</div>
                  </Link>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
