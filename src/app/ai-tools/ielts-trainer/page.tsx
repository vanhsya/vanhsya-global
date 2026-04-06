'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import LanguageSelect from '@/components/ai/LanguageSelect';
import { IELTS_ADAPTIVE_MODULES } from '@/data/ai/ielts';
import { addProgressEvent } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, BrainCircuit, FileText, Mic, Sparkles } from 'lucide-react';

type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

type WritingResult = {
  bandEstimate: number;
  criteria: Record<string, { band: number; notes: string[] }>;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  studyPlan: { days: { day: number; focus: string; drills: string[] }[] };
  disclaimer: string;
};

type SpeakingResult = {
  prompt: string;
  bandEstimate: number;
  criteria: Record<string, { band: number; notes: string[] }>;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  drills: string[];
  disclaimer: string;
};

type Tab = 'writing' | 'speaking' | 'plan';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

const countWords = (s: string) => (s.trim().match(/\S+/g) || []).length;

export default function IELTSTrainerPage() {
  const [language, setLanguage] = useState('en');
  const [tab, setTab] = useState<Tab>('writing');

  const [writing, setWriting] = useState('');
  const [targetBand, setTargetBand] = useState(7);
  const [loadingWriting, setLoadingWriting] = useState(false);
  const [writingResult, setWritingResult] = useState<WritingResult | null>(null);
  const [error, setError] = useState('');

  const speakingSupported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const w = window as unknown as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown };
    return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
  }, []);

  const [speakingPrompt, setSpeakingPrompt] = useState(
    'Describe a time you solved a difficult problem. What was the situation, what did you do, and what was the result?'
  );
  const [speakingTranscript, setSpeakingTranscript] = useState('');
  const [speakingActive, setSpeakingActive] = useState(false);
  const [loadingSpeakingEval, setLoadingSpeakingEval] = useState(false);
  const [speakingEval, setSpeakingEval] = useState<SpeakingResult | null>(null);
  const [speakingEvalError, setSpeakingEvalError] = useState('');
  const speakingStartAt = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startSpeaking = () => {
    if (typeof window === 'undefined') return;
    const w = window as unknown as { webkitSpeechRecognition?: unknown; SpeechRecognition?: unknown };
    const SpeechRec = (w.SpeechRecognition || w.webkitSpeechRecognition) as
      | (new () => SpeechRecognition)
      | undefined;
    if (!SpeechRec) return;

    const rec = new SpeechRec();
    rec.lang = language;
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = (event: SpeechRecognitionEvent) => {
      let full = '';
      for (let i = 0; i < event.results.length; i += 1) {
        full += `${event.results[i][0]?.transcript ?? ''} `;
      }
      setSpeakingTranscript(full.trim());
    };
    rec.onerror = () => {
      setSpeakingActive(false);
    };
    rec.onend = () => {
      setSpeakingActive(false);
    };

    recognitionRef.current = rec;
    speakingStartAt.current = Date.now();
    setSpeakingTranscript('');
    setSpeakingActive(true);
    rec.start();
  };

  const stopSpeaking = () => {
    const rec = recognitionRef.current;
    recognitionRef.current = null;
    if (rec) rec.stop();
  };

  const speakingMetrics = useMemo(() => {
    const words = countWords(speakingTranscript);
    const seconds =
      speakingStartAt.current && speakingActive ? Math.max(1, (Date.now() - speakingStartAt.current) / 1000) : null;
    const durationSeconds =
      speakingStartAt.current && !speakingActive ? null : seconds;
    const wpm = durationSeconds ? Math.round((words / durationSeconds) * 60) : null;
    const fillers = (speakingTranscript.toLowerCase().match(/\b(um|uh|like|you know)\b/g) || []).length;
    return { words, wpm, fillers };
  }, [speakingTranscript, speakingActive]);

  const evaluateSpeaking = async () => {
    setSpeakingEvalError('');
    setLoadingSpeakingEval(true);
    setSpeakingEval(null);
    try {
      const res = await fetch('/api/ai/ielts/speaking', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt: speakingPrompt, transcript: speakingTranscript, targetBand, language })
      });
      const json = (await res.json().catch(() => null)) as SpeakingResult | { error?: string } | null;
      if (!res.ok) {
        setSpeakingEvalError((json as { error?: string } | null)?.error || 'Failed to evaluate speaking.');
        setLoadingSpeakingEval(false);
        return;
      }
      const data = json as SpeakingResult;
      setSpeakingEval(data);
      addProgressEvent({
        toolId: 'ielts-trainer',
        label: `Speaking evaluation (Band ${data.bandEstimate})`,
        score: Math.round((data.bandEstimate / 9) * 100),
        meta: { words: speakingMetrics.words, fillers: speakingMetrics.fillers, targetBand }
      });
      setTab('plan');
    } catch {
      setSpeakingEvalError('Network error');
    } finally {
      setLoadingSpeakingEval(false);
    }
  };

  const recommendedModules = useMemo(() => {
    const areas = new Set<string>();
    if (writingResult?.criteria) {
      const c = writingResult.criteria as Record<string, { band: number }>;
      const threshold = Math.max(1, targetBand - 0.5);
      if (typeof c.taskAchievement?.band === 'number' && c.taskAchievement.band < threshold) areas.add('writing_task_response');
      if (typeof c.coherenceCohesion?.band === 'number' && c.coherenceCohesion.band < threshold) areas.add('writing_cohesion');
      if (typeof c.lexicalResource?.band === 'number' && c.lexicalResource.band < threshold) areas.add('writing_vocabulary');
      if (typeof c.grammarRangeAccuracy?.band === 'number' && c.grammarRangeAccuracy.band < threshold) areas.add('writing_grammar');
    }
    if (speakingEval?.criteria) {
      const c = speakingEval.criteria as Record<string, { band: number }>;
      const threshold = Math.max(1, targetBand - 0.5);
      if (typeof c.fluencyCoherence?.band === 'number' && c.fluencyCoherence.band < threshold) {
        areas.add('speaking_fluency');
        areas.add('speaking_coherence');
      }
      if (typeof c.pronunciation?.band === 'number' && c.pronunciation.band < threshold) areas.add('speaking_pronunciation');
    }
    if (speakingMetrics.fillers >= 6) areas.add('speaking_fluency');
    return IELTS_ADAPTIVE_MODULES.filter((m) => areas.has(m.area));
  }, [writingResult, speakingEval, targetBand, speakingMetrics.fillers]);

  const evaluateWriting = async () => {
    setError('');
    setLoadingWriting(true);
    setWritingResult(null);
    try {
      const res = await fetch('/api/ai/ielts/writing', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text: writing, task: 'task2', targetBand, language })
      });
      const json = (await res.json().catch(() => null)) as WritingResult | { error?: string } | null;
      if (!res.ok) {
        setError((json as { error?: string } | null)?.error || 'Failed to evaluate writing.');
        setLoadingWriting(false);
        return;
      }
      const result = json as WritingResult;
      setWritingResult(result);
      addProgressEvent({
        toolId: 'ielts-trainer',
        label: `Writing evaluation (Band ${result.bandEstimate})`,
        score: Math.round((result.bandEstimate / 9) * 100),
        meta: { words: countWords(writing), targetBand }
      });
      setTab('plan');
    } catch {
      setError('Network error');
    } finally {
      setLoadingWriting(false);
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
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">IELTS Trainer AI</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Adaptive prep for students and professionals.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Writing band estimate + actionable improvements, speaking practice with voice recognition, and a personalized 14-day plan.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTab('writing')}
                className={`h-11 px-5 rounded-2xl border transition-colors font-extrabold ${
                  tab === 'writing' ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-200" />
                  Writing
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTab('speaking')}
                className={`h-11 px-5 rounded-2xl border transition-colors font-extrabold ${
                  tab === 'speaking' ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <Mic className="w-4 h-4 text-purple-200" />
                  Speaking
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTab('plan')}
                className={`h-11 px-5 rounded-2xl border transition-colors font-extrabold ${
                  tab === 'plan' ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-emerald-200" />
                  Plan
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Language</div>
              <LanguageSelect value={language} onChange={setLanguage} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {tab === 'writing' ? (
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div>
                    <div className="text-white font-extrabold text-2xl">Writing assessment</div>
                    <div className="mt-2 text-white/70">
                      Paste Task 2 writing. Get a conservative band estimate with criteria-level feedback.
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Target band</div>
                    <select
                      value={targetBand}
                      onChange={(e) => setTargetBand(Number(e.target.value))}
                      aria-label="Target band"
                      className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    >
                      {[5, 5.5, 6, 6.5, 7, 7.5, 8].map((b) => (
                        <option key={String(b)} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <textarea
                    value={writing}
                    onChange={(e) => setWriting(e.target.value)}
                    placeholder="Paste your IELTS Writing Task 2 response here…"
                    className="w-full min-h-[240px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                  <div className="mt-3 text-sm text-white/60">
                    Words: <span className="text-white font-bold">{countWords(writing)}</span>
                  </div>
                </div>

                {error ? <div className="mt-4 text-sm text-amber-200">{error}</div> : null}

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    disabled={loadingWriting}
                    onClick={evaluateWriting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-60"
                  >
                    <Sparkles className="w-4 h-4" />
                    {loadingWriting ? 'Evaluating…' : 'Evaluate writing'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setWriting('')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </GlassCard>
            ) : null}

            {tab === 'speaking' ? (
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div>
                    <div className="text-white font-extrabold text-2xl">Real-time speaking practice</div>
                    <div className="mt-2 text-white/70">
                      Uses browser voice recognition where supported. Transcript and basic fluency metrics are tracked locally.
                    </div>
                  </div>
                  <div className="text-sm text-white/60">
                    {speakingSupported ? (
                      <span className="text-emerald-200 font-bold">Voice recognition supported</span>
                    ) : (
                      <span className="text-amber-200 font-bold">Voice recognition not supported</span>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-6">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Prompt</div>
                    <textarea
                      value={speakingPrompt}
                      onChange={(e) => setSpeakingPrompt(e.target.value)}
                      placeholder="Enter a speaking prompt…"
                      className="mt-3 w-full min-h-[120px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    />

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        disabled={!speakingSupported || speakingActive}
                        onClick={startSpeaking}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors disabled:opacity-60"
                      >
                        <Mic className="w-4 h-4" />
                        Start
                      </button>
                      <button
                        type="button"
                        disabled={!speakingSupported || !speakingActive}
                        onClick={stopSpeaking}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors disabled:opacity-60"
                      >
                        Stop
                      </button>
                      <button
                        type="button"
                        onClick={() => setSpeakingTranscript('')}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 font-bold transition-colors"
                      >
                        Reset transcript
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Transcript</div>
                    <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 min-h-[120px] text-white/80 leading-relaxed">
                      {speakingTranscript || 'Start speaking to generate transcript…'}
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Words</div>
                        <div className="mt-2 text-white font-extrabold">{speakingMetrics.words}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">WPM</div>
                        <div className="mt-2 text-white font-extrabold">{speakingMetrics.wpm ?? '—'}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Fillers</div>
                        <div className="mt-2 text-white font-extrabold">{speakingMetrics.fillers}</div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <button
                        type="button"
                        disabled={!speakingTranscript}
                        onClick={() =>
                          addProgressEvent({
                            toolId: 'ielts-trainer',
                            label: 'Speaking practice',
                            score: speakingMetrics.wpm ? Math.max(1, Math.min(100, Math.round((speakingMetrics.wpm / 170) * 100))) : undefined,
                            meta: { words: speakingMetrics.words, fillers: speakingMetrics.fillers }
                          })
                        }
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors disabled:opacity-60"
                      >
                        Save session to dashboard <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-5">
                      <button
                        type="button"
                        disabled={!speakingTranscript || loadingSpeakingEval}
                        onClick={evaluateSpeaking}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-60"
                      >
                        <Sparkles className="w-4 h-4" />
                        {loadingSpeakingEval ? 'Evaluating…' : 'Evaluate speaking (AI)'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      {speakingEvalError ? <div className="mt-3 text-sm text-amber-200">{speakingEvalError}</div> : null}
                    </div>

                    {speakingEval ? (
                      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                          <div className="text-white font-extrabold">AI speaking feedback</div>
                          <div className="text-amber-200 font-extrabold">Band {speakingEval.bandEstimate}</div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          {Object.entries(speakingEval.criteria).map(([k, v]) => (
                            <div key={k} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">{k}</div>
                              <div className="mt-2 text-white font-extrabold">{v.band}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Improvements</div>
                            <div className="mt-3 space-y-2 text-sm text-white/75">
                              {speakingEval.improvements.slice(0, 6).map((x) => (
                                <div key={x} className="flex items-start gap-2">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                                  <span>{x}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Drills</div>
                            <div className="mt-3 space-y-2 text-sm text-white/75">
                              {speakingEval.drills.slice(0, 6).map((x) => (
                                <div key={x} className="flex items-start gap-2">
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                                  <span>{x}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 text-sm text-white/60">{speakingEval.disclaimer}</div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </GlassCard>
            ) : null}

            {tab === 'plan' ? (
              <GlassCard className="p-7 border-white/10" hover={false}>
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div>
                    <div className="text-white font-extrabold text-2xl">Personalized plan</div>
                    <div className="mt-2 text-white/70">Generated from your latest evaluation. Use the dashboard to track completion.</div>
                  </div>
                </div>

                {writingResult ? (
                  <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Band estimate</div>
                      <div className="mt-3 text-4xl font-extrabold text-amber-200">{writingResult.bandEstimate}</div>
                      <div className="mt-4 text-sm text-white/70 leading-relaxed">{writingResult.disclaimer}</div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {Object.entries(writingResult.criteria).map(([k, v]) => (
                          <div key={k} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">{k}</div>
                            <div className="mt-2 text-white font-extrabold">{v.band}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-7">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                          <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Improvements</div>
                          <div className="mt-4 space-y-3 text-sm text-white/75">
                            {writingResult.improvements.slice(0, 8).map((i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                                <span>{i}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                          <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">14-day plan</div>
                          <div className="mt-4 space-y-3 text-sm text-white/75">
                            {writingResult.studyPlan.days.slice(0, 7).map((d) => (
                              <div key={d.day} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                <div className="flex items-center justify-between gap-4">
                                  <div className="text-white font-extrabold">Day {d.day}</div>
                                  <div className="text-white/60 text-xs">{d.focus}</div>
                                </div>
                                <div className="mt-3 space-y-2">
                                  {d.drills.slice(0, 2).map((x) => (
                                    <div key={x} className="flex items-start gap-2">
                                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                                      <span>{x}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Adaptive modules</div>
                        <div className="mt-3 text-sm text-white/70">Recommended drills update after writing and speaking evaluations.</div>
                        <div className="mt-5 space-y-3">
                          {(recommendedModules.length ? recommendedModules : IELTS_ADAPTIVE_MODULES.slice(0, 6)).map((m) => (
                            <div key={m.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                              <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                  <div className="text-white font-extrabold">{m.title}</div>
                                  <div className="mt-1 text-xs text-white/60">{m.area}</div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    addProgressEvent({
                                      toolId: 'ielts-trainer',
                                      label: `Module complete: ${m.title}`,
                                      score: 100,
                                      meta: { moduleId: m.id, area: m.area }
                                    })
                                  }
                                  className="h-10 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                                >
                                  Mark complete <ArrowRight className="w-4 h-4 inline-block" />
                                </button>
                              </div>
                              <div className="mt-4 space-y-2 text-sm text-white/75">
                                {m.drills.slice(0, 3).map((x) => (
                                  <div key={x} className="flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                                    <span>{x}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 text-white/70">Run a writing evaluation to generate your plan.</div>
                )}
              </GlassCard>
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
