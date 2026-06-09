import { getConciergeKnowledge, upsertConciergeKnowledge } from '@/lib/conciergeKnowledge';

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

const requestIp = (req: Request) => {
  const xf = req.headers.get('x-forwarded-for') || '';
  const first = xf.split(',')[0]?.trim();
  return first || null;
};

export async function GET() {
  const res = await getConciergeKnowledge();
  if (!res.ok) return Response.json({ ok: false, error: res.error }, { status: 502, headers: noStore });
  return Response.json({ ok: true, source: res.source, record: res.record }, { status: 200, headers: noStore });
}

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.ok) return Response.json({ ok: false, error: auth.error }, { status: 401, headers: noStore });

  const body = await req.json().catch(() => null);
  const data = body?.data ?? null;
  const actor = typeof body?.actor === 'string' ? body.actor : null;

  const saved = await upsertConciergeKnowledge({ data, actor, ip: requestIp(req) });
  if (!saved.ok)
    return Response.json({ ok: false, error: saved.error }, { status: saved.status || 502, headers: saved.headers || noStore });

  return Response.json({ ok: true, record: saved.record }, { status: 200, headers: noStore });
}

