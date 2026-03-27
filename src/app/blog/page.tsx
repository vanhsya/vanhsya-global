'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Calendar,
  Clock,
  Crown,
  MessageSquare,
  Plane,
  Search,
  ShieldAlert,
  Sparkles,
  Star,
  User,
  Video
} from 'lucide-react';

type Membership = 'free' | 'pro' | 'vip';
type EcosystemTab = 'insights' | 'stories' | 'trips' | 'qa' | 'videos' | 'rewards' | 'expose';

type EcosystemProfile = {
  displayName: string;
  membership: Membership;
  joinedAt: number;
};

type EcosystemStory = {
  id: string;
  ts: number;
  title: string;
  destination: string;
  content: string;
  mediaUrl?: string;
  authorName: string;
  verified: boolean;
  pointsAwarded: number;
};

type TripRequestStatus = 'pending' | 'accepted' | 'declined';

type EcosystemTripRequest = {
  id: string;
  ts: number;
  requesterName: string;
  message: string;
  status: TripRequestStatus;
};

type EcosystemTrip = {
  id: string;
  ts: number;
  destination: string;
  fromDate: string;
  toDate: string;
  seats: number;
  notes: string;
  authorName: string;
  requests: EcosystemTripRequest[];
};

type EcosystemAnswer = {
  id: string;
  ts: number;
  body: string;
  authorName: string;
};

type EcosystemQuestion = {
  id: string;
  ts: number;
  title: string;
  body: string;
  tags: string[];
  authorName: string;
  answers: EcosystemAnswer[];
};

type EcosystemVideo = {
  id: string;
  ts: number;
  title: string;
  url: string;
  kind: 'travel' | 'work' | 'immigration';
  authorName: string;
};

type EcosystemState = {
  profile: EcosystemProfile;
  points: number;
  stories: EcosystemStory[];
  trips: EcosystemTrip[];
  questions: EcosystemQuestion[];
  videos: EcosystemVideo[];
};

const STORAGE_KEY = 'vanhsya_ecosystem_v1';

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to Canada Express Entry 2024",
    excerpt: "Everything you need to know about Canada's Express Entry system, including CRS score requirements, draw updates, and application tips.",
    author: "Immigration Expert",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Canada",
    tags: ["Express Entry", "Canada", "Immigration"],
    featured: true,
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Australia PR vs Canada PR: Which is Better?",
    excerpt: "Comprehensive comparison of permanent residency programs in Australia and Canada, including processing times, costs, and benefits.",
    author: "Migration Specialist",
    date: "2024-01-12",
    readTime: "12 min read",
    category: "Comparison",
    tags: ["Australia", "Canada", "PR"],
    featured: true,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Top 10 In-Demand Jobs for Immigration in 2024",
    excerpt: "Discover the most sought-after professions that can fast-track your immigration process to popular destinations.",
    author: "Career Advisor",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Career",
    tags: ["Jobs", "Skills", "Immigration"],
    featured: false,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Student Visa Success Stories: Real Experiences",
    excerpt: "Inspiring stories from students who successfully obtained visas and are now studying in their dream countries.",
    author: "Student Counselor",
    date: "2024-01-08",
    readTime: "10 min read",
    category: "Success Stories",
    tags: ["Student Visa", "Success", "Education"],
    featured: false,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "German EU Blue Card: Complete Application Guide",
    excerpt: "Step-by-step guide to applying for Germany's EU Blue Card, including eligibility requirements and processing timeline.",
    author: "Europe Specialist",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Germany",
    tags: ["Germany", "EU Blue Card", "Work Visa"],
    featured: false,
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Common Immigration Mistakes to Avoid",
    excerpt: "Learn about the most common mistakes applicants make during the immigration process and how to avoid them.",
    author: "Legal Advisor",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Tips",
    tags: ["Mistakes", "Tips", "Application"],
    featured: false,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
  }
];

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

let fallbackIdCounter = 0;

function createId(prefix: string) {
  const uuid = globalThis.crypto?.randomUUID?.();
  if (uuid) return `${prefix}_${uuid}`;
  fallbackIdCounter += 1;
  return `${prefix}_${fallbackIdCounter.toString(36)}`;
}

function extractYouTubeId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '') || null;
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v') || null;
    return null;
  } catch {
    return null;
  }
}

function defaultState(): EcosystemState {
  return {
    profile: { displayName: 'Guest', membership: 'free', joinedAt: new Date().getTime() },
    points: 0,
    stories: [],
    trips: [],
    questions: [],
    videos: [],
  };
}

export default function BlogPage() {
  const [tab, setTab] = useState<EcosystemTab>('insights');
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<EcosystemState>(defaultState());
  const [searchTerm, setSearchTerm] = useState('');
  const [insightsCategory, setInsightsCategory] = useState<string>('All');

  const [profileNameDraft, setProfileNameDraft] = useState('');
  const [membershipDraft, setMembershipDraft] = useState<Membership>('free');

  const [storyTitle, setStoryTitle] = useState('');
  const [storyDestination, setStoryDestination] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [storyMediaUrl, setStoryMediaUrl] = useState('');

  const [tripDestination, setTripDestination] = useState('');
  const [tripFrom, setTripFrom] = useState('');
  const [tripTo, setTripTo] = useState('');
  const [tripSeats, setTripSeats] = useState(2);
  const [tripNotes, setTripNotes] = useState('');
  const [tripJoinMessageByTripId, setTripJoinMessageByTripId] = useState<Record<string, string>>({});

  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [questionTags, setQuestionTags] = useState('');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);
  const [answerDraftByQuestionId, setAnswerDraftByQuestionId] = useState<Record<string, string>>({});

  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoKind, setVideoKind] = useState<EcosystemVideo['kind']>('travel');

  const saveRef = useRef<number | null>(null);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setMounted(true);
      const parsed = safeParse<EcosystemState>(window.localStorage.getItem(STORAGE_KEY));
      const hydrated = parsed ?? defaultState();
      setState(hydrated);
      setProfileNameDraft(hydrated.profile.displayName);
      setMembershipDraft(hydrated.profile.membership);
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (saveRef.current) window.clearTimeout(saveRef.current);
    saveRef.current = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, 120);
    return () => {
      if (saveRef.current) window.clearTimeout(saveRef.current);
    };
  }, [mounted, state]);

  const categories = useMemo(() => {
    const all = new Set<string>(['All']);
    blogPosts.forEach(p => all.add(p.category));
    return Array.from(all);
  }, []);

  const filteredInsights = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = insightsCategory === 'All' || post.category === insightsCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [insightsCategory, searchTerm]);

  const featuredInsights = useMemo(() => blogPosts.filter(p => p.featured), []);

  const isPaidMember = state.profile.membership === 'pro' || state.profile.membership === 'vip';
  const pointsTier = state.points >= 1000 ? 'Legend' : state.points >= 400 ? 'Pro' : state.points >= 150 ? 'Rising' : 'New';

  const updateProfile = () => {
    const name = profileNameDraft.trim().slice(0, 32) || 'Guest';
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, displayName: name, membership: membershipDraft }
    }));
  };

  const awardPoints = (delta: number) => {
    setState(prev => ({ ...prev, points: Math.max(0, prev.points + delta) }));
  };

  const addStory = () => {
    const title = storyTitle.trim();
    const destination = storyDestination.trim();
    const content = storyContent.trim();
    const mediaUrl = storyMediaUrl.trim();
    if (!title || !destination || !content) return;

    const pointsAwarded = isPaidMember ? 90 : 60;
    const story: EcosystemStory = {
      id: createId('story'),
      ts: new Date().getTime(),
      title,
      destination,
      content,
      mediaUrl: mediaUrl || undefined,
      authorName: state.profile.displayName,
      verified: isPaidMember,
      pointsAwarded,
    };

    setState(prev => ({ ...prev, stories: [story, ...prev.stories] }));
    awardPoints(pointsAwarded);
    setStoryTitle('');
    setStoryDestination('');
    setStoryContent('');
    setStoryMediaUrl('');
  };

  const addTrip = () => {
    const destination = tripDestination.trim();
    if (!destination || !tripFrom || !tripTo) return;
    const trip: EcosystemTrip = {
      id: createId('trip'),
      ts: new Date().getTime(),
      destination,
      fromDate: tripFrom,
      toDate: tripTo,
      seats: Math.max(1, Math.min(12, Number(tripSeats) || 1)),
      notes: tripNotes.trim(),
      authorName: state.profile.displayName,
      requests: [],
    };
    setState(prev => ({ ...prev, trips: [trip, ...prev.trips] }));
    awardPoints(isPaidMember ? 40 : 20);
    setTripDestination('');
    setTripFrom('');
    setTripTo('');
    setTripSeats(2);
    setTripNotes('');
  };

  const requestJoinTrip = (tripId: string) => {
    const message = (tripJoinMessageByTripId[tripId] ?? '').trim();
    if (!message) return;
    const req: EcosystemTripRequest = {
      id: createId('req'),
      ts: new Date().getTime(),
      requesterName: state.profile.displayName,
      message,
      status: 'pending',
    };
    setState(prev => ({
      ...prev,
      trips: prev.trips.map(t => (t.id === tripId ? { ...t, requests: [req, ...t.requests] } : t)),
    }));
    setTripJoinMessageByTripId(prev => ({ ...prev, [tripId]: '' }));
    awardPoints(8);
  };

  const updateTripRequestStatus = (tripId: string, reqId: string, status: TripRequestStatus) => {
    setState(prev => ({
      ...prev,
      trips: prev.trips.map(t => {
        if (t.id !== tripId) return t;
        return { ...t, requests: t.requests.map(r => (r.id === reqId ? { ...r, status } : r)) };
      }),
    }));
  };

  const addQuestion = () => {
    const title = questionTitle.trim();
    const body = questionBody.trim();
    if (!title || !body) return;
    const tags = questionTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .slice(0, 5);

    const q: EcosystemQuestion = {
      id: createId('q'),
      ts: new Date().getTime(),
      title,
      body,
      tags,
      authorName: state.profile.displayName,
      answers: [],
    };
    setState(prev => ({ ...prev, questions: [q, ...prev.questions] }));
    awardPoints(12);
    setQuestionTitle('');
    setQuestionBody('');
    setQuestionTags('');
  };

  const addAnswer = (questionId: string) => {
    const body = (answerDraftByQuestionId[questionId] ?? '').trim();
    if (!body) return;
    const ans: EcosystemAnswer = { id: createId('a'), ts: new Date().getTime(), body, authorName: state.profile.displayName };
    setState(prev => ({
      ...prev,
      questions: prev.questions.map(q => (q.id === questionId ? { ...q, answers: [...q.answers, ans] } : q)),
    }));
    setAnswerDraftByQuestionId(prev => ({ ...prev, [questionId]: '' }));
    awardPoints(isPaidMember ? 18 : 15);
  };

  const addVideo = () => {
    const title = videoTitle.trim();
    const url = videoUrl.trim();
    if (!title || !url) return;
    const v: EcosystemVideo = {
      id: createId('v'),
      ts: new Date().getTime(),
      title,
      url,
      kind: videoKind,
      authorName: state.profile.displayName,
    };
    setState(prev => ({ ...prev, videos: [v, ...prev.videos] }));
    awardPoints(isPaidMember ? 45 : 30);
    setVideoTitle('');
    setVideoUrl('');
    setVideoKind('travel');
  };

  const tabs: Array<{ key: EcosystemTab; label: string; icon: ReactNode }> = [
    { key: 'insights', label: 'Insights', icon: <Sparkles className="h-4 w-4" /> },
    { key: 'stories', label: 'Stories', icon: <Star className="h-4 w-4" /> },
    { key: 'trips', label: 'Travel Together', icon: <Plane className="h-4 w-4" /> },
    { key: 'qa', label: 'Ask Doubts', icon: <MessageSquare className="h-4 w-4" /> },
    { key: 'videos', label: 'Video Drops', icon: <Video className="h-4 w-4" /> },
    { key: 'rewards', label: 'Rewards', icon: <Crown className="h-4 w-4" /> },
    { key: 'expose', label: 'Expose', icon: <ShieldAlert className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen text-white">
      <Navigation />

      <section className="pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.25em] text-purple-200/80">
                <Sparkles className="h-4 w-4" />
                VANHSYA Ecosystem
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                  Post stories. Travel together.
                </span>{' '}
                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-pink-200 bg-clip-text text-transparent">
                  Earn rewards.
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
                A community layer on top of VANHSYA—insights, verified success stories, travel buddy matching, Q&A, and video drops.
                Participate to earn points.
              </p>

              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search insights, topics, destinations…"
                    aria-label="Search ecosystem"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                  />
                </div>
                <button
                  type="button"
                  onClick={updateProfile}
                  className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-colors font-black shadow-lg shadow-purple-600/25"
                >
                  Save Profile
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <GlassCard className="p-6 border-white/10" hover={false}>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Your Profile</div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-200/80">
                    {pointsTier}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <label className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Display name</span>
                    <input
                      value={profileNameDraft}
                      onChange={(e) => setProfileNameDraft(e.target.value)}
                      aria-label="Display name"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Membership</span>
                    <select
                      value={membershipDraft}
                      onChange={(e) => setMembershipDraft(e.target.value as Membership)}
                      aria-label="Membership"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    >
                      <option value="free">Free</option>
                      <option value="pro">PRO (Paid Clients)</option>
                      <option value="vip">VIP (Paid Clients)</option>
                    </select>
                  </label>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Points</div>
                  <div className="text-lg font-black text-white">{state.points.toLocaleString()}</div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Paid Client Lounge</div>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  PRO/VIP members get verified badges, higher rewards, and priority “connect” threads for travel and work planning.
                </p>
                <div className="mt-4 flex gap-3">
                  <Link
                    href="/portal"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 transition-colors font-black"
                  >
                    Client Portal <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/consultation"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 transition-colors font-black hover:from-amber-500 hover:to-amber-700"
                  >
                    Upgrade <Crown className="h-4 w-4" />
                  </Link>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {tabs.map(t => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border transition-colors text-sm font-black ${
                  tab === t.key
                    ? 'bg-purple-600 border-purple-400/40 text-white shadow-lg shadow-purple-600/20'
                    : 'bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.06]'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tab === 'insights' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black">Vanhsya Insights</h2>
                  <p className="mt-2 text-slate-400">Official guides, updates, and strategy posts.</p>
                </div>
                <div className="flex gap-3">
                  <select
                    value={insightsCategory}
                    onChange={(e) => setInsightsCategory(e.target.value)}
                    aria-label="Insights category"
                    className="bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredInsights.map((post) => (
                  <GlassCard key={post.id} className="p-6 border-white/10" hover>
                    <div className="aspect-video relative overflow-hidden rounded-2xl mb-6 border border-white/10">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="neo-badge neo-badge-popular">Featured</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-black text-white">{post.title}</h3>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed">{post.excerpt}</p>

                    <div className="mt-6">
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-purple-200 hover:text-white font-black transition-colors"
                      >
                        Read the guide <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </GlassCard>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInsights.map(post => (
                  <GlassCard key={post.id} className="p-6 border-white/10" hover>
                    <div className="aspect-video relative overflow-hidden rounded-2xl mb-4 border border-white/10">
                      <Image src={post.image} alt={post.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-black text-white">{post.title}</h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="mt-5">
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-purple-200 hover:text-white font-black transition-colors"
                      >
                        Open <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </GlassCard>
                ))}
              </div>

              {filteredInsights.length === 0 && (
                <GlassCard className="p-10 border-white/10 text-center" hover={false}>
                  <h3 className="text-2xl font-black text-white">No insights found</h3>
                  <p className="mt-3 text-slate-400">Try a different search or category.</p>
                </GlassCard>
              )}
            </div>
          )}

          {tab === 'stories' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <GlassCard className="p-6 border-white/10" hover={false}>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Post a success story</div>
                  <div className="mt-5 space-y-3">
                    <input
                      value={storyTitle}
                      onChange={(e) => setStoryTitle(e.target.value)}
                      aria-label="Story title"
                      placeholder="Title (e.g., UK Skilled Worker Approved)"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    />
                    <input
                      value={storyDestination}
                      onChange={(e) => setStoryDestination(e.target.value)}
                      aria-label="Destination"
                      placeholder="Destination (e.g., Canada, Germany, UAE)"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    />
                    <textarea
                      value={storyContent}
                      onChange={(e) => setStoryContent(e.target.value)}
                      aria-label="Story content"
                      placeholder="Write your experience. What changed your result? What should others avoid?"
                      rows={6}
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40 resize-none"
                    />
                    <input
                      value={storyMediaUrl}
                      onChange={(e) => setStoryMediaUrl(e.target.value)}
                      aria-label="Media URL"
                      placeholder="Optional media link (image/video URL)"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    />
                    <button
                      type="button"
                      onClick={addStory}
                      className="w-full px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-colors font-black shadow-lg shadow-purple-600/25"
                    >
                      Publish story + earn points
                    </button>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Free members earn +60 points per story. PRO/VIP earn +90 and get a verified badge.
                    </p>
                  </div>
                </GlassCard>

                <div className="mt-6">
                  <GlassCard className="p-6 border-white/10" hover={false}>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Need help?</div>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      If you were cheated by agents or fake consultancies, use the Expose section and we’ll route you to dedicated
                      help options.
                    </p>
                    <div className="mt-4">
                      <Link
                        href="/expose"
                        className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black transition-colors"
                      >
                        Go to Expose <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </GlassCard>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                {state.stories.length === 0 && (
                  <GlassCard className="p-10 border-white/10 text-center" hover={false}>
                    <h3 className="text-2xl font-black text-white">No community stories yet</h3>
                    <p className="mt-3 text-slate-400">Publish the first one and start earning.</p>
                  </GlassCard>
                )}

                {state.stories.map((s) => (
                  <GlassCard key={s.id} className="p-6 border-white/10" hover>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-black text-white">{s.title}</h3>
                          {s.verified && <span className="neo-badge neo-badge-security">Verified</span>}
                        </div>
                        <div className="mt-2 text-sm text-slate-400">{s.destination}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">
                          +{s.pointsAwarded} pts
                        </div>
                        <div className="mt-2 text-xs text-white/50">{new Date(s.ts).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-300 leading-relaxed whitespace-pre-line">{s.content}</p>
                    {s.mediaUrl && (
                      <div className="mt-5">
                        <a
                          href={s.mediaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-purple-200 hover:text-white font-black transition-colors"
                        >
                          Open media <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    )}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="text-xs text-white/60">Posted by {s.authorName}</div>
                      <div className="text-xs text-white/60">
                        {isPaidMember ? 'Paid client connect enabled' : 'Upgrade for verified connect'}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {tab === 'trips' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <GlassCard className="p-6 border-white/10" hover={false}>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Travel together</div>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Create a trip board post. Others can request to join. PRO/VIP get a verified badge on their trip posts.
                  </p>
                  <div className="mt-5 space-y-3">
                    <input
                      value={tripDestination}
                      onChange={(e) => setTripDestination(e.target.value)}
                      aria-label="Trip destination"
                      placeholder="Destination (e.g., Dubai, Toronto, London)"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <label className="space-y-1">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">From</span>
                        <input
                          type="date"
                          value={tripFrom}
                          onChange={(e) => setTripFrom(e.target.value)}
                          aria-label="Trip start date"
                          className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                        />
                      </label>
                      <label className="space-y-1">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">To</span>
                        <input
                          type="date"
                          value={tripTo}
                          onChange={(e) => setTripTo(e.target.value)}
                          aria-label="Trip end date"
                          className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                        />
                      </label>
                    </div>
                    <label className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Seats</span>
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={tripSeats}
                        onChange={(e) => setTripSeats(Number(e.target.value))}
                        aria-label="Seats"
                        className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                      />
                    </label>
                    <textarea
                      value={tripNotes}
                      onChange={(e) => setTripNotes(e.target.value)}
                      aria-label="Trip notes"
                      placeholder="Notes (budget, vibe, purpose: tourism/work/immigration)"
                      rows={4}
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40 resize-none"
                    />
                    <button
                      type="button"
                      onClick={addTrip}
                      className="w-full px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-colors font-black shadow-lg shadow-purple-600/25"
                    >
                      Publish trip + earn points
                    </button>
                  </div>
                </GlassCard>

                <div className="mt-6">
                  <GlassCard className="p-6 border-white/10" hover={false}>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Paid client connect</div>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      PRO/VIP members can create “connect threads” for travel/work planning with priority visibility.
                    </p>
                    <div className="mt-4 text-sm">
                      <span className={`neo-badge ${isPaidMember ? 'neo-badge-security' : 'neo-badge-popular'}`}>
                        {isPaidMember ? 'Access enabled' : 'Upgrade to unlock'}
                      </span>
                    </div>
                  </GlassCard>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                {state.trips.length === 0 && (
                  <GlassCard className="p-10 border-white/10 text-center" hover={false}>
                    <h3 className="text-2xl font-black text-white">No trips yet</h3>
                    <p className="mt-3 text-slate-400">Create one and invite others to travel together.</p>
                  </GlassCard>
                )}

                {state.trips.map((t) => (
                  <GlassCard key={t.id} className="p-6 border-white/10" hover>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-black text-white">{t.destination}</h3>
                        <div className="mt-2 text-sm text-slate-400">
                          {t.fromDate} → {t.toDate} · {t.seats} seats
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/60">Posted by {t.authorName}</div>
                        <div className="mt-2 text-xs text-white/50">{new Date(t.ts).toLocaleDateString()}</div>
                      </div>
                    </div>

                    {t.notes && <p className="mt-4 text-sm text-slate-300 leading-relaxed">{t.notes}</p>}

                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                        <div className="md:col-span-2">
                          <input
                            value={tripJoinMessageByTripId[t.id] ?? ''}
                            onChange={(e) =>
                              setTripJoinMessageByTripId(prev => ({ ...prev, [t.id]: e.target.value }))
                            }
                            aria-label="Join request message"
                            placeholder="Request to join (your plan, budget, why you match)"
                            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => requestJoinTrip(t.id)}
                          className="px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 transition-colors font-black"
                        >
                          Request
                        </button>
                      </div>

                      {t.requests.length > 0 && (
                        <div className="mt-5 space-y-3">
                          {t.requests.map(r => (
                            <div key={r.id} className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="text-sm font-black text-white">{r.requesterName}</div>
                                  <div className="mt-2 text-sm text-slate-300 leading-relaxed">{r.message}</div>
                                </div>
                                <div className="text-right space-y-2">
                                  <span className="neo-badge neo-badge-security">{r.status}</span>
                                  {t.authorName === state.profile.displayName && (
                                    <div className="flex gap-2 justify-end">
                                      <button
                                        type="button"
                                        onClick={() => updateTripRequestStatus(t.id, r.id, 'accepted')}
                                        className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition-colors text-xs font-black"
                                      >
                                        Accept
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => updateTripRequestStatus(t.id, r.id, 'declined')}
                                        className="px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 transition-colors text-xs font-black"
                                      >
                                        Decline
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {tab === 'qa' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <GlassCard className="p-6 border-white/10" hover={false}>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Ask a doubt</div>
                  <div className="mt-5 space-y-3">
                    <input
                      value={questionTitle}
                      onChange={(e) => setQuestionTitle(e.target.value)}
                      aria-label="Question title"
                      placeholder="Title (e.g., Visa refusal — what next?)"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    />
                    <textarea
                      value={questionBody}
                      onChange={(e) => setQuestionBody(e.target.value)}
                      aria-label="Question body"
                      placeholder="Explain your situation. Keep it private (no passport numbers)."
                      rows={6}
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40 resize-none"
                    />
                    <input
                      value={questionTags}
                      onChange={(e) => setQuestionTags(e.target.value)}
                      aria-label="Question tags"
                      placeholder="Tags (comma separated): scam, uk, study, documents"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    />
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="w-full px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-colors font-black shadow-lg shadow-purple-600/25"
                    >
                      Post question + earn points
                    </button>
                  </div>
                </GlassCard>

                <div className="mt-6">
                  <GlassCard className="p-6 border-white/10" hover={false}>
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Dedicated help</div>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      If your doubt is related to fraud, cheating, fake agents, or financial loss, use Expose. You’ll see dedicated
                      immigration lawyers, criminal lawyers, and financial advisory help routes.
                    </p>
                    <div className="mt-4">
                      <Link href="/expose" className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black">
                        Open Expose <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </GlassCard>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                {state.questions.length === 0 && (
                  <GlassCard className="p-10 border-white/10 text-center" hover={false}>
                    <h3 className="text-2xl font-black text-white">No questions yet</h3>
                    <p className="mt-3 text-slate-400">Post one and let the community help.</p>
                  </GlassCard>
                )}

                {state.questions.map(q => (
                  <GlassCard key={q.id} className="p-6 border-white/10" hover>
                    <button
                      type="button"
                      onClick={() => setOpenQuestionId(prev => (prev === q.id ? null : q.id))}
                      className="w-full text-left"
                      aria-label="Open question"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-black text-white">{q.title}</h3>
                          <div className="mt-2 text-xs text-white/60">Posted by {q.authorName}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-white/50">{new Date(q.ts).toLocaleDateString()}</div>
                          <div className="mt-2 text-xs text-white/50">{q.answers.length} answers</div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-slate-300 leading-relaxed line-clamp-3">{q.body}</p>
                      {q.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {q.tags.map(t => (
                            <span key={t} className="neo-badge neo-badge-popular">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>

                    {openQuestionId === q.id && (
                      <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
                        <div className="space-y-3">
                          {q.answers.map(a => (
                            <div key={a.id} className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                              <div className="text-sm font-black text-white">{a.authorName}</div>
                              <div className="mt-2 text-sm text-slate-300 leading-relaxed whitespace-pre-line">{a.body}</div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                          <div className="md:col-span-2">
                            <textarea
                              value={answerDraftByQuestionId[q.id] ?? ''}
                              onChange={(e) => setAnswerDraftByQuestionId(prev => ({ ...prev, [q.id]: e.target.value }))}
                              aria-label="Answer"
                              placeholder="Write an answer (no personal IDs, keep it safe)"
                              rows={3}
                              className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40 resize-none"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => addAnswer(q.id)}
                            className="px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 transition-colors font-black"
                          >
                            Answer
                          </button>
                        </div>
                      </div>
                    )}
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {tab === 'videos' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5">
                <GlassCard className="p-6 border-white/10" hover={false}>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Post a video</div>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Share travel videos, work videos, or immigration explainers. Use a YouTube link for inline previews.
                  </p>
                  <div className="mt-5 space-y-3">
                    <input
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      aria-label="Video title"
                      placeholder="Title"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    />
                    <input
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      aria-label="Video URL"
                      placeholder="Video URL (YouTube recommended)"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    />
                    <select
                      value={videoKind}
                      onChange={(e) => setVideoKind(e.target.value as EcosystemVideo['kind'])}
                      aria-label="Video kind"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400/40"
                    >
                      <option value="travel">Travel</option>
                      <option value="work">Work</option>
                      <option value="immigration">Immigration</option>
                    </select>
                    <button
                      type="button"
                      onClick={addVideo}
                      className="w-full px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition-colors font-black shadow-lg shadow-purple-600/25"
                    >
                      Publish video + earn points
                    </button>
                  </div>
                </GlassCard>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 gap-6">
                {state.videos.length === 0 && (
                  <GlassCard className="p-10 border-white/10 text-center" hover={false}>
                    <h3 className="text-2xl font-black text-white">No videos yet</h3>
                    <p className="mt-3 text-slate-400">Post the first travel/work video.</p>
                  </GlassCard>
                )}

                {state.videos.map(v => {
                  const youtubeId = extractYouTubeId(v.url);
                  return (
                    <GlassCard key={v.id} className="p-6 border-white/10" hover>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-black text-white">{v.title}</h3>
                          <div className="mt-2 text-sm text-slate-400">
                            {v.kind.toUpperCase()} · by {v.authorName}
                          </div>
                        </div>
                        <div className="text-xs text-white/50">{new Date(v.ts).toLocaleDateString()}</div>
                      </div>

                      {youtubeId ? (
                        <div className="mt-5 aspect-video overflow-hidden rounded-2xl border border-white/10">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={v.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="mt-5">
                          <a
                            href={v.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-purple-200 hover:text-white font-black transition-colors"
                          >
                            Open video link <ArrowRight className="h-4 w-4" />
                          </a>
                        </div>
                      )}
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'rewards' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <GlassCard className="p-8 border-white/10" hover={false}>
                  <h2 className="text-3xl font-black text-white">Rewards inside the ecosystem</h2>
                  <p className="mt-4 text-slate-400 leading-relaxed">
                    Earn points by posting stories, answering doubts, sharing videos, and building trust. These points will later
                    unlock perks, priority reviews, and exclusive drops.
                  </p>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">How to earn</div>
                      <ul className="mt-4 space-y-2 text-sm text-slate-300">
                        <li className="flex items-center justify-between">
                          <span>Publish a story</span>
                          <span className="font-black text-white/90">+60</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Answer a question</span>
                          <span className="font-black text-white/90">+15</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Post a trip</span>
                          <span className="font-black text-white/90">+20</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Post a video</span>
                          <span className="font-black text-white/90">+30</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Paid clients</div>
                      <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                        PRO/VIP members earn higher points and get verified status—making it easier to connect with others and
                        build trust.
                      </p>
                      <div className="mt-5">
                        <Link
                          href="/consultation"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
                        >
                          Upgrade with VANHSYA <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
              <div className="lg:col-span-5 space-y-6">
                <GlassCard className="p-6 border-white/10" hover={false}>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Your status</div>
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Tier</div>
                    <div className="text-lg font-black text-white">{pointsTier}</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Points</div>
                    <div className="text-lg font-black text-white">{state.points.toLocaleString()}</div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 border-white/10" hover={false}>
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Safety rule</div>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    Never post passport numbers, visa file numbers, OTPs, bank details, or agent contracts publicly.
                  </p>
                </GlassCard>
              </div>
            </div>
          )}

          {tab === 'expose' && (
            <GlassCard className="p-10 border-white/10" hover={false}>
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
                  <ShieldAlert className="h-4 w-4" />
                  Expose Scams + Get Help
                </div>
                <h2 className="mt-6 text-3xl md:text-5xl font-black">
                  <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                    If you got cheated,
                  </span>{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                    we’re here to help.
                  </span>
                </h2>
                <p className="mt-5 text-slate-400 leading-relaxed">
                  Report agent fraud, fake job offers, embassy impersonation, and financial scams. Find dedicated immigration
                  lawyers, criminal lawyers, and financial advisors.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/expose"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
                  >
                    Open Expose Page <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                  >
                    Talk to VANHSYA <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
