import { ensureAiConfigured, generateJson } from '../../../../lib/aiJson.ts';
import { verifyCsrf } from '../../../../lib/security/csrf.ts';
import { evaluateEligibility, type EligibilityProfile } from '../../../../lib/eligibilityEngine.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Req = Partial<Record<keyof EligibilityProfile, unknown>>;

type AiInsight = {
  summary: string;
  keyMatches: string[];
  highestLeverageImprovements: string[];
  disclaimers: string[];
};

const noStore = { 'cache-control': 'no-store' };

const asNumber = (v: unknown) => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string' && v.trim()) return Number(v);
  return NaN;
};

const asBool = (v: unknown) => {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') return v === '1' || v.toLowerCase() === 'true' || v.toLowerCase() === 'yes';
  return false;
};

const asString = (v: unknown) => (typeof v === 'string' ? v : '');

const asStringArray = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []);

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const profile: EligibilityProfile = {
    age: Math.floor(asNumber(body?.age)),
    nationality: asString(body?.nationality).trim(),
    currentCountry: asString(body?.currentCountry).trim() || undefined,
    educationLevel: asString(body?.educationLevel).trim(),
    fieldOfStudy: asString(body?.fieldOfStudy).trim() || undefined,
    workExperienceYears: Math.max(0, Math.floor(asNumber(body?.workExperienceYears))),
    occupationField: asString(body?.occupationField).trim(),
    englishLevel: asString(body?.englishLevel).trim() || undefined,
    ieltsOverall: Number.isFinite(asNumber(body?.ieltsOverall)) ? asNumber(body?.ieltsOverall) : undefined,
    jobOffer: asBool(body?.jobOffer),
    fundsUsd: Number.isFinite(asNumber(body?.fundsUsd)) ? asNumber(body?.fundsUsd) : undefined,
    relativesInDestination: asBool(body?.relativesInDestination),
    purpose: asString(body?.purpose).trim(),
    timeline: asString(body?.timeline).trim() || undefined,
    targetCountries: asStringArray(body?.targetCountries),
    notes: asString(body?.notes).trim() || undefined
  };

  const report = evaluateEligibility(profile);

  const cfg = ensureAiConfigured();
  if (!cfg.ok) {
    return Response.json({ ok: true, report, ai: null, offline: true }, { status: 200, headers: noStore });
  }

  const system =
    'You are an immigration eligibility assistant. You must be grounded in the provided structured report and must not invent facts. Provide concise, actionable, non-generic guidance. Output JSON only.';

  const prompt = JSON.stringify(
    {
      profile,
      report,
      outputSchema: {
        summary: 'string',
        keyMatches: ['string'],
        highestLeverageImprovements: ['string'],
        disclaimers: ['string']
      },
      rules: [
        'Do not repeat the same advice across countries unless the report indicates it applies.',
        'Reference specific fields from the profile and report (age, education, experience, language, funds, job offer).',
        'If the report has issues, include them as the top improvements.',
        'Disclaimers must state this is guidance and not legal advice.'
      ]
    },
    null,
    2
  );

  try {
    const { data } = await generateJson<AiInsight>({ system, prompt });
    return Response.json({ ok: true, report, ai: data, offline: false }, { status: 200, headers: noStore });
  } catch {
    return Response.json({ ok: true, report, ai: null, offline: false }, { status: 200, headers: noStore });
  }
}
