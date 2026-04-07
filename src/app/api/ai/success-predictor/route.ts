export const runtime = 'nodejs';

import { verifyCsrf } from '@/lib/security/csrf';

type Req = {
  country?: unknown;
  pathway?: unknown;
  age?: unknown;
  education?: unknown;
  experienceYears?: unknown;
  englishLevel?: unknown;
  funds?: unknown;
  travelHistory?: unknown;
  ties?: unknown;
  calibration?: unknown;
};

type Res = {
  score: number;
  band: 'low' | 'medium' | 'high';
  estimatedSuccessRate: number;
  keyFactors: { factor: string; impact: 'positive' | 'neutral' | 'negative'; note: string }[];
  nextImprovements: string[];
  disclaimer: string;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403 });

  const body = (await req.json().catch(() => null)) as Req | null;

  const country = typeof body?.country === 'string' ? body.country.trim() : '';
  const pathway = typeof body?.pathway === 'string' ? body.pathway.trim() : '';

  if (!country) return Response.json({ error: 'Country is required.' }, { status: 400 });
  if (!pathway) return Response.json({ error: 'Pathway is required.' }, { status: 400 });

  const age = typeof body?.age === 'number' ? body.age : undefined;
  const education = typeof body?.education === 'string' ? body.education.trim() : '';
  const experienceYears = typeof body?.experienceYears === 'number' ? body.experienceYears : undefined;
  const englishLevel = typeof body?.englishLevel === 'string' ? body.englishLevel.trim() : '';
  const funds = typeof body?.funds === 'string' ? body.funds.trim() : '';
  const travelHistory = typeof body?.travelHistory === 'string' ? body.travelHistory.trim() : '';
  const ties = typeof body?.ties === 'string' ? body.ties.trim() : '';

  const calibration = body?.calibration && typeof body.calibration === 'object' ? (body.calibration as { approvalRate?: unknown; sampleSize?: unknown }) : undefined;
  const approvalRate = typeof calibration?.approvalRate === 'number' ? clamp(calibration.approvalRate, 0, 1) : 0;
  const sampleSize = typeof calibration?.sampleSize === 'number' ? clamp(calibration.sampleSize, 0, 5000) : 0;

  let score = 55;
  const keyFactors: Res['keyFactors'] = [];

  const add = (delta: number, factor: string, note: string) => {
    score += delta;
    keyFactors.push({ factor, impact: delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral', note });
  };

  if (typeof age === 'number') {
    if (age >= 18 && age <= 34) add(6, 'Age', 'Generally strong profile range for many pathways');
    else if (age <= 44) add(2, 'Age', 'Often acceptable with strong supporting factors');
    else add(-6, 'Age', 'May require stronger evidence and alignment depending on pathway');
  }

  if (education) {
    const e = education.toLowerCase();
    if (e.includes('phd') || e.includes('doctor')) add(6, 'Education', 'Advanced qualification can strengthen profile');
    else if (e.includes('master')) add(4, 'Education', 'Higher education typically strengthens eligibility');
    else if (e.includes('bachelor')) add(2, 'Education', 'Baseline academic level; strengthen with outcomes');
    else add(-2, 'Education', 'Consider credential evaluation and skill alignment');
  }

  if (typeof experienceYears === 'number') {
    if (experienceYears >= 5) add(6, 'Experience', 'Strong professional experience for skilled pathways');
    else if (experienceYears >= 2) add(2, 'Experience', 'Some experience; strengthen role relevance');
    else add(-4, 'Experience', 'Limited experience may reduce flexibility; consider study/entry routes');
  }

  if (englishLevel) {
    const l = englishLevel.toLowerCase();
    if (l.includes('c1') || l.includes('c2') || l.includes('advanced')) add(6, 'English', 'High proficiency supports study/work credibility');
    else if (l.includes('b2') || l.includes('upper')) add(3, 'English', 'Solid proficiency for many routes');
    else if (l.includes('b1') || l.includes('intermediate')) add(-2, 'English', 'Improve to reduce interview and eligibility risk');
    else add(-5, 'English', 'Low proficiency increases risk; prioritize IELTS preparation');
  }

  if (funds) {
    const f = funds.toLowerCase();
    if (f.includes('clear') || f.includes('bank') || f.includes('sponsor') || f.includes('stable')) add(4, 'Funds', 'Clear funding story reduces refusal risk');
    else add(-2, 'Funds', 'Clarify source of funds and align with budgets');
  }

  if (travelHistory) {
    const t = travelHistory.toLowerCase();
    if (t.includes('multiple') || t.includes('visa') || t.includes('compliant') || t.includes('returned')) add(3, 'Travel history', 'Compliant history can be a positive signal');
    else add(0, 'Travel history', 'Neutral; provide consistent narrative');
  }

  if (ties) {
    const tt = ties.toLowerCase();
    if (tt.includes('job') || tt.includes('family') || tt.includes('property') || tt.includes('business')) add(4, 'Home ties', 'Clear ties support temporary intent routes');
    else add(-2, 'Home ties', 'Strengthen post-return plan and supporting documents');
  }

  score = clamp(score, 1, 99);

  const baseRate = clamp(0.15 + score / 120, 0.1, 0.95);
  const calibrated = sampleSize >= 10 ? clamp(baseRate * (0.75 + approvalRate), 0.1, 0.95) : baseRate;

  const band: Res['band'] = calibrated >= 0.75 ? 'high' : calibrated >= 0.5 ? 'medium' : 'low';

  const nextImprovements: string[] = [
    'Ensure a single consistent narrative across forms, SOP, and interview answers',
    'Create a funding table with a buffer and match it to statements',
    'Build a document index that maps each proof to a specific requirement',
    'Run a mock interview and remove contradictions and vague claims'
  ];

  const res: Res = {
    score,
    band,
    estimatedSuccessRate: Math.round(calibrated * 100),
    keyFactors,
    nextImprovements,
    disclaimer:
      'This is an estimated risk band based on provided inputs and historical calibration (if available). It is not official advice and not a guarantee of approval.'
  };

  return Response.json(res, { status: 200 });
}
