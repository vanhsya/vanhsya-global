import { getMongoClient } from '@/lib/mongodb';
import { encryptJson } from '@/lib/encryptedJsonFile';
import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'cache-control': 'no-store' };

const bearer = (req: Request) => {
  const h = req.headers.get('authorization') || '';
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : '';
};

const requireAdmin = (req: Request) => {
  const expected = process.env.ADMIN_BACKUP_TOKEN;
  if (!expected) return { ok: false as const, error: 'Server misconfigured: missing ADMIN_BACKUP_TOKEN.' };
  const got = bearer(req);
  if (!got) return { ok: false as const, error: 'Missing Authorization bearer token.' };
  if (got !== expected) return { ok: false as const, error: 'Unauthorized.' };
  return { ok: true as const };
};

type UserBackupRecord = {
  id: string;
  email: string | null;
  createdAt: string | null;
  lastSignInAt: string | null;
  phone: string | null;
  appMetadata: Record<string, unknown> | null;
  userMetadata: Record<string, unknown> | null;
  providers: string[];
};

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.ok) return Response.json({ error: auth.error }, { status: 401, headers: noStore });

  const key = process.env.BACKUP_ENCRYPTION_KEY || process.env.LOCAL_STORAGE_ENCRYPTION_KEY;
  if (!key) return Response.json({ error: 'Missing BACKUP_ENCRYPTION_KEY.' }, { status: 503, headers: noStore });

  const supabase = getSupabaseAdminClient();
  const users: UserBackupRecord[] = [];
  let page = 1;
  const perPage = 200;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) return Response.json({ error: error.message }, { status: 502, headers: noStore });
    const list = data?.users ?? [];
    for (const u of list) {
      const providers =
        Array.isArray((u as any)?.identities) && (u as any).identities.length
          ? (u as any).identities.map((x: any) => String(x?.provider || '')).filter(Boolean)
          : [];
      users.push({
        id: String((u as any).id),
        email: typeof (u as any).email === 'string' ? (u as any).email : null,
        createdAt: typeof (u as any).created_at === 'string' ? (u as any).created_at : null,
        lastSignInAt: typeof (u as any).last_sign_in_at === 'string' ? (u as any).last_sign_in_at : null,
        phone: typeof (u as any).phone === 'string' ? (u as any).phone : null,
        appMetadata: (u as any).app_metadata && typeof (u as any).app_metadata === 'object' ? (u as any).app_metadata : null,
        userMetadata: (u as any).user_metadata && typeof (u as any).user_metadata === 'object' ? (u as any).user_metadata : null,
        providers
      });
    }
    if (list.length < perPage) break;
    page += 1;
    if (page > 200) break;
  }

  const createdAt = new Date().toISOString();
  const envelope = encryptJson(
    {
      createdAt,
      source: 'supabase.auth.admin.listUsers',
      total: users.length,
      users
    },
    key
  );

  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB || 'vanhsya';
  const db = client.db(dbName);
  const res = await db.collection('backups').insertOne({
    kind: 'supabase_users',
    createdAt,
    count: users.length,
    envelope
  });

  return Response.json(
    {
      ok: true,
      backupId: String(res.insertedId),
      createdAt,
      count: users.length
    },
    { status: 200, headers: noStore }
  );
}

