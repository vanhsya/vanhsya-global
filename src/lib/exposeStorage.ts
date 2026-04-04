import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

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
  evidenceFiles: { name: string; path: string; size: number; type: string }[];
};

type StorageShape = {
  submissions: ExposeSubmission[];
};

const storageDir = () => join(process.cwd(), 'var', 'expose');
const storagePath = () => join(storageDir(), 'submissions.json');

const ensureStorage = () => {
  mkdirSync(storageDir(), { recursive: true });
  try {
    readFileSync(storagePath(), 'utf8');
  } catch {
    writeFileSync(storagePath(), JSON.stringify({ submissions: [] } satisfies StorageShape, null, 2), 'utf8');
  }
};

export const readSubmissions = (): StorageShape => {
  ensureStorage();
  const raw = readFileSync(storagePath(), 'utf8');
  try {
    return JSON.parse(raw) as StorageShape;
  } catch {
    return { submissions: [] };
  }
};

export const writeSubmissions = (next: StorageShape) => {
  ensureStorage();
  writeFileSync(storagePath(), JSON.stringify(next, null, 2), 'utf8');
};

export const findSubmission = (id: string) => {
  const data = readSubmissions();
  return data.submissions.find((s) => s.id === id) || null;
};

