import { addToCardWaitlist } from '@/lib/cardWaitlistStorage';
import type { CardTier } from '@/data/card/tiers';

export const runtime = 'nodejs';

const isTier = (v: unknown): v is CardTier => v === 'standard' || v === 'pro' || v === 'elite' || v === 'black';

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: unknown; tier?: unknown } | null;
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const rawTier = body?.tier;
  const tier: CardTier = isTier(rawTier) ? rawTier : 'standard';

  if (!email || !isEmail(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const entry = addToCardWaitlist(email, tier);
    return Response.json({ id: entry.id }, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to save' }, { status: 500 });
  }
}
