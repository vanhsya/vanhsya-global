import { NextRequest, NextResponse } from 'next/server';
import { findDraw, findEntry, readLuckyDraw } from '@/lib/luckyDrawStorage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const monthKey = (d: Date) => {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
};

const normalizeMonth = (value: string | null): string | null => {
  if (!value) return null;
  const v = value.trim();
  if (!/^\d{4}-\d{2}$/.test(v)) return null;
  const [yRaw, mRaw] = v.split('-');
  const y = Number(yRaw);
  const m = Number(mRaw);
  if (!Number.isFinite(y) || !Number.isFinite(m)) return null;
  if (m < 1 || m > 12) return null;
  if (y < 2020 || y > 2100) return null;
  return v;
};

const normalizeEmail = (value: string | null) => {
  if (!value) return null;
  const v = value.trim().toLowerCase();
  if (!v) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return null;
  return v;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const month = normalizeMonth(url.searchParams.get('month')) || monthKey(new Date());
  const email = normalizeEmail(url.searchParams.get('email'));

  const data = readLuckyDraw();
  const entriesCount = data.entries.filter((e) => e.month === month).length;
  const draw = findDraw(month);
  const entry = email ? findEntry(month, email) : null;

  return NextResponse.json(
    {
      month,
      entriesCount,
      draw: draw
        ? { createdAt: draw.createdAt, winnersCount: draw.winners.length }
        : null,
      entry: entry
        ? { id: entry.id, status: entry.status, prize: entry.prize ?? null, createdAt: entry.createdAt }
        : null
    },
    { status: 200, headers: { 'Cache-Control': 'no-store, max-age=0' } }
  );
}
