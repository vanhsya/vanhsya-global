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

const memoryKey = '__vanhsya_card_waitlist';

const getMemory = () => {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!Array.isArray(g[memoryKey])) g[memoryKey] = [];
  return g[memoryKey] as CardWaitlistEntry[];
};

const canWriteFileStorage = () => {
  if (process.env.VERCEL || process.env.NETLIFY) return false;
  if (process.env.NODE_ENV === 'production') return process.env.LOCAL_FILE_STORAGE === '1';
  return true;
};

const readAll = (): CardWaitlistEntry[] => {
  try {
    if (canWriteFileStorage()) {
      if (!fs.existsSync(filePath)) return getMemory();
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return getMemory();
      const disk = parsed as CardWaitlistEntry[];
      const mem = getMemory();
      if (mem.length === 0 && disk.length) mem.push(...disk);
      return disk;
    }
    return getMemory();
  } catch {
    return getMemory();
  }
};

const writeAll = (entries: CardWaitlistEntry[]) => {
  const mem = getMemory();
  mem.length = 0;
  mem.push(...entries);
  if (!canWriteFileStorage()) return;
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
