'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import LanguageSelect from '@/components/ai/LanguageSelect';
import { DOCUMENT_CHECKLISTS, DocumentChecklist } from '@/data/ai/documentChecklists';
import { addProgressEvent } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, FileCheck2 } from 'lucide-react';

type Step = 'pack' | 'readiness';

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

export default function DocumentVerificationPage() {
  const [language, setLanguage] = useState('en');
  const [step, setStep] = useState<Step>('pack');
  const [checklistId, setChecklistId] = useState(DOCUMENT_CHECKLISTS[0]?.id || '');
  const checklist = useMemo(
    () => DOCUMENT_CHECKLISTS.find((c) => c.id === checklistId) || DOCUMENT_CHECKLISTS[0],
    [checklistId]
  );

  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (label: string) => {
    setChecked((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]));
  };

  const required = useMemo(() => checklist.items.filter((i) => i.required).map((i) => i.label), [checklist.items]);
  const completion = useMemo(() => {
    const selected = new Set(checked);
    const reqHit = required.filter((d) => selected.has(d)).length;
    return { reqHit, reqTotal: required.length, all: checked.length, total: checklist.items.length };
  }, [checked, required, checklist.items.length]);

  const save = () => {
    addProgressEvent({
      toolId: 'document-verification',
      label: `Document readiness (${checklist.country.toUpperCase()} • ${checklist.pathway})`,
      score: Math.round((completion.reqHit / Math.max(1, completion.reqTotal)) * 100),
      meta: {
        checklistId: checklist.id,
        requiredHit: completion.reqHit,
        requiredTotal: completion.reqTotal
      }
    });
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
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Document Verification</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Build a clean, verifiable document pack.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Use expert-structured checklists and track readiness. This does not replace official requirements.
            </p>
          </motion.div>

          <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep('pack')}
                className={`h-11 px-5 rounded-2xl border transition-colors font-extrabold ${
                  step === 'pack' ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                Pack
              </button>
              <button
                type="button"
                onClick={() => setStep('readiness')}
                className={`h-11 px-5 rounded-2xl border transition-colors font-extrabold ${
                  step === 'readiness' ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                Readiness
              </button>
            </div>
            <LanguageSelect value={language} onChange={setLanguage} />
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-5 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4">
                <div className="text-white font-extrabold text-xl">Checklist</div>
              </div>
              <div className="mt-4">
                <select
                  value={checklistId}
                  onChange={(e) => {
                    setChecklistId(e.target.value);
                    setChecked([]);
                  }}
                  aria-label="Checklist"
                  className="w-full h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  {DOCUMENT_CHECKLISTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Progress</div>
                <div className="mt-3 text-white font-extrabold">
                  Required: {completion.reqHit}/{completion.reqTotal}
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-300/80 via-purple-400/70 to-indigo-400/70"
                    style={{ width: `${Math.round((completion.reqHit / Math.max(1, completion.reqTotal)) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={save}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold transition-colors shadow-lg shadow-purple-500/20"
                >
                  Save progress <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>

            <GlassCard className="lg:col-span-7 p-7 border-white/10" hover={false}>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-200" />
                <div className="text-white font-extrabold text-xl">
                  {step === 'pack' ? 'Document pack' : 'Readiness checklist'}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {checklist.items.map((i) => {
                  const isOn = checked.includes(i.label);
                  return (
                    <button
                      key={i.label}
                      type="button"
                      onClick={() => toggle(i.label)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${
                        isOn ? 'bg-white/10 border-white/20' : 'bg-black/20 border-white/10 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-white font-extrabold">{i.label}</div>
                          {i.notes ? <div className="mt-2 text-sm text-white/60">{i.notes}</div> : null}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
                          {i.required ? 'Required' : 'Optional'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Verification tips</div>
                <div className="mt-4 space-y-2 text-sm text-white/75">
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span>Keep a single index document: filename, what it proves, and reference in forms.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span>Avoid unexplained deposits; add sponsor letters and consistent financial evidence.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40" />
                    <span>Ensure the story matches everywhere: SOP, forms, interview answers, and documents.</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

