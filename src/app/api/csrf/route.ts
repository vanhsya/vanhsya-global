export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { randomBytes } from 'node:crypto';

const token = () => randomBytes(24).toString('base64url');

export async function GET() {
  const value = token();
  const cookie = [
    `csrf_token=${encodeURIComponent(value)}`,
    'Path=/',
    'Max-Age=86400',
    'SameSite=Lax',
    'Secure'
  ].join('; ');

  return new Response(JSON.stringify({ csrfToken: value }), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'set-cookie': cookie
    }
  });
}

