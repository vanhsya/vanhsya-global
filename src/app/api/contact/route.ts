import { NextRequest, NextResponse } from 'next/server';
import { verifyCsrf } from '@/lib/security/csrf';
import { queueSubmissionWebhook } from '@/lib/submissionsWebhook';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 32 * 1024;

function normalizeString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const v = value.trim();
    return v.length > 0 ? v : undefined;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    const v = String(value).trim();
    return v.length > 0 ? v : undefined;
  }

  return undefined;
}

function normalizePhone(value: unknown): string | undefined {
  const direct = normalizeString(value);
  if (direct) return direct;

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidate = record.value ?? record.phone ?? record.number;
    return normalizePhone(candidate);
  }

  return undefined;
}

function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeEmail(value: unknown): string | undefined {
  const email = normalizeString(value);
  return email ? email.toLowerCase() : undefined;
}

function clampText(value: unknown, max: number): string | undefined {
  const v = normalizeString(value);
  if (!v) return undefined;
  return v.length > max ? v.slice(0, max) : v;
}

function extractClientIp(req: NextRequest): string {
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
}

type RateEntry = { count: number; resetAt: number };
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
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

function jsonNoStore(body: unknown, init?: { status?: number }) {
  return NextResponse.json(body, {
    status: init?.status,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}

function validate(data: Record<string, unknown>): { ok: true; clean: Record<string, unknown> } | { ok: false; errors: { field: string; message: string }[] } {
  const errors: { field: string; message: string }[] = [];

  const name = clampText(data.name, 120) ?? '';
  const email = normalizeEmail(data.email) ?? '';

  if (!name.trim()) errors.push({ field: 'name', message: 'Name is required' });
  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!looksLikeEmail(email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  if (errors.length > 0) return { ok: false, errors };
  return {
    ok: true,
    clean: {
      name,
      email,
      phone: normalizePhone(data.phone),
      country: clampText(data.country, 120),
      service: clampText(data.service, 120),
      message: clampText(data.message, 2000),
      source: 'website_contact_form',
    },
  };
}

export async function POST(req: NextRequest) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) {
    return jsonNoStore({ error: csrf.reason ?? 'Invalid request' }, { status: 403 });
  }

  const contentLength = Number(req.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonNoStore({ error: 'Request body too large' }, { status: 413 });
  }

  const ip = extractClientIp(req);
  const ua = req.headers.get('user-agent')?.slice(0, 120) ?? 'unknown';
  const rateKey = `${ip}|${ua}`;
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
    const id = crypto.randomUUID();
    return jsonNoStore({
      ok: true,
      message: 'Your message has been sent. Our team will respond within 2 hours.',
      referenceId: id,
    });
  }

  const result = validate(body ?? {});
  if (!result.ok) {
    return jsonNoStore({ error: 'Validation failed', errors: result.errors }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();
  const d = result.clean;

  queueSubmissionWebhook({
    kind: 'contact_message',
    receivedAt,
    data: {
      id,
      name: String(d.name ?? '').trim(),
      email: String(d.email ?? '').trim().toLowerCase(),
      phone: normalizePhone(d.phone),
      country: typeof d.country === 'string' ? d.country : undefined,
      service: typeof d.service === 'string' ? d.service : undefined,
      message: typeof d.message === 'string' ? d.message : undefined,
      source: 'website_contact_form',
    }
  });

  return jsonNoStore({
    ok: true,
    message: 'Your message has been sent. Our team will respond within 2 hours.',
    referenceId: id,
  });
}
