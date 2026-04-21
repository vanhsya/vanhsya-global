import fs from 'fs';
import path from 'path';

export type InvestorDeckRequest = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  organization?: string;
  role?: string;
  stage?: string;
  message?: string;
  source?: string;
};

const dir = path.join(process.cwd(), 'var', 'invest');
const filePath = path.join(dir, 'deck_requests.json');

const memoryKey = '__vanhsya_investor_deck_requests';

const getMemory = () => {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!Array.isArray(g[memoryKey])) g[memoryKey] = [];
  return g[memoryKey] as InvestorDeckRequest[];
};

const canWriteFileStorage = () => {
  if (process.env.VERCEL || process.env.NETLIFY) return false;
  if (process.env.NODE_ENV === 'production') return process.env.LOCAL_FILE_STORAGE === '1';
  return true;
};

const readAll = (): InvestorDeckRequest[] => {
  try {
    if (canWriteFileStorage()) {
      if (!fs.existsSync(filePath)) return getMemory();
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) return getMemory();
      const disk = parsed as InvestorDeckRequest[];
      const mem = getMemory();
      if (mem.length === 0 && disk.length) mem.push(...disk);
      return disk;
    }
    return getMemory();
  } catch {
    return getMemory();
  }
};

const writeAll = (entries: InvestorDeckRequest[]) => {
  const mem = getMemory();
  mem.length = 0;
  mem.push(...entries);
  if (!canWriteFileStorage()) return;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), 'utf8');
};

export const addDeckRequest = (input: Omit<InvestorDeckRequest, 'id' | 'createdAt'>): InvestorDeckRequest => {
  const entries = readAll();
  const normalizedEmail = input.email.trim().toLowerCase();
  const existing = entries.find((e) => e.email === normalizedEmail);
  if (existing) return existing;

  const id = `ir_${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`}`;
  const entry: InvestorDeckRequest = {
    id,
    createdAt: new Date().toISOString(),
    ...input,
    email: normalizedEmail
  };

  writeAll([entry, ...entries]);
  return entry;
};
