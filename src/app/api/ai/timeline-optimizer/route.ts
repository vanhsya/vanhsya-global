import { ensureAiConfigured, generateJson } from '@/lib/aiJson';

export const runtime = 'nodejs';

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

export async function POST(req: Request) {
  const cfg = ensureAiConfigured();
  if (!cfg.ok) return Response.json({ error: cfg.error }, { status: 503 });

  const body = (await req.json().catch(() => null)) as Req | null;
  const country = typeof body?.country === 'string' ? body.country.trim() : '';
  const pathway = typeof body?.pathway === 'string' ? body.pathway.trim() : '';
  const startDate = typeof body?.startDate === 'string' ? body.startDate.trim() : '';
  const constraints = typeof body?.constraints === 'string' ? body.constraints.trim() : '';
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';

  if (!country) return Response.json({ error: 'Country is required.' }, { status: 400 });
  if (!pathway) return Response.json({ error: 'Pathway is required.' }, { status: 400 });
  if (!startDate) return Response.json({ error: 'Start date is required.' }, { status: 400 });

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
    return Response.json(data, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to optimize timeline.' }, { status: 502 });
  }
}

