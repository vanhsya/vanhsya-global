type CsrfResult = { ok: true } | { ok: false; reason: string };

const normalizeOrigin = (value: string | null) => {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

const requestOrigin = (req: Request) => {
  const url = new URL(req.url);
  return url.origin;
};

const isSameOrigin = (req: Request) => {
  const origin = normalizeOrigin(req.headers.get('origin'));
  const referer = normalizeOrigin(req.headers.get('referer'));
  const self = requestOrigin(req);
  if (origin && origin === self) return true;
  if (referer && referer === self) return true;
  return false;
};

const parseCookie = (cookieHeader: string | null) => {
  if (!cookieHeader) return new Map<string, string>();
  const parts = cookieHeader.split(';');
  const map = new Map<string, string>();
  for (const part of parts) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    const v = part.slice(idx + 1).trim();
    if (k) map.set(k, decodeURIComponent(v));
  }
  return map;
};

export const verifyCsrf = (req: Request): CsrfResult => {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') return { ok: true };

  if (isSameOrigin(req)) return { ok: true };

  const cookies = parseCookie(req.headers.get('cookie'));
  const cookieToken = cookies.get('csrf_token');
  const headerToken = req.headers.get('x-csrf-token');

  if (!cookieToken || !headerToken) return { ok: false, reason: 'Missing CSRF token.' };
  if (cookieToken !== headerToken) return { ok: false, reason: 'Invalid CSRF token.' };
  return { ok: true };
};
