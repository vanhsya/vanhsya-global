"use client";

import Link from 'next/link';
import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import { ExternalLink, Mail } from 'lucide-react';

export default function WebmailPage() {
  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <Mail className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Email Login</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Secure Webmail Access
            </h1>
            <p className="mt-4 text-white/70 leading-relaxed">
              Use the official secure login portal. This avoids certificate warnings that can happen when using a branded subdomain.
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">Open Webmail</div>
              <div className="mt-2 text-white/70 text-sm leading-relaxed">
                Recommended: always use the secure Private Email portal.
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://mail.privateemail.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-4 font-extrabold transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open mail.privateemail.com
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 px-5 py-4 font-extrabold transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">If you see “Certificate not trusted”</div>
              <div className="mt-2 text-white/70 text-sm leading-relaxed">
                Some email providers issue certificates only for their own domain (for example, privateemail.com). If you try to log in via a custom
                subdomain like mail.vanhsya.com, browsers can show a certificate mismatch warning. Using the official portal fixes this.
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
