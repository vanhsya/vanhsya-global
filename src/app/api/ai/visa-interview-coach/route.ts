import { COUNTRY_LABELS, VISA_INTERVIEW_QUESTIONS } from '../../../../data/ai/interviewQuestions.ts';
import { ensureAiConfigured, generateJson } from '../../../../lib/aiJson.ts';
import { verifyCsrf } from '../../../../lib/security/csrf.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

const noStore = { 'cache-control': 'no-store' };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const countWords = (s: string) => (s.trim().match(/\S+/g) || []).length;

const splitSentences = (text: string) =>
  text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

const buildImprovedAnswer = (answer: string, question: string) => {
  const sentences = splitSentences(answer);
  const keep = sentences.slice(0, 5).join(' ');
  const cleaned = keep || answer;
  const q = question.trim().replace(/\s+/g, ' ');
  const target = cleaned.slice(0, 900);
  const bullets = [
    'I chose this option based on a specific fit with my background and clear outcomes.',
    'My plan is structured, time-bounded, and consistent with my documents and obligations.',
    'I can clearly explain funding, timelines, and post-completion steps without contradictions.'
  ];
  const intro = q ? `Answering your question: ${q}` : 'Answer:';
  const body = target.length >= 120 ? target : `${target} ${bullets.join(' ')}`.trim();
  return `${intro}\n\n${body}`.trim();
};

const offlineCoach = (input: {
  question: string;
  answer: string;
  countryLabel?: string;
  redFlags: string[];
  strongSignals: string[];
  selfReport?: any;
  voiceMetrics?: any;
}): Res => {
  const words = countWords(input.answer);
  const hasNumbers = /\d/.test(input.answer);
  const hasTimeline = /\b(month|months|year|years|week|weeks|semester|intake|date)\b/i.test(input.answer);
  const hasDocs = /\b(passport|statement|bank|offer|letter|admission|contract|employer|transcript|certificate|sponsor)\b/i.test(
    input.answer
  );

  const fillers = typeof input.voiceMetrics?.fillers === 'number' ? input.voiceMetrics.fillers : 0;
  const wpm = typeof input.voiceMetrics?.wpm === 'number' ? input.voiceMetrics.wpm : null;

  const presence = typeof input.selfReport?.presenceScore === 'number' ? input.selfReport.presenceScore : 70;

  let clarity = 62;
  if (words >= 90) clarity += 6;
  if (words >= 140) clarity += 4;
  if (words < 50) clarity -= 10;
  if (fillers >= 6) clarity -= 8;
  if (wpm && wpm > 170) clarity -= 6;
  if (wpm && wpm < 90) clarity -= 4;

  let compliance = 64;
  if (hasDocs) compliance += 6;
  if (hasTimeline) compliance += 4;
  if (!hasDocs) compliance -= 6;
  if (!hasTimeline) compliance -= 4;

  let confidence = 60;
  confidence += clamp(Math.round((presence - 70) / 2), -12, 12);
  if (hasNumbers) confidence += 4;
  if (words >= 120) confidence += 4;
  if (words < 60) confidence -= 6;

  const overall = clamp(Math.round((clarity + confidence + compliance) / 3), 1, 99);

  const redFlagReasons: string[] = [];
  if (!hasDocs) redFlagReasons.push('Missing document grounding (funds, offer, employment, education) in the answer');
  if (!hasTimeline) redFlagReasons.push('Timeline is unclear; officers often probe dates and structure');
  if (words < 55) redFlagReasons.push('Answer is too short; may appear vague or unprepared');
  if (fillers >= 8) redFlagReasons.push('Too many fillers; can weaken credibility and confidence');
  if (input.redFlags.length) redFlagReasons.push(...input.redFlags.slice(0, 2));

  const level: 'low' | 'medium' | 'high' =
    redFlagReasons.length >= 4 ? 'high' : redFlagReasons.length >= 2 ? 'medium' : 'low';

  const feedback: string[] = [
    'Open with a one-sentence thesis that directly answers the question.',
    'Add 2–3 concrete specifics (dates, costs, modules/role scope) to reduce vagueness.',
    'Keep the story consistent with your submitted documents; avoid new claims you cannot prove.',
    'Use a clear structure: reason → evidence → timeline → post-completion plan.',
    'Avoid overpromising; keep tone factual and compliant.',
    `Include one strong signal: ${input.strongSignals[0] || 'specific program/role fit'}.`,
    `Address a common risk: ${input.redFlags[0] || 'vague reasons / inconsistency'}.`,
    'End with a concise closing that restates intent and compliance.'
  ];

  const nextDrills: string[] = [
    'Rewrite your answer in 3 parts: (1) intent, (2) evidence, (3) timeline + return plan.',
    'Practice a 45-second version and a 90-second version of the same answer.',
    'Create a “numbers card”: tuition, living costs, funding sources, and buffers.',
    'Prepare 3 follow-up answers: Why now? Why this institution/employer? Why this country?',
    'Record yourself once and remove fillers and long pauses in a second take.',
    'List your documents and map each claim to one document you can show.'
  ];

  const culturalTips: string[] = [
    'Answer directly first, then add supporting details; avoid long build-ups.',
    'If you don’t know a detail, say so and explain how you would verify it.',
    'Keep explanations calm, structured, and consistent with your paperwork.'
  ];

  const improvedAnswer = buildImprovedAnswer(input.answer, input.question);

  const disclaimer =
    'Offline coaching mode: this feedback is generated using deterministic rubrics and heuristics. It is informational coaching, not legal advice, and not a guarantee of visa approval.';

  return {
    question: input.question,
    score: {
      overall,
      clarity: clamp(Math.round(clarity), 1, 99),
      confidence: clamp(Math.round(confidence), 1, 99),
      compliance: clamp(Math.round(compliance), 1, 99)
    },
    feedback,
    improvedAnswer,
    culturalTips: input.countryLabel ? [`Context: ${input.countryLabel}`, ...culturalTips] : culturalTips,
    redFlagRisk: { level, reasons: redFlagReasons.slice(0, 6) },
    nextDrills,
    disclaimer
  };
};

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const country = typeof body?.country === 'string' ? body.country.trim().toLowerCase() : undefined;
  const questionId = typeof body?.questionId === 'string' ? body.questionId.trim() : undefined;
  const questionText = typeof body?.questionText === 'string' ? body.questionText.trim() : '';
  const answer = typeof body?.answer === 'string' ? body.answer.trim() : '';
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';
  const selfReport = body?.selfReport && typeof body.selfReport === 'object' ? body.selfReport : undefined;
  const voiceMetrics = body?.voiceMetrics && typeof body.voiceMetrics === 'object' ? body.voiceMetrics : undefined;

  if (!answer || answer.length < 10) return Response.json({ error: 'Please provide your answer.' }, { status: 400, headers: noStore });
  if (answer.length > 6000) return Response.json({ error: 'Answer is too long.' }, { status: 413, headers: noStore });

  const qFromId = questionId ? VISA_INTERVIEW_QUESTIONS.find((q) => q.id === questionId) : undefined;
  const question = (qFromId?.prompt || questionText || '').trim();
  if (!question) return Response.json({ error: 'Please provide a question.' }, { status: 400, headers: noStore });

  const label = country && country in COUNTRY_LABELS ? COUNTRY_LABELS[country as keyof typeof COUNTRY_LABELS] : undefined;

  const cfg = ensureAiConfigured();
  if (!cfg.ok) {
    const offline = offlineCoach({
      question,
      answer,
      countryLabel: label,
      redFlags: qFromId?.redFlags || [],
      strongSignals: qFromId?.strongSignals || [],
      selfReport,
      voiceMetrics
    });
    return Response.json({ ...offline, offline: true }, { status: 200, headers: noStore });
  }

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
    return Response.json(data, { status: 200, headers: noStore });
  } catch {
    const offline = offlineCoach({
      question,
      answer,
      countryLabel: label,
      redFlags: qFromId?.redFlags || [],
      strongSignals: qFromId?.strongSignals || [],
      selfReport,
      voiceMetrics
    });
    return Response.json({ ...offline, offline: true }, { status: 200, headers: noStore });
  }
}
