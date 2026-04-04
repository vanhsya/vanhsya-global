'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiCpu, FiGlobe, FiLayers, FiShield, FiZap } from 'react-icons/fi';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import { COMPANY } from '@/lib/company';

const pillars = [
  {
    title: '100+ AI Integrations',
    description: 'Tools that connect eligibility, documents, timelines, fraud defense, and support into one guided journey.',
    icon: FiCpu
  },
  {
    title: 'Immigration Concierge',
    description: 'A luxury-grade assistant that answers, checks, and routes you to the right next action in seconds.',
    icon: FiZap
  },
  {
    title: 'Immigration Games & Challenges',
    description: 'Skill-based mini experiences to educate users and improve readiness without boring forms.',
    icon: FiGlobe
  },
  {
    title: 'Lotteries & Rewards',
    description: 'Referral rewards, monthly lotteries, and community unlocks — designed for transparency and fairness.',
    icon: FiLayers
  },
  {
    title: 'Security-First Trust Layer',
    description: 'Scam detection, verified checklists, and audit-style guidance — reduce risk before money moves.',
    icon: FiShield
  }
];

export default function NextEraPage() {
  return (
    <main className="min-h-screen bg-[#0A0A10]">
      <NavigationPremium variant="neo" />
      <div className="pt-24">
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-black to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.12),transparent_55%)]" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 text-sm font-semibold">
                <FiZap className="w-4 h-4 text-yellow-300" />
                <span>Next Era Roadmap</span>
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  100+ AI Integrations
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  and more coming soon
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto">
                VANHSYA is building a premium, scam-resistant migration ecosystem: concierge guidance, document intelligence,
                readiness games, transparent rewards, and next-gen automation.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/ai-tools"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all"
                >
                  <span>Explore AI Tools</span>
                  <FiArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold transition-all"
                >
                  <span>Book a Consultation</span>
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((p, idx) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                >
                  <GlassCard className="h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                        <p.icon className="w-6 h-6 text-yellow-300" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{p.title}</h3>
                        <p className="mt-2 text-white/70 text-sm leading-relaxed">{p.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlassCard className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                    Build with VANHSYA
                  </h2>
                  <p className="mt-4 text-white/70">
                    Investors and builders can connect directly. If you want automation partnerships, integrations, or to join the team,
                    email us below.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`mailto:${COMPANY.emails.founder}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-black font-extrabold transition-all"
                    >
                      <span>Invest: {COMPANY.emails.founder}</span>
                      <FiArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${COMPANY.emails.career}`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold transition-all"
                    >
                      <span>Careers: {COMPANY.emails.career}</span>
                      <FiArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8">
                  <div className="text-sm font-bold text-white/80">What’s next</div>
                  <ul className="mt-4 space-y-3 text-white/70 text-sm">
                    <li className="flex items-center gap-3">
                      <FiArrowRight className="w-4 h-4 text-purple-300" />
                      Immigration Concierge + action workflows
                    </li>
                    <li className="flex items-center gap-3">
                      <FiArrowRight className="w-4 h-4 text-purple-300" />
                      Smart document readiness + upload checks
                    </li>
                    <li className="flex items-center gap-3">
                      <FiArrowRight className="w-4 h-4 text-purple-300" />
                      Lottery + reward economy (transparent rules)
                    </li>
                    <li className="flex items-center gap-3">
                      <FiArrowRight className="w-4 h-4 text-purple-300" />
                      Web3-ready identity and verification layers
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

