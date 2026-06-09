import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

type GenerateJsonInput<T> = {
  system: string;
  prompt: string;
  temperature?: number;
  maxOutputTokens?: number;
  validate?: (data: unknown) => T;
};

export const ensureAiConfigured = () => {
  if (!process.env.OPENAI_API_KEY) {
    return { ok: false as const, error: 'AI is not configured on the server (missing OPENAI_API_KEY).' };
  }
  return { ok: true as const };
};

const extractJsonObject = (raw: string) => {
  const text = raw.trim();
  const start = text.indexOf('{');
  if (start < 0) return text;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (ch === '"') {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }

  return text;
};

const precisionSystemRules = [
  'Use only the facts supplied in the request or in the provided knowledge base.',
  'When information is missing, say what is missing instead of inventing details.',
  'Do not guarantee approvals, timelines, outcomes, eligibility, prices, or legal results.',
  'Prefer conservative estimates and evidence-backed reasoning over confident guesses.',
  'Return one valid JSON object only, with no markdown, no code fences, and no extra prose.'
].join('\n- ');

export const generateJson = async <T>(input: GenerateJsonInput<T>): Promise<{ data: T; raw: string }> => {
  const result = await generateText({
    model: openai(process.env.OPENAI_MODEL || 'gpt-4o'),
    temperature: input.temperature ?? 0.2,
    maxOutputTokens: input.maxOutputTokens ?? 1800,
    system: `${input.system}\n\nPrecision rules:\n- ${precisionSystemRules}`,
    prompt: `${input.prompt}\n\nReturn ONLY valid JSON.`
  });

  const raw = result.text.trim();
  const jsonText = extractJsonObject(raw);
  const parsed = JSON.parse(jsonText) as unknown;
  const data = input.validate ? input.validate(parsed) : (parsed as T);
  return { data, raw };
};

export const coerceString = (value: unknown, fallback = '', maxLength = 1600) => {
  const text = typeof value === 'string' ? value.trim() : fallback;
  return text.slice(0, maxLength);
};

export const coerceStringArray = (value: unknown, fallback: string[] = [], maxItems = 12, maxLength = 240) => {
  const source = Array.isArray(value) ? value : fallback;
  return source
    .map((item) => coerceString(item, '', maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
};

export const coerceNumber = (value: unknown, fallback: number, min: number, max: number) => {
  const num = typeof value === 'number' && Number.isFinite(value) ? value : fallback;
  return Math.max(min, Math.min(max, num));
};

export const coerceEnum = <T extends string>(value: unknown, allowed: readonly T[], fallback: T) =>
  typeof value === 'string' && allowed.includes(value as T) ? (value as T) : fallback;
