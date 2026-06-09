import { openai } from '@ai-sdk/openai';
import { createUIMessageStream, createUIMessageStreamResponse, streamText } from 'ai';
import { verifyCsrf } from '@/lib/security/csrf';
import { getConciergeKnowledge, formatConciergeKnowledgeForSystemPrompt } from '@/lib/conciergeKnowledge';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
    const meta = body?.meta && typeof body.meta === 'object' ? body.meta : null;
    const metaLang = typeof meta?.lang === 'string' ? meta.lang : null;
    const metaTone = typeof meta?.tone === 'string' ? meta.tone : null;
    const metaDomain = typeof meta?.domain === 'string' ? meta.domain : null;
    const metaChannel = typeof meta?.channel === 'string' ? meta.channel : null;

    const authHeader = req.headers.get('authorization') || '';
    const authToken = (() => {
      const m = authHeader.match(/^Bearer\s+(.+)$/i);
      return m ? m[1].trim() : null;
    })();

    const userContext = await (async () => {
      if (!authToken) return null;
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !anonKey) return null;
      try {
        const supabase = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
        const { data, error } = await supabase.auth.getUser(authToken);
        if (error) return null;
        const u = data.user;
        if (!u) return null;
        return {
          id: typeof (u as any)?.id === 'string' ? (u as any).id : null,
          email: typeof (u as any)?.email === 'string' ? (u as any).email : null,
          phone: typeof (u as any)?.phone === 'string' ? (u as any).phone : null,
          appMetadata: (u as any)?.app_metadata && typeof (u as any).app_metadata === 'object' ? (u as any).app_metadata : null,
          userMetadata: (u as any)?.user_metadata && typeof (u as any).user_metadata === 'object' ? (u as any).user_metadata : null
        };
      } catch {
        return null;
      }
    })();

    const knowledge = await getConciergeKnowledge();
    const knowledgeText = knowledge.ok ? formatConciergeKnowledgeForSystemPrompt(knowledge.record) : null;
    const currentDate = new Date().toISOString().slice(0, 10);

    const result = streamText({
      model: openai(process.env.OPENAI_MODEL || 'gpt-4o'),
      temperature: 0.2,
      maxOutputTokens: 900,
      system:
        `You are VANHSYA's unified AI Concierge for the entire VANHSYA ecosystem: immigration/relocation services, Vanhsya Travels, Vanhsya Beauty, and Vyno Coin. Be precise, scam-aware, and action-oriented. Ask clarifying questions when needed. Never guess unknown policies, prices, or regulatory facts.\n\nCurrent date: ${currentDate}\n\nPrecision rules:\n- Use only the VANHSYA knowledge base, authenticated user context, and user-provided facts.\n- If a policy, price, deadline, government rule, visa processing time, crypto detail, or availability may have changed and is not in the knowledge base, say it needs official verification.\n- Separate confirmed facts from assumptions.\n- Ask one focused clarifying question when the request lacks enough detail.\n- Never guarantee approvals, refunds, timelines, outcomes, eligibility, investment returns, or legal results.\n\nLanguage rules:\n- Always respond in the language used by the user in their latest message.\n- If a preferred language is provided, respond in that language.\n\nStyle rules:\n- Adapt tone to the user and context (formal for business travel/finance, friendly for beauty, empathetic for support issues).\n- Keep responses voice-friendly: short paragraphs, clear steps, and concise confirmations.\n\nPrivacy & safety:\n- Never request or reveal passwords, OTPs, private keys/seed phrases, or full payment card data.\n- For Vyno Coin: provide general educational info only and suggest official resources/support for compliance questions.\n\nRouting map (for navigation help):\n- /services (services)\n- /consultation (book a consultation)\n- /contact (support, WhatsApp, email)\n- /countries (destinations)\n- /ai-tools (AI tools suite)\n- /ai-innovations (CV maker, referrals, lucky draw)\n- /expose (scam reporting)\n- /portal (client portal login)\n- /status (system status)\n\nIf a user is stuck or asks where to find something, tell them the exact route(s) above and what to click/do next. If the user requests investment or careers, direct them to founder@vanhsya.com and career@vanhsya.com.\n\nRequest context:\n- channel: ${metaChannel || 'unknown'}\n- domain: ${metaDomain || 'unknown'}\n- tone: ${metaTone || 'auto'}\n- preferredLanguage: ${metaLang || 'auto'}\n\nAuthenticated user context (if present; do not mention tokens):\n${userContext ? JSON.stringify(userContext) : 'none'}\n\nVANHSYA knowledge base (JSON; may be incomplete):\n${knowledgeText || '{"error":"Knowledge not available."}'}`,
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
