"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import GlassCard from "@/components/GlassCard";
import {
  FiArrowRight,
  FiCopy,
  FiGift,
  FiTrendingUp,
  FiUsers,
  FiShare2,
  FiCalendar,
  FiCheckCircle,
  FiStar,
  FiShield,
  FiImage,
  FiPlus,
  FiZap,
  FiClock,
  FiBarChart2,
} from "react-icons/fi";

type MembershipTier = "Normal" | "PRO" | "VIP";
type ReferralChannel = "WhatsApp" | "Instagram" | "Facebook" | "Telegram" | "Direct";
type ReferralStatus = "Invited" | "Joined" | "Converted";

type RewardPackage = {
  id: string;
  title: string;
  subtitle: string;
  requirementReferrals: number;
  requirementPoints: number;
  isPremiumTravelPackage?: boolean;
};

type ReferralEvent =
  | {
      id: string;
      type: "referral";
      ts: number;
      name: string;
      channel: ReferralChannel;
      status: ReferralStatus;
      points: number;
    }
  | {
      id: string;
      type: "story";
      ts: number;
      title: string;
      destination: string;
      points: number;
    }
  | {
      id: string;
      type: "tier";
      ts: number;
      tier: MembershipTier;
      amount: number;
    };

type TravelStoryDraft = {
  title: string;
  destination: string;
  durationDays: number;
  highlights: string;
  budgetRange: "Budget" | "Comfort" | "Premium";
  visaRoute: "Tourism" | "Study" | "Work" | "Business";
  tips: string;
};

type RMProfile = {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  success: string;
  availability: string;
};

type EarnState = {
  referralCode: string;
  tier: MembershipTier;
  points: number;
  referrals: Array<{ id: string; name: string; status: ReferralStatus; ts: number }>;
  events: ReferralEvent[];
  notifications: { email: string; phone: string; emailOn: boolean; smsOn: boolean };
  rmBookings: Array<{ id: string; rmId: string; ts: number; when: string; note: string }>;
  stories: Array<{ id: string; ts: number; title: string; destination: string; content: string }>;
};

const STORAGE_KEY = "vanhsya_earn_state_v1";
const CHANNEL_NAME = "vanhsya_earn_channel";

const packages: RewardPackage[] = [
  {
    id: "starter-boost",
    title: "Starter Boost",
    subtitle: "Application-ready document review pack",
    requirementReferrals: 3,
    requirementPoints: 120,
  },
  {
    id: "fast-track",
    title: "Fast Track",
    subtitle: "Priority consultation + checklist automation",
    requirementReferrals: 5,
    requirementPoints: 240,
  },
  {
    id: "premium-travel",
    title: "Premium Travel Package",
    subtitle: "Free premium travel package when you refer 10 friends",
    requirementReferrals: 10,
    requirementPoints: 450,
    isPremiumTravelPackage: true,
  },
];

const tiers: Array<{
  tier: MembershipTier;
  price: { currency: string; amount: number; cadence: string };
  referralMultiplier: number;
  storyPoints: number;
  perks: string[];
  accent: string;
}> = [
  {
    tier: "Normal",
    price: { currency: "AED", amount: 0, cadence: "Free" },
    referralMultiplier: 1,
    storyPoints: 25,
    perks: [
      "Basic referral tracking",
      "Community stories access",
      "Standard RM queue",
      "Reward packs eligibility",
    ],
    accent: "from-indigo-500/15 via-purple-500/10 to-transparent",
  },
  {
    tier: "PRO",
    price: { currency: "AED", amount: 49, cadence: "One-time" },
    referralMultiplier: 1.35,
    storyPoints: 40,
    perks: [
      "Higher referral payouts",
      "Priority RM support",
      "Faster reward unlocks",
      "Conversion optimization tips",
    ],
    accent: "from-amber-400/15 via-purple-500/10 to-transparent",
  },
  {
    tier: "VIP",
    price: { currency: "AED", amount: 149, cadence: "One-time" },
    referralMultiplier: 1.75,
    storyPoints: 60,
    perks: [
      "Highest earning multiplier",
      "Dedicated RM assigned",
      "Premium travel package priority",
      "Exclusive partner offers",
    ],
    accent: "from-pink-500/15 via-amber-500/10 to-transparent",
  },
];

const rms: RMProfile[] = [
  {
    id: "rm-1",
    name: "Aisha Rahman",
    role: "Relationship Manager • GCC",
    specialties: ["Tourism routes", "Family visits", "Fast-track documentation"],
    success: "Helped 1,200+ clients plan travel-ready submissions",
    availability: "Next slot: Today 6:30 PM",
  },
  {
    id: "rm-2",
    name: "Daniel Chen",
    role: "Relationship Manager • North America",
    specialties: ["Study visas", "SOP strategy", "Timeline planning"],
    success: "93% success uplift in guided applications",
    availability: "Next slot: Tomorrow 11:00 AM",
  },
  {
    id: "rm-3",
    name: "Priya Nair",
    role: "Relationship Manager • EU/UK",
    specialties: ["Schengen tourism", "UK visitor routes", "Risk flag reduction"],
    success: "Built 3,500+ compliant travel packs",
    availability: "Next slot: Friday 4:00 PM",
  },
];

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function makeReferralCode() {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `VAN-${part}`;
}

function basePointsPerReferral(tier: MembershipTier) {
  const t = tiers.find((x) => x.tier === tier)!;
  return Math.round(20 * t.referralMultiplier);
}

function storyPoints(tier: MembershipTier) {
  return tiers.find((x) => x.tier === tier)!.storyPoints;
}

function computeEarningsEstimate(tier: MembershipTier, referralsPerMonth: number, conversionRatePct: number) {
  const perReferral = tier === "Normal" ? 18 : tier === "PRO" ? 25 : 32;
  const conv = Math.max(0, Math.min(100, conversionRatePct)) / 100;
  const converted = referralsPerMonth * conv;
  const estimated = converted * perReferral;
  return { perReferral, converted, estimated };
}

async function withBackoff<T>(fn: () => Promise<T>, opts?: { retries?: number; baseMs?: number; maxMs?: number }) {
  const retries = opts?.retries ?? 4;
  const baseMs = opts?.baseMs ?? 300;
  const maxMs = opts?.maxMs ?? 2500;
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (e) {
      attempt += 1;
      if (attempt > retries) throw e;
      const jitter = Math.random() * 0.2 + 0.9;
      const wait = Math.min(maxMs, baseMs * Math.pow(2, attempt) * jitter);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

function defaultState(): EarnState {
  return {
    referralCode: makeReferralCode(),
    tier: "Normal",
    points: 0,
    referrals: [],
    events: [],
    notifications: { email: "", phone: "", emailOn: true, smsOn: false },
    rmBookings: [],
    stories: [],
  };
}

function loadState(): EarnState {
  if (typeof window === "undefined") return defaultState();
  const parsed = safeParse<EarnState>(window.localStorage.getItem(STORAGE_KEY));
  if (!parsed) return defaultState();
  return {
    ...defaultState(),
    ...parsed,
    notifications: { ...defaultState().notifications, ...(parsed.notifications ?? {}) },
  };
}

function saveState(state: EarnState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function useEarnState() {
  const [state, setState] = React.useState<EarnState>(() => loadState());
  const channelRef = React.useRef<BroadcastChannel | null>(null);

  React.useEffect(() => {
    channelRef.current = new BroadcastChannel(CHANNEL_NAME);
    const ch = channelRef.current;
    ch.onmessage = (ev) => {
      if (ev.data?.type === "sync") {
        const next = loadState();
        setState(next);
      }
    };
    return () => {
      ch.close();
      channelRef.current = null;
    };
  }, []);

  const update = React.useCallback(
    (updater: (prev: EarnState) => EarnState) => {
      setState((prev) => {
        const next = updater(prev);
        saveState(next);
        channelRef.current?.postMessage({ type: "sync" });
        return next;
      });
    },
    []
  );

  return { state, update };
}

function formatMoneyAED(n: number) {
  return new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(n);
}

function computeProgress(state: EarnState) {
  const totalReferrals = state.referrals.length;
  const converted = state.referrals.filter((r) => r.status === "Converted").length;
  const toward10 = Math.min(10, totalReferrals);
  const progressPct = Math.round((toward10 / 10) * 100);
  const nextMilestone = totalReferrals < 3 ? 3 : totalReferrals < 5 ? 5 : totalReferrals < 10 ? 10 : 10;
  return { totalReferrals, converted, progressPct, nextMilestone };
}

function buildShareMessage(code: string) {
  const link = `${typeof window !== "undefined" ? window.location.origin : "https://vanhsya.com"}/referral-program?ref=${encodeURIComponent(code)}`;
  return {
    link,
    short:
      `Join VANHSYA and get a smarter immigration + tourism plan. Use my code ${code} to start: ${link}`,
    long:
      `VANHSYA is building the next era of immigration + tourism with AI tools, fraud protection, and verified pathways.\n\nUse my referral code: ${code}\nStart here: ${link}\n\nEarn rewards and unlock premium travel packages as you grow your network.`,
  };
}

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
      {label}
    </span>
  );
}

function SectionTitle({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.65)]" />
        {kicker}
      </div>
      <h2 className="mt-6 text-3xl md:text-5xl font-black tracking-tight">
        <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">{title}</span>
      </h2>
      <p className="mt-6 text-lg text-slate-400 leading-relaxed">{subtitle}</p>
    </div>
  );
}

function Toasts({ items, onClear }: { items: Array<{ id: string; text: string }>; onClear: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 w-[320px] max-w-[calc(100vw-3rem)]">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-slate-200 leading-relaxed">{t.text}</p>
              <button
                type="button"
                onClick={onClear}
                className="text-xs font-black text-slate-400 hover:text-white"
                aria-label="Clear notifications"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function PaymentModal({
  open,
  onClose,
  tier,
  amount,
  currency,
  onPaid,
}: {
  open: boolean;
  onClose: () => void;
  tier: MembershipTier;
  amount: number;
  currency: string;
  onPaid: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [processing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) {
      setProcessing(false);
      setError(null);
    }
  }, [open]);

  const simulateCheckout = async () => {
    setProcessing(true);
    setError(null);
    try {
      await withBackoff(
        async () => {
          await new Promise((r) => setTimeout(r, 450));
          if (Math.random() < 0.2) throw new Error("Network");
          return true;
        },
        { retries: 3, baseMs: 250, maxMs: 1600 }
      );
      onPaid();
      onClose();
    } catch {
      setError("Secure checkout failed due to network conditions. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Secure checkout"
        >
          <div className="absolute inset-0 bg-black/70" onClick={onClose} />
          <motion.div
            initial={prefersReducedMotion ? { y: 0, scale: 1 } : { y: 16, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: 16, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg"
          >
            <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">Secure Upgrade</p>
                  <h3 className="mt-2 text-2xl font-black text-white">Activate {tier}</h3>
                  <p className="mt-2 text-slate-400">
                    Small payment unlocks higher referral bonuses, faster rewards, and RM priority support.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white text-xl font-black"
                  aria-label="Close payment modal"
                >
                  ×
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/25 border border-white/10 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Amount</p>
                  <p className="mt-2 text-2xl font-black text-white">
                    {currency} {amount}
                  </p>
                </div>
                <div className="bg-black/25 border border-white/10 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Method</p>
                  <p className="mt-2 text-sm font-bold text-slate-200">Hosted secure checkout</p>
                  <p className="text-xs text-slate-500 mt-1">Payment gateway integration can be connected server-side.</p>
                </div>
              </div>

              {error && (
                <div className="mt-5 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 text-red-200/90 text-sm">
                  {error}
                </div>
              )}

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={simulateCheckout}
                  disabled={processing}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors disabled:opacity-60"
                >
                  {processing ? (
                    <>
                      <FiClock className="h-5 w-5 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <FiShield className="h-5 w-5" />
                      Pay Securely
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                >
                  Not Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TravelStoryComposer({
  tier,
  onPublish,
}: {
  tier: MembershipTier;
  onPublish: (draft: TravelStoryDraft & { content: string; images: File[] }) => Promise<void>;
}) {
  const [draft, setDraft] = React.useState<TravelStoryDraft>({
    title: "",
    destination: "",
    durationDays: 7,
    highlights: "",
    budgetRange: "Comfort",
    visaRoute: "Tourism",
    tips: "",
  });
  const [images, setImages] = React.useState<File[]>([]);
  const [content, setContent] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = React.useState<string>("");

  const points = storyPoints(tier);

  const submit = async () => {
    if (!draft.title.trim() || !draft.destination.trim() || !content.trim()) {
      setStatus("error");
      setMsg("Add a title, destination, and your story to publish.");
      return;
    }
    setStatus("loading");
    setMsg("");
    try {
      await onPublish({ ...draft, content, images });
      setStatus("success");
      setMsg(`Published. +${points} points added to your wallet.`);
      setDraft({
        title: "",
        destination: "",
        durationDays: 7,
        highlights: "",
        budgetRange: "Comfort",
        visaRoute: "Tourism",
        tips: "",
      });
      setImages([]);
      setContent("");
      setTimeout(() => setStatus("idle"), 1200);
    } catch {
      setStatus("error");
      setMsg("Publishing failed due to network conditions. Try again.");
    }
  };

  return (
    <GlassCard className="p-6 md:p-8 border-white/10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-white">Post-Travel Stories</h3>
          <p className="mt-2 text-slate-400">
            Publish your travel experience and earn points automatically. Templates keep your content structured and high quality.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge label={`+${points} points / post`} />
          <Badge label={`${tier} tier`} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="space-y-2" htmlFor="travel_story_title">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Title</span>
          <input
            id="travel_story_title"
            value={draft.title}
            onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
            className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            placeholder="My Dubai 7-day trip that got approved fast"
            aria-label="Story title"
            title="Story title"
          />
        </label>
        <label className="space-y-2" htmlFor="travel_story_destination">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Destination</span>
          <input
            id="travel_story_destination"
            value={draft.destination}
            onChange={(e) => setDraft((p) => ({ ...p, destination: e.target.value }))}
            className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            placeholder="UAE / Singapore / UK / Canada"
            aria-label="Destination"
            title="Destination"
          />
        </label>
        <label className="space-y-2" htmlFor="travel_story_visa_route">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Visa Route</span>
          <select
            id="travel_story_visa_route"
            value={draft.visaRoute}
            onChange={(e) => setDraft((p) => ({ ...p, visaRoute: e.target.value as TravelStoryDraft["visaRoute"] }))}
            className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            aria-label="Visa route"
            title="Visa route"
          >
            {(["Tourism", "Study", "Work", "Business"] as const).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2" htmlFor="travel_story_budget_range">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Budget</span>
          <select
            id="travel_story_budget_range"
            value={draft.budgetRange}
            onChange={(e) => setDraft((p) => ({ ...p, budgetRange: e.target.value as TravelStoryDraft["budgetRange"] }))}
            className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            aria-label="Budget range"
            title="Budget range"
          >
            {(["Budget", "Comfort", "Premium"] as const).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 md:col-span-2" htmlFor="travel_story_highlights">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Highlights (template)</span>
          <textarea
            id="travel_story_highlights"
            value={draft.highlights}
            onChange={(e) => setDraft((p) => ({ ...p, highlights: e.target.value }))}
            rows={3}
            className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            placeholder={"• Day 1: Arrival + hotel\n• Day 2: City tour\n• Day 3: Embassy appointment (if any)\n• Day 4: Attractions + receipts\n• Day 5–7: Buffer + return plan"}
            aria-label="Highlights"
            title="Highlights"
          />
        </label>
        <label className="space-y-2 md:col-span-2" htmlFor="travel_story_content">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Story</span>
          <textarea
            id="travel_story_content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
            placeholder="Write your experience: what worked, what documents helped, and what you would do differently."
            aria-label="Story"
            title="Story"
          />
        </label>
        <label className="space-y-2 md:col-span-2" htmlFor="travel_story_photos">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Photos</span>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              id="travel_story_photos"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages(Array.from(e.target.files ?? []).slice(0, 6))}
              title="Upload travel photos"
              className="w-full text-sm text-slate-300 file:bg-white/[0.05] file:border file:border-white/10 file:rounded-xl file:px-4 file:py-2 file:text-white file:font-bold file:mr-4"
              aria-label="Upload travel photos"
            />
            <div className="inline-flex items-center gap-2 text-xs text-slate-500">
              <FiImage className="h-4 w-4" />
              {images.length} selected
            </div>
          </div>
        </label>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <FiClock className="h-5 w-5 animate-spin" />
              Publishing…
            </>
          ) : (
            <>
              <FiPlus className="h-5 w-5" />
              Publish Story
            </>
          )}
        </button>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
        >
          Explore Blog <FiArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <AnimatePresence>
        {status !== "idle" && msg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`mt-5 rounded-2xl px-4 py-3 text-sm border ${
              status === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-200/90"
                : status === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-200/90"
                : "bg-white/[0.03] border-white/10 text-slate-200"
            }`}
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}

export default function EarnWithVanshya() {
  const prefersReducedMotion = useReducedMotion();
  const { state, update } = useEarnState();
  const progress = computeProgress(state);
  const [payTier, setPayTier] = React.useState<MembershipTier | null>(null);
  const [toasts, setToasts] = React.useState<Array<{ id: string; text: string }>>([]);

  const share = React.useMemo(() => buildShareMessage(state.referralCode), [state.referralCode]);

  const clearToasts = React.useCallback(() => setToasts([]), []);

  const pushToast = React.useCallback((text: string) => {
    const id = uid("toast");
    setToasts((p) => [...p.slice(-2), { id, text }]);
    setTimeout(() => {
      setToasts((p) => p.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const addReferral = async (payload: { name: string; channel: ReferralChannel }) => {
    await withBackoff(
      async () => {
        await new Promise((r) => setTimeout(r, 250));
        if (Math.random() < 0.12) throw new Error("Network");
        return true;
      },
      { retries: 3, baseMs: 200, maxMs: 1200 }
    );

    update((prev) => {
      const points = basePointsPerReferral(prev.tier);
      const ev: ReferralEvent = {
        id: uid("ref"),
        type: "referral",
        ts: Date.now(),
        name: payload.name,
        channel: payload.channel,
        status: "Invited",
        points,
      };
      return {
        ...prev,
        points: prev.points + points,
        referrals: [{ id: ev.id, name: ev.name, status: ev.status, ts: ev.ts }, ...prev.referrals].slice(0, 200),
        events: [ev, ...prev.events].slice(0, 300),
      };
    });
    pushToast(`Referral invite created. +${basePointsPerReferral(state.tier)} points`);
  };

  const markReferralStatus = (id: string, status: ReferralStatus) => {
    update((prev) => {
      const referrals = prev.referrals.map((r) => (r.id === id ? { ...r, status } : r));
      const events = prev.events.map((e) => {
        if (e.type === "referral" && e.id === id) return { ...e, status };
        return e;
      });
      return { ...prev, referrals, events };
    });
    pushToast(`Referral updated: ${status}`);
  };

  const publishStory = async (draft: TravelStoryDraft & { content: string; images: File[] }) => {
    await withBackoff(
      async () => {
        await new Promise((r) => setTimeout(r, 350));
        if (Math.random() < 0.15) throw new Error("Network");
        return true;
      },
      { retries: 3, baseMs: 220, maxMs: 1400 }
    );

    update((prev) => {
      const pts = storyPoints(prev.tier);
      const id = uid("story");
      const storyText = [
        `Destination: ${draft.destination}`,
        `Visa route: ${draft.visaRoute}`,
        `Budget: ${draft.budgetRange}`,
        `Duration: ${draft.durationDays} days`,
        "",
        "Highlights:",
        draft.highlights || "—",
        "",
        "Tips:",
        draft.tips || "—",
        "",
        "Story:",
        draft.content,
      ].join("\n");
      const ev: ReferralEvent = { id, type: "story", ts: Date.now(), title: draft.title, destination: draft.destination, points: pts };
      const story = { id, ts: ev.ts, title: draft.title, destination: draft.destination, content: storyText };
      return {
        ...prev,
        points: prev.points + pts,
        events: [ev, ...prev.events].slice(0, 300),
        stories: [story, ...prev.stories].slice(0, 50),
      };
    });
    pushToast(`Story published. +${storyPoints(state.tier)} points`);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(state.referralCode);
      pushToast("Referral code copied");
    } catch {
      pushToast("Copy failed. Please select and copy manually.");
    }
  };

  const shareNow = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "VANHSYA Earn", text: share.short, url: share.link });
        pushToast("Shared successfully");
      } catch {
        pushToast("Sharing cancelled");
      }
      return;
    }
    await copyLink();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(share.link);
      pushToast("Referral link copied");
    } catch {
      pushToast("Copy failed. Please select and copy manually.");
    }
  };

  const setTier = (tier: MembershipTier) => {
    update((prev) => {
      const t = tiers.find((x) => x.tier === tier)!;
      const ev: ReferralEvent = { id: uid("tier"), type: "tier", ts: Date.now(), tier, amount: t.price.amount };
      return { ...prev, tier, events: [ev, ...prev.events].slice(0, 300) };
    });
    pushToast(`Tier updated: ${tier}`);
  };

  const canClaim = (p: RewardPackage) => {
    return state.referrals.length >= p.requirementReferrals && state.points >= p.requirementPoints;
  };

  const claim = (p: RewardPackage) => {
    if (!canClaim(p)) return;
    pushToast(`Reward unlocked: ${p.title}`);
  };

  const [calc, setCalc] = React.useState({ referrals: 20, conversion: 35 });
  const estimate = React.useMemo(() => computeEarningsEstimate(state.tier, calc.referrals, calc.conversion), [state.tier, calc]);

  const [quickInvite, setQuickInvite] = React.useState<{ name: string; channel: ReferralChannel }>({
    name: "",
    channel: "WhatsApp",
  });

  const recent = state.events.slice(0, 6);

  const tierMeta = tiers.find((t) => t.tier === state.tier)!;

  return (
    <div className="relative">
      <Toasts items={toasts} onClear={clearToasts} />
      <PaymentModal
        open={payTier != null}
        onClose={() => setPayTier(null)}
        tier={payTier ?? "PRO"}
        amount={payTier ? tiers.find((t) => t.tier === payTier)!.price.amount : 0}
        currency={payTier ? tiers.find((t) => t.tier === payTier)!.price.currency : "AED"}
        onPaid={() => {
          if (payTier) setTier(payTier);
        }}
      />

      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-amber-400/10 blur-[140px]" />
          <div className="absolute -bottom-48 right-[-10%] h-[900px] w-[900px] rounded-full bg-purple-500/10 blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.12),transparent_55%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80 mx-auto lg:mx-0">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.65)]" />
                Earn with Vanhsya Community
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                  Earn money even if you start small
                </span>{" "}
                <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  by helping people travel smarter
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Share VANHSYA with your network, unlock travel rewards, and build your income stream. No agents. No confusion.
                Just verified pathways, tourism-ready packs, and a community that pays you for impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={shareNow}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
                >
                  <FiShare2 className="h-5 w-5" />
                  Share & Start Earning
                  <FiArrowRight className="h-5 w-5" />
                </button>
                <Link
                  href="/ai-tools"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                >
                  Explore AI Tools <FiZap className="h-5 w-5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <GlassCard className="p-5 border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Your Tier</p>
                    <FiStar className="h-4 w-4 text-amber-200/80" />
                  </div>
                  <p className="mt-3 text-2xl font-black text-white">{state.tier}</p>
                  <p className="mt-1 text-sm text-slate-400">Multiplier {tierMeta.referralMultiplier.toFixed(2)}×</p>
                </GlassCard>
                <GlassCard className="p-5 border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Points</p>
                    <FiGift className="h-4 w-4 text-amber-200/80" />
                  </div>
                  <p className="mt-3 text-2xl font-black text-white">{state.points}</p>
                  <p className="mt-1 text-sm text-slate-400">Redeem for packs</p>
                </GlassCard>
                <GlassCard className="p-5 border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Referrals</p>
                    <FiUsers className="h-4 w-4 text-amber-200/80" />
                  </div>
                  <p className="mt-3 text-2xl font-black text-white">{progress.totalReferrals}/10</p>
                  <p className="mt-1 text-sm text-slate-400">Premium travel at 10</p>
                </GlassCard>
              </div>
            </div>

            <div className="relative">
              <GlassCard className="p-8 md:p-10 border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-purple-500/5 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Your Referral Identity</p>
                      <h3 className="mt-2 text-2xl font-black text-white">Unique Code</h3>
                      <p className="mt-2 text-slate-400">Share once. Track everything. Earn continuously.</p>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      <Image src="/images/originallogo.png" alt="VANHSYA" width={28} height={28} />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch">
                    <div className="flex-1 bg-black/30 border border-white/10 rounded-2xl px-4 py-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Referral Code</p>
                      <p className="mt-2 text-xl font-black text-white tracking-wide">{state.referralCode}</p>
                    </div>
                    <button
                      type="button"
                      onClick={copyCode}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                    >
                      <FiCopy className="h-5 w-5" />
                      Copy
                    </button>
                    <button
                      type="button"
                      onClick={copyLink}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                    >
                      <FiShare2 className="h-5 w-5" />
                      Link
                    </button>
                  </div>

                  <div className="mt-7">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-black text-white">Progress to Free Premium Travel Package</p>
                      <p className="text-sm font-black text-amber-200/80">{progress.progressPct}%</p>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/10">
                      <motion.div
                        initial={prefersReducedMotion ? { width: `${progress.progressPct}%` } : { width: 0 }}
                        animate={{ width: `${progress.progressPct}%` }}
                        transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-amber-400 via-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                      <span>Next milestone: {progress.nextMilestone} referrals</span>
                      <span>{Math.max(0, 10 - progress.totalReferrals)} more to unlock premium travel</span>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Converted</p>
                      <p className="mt-2 text-3xl font-black text-white">{progress.converted}</p>
                      <p className="mt-2 text-sm text-slate-400">Friends who activated a plan</p>
                    </div>
                    <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Est. Earnings</p>
                      <p className="mt-2 text-3xl font-black text-white">{formatMoneyAED(estimate.estimated)}</p>
                      <p className="mt-2 text-sm text-slate-400">Based on your calculator inputs</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <GlassCard className="p-6 border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Quick Invite</p>
                    <FiUsers className="h-4 w-4 text-amber-200/80" />
                  </div>
                  <div className="mt-4 space-y-3">
                    <input
                      id="ref_quick_invite_name"
                      value={quickInvite.name}
                      onChange={(e) => setQuickInvite((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Friend name"
                      aria-label="Friend name"
                      title="Friend name"
                      className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                    />
                    <select
                      id="ref_quick_invite_channel"
                      value={quickInvite.channel}
                      onChange={(e) => setQuickInvite((p) => ({ ...p, channel: e.target.value as ReferralChannel }))}
                      aria-label="Referral channel"
                      title="Referral channel"
                      className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                    >
                      {(["WhatsApp", "Instagram", "Facebook", "Telegram", "Direct"] as const).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => addReferral(quickInvite)}
                      disabled={!quickInvite.name.trim()}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors disabled:opacity-50"
                    >
                      <FiPlus className="h-5 w-5" />
                      Create Invite
                    </button>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 border-white/10">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Recent Activity</p>
                    <FiTrendingUp className="h-4 w-4 text-amber-200/80" />
                  </div>
                  <div className="mt-4 space-y-3">
                    {recent.length === 0 ? (
                      <p className="text-sm text-slate-500">No activity yet. Share your code to start earning.</p>
                    ) : (
                      recent.map((e) => (
                        <div key={e.id} className="bg-black/25 border border-white/10 rounded-2xl px-4 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-bold text-slate-200">
                              {e.type === "referral"
                                ? `Invite: ${e.name}`
                                : e.type === "story"
                                ? `Story: ${e.title}`
                                : `Tier: ${e.tier}`}
                            </p>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              {new Date(e.ts).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-500">
                            {e.type === "referral"
                              ? `${e.channel} • ${e.status} • +${e.points} pts`
                              : e.type === "story"
                              ? `${e.destination} • +${e.points} pts`
                              : `${formatMoneyAED(e.amount)} upgrade`}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Referral System"
            title="Tiered rewards, packages, and a real dashboard"
            subtitle="Track your referrals, unlock rewards, and claim a free premium travel package at 10 referrals."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <GlassCard className="p-7 border-white/10 lg:col-span-2">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Referral Tracking Dashboard</h3>
                  <p className="mt-2 text-slate-400">Update statuses, monitor conversions, and see your next reward.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Badge label={`+${basePointsPerReferral(state.tier)} pts / invite`} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Referrals</p>
                  <p className="mt-2 text-3xl font-black text-white">{progress.totalReferrals}</p>
                </div>
                <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Converted</p>
                  <p className="mt-2 text-3xl font-black text-white">{progress.converted}</p>
                </div>
                <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Points Wallet</p>
                  <p className="mt-2 text-3xl font-black text-white">{state.points}</p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-12 bg-white/[0.03] text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 px-4 py-3">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-4">Status</div>
                  <div className="col-span-3 text-right">Action</div>
                </div>
                <div className="divide-y divide-white/10">
                  {state.referrals.slice(0, 8).map((r) => (
                    <div key={r.id} className="grid grid-cols-12 px-4 py-4 items-center">
                      <div className="col-span-5">
                        <p className="text-sm font-bold text-slate-200">{r.name}</p>
                        <p className="text-xs text-slate-500">{new Date(r.ts).toLocaleString()}</p>
                      </div>
                      <div className="col-span-4">
                        <div className="inline-flex items-center gap-2 bg-black/25 border border-white/10 rounded-full px-3 py-1">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              r.status === "Converted"
                                ? "bg-emerald-400"
                                : r.status === "Joined"
                                ? "bg-amber-300"
                                : "bg-slate-400"
                            }`}
                          />
                          <span className="text-xs font-bold text-slate-200">{r.status}</span>
                        </div>
                      </div>
                      <div className="col-span-3 flex justify-end">
                        <select
                          value={r.status}
                          onChange={(e) => markReferralStatus(r.id, e.target.value as ReferralStatus)}
                          className="bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                          aria-label="Update referral status"
                          title="Update referral status"
                        >
                          {(["Invited", "Joined", "Converted"] as const).map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  {state.referrals.length === 0 && (
                    <div className="px-4 py-10 text-center">
                      <p className="text-slate-400">No referrals yet. Create a Quick Invite to start.</p>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>

            <div className="space-y-6">
              <GlassCard className="p-7 border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">Rewards & Packages</h3>
                  <FiGift className="h-5 w-5 text-amber-200/80" />
                </div>
                <p className="mt-3 text-slate-400">Unlock travel packs using referrals + points.</p>
                <div className="mt-5 space-y-4">
                  {packages.map((p) => {
                    const ok = canClaim(p);
                    return (
                      <div key={p.id} className={`rounded-2xl border p-4 ${ok ? "border-amber-400/30 bg-amber-400/5" : "border-white/10 bg-black/20"}`}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-black text-white">{p.title}</p>
                            <p className="text-xs text-slate-400 mt-1">{p.subtitle}</p>
                          </div>
                          {p.isPremiumTravelPackage ? (
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">Premium</span>
                          ) : (
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Pack</span>
                          )}
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                          <span>{p.requirementReferrals} refs</span>
                          <span>{p.requirementPoints} pts</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => claim(p)}
                          disabled={!ok}
                          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors disabled:opacity-50"
                        >
                          <FiCheckCircle className="h-5 w-5" />
                          {ok ? "Claim" : "Locked"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              <GlassCard className="p-7 border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white">Sharing Tools</h3>
                  <FiShare2 className="h-5 w-5 text-amber-200/80" />
                </div>
                <p className="mt-3 text-slate-400">Pre-written messages + unique referral links.</p>
                <div className="mt-5 space-y-3">
                  <textarea
                    readOnly
                    value={share.short}
                    aria-label="Referral share message"
                    title="Referral share message"
                    className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-200 leading-relaxed"
                    rows={4}
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={copyLink}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                    >
                      <FiCopy className="h-5 w-5" />
                      Copy Link
                    </button>
                    <button
                      type="button"
                      onClick={shareNow}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
                    >
                      <FiShare2 className="h-5 w-5" />
                      Share
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Membership Tiers"
            title="Normal, PRO, VIP — maximize earning potential"
            subtitle="Each tier increases referral bonuses, accelerates rewards, and improves RM support."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((t) => {
              const active = t.tier === state.tier;
              const priceLabel = t.price.amount === 0 ? "Free" : `${t.price.currency} ${t.price.amount} • ${t.price.cadence}`;
              return (
                <GlassCard key={t.tier} className={`p-8 border-white/10 relative overflow-hidden ${active ? "ring-2 ring-amber-400/40" : ""}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${t.accent}`} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Tier</p>
                        <h3 className="mt-2 text-2xl font-black text-white">{t.tier}</h3>
                        <p className="mt-2 text-slate-400">{priceLabel}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Multiplier</p>
                        <p className="mt-2 text-2xl font-black text-amber-200/80">{t.referralMultiplier.toFixed(2)}×</p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-black/25 border border-white/10 rounded-2xl p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Referral Points</p>
                        <p className="mt-2 text-lg font-black text-white">+{Math.round(20 * t.referralMultiplier)}</p>
                      </div>
                      <div className="bg-black/25 border border-white/10 rounded-2xl p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Story Points</p>
                        <p className="mt-2 text-lg font-black text-white">+{t.storyPoints}</p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {t.perks.map((p) => (
                        <div key={p} className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-amber-400/80" />
                          <p className="text-sm text-slate-300">{p}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      {active ? (
                        <div className="inline-flex items-center gap-2 text-emerald-300/90 text-sm font-black">
                          <FiCheckCircle className="h-5 w-5" /> Active
                        </div>
                      ) : t.price.amount === 0 ? (
                        <button
                          type="button"
                          onClick={() => setTier(t.tier)}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                        >
                          Activate Normal <FiArrowRight className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPayTier(t.tier)}
                          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
                        >
                          Upgrade Securely <FiShield className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <div className="grid grid-cols-12 px-5 py-4 bg-white/[0.03] text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
              <div className="col-span-4">Feature</div>
              <div className="col-span-2 text-center">Normal</div>
              <div className="col-span-3 text-center">PRO</div>
              <div className="col-span-3 text-center">VIP</div>
            </div>
            {[
              { f: "Referral earning multiplier", n: "1.00×", p: "1.35×", v: "1.75×" },
              { f: "Points per travel story", n: "25", p: "40", v: "60" },
              { f: "RM support", n: "Standard", p: "Priority", v: "Dedicated RM" },
              { f: "Premium travel package unlock", n: "10 referrals", p: "10 referrals + faster packs", v: "Priority access" },
              { f: "Analytics dashboard depth", n: "Core", p: "Advanced", v: "Advanced + strategy plan" },
            ].map((r) => (
              <div key={r.f} className="grid grid-cols-12 px-5 py-4 border-t border-white/10">
                <div className="col-span-4 text-sm font-bold text-slate-200">{r.f}</div>
                <div className="col-span-2 text-center text-sm text-slate-300">{r.n}</div>
                <div className="col-span-3 text-center text-sm text-slate-300">{r.p}</div>
                <div className="col-span-3 text-center text-sm text-slate-300">{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Earnings Calculator"
            title="See your earning potential in seconds"
            subtitle="Adjust referrals and conversion rate to see projected monthly earnings from travel referrals."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <GlassCard className="p-8 border-white/10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Earnings Simulator</h3>
                  <p className="mt-2 text-slate-400">Built for real-world networks and changing conversion rates.</p>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
                  <FiBarChart2 className="h-4 w-4" />
                  {state.tier}
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-200">
                    <span>Referrals per month</span>
                    <span className="text-amber-200/80">{calc.referrals}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={120}
                    value={calc.referrals}
                    onChange={(e) => setCalc((p) => ({ ...p, referrals: Number(e.target.value) }))}
                    className="mt-3 w-full accent-amber-400"
                    aria-label="Referrals per month"
                    title="Referrals per month"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-200">
                    <span>Conversion rate</span>
                    <span className="text-amber-200/80">{calc.conversion}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={calc.conversion}
                    onChange={(e) => setCalc((p) => ({ ...p, conversion: Number(e.target.value) }))}
                    className="mt-3 w-full accent-amber-400"
                    aria-label="Conversion rate"
                    title="Conversion rate"
                  />
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-purple-500/5 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white">Projected Monthly Earnings</h3>
                <p className="mt-2 text-slate-400">
                  Based on tier, estimated payout per conversion, and your network conversion rate.
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Payout</p>
                    <p className="mt-2 text-2xl font-black text-white">{formatMoneyAED(estimate.perReferral)}</p>
                  </div>
                  <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Converted</p>
                    <p className="mt-2 text-2xl font-black text-white">{estimate.converted.toFixed(0)}</p>
                  </div>
                  <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Total</p>
                    <p className="mt-2 text-2xl font-black text-white">{formatMoneyAED(estimate.estimated)}</p>
                  </div>
                </div>

                <div className="mt-8 bg-black/25 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Strategy Tip</p>
                  <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                    Post one travel story per week and share your referral link alongside it. Your story earns points and
                    increases trust, which typically improves conversion.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="RM Support"
            title="Dedicated Relationship Managers to maximize earnings"
            subtitle="RMs guide you with messaging, network strategy, and conversion uplift. Book 1‑on‑1 sessions directly."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {rms.map((rm) => (
              <GlassCard key={rm.id} className="p-8 border-white/10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-black text-white">{rm.name}</h3>
                    <p className="mt-2 text-sm text-slate-400">{rm.role}</p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-200/80">
                    <FiStar className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {rm.specialties.map((s) => (
                    <div key={s} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-amber-400/80" />
                      <p className="text-sm text-slate-300">{s}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-black/25 border border-white/10 rounded-2xl p-4">
                  <p className="text-sm font-bold text-slate-200">{rm.success}</p>
                  <p className="mt-2 text-xs text-slate-500">{rm.availability}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    update((prev) => {
                      const id = uid("booking");
                      const when = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16).replace("T", " ");
                      const next = {
                        ...prev,
                        rmBookings: [{ id, rmId: rm.id, ts: Date.now(), when, note: "Earnings plan + referral strategy" }, ...prev.rmBookings].slice(0, 20),
                      };
                      return next;
                    });
                    pushToast(`Consultation requested with ${rm.name}`);
                  }}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                >
                  <FiCalendar className="h-5 w-5" />
                  Schedule Consultation
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Analytics + Notifications"
            title="Real-time network insights and reward alerts"
            subtitle="Monitor your network performance and receive updates when referrals progress or rewards unlock."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <GlassCard className="p-8 border-white/10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-white">Notification Settings</h3>
                  <p className="mt-2 text-slate-400">Email/SMS alerts for referral updates and reward unlocks.</p>
                </div>
                <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
                  <FiShield className="h-4 w-4" />
                  Secure
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Email</span>
                  <input
                    type="email"
                    value={state.notifications.email}
                    onChange={(e) => update((p) => ({ ...p, notifications: { ...p.notifications, email: e.target.value } }))}
                    placeholder="you@example.com"
                    aria-label="Notification email"
                    title="Notification email"
                    className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Phone</span>
                  <input
                    type="tel"
                    value={state.notifications.phone}
                    onChange={(e) => update((p) => ({ ...p, notifications: { ...p.notifications, phone: e.target.value } }))}
                    placeholder="+971 50 000 0000"
                    aria-label="Notification phone"
                    title="Notification phone"
                    className="w-full bg-black/25 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                  />
                </label>
                <div className="flex items-center justify-between gap-4 bg-black/25 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-200/80">
                      <FiShare2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-black text-white">Email updates</p>
                      <p className="text-xs text-slate-500">Reward + referral alerts</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => update((p) => ({ ...p, notifications: { ...p.notifications, emailOn: !p.notifications.emailOn } }))}
                    className={`h-9 w-16 rounded-full border transition-colors ${
                      state.notifications.emailOn ? "bg-emerald-500/20 border-emerald-500/30" : "bg-white/[0.03] border-white/10"
                    }`}
                    aria-label="Toggle email notifications"
                  >
                    <span
                      className={`block h-7 w-7 rounded-full bg-white transition-transform ${
                        state.notifications.emailOn ? "translate-x-8 bg-emerald-200" : "translate-x-1 bg-slate-200"
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4 bg-black/25 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-200/80">
                      <FiUsers className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-black text-white">SMS updates</p>
                      <p className="text-xs text-slate-500">Instant progress pings</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => update((p) => ({ ...p, notifications: { ...p.notifications, smsOn: !p.notifications.smsOn } }))}
                    className={`h-9 w-16 rounded-full border transition-colors ${
                      state.notifications.smsOn ? "bg-emerald-500/20 border-emerald-500/30" : "bg-white/[0.03] border-white/10"
                    }`}
                    aria-label="Toggle SMS notifications"
                  >
                    <span
                      className={`block h-7 w-7 rounded-full bg-white transition-transform ${
                        state.notifications.smsOn ? "translate-x-8 bg-emerald-200" : "translate-x-1 bg-slate-200"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => pushToast("Preferences saved")}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                >
                  <FiCheckCircle className="h-5 w-5" />
                  Save Preferences
                </button>
                <button
                  type="button"
                  onClick={() => pushToast("Test notification queued")}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
                >
                  <FiZap className="h-5 w-5" />
                  Send Test Alert
                </button>
              </div>
            </GlassCard>

            <GlassCard className="p-8 border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-black text-white">Network Analytics</h3>
                    <p className="mt-2 text-slate-400">A lightweight dashboard for referral growth and activity.</p>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
                    <FiTrendingUp className="h-4 w-4" />
                    Live
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Invites</p>
                    <p className="mt-2 text-3xl font-black text-white">
                      {state.events.filter((e) => e.type === "referral").length}
                    </p>
                  </div>
                  <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Stories</p>
                    <p className="mt-2 text-3xl font-black text-white">
                      {state.events.filter((e) => e.type === "story").length}
                    </p>
                  </div>
                  <div className="bg-black/25 border border-white/10 rounded-2xl p-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Bookings</p>
                    <p className="mt-2 text-3xl font-black text-white">{state.rmBookings.length}</p>
                  </div>
                </div>

                <div className="mt-8 bg-black/25 border border-white/10 rounded-2xl p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Last 7 days activity</p>
                  <div className="mt-4">
                    <svg viewBox="0 0 360 110" className="w-full h-[110px]" role="img" aria-label="Referral activity chart">
                      {(() => {
                        const days = Array.from({ length: 7 }).map((_, i) => {
                          const d = new Date();
                          d.setDate(d.getDate() - (6 - i));
                          const key = d.toISOString().slice(0, 10);
                          const count = state.events.filter((e) => new Date(e.ts).toISOString().slice(0, 10) === key).length;
                          return { key, count };
                        });
                        const max = Math.max(1, ...days.map((d) => d.count));
                        const points = days.map((d, i) => {
                          const x = 20 + (i * 320) / 6;
                          const y = 90 - (d.count / max) * 60;
                          return { x, y, count: d.count };
                        });
                        const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
                        return (
                          <>
                            <path d="M 20 90 L 340 90" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                            <path d={path} fill="none" stroke="rgba(251,191,36,0.8)" strokeWidth="2.5" strokeLinecap="round" />
                            {points.map((p, i) => (
                              <g key={i}>
                                <circle cx={p.x} cy={p.y} r="3.5" fill="rgba(251,191,36,0.95)" />
                                <circle cx={p.x} cy={p.y} r="10" fill="none" stroke="rgba(251,191,36,0.25)" />
                                <text x={p.x} y={104} textAnchor="middle" fill="rgba(148,163,184,0.9)" fontSize="10" fontWeight="700">
                                  {p.count}
                                </text>
                              </g>
                            ))}
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    Activity includes invites, stories, and tier upgrades. This dashboard updates in real time across tabs.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Community Blog"
            title="Publish travel experiences. Earn points automatically."
            subtitle="A dedicated community space where your story turns into rewards and helps others travel safely."
          />

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <TravelStoryComposer tier={state.tier} onPublish={publishStory} />

            <GlassCard className="p-6 md:p-8 border-white/10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white">Community Feed</h3>
                  <p className="mt-2 text-slate-400">Stories from the Earn with Vanhsya community.</p>
                </div>
                <Link
                  href="/referral-program/stories"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white text-xs font-black transition-colors"
                >
                  Open Feed <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {state.stories.slice(0, 5).map((s) => (
                  <div key={s.id} className="bg-black/25 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black text-white">{s.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{s.destination}</p>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                        {new Date(s.ts).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-300 line-clamp-4 whitespace-pre-line">{s.content}</p>
                  </div>
                ))}
                {state.stories.length === 0 && (
                  <div className="bg-black/25 border border-white/10 rounded-2xl p-8 text-center">
                    <p className="text-slate-400">No community stories yet. Publish the first one and earn points.</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="Social Proof"
            title="Real earnings. Real impact."
            subtitle="Recent community wins and testimonials to build trust."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Khalid • Dubai",
                quote:
                  "I started with almost no budget. Shared my referral code in a travel group and earned enough for my first paid consultation.",
                metric: "AED 620 earned",
              },
              {
                name: "Meera • Mumbai",
                quote:
                  "Posting my itinerary and story helped friends trust the platform. I hit 10 referrals and unlocked a premium travel package.",
                metric: "10 referrals",
              },
              {
                name: "Omar • Abu Dhabi",
                quote:
                  "The RM helped me craft a message that converts. I now track my network like a mini business.",
                metric: "2.1× conversion",
              },
            ].map((t) => (
              <GlassCard key={t.name} className="p-8 border-white/10">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-amber-200/80">
                    <FiStar className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">{t.metric}</span>
                </div>
                <p className="mt-6 text-sm text-slate-200 leading-relaxed">“{t.quote}”</p>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-slate-500">{t.name}</p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/[0.03] border border-white/10 rounded-3xl px-8 py-8 backdrop-blur-xl">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Onboarding</p>
              <p className="mt-2 text-2xl font-black text-white">Invite your first 3 friends today</p>
              <p className="mt-2 text-slate-400">Unlock your first reward pack and start building income momentum.</p>
            </div>
            <button
              type="button"
              onClick={shareNow}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
            >
              Share Now <FiArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
