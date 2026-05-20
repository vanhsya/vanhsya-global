'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import LanguageSelect from '@/components/ai/LanguageSelect';
import { addProgressEvent } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { FileSignature, Sparkles, Copy, Download } from 'lucide-react';
import { useMemo, useState } from 'react';

type Result = {
  title: string;
  sop: string;
  outline: string[];
  personalizationChecklist: string[];
  disclaimer: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

export default function SOPGeneratorPage() {
  const [language, setLanguage] = useState('en');
  const [targetCountry, setTargetCountry] = useState('Canada');
  const [program, setProgram] = useState('Study');
  const [universityOrEmployer, setUniversityOrEmployer] = useState('');
  const [background, setBackground] = useState('');
  const [goals, setGoals] = useState('');
  const [ties, setTies] = useState('');
  const [achievements, setAchievements] = useState('');
  const [concerns, setConcerns] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const wordCount = useMemo(() => (background.trim().match(/\S+/g) || []).length, [background]);

  const buildFallback = (): Result => {
    const title = `Statement of Purpose — ${targetCountry} (${program})`;
    const outline = [
      'Introduction and objective',
      'Academic/professional background',
      'Why this program and destination',
      'Future plan and return ties',
      'Financial and compliance readiness',
      'Closing'
    ];
    const sop = [
      `I am applying for ${program}${universityOrEmployer.trim() ? ` at ${universityOrEmployer.trim()}` : ''} in ${targetCountry}.`,
      '',
      background.trim() || 'I have built a strong foundation through my education and professional experience.',
      '',
      goals.trim() || 'My goal is to develop specialized skills that align with my long-term career plan.',
      '',
      ties.trim() || 'I maintain strong ties to my home country through family, professional commitments, and clear post-completion plans.',
      '',
      achievements.trim() ? `Key achievements: ${achievements.trim()}` : 'I have consistently focused on measurable outcomes and continuous improvement.',
      '',
      concerns.trim()
        ? `I understand the application concerns and address them as follows: ${concerns.trim()}`
        : 'I understand the requirements and will comply fully with all immigration conditions.',
      '',
      'Thank you for considering my application.'
    ].join('\n');
    return {
      title,
      sop,
      outline,
      personalizationChecklist: [
        'Replace placeholders with exact dates, institutions, and evidence',
        'Add 2–3 concrete metrics or achievements',
        'Align program choice with your career plan',
        'Ensure ties and return plan are credible and consistent'
      ],
      disclaimer: 'Draft only. Verify accuracy, ensure consistency with documents, and consider legal review.'
    };
  };

  const run = async () => {
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/sop-generator', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          language,
          targetCountry,
          program,
          universityOrEmployer,
          background,
          goals,
          ties,
          achievements,
          concerns
        })
      });
      const json = (await res.json().catch(() => null)) as Result | { error?: string; offline?: boolean; result?: Result } | null;
      if (!res.ok) {
        setError((json as any)?.error || 'Failed to generate SOP.');
        setLoading(false);
        return;
      }
      const data = (json as any)?.result ? (json as any).result : (json as Result);
      setResult(data);
      addProgressEvent({
        toolId: 'sop-generator',
        label: `SOP (${targetCountry} • ${program})`,
        score: 80,
        meta: { country: targetCountry, program, words: wordCount }
      });
    } catch {
      setResult(buildFallback());
      setError('AI is unavailable. Generated a structured fallback SOP draft from your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const fullText = useMemo(() => {
    if (!result) return '';
    return `${result.title}\n\n${result.sop}\n\n${result.disclaimer}`;
  }, [result]);

  const copy = async () => {
    if (!fullText) return;
    try {
      await navigator.clipboard.writeText(fullText);
    } catch {
    }
  };

  const download = () => {
    if (!fullText) return;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sop_${targetCountry.replace(/[^a-z0-9-_]+/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_70%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <FileSignature className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">SOP Generator</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Generate a strong Statement of Purpose.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Provide your background and goals. Get a structured SOP draft plus a personalization checklist.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <div className="text-white font-extrabold text-xl">Inputs</div>
                </div>
                <LanguageSelect value={language} onChange={setLanguage} />
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  placeholder="Target country"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  placeholder="Program (Study / Work / Visitor)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={universityOrEmployer}
                  onChange={(e) => setUniversityOrEmployer(e.target.value)}
                  placeholder="University / Employer (optional)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30 sm:col-span-2"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <textarea
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="Your background (education, work, context)…"
                  className="min-h-[140px] px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="Your goals (short-term and long-term)…"
                  className="min-h-[120px] px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={ties}
                  onChange={(e) => setTies(e.target.value)}
                  placeholder="Home country ties and return plan…"
                  className="min-h-[110px] px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  placeholder="Key achievements (metrics help)…"
                  className="min-h-[90px] px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  placeholder="Known concerns to address (gaps, refusals, travel history)…"
                  className="min-h-[90px] px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              {error ? <div className="mt-4 text-sm font-bold text-amber-200">{error}</div> : null}

              <button
                type="button"
                onClick={run}
                disabled={loading || !targetCountry.trim() || !program.trim() || !background.trim()}
                className="mt-6 w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 font-extrabold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating…' : 'Generate SOP'}
              </button>
            </GlassCard>

            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-white font-extrabold text-xl">Output</div>
                  <div className="text-white/60 text-sm font-semibold">Review, personalize, and align with documents.</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copy}
                    disabled={!fullText}
                    className="px-4 h-10 rounded-xl bg-white/5 border border-white/10 text-white/80 font-bold disabled:opacity-50"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Copy className="w-4 h-4" /> Copy
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={download}
                    disabled={!fullText}
                    className="px-4 h-10 rounded-xl bg-white/5 border border-white/10 text-white/80 font-bold disabled:opacity-50"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Download className="w-4 h-4" /> Download
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-5">
                {!result ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70 font-semibold">
                    Provide your background and generate a draft SOP.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <pre className="whitespace-pre-wrap text-sm text-white/80 rounded-2xl border border-white/10 bg-white/5 p-6 overflow-auto max-h-[440px]">
                      {fullText}
                    </pre>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                      <div className="text-xs font-black uppercase tracking-[0.25em] text-white/60">Personalization checklist</div>
                      <div className="mt-3 text-sm text-white/80 space-y-1">
                        {result.personalizationChecklist.map((x) => (
                          <div key={x}>• {x}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
