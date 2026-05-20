import { pingMongo } from '@/lib/mongodb';
import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'cache-control': 'no-store' };

const pingSupabase = async () => {
  const start = Date.now();
  try {
    const admin = getSupabaseAdminClient();
    const { error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1 });
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const, latencyMs: Date.now() - start };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : 'Supabase error' };
  }
};

export async function GET() {
  const supabaseConfigured = Boolean(
    (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const mongoConfigured = Boolean(process.env.MONGODB_URI);

  const [supabase, mongo] = await Promise.all([
    supabaseConfigured ? pingSupabase() : Promise.resolve({ ok: false as const, error: 'Supabase not configured' }),
    mongoConfigured ? pingMongo() : Promise.resolve({ ok: false as const, error: 'MongoDB not configured' })
  ]);

  const ok = supabase.ok && mongo.ok;

  return Response.json(
    {
      ok,
      time: new Date().toISOString(),
      supabase: { configured: supabaseConfigured, ...supabase },
      mongodb: { configured: mongoConfigured, ...mongo }
    },
    { status: ok ? 200 : 503, headers: noStore }
  );
}

