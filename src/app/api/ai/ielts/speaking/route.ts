export const runtime = 'nodejs';

import { ensureAiConfigured, generateJson } from '@/lib/aiJson';
import { IELTS_SPEAKING_CRITERIA } from '@/data/ai/ielts';
import { verifyCsrf } from '@/lib/security/csrf';

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

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403 });

  const config = ensureAiConfigured();
  if (!config.ok) return Response.json({ error: config.error }, { status: 503 });

  const body = (await req.json().catch(() => null)) as Req | null;
  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
  const transcript = typeof body?.transcript === 'string' ? body.transcript.trim() : '';
  const targetBand = typeof body?.targetBand === 'number' ? body.targetBand : 7;
  const language = typeof body?.language === 'string' ? body.language.trim() : 'en';

  if (!prompt) return Response.json({ error: 'Prompt is required.' }, { status: 400 });
  if (transcript.length < 120) return Response.json({ error: 'Transcript is too short. Speak at least 30–40 words.' }, { status: 400 });
  if (transcript.length > 14000) return Response.json({ error: 'Transcript is too long.' }, { status: 400 });

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

  return Response.json(ai.data, { status: 200 });
}
