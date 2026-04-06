'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import LanguageSelect from '@/components/ai/LanguageSelect';
import { addOutcomeEvent, addProgressEvent, getCalibration } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, LineChart, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

type Result = {
  score: number;
  band: 'low' | 'medium' | 'high';
  estimatedSuccessRate: number;
  keyFactors: { factor: string; impact: 'positive' | 'neutral' | 'negative'; note: string }[];
  nextImprovements: string[];
  disclaimer: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

const COUNTRY_OPTIONS = [
  { id: 'usa', label: 'USA' },
  { id: 'uk', label: 'UK' },
  { id: 'canada', label: 'Canada' },
  { id: 'australia', label: 'Australia' },
  { id: 'eu', label: 'EU' }
] as const;

const EDUCATION_OPTIONS = ['High school', 'Diploma', 'Bachelor', 'Master', 'PhD'] as const;
const ENGLISH_OPTIONS = ['A2', 'B1 (Intermediate)', 'B2 (Upper Intermediate)', 'C1 (Advanced)', 'C2 (Proficient)'] as const;

const STRINGS: Record<
  string,
  {
    title: string;
    subtitle: string;
    inputs: string;
    predict: string;
    predicting: string;
    clear: string;
    calibration: string;
    useCalibration: string;
    results: string;
    recordOutcome: string;
    outcome: string;
    approved: string;
    rejected: string;
    pending: string;
    saveOutcome: string;
  }
> = {
  en: {
    title: 'Success Predictor',
    subtitle: 'Estimate risk band and success probability from profile signals and local calibration.',
    inputs: 'Inputs',
    predict: 'Predict',
    predicting: 'Predicting…',
    clear: 'Clear',
    calibration: 'Local calibration',
    useCalibration: 'Use local outcomes calibration',
    results: 'Results',
    recordOutcome: 'Record outcome',
    outcome: 'Outcome',
    approved: 'Approved',
    rejected: 'Rejected',
    pending: 'Pending',
    saveOutcome: 'Save outcome'
  },
  hi: {
    title: 'सक्सेस प्रेडिक्टर',
    subtitle: 'प्रोफ़ाइल संकेतों और लोकल कैलिब्रेशन से जोखिम और सफलता प्रतिशत का अनुमान।',
    inputs: 'इनपुट',
    predict: 'अनुमान',
    predicting: 'अनुमान हो रहा है…',
    clear: 'क्लियर',
    calibration: 'लोकल कैलिब्रेशन',
    useCalibration: 'लोकल आउटकम कैलिब्रेशन उपयोग करें',
    results: 'परिणाम',
    recordOutcome: 'आउटकम सेव करें',
    outcome: 'आउटकम',
    approved: 'स्वीकृत',
    rejected: 'अस्वीकृत',
    pending: 'लंबित',
    saveOutcome: 'सेव'
  },
  ar: {
    title: 'متنبئ النجاح',
    subtitle: 'تقدير مستوى المخاطر ونسبة النجاح بناءً على ملفك ومعايرة محلية.',
    inputs: 'المدخلات',
    predict: 'تنبؤ',
    predicting: 'جارٍ التنبؤ…',
    clear: 'مسح',
    calibration: 'المعايرة المحلية',
    useCalibration: 'استخدام معايرة النتائج المحلية',
    results: 'النتائج',
    recordOutcome: 'تسجيل النتيجة',
    outcome: 'النتيجة',
    approved: 'مقبول',
    rejected: 'مرفوض',
    pending: 'قيد الانتظار',
    saveOutcome: 'حفظ'
  },
  fr: {
    title: 'Prédicteur de réussite',
    subtitle: 'Estimation du risque et du taux de réussite selon votre profil et une calibration locale.',
    inputs: 'Entrées',
    predict: 'Prédire',
    predicting: 'Prédiction…',
    clear: 'Effacer',
    calibration: 'Calibration locale',
    useCalibration: 'Utiliser la calibration locale',
    results: 'Résultats',
    recordOutcome: 'Enregistrer le résultat',
    outcome: 'Résultat',
    approved: 'Accepté',
    rejected: 'Refusé',
    pending: 'En attente',
    saveOutcome: 'Enregistrer'
  },
  es: {
    title: 'Predictor de éxito',
    subtitle: 'Estimación de riesgo y probabilidad de éxito según tu perfil y calibración local.',
    inputs: 'Datos',
    predict: 'Predecir',
    predicting: 'Prediciendo…',
    clear: 'Limpiar',
    calibration: 'Calibración local',
    useCalibration: 'Usar calibración local',
    results: 'Resultados',
    recordOutcome: 'Registrar resultado',
    outcome: 'Resultado',
    approved: 'Aprobado',
    rejected: 'Rechazado',
    pending: 'Pendiente',
    saveOutcome: 'Guardar'
  }
};

export default function SuccessPredictorPage() {
  const [language, setLanguage] = useState('en');
  const t = STRINGS[language] || STRINGS.en;

  const [country, setCountry] = useState<(typeof COUNTRY_OPTIONS)[number]['id']>('canada');
  const [pathway, setPathway] = useState('Study');
  const [age, setAge] = useState<number | ''>('');
  const [education, setEducation] = useState<(typeof EDUCATION_OPTIONS)[number]>('Bachelor');
  const [experienceYears, setExperienceYears] = useState<number | ''>('');
  const [englishLevel, setEnglishLevel] = useState<(typeof ENGLISH_OPTIONS)[number]>('B2 (Upper Intermediate)');
  const [funds, setFunds] = useState('Clear bank statements + sponsor letter');
  const [travelHistory, setTravelHistory] = useState('Compliant travel and returns');
  const [ties, setTies] = useState('Family + job return plan');
  const [useCalibration, setUseCalibration] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const calibration = useMemo(() => (useCalibration ? getCalibration() : { approvalRate: 0, sampleSize: 0 }), [useCalibration]);

  const submit = async () => {
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/success-predictor', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          country,
          pathway,
          age: typeof age === 'number' ? age : undefined,
          education,
          experienceYears: typeof experienceYears === 'number' ? experienceYears : undefined,
          englishLevel,
          funds,
          travelHistory,
          ties,
          calibration
        })
      });
      const json = (await res.json().catch(() => null)) as Result | { error?: string } | null;
      if (!res.ok) {
        setError((json as { error?: string } | null)?.error || 'Failed to predict.');
        setLoading(false);
        return;
      }
      const data = json as Result;
      setResult(data);
      addProgressEvent({
        toolId: 'success-predictor',
        label: `Success prediction (${country.toUpperCase()} / ${pathway})`,
        score: data.score,
        meta: { country, pathway, estimatedSuccessRate: data.estimatedSuccessRate }
      });
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCountry('canada');
    setPathway('Study');
    setAge('');
    setEducation('Bachelor');
    setExperienceYears('');
    setEnglishLevel('B2 (Upper Intermediate)');
    setFunds('Clear bank statements + sponsor letter');
    setTravelHistory('Compliant travel and returns');
    setTies('Family + job return plan');
    setResult(null);
    setError('');
  };

  const bandStyle = (b: Result['band']) => {
    if (b === 'high') return 'text-emerald-200';
    if (b === 'medium') return 'text-amber-200';
    return 'text-rose-200';
  };

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <BadgeCheck className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">{t.title}</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">{t.subtitle}</p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="text-white font-extrabold text-xl">{t.inputs}</div>
                <LanguageSelect value={language} onChange={setLanguage} />
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as (typeof COUNTRY_OPTIONS)[number]['id'])}
                  aria-label="Country"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>

                <input
                  value={pathway}
                  onChange={(e) => setPathway(e.target.value)}
                  aria-label="Pathway"
                  placeholder="Pathway (Study / Work / PR / Visitor)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />

                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                  aria-label="Age"
                  placeholder="Age"
                  inputMode="numeric"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />

                <select
                  value={education}
                  onChange={(e) => setEducation(e.target.value as (typeof EDUCATION_OPTIONS)[number])}
                  aria-label="Education"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  {EDUCATION_OPTIONS.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>

                <input
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value === '' ? '' : Number(e.target.value))}
                  aria-label="Experience years"
                  placeholder="Experience (years)"
                  inputMode="numeric"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />

                <select
                  value={englishLevel}
                  onChange={(e) => setEnglishLevel(e.target.value as (typeof ENGLISH_OPTIONS)[number])}
                  aria-label="English level"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  {ENGLISH_OPTIONS.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <textarea
                  value={funds}
                  onChange={(e) => setFunds(e.target.value)}
                  aria-label="Funds"
                  placeholder="Funds proof summary"
                  className="w-full min-h-[110px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={travelHistory}
                  onChange={(e) => setTravelHistory(e.target.value)}
                  aria-label="Travel history"
                  placeholder="Travel history summary"
                  className="w-full min-h-[95px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={ties}
                  onChange={(e) => setTies(e.target.value)}
                  aria-label="Home ties"
                  placeholder="Home ties summary"
                  className="w-full min-h-[95px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="text-white font-extrabold">{t.calibration}</div>
                  <label className="inline-flex items-center gap-3 text-sm text-white/80">
                    <input
                      type="checkbox"
                      checked={useCalibration}
                      onChange={(e) => setUseCalibration(e.target.checked)}
                      className="h-4 w-4 accent-indigo-500"
                    />
                    <span>{t.useCalibration}</span>
                  </label>
                </div>
                <div className="mt-3 text-sm text-white/70">
                  Approval rate: <span className="text-white font-bold">{Math.round(calibration.approvalRate * 100)}%</span> · Sample:{' '}
                  <span className="text-white font-bold">{calibration.sampleSize}</span>
                </div>
              </div>

              {error ? <div className="mt-4 text-sm text-amber-200">{error}</div> : null}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled={loading || !pathway.trim()}
                  onClick={submit}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20 disabled:opacity-60"
                >
                  <Sparkles className="w-4 h-4" />
                  {loading ? t.predicting : t.predict}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                >
                  {t.clear}
                </button>
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="flex items-center gap-3">
                <LineChart className="w-5 h-5 text-emerald-200" />
                <div className="text-white font-extrabold text-xl">{t.results}</div>
              </div>
              <div className="mt-2 text-white/70">Results appear after prediction.</div>

              {result ? (
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Score</div>
                      <div className="mt-2 text-white font-extrabold text-2xl">{result.score}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Band</div>
                      <div className={`mt-2 font-extrabold text-2xl ${bandStyle(result.band)}`}>{result.band}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Estimate</div>
                      <div className="mt-2 text-white font-extrabold text-2xl">{result.estimatedSuccessRate}%</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Key factors</div>
                    <div className="mt-4 space-y-3 text-sm text-white/75">
                      {result.keyFactors.slice(0, 10).map((f) => (
                        <div key={`${f.factor}_${f.note}`} className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-white font-extrabold">{f.factor}</div>
                            <div className="text-white/70">{f.note}</div>
                          </div>
                          <div
                            className={`text-[10px] font-black uppercase tracking-[0.25em] ${
                              f.impact === 'positive' ? 'text-emerald-200' : f.impact === 'negative' ? 'text-rose-200' : 'text-white/60'
                            }`}
                          >
                            {f.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Next improvements</div>
                    <div className="mt-4 space-y-2 text-sm text-white/75">
                      {result.nextImprovements.slice(0, 8).map((x) => (
                        <div key={x} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span>{x}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-white font-extrabold">{t.recordOutcome}</div>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        aria-label={t.outcome}
                        defaultValue="pending"
                        id="outcomeSelect"
                        className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                      >
                        <option value="approved">{t.approved}</option>
                        <option value="rejected">{t.rejected}</option>
                        <option value="pending">{t.pending}</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('outcomeSelect') as HTMLSelectElement | null;
                          const outcome = (el?.value || 'pending') as 'approved' | 'rejected' | 'pending';
                          addOutcomeEvent({ toolId: 'success-predictor', country, pathway, outcome });
                        }}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors"
                      >
                        {t.saveOutcome} <ArrowRight className="w-4 h-4" />
                      </button>
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

