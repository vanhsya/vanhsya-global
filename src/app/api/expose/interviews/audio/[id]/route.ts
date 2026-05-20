import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

const AUDIO_MAP: Record<string, { fileName: string; contentType: string }> = {
  'vanhsya-interview-scam-audio-001': { fileName: 'recording-001.mp3', contentType: 'audio/mpeg' },
};

function getBearerToken(req: Request): string | null {
  const header = req.headers.get('authorization') || '';
  const m = /^Bearer\s+(.+)$/i.exec(header);
  return m?.[1]?.trim() || null;
}

async function isAuthenticated(token: string): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return false;
  const supabase = createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return false;
  return Boolean(data.user);
}

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const entry = AUDIO_MAP[id];
  if (!entry) {
    return new Response('Not found', { status: 404 });
  }

  const token = getBearerToken(req);
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  const ok = await isAuthenticated(token);
  if (!ok) {
    return new Response('Forbidden', { status: 403 });
  }

  const absolute = path.join(process.cwd(), 'private-media', 'vanhsya-interview-scam', entry.fileName);
  let buf: Buffer;
  try {
    buf = await readFile(absolute);
  } catch {
    return new Response('Media missing', { status: 404 });
  }

  return new Response(buf, {
    status: 200,
    headers: {
      'Content-Type': entry.contentType,
      'Content-Disposition': `attachment; filename="${entry.fileName}"`,
      'Cache-Control': 'private, max-age=0, no-store',
    },
  });
}
