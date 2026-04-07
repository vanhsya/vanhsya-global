import { openai } from '@ai-sdk/openai';
import { createUIMessageStream, createUIMessageStreamResponse, streamText } from 'ai';
import { verifyCsrf } from '@/lib/security/csrf';

const singleMessageStream = (text: string) => {
  const stream = createUIMessageStream({
    execute({ writer }) {
      const id = 'system';
      writer.write({ type: 'text-start', id });
      writer.write({ type: 'text-delta', id, delta: text });
      writer.write({ type: 'text-end', id });
    }
  });

  return createUIMessageStreamResponse({
    status: 200,
    headers: { 'cache-control': 'no-store' },
    stream
  });
};

export async function POST(req: Request) {
  try {
    const csrf = verifyCsrf(req);
    if (!csrf.ok) return singleMessageStream(`Request blocked. ${csrf.reason}`);

    if (!process.env.OPENAI_API_KEY) {
      return singleMessageStream(
        'Concierge is temporarily offline. Please try again later, or email founder@vanhsya.com for investors and career@vanhsya.com for careers.'
      );
    }

    const body = await req.json().catch(() => null);
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const result = streamText({
      model: openai(process.env.OPENAI_MODEL || 'gpt-4o'),
      system:
        "You are VANHSYA's Immigration Concierge. You help clients with global migration and premium relocation services. Be precise, scam-aware, and action-oriented. Ask clarifying questions when needed. If the user requests investment or careers, direct them to founder@vanhsya.com and career@vanhsya.com.",
      messages
    });

    return result.toUIMessageStreamResponse({
      onError(error) {
        if (error == null) return 'unknown error';
        if (typeof error === 'string') return error;
        if (error instanceof Error) return error.message;
        try {
          return JSON.stringify(error);
        } catch {
          return 'unknown error';
        }
      }
    });
  } catch (err) {
    console.error('Concierge API error:', err);
    return singleMessageStream('Concierge service error.');
  }
}
