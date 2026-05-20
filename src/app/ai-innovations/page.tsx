'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  FileText,
  Users, 
  Gift, 
  Star, 
  Download, 
  Brain, 
  Zap, 
  Award, 
  ChevronRight,
  Check,
  Crown,
  Trophy,
  Sparkles
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface CVTemplate {
  id: string;
  name: string;
  preview: string;
  category: string;
  features: string[];
  premium: boolean;
}

const cvTemplates: CVTemplate[] = [
  {
    id: 'modern-tech',
    name: 'Modern Tech Professional',
    preview: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&q=80&w=1200',
    category: 'Technology',
    features: ['ATS Optimized', 'Skills Section', 'Project Portfolio', 'Clean Design'],
    premium: false
  },
  {
    id: 'executive-luxury',
    name: 'Executive Luxury',
    preview: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
    category: 'Leadership',
    features: ['Premium Design', 'Achievement Focus', 'Leadership Emphasis', 'Professional Layout'],
    premium: true
  },
  {
    id: 'healthcare-specialist',
    name: 'Healthcare Specialist',
    preview: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1200',
    category: 'Healthcare',
    features: ['Medical Focus', 'Certification Highlight', 'Experience Timeline', 'Clean Medical Format'],
    premium: false
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    preview: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    category: 'Creative',
    features: ['Portfolio Integration', 'Visual Appeal', 'Creative Layout', 'Brand Showcase'],
    premium: true
  }
];

export default function AIInnovations() {
  const [activeTab, setActiveTab] = useState('cv-maker');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState('');
  const [luckyDrawEntry, setLuckyDrawEntry] = useState('');
  const [luckyDrawState, setLuckyDrawState] = useState<{ status: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: ''
  });

  const handleGenerateReferralCode = () => {
    const code = `VANHSYA${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setReferralCode(code);
  };

  const monthKey = (d: Date) => {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  };

  const drawWindow = (now: Date) => {
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth();
    const start = new Date(Date.UTC(y, m, 1, 0, 0, 0));
    const nextStart = new Date(Date.UTC(y, m + 1, 1, 0, 0, 0));
    const end = new Date(nextStart.getTime() - 1);
    const announce = nextStart;
    return { start, end, announce, month: monthKey(now) };
  };

  const handleLuckyDrawEntry = async () => {
    const email = luckyDrawEntry.trim();
    if (!email) {
      setLuckyDrawState({ status: 'error', message: 'Please enter your email.' });
      return;
    }

    setLuckyDrawState({ status: 'loading', message: '' });
    try {
      const res = await fetch('/api/lucky-draw/enter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, source: 'ai_innovations_lucky_draw' })
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; alreadyEntered?: boolean; month?: string }
        | { error?: string }
        | null;

      if (!res.ok) {
        setLuckyDrawState({ status: 'error', message: (json as any)?.error || 'Submission failed. Please try again.' });
        return;
      }

      const alreadyEntered = Boolean((json as any)?.alreadyEntered);
      const month = typeof (json as any)?.month === 'string' ? String((json as any).month) : drawWindow(new Date()).month;
      setLuckyDrawState({
        status: 'success',
        message: alreadyEntered ? `You're already entered for ${month}.` : `Entry received for ${month}. Winners are announced monthly.`
      });
      setLuckyDrawEntry('');
    } catch {
      setLuckyDrawState({ status: 'error', message: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="section-padding pt-32 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="heading-xl text-gray-800 mb-6">
              AI-Powered <span className="text-gradient-purple">Innovations</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of migration services with our cutting-edge AI tools, 
              CV builder, referral rewards, and exciting lucky draw system.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'cv-maker', label: 'AI CV Maker', icon: FileText },
              { id: 'referral', label: 'Referral System', icon: Users },
              { id: 'lucky-draw', label: 'Lucky Draw', icon: Gift },
              { id: 'ai-tools', label: 'AI Tools', icon: Brain }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CV Maker Section */}
      {activeTab === 'cv-maker' && (
        <section className="section-padding bg-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                AI-Powered CV Builder
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Create professional CVs optimized for international job markets and visa applications
              </p>
            </motion.div>

            {/* CV Templates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {cvTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`modern-card cursor-pointer group transition-all duration-300 ${
                    selectedTemplate === template.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="relative">
                    <div className="relative aspect-[3/4] rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={template.preview}
                        alt={`${template.name} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover"
                        priority={index < 4}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                    </div>
                    {template.premium && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Premium
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">{template.name}</h3>
                  <p className="text-sm text-purple-600 mb-3">{template.category}</p>
                  
                  <div className="space-y-1 mb-4">
                    {template.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs text-gray-600">
                        <Check className="w-3 h-3 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full btn-primary text-sm group-hover:bg-purple-700">
                    Use Template
                  </button>
                </motion.div>
              ))}
            </div>

            {/* CV Builder Features */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">AI Content Generation</h3>
                <p className="text-gray-600 text-sm">Smart suggestions for skills, experiences, and achievements based on your industry</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">ATS Optimization</h3>
                <p className="text-gray-600 text-sm">Automatic keyword optimization to pass through applicant tracking systems</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Multiple Formats</h3>
                <p className="text-gray-600 text-sm">Download in PDF, Word, or share via unique link for easy application submission</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Referral System Section */}
      {activeTab === 'referral' && (
        <section className="section-padding bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Referral Rewards Program
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Earn rewards by referring friends and family to VANHSYA's migration services
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Generate Your Code</h4>
                      <p className="text-gray-600">Get your unique referral code and start sharing with friends</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Friends Apply</h4>
                      <p className="text-gray-600">Your referrals use your code when signing up for our services</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Earn Rewards</h4>
                      <p className="text-gray-600">Get cash rewards, service discounts, and exclusive benefits</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modern-card bg-white">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Generate Your Referral Code</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Referral Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={referralCode}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="Click generate to get your code"
                      />
                      <button
                        onClick={handleGenerateReferralCode}
                        className="btn-primary"
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                  
                  {referralCode && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Share Your Code</h4>
                      <p className="text-green-700 text-sm mb-3">
                        Share this code with friends and earn rewards when they use our services!
                      </p>
                      <div className="flex gap-2">
                        <button className="btn-secondary text-sm">Copy Code</button>
                        <button className="btn-secondary text-sm">Share via WhatsApp</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Reward Structure</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consultation Referral</span>
                      <span className="font-semibold text-green-600">$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Package Referral</span>
                      <span className="font-semibold text-green-600">$200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Premium Service Referral</span>
                      <span className="font-semibold text-green-600">$500</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lucky Draw Section */}
      {activeTab === 'lucky-draw' && (
        <section className="section-padding bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                <Sparkles className="inline w-8 h-8 text-yellow-500 mr-2" />
                Monthly Lucky Draw
                <Sparkles className="inline w-8 h-8 text-yellow-500 ml-2" />
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Enter our monthly draw for a chance to win free consultations, service packages, and exciting prizes!
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">This Month's Prizes</h3>
                <div className="space-y-4">
                  <div className="modern-card bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-8 h-8" />
                      <div>
                        <h4 className="font-bold text-lg">Grand Prize</h4>
                        <p>Complete Migration Package (Worth $5,000)</p>
                      </div>
                    </div>
                  </div>
                  <div className="modern-card bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6" />
                      <div>
                        <h4 className="font-semibold">Second Prize</h4>
                        <p>Free Consultation + CV Builder Premium (Worth $500)</p>
                      </div>
                    </div>
                  </div>
                  <div className="modern-card bg-gradient-to-r from-green-400 to-blue-500 text-white">
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6" />
                      <div>
                        <h4 className="font-semibold">Third Prize</h4>
                        <p>AI Tools Premium Access (Worth $200)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white rounded-xl border-2 border-dashed border-yellow-300">
                  <h4 className="font-semibold text-gray-800 mb-2">How to Enter</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Sign up for our newsletter</li>
                    <li>• Follow us on social media</li>
                    <li>• Refer a friend using your referral code</li>
                    <li>• Use any of our AI tools</li>
                    <li>• Book a consultation</li>
                  </ul>
                </div>
              </div>

              <div className="modern-card bg-white">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Enter Lucky Draw</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="lucky_draw_email" className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                    <input
                      id="lucky_draw_email"
                      type="email"
                      value={luckyDrawEntry}
                      onChange={(e) => setLuckyDrawEntry(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Enter your email to participate"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleLuckyDrawEntry}
                    disabled={luckyDrawState.status === 'loading'}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
                  >
                    <Gift className="inline w-5 h-5 mr-2" />
                    {luckyDrawState.status === 'loading' ? 'Submitting…' : 'Enter Draw'}
                  </button>
                </div>

                {luckyDrawState.status !== 'idle' && (
                  <div
                    className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                      luckyDrawState.status === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : luckyDrawState.status === 'error'
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : 'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}
                    role={luckyDrawState.status === 'error' ? 'alert' : 'status'}
                  >
                    {luckyDrawState.message}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Draw Schedule</h4>
                  <div className="space-y-2 text-sm">
                    {(() => {
                      const win = drawWindow(new Date());
                      const fmt = (d: Date) =>
                        d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
                      return (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Current Draw Ends</span>
                            <span className="font-semibold">{fmt(win.end)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Winner Announcement</span>
                            <span className="font-semibold">{fmt(win.announce)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Next Draw Starts</span>
                            <span className="font-semibold">{fmt(win.announce)}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  *Terms and conditions apply. Winners will be contacted via email.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AI Tools Overview */}
      {activeTab === 'ai-tools' && (
        <section className="section-padding bg-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Complete AI Tool Suite
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Access our full range of AI-powered tools for a seamless migration experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(
                [
                {
                  name: 'EligibilityBot',
                  description: 'AI-powered visa eligibility assessment',
                  icon: Brain,
                  style: { bg: 'bg-blue-100', hoverBg: 'group-hover:bg-blue-200', text: 'text-blue-600' },
                  link: '/ai-tools/eligibility'
                },
                {
                  name: 'Document Wizard',
                  description: 'Intelligent document checklist generator',
                  icon: FileText,
                  style: { bg: 'bg-green-100', hoverBg: 'group-hover:bg-green-200', text: 'text-green-600' },
                  link: '/ai-tools/document-wizard'
                },
                {
                  name: 'Scam Detector',
                  description: 'AI fraud protection and verification',
                  icon: Award,
                  style: { bg: 'bg-red-100', hoverBg: 'group-hover:bg-red-200', text: 'text-red-600' },
                  link: '/ai-tools/scam-detector'
                },
                {
                  name: 'Checklist Assistant',
                  description: 'Smart task management for your journey',
                  icon: Check,
                  style: { bg: 'bg-purple-100', hoverBg: 'group-hover:bg-purple-200', text: 'text-purple-600' },
                  link: '/ai-tools/checklist-assistant'
                }
              ] as const
              ).map((tool, index) => (
                <motion.a
                  key={tool.name}
                  href={tool.link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="modern-card group hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${tool.style.bg} rounded-xl flex items-center justify-center mb-4 ${tool.style.hoverBg}`}>
                    <tool.icon className={`w-6 h-6 ${tool.style.text}`} />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-700">
                    Try Now <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
