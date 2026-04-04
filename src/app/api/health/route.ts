import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const videoPointerPath = join(process.cwd(), 'public', 'videos', 'ideo');
  const hasVideoPointer = existsSync(videoPointerPath);
  const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY);

  const degraded = !hasVideoPointer;

  return Response.json(
    {
      status: degraded ? 'degraded' : 'ok',
      time: new Date().toISOString(),
      checks: {
        videoPointer: hasVideoPointer,
        openaiKeyConfigured: hasOpenAIKey
      }
    },
    { status: 200 }
  );
}

