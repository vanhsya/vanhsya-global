import type { CardTier } from '@/data/card/tiers';
import { COMPANY } from '@/lib/company';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 86400;

const isTier = (v: string): v is CardTier => v === 'standard' || v === 'pro' || v === 'elite' || v === 'black';

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const theme = (tier: CardTier) => {
  if (tier === 'black') {
    return { bg1: '#07070B', bg2: '#111118', accent: '#D4AF37', glow: 'rgba(212,175,55,0.45)', label: 'BLACK' };
  }
  if (tier === 'elite') {
    return { bg1: '#07070B', bg2: '#141420', accent: '#F5C76A', glow: 'rgba(245,199,106,0.35)', label: 'ELITE' };
  }
  if (tier === 'pro') {
    return { bg1: '#07070B', bg2: '#12122A', accent: '#A855F7', glow: 'rgba(168,85,247,0.35)', label: 'PRO' };
  }
  return { bg1: '#07070B', bg2: '#15151D', accent: '#E5E7EB', glow: 'rgba(229,231,235,0.20)', label: 'STANDARD' };
};

export async function GET(_: Request, { params }: { params: Promise<{ tier: string }> }) {
  const { tier } = await params;
  const t = theme(isTier(tier) ? tier : 'standard');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="1000" viewBox="0 0 1600 1000" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="VANHSYA Card ${t.label}">
  <defs>
    <linearGradient id="bg" x1="140" y1="140" x2="1520" y2="900" gradientUnits="userSpaceOnUse">
      <stop stop-color="${t.bg1}"/>
      <stop offset="1" stop-color="${t.bg2}"/>
    </linearGradient>
    <linearGradient id="sheen" x1="200" y1="140" x2="1400" y2="900" gradientUnits="userSpaceOnUse">
      <stop stop-color="rgba(255,255,255,0)"/>
      <stop offset="0.48" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="0.60" stop-color="rgba(255,255,255,0)"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1600" y2="1000" gradientUnits="userSpaceOnUse">
      <stop stop-color="${t.accent}" stop-opacity="0.0"/>
      <stop offset="0.55" stop-color="${t.accent}" stop-opacity="0.50"/>
      <stop offset="1" stop-color="${t.accent}" stop-opacity="0.0"/>
    </linearGradient>
    <linearGradient id="brandGold" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F5E6B1"/>
      <stop offset="0.45" stop-color="${t.accent}"/>
      <stop offset="1" stop-color="#A67C00"/>
    </linearGradient>
    <linearGradient id="violetEmblem" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
      <stop stop-color="#A855F7" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#4F46E5" stop-opacity="0.35"/>
    </linearGradient>
    <pattern id="hex" width="84" height="72.75" patternUnits="userSpaceOnUse" patternTransform="translate(0 0)">
      <path d="M42 2 L74 20 L74 52.75 L42 70.75 L10 52.75 L10 20 Z" stroke="rgba(255,255,255,0.06)" stroke-width="2" fill="none"/>
    </pattern>
    <filter id="shadow" x="0" y="0" width="1600" height="1000" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="rgba(0,0,0,0.55)"/>
    </filter>
    <filter id="glow" x="-200" y="-200" width="2000" height="1400" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="60" result="blur"/>
    </filter>
  </defs>

  <g filter="url(#shadow)">
    <rect x="120" y="120" width="1360" height="760" rx="80" fill="url(#bg)"/>
    <rect x="120" y="120" width="1360" height="760" rx="80" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
    <rect x="120" y="120" width="1360" height="760" rx="80" fill="url(#hex)" opacity="0.55"/>
    <path d="M220 260 C520 120, 960 120, 1380 340" stroke="url(#accent)" stroke-width="6" stroke-linecap="round" opacity="0.9"/>
    <path d="M220 700 C560 860, 940 860, 1380 640" stroke="url(#accent)" stroke-width="5" stroke-linecap="round" opacity="0.65"/>

    <circle cx="1280" cy="260" r="210" fill="${t.glow}" opacity="0.65" filter="url(#glow)"/>
    <circle cx="360" cy="760" r="260" fill="${t.glow}" opacity="0.35" filter="url(#glow)"/>

    <rect x="120" y="120" width="1360" height="760" rx="80" fill="url(#sheen)" opacity="0.95"/>

    <g opacity="0.42">
      <path d="M1160 300 L1280 740 L1400 300" stroke="url(#violetEmblem)" stroke-width="64" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1200 300 L1280 560 L1360 300" stroke="rgba(255,255,255,0.10)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <g opacity="0.95">
      <text x="240" y="250" fill="url(#brandGold)" font-size="44" font-family="Inter, ui-sans-serif, system-ui" letter-spacing="0.18em" font-weight="900">VANHSYA GLOBAL</text>
      <text x="240" y="308" fill="${t.accent}" fill-opacity="0.85" font-size="16" font-family="Inter, ui-sans-serif, system-ui" letter-spacing="0.55em" font-weight="900">${t.label}</text>
    </g>

    <g>
      <rect x="240" y="410" width="260" height="190" rx="28" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
      <rect x="270" y="440" width="200" height="54" rx="12" fill="rgba(255,255,255,0.16)"/>
      <path d="M270 520 H470" stroke="rgba(255,255,255,0.18)" stroke-width="10" stroke-linecap="round"/>
      <path d="M270 556 H392" stroke="rgba(255,255,255,0.15)" stroke-width="10" stroke-linecap="round"/>

      <path d="M560 440 C610 400, 680 410, 710 468" stroke="${t.accent}" stroke-opacity="0.75" stroke-width="10" stroke-linecap="round"/>
      <path d="M560 470 C600 440, 650 448, 670 492" stroke="${t.accent}" stroke-opacity="0.55" stroke-width="8" stroke-linecap="round"/>
      <path d="M560 496 C592 475, 625 481, 638 510" stroke="${t.accent}" stroke-opacity="0.35" stroke-width="7" stroke-linecap="round"/>
    </g>

    <text x="240" y="360" fill="white" fill-opacity="0.65" font-size="14" font-family="Inter, ui-sans-serif, system-ui" letter-spacing="0.35em" font-weight="800">PREMIUM GLOBAL ACCESS</text>

    <g>
      <text x="1340" y="720" text-anchor="end" fill="url(#brandGold)" font-size="24" font-family="Inter, ui-sans-serif, system-ui" letter-spacing="0.12em" font-weight="900">${escapeXml(
        COMPANY.phoneDisplay
      )}</text>
      <text x="1340" y="765" text-anchor="end" fill="rgba(255,255,255,0.75)" font-size="20" font-family="Inter, ui-sans-serif, system-ui" letter-spacing="0.08em" font-weight="800">${escapeXml(
        COMPANY.emails.founder
      )}</text>
      <text x="1340" y="810" text-anchor="end" fill="rgba(255,255,255,0.70)" font-size="20" font-family="Inter, ui-sans-serif, system-ui" letter-spacing="0.08em" font-weight="800">${escapeXml(
        'www.vanhsya.com'
      )}</text>
    </g>
  </g>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
}
