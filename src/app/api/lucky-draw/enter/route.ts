import { NextRequest, NextResponse } from 'next/server';
import { verifyCsrf } from '@/lib/security/csrf';
import { findEntry, readLuckyDraw, type LuckyDrawEntry, writeLuckyDraw } from '@/lib/luckyDrawStorage';
import { queueSubmissionWebhook } from '@/lib/submissionsWebhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 8 * 1024;

type RateEntry = { count: number; resetAt: number };
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const recent = new Map<string, RateEntry>();

const monthKey = (d: Date) => {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
};

const normalizeEmail = (value: unknown) => {
  if (typeof value !== 'string') return null;
  const v = value.trim().toLowerCase();
  if (!v) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return null;
  return v;
};

const normalizeString = (value: unknown): string | undefined => {
  if (typeof value === 'string') {
    const v = value.trim();
    return v.length > 0 ? v : undefined;
  }
  return undefined;
};

const extractClientIp = (req: NextRequest): string => {
  const candidates = [
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    req.headers.get('x-real-ip')?.trim(),
    req.headers.get('cf-connecting-ip')?.trim(),
    req.headers.get('x-vercel-forwarded-for')?.trim(),
    req.headers.get('true-client-ip')?.trim(),
  ];

  for (const c of candidates) {
    if (c && c.length > 0) return c;
  }

  return 'unknown';
};

const checkRateLimit = (key: string): boolean => {
  const now = Date.now();
  const existing = recent.get(key);

  if (!existing || now >= existing.resetAt) {
    recent.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX) return false;

  existing.count += 1;
  return true;
};

const jsonNoStore = (body: unknown, init?: { status?: number }) =>
  NextResponse.json(body, {
    status: init?.status,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });

export async function POST(req: NextRequest) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return jsonNoStore({ error: csrf.reason ?? 'Invalid request' }, { status: 403 });

  const contentLength = Number(req.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonNoStore({ error: 'Request body too large' }, { status: 413 });
  }

  const ip = extractClientIp(req);
  const ua = req.headers.get('user-agent')?.slice(0, 120) ?? 'unknown';
  const rateKey = `enter|${ip}|${ua}`;
  if (!checkRateLimit(rateKey)) {
    return jsonNoStore({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  }

  let body: Record<string, unknown> | null;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return jsonNoStore({ error: 'Invalid request body' }, { status: 400 });
  }

  const honeypot = normalizeString(body?.website ?? body?.companyWebsite ?? body?._hp);
  if (honeypot) {
    const now = new Date();
    const month = monthKey(now);
    const id = crypto.randomUUID();
    return jsonNoStore({ ok: true, alreadyEntered: false, month, entryId: id }, { status: 200 });
  }

  const email = normalizeEmail(body?.email);
  if (!email) return jsonNoStore({ error: 'Valid email is required.' }, { status: 400 });

  const now = new Date();
  const month = monthKey(now);
  const existing = findEntry(month, email);
  if (existing) {
    return jsonNoStore(
      {
        ok: true,
        alreadyEntered: true,
        month,
        entryId: existing.id
      },
      { status: 200 }
    );
  }

  const id = crypto.randomUUID();
  const createdAt = now.toISOString();
  const source = typeof body?.source === 'string' ? String(body.source).slice(0, 80) : undefined;

  const entry: LuckyDrawEntry = {
    id,
    createdAt,
    month,
    email,
    status: 'entered',
    source
  };

  const data = readLuckyDraw();
  data.entries.unshift(entry);
  writeLuckyDraw(data);

  queueSubmissionWebhook({
    kind: 'lucky_draw_entry',
    receivedAt: createdAt,
    data: {
      id,
      month,
      email,
      source: source ?? 'ai_innovations_lucky_draw'
    }
  });

  return jsonNoStore(
    {
      ok: true,
      alreadyEntered: false,
      month,
      entryId: id
    },
    { status: 200 }
  );
}
