import { readFileSync, statSync, createReadStream } from 'node:fs';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const getVideoPath = () => {
  const pointerPath = join(process.cwd(), 'public', 'videos', 'ideo');
  const raw = readFileSync(pointerPath, 'utf8').trim();
  return raw;
};

const parseRange = (rangeHeader: string | null, size: number) => {
  if (!rangeHeader) return null;
  const m = /^bytes=(\d+)-(\d*)$/i.exec(rangeHeader);
  if (!m) return null;
  const start = Number(m[1]);
  const end = m[2] ? Number(m[2]) : size - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
  if (start < 0 || end < start || start >= size) return null;
  return { start, end: Math.min(end, size - 1) };
};

export async function GET(req: Request) {
  let videoPath: string;
  try {
    videoPath = getVideoPath();
    if (!videoPath) throw new Error('Empty path');
  } catch (err) {
    console.error('Video pointer error:', err);
    return new Response('Video pointer missing or invalid', { status: 404 });
  }

  let stat;
  try {
    stat = statSync(videoPath);
  } catch (err) {
    console.error('Video file not found at:', videoPath, err);
    return new Response('Video file not found', { status: 404 });
  }

  const size = stat.size;
  const range = parseRange(req.headers.get('range'), size);

  if (!range) {
    const stream = createReadStream(videoPath);
    return new Response(stream as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Length': String(size),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-store',
      },
    });
  }

  const { start, end } = range;
  const stream = createReadStream(videoPath, { start, end });
  return new Response(stream as unknown as BodyInit, {
    status: 206,
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Length': String(end - start + 1),
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store',
    },
  });
}
