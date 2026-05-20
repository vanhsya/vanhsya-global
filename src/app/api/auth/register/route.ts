import { verifyCsrf } from '@/lib/security/csrf';
import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Req = {
  email?: unknown;
  password?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  phone?: unknown;
  nationality?: unknown;
};

const noStore = { 'cache-control': 'no-store' };

const normalizeEmail = (v: unknown) => {
  if (typeof v !== 'string') return '';
  const s = v.trim().toLowerCase();
  if (!s) return '';
  if (s.length > 254) return '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return '';
  return s;
};

const normalizePassword = (v: unknown) => {
  if (typeof v !== 'string') return '';
  const s = v;
  if (s.length < 10) return '';
  if (s.length > 200) return '';
  return s;
};

const normalizeText = (v: unknown, max: number) => {
  if (typeof v !== 'string') return '';
  const s = v.trim();
  if (!s) return '';
  return s.length > max ? s.slice(0, max) : s;
};

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const email = normalizeEmail(body?.email);
  const password = normalizePassword(body?.password);
  const firstName = normalizeText(body?.firstName, 80);
  const lastName = normalizeText(body?.lastName, 80);
  const phone = normalizeText(body?.phone, 40);
  const nationality = normalizeText(body?.nationality, 80);

  if (!email) return Response.json({ error: 'Invalid email.' }, { status: 400, headers: noStore });
  if (!password) return Response.json({ error: 'Password must be at least 10 characters.' }, { status: 400, headers: noStore });
  if (!firstName || !lastName) return Response.json({ error: 'First and last name are required.' }, { status: 400, headers: noStore });

  try {
    const admin = getSupabaseAdminClient();
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        firstName,
        lastName,
        full_name: `${firstName} ${lastName}`.trim(),
        phone: phone || undefined,
        nationality: nationality || undefined
      }
    });
    if (error) return Response.json({ error: error.message }, { status: 502, headers: noStore });
    return Response.json({ ok: true, userId: data.user?.id ?? null }, { status: 200, headers: noStore });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : 'Registration failed.' }, { status: 502, headers: noStore });
  }
}

