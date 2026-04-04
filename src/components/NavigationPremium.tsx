"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { 
  FiChevronDown, 
  FiLogIn,
  FiMenu,
  FiX,
  FiZap,
  FiCreditCard,
  FiShield
} from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavigationProps {
  className?: string;
  variant?: 'default' | 'neo';
}

type DropdownMenuProps = {
  items: DropdownItem[];
  isOpen: boolean;
  onSelect: () => void;
};

function DropdownMenu({ items, isOpen, onSelect }: DropdownMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="p-2">
            {items.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="flex flex-col p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                  onClick={onSelect}
                >
                  <span className="text-white font-medium group-hover:text-indigo-300 transition-colors">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors">
                      {item.description}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function NavigationPremium({ className = '', variant = 'default' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setIsMenuOpen(false);
      setActiveDropdown(null);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed ${variant === 'neo' ? 'top-10' : 'top-0'} left-0 right-0 z-50 ${
        variant === 'neo'
          ? 'bg-transparent'
          : 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10'
      } ${className}`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${variant === 'neo' ? (scrolled ? 'py-2' : 'py-4') : ''}`}>
        <div
          className={`${
            variant === 'neo'
              ? `nav-island rounded-3xl ${scrolled ? 'px-4' : 'px-6'}`
              : ''
          }`}
        >
          <div className={`flex items-center justify-between ${variant === 'neo' ? (scrolled ? 'h-14' : 'h-16') : 'h-20'}`}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
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
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  VANHSYA
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Global Migration</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors font-medium nav-link-liquid ${isActive('/') ? 'text-amber-200' : 'text-white hover:text-indigo-200'}`}
            >
              Home
            </Link>

            {/* Migration Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                className={`flex items-center space-x-1 transition-colors font-medium nav-link-liquid ${
                  isActive('/services') ? 'text-amber-200' : 'text-white hover:text-indigo-200'
                }`}
              >
                <span>Migration Services</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              <DropdownMenu
                items={migrationServices}
                isOpen={activeDropdown === 'services'}
                onSelect={() => setActiveDropdown(null)}
              />
            </div>

            {/* Countries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('countries')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                className={`flex items-center space-x-1 transition-colors font-medium nav-link-liquid ${
                  isActive('/countries') ? 'text-amber-200' : 'text-white hover:text-indigo-200'
                }`}
              >
                <span>Countries</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              <DropdownMenu items={countries} isOpen={activeDropdown === 'countries'} onSelect={() => setActiveDropdown(null)} />
            </div>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                className={`flex items-center space-x-1 transition-colors font-medium nav-link-liquid ${
                  isActive('/about') || isActive('/blog') || isActive('/referral-program') || isActive('/success-stories') || isActive('/investors') || isActive('/resources') || isActive('/ai-innovations')
                    ? 'text-amber-200'
                    : 'text-white hover:text-indigo-200'
                }`}
              >
                <span>Company</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              <DropdownMenu items={companyItems} isOpen={activeDropdown === 'company'} onSelect={() => setActiveDropdown(null)} />
            </div>

            <Link 
              href="/why-vanhsya" 
              className={`transition-colors font-medium nav-link-liquid ${isActive('/why-vanhsya') ? 'text-amber-200' : 'text-white hover:text-indigo-200'}`}
            >
              Why VANHSYA?
            </Link>

            {/* Expose Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('expose')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                className={`flex items-center space-x-1 transition-colors font-medium nav-link-liquid ${
                  isActive('/expose') ? 'text-amber-200' : 'text-white hover:text-indigo-200'
                }`}
              >
                <span>Expose</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              <DropdownMenu items={exposeItems} isOpen={activeDropdown === 'expose'} onSelect={() => setActiveDropdown(null)} />
            </div>

            {/* AI Tools Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('ai-tools')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                className={`flex items-center space-x-1 transition-colors font-medium nav-link-liquid ${
                  isActive('/ai-tools') || isActive('/tools') ? 'text-amber-200' : 'text-white hover:text-indigo-200'
                }`}
              >
                <FaRobot className="w-4 h-4" />
                <span>AI Tools</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              <DropdownMenu items={aiTools} isOpen={activeDropdown === 'ai-tools'} onSelect={() => setActiveDropdown(null)} />
            </div>

            <Link 
              href="/card"
              className="relative text-amber-300 hover:text-amber-200 transition-colors font-extrabold flex items-center gap-2 group nav-link-liquid"
            >
              <FiCreditCard className="w-4 h-4" />
              <span>VANHSYA Card</span>
              <span className="text-[8px] bg-amber-400/20 px-1 rounded uppercase tracking-tighter">Preview</span>
              <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="absolute inset-0 rounded-md bg-gradient-to-r from-amber-300/10 via-amber-500/10 to-amber-300/10 blur-md" />
              </span>
            </Link>

            <Link
              href="/next-era"
              className={`transition-colors font-medium nav-link-liquid ${isActive('/next-era') ? 'text-amber-200' : 'text-white hover:text-indigo-200'}`}
            >
              Vanhsya Vision
            </Link>

            <Link
              href="/investors"
              className={`transition-colors font-medium nav-link-liquid ${isActive('/investors') ? 'text-amber-200' : 'text-white hover:text-indigo-200'}`}
            >
              Invest
            </Link>

            <Link 
              href="/contact" 
              className={`transition-colors font-medium nav-link-liquid ${isActive('/contact') ? 'text-amber-200' : 'text-white hover:text-indigo-200'}`}
            >
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/consultation"
                className="cta-shimmer flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-2xl text-white transition-all duration-300 shadow-lg shadow-purple-500/30 border border-white/10"
              >
                <span className="font-bold">Get Started</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden p-2 text-white hover:text-indigo-200 transition-colors"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className={`lg:hidden fixed ${variant === 'neo' ? 'top-24' : 'top-20'} left-0 right-0 bottom-0 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 overflow-y-auto`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-2">
                <Link 
                  href="/" 
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/services" 
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Migration Services
                </Link>
                <Link 
                  href="/countries" 
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Countries
                </Link>
                <Link 
                  href="/why-vanhsya" 
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Why VANHSYA?
                </Link>
                <Link 
                  href="/ai-tools" 
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI Tools
                </Link>
                <Link
                  href="/next-era"
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vanhsya Vision
                </Link>
                <Link
                  href="/investors"
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Invest
                </Link>
                <Link 
                  href="/blog" 
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ecosystem
                </Link>
                <Link 
                  href="/expose" 
                  className="block text-amber-300 hover:text-amber-200 transition-colors font-bold py-3 px-3 rounded-xl hover:bg-white/5 flex items-center justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Expose</span>
                  <span className="text-[10px] bg-amber-400/20 px-2 py-0.5 rounded-full uppercase tracking-tighter font-black">
                    Help
                  </span>
                </Link>
                <Link
                  href="/resources"
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Resources
                </Link>
                <Link 
                  href="/referral-program" 
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Referral Program
                </Link>
                <Link 
                  href="/card" 
                  className="block text-amber-400 hover:text-amber-300 transition-colors font-bold py-3 px-3 rounded-xl hover:bg-white/5 flex items-center justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>VANHSYA Card</span>
                  <span className="text-[10px] bg-amber-400/20 px-2 py-0.5 rounded-full uppercase tracking-tighter font-black">Coming Soon</span>
                </Link>
                <Link 
                  href="/success-stories" 
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Success Stories
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-white hover:text-indigo-300 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              
                <div className="flex flex-col space-y-3 pt-6 mt-4 border-t border-white/10">
                  <Link
                    href="/portal"
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">Get Started</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
