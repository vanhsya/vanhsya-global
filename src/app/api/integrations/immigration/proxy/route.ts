export const runtime = 'nodejs';

type Req = {
  country?: unknown;
  path?: unknown;
  method?: unknown;
  query?: unknown;
  body?: unknown;
};

const COUNTRIES = ['usa', 'uk', 'canada', 'australia', 'eu'] as const;

const envFor = (country: (typeof COUNTRIES)[number]) => {
  const c = country.toUpperCase();
  return {
    baseUrl: process.env[`IMMIGRATION_API_${c}_BASE_URL`],
    key: process.env[`IMMIGRATION_API_${c}_KEY`]
  };
};

const isSafePath = (p: string) => {
  if (!p.startsWith('/')) return false;
  if (p.includes('..')) return false;
  if (p.includes('\\')) return false;
  return true;
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Req | null;
  const countryRaw = typeof body?.country === 'string' ? body.country.trim().toLowerCase() : '';
  const methodRaw = typeof body?.method === 'string' ? body.method.trim().toUpperCase() : 'GET';
  const path = typeof body?.path === 'string' ? body.path.trim() : '';

  if (!COUNTRIES.includes(countryRaw as (typeof COUNTRIES)[number])) {
    return Response.json({ error: 'Unsupported country.' }, { status: 400 });
  }
  if (!isSafePath(path)) return Response.json({ error: 'Invalid path.' }, { status: 400 });

  const env = envFor(countryRaw as (typeof COUNTRIES)[number]);
  if (!env.baseUrl || !env.key) {
    return Response.json({ error: 'Official API is not configured for this country.' }, { status: 503 });
  }

  const method = methodRaw === 'POST' ? 'POST' : 'GET';
  const url = new URL(env.baseUrl);
  const merged = new URL(path, url);
  if (body?.query && typeof body.query === 'object') {
    for (const [k, v] of Object.entries(body.query as Record<string, unknown>)) {
      if (typeof k !== 'string') continue;
      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') merged.searchParams.set(k, String(v));
    }
  }

  const headers: Record<string, string> = {
    accept: 'application/json',
    'x-api-key': env.key
  };

  const fetchInit: RequestInit = {
    method,
    headers
  };

  if (method === 'POST') {
    headers['content-type'] = 'application/json';
    fetchInit.body = JSON.stringify(body?.body ?? {});
  }

  try {
    const upstream = await fetch(merged.toString(), fetchInit);
    const text = await upstream.text();
    const json = (() => {
      try {
        return JSON.parse(text) as unknown;
      } catch {
        return null;
      }
    })();
    return Response.json(
      {
        ok: upstream.ok,
        status: upstream.status,
        data: json ?? text
      },
      { status: upstream.ok ? 200 : 502 }
    );
  } catch {
    return Response.json({ error: 'Failed to reach upstream official API.' }, { status: 502 });
  }
}

