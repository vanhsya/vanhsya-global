import { buildBinancePayApiHeaders } from '@/lib/binancePay';
import { getMongoClient } from '@/lib/mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Req = { merchantTradeNo?: unknown; prepayId?: unknown };

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

const normalize = (v: unknown, max: number) => {
  if (typeof v !== 'string') return '';
  const s = v.trim();
  if (!s) return '';
  if (s.length > max) return '';
  return s;
};

export async function POST(req: Request) {
  const auth = requireAdmin(req);
  if (!auth.ok) return Response.json({ error: auth.error }, { status: 401, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const merchantTradeNo = normalize(body?.merchantTradeNo, 64);
  const prepayId = normalize(body?.prepayId, 64);
  if (!merchantTradeNo && !prepayId) return Response.json({ error: 'merchantTradeNo or prepayId is required.' }, { status: 400, headers: noStore });

  const payload = { merchantTradeNo: merchantTradeNo || null, prepayId: prepayId || null };
  const bodyJson = JSON.stringify(payload);
  const headers = buildBinancePayApiHeaders(bodyJson);

  const res = await fetch('https://bpay.binanceapi.com/binancepay/openapi/v2/order/query', {
    method: 'POST',
    headers,
    body: bodyJson
  });
  const json = (await res.json().catch(() => null)) as any;
  if (!res.ok) {
    return Response.json({ error: json?.errorMessage || 'Binance Pay query failed.', raw: json ?? null }, { status: 502, headers: noStore });
  }

  const data = json?.data ?? null;
  const status = typeof data?.status === 'string' ? data.status : null;
  const txId = typeof data?.transactionId === 'string' ? data.transactionId : null;
  const mt = typeof data?.merchantTradeNo === 'string' ? data.merchantTradeNo : merchantTradeNo || null;
  const pid = typeof data?.prepayId === 'string' ? data.prepayId : prepayId || null;

  try {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB || 'vanhsya';
    await client.db(dbName).collection('payments').updateOne(
      { provider: 'binancepay', ...(mt ? { merchantTradeNo: mt } : pid ? { prepayId: pid } : {}) },
      {
        $set: {
          merchantTradeNo: mt || undefined,
          prepayId: pid || undefined,
          transactionId: txId || undefined,
          status: status || 'updated',
          updatedAt: new Date().toISOString()
        }
      },
      { upsert: true }
    );
  } catch {
  }

  return Response.json({ ok: true, data }, { status: 200, headers: noStore });
}

