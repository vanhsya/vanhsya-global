import { coerceString, coerceStringArray, ensureAiConfigured, generateJson } from '../../../../lib/aiJson.ts';
import { verifyCsrf } from '../../../../lib/security/csrf.ts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Req = {
  language?: unknown;
  targetCountry?: unknown;
  program?: unknown;
  universityOrEmployer?: unknown;
  background?: unknown;
  goals?: unknown;
  ties?: unknown;
  achievements?: unknown;
  concerns?: unknown;
};

type Result = {
  title: string;
  sop: string;
  outline: string[];
  personalizationChecklist: string[];
  disclaimer: string;
};

const noStore = { 'cache-control': 'no-store' };

const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

const fallback = (input: {
  language: string;
  targetCountry: string;
  program: string;
  universityOrEmployer: string;
  background: string;
  goals: string;
  ties: string;
  achievements: string;
  concerns: string;
}): Result => {
  const title = `Statement of Purpose — ${input.targetCountry} (${input.program})`;
  const outline = [
    'Introduction and objective',
    'Academic/professional background',
    'Why this program and destination',
    'Future plan and return ties',
    'Financial and compliance readiness',
    'Closing'
  ];
  const sop = [
    `I am applying for ${input.program}${input.universityOrEmployer ? ` at ${input.universityOrEmployer}` : ''} in ${input.targetCountry}.`,
    '',
    input.background || 'I have built a strong foundation through my education and professional experience.',
    '',
    input.goals || 'My goal is to develop specialized skills that align with my long-term career plan.',
    '',
    input.ties || 'I maintain strong ties to my home country through family, professional commitments, and clear post-completion plans.',
    '',
    input.achievements ? `Key achievements: ${input.achievements}` : 'I have consistently focused on measurable outcomes and continuous improvement.',
    '',
    input.concerns
      ? `I understand the application concerns and address them as follows: ${input.concerns}`
      : 'I understand the requirements and will comply fully with all immigration conditions.',
    '',
    'Thank you for considering my application.'
  ].join('\n');
  return {
    title,
    sop,
    outline,
    personalizationChecklist: [
      'Replace placeholders with exact dates, institutions, and evidence',
      'Add 2–3 concrete metrics or achievements',
      'Align program choice with your career plan',
      'Ensure ties and return plan are credible and consistent'
    ],
    disclaimer: 'Draft only. Verify accuracy, ensure consistency with documents, and consider legal review.'
  };
};

const normalizeResult = (data: unknown): Result => {
  const value = data && typeof data === 'object' ? (data as Partial<Result>) : {};
  return {
    title: coerceString(value.title, 'Statement of Purpose Draft', 160),
    sop: coerceString(value.sop, 'Add verified applicant details before using this draft.', 7000),
    outline: coerceStringArray(value.outline, ['Introduction', 'Background', 'Program fit', 'Future plan', 'Compliance'], 10, 140),
    personalizationChecklist: coerceStringArray(
      value.personalizationChecklist,
      ['Verify all dates, institutions, funds, and supporting evidence before submission.'],
      10,
      180
    ),
    disclaimer: coerceString(value.disclaimer, 'Draft only. Verify accuracy and consider legal review.', 260)
  };
};

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const input = {
    language: s(body?.language) || 'en',
    targetCountry: s(body?.targetCountry),
    program: s(body?.program),
    universityOrEmployer: s(body?.universityOrEmployer),
    background: s(body?.background),
    goals: s(body?.goals),
    ties: s(body?.ties),
    achievements: s(body?.achievements),
    concerns: s(body?.concerns)
  };

  if (!input.targetCountry || !input.program || !input.background) {
    return Response.json({ error: 'Target country, program, and background are required.' }, { status: 400, headers: noStore });
  }

  const cfg = ensureAiConfigured();
  if (!cfg.ok) {
    return Response.json({ ok: true, offline: true, result: fallback(input) }, { status: 200, headers: noStore });
  }

  const system =
    'You write a Statement of Purpose. You must not invent institutions, dates, or claims. Use the user inputs only. Be clear, non-repetitive, and consistent. Output JSON only.';

  const prompt = JSON.stringify(
    {
      input,
      outputSchema: {
        title: 'string',
        sop: 'string',
        outline: ['string'],
        personalizationChecklist: ['string'],
        disclaimer: 'string'
      },
      rules: [
        'SOP should be 500–900 words unless input is too sparse; then keep it shorter and note missing details.',
        'Address ties and compliance explicitly when provided.',
        'Avoid generic filler; reference concrete input facts.',
        'Keep the tone professional and calm.'
      ]
    },
    null,
    2
  );

  try {
    const { data } = await generateJson<Result>({ system, prompt, maxOutputTokens: 2600, validate: normalizeResult });
    return Response.json(data, { status: 200, headers: noStore });
  } catch {
    return Response.json({ ok: true, offline: true, result: fallback(input) }, { status: 200, headers: noStore });
  }
}
