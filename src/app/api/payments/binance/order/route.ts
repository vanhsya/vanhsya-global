import { verifyCsrf } from '@/lib/security/csrf';
import { buildBinancePayApiHeaders } from '@/lib/binancePay';
import { getMongoClient } from '@/lib/mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Req = {
  amount?: unknown;
  currency?: unknown;
  itemName?: unknown;
  itemDetail?: unknown;
  referenceId?: unknown;
};

const noStore = { 'cache-control': 'no-store' };

const normalizeText = (v: unknown, max: number) => {
  if (typeof v !== 'string') return '';
  const s = v.trim();
  if (!s) return '';
  return s.length > max ? s.slice(0, max) : s;
};

const normalizeCurrency = (v: unknown) => {
  const s = normalizeText(v, 16).toUpperCase();
  return /^[A-Z]{3,10}$/.test(s) ? s : '';
};

const normalizeAmount = (v: unknown) => {
  const n = typeof v === 'number' ? v : typeof v === 'string' ? Number(v) : NaN;
  if (!Number.isFinite(n)) return null;
  if (n <= 0) return null;
  return Math.round(n * 100) / 100;
};

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403, headers: noStore });

  const body = (await req.json().catch(() => null)) as Req | null;
  const amount = normalizeAmount(body?.amount);
  const currency = normalizeCurrency(body?.currency) || 'USDT';
  const itemName = normalizeText(body?.itemName, 64) || 'VANHSYA Service';
  const itemDetail = normalizeText(body?.itemDetail, 256);
  const referenceId = normalizeText(body?.referenceId, 64);

  if (!amount) return Response.json({ error: 'Invalid amount.' }, { status: 400, headers: noStore });

  const merchantTradeNo = `vp_${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`}`;

  const payload = {
    env: { terminalType: 'WEB' },
    merchantTradeNo,
    orderAmount: amount,
    currency,
    goods: {
      goodsType: '02',
      goodsCategory: 'D000',
      referenceGoodsId: referenceId || merchantTradeNo,
      goodsName: itemName,
      goodsDetail: itemDetail || itemName
    }
  };

  const bodyJson = JSON.stringify(payload);
  const headers = buildBinancePayApiHeaders(bodyJson);

  const res = await fetch('https://bpay.binanceapi.com/binancepay/openapi/v2/order', {
    method: 'POST',
    headers,
    body: bodyJson
  });

  const json = (await res.json().catch(() => null)) as any;
  if (!res.ok) {
    return Response.json({ error: json?.errorMessage || 'Binance Pay create order failed.', raw: json ?? null }, { status: 502, headers: noStore });
  }

  const data = json?.data ?? null;
  const prepayId = typeof data?.prepayId === 'string' ? data.prepayId : null;
  const qrcodeLink = typeof data?.qrcodeLink === 'string' ? data.qrcodeLink : null;
  const checkoutUrl = typeof data?.checkoutUrl === 'string' ? data.checkoutUrl : qrcodeLink;

  try {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB || 'vanhsya';
    await client.db(dbName).collection('payments').insertOne({
      provider: 'binancepay',
      merchantTradeNo,
      referenceId: referenceId || null,
      amount,
      currency,
      prepayId,
      checkoutUrl,
      status: 'created',
      createdAt: new Date().toISOString()
    });
  } catch {
  }

  return Response.json(
    {
      ok: true,
      merchantTradeNo,
      prepayId,
      checkoutUrl
    },
    { status: 200, headers: noStore }
  );
}

