import { createHmac, randomBytes, verify as verifySig } from 'node:crypto';

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const nonce32 = () => {
  const bytes = randomBytes(32);
  let out = '';
  for (let i = 0; i < bytes.length; i++) out += chars[bytes[i] % chars.length];
  return out.slice(0, 32);
};

export const signBinancePayApi = (input: { timestamp: number; nonce: string; body: string; secret: string }) => {
  const payload = `${input.timestamp}\n${input.nonce}\n${input.body}\n`;
  return createHmac('sha512', input.secret).update(payload, 'utf8').digest('hex').toUpperCase();
};

export const buildBinancePayApiHeaders = (body: string) => {
  const apiKey = process.env.BINANCEPAY_API_KEY;
  const secret = process.env.BINANCEPAY_API_SECRET;
  if (!apiKey || !secret) throw new Error('Missing BINANCEPAY_API_KEY or BINANCEPAY_API_SECRET.');

  const timestamp = Date.now();
  const nonce = nonce32();
  const signature = signBinancePayApi({ timestamp, nonce, body, secret });

  return {
    'content-type': 'application/json',
    'BinancePay-Timestamp': String(timestamp),
    'BinancePay-Nonce': nonce,
    'BinancePay-Certificate-SN': apiKey,
    'BinancePay-Signature': signature
  } as const;
};

export const verifyBinancePayWebhook = (input: {
  headers: Headers;
  body: string;
  publicKeyPem: string;
}): { ok: true } | { ok: false; error: string } => {
  const ts = input.headers.get('BinancePay-Timestamp') || input.headers.get('binancepay-timestamp');
  const nonce = input.headers.get('BinancePay-Nonce') || input.headers.get('binancepay-nonce');
  const signatureB64 = input.headers.get('BinancePay-Signature') || input.headers.get('binancepay-signature');

  if (!ts || !nonce || !signatureB64) return { ok: false, error: 'Missing BinancePay webhook headers.' };
  const payload = `${ts}\n${nonce}\n${input.body}\n`;

  let sig: Buffer;
  try {
    sig = Buffer.from(signatureB64, 'base64');
  } catch {
    return { ok: false, error: 'Invalid signature encoding.' };
  }

  const ok = verifySig('RSA-SHA256', Buffer.from(payload, 'utf8'), input.publicKeyPem, sig);
  if (!ok) return { ok: false, error: 'Invalid signature.' };
  return { ok: true };
};

