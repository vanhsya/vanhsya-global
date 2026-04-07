'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import LanguageSelect from '@/components/ai/LanguageSelect';
import { COUNTRY_LABELS, VISA_INTERVIEW_QUESTIONS, VisaCountry } from '@/data/ai/interviewQuestions';
import { addProgressEvent } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, Mic, ShieldCheck, Sparkles } from 'lucide-react';

type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

type Result = {
  question: string;
  score: { overall: number; clarity: number; confidence: number; compliance: number };
  feedback: string[];
  improvedAnswer: string;
  culturalTips: string[];
  redFlagRisk: { level: 'low' | 'medium' | 'high'; reasons: string[] };
  nextDrills: string[];
  disclaimer: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

const speakingSupported = () => {
  if (typeof window === 'undefined') return false;
  const w = window as unknown as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown };
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
};

const countWords = (s: string) => (s.trim().match(/\S+/g) || []).length;

export default function VisaInterviewCoachPage() {
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState<VisaCountry>('canada');
  const [questionId, setQuestionId] = useState<string>('canada_study_1');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const questions = useMemo(() => VISA_INTERVIEW_QUESTIONS.filter((q) => q.country === country), [country]);
  const selectedQuestion = useMemo(
    () => questions.find((q) => q.id === questionId) || questions[0],
    [questions, questionId]
  );

  const recRef = useRef<SpeechRecognition | null>(null);
  const [micActive, setMicActive] = useState(false);
  const micStartAt = useRef<number | null>(null);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);

  const [eyeContact, setEyeContact] = useState<'low' | 'ok' | 'high'>('ok');
  const [posture, setPosture] = useState<'slouched' | 'neutral' | 'upright'>('upright');
  const [gestures, setGestures] = useState<'none' | 'controlled' | 'excessive'>('controlled');
  const [pace, setPace] = useState<'slow' | 'balanced' | 'fast'>('balanced');
  const [confidence, setConfidence] = useState<'low' | 'ok' | 'high'>('ok');

  useEffect(() => {
    setHasSpeechSupport(speakingSupported());
  }, []);

  const startMic = () => {
    if (!speakingSupported()) return;
    const w = window as unknown as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown };
    const SpeechRec = (w.SpeechRecognition || w.webkitSpeechRecognition) as (new () => SpeechRecognition) | undefined;
    if (!SpeechRec) return;
    const rec = new SpeechRec();
    rec.lang = language;
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (event: SpeechRecognitionEvent) => {
      let full = '';
      for (let i = 0; i < event.results.length; i += 1) full += `${event.results[i][0]?.transcript ?? ''} `;
      setAnswer(full.trim());
    };
    rec.onerror = () => setMicActive(false);
    rec.onend = () => setMicActive(false);
    recRef.current = rec;
    setMicActive(true);
    micStartAt.current = Date.now();
    rec.start();
  };

  const stopMic = () => {
    const r = recRef.current;
    recRef.current = null;
    if (r) r.stop();
  };

  const voiceMetrics = useMemo(() => {
    const words = countWords(answer);
    const seconds = micStartAt.current && micActive ? Math.max(1, (Date.now() - micStartAt.current) / 1000) : null;
    const wpm = seconds ? Math.round((words / seconds) * 60) : null;
    const fillers = (answer.toLowerCase().match(/\b(um|uh|like|you know)\b/g) || []).length;
    return { words, wpm, fillers };
  }, [answer, micActive]);

  const presenceScore = useMemo(() => {
    let score = 70;
    if (eyeContact === 'high') score += 6;
    if (eyeContact === 'low') score -= 8;
    if (posture === 'upright') score += 6;
    if (posture === 'slouched') score -= 10;
    if (gestures === 'controlled') score += 4;
    if (gestures === 'excessive') score -= 8;
    if (gestures === 'none') score -= 2;
    if (pace === 'balanced') score += 4;
    if (pace === 'fast') score -= 6;
    if (pace === 'slow') score -= 2;
    if (confidence === 'high') score += 6;
    if (confidence === 'low') score -= 10;
    if (voiceMetrics.fillers >= 6) score -= 6;
    return Math.max(1, Math.min(99, score));
  }, [eyeContact, posture, gestures, pace, confidence, voiceMetrics.fillers]);

  const submit = async () => {
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const selfReport = { eyeContact, posture, gestures, pace, confidence, presenceScore };
      const res = await fetch('/api/ai/visa-interview-coach', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          country,
          questionId: selectedQuestion?.id,
          answer,
          language,
          selfReport,
          voiceMetrics: { ...voiceMetrics, micActive }
        })
      });
      const json = (await res.json().catch(() => null)) as Result | { error?: string } | null;
      if (!res.ok) {
        setError((json as { error?: string } | null)?.error || 'Failed to coach.');
        setLoading(false);
        return;
      }
      const data = json as Result;
      setResult(data);
      addProgressEvent({
        toolId: 'visa-interview-coach',
        label: `Interview coach (${COUNTRY_LABELS[country]})`,
        score: data.score?.overall,
        meta: {
          country,
          questionId: selectedQuestion?.id || '',
          presenceScore,
          words: voiceMetrics.words,
          fillers: voiceMetrics.fillers
        }
      });
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
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
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Pre-Interview AI Coach</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Practice the questions that decide outcomes.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Mock visa interviews for USA, UK, Canada, Australia, and EU — with feedback, cultural tips, and red-flag risk signals.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="text-white font-extrabold text-xl">Setup</div>
                <LanguageSelect value={language} onChange={setLanguage} />
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={country}
                  onChange={(e) => {
                    const c = e.target.value as VisaCountry;
                    setCountry(c);
                    const next = VISA_INTERVIEW_QUESTIONS.find((q) => q.country === c);
                    if (next) setQuestionId(next.id);
                  }}
                  aria-label="Country"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  {Object.entries(COUNTRY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>

                <select
                  value={questionId}
                  onChange={(e) => setQuestionId(e.target.value)}
                  aria-label="Question"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  {questions.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.category.toUpperCase()}: {q.prompt.slice(0, 52)}…
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Question</div>
                <div className="mt-3 text-white font-extrabold">{selectedQuestion?.prompt}</div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Body language scan</div>
                  <div className="text-emerald-200 font-extrabold">Presence {presenceScore}</div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={eyeContact}
                    onChange={(e) => setEyeContact(e.target.value as 'low' | 'ok' | 'high')}
                    aria-label="Eye contact"
                    className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option value="low">Eye contact: low</option>
                    <option value="ok">Eye contact: ok</option>
                    <option value="high">Eye contact: strong</option>
                  </select>
                  <select
                    value={posture}
                    onChange={(e) => setPosture(e.target.value as 'slouched' | 'neutral' | 'upright')}
                    aria-label="Posture"
                    className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option value="slouched">Posture: slouched</option>
                    <option value="neutral">Posture: neutral</option>
                    <option value="upright">Posture: upright</option>
                  </select>
                  <select
                    value={gestures}
                    onChange={(e) => setGestures(e.target.value as 'none' | 'controlled' | 'excessive')}
                    aria-label="Gestures"
                    className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option value="none">Gestures: none</option>
                    <option value="controlled">Gestures: controlled</option>
                    <option value="excessive">Gestures: excessive</option>
                  </select>
                  <select
                    value={pace}
                    onChange={(e) => setPace(e.target.value as 'slow' | 'balanced' | 'fast')}
                    aria-label="Pace"
                    className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option value="slow">Pace: slow</option>
                    <option value="balanced">Pace: balanced</option>
                    <option value="fast">Pace: fast</option>
                  </select>
                  <select
                    value={confidence}
                    onChange={(e) => setConfidence(e.target.value as 'low' | 'ok' | 'high')}
                    aria-label="Confidence"
                    className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option value="low">Confidence: low</option>
                    <option value="ok">Confidence: ok</option>
                    <option value="high">Confidence: high</option>
                  </select>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Fillers</div>
                    <div className="mt-2 text-white font-extrabold">{voiceMetrics.fillers}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-white/70">
                  This scan is based on your selections and speech text. Use it to fix presentation gaps before you submit.
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Your answer</div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!hasSpeechSupport || micActive}
                    onClick={startMic}
                    className="h-10 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors disabled:opacity-60"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Mic className="w-4 h-4" />
                      Speak
                    </span>
                  </button>
                  <button
                    type="button"
                    disabled={!micActive}
                    onClick={stopMic}
                    className="h-10 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 font-bold transition-colors disabled:opacity-60"
                  >
                    Stop
                  </button>
                </div>
              </div>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer (or use Speak)…"
                className="mt-3 w-full min-h-[220px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              />

              {error ? <div className="mt-4 text-sm text-amber-200">{error}</div> : null}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={loading || !answer.trim()}
                  onClick={submit}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-60"
                >
                  <Sparkles className="w-4 h-4" />
                  {loading ? 'Coaching…' : 'Coach my answer'}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setAnswer('')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                >
                  Clear
                </button>
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">Feedback</div>
              <div className="mt-2 text-white/70">Results appear here after coaching.</div>

              {result ? (
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(result.score).map(([k, v]) => (
                      <div key={k} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">{k}</div>
                        <div className="mt-2 text-white font-extrabold">{v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Risk</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-200">
                        {result.redFlagRisk.level}
                      </div>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-white/75">
                      {result.redFlagRisk.reasons.slice(0, 4).map((x) => (
                        <div key={x} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span>{x}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Feedback</div>
                    <div className="mt-4 space-y-2 text-sm text-white/75">
                      {result.feedback.slice(0, 10).map((x) => (
                        <div key={x} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span>{x}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-200" />
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Improved answer</div>
                    </div>
                    <div className="mt-4 text-white/80 leading-relaxed whitespace-pre-wrap">{result.improvedAnswer}</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Cultural tips</div>
                    <div className="mt-4 space-y-2 text-sm text-white/75">
                      {result.culturalTips.slice(0, 6).map((x) => (
                        <div key={x} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span>{x}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-white/60">{result.disclaimer}</div>
                </div>
              ) : null}
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
