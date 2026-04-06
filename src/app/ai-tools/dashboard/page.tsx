'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import LanguageSelect from '@/components/ai/LanguageSelect';
import {
  addOutcomeEvent,
  clearProgress,
  exportProgress,
  getAllEvents,
  getAllOutcomes,
  getCalibration
} from '@/lib/toolProgress';
import type { ToolId } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ClipboardCheck, Download, RefreshCcw, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type IntegrationStatus = {
  providers: { country: string; configured: boolean; baseUrlPresent: boolean; keyPresent: boolean }[];
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

const TOOL_LABELS: Record<ToolId, string> = {
  'ielts-trainer': 'IELTS Trainer',
  'immigration-simulations': 'Immigration Simulations',
  'visa-rejection-analyzer': 'Visa Rejection Analyzer',
  'visa-interview-coach': 'Visa Interview Coach',
  'document-verification': 'Document Verification',
  'timeline-optimizer': 'Timeline Optimizer',
  'success-predictor': 'Success Predictor'
};

const STRINGS: Record<
  string,
  {
    title: string;
    subtitle: string;
    language: string;
    summary: string;
    activity: string;
    outcomes: string;
    addOutcome: string;
    export: string;
    refresh: string;
    clear: string;
    country: string;
    pathway: string;
    notes: string;
    outcome: string;
    approved: string;
    rejected: string;
    pending: string;
    save: string;
    integrations: string;
  }
> = {
  en: {
    title: 'Progress Dashboard',
    subtitle: 'Local-first tracking across tools: sessions, scores, and outcomes.',
    language: 'Language',
    summary: 'Summary',
    activity: 'Recent activity',
    outcomes: 'Outcomes',
    addOutcome: 'Add outcome',
    export: 'Export JSON',
    refresh: 'Refresh',
    clear: 'Clear all',
    country: 'Country',
    pathway: 'Pathway',
    notes: 'Notes',
    outcome: 'Outcome',
    approved: 'Approved',
    rejected: 'Rejected',
    pending: 'Pending',
    save: 'Save',
    integrations: 'Official API integrations'
  },
  hi: {
    title: 'प्रोग्रेस डैशबोर्ड',
    subtitle: 'सभी टूल्स में लोकल ट्रैकिंग: सेशन, स्कोर और आउटकम।',
    language: 'भाषा',
    summary: 'सारांश',
    activity: 'हाल की गतिविधि',
    outcomes: 'आउटकम',
    addOutcome: 'आउटकम जोड़ें',
    export: 'JSON एक्सपोर्ट',
    refresh: 'रीफ्रेश',
    clear: 'सब क्लियर',
    country: 'देश',
    pathway: 'पाथवे',
    notes: 'नोट्स',
    outcome: 'आउटकम',
    approved: 'स्वीकृत',
    rejected: 'अस्वीकृत',
    pending: 'लंबित',
    save: 'सेव',
    integrations: 'ऑफिशियल API इंटीग्रेशन'
  },
  ar: {
    title: 'لوحة التقدم',
    subtitle: 'تتبع محلي عبر الأدوات: الجلسات والنتائج والمخرجات.',
    language: 'اللغة',
    summary: 'ملخص',
    activity: 'النشاط الأخير',
    outcomes: 'النتائج',
    addOutcome: 'إضافة نتيجة',
    export: 'تصدير JSON',
    refresh: 'تحديث',
    clear: 'مسح الكل',
    country: 'الدولة',
    pathway: 'المسار',
    notes: 'ملاحظات',
    outcome: 'النتيجة',
    approved: 'مقبول',
    rejected: 'مرفوض',
    pending: 'قيد الانتظار',
    save: 'حفظ',
    integrations: 'تكاملات API الرسمية'
  },
  fr: {
    title: 'Tableau de bord',
    subtitle: 'Suivi local des outils : sessions, scores et résultats.',
    language: 'Langue',
    summary: 'Résumé',
    activity: 'Activité récente',
    outcomes: 'Résultats',
    addOutcome: 'Ajouter un résultat',
    export: 'Exporter JSON',
    refresh: 'Rafraîchir',
    clear: 'Tout effacer',
    country: 'Pays',
    pathway: 'Voie',
    notes: 'Notes',
    outcome: 'Résultat',
    approved: 'Accepté',
    rejected: 'Refusé',
    pending: 'En attente',
    save: 'Enregistrer',
    integrations: 'Intégrations API officielles'
  },
  es: {
    title: 'Panel de progreso',
    subtitle: 'Seguimiento local: sesiones, puntuaciones y resultados.',
    language: 'Idioma',
    summary: 'Resumen',
    activity: 'Actividad reciente',
    outcomes: 'Resultados',
    addOutcome: 'Agregar resultado',
    export: 'Exportar JSON',
    refresh: 'Actualizar',
    clear: 'Borrar todo',
    country: 'País',
    pathway: 'Vía',
    notes: 'Notas',
    outcome: 'Resultado',
    approved: 'Aprobado',
    rejected: 'Rechazado',
    pending: 'Pendiente',
    save: 'Guardar',
    integrations: 'Integraciones API oficiales'
  }
};

export default function AIToolsDashboardPage() {
  const [language, setLanguage] = useState('en');
  const t = STRINGS[language] || STRINGS.en;

  const [refreshTick, setRefreshTick] = useState(0);
  const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatus | null>(null);

  const [outcomeTool, setOutcomeTool] = useState<ToolId>('visa-interview-coach');
  const [outcomeCountry, setOutcomeCountry] = useState('canada');
  const [outcomePathway, setOutcomePathway] = useState('study');
  const [outcomeValue, setOutcomeValue] = useState<'approved' | 'rejected' | 'pending'>('pending');
  const [outcomeNotes, setOutcomeNotes] = useState('');

  const store = useMemo(() => {
    void refreshTick;
    return exportProgress();
  }, [refreshTick]);
  const events = useMemo(() => {
    void refreshTick;
    return getAllEvents();
  }, [refreshTick]);
  const outcomes = useMemo(() => {
    void refreshTick;
    return getAllOutcomes();
  }, [refreshTick]);
  const calibration = useMemo(() => {
    void refreshTick;
    return getCalibration();
  }, [refreshTick]);

  const toolCounts = useMemo(() => {
    const counts: Partial<Record<ToolId, number>> = {};
    for (const e of events) counts[e.toolId] = (counts[e.toolId] || 0) + 1;
    return counts;
  }, [events]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/integrations/immigration/status')
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setIntegrationStatus(data as IntegrationStatus);
      })
      .catch(() => {
        if (cancelled) return;
        setIntegrationStatus(null);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshTick]);

  const exportJson = async () => {
    const json = JSON.stringify(store, null, 2);
    try {
      await navigator.clipboard.writeText(json);
    } catch {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vanhsya_ai_tools_progress.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const doClear = () => {
    const ok = window.confirm('Clear all local AI tools progress and outcomes?');
    if (!ok) return;
    clearProgress();
    setRefreshTick((x) => x + 1);
  };

  const addOutcome = () => {
    addOutcomeEvent({
      toolId: outcomeTool,
      country: outcomeCountry.trim() || undefined,
      pathway: outcomePathway.trim() || undefined,
      outcome: outcomeValue,
      notes: outcomeNotes.trim() || undefined
    });
    setOutcomeNotes('');
    setRefreshTick((x) => x + 1);
  };

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_75%_25%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(99,102,241,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="mt-10 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">{t.language}</div>
              <LanguageSelect value={language} onChange={setLanguage} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={exportJson}
                className="h-10 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t.export}
              </button>
              <button
                type="button"
                onClick={() => setRefreshTick((x) => x + 1)}
                className="h-10 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 font-bold transition-colors inline-flex items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                {t.refresh}
              </button>
              <button
                type="button"
                onClick={doClear}
                className="h-10 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-400/20 text-rose-100 font-bold transition-colors inline-flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {t.clear}
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-4 p-7 border-white/10" hover={false}>
              <div className="flex items-center gap-3">
                <ClipboardCheck className="w-5 h-5 text-emerald-200" />
                <div className="text-white font-extrabold text-xl">{t.summary}</div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Events</div>
                  <div className="mt-2 text-white font-extrabold text-2xl">{events.length}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Outcomes</div>
                  <div className="mt-2 text-white font-extrabold text-2xl">{outcomes.length}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Approval</div>
                  <div className="mt-2 text-white font-extrabold text-2xl">{Math.round(calibration.approvalRate * 100)}%</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">Sample</div>
                  <div className="mt-2 text-white font-extrabold text-2xl">{calibration.sampleSize}</div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">By tool</div>
                <div className="mt-4 space-y-3">
                  {(Object.keys(TOOL_LABELS) as ToolId[]).map((toolId) => (
                    <div key={toolId} className="flex items-center justify-between gap-4">
                      <div className="text-white/80 font-bold">{TOOL_LABELS[toolId]}</div>
                      <div className="text-white font-extrabold">{toolCounts[toolId] || 0}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">{t.integrations}</div>
                <div className="mt-4 space-y-2 text-sm text-white/75">
                  {integrationStatus?.providers?.length ? (
                    integrationStatus.providers.map((p) => (
                      <div key={p.country} className="flex items-center justify-between gap-4">
                        <div className="text-white font-bold">{p.country.toUpperCase()}</div>
                        <div
                          className={`text-[10px] font-black uppercase tracking-[0.25em] ${
                            p.configured ? 'text-emerald-200' : 'text-white/50'
                          }`}
                        >
                          {p.configured ? 'configured' : 'not set'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-white/60">No official connectors configured.</div>
                  )}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-4 p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">{t.activity}</div>
              <div className="mt-2 text-white/70">Latest sessions and practice logs.</div>

              <div className="mt-6 space-y-3 max-h-[540px] overflow-auto pr-1">
                {events.slice(0, 30).map((e) => (
                  <div key={e.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-white font-extrabold">{TOOL_LABELS[e.toolId]}</div>
                        <div className="mt-1 text-sm text-white/70">{e.label}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-extrabold">{typeof e.score === 'number' ? e.score : '—'}</div>
                        <div className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/50">
                          {new Date(e.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {!events.length ? <div className="text-white/60">No activity yet.</div> : null}
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-4 p-7 border-white/10" hover={false}>
              <div className="text-white font-extrabold text-xl">{t.outcomes}</div>
              <div className="mt-2 text-white/70">Record real outcomes to refine calibration for predictions.</div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-white font-extrabold">{t.addOutcome}</div>
                <div className="mt-4 space-y-3">
                  <select
                    value={outcomeTool}
                    onChange={(e) => setOutcomeTool(e.target.value as ToolId)}
                    aria-label="Tool"
                    className="h-11 w-full px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    {(Object.keys(TOOL_LABELS) as ToolId[]).map((toolId) => (
                      <option key={toolId} value={toolId}>
                        {TOOL_LABELS[toolId]}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      value={outcomeCountry}
                      onChange={(e) => setOutcomeCountry(e.target.value)}
                      aria-label={t.country}
                      placeholder={t.country}
                      className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    />
                    <input
                      value={outcomePathway}
                      onChange={(e) => setOutcomePathway(e.target.value)}
                      aria-label={t.pathway}
                      placeholder={t.pathway}
                      className="h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                    />
                  </div>
                  <select
                    value={outcomeValue}
                    onChange={(e) => setOutcomeValue(e.target.value as 'approved' | 'rejected' | 'pending')}
                    aria-label={t.outcome}
                    className="h-11 w-full px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  >
                    <option value="approved">{t.approved}</option>
                    <option value="rejected">{t.rejected}</option>
                    <option value="pending">{t.pending}</option>
                  </select>
                  <textarea
                    value={outcomeNotes}
                    onChange={(e) => setOutcomeNotes(e.target.value)}
                    aria-label={t.notes}
                    placeholder={t.notes}
                    className="w-full min-h-[90px] p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                  />
                  <button
                    type="button"
                    onClick={addOutcome}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                  >
                    {t.save} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-3 max-h-[250px] overflow-auto pr-1">
                {outcomes.slice(0, 20).map((o) => (
                  <div key={o.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-white font-extrabold">{o.toolId ? TOOL_LABELS[o.toolId] : 'Outcome'}</div>
                        <div className="mt-1 text-sm text-white/70">
                          {(o.country || '').toUpperCase()} {o.pathway ? `· ${o.pathway}` : ''}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-[10px] font-black uppercase tracking-[0.25em] ${
                            o.outcome === 'approved' ? 'text-emerald-200' : o.outcome === 'rejected' ? 'text-rose-200' : 'text-white/60'
                          }`}
                        >
                          {o.outcome}
                        </div>
                        <div className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-white/50">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    {o.notes ? <div className="mt-2 text-sm text-white/70">{o.notes}</div> : null}
                  </div>
                ))}
                {!outcomes.length ? <div className="text-white/60">No outcomes recorded yet.</div> : null}
              </div>

              <button
                type="button"
                onClick={exportJson}
                className="mt-6 h-11 w-full px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                {t.export}
              </button>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
