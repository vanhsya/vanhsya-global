import { VISA_REJECTION_TAXONOMY } from '../../../../data/ai/rejectionTaxonomy.ts';
import { ensureAiConfigured, generateJson } from '../../../../lib/aiJson.ts';
import { verifyCsrf } from '../../../../lib/security/csrf.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Req = {
  letterText?: unknown;
  country?: unknown;
  pathway?: unknown;
  language?: unknown;
};

type Res = {
  summary: string;
  detectedReasons: { id: string; confidence: number; evidence: string[]; whyItFailed: string[] }[];
  improvementPlan: { priority: 'high' | 'medium' | 'low'; action: string; evidenceToAdd: string[] }[];
  nextAttemptChecklist: string[];
  disclaimer: string;
};

const noStore = { 'cache-control': 'no-store' };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[\u2014\u2013]/g, '-')
    .replace(/[^a-z0-9\s-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const findEvidence = (text: string, indicators: string[]) => {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const joined = text.replace(/\s+/g, ' ');
  const out: string[] = [];

  for (const raw of indicators) {
    const key = normalize(raw);
    if (!key) continue;
    const hitLine = lines.find((l) => normalize(l).includes(key));
    if (hitLine) out.push(hitLine.slice(0, 240));
    else if (normalize(joined).includes(key)) out.push(`Indicator found: "${raw}"`);
  }

  return Array.from(new Set(out)).slice(0, 4);
};

const offlineAnalyze = (input: { letterText: string; country?: string; pathway?: string }): Res => {
  const text = input.letterText;
  const n = normalize(text);
  const detected = VISA_REJECTION_TAXONOMY.map((r) => {
    const hits = r.indicators.filter((k) => n.includes(normalize(k)));
    const confidence = hits.length >= 2 ? 0.75 : hits.length === 1 ? 0.55 : 0.25;
    return {
      id: r.id,
      confidence,
      evidence: hits.length ? findEvidence(text, hits) : [],
      whyItFailed: hits.length
        ? [
            `The refusal letter contains signals consistent with "${r.title}".`,
            'This usually means your narrative or evidence did not satisfy the officer for this requirement.'
          ]
        : []
    };
  })
    .filter((x) => x.confidence >= 0.5)
    .sort((a, b) => b.confidence - a.confidence);

  const top = detected.slice(0, 3);
  const plan: Res['improvementPlan'] = [];

  for (const r of top) {
    const meta = VISA_REJECTION_TAXONOMY.find((x) => x.id === r.id);
    const fixes = meta?.fixes || [];
    for (let i = 0; i < fixes.length; i++) {
      const action = fixes[i];
      plan.push({
        priority: i === 0 ? 'high' : i === 1 ? 'medium' : 'low',
        action,
        evidenceToAdd: [
          'A document index mapping each claim to evidence',
          'A short cover letter that resolves the refusal points with specific references'
        ]
      });
    }
  }

  if (!plan.length) {
    plan.push(
      {
        priority: 'high',
        action: 'Create a single consistent narrative across forms, cover letter, and supporting documents.',
        evidenceToAdd: ['Cover letter', 'Document index', 'Requirement-to-evidence mapping']
      },
      {
        priority: 'medium',
        action: 'Strengthen proof-of-funds clarity and origin of funds with time-stamped statements and explanations.',
        evidenceToAdd: ['Bank statements', 'Funding table', 'Sponsor evidence (if applicable)']
      }
    );
  }

  const summaryParts = [
    'Offline analysis mode: the system matched refusal text against a conservative taxonomy of common refusal reasons.',
    input.country ? `Country: ${input.country}` : null,
    input.pathway ? `Pathway: ${input.pathway}` : null
  ].filter(Boolean);

  return {
    summary: summaryParts.join(' • '),
    detectedReasons: top.map((x) => ({
      id: x.id,
      confidence: x.confidence,
      evidence: x.evidence.length ? x.evidence : ['No direct excerpt found; detected via weak textual signal.'],
      whyItFailed: x.whyItFailed.length ? x.whyItFailed : ['The refusal letter may imply this category without explicit wording.']
    })),
    improvementPlan: plan.slice(0, 12),
    nextAttemptChecklist: [
      'Build a requirement-to-evidence index (one page) and submit as the first document',
      'Ensure all figures (tuition, living, savings, sponsor) reconcile across statements and forms',
      'Eliminate contradictions across SOP/cover letter, application forms, and interview answers',
      'Add a clear timeline and post-completion plan aligned to your background',
      'Disclose any prior refusals with dates and explain remediation steps'
    ],
    disclaimer:
      'Offline mode: this is guidance based on text pattern matching and structured taxonomy. It is not legal advice and not a guarantee of approval.'
  };
};

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const letterText = typeof body?.letterText === 'string' ? body.letterText.trim() : '';
  const country = typeof body?.country === 'string' ? body.country.trim() : undefined;
  const pathway = typeof body?.pathway === 'string' ? body.pathway.trim() : undefined;
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';

  if (!letterText || letterText.length < 60)
    return Response.json({ error: 'Please paste the rejection letter text.' }, { status: 400, headers: noStore });
  if (letterText.length > 14000) return Response.json({ error: 'Text is too long.' }, { status: 413, headers: noStore });

  const cfg = ensureAiConfigured();
  if (!cfg.ok) {
    const offline = offlineAnalyze({ letterText, country, pathway });
    return Response.json({ ...offline, offline: true, language }, { status: 200, headers: noStore });
  }

  const system =
    'You are a visa rejection analysis assistant. You are precise, conservative, and evidence-based. You never guarantee approval. Output JSON only.';

  const prompt = JSON.stringify(
    {
      language,
      context: { country, pathway },
      taxonomy: VISA_REJECTION_TAXONOMY,
      letterText,
      outputSchema: {
        summary: 'string',
        detectedReasons: [{ id: 'string', confidence: 'number 0-1', evidence: ['string'], whyItFailed: ['string'] }],
        improvementPlan: [{ priority: 'high|medium|low', action: 'string', evidenceToAdd: ['string'] }],
        nextAttemptChecklist: ['string'],
        disclaimer: 'string'
      },
      rules: [
        'Return in the requested language.',
        'Map reasons to taxonomy ids where possible; otherwise use id "other".',
        'Confidence must be conservative.',
        'Give at least 8 improvement actions with evidence items.',
        'Disclaimer must say this is guidance and not legal advice and not a guarantee.'
      ]
    },
    null,
    2
  );

  try {
    const { data } = await generateJson<Res>({ system, prompt });
    return Response.json(data, { status: 200, headers: noStore });
  } catch {
    const offline = offlineAnalyze({ letterText, country, pathway });
    return Response.json({ ...offline, offline: true, language }, { status: 200, headers: noStore });
  }
}
