import type { Metadata } from 'next';
import Link from 'next/link';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import MaintenanceArcade from '@/components/maintenance/MaintenanceArcade';
import { BadgeCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Maintenance Mode | VANHSYA',
  description: 'VANHSYA is temporarily under maintenance. Please check back shortly.',
  robots: { index: false, follow: false }
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <BadgeCheck className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Maintenance Mode</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              We’re upgrading systems.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              While we improve performance and reliability, enjoy a quick mini-game. You can also check key links below.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-8 p-7 border-white/10" hover={false}>
              <MaintenanceArcade
                title="Keep the ship online"
                subtitle="Dodge debris, collect sparks, and keep your streak alive while VANHSYA comes back online."
                seed="maintenance"
              />
            </GlassCard>

            <GlassCard className="lg:col-span-4 p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">Quick navigation</div>
              <div className="mt-2 text-white/70 text-sm leading-relaxed">
                Some pages may be limited during downtime. If a link is unavailable, you’ll return here automatically.
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition-colors"
                >
                  <div className="text-white font-extrabold">Home</div>
                  <div className="mt-1 text-sm text-white/60">Return to the main hub</div>
                </Link>
                <Link
                  href="/ai-tools"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition-colors"
                >
                  <div className="text-white font-extrabold">AI Tools</div>
                  <div className="mt-1 text-sm text-white/60">Practice and track progress</div>
                </Link>
                <Link
                  href="/countries"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition-colors"
                >
                  <div className="text-white font-extrabold">Destinations</div>
                  <div className="mt-1 text-sm text-white/60">Explore immigration countries</div>
                </Link>
                <Link
                  href="/contact"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-5 py-4 transition-colors"
                >
                  <div className="text-white font-extrabold">Contact</div>
                  <div className="mt-1 text-sm text-white/60">Get help from the team</div>
                </Link>
              </div>

              <div className="mt-6 text-xs text-white/50 leading-relaxed">
                If you’re an applicant mid-process, keep your documents ready and try again soon. VANHSYA never guarantees approval.
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

