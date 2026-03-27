"use client";

import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, FileWarning, Gavel, Landmark, ShieldAlert, Wallet } from "lucide-react";

type ScamType =
  | "Fake Agent / Consultancy"
  | "Fake Job Offer"
  | "Embassy / Government Impersonation"
  | "Document Fraud"
  | "Payment / Wallet Scam"
  | "Other";

type Severity = "Low" | "Medium" | "High" | "Critical";

type Report = {
  id: string;
  ts: number;
  type: ScamType;
  severity: Severity;
  country: string;
  amountLost?: string;
  summary: string;
  proofLink?: string;
  contactPreference: "WhatsApp" | "Email" | "Call";
  anonymous: boolean;
};

const STORAGE_KEY = "vanhsya_expose_v1";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function createId(prefix: string) {
  const r = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}_${r}`;
}

export default function ExposePage() {
  const [mounted, setMounted] = React.useState(false);
  const [reports, setReports] = React.useState<Report[]>([]);

  const [type, setType] = React.useState<ScamType>("Fake Agent / Consultancy");
  const [severity, setSeverity] = React.useState<Severity>("High");
  const [country, setCountry] = React.useState("");
  const [amountLost, setAmountLost] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [proofLink, setProofLink] = React.useState("");
  const [contactPreference, setContactPreference] = React.useState<Report["contactPreference"]>("WhatsApp");
  const [anonymous, setAnonymous] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
    const parsed = safeParse<{ reports?: Report[] }>(window.localStorage.getItem(STORAGE_KEY));
    setReports((parsed?.reports ?? []).slice().sort((a, b) => b.ts - a.ts));
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ reports }));
  }, [mounted, reports]);

  const submitReport = () => {
    const normalizedCountry = country.trim();
    const normalizedSummary = summary.trim();
    if (!normalizedCountry || !normalizedSummary) return;

    const report: Report = {
      id: createId("rep"),
      ts: Date.now(),
      type,
      severity,
      country: normalizedCountry,
      amountLost: amountLost.trim() || undefined,
      summary: normalizedSummary,
      proofLink: proofLink.trim() || undefined,
      contactPreference,
      anonymous,
    };

    setReports((prev) => [report, ...prev]);
    setCountry("");
    setAmountLost("");
    setSummary("");
    setProofLink("");
    setContactPreference("WhatsApp");
    setAnonymous(true);
    setSeverity("High");
    setType("Fake Agent / Consultancy");
  };

  return (
    <div className="min-h-screen text-white">
      <Navigation />

      <section className="pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/80">
              <ShieldAlert className="h-4 w-4" />
              Expose + Protection
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Cheated by agents or scams?
              </span>{" "}
              <span className="bg-gradient-to-r from-amber-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                We’re here to help.
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Report what happened, protect others, and connect to dedicated immigration lawyers, criminal lawyers, and financial advisors.
              This is a community safety layer inside VANHSYA.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <GlassCard className="p-8 border-white/10" hover={false}>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Submit a report</div>
                  <span className="neo-badge neo-badge-security">No backend</span>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Scam type</span>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as ScamType)}
                      aria-label="Scam type"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    >
                      {[
                        "Fake Agent / Consultancy",
                        "Fake Job Offer",
                        "Embassy / Government Impersonation",
                        "Document Fraud",
                        "Payment / Wallet Scam",
                        "Other",
                      ].map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Severity</span>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value as Severity)}
                      aria-label="Severity"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    >
                      {["Low", "Medium", "High", "Critical"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Country / region</span>
                    <input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      aria-label="Country"
                      placeholder="Where it happened"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    />
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Amount lost (optional)</span>
                    <input
                      value={amountLost}
                      onChange={(e) => setAmountLost(e.target.value)}
                      aria-label="Amount lost"
                      placeholder="e.g., 1200 USD"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    />
                  </label>
                </div>

                <div className="mt-4 space-y-4">
                  <label className="space-y-2 block">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">What happened?</span>
                    <textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      aria-label="Summary"
                      rows={6}
                      placeholder="Describe the scam in detail. Do not post passport/OTP/bank details."
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40 resize-none"
                    />
                  </label>

                  <label className="space-y-2 block">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Proof link (optional)</span>
                    <input
                      value={proofLink}
                      onChange={(e) => setProofLink(e.target.value)}
                      aria-label="Proof link"
                      placeholder="Google Drive / Dropbox link (public-safe)"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    />
                  </label>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <label className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Contact preference</span>
                    <select
                      value={contactPreference}
                      onChange={(e) => setContactPreference(e.target.value as Report["contactPreference"])}
                      aria-label="Contact preference"
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                    >
                      {["WhatsApp", "Email", "Call"].map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      aria-label="Anonymous"
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-black text-white/90">Post anonymously</span>
                  </label>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={submitReport}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black hover:from-amber-500 hover:to-amber-700 transition-colors"
                  >
                    Submit report <ArrowRight className="h-5 w-5" />
                  </button>
                  <Link
                    href="/contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-white font-black transition-colors"
                  >
                    Talk to VANHSYA <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <GlassCard className="p-6 border-white/10" hover={false}>
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Dedicated help routes</div>
                <div className="mt-5 grid grid-cols-1 gap-3">
                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
                    <div className="flex items-center gap-3">
                      <Landmark className="h-5 w-5 text-purple-200" />
                      <div className="font-black text-white">Immigration Lawyers</div>
                    </div>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      Strategy reviews, affidavit support, documentation correction, and lawful escalation paths.
                    </p>
                    <div className="mt-4">
                      <Link href="/consultation" className="inline-flex items-center gap-2 text-purple-200 hover:text-white font-black">
                        Book consult <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
                    <div className="flex items-center gap-3">
                      <Gavel className="h-5 w-5 text-amber-200" />
                      <div className="font-black text-white">Criminal Lawyers</div>
                    </div>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      Fraud complaint guidance, evidence packaging, and legal routes depending on jurisdiction.
                    </p>
                    <div className="mt-4">
                      <a
                        href={COMPANY.whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black"
                      >
                        WhatsApp support <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-emerald-200" />
                      <div className="font-black text-white">Financial Advisors</div>
                    </div>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      Loss assessment, chargeback guidance, payment trail mapping, and financial recovery planning.
                    </p>
                    <div className="mt-4">
                      <Link href="/contact" className="inline-flex items-center gap-2 text-emerald-200 hover:text-white font-black">
                        Ask for recovery plan <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 border-white/10" hover={false}>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-white/50">Safety rules</div>
                  <BadgeCheck className="h-5 w-5 text-green-300" />
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-400 leading-relaxed">
                  <div className="flex items-center gap-2">
                    <FileWarning className="h-4 w-4 text-amber-200" />
                    Never publish passport numbers, OTPs, bank details, or private contracts.
                  </div>
                  <div className="flex items-center gap-2">
                    <FileWarning className="h-4 w-4 text-amber-200" />
                    Use a proof link only if it is safe for public viewing.
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between"
            >
              <h2 className="text-2xl md:text-3xl font-black text-white">Recent reports</h2>
              <span className="text-xs text-white/50">{reports.length} reports</span>
            </motion.div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reports.map((r) => (
                <GlassCard key={r.id} className="p-6 border-white/10" hover>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="neo-badge neo-badge-security">{r.severity}</span>
                        <span className="neo-badge neo-badge-popular">{r.type}</span>
                      </div>
                      <div className="mt-3 text-sm text-slate-400">{r.country}</div>
                    </div>
                    <div className="text-xs text-white/50">{new Date(r.ts).toLocaleDateString()}</div>
                  </div>
                  <p className="mt-4 text-sm text-slate-300 leading-relaxed whitespace-pre-line">{r.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-3 items-center justify-between">
                    <div className="text-xs text-white/50">
                      {r.anonymous ? "Anonymous" : "Not anonymous"} · Preferred: {r.contactPreference}
                      {r.amountLost ? ` · Loss: ${r.amountLost}` : ""}
                    </div>
                    {r.proofLink && (
                      <a
                        href={r.proofLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-amber-200 hover:text-white font-black text-sm"
                      >
                        Proof <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </GlassCard>
              ))}

              {reports.length === 0 && (
                <GlassCard className="p-10 border-white/10 text-center lg:col-span-2" hover={false}>
                  <h3 className="text-2xl font-black text-white">No reports yet</h3>
                  <p className="mt-3 text-slate-400">Submit the first one and protect others.</p>
                </GlassCard>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

