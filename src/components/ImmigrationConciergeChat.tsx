'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiArrowRight, FiMessageSquare, FiX } from 'react-icons/fi';
import { FaRobot, FaUser } from 'react-icons/fa';
import { COMPANY } from '@/lib/company';

type SiteRoute = { href: string; title: string; keywords: string[] };

type GuideStep = { title: string; detail: string; href: string; selector?: string };

type GuideFlow = { id: string; title: string; steps: GuideStep[] };

const defaultSuggestions = [
  'Am I eligible for UAE Golden Visa?',
  'What documents do I need for a Work Visa?',
  'How does VANHSYA prevent scams?',
  'Help me choose the best country for PR'
];

const ROUTES: SiteRoute[] = [
  { href: '/', title: 'Home', keywords: ['home', 'main', 'start', 'overview', 'vanhsya'] },
  { href: '/services', title: 'Services', keywords: ['services', 'packages', 'pricing', 'plans', 'fees'] },
  { href: '/consultation', title: 'Consultation', keywords: ['consultation', 'book', 'appointment', 'call', 'meeting'] },
  { href: '/contact', title: 'Contact', keywords: ['contact', 'support', 'whatsapp', 'email', 'phone'] },
  { href: '/countries', title: 'Countries', keywords: ['countries', 'destinations', 'canada', 'usa', 'uk', 'australia', 'germany', 'uae', 'singapore'] },
  { href: '/ai-tools', title: 'AI Tools', keywords: ['ai tools', 'tools', 'analyzer', 'coach', 'predictor', 'ielts', 'timeline'] },
  { href: '/ai-innovations', title: 'AI Innovations', keywords: ['ai innovations', 'innovations', 'cv', 'referral', 'lucky draw'] },
  { href: '/expose', title: 'Expose', keywords: ['expose', 'scam', 'fraud', 'report', 'verify', 'victim'] },
  { href: '/status', title: 'System Status', keywords: ['status', 'health', 'service unavailable', 'offline'] },
  { href: '/portal', title: 'Client Portal', keywords: ['portal', 'login', 'dashboard', 'account'] }
];

const FLOWS: GuideFlow[] = [
  {
    id: 'book-consultation',
    title: 'Book a Consultation',
    steps: [
      { title: 'Open Consultation page', detail: 'Start the booking flow.', href: '/consultation' },
      { title: 'Fill your details', detail: 'Enter name, email, phone, and destination.', href: '/consultation' },
      { title: 'Choose type and time', detail: 'Pick video/phone/in-person and select a slot.', href: '/consultation' },
      { title: 'Submit safely', detail: 'Submit once, then wait for confirmation.', href: '/consultation' }
    ]
  },
  {
    id: 'use-ai-tool',
    title: 'Use an AI Tool',
    steps: [
      { title: 'Open AI Tools', detail: 'Pick the tool that matches your need.', href: '/ai-tools' },
      { title: 'Open Visa Rejection Analyzer', detail: 'Analyze a refusal letter into an improvement plan.', href: '/ai-tools/visa-rejection-analyzer' },
      { title: 'Open Timeline Optimizer', detail: 'Build a step-by-step timeline with buffers.', href: '/ai-tools/timeline-optimizer' }
    ]
  },
  {
    id: 'report-scam',
    title: 'Report a Scam Safely',
    steps: [
      { title: 'Open Expose', detail: 'Go to the reporting hub.', href: '/expose' },
      { title: 'Submit details', detail: 'Provide the summary, country, and contact preference.', href: '/expose' },
      { title: 'Upload evidence (optional)', detail: 'Attach files only if you’re comfortable.', href: '/expose' }
    ]
  }
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\u2014\u2013]/g, '-')
    .replace(/[^a-z0-9\s/.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const matchRoute = (text: string): { route: SiteRoute; score: number } | null => {
  const q = normalize(text);
  if (!q) return null;
  let best: { route: SiteRoute; score: number } | null = null;
  for (const r of ROUTES) {
    let score = 0;
    for (const k of r.keywords) {
      const kk = normalize(k);
      if (!kk) continue;
      if (q.includes(kk)) score += Math.max(2, Math.min(8, kk.length / 3));
    }
    if (q.includes(normalize(r.href))) score += 10;
    if (!best || score > best.score) best = { route: r, score };
  }
  return best && best.score >= 3 ? best : null;
};

const extractInternalHrefs = (text: string): string[] => {
  const out: string[] = [];
  const re = /(?:^|\s)(\/[a-z0-9/_-]+)(?:\s|$)/gi;
  let m: RegExpExecArray | null = null;
  while ((m = re.exec(text)) !== null) {
    const href = m[1];
    if (href && href.startsWith('/')) out.push(href);
  }
  return Array.from(new Set(out));
};

const scrollToSelector = async (selector: string) => {
  if (typeof document === 'undefined') return false;
  const start = Date.now();
  while (Date.now() - start < 2500) {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      const prev = el.style.outline;
      const prevOffset = el.style.outlineOffset;
      el.style.outline = '2px solid rgba(250, 204, 21, 0.85)';
      el.style.outlineOffset = '6px';
      window.setTimeout(() => {
        el.style.outline = prev;
        el.style.outlineOffset = prevOffset;
      }, 1400);
      return true;
    }
    await new Promise((r) => window.setTimeout(r, 80));
  }
  return false;
};

const nowMs = () => Date.now();

export default function ImmigrationConciergeChat() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [offlineMode, setOfflineMode] = useState(false);
  const [guideFlowId, setGuideFlowId] = useState<string | null>(null);
  const [guideStepIndex, setGuideStepIndex] = useState(0);
  const [proactiveHint, setProactiveHint] = useState<string | null>(null);
  const localIdRef = useRef(0);
  const lastInteractionAtRef = useRef<number>(0);
  const routeHistoryRef = useRef<{ path: string; at: number }[]>([]);
  const clickBurstRef = useRef<{ at: number; count: number }>({ at: 0, count: 0 });

  const initialMessages = useMemo<UIMessage[]>(
    () => [
      {
        id: 'welcome',
        role: 'assistant' as const,
        parts: [
          {
            type: 'text' as const,
            text: "Welcome to VANHSYA Concierge. Tell me your goal (study, work, PR, business) and your target country — I’ll guide you step-by-step."
          }
        ]
      }
    ],
    []
  );

  const { messages, status, error, sendMessage, setMessages } = useChat<UIMessage>({
    messages: initialMessages
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const messageText = (m: UIMessage) =>
    m.parts
      .map((p) => (p.type === 'text' || p.type === 'reasoning' ? p.text : ''))
      .join('');

  const guideFlow = useMemo(() => (guideFlowId ? FLOWS.find((f) => f.id === guideFlowId) ?? null : null), [guideFlowId]);
  const guideStep = useMemo(() => (guideFlow ? guideFlow.steps[guideStepIndex] ?? null : null), [guideFlow, guideStepIndex]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const res = await fetch('/api/health', { cache: 'no-store' });
        const json = (await res.json().catch(() => null)) as { checks?: { openaiKeyConfigured?: boolean } } | null;
        const openaiKeyConfigured = Boolean(json?.checks?.openaiKeyConfigured);
        if (!cancelled) setOfflineMode(!openaiKeyConfigured);
      } catch {
        if (!cancelled) setOfflineMode(true);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    lastInteractionAtRef.current = nowMs();
    routeHistoryRef.current.push({ path: pathname, at: Date.now() });
    routeHistoryRef.current = routeHistoryRef.current.filter((x) => Date.now() - x.at < 20000);
    const h = routeHistoryRef.current;
    if (h.length >= 6) {
      const a = h[h.length - 1]?.path;
      const b = h[h.length - 2]?.path;
      const c = h[h.length - 3]?.path;
      const d = h[h.length - 4]?.path;
      if (a && b && c && d && a === c && b === d && a !== b) {
        requestAnimationFrame(() => {
          setProactiveHint(
            'It looks like you’re bouncing between pages. Want me to take you directly to the right section and guide you step-by-step?'
          );
          setOpen(true);
        });
      }
    }
  }, [pathname]);

  useEffect(() => {
    const mark = () => {
      lastInteractionAtRef.current = nowMs();
    };
    const onClick = () => {
      mark();
      const now = nowMs();
      const burst = clickBurstRef.current;
      if (now - burst.at > 2200) clickBurstRef.current = { at: now, count: 1 };
      else clickBurstRef.current = { at: burst.at, count: burst.count + 1 };
      const next = clickBurstRef.current;
      if (next.count >= 7) {
        setProactiveHint('I can switch on Rescue Mode and walk you through the next step. What are you trying to do right now?');
        setOpen(true);
        clickBurstRef.current = { at: now, count: 0 };
      }
    };
    window.addEventListener('pointerdown', onClick, { capture: true });
    window.addEventListener('keydown', mark, { capture: true });
    const timer = window.setInterval(() => {
      const idleMs = nowMs() - lastInteractionAtRef.current;
      if (idleMs > 65000 && !open) {
        setProactiveHint('Need a hand? I can navigate you to the right page and guide you step-by-step.');
        setOpen(true);
      }
    }, 5000);
    return () => {
      window.removeEventListener('pointerdown', onClick, { capture: true } as any);
      window.removeEventListener('keydown', mark, { capture: true } as any);
      window.clearInterval(timer);
    };
  }, [open]);

  const newId = () => {
    localIdRef.current += 1;
    return `local-${localIdRef.current}`;
  };

  const pushAssistant = (text: string) => {
    const assistantMessage: UIMessage = {
      id: newId(),
      role: 'assistant',
      parts: [{ type: 'text', text }]
    };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const runGuide = async (flowId: string, stepIndex = 0) => {
    const flow = FLOWS.find((f) => f.id === flowId) ?? null;
    if (!flow) return;
    const step = flow.steps[stepIndex] ?? null;
    if (!step) return;
    setGuideFlowId(flowId);
    setGuideStepIndex(stepIndex);
    setOpen(true);
    router.push(step.href);
    if (step.selector) await scrollToSelector(step.selector);
  };

  const maybeNavigate = async (text: string) => {
    const q = normalize(text);
    const wants =
      q.includes('open ') ||
      q.includes('go to ') ||
      q.includes('take me') ||
      q.includes('navigate') ||
      q.includes('where is') ||
      q.includes('show me') ||
      q.includes('i cant find') ||
      q.includes("i can't find") ||
      q.includes('stuck');

    if (q.includes('guide me') || q.includes('step by step') || q.includes('walk me')) {
      if (q.includes('consultation') || q.includes('book')) return runGuide('book-consultation', 0);
      if (q.includes('scam') || q.includes('fraud') || q.includes('expose')) return runGuide('report-scam', 0);
      if (q.includes('ai') || q.includes('tool') || q.includes('analyzer') || q.includes('ielts')) return runGuide('use-ai-tool', 0);
    }

    const direct = extractInternalHrefs(text)[0];
    if (direct) {
      setOpen(true);
      router.push(direct);
      return;
    }

    const m = matchRoute(text);
    if (!m) return;
    if (!wants && m.score < 6) return;
    if (pathname === m.route.href) return;
    setOpen(true);
    router.push(m.route.href);
    pushAssistant(`Opened: ${m.route.title} (${m.route.href}). Tell me what you want to achieve and I’ll guide the next step.`);
  };

  const offlineReply = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('career') || t.includes('job') || t.includes('hiring')) {
      return `For careers, email ${COMPANY.emails.career}. If you share your role, experience, and target country, I can outline a safe next step checklist.`;
    }
    if (t.includes('investor') || t.includes('investment') || t.includes('fund')) {
      return `For investors, email ${COMPANY.emails.founder}. If you share your timeline and preferred regions, I can list what details to include in your intro.`;
    }
    if (t.includes('golden visa') || t.includes('uae')) {
      return `UAE Golden Visa depends on your profile (salary, profession, education, business, or investment). Share your job title, monthly salary, degree, and whether you hold UAE residency, and I’ll map the safest pathway and documents.`;
    }
    if (t.includes('work visa') || t.includes('documents')) {
      return `Typical work visa documents: passport, photos, signed job offer/contract, employer sponsorship/approval, degree + transcripts, experience letters, police clearance, medicals, CV, bank statements (some countries), and translations. Tell me the country and occupation for an exact list.`;
    }
    if (t.includes('scam') || t.includes('fraud')) {
      return `To avoid scams: verify government portal links, confirm employer registration, never pay “guaranteed visa” fees, avoid fake embassy calls, and ensure contracts have refund terms. If you paste an offer letter or agency name, I’ll tell you what red flags to check.`;
    }
    if (t.includes('pr') || t.includes('permanent')) {
      return `To recommend a PR route, share: age, nationality, education, years of experience, IELTS/English level, budget, and target countries. I’ll suggest 2–3 realistic pathways and next actions.`;
    }
    const m = matchRoute(text);
    if (m) {
      return `I can guide you without AI. I can open ${m.route.title} (${m.route.href}) and walk you step-by-step. Say “open it” or “guide me” to begin.`;
    }
    return `I can help, but the AI concierge is in offline mode right now. Tell me your target country + goal (study/work/PR/business) + timeline, and I’ll give a safe step-by-step checklist.`;
  };

  const send = (text: string) => {
    lastInteractionAtRef.current = nowMs();
    void maybeNavigate(text);
    if (offlineMode) {
      const userMessage: UIMessage = {
        id: newId(),
        role: 'user',
        parts: [{ type: 'text', text }]
      };
      const assistantMessage: UIMessage = {
        id: newId(),
        role: 'assistant',
        parts: [{ type: 'text', text: offlineReply(text) }]
      };
      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      return;
    }
    void sendMessage({ text });
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-2xl shadow-2xl border border-white/15 backdrop-blur-xl transition-colors ${
          open
            ? 'bg-white/10 hover:bg-white/15'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        aria-label={open ? 'Close concierge' : 'Open concierge'}
      >
        <div className="w-full h-full flex items-center justify-center">
          {open ? <FiX className="w-6 h-6 text-white" /> : <FiMessageSquare className="w-6 h-6 text-white" />}
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 w-[92vw] max-w-md h-[520px] rounded-3xl overflow-hidden border border-white/15 bg-black/60 backdrop-blur-2xl shadow-2xl"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 flex items-center justify-center">
                  <FaRobot className="text-black text-lg" />
                </div>
                <div>
                  <div className="text-white font-extrabold tracking-wide text-sm">VANHSYA CONCIERGE</div>
                  <div className="text-white/60 text-xs">
                    {isLoading ? 'Thinking…' : offlineMode ? 'Offline mode' : error ? 'Limited mode' : 'Elite guidance, scam-aware'}
                  </div>
                </div>
              </div>
              <a
                href="/next-era"
                className="text-xs font-bold text-white/70 hover:text-white transition-colors"
              >
                Next Era
              </a>
            </div>

            <div className="h-[360px] overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m: UIMessage) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm border ${
                      m.role === 'user'
                        ? 'bg-white/10 border-white/10 text-white'
                        : 'bg-gradient-to-b from-white/8 to-white/5 border-white/10 text-white/90'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {m.role === 'user' ? (
                        <FaUser className="mt-0.5 text-white/70" />
                      ) : (
                        <FaRobot className="mt-0.5 text-yellow-300" />
                      )}
                      <div className="whitespace-pre-wrap leading-relaxed">{messageText(m)}</div>
                    </div>
                  </div>
                </div>
              ))}

              {proactiveHint ? (
                <div className="rounded-2xl border border-amber-200/20 bg-amber-400/10 px-4 py-3 text-xs text-amber-100">
                  <div className="font-extrabold tracking-wide">Rescue Mode</div>
                  <div className="mt-1 text-amber-100/90">{proactiveHint}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => runGuide('book-consultation', 0)}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 transition-colors"
                    >
                      Book consultation
                    </button>
                    <button
                      type="button"
                      onClick={() => runGuide('use-ai-tool', 0)}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 transition-colors"
                    >
                      Use AI tools
                    </button>
                    <button
                      type="button"
                      onClick={() => runGuide('report-scam', 0)}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 transition-colors"
                    >
                      Report a scam
                    </button>
                    <button
                      type="button"
                      onClick={() => setProactiveHint(null)}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              ) : null}

              {guideFlow && guideStep ? (
                <div className="rounded-2xl border border-indigo-300/20 bg-indigo-500/10 px-4 py-3">
                  <div className="text-[11px] font-black uppercase tracking-[0.25em] text-white/70">Guided Mode</div>
                  <div className="mt-2 text-white font-extrabold text-sm">{guideFlow.title}</div>
                  <div className="mt-1 text-white/80 text-xs font-bold">
                    Step {guideStepIndex + 1} / {guideFlow.steps.length}: {guideStep.title}
                  </div>
                  <div className="mt-2 text-white/70 text-xs">{guideStep.detail}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => runGuide(guideFlow.id, guideStepIndex)}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 transition-colors"
                    >
                      Open step
                    </button>
                    <button
                      type="button"
                      disabled={guideStepIndex === 0}
                      onClick={() => runGuide(guideFlow.id, Math.max(0, guideStepIndex - 1))}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 transition-colors disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={guideStepIndex >= guideFlow.steps.length - 1}
                      onClick={() => runGuide(guideFlow.id, Math.min(guideFlow.steps.length - 1, guideStepIndex + 1))}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 transition-colors disabled:opacity-50"
                    >
                      Next
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGuideFlowId(null);
                        setGuideStepIndex(0);
                        pushAssistant('Guided mode stopped. Tell me what you want to do next.');
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-extrabold bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 transition-colors"
                    >
                      Stop
                    </button>
                  </div>
                </div>
              ) : null}

              {messages.length === 1 && (
                <div className="pt-2">
                  <div className="text-xs text-white/60 font-semibold mb-2">Quick starts</div>
                  <div className="flex flex-wrap gap-2">
                    {defaultSuggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => runGuide('book-consultation', 0)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-colors"
                    >
                      Guide: consultation
                    </button>
                    <button
                      type="button"
                      onClick={() => runGuide('use-ai-tool', 0)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-colors"
                    >
                      Guide: AI tools
                    </button>
                    <button
                      type="button"
                      onClick={() => runGuide('report-scam', 0)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-colors"
                    >
                      Guide: report scam
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-4 border-t border-white/10">
              {(error || offlineMode) && (
                <div className="text-xs text-yellow-200/90 mb-2">
                  Concierge is in offline mode. For investors email {COMPANY.emails.founder}. For careers email{' '}
                  {COMPANY.emails.career}.
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const text = input.trim();
                  if (!text) return;
                  setInput('');
                  send(text);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Golden Visa, PR, work, study…"
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/25"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || input.trim().length === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-black font-extrabold disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
