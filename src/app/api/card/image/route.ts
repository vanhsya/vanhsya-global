import type { CardTier } from '@/data/card/tiers';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 86400;

const isTier = (v: string | null): v is CardTier =>
  v === 'standard' || v === 'pro' || v === 'elite' || v === 'black';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const tier = isTier(url.searchParams.get('tier')) ? (url.searchParams.get('tier') as CardTier) : 'standard';
  return Response.redirect(new URL(`/api/card/image/${tier}`, url), 302);
}
