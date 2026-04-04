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

const readAll = (): InvestorDeckRequest[] => {
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as InvestorDeckRequest[];
  } catch {
    return [];
  }
};

const writeAll = (entries: InvestorDeckRequest[]) => {
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

