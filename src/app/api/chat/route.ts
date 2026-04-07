import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { verifyCsrf } from '@/lib/security/csrf';

export async function POST(req: Request) {
  try {
    const csrf = verifyCsrf(req);
    if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403 });

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: 'Concierge is not configured on the server (missing OPENAI_API_KEY).' },
        { status: 503 }
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

    return result.toTextStreamResponse();
  } catch (err) {
    console.error('Concierge API error:', err);
    return Response.json({ error: 'Concierge service error' }, { status: 502 });
  }
}
