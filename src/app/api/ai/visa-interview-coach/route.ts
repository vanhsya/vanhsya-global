import { COUNTRY_LABELS, VISA_INTERVIEW_QUESTIONS } from '@/data/ai/interviewQuestions';
import { ensureAiConfigured, generateJson } from '@/lib/aiJson';

export const runtime = 'nodejs';

type Req = {
  country?: unknown;
  questionId?: unknown;
  questionText?: unknown;
  answer?: unknown;
  language?: unknown;
  selfReport?: unknown;
  voiceMetrics?: unknown;
};

type Res = {
  question: string;
  score: { overall: number; clarity: number; confidence: number; compliance: number };
  feedback: string[];
  improvedAnswer: string;
  culturalTips: string[];
  redFlagRisk: { level: 'low' | 'medium' | 'high'; reasons: string[] };
  nextDrills: string[];
  disclaimer: string;
};

export async function POST(req: Request) {
  const cfg = ensureAiConfigured();
  if (!cfg.ok) return Response.json({ error: cfg.error }, { status: 503 });

  const body = (await req.json().catch(() => null)) as Req | null;
  const country = typeof body?.country === 'string' ? body.country.trim().toLowerCase() : undefined;
  const questionId = typeof body?.questionId === 'string' ? body.questionId.trim() : undefined;
  const questionText = typeof body?.questionText === 'string' ? body.questionText.trim() : '';
  const answer = typeof body?.answer === 'string' ? body.answer.trim() : '';
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';
  const selfReport = body?.selfReport && typeof body.selfReport === 'object' ? body.selfReport : undefined;
  const voiceMetrics = body?.voiceMetrics && typeof body.voiceMetrics === 'object' ? body.voiceMetrics : undefined;

  if (!answer || answer.length < 10) return Response.json({ error: 'Please provide your answer.' }, { status: 400 });
  if (answer.length > 6000) return Response.json({ error: 'Answer is too long.' }, { status: 413 });

  const qFromId = questionId ? VISA_INTERVIEW_QUESTIONS.find((q) => q.id === questionId) : undefined;
  const question = (qFromId?.prompt || questionText || '').trim();
  if (!question) return Response.json({ error: 'Please provide a question.' }, { status: 400 });

  const label = country && country in COUNTRY_LABELS ? COUNTRY_LABELS[country as keyof typeof COUNTRY_LABELS] : undefined;

  const system =
    'You are a visa interview coach. You help candidates answer clearly, consistently, and credibly. You avoid legal advice, avoid guarantees, and focus on communication quality. Output JSON only.';

  const prompt = JSON.stringify(
    {
      language,
      context: { country: country || qFromId?.country || null, label },
      question,
      answer,
      redFlags: qFromId?.redFlags || [],
      strongSignals: qFromId?.strongSignals || [],
      selfReport,
      voiceMetrics,
      outputSchema: {
        question: 'string',
        score: { overall: '0-100', clarity: '0-100', confidence: '0-100', compliance: '0-100' },
        feedback: ['string'],
        improvedAnswer: 'string',
        culturalTips: ['string'],
        redFlagRisk: { level: 'low|medium|high', reasons: ['string'] },
        nextDrills: ['string'],
        disclaimer: 'string'
      },
      rules: [
        'Return in the requested language.',
        'Give at least 8 feedback points and 6 next drills.',
        'Improved answer must be concise (120-180 words) unless question requires short answer; keep realistic tone.',
        'If there is a potential inconsistency or red-flag, mark risk medium/high with reasons.',
        'Disclaimer must say coaching is informational, not legal advice, and not a guarantee.'
      ]
    },
    null,
    2
  );

  try {
    const { data } = await generateJson<Res>({ system, prompt });
    return Response.json(data, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to coach interview response.' }, { status: 502 });
  }
}

