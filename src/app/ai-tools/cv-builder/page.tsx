'use client';

import NavigationPremium from '@/components/NavigationPremium';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import { addProgressEvent } from '@/lib/toolProgress';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Download, Copy } from 'lucide-react';
import { useMemo, useState } from 'react';

type Result = {
  title: string;
  atsHeadline: string;
  professionalSummary: string;
  coreSkills: string[];
  experienceBullets: string[];
  educationSection: string[];
  projectsSection: string[];
  atsKeywords: string[];
  disclaimer: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 }
};

export default function CVBuilderPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [industry, setIndustry] = useState('');
  const [skills, setSkills] = useState('');
  const [experienceNotes, setExperienceNotes] = useState('');
  const [educationNotes, setEducationNotes] = useState('');
  const [projectsNotes, setProjectsNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');

  const wordCount = useMemo(() => (experienceNotes.trim().match(/\S+/g) || []).length, [experienceNotes]);

  const buildFallback = (): Result => {
    const skillsList = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 20);
    const yrs = yearsExperience.trim();
    const role = targetRole.trim() || 'Professional';
    const summary = `${role} with ${yrs || 'multiple'} years of experience${industry.trim() ? ` in ${industry.trim()}` : ''}. Strong track record of delivering measurable outcomes, collaborating cross-functionally, and communicating clearly with stakeholders.`;
    const exp = experienceNotes
      .split('\n')
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 10)
      .map((x) => (x.startsWith('•') ? x.slice(1).trim() : x));
    const edu = educationNotes
      .split('\n')
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 6);
    const prj = projectsNotes
      .split('\n')
      .map((x) => x.trim())
      .filter(Boolean)
      .slice(0, 6);
    return {
      title: 'ATS-Optimized CV Draft',
      atsHeadline: `${fullName.trim() || 'Candidate'} — ${role}`,
      professionalSummary: summary,
      coreSkills: skillsList.length ? skillsList : ['Communication', 'Problem-solving', 'Stakeholder management'],
      experienceBullets: exp.length ? exp : ['Add 4–8 achievement bullets with metrics (impact, scale, timeframe).'],
      educationSection: edu.length ? edu : ['Add your highest degree, institution, and graduation year.'],
      projectsSection: prj.length ? prj : [],
      atsKeywords: skillsList.slice(0, 12),
      disclaimer: 'Draft only. Verify accuracy, tailor to each job, and avoid misrepresentation.'
    };
  };

  const run = async () => {
    setError('');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/ai/cv-builder', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          location,
          targetRole,
          yearsExperience,
          industry,
          skills,
          experienceNotes,
          educationNotes,
          projectsNotes
        })
      });
      const json = (await res.json().catch(() => null)) as Result | { error?: string; offline?: boolean; result?: Result } | null;
      if (!res.ok) {
        setError((json as any)?.error || 'Failed to generate CV.');
        setLoading(false);
        return;
      }
      const data = (json as any)?.result ? (json as any).result : (json as Result);
      setResult(data);
      addProgressEvent({
        toolId: 'cv-builder',
        label: `CV Draft (${targetRole || 'role'})`,
        score: 85,
        meta: { role: targetRole, words: wordCount }
      });
    } catch {
      const data = buildFallback();
      setResult(data);
      setError('AI is unavailable. Generated a structured fallback draft from your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const fullText = useMemo(() => {
    if (!result) return '';
    const lines: string[] = [];
    lines.push(result.atsHeadline);
    if (email.trim() || location.trim()) lines.push([email.trim(), location.trim()].filter(Boolean).join(' • '));
    lines.push('');
    lines.push('SUMMARY');
    lines.push(result.professionalSummary);
    lines.push('');
    lines.push('CORE SKILLS');
    for (const s of result.coreSkills) lines.push(`- ${s}`);
    lines.push('');
    lines.push('EXPERIENCE HIGHLIGHTS');
    for (const b of result.experienceBullets) lines.push(`- ${b}`);
    lines.push('');
    lines.push('EDUCATION');
    for (const e of result.educationSection) lines.push(`- ${e}`);
    if (result.projectsSection.length) {
      lines.push('');
      lines.push('PROJECTS');
      for (const p of result.projectsSection) lines.push(`- ${p}`);
    }
    if (result.atsKeywords.length) {
      lines.push('');
      lines.push('ATS KEYWORDS');
      lines.push(result.atsKeywords.join(', '));
    }
    lines.push('');
    lines.push(result.disclaimer);
    return lines.join('\n');
  }, [result, email, location]);

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
    a.download = `${(fullName.trim() || 'cv').replace(/[^a-z0-9-_]+/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#0A0A10] text-white">
      <NavigationPremium variant="neo" />

      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_70%_25%,rgba(245,199,106,0.10),transparent_55%),radial-gradient(circle_at_50%_85%,rgba(168,85,247,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 header-blur-vanhsya">
              <FileText className="w-4 h-4 text-amber-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">CV Builder</span>
            </div>
            <h1 className="mt-7 text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              Build an ATS-optimized CV draft.
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Provide your profile highlights. Get a clean, structured CV draft you can tailor for jobs and visa documentation.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-200" />
                <div className="text-white font-extrabold text-xl">Your profile</div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location (optional)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="Target role (e.g., Data Analyst)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  placeholder="Years of experience (e.g., 5)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Industry (optional)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <input
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Core skills (comma separated)"
                  className="h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={experienceNotes}
                  onChange={(e) => setExperienceNotes(e.target.value)}
                  placeholder={'Experience highlights (one bullet per line)\n• Built ...\n• Led ...\n• Improved ...'}
                  className="min-h-[160px] px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={educationNotes}
                  onChange={(e) => setEducationNotes(e.target.value)}
                  placeholder={'Education (one line per item)\nBSc, University, 2020\nMSc, University, 2022'}
                  className="min-h-[110px] px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
                <textarea
                  value={projectsNotes}
                  onChange={(e) => setProjectsNotes(e.target.value)}
                  placeholder={'Projects (optional)\nProject name — impact, tech, result'}
                  className="min-h-[110px] px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              {error ? <div className="mt-4 text-sm font-bold text-amber-200">{error}</div> : null}

              <button
                type="button"
                onClick={run}
                disabled={loading || !fullName.trim() || !targetRole.trim()}
                className="mt-6 w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 font-extrabold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating…' : 'Generate CV draft'}
              </button>
            </GlassCard>

            <GlassCard className="lg:col-span-6 p-7 border-white/10" hover={false}>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-white font-extrabold text-xl">Output</div>
                  <div className="text-white/60 text-sm font-semibold">Copy or download. Then tailor per job and destination.</div>
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
                    Fill your profile and generate a CV draft.
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap text-sm text-white/80 rounded-2xl border border-white/10 bg-white/5 p-6 overflow-auto max-h-[520px]">
                    {fullText}
                  </pre>
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
