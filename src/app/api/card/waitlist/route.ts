import { addToCardWaitlist } from '@/lib/cardWaitlistStorage';
import type { CardTier } from '@/data/card/tiers';
import { queueSubmissionWebhook } from '@/lib/submissionsWebhook';
import { verifyCsrf } from '@/lib/security/csrf';

export const runtime = 'nodejs';

const isTier = (v: unknown): v is CardTier => v === 'standard' || v === 'pro' || v === 'elite' || v === 'black';

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403 });

  const body = (await req.json().catch(() => null)) as { email?: unknown; tier?: unknown } | null;
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
