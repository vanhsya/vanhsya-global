import { NextRequest, NextResponse } from 'next/server';
import { verifyCsrf } from '@/lib/security/csrf';
import { queueSubmissionWebhook } from '@/lib/submissionsWebhook';

type ValidationError = { field: string; message: string };

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'country', 'preferredDestination', 'immigrationGoal'] as const;

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

function normalizeBoolean(value: unknown): boolean {
  if (value === true) return true;
  if (value === false) return false;
  if (typeof value === 'string') return value.trim().toLowerCase() === 'true';
  return Boolean(value);
}

function normalizeDate(value: unknown): string | undefined {
  const v = normalizeString(value);
  if (!v) return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return undefined;
  return v;
}

function normalizeTime(value: unknown): string | undefined {
  const v = normalizeString(value);
  if (!v) return undefined;
  if (!/^\d{2}:\d{2}$/.test(v)) return undefined;
  return v;
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
const RATE_LIMIT_MAX = 2;
const recentSubmissions = new Map<string, RateEntry>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const existing = recentSubmissions.get(key);

  if (!existing || now >= existing.resetAt) {
    recentSubmissions.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (existing.count >= RATE_LIMIT_MAX) return false;

  existing.count += 1;
  return true;
}

function validate(data: Record<string, unknown>): { ok: true; clean: Record<string, unknown> } | { ok: false; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  for (const f of REQUIRED_FIELDS) {
    const v = normalizeString(data[f]);
    if (!v) {
      errors.push({ field: f, message: `${f} is required` });
    }
  }

  const email = normalizeEmail(data.email) ?? '';
  if (email && !looksLikeEmail(email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  const phone = normalizePhone(data?.phone) ?? '';
  if (phone.length > 0 && phone.replace(/\D/g, '').length < 7) {
    errors.push({ field: 'phone', message: 'Invalid phone number' });
  }

  const additionalNotes = normalizeString(data.additionalNotes);
  if (additionalNotes && additionalNotes.length > 2000) {
    errors.push({ field: 'additionalNotes', message: 'Additional notes is too long' });
  }

  if (errors.length > 0) return { ok: false, errors };
  return {
    ok: true,
    clean: {
      firstName: clampText(data.firstName, 80),
      lastName: clampText(data.lastName, 80),
      email: normalizeEmail(data.email),
      phone: normalizePhone(data.phone),
      country: clampText(data.country, 120),
      preferredDestination: clampText(data.preferredDestination, 120),
      consultationType: clampText(data.consultationType, 40) ?? 'video',
      preferredDate: normalizeDate(data.preferredDate),
      preferredTime: normalizeTime(data.preferredTime),
      immigrationGoal: clampText(data.immigrationGoal, 200),
      currentStatus: clampText(data.currentStatus, 200),
      additionalNotes: clampText(data.additionalNotes, 2000),
      marketingConsent: normalizeBoolean(data.marketingConsent),
      source: 'website_consultation_form',
    },
  };
}

function jsonNoStore(body: unknown, init?: { status?: number }) {
  return NextResponse.json(body, {
    status: init?.status,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
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
      message: 'Your consultation request has been received. An expert will contact you within 24 hours.',
      referenceId: id,
    });
  }

  const result = validate(body ?? {});
  if (!result.ok) {
    return jsonNoStore({ error: 'Validation failed', errors: result.errors }, { status: 400 });
  }

  const d = result.clean;
  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();

  // Queue webhook for CRM / notifications
  const firstName = String(d.firstName ?? '').trim();
  const lastName = String(d.lastName ?? '').trim();
  const email = String(d.email ?? '').trim().toLowerCase();
  const phone = normalizePhone(d.phone);
  const country = String(d.country ?? '');
  const preferredDestination = String(d.preferredDestination ?? '');
  const consultationType = String(d.consultationType ?? 'video');
  const preferredDate = typeof d.preferredDate === 'string' ? d.preferredDate : undefined;
  const preferredTime = typeof d.preferredTime === 'string' ? d.preferredTime : undefined;
  const immigrationGoal = String(d.immigrationGoal ?? '');
  const currentStatus = typeof d.currentStatus === 'string' ? d.currentStatus : undefined;
  const additionalNotes = typeof d.additionalNotes === 'string' ? d.additionalNotes : undefined;
  const marketingConsent = Boolean(d.marketingConsent);

  queueSubmissionWebhook({
    kind: 'consultation_booking',
    receivedAt,
    data: {
      id,
      firstName,
      lastName,
      email,
      phone,
      country,
      preferredDestination,
      consultationType,
      preferredDate,
      preferredTime,
      immigrationGoal,
      currentStatus,
      additionalNotes,
      marketingConsent,
      source: 'website_consultation_form',
    }
  });

  return jsonNoStore({
    ok: true,
    message: 'Your consultation request has been received. An expert will contact you within 24 hours.',
    referenceId: id,
  });
}
