import fs from 'fs';
import path from 'path';
import type { CardTier } from '@/data/card/tiers';

export type CardWaitlistEntry = {
  id: string;
  email: string;
  tier: CardTier;
  createdAt: string;
};

const dir = path.join(process.cwd(), 'var', 'card');
const filePath = path.join(dir, 'waitlist.json');

const readAll = (): CardWaitlistEntry[] => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as CardWaitlistEntry[];
  } catch {
    return [];
  }
};

const writeAll = (entries: CardWaitlistEntry[]) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), 'utf8');
};

export const addToCardWaitlist = (email: string, tier: CardTier): CardWaitlistEntry => {
  const entries = readAll();
  const normalizedEmail = email.trim().toLowerCase();
  const exists = entries.find((e) => e.email === normalizedEmail);
  if (exists) return exists;

  const id = `cw_${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`}`;
  const entry: CardWaitlistEntry = { id, email: normalizedEmail, tier, createdAt: new Date().toISOString() };
  writeAll([entry, ...entries]);
  return entry;
};

