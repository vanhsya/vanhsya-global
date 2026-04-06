'use client';

import { motion } from 'framer-motion';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Search, Sparkles, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

type Destination = {
  name: string;
  flag: string;
  description: string;
  imageSrc: string;
  href: string;
  tags: string[];
  stats: { label: string; value: string }[];
  popularity: number;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

export default function CountriesLanding() {
  const destinations: Destination[] = useMemo(
    () => [
      {
        name: 'Canada',
        flag: '🇨🇦',
        description: 'Express Entry, PNP pathways, and a premium quality of life with strong public services.',
        imageSrc: '/images/destinations/canada.svg',
        href: '/countries/canada',
        tags: ['PR', 'Work', 'Study'],
        stats: [
          { label: 'Processing', value: '6–12 mo' },
          { label: 'Programs', value: '80+' },
          { label: 'Success', value: '97%' }
        ],
        popularity: 35
      },
      {
        name: 'Australia',
        flag: '🇦🇺',
        description: 'SkillSelect system, state nomination options, and strong salary-to-lifestyle balance.',
        imageSrc: '/images/destinations/australia.svg',
        href: '/countries/australia',
        tags: ['PR', 'Work', 'Points'],
        stats: [
          { label: 'Processing', value: '8–16 mo' },
          { label: 'Programs', value: '60+' },
          { label: 'Success', value: '94%' }
        ],
        popularity: 28
      },
      {
        name: 'United States',
        flag: '🇺🇸',
        description: 'High-impact career growth with multiple routes: work, family, and investment pathways.',
        imageSrc: '/images/destinations/usa.svg',
        href: '/countries/usa',
        tags: ['Work', 'Family', 'Investment'],
        stats: [
          { label: 'Processing', value: '12–24 mo' },
          { label: 'Programs', value: '50+' },
          { label: 'Success', value: '89%' }
        ],
        popularity: 18
      },
      {
        name: 'United Kingdom',
        flag: '🇬🇧',
        description: 'Skilled Worker route, Global Talent, top education, and a strong global hub ecosystem.',
        imageSrc: '/images/destinations/uk.svg',
        href: '/countries/uk',
        tags: ['Work', 'Study', 'Talent'],
        stats: [
          { label: 'Processing', value: '3–8 mo' },
          { label: 'Programs', value: '40+' },
          { label: 'Success', value: '92%' }
        ],
        popularity: 12
      },
      {
        name: 'Germany',
        flag: '🇩🇪',
        description: 'EU Blue Card and job-seeker routes with stable benefits and a powerhouse economy.',
        imageSrc: '/images/destinations/germany.svg',
        href: '/countries/germany',
        tags: ['EU', 'Work', 'Blue Card'],
        stats: [
          { label: 'Processing', value: '4–10 mo' },
          { label: 'Programs', value: '35+' },
          { label: 'Success', value: '91%' }
        ],
        popularity: 5
      },
      {
        name: 'New Zealand',
        flag: '🇳🇿',
        description: 'Skilled Migrant options with a premium lifestyle and a strong work-life balance.',
        imageSrc: '/images/destinations/new-zealand.svg',
        href: '/countries/new-zealand',
        tags: ['PR', 'Work', 'Lifestyle'],
        stats: [
          { label: 'Processing', value: '6–14 mo' },
          { label: 'Programs', value: '25+' },
          { label: 'Success', value: '93%' }
        ],
        popularity: 6
      },
      {
        name: 'Singapore',
        flag: '🇸🇬',
        description: 'Employment Pass routes with fast business ecosystems and world-class infrastructure.',
        imageSrc: '/images/destinations/singapore.svg',
        href: '/countries/singapore',
        tags: ['Work', 'Tech', 'APAC'],
        stats: [
          { label: 'Processing', value: '4–10 wk' },
          { label: 'Programs', value: '10+' },
          { label: 'Success', value: '90%' }
        ],
        popularity: 4
      },
      {
        name: 'United Arab Emirates',
        flag: '🇦🇪',
        description: 'Golden Visa and premium residency options with global mobility and business access.',
        imageSrc: '/images/destinations/uae.svg',
        href: '/countries/uae',
        tags: ['Golden Visa', 'Work', 'Investment'],
        stats: [
          { label: 'Processing', value: '2–8 wk' },
          { label: 'Programs', value: '15+' },
          { label: 'Success', value: '95%' }
        ],
        popularity: 7
      }
    ],
    []
  );

  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string>('All');

  const tags = useMemo(() => {
    const t = new Set<string>();
    for (const d of destinations) d.tags.forEach((x) => t.add(x));
    return ['All', ...Array.from(t).sort()];
  }, [destinations]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations
      .filter((d) => (tag === 'All' ? true : d.tags.includes(tag)))
      .filter((d) => (q ? `${d.name} ${d.description} ${d.tags.join(' ')}`.toLowerCase().includes(q) : true))
      .sort((a, b) => b.popularity - a.popularity);
  }, [destinations, query, tag]);

  const top = useMemo(() => destinations.slice().sort((a, b) => b.popularity - a.popularity).slice(0, 6), [destinations]);

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
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Immigration Destinations</span>
            </div>

            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Explore the world’s best
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                migration destinations.
              </span>
            </h1>

            <p className="mt-6 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Compare countries by outcomes, lifestyle, and pathway fit. Every destination card links to a guided overview with next steps.
            </p>

            <div className="mt-10 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-8 relative">
                  <Search className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search a country or pathway (PR, Work, Study, Investment...)"
                    className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                </div>
                <div className="md:col-span-4">
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    aria-label="Filter by pathway"
                    className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    {tags.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                >
                  Get a migration plan <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/ai-tools/eligibility"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                >
                  Run eligibility check <Sparkles className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="mt-12">
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-amber-200" />
                  <div className="text-white font-extrabold">Popular right now</div>
                </div>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Share of interest</div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {top.map((d) => (
                  <Link
                    key={d.name}
                    href={d.href}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{d.flag}</div>
                        <div className="font-extrabold text-white">{d.name}</div>
                      </div>
                      <div className="text-white/70 font-bold">{d.popularity}%</div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-300/80 via-purple-400/70 to-indigo-400/70" style={{ width: `${Math.min(100, d.popularity)}%` }} />
                    </div>
                  </Link>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Destinations</div>
              <div className="mt-3 text-2xl md:text-4xl font-black">Pick a country. We guide the journey.</div>
              <div className="mt-3 text-white/70 max-w-2xl">
                Premium cards with pathway tags, key stats, and a visual identity for each destination.
              </div>
            </div>
            <div className="text-sm text-white/60">
              Showing <span className="text-white font-extrabold">{visible.length}</span> destinations
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {visible.map((d) => (
              <Link key={d.name} href={d.href} className="group">
                <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors">
                  <div className="relative aspect-[16/9]">
                    <OptimizedImage src={d.imageSrc} alt={`${d.name} destination`} fill className="absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <div className="absolute left-5 bottom-5 right-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{d.flag}</div>
                          <div className="text-white font-extrabold text-xl">{d.name}</div>
                        </div>
                        <div className="text-xs font-black uppercase tracking-[0.25em] text-amber-200/90">{d.popularity}%</div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {d.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] font-black uppercase tracking-[0.22em] px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-white/70 text-sm leading-relaxed">{d.description}</div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {d.stats.map((s) => (
                        <div key={s.label} className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                          <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">{s.label}</div>
                          <div className="mt-2 text-white font-extrabold">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-white font-extrabold">
                      Explore <span className="text-amber-200">{d.name}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-10 border-white/10" hover={false}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Personalized Guidance</div>
                <div className="mt-4 text-3xl md:text-4xl font-black">Not sure where to start? We’ll map the fastest path.</div>
                <div className="mt-5 text-white/70 leading-relaxed max-w-2xl">
                  Tell us your goals and profile. We’ll shortlist countries, explain options, and give you a step-by-step plan with
                  timelines and required documents.
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                  >
                    Book a consultation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/ai-tools/eligibility"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    Check eligibility <Sparkles className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">What you get</div>
                  <div className="mt-4 space-y-3 text-sm text-white/70">
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>Country shortlist based on profile fit and timeline risk</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>Document checklist, readiness improvements, and next steps</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span>Fraud-aware guardrails via Expose and verified partner pathways</span>
                    </div>
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

