import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const ensureAiConfigured = () => {
  if (!process.env.OPENAI_API_KEY) {
    return { ok: false as const, error: 'AI is not configured on the server (missing OPENAI_API_KEY).' };
  }
  return { ok: true as const };
};

export const generateJson = async <T>(input: { system: string; prompt: string }): Promise<{ data: T; raw: string }> => {
  const result = await generateText({
    model: openai(process.env.OPENAI_MODEL || 'gpt-4o'),
    system: input.system,
    prompt: `${input.prompt}\n\nReturn ONLY valid JSON.`
  });

  const raw = result.text.trim();
  const start = raw.indexOf('{');
  const end = raw.lastIndexOf('}');
  const jsonText = start >= 0 && end >= 0 && end > start ? raw.slice(start, end + 1) : raw;
  const data = JSON.parse(jsonText) as T;
  return { data, raw };
};

