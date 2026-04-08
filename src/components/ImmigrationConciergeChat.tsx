'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FiArrowRight, FiMessageSquare, FiX } from 'react-icons/fi';
import { FaRobot, FaUser } from 'react-icons/fa';
import { COMPANY } from '@/lib/company';

const defaultSuggestions = [
  'Am I eligible for UAE Golden Visa?',
  'What documents do I need for a Work Visa?',
  'How does VANHSYA prevent scams?',
  'Help me choose the best country for PR'
];

export default function ImmigrationConciergeChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [offlineMode, setOfflineMode] = useState(false);
  const localIdRef = useRef(0);

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

  const newId = () => {
    localIdRef.current += 1;
    return `local-${localIdRef.current}`;
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
    return `I can help, but the AI concierge is in offline mode right now. Tell me your target country + goal (study/work/PR/business) + timeline, and I’ll give a safe step-by-step checklist.`;
  };

  const send = (text: string) => {
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
