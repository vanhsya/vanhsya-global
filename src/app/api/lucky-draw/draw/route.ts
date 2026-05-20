import { NextRequest, NextResponse } from 'next/server';
import { randomInt, timingSafeEqual } from 'node:crypto';
import { findDraw, readLuckyDraw, writeLuckyDraw } from '@/lib/luckyDrawStorage';
import { verifyCsrf } from '@/lib/security/csrf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 8 * 1024;

const monthKey = (d: Date) => {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
};

const normalizeMonth = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  if (!/^\d{4}-\d{2}$/.test(v)) return null;
  const [yRaw, mRaw] = v.split('-');
  const y = Number(yRaw);
  const m = Number(mRaw);
  if (!Number.isFinite(y) || !Number.isFinite(m)) return null;
  if (m < 1 || m > 12) return null;
  if (y < 2020 || y > 2100) return null;
  return v;
};

const normalizeBoolean = (value: unknown): boolean => {
  if (value === true) return true;
  if (value === false) return false;
  if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
  return Boolean(value);
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

type RateEntry = { count: number; resetAt: number };
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const recent = new Map<string, RateEntry>();

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

const constantTimeEqual = (a: string, b: string): boolean => {
  const enc = new TextEncoder();
  const aa = enc.encode(a);
  const bb = enc.encode(b);
  if (aa.length !== bb.length) return false;
  return timingSafeEqual(aa, bb);
};

const pickDistinct = <T,>(items: T[], count: number) => {
  const pool = items.slice();
  const out: T[] = [];
  const take = Math.min(count, pool.length);
  for (let i = 0; i < take; i++) {
    const idx = randomInt(0, pool.length);
    out.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return out;
};

export async function POST(req: NextRequest) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return jsonNoStore({ error: csrf.reason ?? 'Invalid request' }, { status: 403 });

  const token = process.env.LOTTERY_ADMIN_TOKEN;
  if (!token) return jsonNoStore({ error: 'Lottery draw not configured.' }, { status: 501 });

  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Bearer ')) return jsonNoStore({ error: 'Unauthorized' }, { status: 401 });
  if (!constantTimeEqual(auth.slice('Bearer '.length), token)) {
    return jsonNoStore({ error: 'Unauthorized' }, { status: 401 });
  }

  const contentLength = Number(req.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonNoStore({ error: 'Request body too large' }, { status: 413 });
  }

  const ip = extractClientIp(req);
  const ua = req.headers.get('user-agent')?.slice(0, 120) ?? 'unknown';
  const rateKey = `draw|${ip}|${ua}`;
  if (!checkRateLimit(rateKey)) {
    return jsonNoStore({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  }

  let body: Record<string, unknown> | null = null;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    body = null;
  }

  const requestedMonth = normalizeMonth(body?.month);
  const month = requestedMonth || monthKey(new Date());
  const force = normalizeBoolean(body?.force);

  const existing = findDraw(month);
  if (existing && !force) {
    return jsonNoStore({ error: 'Draw already created for this month.', month, draw: existing }, { status: 409 });
  }

  const data = readLuckyDraw();
  const eligible = data.entries.filter((e) => e.month === month && e.status === 'entered');
  if (eligible.length === 0) {
    return jsonNoStore({ error: 'No eligible entries for this month.', month }, { status: 400 });
  }

  const prizes = [
    'Grand Prize: Complete Migration Package (Worth $5,000)',
    'Second Prize: Free Consultation + CV Builder Premium (Worth $500)',
    'Third Prize: AI Tools Premium Access (Worth $200)'
  ];

  const winners = pickDistinct(eligible, prizes.length);
  const now = new Date().toISOString();

  const winnersData = winners.map((w, idx) => ({ entryId: w.id, prize: prizes[idx] }));
  const updatedEntries = data.entries.map((e) => {
    const matchIdx = winners.findIndex((w) => w.id === e.id);
    if (matchIdx === -1) return e;
    return { ...e, status: 'winner' as const, prize: prizes[matchIdx], drawnAt: now };
  });

  data.entries = updatedEntries;
  data.draws = [{ month, createdAt: now, winners: winnersData }, ...data.draws.filter((d) => d.month !== month)];
  writeLuckyDraw(data);

  return jsonNoStore(
    {
      ok: true,
      month,
      winners: winners.map((w, idx) => ({
        entryId: w.id,
        email: w.email,
        prize: prizes[idx]
      }))
    },
    { status: 200 }
  );
}
