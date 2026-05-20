export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { ensureAiConfigured, generateJson } from '../../../../../lib/aiJson.ts';
import { IELTS_SPEAKING_CRITERIA } from '../../../../../data/ai/ielts.ts';
import { verifyCsrf } from '../../../../../lib/security/csrf.ts';

type Req = {
  prompt?: unknown;
  transcript?: unknown;
  targetBand?: unknown;
  language?: unknown;
};

type Res = {
  prompt: string;
  bandEstimate: number;
  criteria: Record<string, { band: number; notes: string[] }>;
  strengths: string[];
  weaknesses: string[];
  improvements: string[];
  drills: string[];
  disclaimer: string;
};

const noStore = { 'cache-control': 'no-store' };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const countWords = (s: string) => (s.trim().match(/\S+/g) || []).length;

const countFillers = (s: string) => (s.toLowerCase().match(/\b(um|uh|like|you know|actually)\b/g) || []).length;

const uniqueWordRatio = (s: string) => {
  const words = (s.toLowerCase().match(/[a-z']+/g) || []).filter(Boolean);
  if (!words.length) return 0;
  return new Set(words).size / words.length;
};

const offlineSpeaking = (input: { prompt: string; transcript: string; targetBand: number }): Res => {
  const words = countWords(input.transcript);
  const fillers = countFillers(input.transcript);
  const uniq = uniqueWordRatio(input.transcript);
  const hasLinkers = /\b(however|because|so|therefore|for example|in my opinion|on the other hand)\b/i.test(input.transcript);
  const hasPast = /\b(was|were|did|had|went|made)\b/i.test(input.transcript);
  const hasFuture = /\b(will|going to|plan to)\b/i.test(input.transcript);

  let base = 6.0;
  if (words >= 110) base += 0.5;
  if (words < 70) base -= 0.5;
  if (fillers >= 6) base -= 0.5;
  if (fillers >= 10) base -= 0.5;
  if (uniq >= 0.58) base += 0.5;
  if (uniq < 0.45) base -= 0.5;
  if (hasLinkers) base += 0.5;
  if (hasPast && hasFuture) base += 0.5;

  const bandEstimate = clamp(Math.round(base * 2) / 2, 4.5, 8.5);

  const criteria: Res['criteria'] = {
    fluencyCoherence: {
      band: clamp(bandEstimate + (fillers <= 4 ? 0.5 : -0.5), 4.5, 8.5),
      notes: [
        fillers <= 4 ? 'Relatively few fillers detected; keep a steady pace.' : 'Fillers detected; practice pausing instead of using fillers.',
        hasLinkers ? 'Some linking language present; vary connectors naturally.' : 'Add simple linking (because, so, however, for example).'
      ]
    },
    lexicalResource: {
      band: clamp(bandEstimate + (uniq >= 0.55 ? 0.5 : -0.5), 4.5, 8.5),
      notes: [
        uniq >= 0.55 ? 'Vocabulary variety looks reasonable from transcript.' : 'Repeated vocabulary detected; add synonyms and topic phrases.',
        'Use precise verbs and nouns; avoid vague words like “thing”, “stuff”, “nice”.'
      ]
    },
    grammarRangeAccuracy: {
      band: clamp(bandEstimate + (hasPast && hasFuture ? 0.5 : -0.5), 4.5, 8.5),
      notes: [
        hasPast && hasFuture ? 'Some tense range detected; keep accuracy consistent.' : 'Add more tense variety (past experience + future plan).',
        'Reduce long sentences; aim for clear clauses with correct agreement.'
      ]
    },
    pronunciation: {
      band: clamp(bandEstimate, 4.5, 8.5),
      notes: [
        'Pronunciation cannot be reliably scored from transcript alone.',
        'Record yourself and check stress, intonation, and clarity with a coach or playback.'
      ]
    }
  };

  const strengths = [
    words >= 90 ? 'Response length supports development of ideas' : 'Response provided with some development',
    hasLinkers ? 'Some coherence/linking language present' : 'Ideas can be made more connected with simple linking words',
    uniq >= 0.55 ? 'Vocabulary variety appears decent' : 'Some topic vocabulary present'
  ];

  const weaknesses = [
    fillers >= 6 ? 'Many fillers reduce fluency impression' : 'Reduce pauses and keep a steady pace',
    uniq < 0.5 ? 'Vocabulary repetition limits lexical score' : 'Use more precise collocations for the topic',
    !(hasPast && hasFuture) ? 'Limited tense variety detected' : 'Increase accuracy for complex sentences'
  ];

  const improvements = [
    'Use a 3-part structure: point → example → result.',
    'Add one “for example” story with a clear beginning and outcome.',
    'Replace fillers with a short pause; keep sentences shorter.',
    'Use 6 topic phrases and 6 connectors across the answer.',
    'Include one past experience and one future plan to show range.',
    'Conclude with a 1–2 sentence summary.'
  ];

  const drills = [
    'Record a 60-second answer, then re-record aiming for fewer fillers.',
    'Shadow a native-speaker clip for 2 minutes daily (stress + rhythm).',
    'Practice answering with 3 connectors: because, however, for example.',
    'Tell a short story: situation → action → result (30 seconds).',
    'Write 8 useful topic phrases and use them in a new answer.',
    'Do a timed 90-second response with a clear conclusion.'
  ];

  return {
    prompt: input.prompt,
    bandEstimate,
    criteria,
    strengths,
    weaknesses,
    improvements,
    drills,
    disclaimer:
      'Offline mode: band is a conservative estimate based on transcript-only heuristics (length, fillers, cohesion signals). Pronunciation cannot be assessed from transcript. Not an official IELTS score.'
  };
};

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
  const transcript = typeof body?.transcript === 'string' ? body.transcript.trim() : '';
  const targetBand = typeof body?.targetBand === 'number' ? body.targetBand : 7;
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';

  if (!prompt) return Response.json({ error: 'Prompt is required.' }, { status: 400, headers: noStore });
  if (transcript.length < 120)
    return Response.json({ error: 'Transcript is too short. Speak at least 30–40 words.' }, { status: 400, headers: noStore });
  if (transcript.length > 14000) return Response.json({ error: 'Transcript is too long.' }, { status: 400, headers: noStore });

  const config = ensureAiConfigured();
  if (!config.ok) {
    const offline = offlineSpeaking({ prompt, transcript, targetBand });
    return Response.json({ ...offline, offline: true, language, targetBand }, { status: 200, headers: noStore });
  }

  const criteria = IELTS_SPEAKING_CRITERIA.map((c) => ({
    id: c.id,
    name: c.name,
    bandDescriptors: c.bandDescriptors
  }));

  const system = `You are an IELTS Speaking examiner and coach. You must be conservative with band estimates.

Return ONLY valid JSON matching this schema:
{
  "prompt": string,
  "bandEstimate": number,
  "criteria": { [key: string]: { "band": number, "notes": string[] } },
  "strengths": string[],
  "weaknesses": string[],
  "improvements": string[],
  "drills": string[],
  "disclaimer": string
}

Rules:
- Band must be between 1 and 9, allow halves (.5).
- Pronunciation cannot be fully evaluated from transcript; if you mention it, be explicit about this limitation.
- Be specific and actionable, avoid generic advice.`;

  const ai = await generateJson<Res>({
    system,
    prompt: `Language code: ${language}
Target band: ${targetBand}

Prompt:
${prompt}

Transcript:
${transcript}

Speaking criteria descriptors:
${JSON.stringify(criteria)}

Produce a conservative bandEstimate and criterion-level notes. Provide 6-10 improvements and 6-10 drills.`
  });

  return Response.json(ai.data, { status: 200, headers: noStore });
}
