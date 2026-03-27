"use client";

import React from "react";
import Link from "next/link";
import NavigationPremium from "@/components/NavigationPremium";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiMapPin } from "react-icons/fi";

type Story = { id: string; ts: number; title: string; destination: string; content: string };

const STORAGE_KEY = "vanhsya_earn_state_v1";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export default function ReferralStoriesPage() {
  const [stories, setStories] = React.useState<Story[]>([]);

  React.useEffect(() => {
    const parsed = safeParse<{ stories?: Story[] }>(window.localStorage.getItem(STORAGE_KEY));
    setStories((parsed?.stories ?? []).slice().sort((a, b) => b.ts - a.ts));
  }, []);

  return (
    <main className="min-h-screen text-white">
      <NavigationPremium variant="neo" />
      <section className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
              <FiBookOpen className="h-4 w-4" />
              Earn Community Stories
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Travel experiences
              </span>{" "}
              <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                that earn rewards
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Publish your trip stories inside the referral program to earn points, build trust, and help others travel
              smarter.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/referral-program"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
              >
                Back to Earn <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
              >
                Explore Blog <FiArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <GlassCard className="p-8 border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-black text-white">{s.title}</h2>
                      <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400">
                        <FiMapPin className="h-4 w-4" />
                        {s.destination}
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                      {new Date(s.ts).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-5 text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                    {s.content}
                  </p>
                </GlassCard>
              </motion.div>
            ))}

            {stories.length === 0 && (
              <GlassCard className="p-10 border-white/10 text-center lg:col-span-2">
                <h2 className="text-2xl font-black text-white">No stories yet</h2>
                <p className="mt-4 text-slate-400">
                  Publish your first travel story from the referral program to earn points automatically.
                </p>
                <Link
                  href="/referral-program"
                  className="mt-8 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
                >
                  Publish a Story <FiArrowRight className="h-5 w-5" />
                </Link>
              </GlassCard>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
