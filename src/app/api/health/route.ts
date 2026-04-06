import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getMaintenanceWindow, getRetryAfterSeconds } from '@/lib/maintenanceMode';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const overload = process.env.SERVER_OVERLOAD === '1' || process.env.SERVER_OVERLOAD === 'true';
  const dependencyDown = process.env.DEPENDENCY_FAILURE === '1' || process.env.DEPENDENCY_FAILURE === 'true';
  const forced503 = process.env.FORCE_HEALTH_503 === '1' || process.env.FORCE_HEALTH_503 === 'true';
  const now = Date.now();
  const maintenance = getMaintenanceWindow(process.env, now);

  const videoPointerPath = join(process.cwd(), 'public', 'videos', 'ideo');
  const hasVideoPointer = existsSync(videoPointerPath);
  const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY);

  const degraded = !hasVideoPointer;

  const statusCode = maintenance.active || overload || dependencyDown || forced503 ? 503 : 200;
  const statusLabel = maintenance.active
    ? 'maintenance'
    : overload
      ? 'overloaded'
      : dependencyDown
        ? 'dependency_failure'
        : degraded
          ? 'degraded'
          : 'ok';

  const retryAfterSeconds = getRetryAfterSeconds(maintenance.until, now);
  const headers: HeadersInit = retryAfterSeconds ? { 'retry-after': String(retryAfterSeconds) } : {};

  return Response.json(
    {
      status: statusLabel,
      time: new Date().toISOString(),
      retryAfter: maintenance.until ? new Date(maintenance.until).toISOString() : null,
      checks: {
        maintenance: maintenance.active,
        serverOverload: overload,
        dependencyFailure: dependencyDown,
        forced503,
        videoPointer: hasVideoPointer,
        openaiKeyConfigured: hasOpenAIKey
      }
    },
    { status: statusCode, headers }
  );
}
