import { NextRequest, NextResponse } from 'next/server';
import { verifyCsrf } from '@/lib/security/csrf';
import { queueSubmissionWebhook } from '@/lib/submissionsWebhook';

function validate(data: any): { ok: true; clean: Record<string, unknown> } | { ok: false; errors: { field: string; message: string }[] } {
  const errors: { field: string; message: string }[] = [];

  const name = (data.name as string) || '';
  const email = (data.email as string) || '';

  if (!name.trim()) errors.push({ field: 'name', message: 'Name is required' });
  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, clean: data };
}

const RATE_LIMIT_MS = 60_000;
const recent = new Map<string, number>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const last = recent.get(ip);
  if (last && now - last < RATE_LIMIT_MS) return false;
  recent.set(ip, now);
  for (const [k, v] of recent) {
    if (now - v > RATE_LIMIT_MS * 5) recent.delete(k);
  }
  return true;
}

export async function POST(req: NextRequest) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) {
    return NextResponse.json({ error: csrf.reason ?? 'Invalid request' }, { status: 403 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ error: 'Validation failed', errors: result.errors }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();

  queueSubmissionWebhook({
    kind: 'contact_message',
    receivedAt,
    data: {
      id,
      name: String(body.name).trim(),
      email: String(body.email).trim().toLowerCase(),
      phone: body.phone ? String(body.phone).trim() : undefined,
      country: body.country ?? undefined,
      service: body.service ?? undefined,
      message: body.message ?? undefined,
      source: 'website_contact_form',
    }
  });

  return NextResponse.json({
    ok: true,
    message: 'Your message has been sent. Our team will respond within 2 hours.',
    referenceId: id,
  });
}
