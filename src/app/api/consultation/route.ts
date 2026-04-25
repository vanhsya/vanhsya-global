import { NextRequest, NextResponse } from 'next/server';
import { verifyCsrf } from '@/lib/security/csrf';
import { queueSubmissionWebhook } from '@/lib/submissionsWebhook';

type ValidationError = { field: string; message: string };

const REQUIRED_FIELDS = ['firstName', 'lastName', 'email', 'country', 'preferredDestination', 'immigrationGoal'] as const;

function validate(data: any): { ok: true; clean: Record<string, unknown> } | { ok: false; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  for (const f of REQUIRED_FIELDS) {
    if (!data[f] || (typeof data[f] === 'string' && (data[f] as string).trim() === '')) {
      errors.push({ field: f, message: `${f} is required` });
    }
  }

  const email = (data.email as string) || '';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  const phone = (data.phone as string) || '';
  if (phone && phone.length > 0 && phone.replace(/\D/g, '').length < 7) {
    errors.push({ field: 'phone', message: 'Invalid phone number' });
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, clean: data };
}

const RATE_LIMIT_MS = 60_000;
const recentSubmissions = new Map<string, number>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const last = recentSubmissions.get(ip);
  if (last && now - last < RATE_LIMIT_MS) return false;
  recentSubmissions.set(ip, now);
  // Cleanup old entries
  for (const [k, v] of recentSubmissions) {
    if (now - v > RATE_LIMIT_MS * 5) recentSubmissions.delete(k);
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

  const d = result.clean;
  const id = crypto.randomUUID();
  const receivedAt = new Date().toISOString();

  // Queue webhook for CRM / notifications
  const firstName = String(d.firstName).trim();
  const lastName = String(d.lastName).trim();
  const email = String(d.email).trim().toLowerCase();
  const phone = d.phone ? String(d.phone).trim() : undefined;
  const country = String(d.country);
  const preferredDestination = String(d.preferredDestination);
  const consultationType = typeof d.consultationType === 'string' ? d.consultationType : 'video';
  const preferredDate = typeof d.preferredDate === 'string' ? d.preferredDate : undefined;
  const preferredTime = typeof d.preferredTime === 'string' ? d.preferredTime : undefined;
  const immigrationGoal = String(d.immigrationGoal);
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

  return NextResponse.json({
    ok: true,
    message: 'Your consultation request has been received. An expert will contact you within 24 hours.',
    referenceId: id,
  });
}
