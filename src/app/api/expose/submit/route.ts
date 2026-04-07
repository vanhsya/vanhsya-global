import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { findSubmission, readSubmissions, type ExposeSubmission, writeSubmissions } from '@/lib/exposeStorage';
import { verifyCsrf } from '@/lib/security/csrf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const uploadsDir = () => join(process.cwd(), 'var', 'expose', 'uploads');

const createId = () => {
  const rand = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `vx_${rand}`;
};

const toSafeFileName = (name: string) => name.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 120);

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403 });

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data')) {
    return Response.json({ error: 'Invalid content type' }, { status: 400 });
  }

  const form = await req.formData();

  const scamType = String(form.get('scamType') || '').trim();
  const severity = String(form.get('severity') || '').trim();
  const country = String(form.get('country') || '').trim();
  const amountLost = String(form.get('amountLost') || '').trim();
  const summary = String(form.get('summary') || '').trim();
  const contactPreference = String(form.get('contactPreference') || 'Email') as ExposeSubmission['contactPreference'];
  const anonymous = String(form.get('anonymous') || 'true') === 'true';
  const contactEmail = String(form.get('contactEmail') || '').trim();
  const contactPhone = String(form.get('contactPhone') || '').trim();

  if (!scamType || !severity || !country || !summary) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const id = createId();
  const createdAt = new Date().toISOString();

  mkdirSync(uploadsDir(), { recursive: true });
  const evidenceFiles: ExposeSubmission['evidenceFiles'] = [];

  const files = form.getAll('evidence');
  const limitedFiles = files.slice(0, 5);

  for (const file of limitedFiles) {
    if (!(file instanceof File)) continue;
    if (file.size <= 0) continue;
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: 'Evidence file too large (max 10MB each)' }, { status: 413 });
    }

    const safeName = toSafeFileName(file.name || 'evidence');
    const storedPath = join(uploadsDir(), `${id}_${safeName}`);
    const buf = Buffer.from(await file.arrayBuffer());
    writeFileSync(storedPath, buf);
    evidenceFiles.push({ name: safeName, path: storedPath, size: file.size, type: file.type || 'application/octet-stream' });
  }

  const record: ExposeSubmission = {
    id,
    createdAt,
    status: 'received',
    scamType,
    severity,
    country,
    amountLost: amountLost || undefined,
    summary,
    contactPreference,
    anonymous,
    contactEmail: contactEmail || undefined,
    contactPhone: contactPhone || undefined,
    evidenceFiles
  };

  const data = readSubmissions();
  data.submissions.unshift(record);
  writeSubmissions(data);

  const saved = findSubmission(id);
  if (!saved) return Response.json({ error: 'Failed to save submission' }, { status: 500 });

  return Response.json({ id, status: saved.status }, { status: 200 });
}
