'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { useMemo, useState } from 'react';
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

  const initialMessages = useMemo(
    () => [
      {
        id: 'welcome',
        role: 'assistant' as const,
        content:
          "Welcome to VANHSYA Concierge. Tell me your goal (study, work, PR, business) and your target country — I’ll guide you step-by-step."
      }
    ],
    []
  );

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append } = useChat({
    api: '/api/chat',
    initialMessages
  });

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
                    {isLoading ? 'Thinking…' : error ? 'Limited mode' : 'Elite guidance, scam-aware'}
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
              {messages.map((m) => (
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
                      <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
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
                        onClick={() => append({ role: 'user', content: s })}
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
              {error && (
                <div className="text-xs text-yellow-200/90 mb-2">
                  Concierge is not connected right now. For investors email {COMPANY.emails.founder}. For careers email{' '}
                  {COMPANY.emails.career}.
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={handleInputChange}
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
