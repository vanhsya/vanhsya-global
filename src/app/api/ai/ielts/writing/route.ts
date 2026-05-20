import { IELTS_WRITING_RUBRICS } from '../../../../../data/ai/ielts.ts';
import { ensureAiConfigured, generateJson } from '../../../../../lib/aiJson.ts';
import { verifyCsrf } from '../../../../../lib/security/csrf.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

const noStore = { 'cache-control': 'no-store' };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const countWords = (s: string) => (s.trim().match(/\S+/g) || []).length;

const sentenceCount = (s: string) => (s.match(/[.!?]/g) || []).length || 1;

const uniqueWordRatio = (s: string) => {
  const words = (s.toLowerCase().match(/[a-z']+/g) || []).filter(Boolean);
  if (!words.length) return 0;
  return new Set(words).size / words.length;
};

const offlineWriting = (input: { text: string; task: 'task1' | 'task2' }) => {
  const words = countWords(input.text);
  const sentences = sentenceCount(input.text);
  const avgSent = words / Math.max(1, sentences);
  const uniq = uniqueWordRatio(input.text);
  const hasParagraphs = /\n\s*\n/.test(input.text);
  const hasLinkers = /\b(however|therefore|moreover|firstly|secondly|in addition|for example|as a result)\b/i.test(input.text);

  let base = 5.5;
  if (words >= (input.task === 'task2' ? 240 : 150)) base += 0.5;
  if (words < (input.task === 'task2' ? 200 : 120)) base -= 0.5;
  if (avgSent >= 14 && avgSent <= 24) base += 0.5;
  if (avgSent > 30 || avgSent < 10) base -= 0.5;
  if (uniq >= 0.58) base += 0.5;
  if (uniq < 0.45) base -= 0.5;
  if (hasParagraphs) base += 0.5;
  if (hasLinkers) base += 0.5;

  const bandEstimate = clamp(Math.round(base * 2) / 2, 4, 8);

  const criteria = {
    taskAchievement: {
      band: clamp(bandEstimate - (words < (input.task === 'task2' ? 220 : 140) ? 1 : 0), 4, 8),
      notes: [
        input.task === 'task2' ? 'Ensure your position is clear in the introduction and conclusion.' : 'Describe key features and make comparisons clearly.',
        'Add specific support/examples tied to the prompt and avoid generic statements.'
      ]
    },
    coherenceCohesion: {
      band: clamp(bandEstimate + (hasParagraphs ? 0.5 : -0.5), 4, 8),
      notes: [
        hasParagraphs ? 'Paragraphing detected; ensure each paragraph has a single purpose.' : 'Add paragraphing to structure ideas logically.',
        hasLinkers ? 'Linking words detected; avoid overusing the same connectors.' : 'Use a wider range of cohesive devices (however, therefore, for example).'
      ]
    },
    lexicalResource: {
      band: clamp(bandEstimate + (uniq >= 0.55 ? 0.5 : -0.5), 4, 8),
      notes: [
        uniq >= 0.55 ? 'Vocabulary variety appears reasonable for your band target.' : 'Vocabulary repetition detected; add synonyms and precise terms.',
        'Prefer precise nouns/verbs over vague words (thing, good, bad, nice).'
      ]
    },
    grammarRangeAccuracy: {
      band: clamp(bandEstimate + (avgSent >= 12 && avgSent <= 24 ? 0.5 : -0.5), 4, 8),
      notes: [
        'Aim for a mix of simple and complex sentences (relative clauses, conditionals).',
        'Do a final pass for subject-verb agreement, articles, and punctuation.'
      ]
    }
  } as Res['criteria'];

  const strengths = [
    hasParagraphs ? 'Clear paragraph structure present' : 'Content provided with an attempt to structure ideas',
    uniq >= 0.55 ? 'Reasonable lexical variety' : 'Some topic-relevant vocabulary present',
    hasLinkers ? 'Some cohesion devices used' : 'Ideas can be linked more explicitly'
  ];

  const weaknesses = [
    words < (input.task === 'task2' ? 220 : 140) ? 'Word count may be below a safe range; expand with relevant support' : 'Support examples can be more specific',
    !hasParagraphs ? 'Paragraphing is missing or unclear' : 'Paragraph topic sentences can be stronger',
    uniq < 0.5 ? 'Repeated vocabulary reduces lexical score' : 'Word choice can be more precise'
  ];

  const improvements = [
    'Write a 2-sentence introduction: paraphrase prompt + thesis/overview.',
    'Add one concrete example per main idea (numbers, dates, outcomes).',
    'Use topic sentences at the start of each paragraph.',
    'Vary linking words; avoid repeating “also” and “because”.',
    'Add 3 complex sentences (relative clause, conditional, concession).',
    'Do a final error scan: articles, verb tenses, punctuation.'
  ];

  const days = Array.from({ length: 14 }).map((_, i) => {
    const day = i + 1;
    const focus =
      day <= 3
        ? 'Structure'
        : day <= 6
          ? 'Cohesion'
          : day <= 9
            ? 'Vocabulary'
            : day <= 12
              ? 'Grammar'
              : 'Full mock';
    const drills =
      focus === 'Structure'
        ? ['Rewrite an introduction + conclusion', 'Outline 4 paragraphs in 5 minutes', 'Add one example to each paragraph']
        : focus === 'Cohesion'
          ? ['Underline linking phrases and replace repetitions', 'Write 6 sentence transitions', 'Cohesion mapping (idea → support → result)']
          : focus === 'Vocabulary'
            ? ['Create a synonym set for 10 common words', 'Replace vague words with precise terms', 'Topic vocabulary list + collocations']
            : focus === 'Grammar'
              ? ['Write 10 complex sentences (relative/conditional)', 'Error correction drill from your last writing', 'Punctuation scan']
              : ['Write a full task response timed', 'Self-check with checklist', 'Rewrite weakest paragraph'];
    return { day, focus, drills };
  });

  return {
    bandEstimate,
    criteria,
    strengths,
    weaknesses,
    improvements,
    studyPlan: { days },
    disclaimer:
      'Offline mode: this is a conservative band estimate based on surface-level heuristics (length, structure, cohesion signals). It is not an official IELTS score.'
  } satisfies Res;
};

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const text = typeof body?.text === 'string' ? body.text.trim() : '';
  const task = body?.task === 'task1' || body?.task === 'task2' ? body.task : 'task2';
  const targetBand = typeof body?.targetBand === 'number' ? body.targetBand : undefined;
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';

  if (!text || text.length < 80)
    return Response.json({ error: 'Please provide at least 80 characters of writing.' }, { status: 400, headers: noStore });
  if (text.length > 14000) return Response.json({ error: 'Text is too long.' }, { status: 413, headers: noStore });

  const cfg = ensureAiConfigured();
  if (!cfg.ok) {
    const offline = offlineWriting({ text, task });
    return Response.json({ ...offline, offline: true, language, targetBand }, { status: 200, headers: noStore });
  }

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
    return Response.json(data, { status: 200, headers: noStore });
  } catch {
    const offline = offlineWriting({ text, task });
    return Response.json({ ...offline, offline: true, language, targetBand }, { status: 200, headers: noStore });
  }
}
