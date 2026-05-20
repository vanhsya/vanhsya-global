import { getMongoClient } from '@/lib/mongodb';
import { verifyBinancePayWebhook } from '@/lib/binancePay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const noStore = { 'cache-control': 'no-store' };

export async function POST(req: Request) {
  const body = await req.text();
  const publicKeyPem = process.env.BINANCEPAY_WEBHOOK_PUBLIC_KEY;
  if (!publicKeyPem) return Response.json({ error: 'Missing BINANCEPAY_WEBHOOK_PUBLIC_KEY.' }, { status: 503, headers: noStore });

  const verified = verifyBinancePayWebhook({ headers: req.headers, body, publicKeyPem });
  if (!verified.ok) return Response.json({ error: verified.error }, { status: 401, headers: noStore });

  const json = (() => {
    try {
      return JSON.parse(body) as any;
    } catch {
      return null;
    }
  })();

  const data = json?.data ?? json ?? null;
  const merchantTradeNo = typeof data?.merchantTradeNo === 'string' ? data.merchantTradeNo : null;
  const status = typeof data?.bizStatus === 'string' ? data.bizStatus : typeof data?.status === 'string' ? data.status : null;
  const prepayId = typeof data?.prepayId === 'string' ? data.prepayId : null;
  const transactionId = typeof data?.transactionId === 'string' ? data.transactionId : null;

  if (merchantTradeNo) {
    try {
      const client = await getMongoClient();
      const dbName = process.env.MONGODB_DB || 'vanhsya';
      await client.db(dbName).collection('payments').updateOne(
        { provider: 'binancepay', merchantTradeNo },
        {
          $set: {
            status: status || 'updated',
            prepayId: prepayId || undefined,
            transactionId: transactionId || undefined,
            updatedAt: new Date().toISOString()
          }
        },
        { upsert: true }
      );
    } catch {
    }
  }

  return Response.json({ ok: true }, { status: 200, headers: noStore });
}

