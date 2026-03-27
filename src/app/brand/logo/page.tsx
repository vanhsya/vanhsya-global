'use client';

import BrandLogo from '@/components/BrandLogo';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEffect, useMemo, useState } from 'react';

type EventMap = Record<string, number>;

const readEvents = (key: string): EventMap => {
  try {
    const raw = localStorage.getItem(`${key}.events`);
    return raw ? (JSON.parse(raw) as EventMap) : {};
  } catch {
    return {};
  }
};

export default function LogoGuidePage() {
  const keys = useMemo(
    () => ['vanhsya.ab.logoHero.v1', 'vanhsya.ab.logoPreloader.v1', 'vanhsya.ab.logoNav.v1'],
    []
  );
  const [events, setEvents] = useState<Record<string, EventMap>>({});

  useEffect(() => {
    const next: Record<string, EventMap> = {};
    keys.forEach(k => {
      next[k] = readEvents(k);
    });
    queueMicrotask(() => setEvents(next));
  }, [keys]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <main className="container-max pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="modern-card p-8">
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
              VANHSYA Logo System
            </h1>
            <p className="text-gray-700 leading-relaxed">
              This page is an in-app style guide for logo usage, spacing, and motion behavior. Use it to ensure the
              brand identity remains consistent across pages and breakpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="modern-card p-8 bg-slate-950 text-white">
              <div className="text-sm font-heading tracking-[0.22em] uppercase text-white/70 mb-6">Stacked</div>
              <BrandLogo href="" lockup="stacked" chrome="full" enableParallax={false} enableReveal={false} priority />
              <div className="mt-6 text-sm text-white/70">
                Primary lockup for hero, splash, and premium sections.
              </div>
            </div>

            <div className="modern-card p-8 bg-slate-950 text-white">
              <div className="text-sm font-heading tracking-[0.22em] uppercase text-white/70 mb-6">Horizontal</div>
              <BrandLogo
                href=""
                lockup="horizontal"
                chrome="full"
                enableParallax={false}
                enableReveal={false}
                showDescriptor={false}
              />
              <div className="mt-6 text-sm text-white/70">
                Use when space is wide but vertical height is constrained.
              </div>
            </div>

            <div className="modern-card p-8 bg-slate-950 text-white">
              <div className="text-sm font-heading tracking-[0.22em] uppercase text-white/70 mb-6">Icon Only</div>
              <BrandLogo
                href=""
                lockup="icon"
                chrome="none"
                emblemSize={44}
                enableParallax={false}
                enableReveal={false}
                showDescriptor={false}
              />
              <div className="mt-6 text-sm text-white/70">
                Use for navigation, favicon-like placements, and small UI surfaces.
              </div>
            </div>
          </div>

          <div className="modern-card p-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Spacing & Accessibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <div className="font-semibold text-gray-900 mb-2">Clear space</div>
                <div>
                  Maintain at least 0.5× emblem size as padding around the logo. Never allow text or UI elements to
                  intersect the emblem silhouette.
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">Alt text</div>
                <div>
                  Always use meaningful alt text (for example “VANHSYA logo”). For purely decorative usage, keep the
                  logo aria-hidden and provide a labeled container.
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">Contrast</div>
                <div>
                  Keep adjacent text at WCAG 2.1 AA contrast. For dark hero backgrounds, prefer the gold gradient
                  wordmark. For light backgrounds, use the standard navigation logo.
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">Reduced motion</div>
                <div>
                  Motion effects automatically reduce when the user prefers reduced motion.
                </div>
              </div>
            </div>
          </div>

          <div className="modern-card p-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Animation Specification</h2>
            <div className="text-gray-700 space-y-3 leading-relaxed">
              <div>
                Reveal: opacity + blur fade-in when the logo enters viewport.
              </div>
              <div>
                Hover: subtle rotate and scale with spring easing.
              </div>
              <div>
                Parallax (hero only): small upward drift tied to scroll position.
              </div>
              <div>
                Preloader: logo shows once per session with a short progress shimmer.
              </div>
            </div>
          </div>

          <div className="modern-card p-8">
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">A/B Experiment Telemetry</h2>
            <p className="text-gray-700 mb-6">
              Basic client-side counters are stored in localStorage for quick evaluation during development.
              You can force a variant using <span className="font-mono text-sm">?logoVariant=A</span> or <span className="font-mono text-sm">?logoVariant=B</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {keys.map(k => (
                <div key={k} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="font-semibold text-gray-900 mb-3">{k}</div>
                  <pre className="text-xs bg-gray-50 rounded-lg p-3 overflow-auto">
                    {JSON.stringify(events[k] ?? {}, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
