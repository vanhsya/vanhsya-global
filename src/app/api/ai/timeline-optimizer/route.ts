import { ensureAiConfigured, generateJson } from '../../../../lib/aiJson.ts';
import { verifyCsrf } from '../../../../lib/security/csrf.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Req = {
  country?: unknown;
  pathway?: unknown;
  startDate?: unknown;
  constraints?: unknown;
  language?: unknown;
};

type Res = {
  summary: string;
  milestones: { title: string; dueDate: string; durationDays: number; risk: 'low' | 'medium' | 'high'; notes: string[] }[];
  buffers: { title: string; days: number; why: string }[];
  optimizationTips: string[];
  disclaimer: string;
};

const noStore = { 'cache-control': 'no-store' };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const parseYmd = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const t = Date.parse(`${value}T00:00:00.000Z`);
  if (Number.isNaN(t)) return null;
  return t;
};

const fmtYmd = (t: number) => new Date(t).toISOString().slice(0, 10);

const addDays = (t: number, days: number) => t + days * 86400000;

const offlinePlan = (input: { country: string; pathway: string; startDate: string; constraints: string }): Res => {
  const start = parseYmd(input.startDate) ?? Date.now();
  const fast = /fast|asap|urgent|quick/i.test(input.constraints);
  const conservative = /conservative|buffer|safe|risk/i.test(input.constraints) || true;

  const base = fast ? 6 : 10;
  const bufferFactor = conservative ? 1.25 : 1.0;
  const step = (days: number) => Math.max(2, Math.round(days * bufferFactor));

  const template = [
    { title: 'Profile & requirements alignment', days: step(base + 4), risk: 'low' as const },
    { title: 'Document index + evidence mapping', days: step(base + 6), risk: 'low' as const },
    { title: 'Funds plan and statement preparation', days: step(base + 7), risk: 'medium' as const },
    { title: 'Education + employment verification set', days: step(base + 7), risk: 'medium' as const },
    { title: 'SOP/cover letter drafting', days: step(base + 6), risk: 'medium' as const },
    { title: 'Form completion + consistency audit', days: step(base + 5), risk: 'high' as const },
    { title: 'Submission window + fee review', days: step(base + 3), risk: 'low' as const },
    { title: 'Biometrics / appointment scheduling', days: step(base + 10), risk: 'high' as const },
    { title: 'Interview readiness (if applicable)', days: step(base + 8), risk: 'medium' as const },
    { title: 'Final pack review and submission', days: step(base + 2), risk: 'low' as const },
    { title: 'Post-submission tracking + follow-ups', days: step(base + 14), risk: 'medium' as const },
    { title: 'Decision + next steps', days: step(base + 30), risk: 'high' as const }
  ];

  let cursor = start;
  const milestones = template.map((m) => {
    const due = addDays(cursor, m.days);
    const out = {
      title: m.title,
      dueDate: fmtYmd(due),
      durationDays: m.days,
      risk: m.risk,
      notes: [
        `Destination: ${input.country}`,
        `Pathway: ${input.pathway}`,
        fast ? 'Priority: speed-focused plan (may increase risk)' : 'Priority: balanced plan',
        conservative ? 'Buffers applied for safety' : 'Minimal buffers applied'
      ].filter(Boolean)
    };
    cursor = due;
    return out;
  });

  const buffers = [
    { title: 'Document verification buffer', days: clamp(Math.round(7 * bufferFactor), 5, 18), why: 'Third-party verifications can take longer than expected.' },
    { title: 'Appointment availability buffer', days: clamp(Math.round(10 * bufferFactor), 7, 24), why: 'Biometrics/interview slots fluctuate by season and location.' },
    { title: 'Funds seasoning buffer', days: clamp(Math.round(14 * bufferFactor), 7, 30), why: 'Stable statement history can reduce scrutiny on funding.' },
    { title: 'Officer clarification buffer', days: clamp(Math.round(10 * bufferFactor), 7, 28), why: 'Responding to requests for more information can extend timelines.' }
  ];

  const optimizationTips = [
    'Create a one-page “requirement → evidence” index and submit it first.',
    'Lock your narrative early and keep it identical across forms, SOP, and supporting letters.',
    'Prepare a funding table that exactly matches statement balances and expected costs.',
    'Remove contradictions: dates, employers, education timelines, and travel history.',
    'Reduce risk by making every claim verifiable (avoid vague phrases and new claims).',
    'Pre-book appointments early where possible and track availability windows.',
    'Keep digital copies named consistently and grouped by requirement.',
    'Do a final pack review as if you were an officer: clarity, consistency, proof.'
  ];

  return {
    summary: `Offline timeline plan for ${input.country} • ${input.pathway} anchored on ${input.startDate}.`,
    milestones,
    buffers,
    optimizationTips,
    disclaimer:
      'Offline mode: this timeline is a planning aid using conservative assumptions and generic process steps. Real timelines vary by destination, season, and personal case, and are not guaranteed.'
  };
};

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const country = typeof body?.country === 'string' ? body.country.trim() : '';
  const pathway = typeof body?.pathway === 'string' ? body.pathway.trim() : '';
  const startDate = typeof body?.startDate === 'string' ? body.startDate.trim() : '';
  const constraints = typeof body?.constraints === 'string' ? body.constraints.trim() : '';
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';

  if (!country) return Response.json({ error: 'Country is required.' }, { status: 400, headers: noStore });
  if (!pathway) return Response.json({ error: 'Pathway is required.' }, { status: 400, headers: noStore });
  if (!startDate) return Response.json({ error: 'Start date is required.' }, { status: 400, headers: noStore });

  const cfg = ensureAiConfigured();
  if (!cfg.ok) {
    const offline = offlinePlan({ country, pathway, startDate, constraints });
    return Response.json({ ...offline, offline: true, language }, { status: 200, headers: noStore });
  }

  const system =
    'You are a migration timeline optimizer. You create realistic milestone plans, conservative buffers, and risk flags. You do not invent official processing times; you provide ranges and explain assumptions. Output JSON only.';

  const prompt = JSON.stringify(
    {
      language,
      inputs: { country, pathway, startDate, constraints },
      outputSchema: {
        summary: 'string',
        milestones: [{ title: 'string', dueDate: 'YYYY-MM-DD', durationDays: 'number', risk: 'low|medium|high', notes: ['string'] }],
        buffers: [{ title: 'string', days: 'number', why: 'string' }],
        optimizationTips: ['string'],
        disclaimer: 'string'
      },
      rules: [
        'Return in the requested language.',
        'Use the provided startDate as the schedule anchor.',
        'Provide 10-16 milestones with due dates and realistic durations.',
        'Include at least 4 buffers and at least 8 optimization tips.',
        'Disclaimer must state timelines vary by country, season, and personal case and are not guaranteed.'
      ]
    },
    null,
    2
  );

  try {
    const { data } = await generateJson<Res>({ system, prompt });
    return Response.json(data, { status: 200, headers: noStore });
  } catch {
    const offline = offlinePlan({ country, pathway, startDate, constraints });
    return Response.json({ ...offline, offline: true, language }, { status: 200, headers: noStore });
  }
}
