import { IELTS_WRITING_RUBRICS } from '@/data/ai/ielts';
import { ensureAiConfigured, generateJson } from '@/lib/aiJson';

export const runtime = 'nodejs';

type Req = {
  text?: unknown;
  task?: unknown;
  targetBand?: unknown;
  language?: unknown;
};

type Res = {
  bandEstimate: number;
  criteria: Record<string, { band: number; notes: string[] }>;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  studyPlan: { days: { day: number; focus: string; drills: string[] }[] };
  disclaimer: string;
};

export async function POST(req: Request) {
  const cfg = ensureAiConfigured();
  if (!cfg.ok) return Response.json({ error: cfg.error }, { status: 503 });

  const body = (await req.json().catch(() => null)) as Req | null;
  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  const task = body?.task === 'task1' || body?.task === 'task2' ? body.task : 'task2';
  const targetBand = typeof body?.targetBand === 'number' ? body.targetBand : undefined;
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';

  if (!text || text.length < 80) return Response.json({ error: 'Please provide at least 80 characters of writing.' }, { status: 400 });
  if (text.length > 14000) return Response.json({ error: 'Text is too long.' }, { status: 413 });

  const rubric = IELTS_WRITING_RUBRICS.find((r) => r.task === task);

  const system =
    "You are an IELTS examiner assistant. You score conservatively and give actionable feedback. Never claim official certification. If uncertain, state assumptions. Output JSON only.";

  const prompt = JSON.stringify(
    {
      language,
      task,
      targetBand,
      rubric,
      writing: text,
      outputSchema: {
        bandEstimate: 'number 1-9',
        criteria: {
          taskAchievement: { band: 'number 1-9', notes: ['string'] },
          coherenceCohesion: { band: 'number 1-9', notes: ['string'] },
          lexicalResource: { band: 'number 1-9', notes: ['string'] },
          grammarRangeAccuracy: { band: 'number 1-9', notes: ['string'] }
        },
        strengths: ['string'],
        weaknesses: ['string'],
        improvements: ['string'],
        studyPlan: { days: [{ day: 'number', focus: 'string', drills: ['string'] }] },
        disclaimer: 'string'
      },
      rules: [
        'Return feedback in the requested language.',
        'Give at least 3 strengths, 3 weaknesses, 6 improvements, and a 14-day plan.',
        'Make drills specific (e.g., rewrite thesis, cohesion mapping, complex sentences practice).',
        'The disclaimer must clearly say the band is an estimate.'
      ]
    },
    null,
    2
  );

  try {
    const { data } = await generateJson<Res>({ system, prompt });
    return Response.json(data, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to evaluate writing.' }, { status: 502 });
  }
}

