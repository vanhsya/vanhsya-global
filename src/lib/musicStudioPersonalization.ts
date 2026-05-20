export type StudioTheme = {
  signatureName: string;
  accent: { h: number; s: number; l: number };
  accent2: { h: number; s: number; l: number };
  accent3: { h: number; s: number; l: number };
  gradientCss: string;
  textureSeed: number;
};

export type StudioSettings = {
  volume: number;
  muted: boolean;
  loop: boolean;
  journeyMode: boolean;
  shuffle: boolean;
  crossfadeMs: number;
  eqLowDb: number;
  eqMidDb: number;
  eqHighDb: number;
  space: number;
  visualIntensity: number;
};

export const fnv1a32 = (input: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const pick = <T,>(arr: readonly T[], r: () => number) => arr[Math.floor(r() * arr.length)];

export const deriveStudioTheme = (userId: string): StudioTheme => {
  const seed = fnv1a32(`vanhsya:studio:${userId}`);
  const r = mulberry32(seed);

  const nouns = [
    'Aurora',
    'Atlas',
    'Horizon',
    'Nova',
    'Eclipse',
    'Pulse',
    'Orbit',
    'Prism',
    'Echo',
    'Zenith',
    'Nebula',
    'Vantage'
  ] as const;

  const adjectives = [
    'Midnight',
    'Electric',
    'Velvet',
    'Solar',
    'Arctic',
    'Crimson',
    'Saffron',
    'Lunar',
    'Cobalt',
    'Iridescent',
    'Obsidian',
    'Radiant'
  ] as const;

  const signatureName = `${pick(adjectives, r)} ${pick(nouns, r)}`;

  const baseHue = Math.floor(r() * 360);
  const hue2 = (baseHue + 40 + Math.floor(r() * 80)) % 360;
  const hue3 = (baseHue + 160 + Math.floor(r() * 80)) % 360;

  const accent = { h: baseHue, s: 86, l: 62 };
  const accent2 = { h: hue2, s: 88, l: 60 };
  const accent3 = { h: hue3, s: 84, l: 58 };

  const a = `hsl(${accent.h} ${accent.s}% ${accent.l}%)`;
  const b = `hsl(${accent2.h} ${accent2.s}% ${accent2.l}%)`;
  const c = `hsl(${accent3.h} ${accent3.s}% ${accent3.l}%)`;

  const gradientCss = `radial-gradient(900px circle at 15% 10%, ${a} 0%, rgba(0,0,0,0) 60%), radial-gradient(1100px circle at 85% 20%, ${b} 0%, rgba(0,0,0,0) 58%), radial-gradient(900px circle at 60% 95%, ${c} 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(2,6,23,0.92) 100%)`;

  return { signatureName, accent, accent2, accent3, gradientCss, textureSeed: seed };
};

export const deriveDefaultStudioSettings = (userId: string): StudioSettings => {
  const seed = fnv1a32(`vanhsya:studio:defaults:${userId}`);
  const r = mulberry32(seed);
  const eqLowDb = Math.round((r() * 8 - 2) * 10) / 10;
  const eqMidDb = Math.round((r() * 8 - 3) * 10) / 10;
  const eqHighDb = Math.round((r() * 8 - 2) * 10) / 10;
  const space = Math.round((0.12 + r() * 0.5) * 100) / 100;
  const crossfadeMs = Math.round(clamp(650 + r() * 900, 0, 2500));

  return {
    volume: clamp(0.3 + r() * 0.28, 0.2, 0.7),
    muted: false,
    loop: true,
    journeyMode: false,
    shuffle: true,
    crossfadeMs,
    eqLowDb: clamp(eqLowDb, -12, 12),
    eqMidDb: clamp(eqMidDb, -12, 12),
    eqHighDb: clamp(eqHighDb, -12, 12),
    space: clamp(space, 0, 1),
    visualIntensity: clamp(0.65 + r() * 0.3, 0.25, 1)
  };
};

export const derivePlaylistOrder = (trackIds: readonly string[], userId: string): string[] => {
  const seed = fnv1a32(`vanhsya:studio:playlist:${userId}:${trackIds.length}`);
  const r = mulberry32(seed);
  const out = [...trackIds];

  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }

  return out;
};

export const safeParseStudioSettings = (value: string | null): Partial<StudioSettings> => {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as Partial<StudioSettings>;
  } catch {
    return {};
  }
};

export const mergeStudioSettings = (defaults: StudioSettings, partial: Partial<StudioSettings>): StudioSettings => {
  const n = { ...defaults, ...partial };
  return {
    ...n,
    volume: clamp(Number(n.volume), 0, 1),
    crossfadeMs: clamp(Math.round(Number(n.crossfadeMs)), 0, 2500),
    eqLowDb: clamp(Number(n.eqLowDb), -12, 12),
    eqMidDb: clamp(Number(n.eqMidDb), -12, 12),
    eqHighDb: clamp(Number(n.eqHighDb), -12, 12),
    space: clamp(Number(n.space), 0, 1),
    visualIntensity: clamp(Number(n.visualIntensity), 0.1, 1),
    muted: Boolean(n.muted),
    loop: Boolean(n.loop),
    journeyMode: Boolean(n.journeyMode),
    shuffle: Boolean(n.shuffle)
  };
};
