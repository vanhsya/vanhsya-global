import { coerceString, coerceStringArray, ensureAiConfigured, generateJson } from '../../../../lib/aiJson.ts';
import { verifyCsrf } from '../../../../lib/security/csrf.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Req = {
  fullName?: unknown;
  email?: unknown;
  location?: unknown;
  targetRole?: unknown;
  yearsExperience?: unknown;
  industry?: unknown;
  skills?: unknown;
  experienceNotes?: unknown;
  educationNotes?: unknown;
  projectsNotes?: unknown;
};

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

const noStore = { 'cache-control': 'no-store' };

const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

const list = (raw: string, max: number) =>
  raw
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, max);

const lines = (raw: string, max: number) =>
  raw
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, max)
    .map((x) => (x.startsWith('•') ? x.slice(1).trim() : x));

const fallback = (input: {
  fullName: string;
  email: string;
  location: string;
  targetRole: string;
  yearsExperience: string;
  industry: string;
  skills: string;
  experienceNotes: string;
  educationNotes: string;
  projectsNotes: string;
}): Result => {
  const skillList = list(input.skills, 20);
  const exp = lines(input.experienceNotes, 10);
  const edu = lines(input.educationNotes, 6);
  const prj = lines(input.projectsNotes, 6);
  const headline = `${input.fullName || 'Candidate'} — ${input.targetRole || 'Professional'}`;
  const yrs = input.yearsExperience || 'multiple';
  const summary = `${input.targetRole || 'Professional'} with ${yrs} years of experience${input.industry ? ` in ${input.industry}` : ''}. Focused on measurable outcomes, clear stakeholder communication, and reliable execution.`;
  return {
    title: 'ATS-Optimized CV Draft',
    atsHeadline: headline,
    professionalSummary: summary,
    coreSkills: skillList.length ? skillList : ['Communication', 'Problem-solving', 'Stakeholder management'],
    experienceBullets: exp.length ? exp : ['Add 4–8 achievement bullets with metrics (impact, scale, timeframe).'],
    educationSection: edu.length ? edu : ['Add your highest degree, institution, and graduation year.'],
    projectsSection: prj,
    atsKeywords: skillList.slice(0, 12),
    disclaimer: 'Draft only. Verify accuracy, tailor to each job, and avoid misrepresentation.'
  };
};

const normalizeResult = (data: unknown): Result => {
  const value = data && typeof data === 'object' ? (data as Partial<Result>) : {};
  return {
    title: coerceString(value.title, 'ATS-Optimized CV Draft', 120),
    atsHeadline: coerceString(value.atsHeadline, 'Candidate profile', 180),
    professionalSummary: coerceString(value.professionalSummary, 'Add verified professional summary details.', 700),
    coreSkills: coerceStringArray(value.coreSkills, ['Communication', 'Problem-solving', 'Stakeholder management'], 20, 80),
    experienceBullets: coerceStringArray(value.experienceBullets, ['Add achievement bullets backed by verified metrics.'], 10, 220),
    educationSection: coerceStringArray(value.educationSection, ['Add verified education details.'], 6, 220),
    projectsSection: coerceStringArray(value.projectsSection, [], 6, 220),
    atsKeywords: coerceStringArray(value.atsKeywords, [], 16, 70),
    disclaimer: coerceString(value.disclaimer, 'Draft only. Verify accuracy, tailor to each job, and avoid misrepresentation.', 260)
  };
};

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const input = {
    fullName: s(body?.fullName),
    email: s(body?.email),
    location: s(body?.location),
    targetRole: s(body?.targetRole),
    yearsExperience: s(body?.yearsExperience),
    industry: s(body?.industry),
    skills: s(body?.skills),
    experienceNotes: s(body?.experienceNotes),
    educationNotes: s(body?.educationNotes),
    projectsNotes: s(body?.projectsNotes)
  };

  if (!input.fullName || !input.targetRole) {
    return Response.json({ error: 'Full name and target role are required.' }, { status: 400, headers: noStore });
  }

  const cfg = ensureAiConfigured();
  if (!cfg.ok) {
    return Response.json({ ok: true, offline: true, result: fallback(input) }, { status: 200, headers: noStore });
  }

  const system =
    'You are an ATS-focused CV writer. You must not invent employers, degrees, or dates. Use only the user-provided notes, and when details are missing, write neutral placeholders. Output JSON only.';

  const prompt = JSON.stringify(
    {
      input,
      outputSchema: {
        title: 'string',
        atsHeadline: 'string',
        professionalSummary: 'string',
        coreSkills: ['string'],
        experienceBullets: ['string'],
        educationSection: ['string'],
        projectsSection: ['string'],
        atsKeywords: ['string'],
        disclaimer: 'string'
      },
      rules: [
        'Keep bullets achievement-focused and metric-oriented when possible.',
        'Do not mention visa programs; focus on professional profile.',
        'Core skills should be concise (1–4 words each).',
        'ATS keywords should be deduplicated and based on the provided skills/role.'
      ]
    },
    null,
    2
  );

  try {
    const { data } = await generateJson<Result>({ system, prompt, validate: normalizeResult });
    return Response.json(data, { status: 200, headers: noStore });
  } catch {
    return Response.json({ ok: true, offline: true, result: fallback(input) }, { status: 200, headers: noStore });
  }
}
