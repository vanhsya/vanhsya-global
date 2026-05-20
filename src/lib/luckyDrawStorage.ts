import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getLocalStorageEncryptionKey, readJsonFile, writeJsonFile } from '@/lib/encryptedJsonFile';

export type LuckyDrawEntryStatus = 'entered' | 'winner';

export type LuckyDrawEntry = {
  id: string;
  createdAt: string;
  month: string;
  email: string;
  status: LuckyDrawEntryStatus;
  prize?: string;
  drawnAt?: string;
  source?: string;
};

export type LuckyDraw = {
  month: string;
  createdAt: string;
  winners: { entryId: string; prize: string }[];
};

type StorageShape = {
  entries: LuckyDrawEntry[];
  draws: LuckyDraw[];
};

const storageDir = () => join(process.cwd(), 'var', 'lucky-draw');
const storagePath = () => join(storageDir(), 'entries.json');

const memoryKey = '__vanhsya_lucky_draw';

const getMemory = () => {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!g[memoryKey] || typeof g[memoryKey] !== 'object') g[memoryKey] = { entries: [], draws: [] };
  const v = g[memoryKey] as StorageShape;
  if (!Array.isArray(v.entries)) v.entries = [];
  if (!Array.isArray(v.draws)) v.draws = [];
  return v;
};

const canWriteFileStorage = () => {
  if (process.env.VERCEL || process.env.NETLIFY) return false;
  if (process.env.NODE_ENV === 'production') return process.env.LOCAL_FILE_STORAGE === '1';
  return true;
};

const ensureStorage = () => {
  if (!canWriteFileStorage()) return;
  mkdirSync(storageDir(), { recursive: true });
  try {
    readFileSync(storagePath(), 'utf8');
  } catch {
    try {
      writeJsonFile(storagePath(), { entries: [], draws: [] } satisfies StorageShape, getLocalStorageEncryptionKey());
    } catch {
      return;
    }
  }
};

export const readLuckyDraw = (): StorageShape => {
  if (!canWriteFileStorage()) return getMemory();
  ensureStorage();
  try {
    const parsed = readJsonFile<StorageShape>(storagePath(), getLocalStorageEncryptionKey());
    if (!Array.isArray(parsed.entries) || !Array.isArray(parsed.draws)) return getMemory();
    const mem = getMemory();
    if (mem.entries.length === 0 && parsed.entries.length) mem.entries.push(...parsed.entries);
    if (mem.draws.length === 0 && parsed.draws.length) mem.draws.push(...parsed.draws);
    return parsed;
  } catch {
    return getMemory();
  }
};

export const writeLuckyDraw = (next: StorageShape) => {
  const mem = getMemory();
  mem.entries = Array.isArray(next.entries) ? next.entries : [];
  mem.draws = Array.isArray(next.draws) ? next.draws : [];
  if (!canWriteFileStorage()) return;
  ensureStorage();
  try {
    writeJsonFile(storagePath(), { entries: mem.entries, draws: mem.draws }, getLocalStorageEncryptionKey());
  } catch {
    return;
  }
};

export const findEntry = (month: string, email: string) => {
  const data = readLuckyDraw();
  return data.entries.find((e) => e.month === month && e.email === email) || null;
};

export const findDraw = (month: string) => {
  const data = readLuckyDraw();
  return data.draws.find((d) => d.month === month) || null;
};
