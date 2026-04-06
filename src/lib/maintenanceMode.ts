export type MaintenanceWindow = {
  active: boolean;
  until: number | null;
  reason: 'off' | 'always' | 'until' | 'window';
};

export const parseIsoDate = (raw: string | undefined): number | null => {
  if (!raw) return null;
  const t = Date.parse(raw);
  return Number.isFinite(t) ? t : null;
};

export const getMaintenanceWindow = (env: Record<string, string | undefined>, nowMs: number): MaintenanceWindow => {
  const alwaysOn = env.MAINTENANCE_MODE === '1' || env.MAINTENANCE_MODE === 'true';
  const until = parseIsoDate(env.MAINTENANCE_UNTIL);
  const start = parseIsoDate(env.MAINTENANCE_START);
  const end = parseIsoDate(env.MAINTENANCE_END);

  if (alwaysOn) return { active: true, until: until || end || null, reason: 'always' };
  if (until && nowMs < until) return { active: true, until, reason: 'until' };
  if (start && end && nowMs >= start && nowMs <= end) return { active: true, until: end, reason: 'window' };
  return { active: false, until: null, reason: 'off' };
};

export const getRetryAfterSeconds = (until: number | null, nowMs: number) => {
  if (!until) return null;
  return Math.max(1, Math.round((until - nowMs) / 1000));
};

export const isPublicAssetPath = (pathname: string) => {
  if (pathname.startsWith('/_next/')) return true;
  if (pathname === '/favicon.ico' || pathname === '/robots.txt' || pathname === '/sitemap.xml') return true;
  if (pathname.startsWith('/images/') || pathname.startsWith('/videos/')) return true;
  return /\.(png|jpg|jpeg|gif|webp|svg|ico|txt|xml|css|js|map|woff2?)$/i.test(pathname);
};

