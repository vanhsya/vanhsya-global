'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import LanguageSelect from '@/components/ai/LanguageSelect';
import { DOCUMENT_CHECKLISTS } from '@/data/ai/documentChecklists';
import { VISA_INTERVIEW_QUESTIONS, VisaCountry } from '@/data/ai/interviewQuestions';
import { addProgressEvent } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, CheckCircle2, Gamepad2, XCircle } from 'lucide-react';

type Step = 'setup' | 'documents' | 'interview' | 'results';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

type SimulationConfig = {
  country: VisaCountry;
  pathway: 'study' | 'work' | 'visitor' | 'pr' | 'investment';
};

export default function ImmigrationSimulationsPage() {
  const [language, setLanguage] = useState('en');
  const [step, setStep] = useState<Step>('setup');
  const [config, setConfig] = useState<SimulationConfig>({ country: 'canada', pathway: 'study' });

  const checklist = useMemo(() => {
    const match = DOCUMENT_CHECKLISTS.find((c) => c.country === config.country && c.pathway === config.pathway);
    return match || DOCUMENT_CHECKLISTS[0];
  }, [config.country, config.pathway]);

  const questions = useMemo(() => VISA_INTERVIEW_QUESTIONS.filter((q) => q.country === config.country), [config.country]);
  const interviewQ = useMemo(() => questions[0] || VISA_INTERVIEW_QUESTIONS[0], [questions]);

  const allDocs = useMemo(() => checklist.items.map((i) => i.label), [checklist.items]);
  const requiredDocs = useMemo(() => checklist.items.filter((i) => i.required).map((i) => i.label), [checklist.items]);

  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const toggleDoc = (label: string) => {
    setSelectedDocs((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));
  };

  const computeDocScore = () => {
    const chosen = new Set(selectedDocs);
    const required = new Set(requiredDocs);
    const requiredHit = requiredDocs.filter((d) => chosen.has(d)).length;
    const missing = requiredDocs.filter((d) => !chosen.has(d)).length;
    const extras = selectedDocs.filter((d) => !required.has(d)).length;
    const base = Math.round((requiredHit / Math.max(1, requiredDocs.length)) * 70);
    const penalty = Math.min(25, missing * 8 + Math.max(0, extras - 2) * 3);
    return Math.max(0, Math.min(100, base + 30 - penalty));
  };

  const computeInterviewScore = () => {
    const a = answer.trim().toLowerCase();
    if (!a) return 0;
    const lenScore = Math.min(40, Math.round((a.length / 600) * 40));
    const hasNumbers = /\d/.test(a) ? 10 : 0;
    const hasPlan = a.includes('plan') || a.includes('after') || a.includes('return') ? 15 : 0;
    const hasSpecific = a.includes('because') || a.includes('module') || a.includes('offer') ? 15 : 0;
    const contradictions = a.includes('permanent') && config.pathway !== 'pr' ? 20 : 0;
    return Math.max(0, Math.min(100, lenScore + hasNumbers + hasPlan + hasSpecific - contradictions));
  };

  const finish = () => {
    const doc = computeDocScore();
    const iv = computeInterviewScore();
    const total = Math.round(doc * 0.55 + iv * 0.45);
    setScore(total);
    addProgressEvent({
      toolId: 'immigration-simulations',
      label: `Simulation (${config.country.toUpperCase()} • ${config.pathway})`,
      score: total,
      meta: { docScore: doc, interviewScore: iv }
    });
    setStep('results');
  };

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <BadgeCheck className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Immigration Simulations</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Learn by doing — safely.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Simulations replicate document preparation and interview scenarios for major destinations. Scores are guidance, not guarantees.
            </p>
          </motion.div>

          <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-emerald-200" />
              <div className="text-white font-extrabold">Simulation steps</div>
              <div className="text-white/60 text-sm">{step.toUpperCase()}</div>
            </div>
            <LanguageSelect value={language} onChange={setLanguage} />
          </div>

          <div className="mt-6">
            {step === 'setup' ? (
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="text-white font-extrabold text-2xl">Choose scenario</div>
                <div className="mt-2 text-white/70">Pick a country and pathway. The simulation will build a checklist and interview prompt.</div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={config.country}
                    onChange={(e) => setConfig((p) => ({ ...p, country: e.target.value as VisaCountry }))}
                    aria-label="Country"
                    className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option value="usa">USA</option>
                    <option value="uk">UK</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="eu">EU</option>
                  </select>
                  <select
                    value={config.pathway}
                    onChange={(e) => setConfig((p) => ({ ...p, pathway: e.target.value as SimulationConfig['pathway'] }))}
                    aria-label="Pathway"
                    className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option value="study">Study</option>
                    <option value="work">Work</option>
                    <option value="visitor">Visitor</option>
                    <option value="pr">PR</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDocs([]);
                      setAnswer('');
                      setScore(null);
                      setStep('documents');
                    }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                  >
                    Start simulation <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            ) : null}

            {step === 'documents' ? (
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="text-white font-extrabold text-2xl">Step 1: Document pack</div>
                <div className="mt-2 text-white/70">Select the documents you would include for this route.</div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">{checklist.title}</div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {allDocs.map((d) => {
                      const checked = selectedDocs.includes(d);
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleDoc(d)}
                          className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                            checked ? 'bg-white/10 border-white/20' : 'bg-black/20 border-white/10 hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="text-white font-extrabold">{d}</div>
                            {checked ? <CheckCircle2 className="w-5 h-5 text-emerald-200" /> : <XCircle className="w-5 h-5 text-white/30" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('interview')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                  >
                    Continue to interview <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('setup')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    Back
                  </button>
                </div>
              </GlassCard>
            ) : null}

            {step === 'interview' ? (
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="text-white font-extrabold text-2xl">Step 2: Interview scenario</div>
                <div className="mt-2 text-white/70">Answer the prompt clearly and consistently (simulate a real interview).</div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Question</div>
                  <div className="mt-3 text-white font-extrabold">{interviewQ.prompt}</div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Strong signals</div>
                      <div className="mt-3 space-y-2">
                        {interviewQ.strongSignals.slice(0, 3).map((x) => (
                          <div key={x} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Red flags</div>
                      <div className="mt-3 space-y-2">
                        {interviewQ.redFlags.slice(0, 3).map((x) => (
                          <div key={x} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                            <span>{x}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your interview answer…"
                  className="mt-5 w-full min-h-[180px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled={!answer.trim()}
                    onClick={finish}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-60"
                  >
                    Finish simulation <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('documents')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    Back
                  </button>
                </div>
              </GlassCard>
            ) : null}

            {step === 'results' ? (
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="text-white font-extrabold text-2xl">Results</div>
                <div className="mt-2 text-white/70">A practice score with actionable next steps.</div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Total</div>
                    <div className="mt-3 text-4xl font-extrabold text-amber-200">{score ?? 0}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Documents</div>
                    <div className="mt-3 text-2xl font-extrabold text-white">{computeDocScore()}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Interview</div>
                    <div className="mt-3 text-2xl font-extrabold text-white">{computeInterviewScore()}</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Next actions</div>
                    <div className="mt-4 space-y-2 text-sm text-white/75">
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span>Build a document index: what each proof demonstrates, and where it is in your upload.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span>Rewrite the interview answer with specific facts: dates, funds, course/role details, return plan.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span>Run the Visa Interview Coach on your answer for structured feedback.</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Disclaimer</div>
                    <div className="mt-4 text-sm text-white/70 leading-relaxed">
                      This simulation is for practice and education. It does not represent official decision-making and does not guarantee approval.
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('setup')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                  >
                    Run another simulation <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('documents')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    Review documents
                  </button>
                </div>
              </GlassCard>
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

