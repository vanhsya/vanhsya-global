import { VISA_REJECTION_TAXONOMY } from '@/data/ai/rejectionTaxonomy';
import { ensureAiConfigured, generateJson } from '@/lib/aiJson';
import { verifyCsrf } from '@/lib/security/csrf';

export const runtime = 'nodejs';

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

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403 });

  const cfg = ensureAiConfigured();
  if (!cfg.ok) return Response.json({ error: cfg.error }, { status: 503 });

  const body = (await req.json().catch(() => null)) as Req | null;
  const letterText = typeof body?.letterText === 'string' ? body.letterText.trim() : '';
  const country = typeof body?.country === 'string' ? body.country.trim() : undefined;
  const pathway = typeof body?.pathway === 'string' ? body.pathway.trim() : undefined;
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';

  if (!letterText || letterText.length < 60) return Response.json({ error: 'Please paste the rejection letter text.' }, { status: 400 });
  if (letterText.length > 14000) return Response.json({ error: 'Text is too long.' }, { status: 413 });

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
    return Response.json(data, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to analyze letter.' }, { status: 502 });
  }
}
