import { addToCardWaitlist } from '@/lib/cardWaitlistStorage';
import type { CardTier } from '@/data/card/tiers';
import { queueSubmissionWebhook } from '@/lib/submissionsWebhook';
import { verifyCsrf } from '@/lib/security/csrf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isTier = (v: unknown): v is CardTier => v === 'standard' || v === 'pro' || v === 'elite' || v === 'black';

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const MAX_BODY_BYTES = 16 * 1024;

function extractClientIp(headers: Headers): string {
  const candidates = [
    headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    headers.get('x-real-ip')?.trim(),
    headers.get('cf-connecting-ip')?.trim(),
    headers.get('x-vercel-forwarded-for')?.trim(),
    headers.get('true-client-ip')?.trim(),
  ];

  for (const c of candidates) {
    if (c && c.length > 0) return c;
  }

  return 'unknown';
}

type RateEntry = { count: number; resetAt: number };
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const recent = new Map<string, RateEntry>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const existing = recent.get(key);

  if (!existing || now >= existing.resetAt) {
    recent.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX) return false;

  existing.count += 1;
  return true;
}

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403 });

  const contentLength = Number(req.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: 'Request body too large' }, { status: 413 });
  }

  const ip = extractClientIp(req.headers);
  const ua = req.headers.get('user-agent')?.slice(0, 120) ?? 'unknown';
  const rateKey = `${ip}|${ua}`;
  if (!checkRateLimit(rateKey)) {
    return Response.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  }

  const body = (await req.json().catch(() => null)) as
    | { email?: unknown; tier?: unknown; website?: unknown; companyWebsite?: unknown; _hp?: unknown }
    | null;

  const honeypot = typeof body?.website === 'string' ? body.website.trim() : typeof body?.companyWebsite === 'string' ? body.companyWebsite.trim() : typeof body?._hp === 'string' ? body._hp.trim() : '';
  if (honeypot) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const rawTier = body?.tier;
  const tier: CardTier = isTier(rawTier) ? rawTier : 'standard';

  if (!email || !isEmail(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const entry = addToCardWaitlist(email, tier);
    queueSubmissionWebhook({
      kind: 'card_waitlist',
      receivedAt: new Date().toISOString(),
      data: { id: entry.id, email: entry.email, tier: entry.tier }
    });
    return Response.json({ id: entry.id }, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to save' }, { status: 500 });
  }
}
