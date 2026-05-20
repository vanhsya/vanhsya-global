import { mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getLocalStorageEncryptionKey, readJsonFile, writeJsonFile } from '@/lib/encryptedJsonFile';

export type ExposeSubmissionStatus = 'received' | 'reviewing' | 'published' | 'rejected';

export type ExposeSubmission = {
  id: string;
  createdAt: string;
  status: ExposeSubmissionStatus;
  scamType: string;
  severity: string;
  country: string;
  amountLost?: string;
  summary: string;
  contactPreference: 'WhatsApp' | 'Email' | 'Call';
  anonymous: boolean;
  contactEmail?: string;
  contactPhone?: string;
  evidenceFiles: { name: string; path?: string; size: number; type: string }[];
};

type StorageShape = {
  submissions: ExposeSubmission[];
};

const storageDir = () => join(process.cwd(), 'var', 'expose');
const storagePath = () => join(storageDir(), 'submissions.json');

const memoryKey = '__vanhsya_expose_submissions';

const getMemory = () => {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!g[memoryKey] || typeof g[memoryKey] !== 'object') g[memoryKey] = { submissions: [] };
  const v = g[memoryKey] as StorageShape;
  if (!Array.isArray(v.submissions)) v.submissions = [];
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
    writeJsonFile(storagePath(), { submissions: [] } satisfies StorageShape, getLocalStorageEncryptionKey());
  }
};

export const readSubmissions = (): StorageShape => {
  if (!canWriteFileStorage()) return getMemory();
  ensureStorage();
  try {
    const parsed = readJsonFile<StorageShape>(storagePath(), getLocalStorageEncryptionKey());
    if (!Array.isArray(parsed.submissions)) return getMemory();
    const mem = getMemory();
    if (mem.submissions.length === 0 && parsed.submissions.length) mem.submissions.push(...parsed.submissions);
    return parsed;
  } catch {
    return getMemory();
  }
};

export const writeSubmissions = (next: StorageShape) => {
  const mem = getMemory();
  mem.submissions = Array.isArray(next.submissions) ? next.submissions : [];
  if (!canWriteFileStorage()) return;
  ensureStorage();
  writeJsonFile(storagePath(), next, getLocalStorageEncryptionKey());
};

export const findSubmission = (id: string) => {
  const data = readSubmissions();
  return data.submissions.find((s) => s.id === id) || null;
};
