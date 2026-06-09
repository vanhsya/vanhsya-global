"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { FiChevronDown, FiCreditCard, FiMenu, FiX } from 'react-icons/fi';
import strings from '@/lib/strings';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavigationProps {
  className?: string;
  variant?: 'default' | 'neo';
}

export default function NavigationPremium({ className = '', variant = 'default' }: NavigationProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const explorePanelId = 'vanhsya-nav-explore-panel';
  const mobilePanelId = 'vanhsya-nav-mobile-panel';
  const exploreRef = useRef<HTMLDivElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setIsMobileOpen(false);
      setIsExploreOpen(false);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const update = () => {
      const next = window.scrollY > 50;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      if (scrollRafRef.current) return;
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        setScrolled(scrolledRef.current);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      if (scrollRafRef.current) window.cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isExploreOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (exploreRef.current && exploreRef.current.contains(target)) return;
      setIsExploreOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isExploreOpen]);

  useEffect(() => {
    if (!isExploreOpen && !isMobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsExploreOpen(false);
      setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isExploreOpen, isMobileOpen]);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w >= 1024 && isMobileOpen) setIsMobileOpen(false);
      if (w < 1024 && isExploreOpen) setIsExploreOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true } as any);
    return () => window.removeEventListener('resize', onResize as any);
  }, [isExploreOpen, isMobileOpen]);

  const migrationServices: DropdownItem[] = [
    { label: 'Study Visa', href: '/services/study-visa', description: 'Student visas & education guidance' },
    { label: 'Work Visa', href: '/services/work-visa', description: 'Employment-based migration' },
    { label: 'Business Visa', href: '/services/business-visa', description: 'Investor & entrepreneur visas' },
    { label: 'Family Visa', href: '/services/family-visa', description: 'Family reunification programs' },
    { label: 'Permanent Residence', href: '/services/permanent-residence', description: 'PR pathways & citizenship' },
    { label: 'Tourist Visa', href: '/services/tourist-visa', description: 'Visitor & travel visas' }
  ];

  const countries: DropdownItem[] = [
    { label: 'Canada', href: '/countries/canada', description: 'Express Entry, PNP, LMIA' },
    { label: 'Australia', href: '/countries/australia', description: 'SkillSelect, 189, 190, 491' },
    { label: 'United Kingdom', href: '/countries/uk', description: 'Skilled Worker, Global Talent' },
    { label: 'United States', href: '/countries/usa', description: 'H1B, EB1, EB2, EB3' },
    { label: 'Germany', href: '/countries/germany', description: 'EU Blue Card, Job Seeker' },
    { label: 'New Zealand', href: '/countries/new-zealand', description: 'Skilled Migrant Category' },
    { label: 'Singapore', href: '/countries/singapore', description: 'Employment Pass, PR' },
    { label: 'UAE', href: '/countries/uae', description: 'Golden Visa, Work Permits' }
  ];

  const aiTools: DropdownItem[] = [
    { label: 'AI Tools Hub', href: '/ai-tools', description: 'All tools, progress, and simulations' },
    { label: 'IELTS Trainer AI', href: '/ai-tools/ielts-trainer', description: 'Writing scoring, speaking practice, study plan' },
    { label: 'Visa Interview Coach', href: '/ai-tools/visa-interview-coach', description: 'Mock interviews with feedback and cultural tips' },
    { label: 'Visa Rejection Analyzer', href: '/ai-tools/visa-rejection-analyzer', description: 'Refusal letter diagnosis and improvement plan' },
    { label: 'Immigration Simulations', href: '/ai-tools/immigration-simulations', description: 'Visa journey games: documents + interview scenarios' },
    { label: 'Document Verification', href: '/ai-tools/document-verification', description: 'Country/pathway packs and readiness checks' },
    { label: 'Timeline Optimizer', href: '/ai-tools/timeline-optimizer', description: 'Milestone plan with buffers and risk flags' },
    { label: 'Success Predictor', href: '/ai-tools/success-predictor', description: 'Risk band and success estimate from profile signals' },
    { label: 'Progress Dashboard', href: '/ai-tools/dashboard', description: 'Track sessions and record outcomes locally' },
    { label: 'Eligibility Checker', href: '/ai-tools/eligibility', description: 'AI-powered visa assessment' },
    { label: 'Scam Detector', href: '/ai-tools/scam-detector', description: '200+ fraud pattern detection' },
    { label: 'SOP Generator', href: '/ai-tools/sop-generator', description: 'AI statement of purpose writer' },
    { label: 'CV Builder', href: '/ai-tools/cv-builder', description: 'Migration-optimized resume' },
    { label: 'Embassy Alerts', href: '/ai-tools/embassy-alerts', description: 'Real-time visa updates' },
    { label: 'Visa Timeline Predictor', href: '/ai-tools/visa-timeline-predictor', description: 'Risk-aware approval window forecasting' },
    { label: 'Entry Requirements Radar', href: '/ai-tools/entry-requirements-radar', description: 'Border-ready pack generator' },
    { label: 'Travel Itinerary AI', href: '/ai-tools/travel-itinerary-ai', description: 'Visa-smart tourism itineraries' }
  ];
  const exposeItems: DropdownItem[] = [
    { label: 'Expose Overview', href: '/expose', description: 'Transparency platform and action plan' },
    { label: 'Victim Stories', href: '/expose/victim-stories', description: 'Submit and track scam cases' },
    { label: 'Industry Watch', href: '/expose/industry-watch', description: 'Fraud patterns and verification signals' },
    { label: 'YouTube Interviews', href: '/expose/interviews', description: 'Interviews and safety explainers' },
    { label: 'Scammer Profiles', href: '/expose/scammers', description: 'Profiles and checklists' }
  ];
  const companyItems: DropdownItem[] = [
    { label: 'Transparency', href: '/expose', description: 'Real cases, fraud protection, help desk' },
    { label: 'Victim Stories', href: '/expose/victim-stories', description: 'Submit and track scam cases' },
    { label: 'Industry Watch', href: '/expose/industry-watch', description: 'Fraud patterns and verification signals' },
    { label: 'YouTube Interviews', href: '/expose/interviews', description: 'Client interviews and safety explainers' },
    { label: 'Scammer Profiles', href: '/expose/scammers', description: 'Profiles and checklists' },
    { label: 'Success Stories', href: '/success-stories', description: 'Verified global testimonials' },
    { label: 'Referral Program', href: '/referral-program', description: 'Earn with VANHSYA' },
    { label: 'Ecosystem', href: '/blog', description: 'Community hub, stories, Q&A, videos' },
    { label: 'VANHSYA Vision', href: '/next-era', description: 'The next era: AI, systems, and experiences' },
    { label: 'AI Innovations', href: '/ai-innovations', description: 'Product and research direction' },
    { label: 'Resources', href: '/resources', description: 'Guides, toolkits, and frameworks' },
    { label: 'Investors', href: '/investors', description: 'IR materials and contact' },
    { label: 'Careers', href: '/contact', description: 'Join the team and build the future' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const exploreSections = [
    { title: 'Services', items: migrationServices },
    { title: 'Countries', items: countries },
    { title: 'AI Tools', items: aiTools },
    { title: 'Expose', items: exposeItems },
  ];

  const secondarySections = [
    {
      title: 'Company',
      items: [
        { label: 'Why VANHSYA?', href: '/why-vanhsya', description: 'What sets the platform apart' },
        { label: 'VANHSYA Vision', href: '/next-era', description: 'The next era: AI, systems, and experiences' },
        { label: 'Success Stories', href: '/success-stories', description: 'Verified global testimonials' },
        { label: 'Resources', href: '/resources', description: 'Guides, toolkits, and frameworks' },
        { label: 'Investors', href: '/investors', description: 'IR materials and contact' },
        { label: 'Contact', href: '/contact', description: 'Support, careers, and partnerships' },
      ],
    },
  ];

  const topOffset = variant === 'neo' ? 'top-10' : 'top-0';
  const shell = variant === 'neo' ? `nav-island rounded-3xl ${scrolled ? 'px-4' : 'px-6'}` : '';

  const height = variant === 'neo' ? (scrolled ? 'h-14' : 'h-16') : 'h-20';
  const paddingY = variant === 'neo' ? (scrolled ? 'py-2' : 'py-4') : '';

  const navMotion = reduceMotion
    ? { initial: false, animate: false, transition: undefined as unknown }
    : { initial: { y: -40, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.45 } };

  const panelMotion = reduceMotion
    ? { initial: false, animate: false, exit: false, transition: undefined as unknown }
    : { initial: { opacity: 0, y: 10, scale: 0.99 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 10, scale: 0.99 }, transition: { duration: 0.18 } };

  const overlayMotion = reduceMotion
    ? { initial: false, animate: false, exit: false, transition: undefined as unknown }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.16 } };

  const trapMobileFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const root = mobilePanelRef.current;
    if (!root) return;
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (!active || active === first) {
        event.preventDefault();
        last.focus();
      }
      return;
    }

    if (active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.nav
      className={`fixed ${topOffset} left-0 right-0 z-50 ${
        variant === 'neo' ? 'bg-transparent' : 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10'
      } ${className}`}
      {...(navMotion as any)}
    >
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-black focus:px-4 focus:py-3 focus:text-white focus:shadow-lux focus-visible:ring-2 focus-visible:ring-amber-400/50"
      >
        Skip to content
      </Link>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${paddingY} transition-[padding] duration-300`}>
        <div className={`${shell} transition-[padding] duration-300`}>
          <div className={`flex items-center ${height} transition-[height] duration-300`}>
            <div className="shrink-0">
              <Link href="/" aria-label="VANHSYA Home" className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <BrandLogo
                      href=""
                      lockup="icon"
                      emblemSize={28}
                      chrome="none"
                      showDescriptor={false}
                      priority
                      enableParallax={false}
                      enableReveal={false}
                      experimentKey="logoNav.v1"
                      forcedVariant="B"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center leading-none">
                  <div className="text-[18px] font-black tracking-[0.12em] text-white leading-none">VANHSYA</div>
                  <div className="mt-1 text-[11px] text-white/55 tracking-[0.14em] leading-none">GLOBAL MIGRATION</div>
                </div>
              </Link>
            </div>

            <div className="ml-auto hidden lg:flex items-center gap-3">
              <div ref={exploreRef} className="relative">
                <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setIsExploreOpen((v) => !v)}
                    className="h-10 px-4 rounded-2xl inline-flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                  >
                    {strings.nav.explore}
                    <FiChevronDown className={`w-4 h-4 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                  </button>

                <AnimatePresence>
                  {isExploreOpen && (
                    <motion.div
                      id={explorePanelId}
                      className="absolute left-0 mt-3 w-[min(1040px,calc(100vw-2rem))] rounded-3xl border border-white/12 bg-slate-950/92 backdrop-blur-2xl shadow-lux overflow-hidden"
                      {...(panelMotion as any)}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {exploreSections.map((section) => (
                            <div key={section.title} className="min-w-0">
                              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/55">
                                {section.title}
                              </div>
                              <div className="mt-3 space-y-1">
                                {section.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsExploreOpen(false)}
                                    className={`block rounded-2xl px-3 py-2 transition-colors border ${
                                      isActive(item.href)
                                        ? 'bg-amber-400/10 border-amber-400/20 text-amber-200'
                                        : 'bg-white/[0.02] border-transparent text-white hover:bg-white/[0.06]'
                                    }`}
                                  >
                                    <div className="text-sm font-extrabold">{item.label}</div>
                                    {item.description ? (
                                      <div className="mt-1 text-xs text-white/60 leading-snug">{item.description}</div>
                                    ) : null}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {secondarySections.map((section) => (
                            <div key={section.title} className="min-w-0 lg:col-span-2">
                              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/55">
                                {section.title}
                              </div>
                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {section.items.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsExploreOpen(false)}
                                    className={`rounded-2xl px-3 py-2 transition-colors border ${
                                      isActive(item.href)
                                        ? 'bg-amber-400/10 border-amber-400/20 text-amber-200'
                                        : 'bg-white/[0.02] border-transparent text-white hover:bg-white/[0.06]'
                                    }`}
                                  >
                                    <div className="text-sm font-extrabold">{item.label}</div>
                                    {item.description ? (
                                      <div className="mt-1 text-xs text-white/60 leading-snug">{item.description}</div>
                                    ) : null}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                          <div className="lg:col-span-2 flex items-stretch">
                            <div className="w-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-amber-400/[0.06] p-5">
                              <div className="flex items-center gap-2 text-white font-black">
                                <FiCreditCard className="w-5 h-5 text-amber-200" />
                                VANHSYA Card
                              </div>
                              <div className="mt-2 text-sm text-white/65 leading-relaxed">
                                Preview tiers, limits, and concierge depth. Experience the immersive 3D gallery for a true product feel.
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Link
                                  href="/card"
                                  onClick={() => setIsExploreOpen(false)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-extrabold transition-colors"
                                >
                                  {strings.actions.viewTiers}
                                </Link>
                                <Link
                                  href="/card/immersive"
                                  onClick={() => setIsExploreOpen(false)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-400/15 hover:bg-amber-400/20 border border-amber-400/25 text-amber-100 font-extrabold transition-colors"
                                >
                                  {strings.actions.immersive3D}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/card"
                className="h-10 px-4 rounded-2xl inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
              >
                <FiCreditCard className="w-4 h-4 text-amber-200" />
                Card
              </Link>

              <Link
                href="/concierge"
                className="h-10 px-4 rounded-2xl inline-flex items-center bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
              >
                Concierge
              </Link>

              <Link
                href="/consultation"
                className="cta-shimmer h-10 px-5 rounded-2xl inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-colors shadow-lg shadow-purple-500/25 border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
              >
                <span className="font-extrabold">Get Started</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden ml-auto h-10 w-10 rounded-2xl inline-flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
            >
              {isMobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div className="lg:hidden fixed inset-0 z-[60]" {...(overlayMotion as any)} role="dialog" aria-modal="true" aria-label="Menu">
            <button type="button" className="absolute inset-0 bg-black/75" onClick={() => setIsMobileOpen(false)} aria-label="Close menu" />
            <motion.div
              id={mobilePanelId}
              ref={mobilePanelRef}
              onKeyDown={trapMobileFocus}
              className="absolute right-0 top-0 h-full w-[min(420px,94vw)] bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 shadow-lux overflow-y-auto"
              {...(panelMotion as any)}
            >
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="text-white font-black tracking-[0.18em] text-sm">MENU</div>
                  <button
                    type="button"
                    onClick={() => setIsMobileOpen(false)}
                    className="h-10 w-10 rounded-2xl inline-flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
                    aria-label="Close"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/"
                    onClick={() => setIsMobileOpen(false)}
                    className={`block rounded-2xl px-4 py-3 border transition-colors ${
                      isActive('/') ? 'bg-amber-400/10 border-amber-400/20 text-amber-200' : 'bg-white/[0.02] border-white/10 text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="font-extrabold">Home</div>
                    <div className="mt-1 text-xs text-white/60">Overview and key experiences</div>
                  </Link>

                  <Link
                    href="/consultation"
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-2xl px-4 py-3 border border-white/10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                  >
                    <div className="font-extrabold">Get Started</div>
                    <div className="mt-1 text-xs text-white/80">Book a consultation and begin your journey</div>
                  </Link>

                  <Link
                    href="/concierge"
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-2xl px-4 py-3 border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <div className="font-extrabold">Concierge</div>
                    <div className="mt-1 text-xs text-white/60">Chat-first guidance and step-by-step flows</div>
                  </Link>

                  <Link
                    href="/card"
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-2xl px-4 py-3 border border-amber-400/20 bg-amber-400/10 text-amber-100"
                  >
                    <div className="font-extrabold">VANHSYA Card</div>
                    <div className="mt-1 text-xs text-amber-100/75">Tier preview and immersive 3D experience</div>
                  </Link>
                </div>

                <div className="mt-8 space-y-6">
                  {[...exploreSections, ...secondarySections].map((section) => (
                    <div key={section.title}>
                      <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white/55">{section.title}</div>
                      <div className="mt-3 space-y-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`block rounded-2xl px-4 py-3 border transition-colors ${
                              isActive(item.href)
                                ? 'bg-amber-400/10 border-amber-400/20 text-amber-200'
                                : 'bg-white/[0.02] border-white/10 text-white hover:bg-white/[0.06]'
                            }`}
                          >
                            <div className="font-extrabold">{item.label}</div>
                            {item.description ? <div className="mt-1 text-xs text-white/60">{item.description}</div> : null}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
