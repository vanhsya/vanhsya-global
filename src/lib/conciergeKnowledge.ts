import { getMongoClient } from '@/lib/mongodb';

export type ConciergeKnowledgeRecord = {
  kind: 'concierge_knowledge';
  updatedAt: string;
  version: number;
  data: unknown;
  updatedBy?: { actor?: string; ip?: string } | null;
};

const defaultKnowledge = (): ConciergeKnowledgeRecord => ({
  kind: 'concierge_knowledge',
  updatedAt: new Date().toISOString(),
  version: 1,
  data: {
    brand: {
      name: 'VANHSYA',
      scope: ['Vanhsya Travels', 'Vanhsya Beauty', 'Vyno Coin', 'Immigration & relocation concierge'],
      support: {
        contactRoute: '/contact',
        portalRoute: '/portal'
      }
    },
    guidance: {
      accuracy: 'If something is not explicitly present in this knowledge, ask a clarifying question or direct to /contact instead of guessing.',
      privacy: 'Never request or reveal secrets, passwords, OTPs, private keys, seed phrases, or full card details.',
      compliance: 'If a user requests regulated financial advice, provide general info and suggest official resources or support.'
    }
  }
});

const noStore = { 'cache-control': 'no-store' };

const safeString = (v: unknown) => (typeof v === 'string' ? v : null);

export async function getConciergeKnowledge(): Promise<
  { ok: true; record: ConciergeKnowledgeRecord; source: 'mongo' | 'default' } | { ok: false; error: string }
> {
  const mongoConfigured = Boolean(process.env.MONGODB_URI);
  if (!mongoConfigured) return { ok: true, record: defaultKnowledge(), source: 'default' };

  try {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB || 'vanhsya';
    const doc = (await client
      .db(dbName)
      .collection('concierge_knowledge')
      .findOne({ kind: 'concierge_knowledge' })) as any;

    const updatedAt = safeString(doc?.updatedAt) || new Date().toISOString();
    const version = typeof doc?.version === 'number' && Number.isFinite(doc.version) ? doc.version : 1;
    const data = doc?.data ?? defaultKnowledge().data;
    const updatedBy =
      doc?.updatedBy && typeof doc.updatedBy === 'object'
        ? { actor: safeString(doc.updatedBy.actor) || undefined, ip: safeString(doc.updatedBy.ip) || undefined }
        : null;

    return {
      ok: true,
      record: { kind: 'concierge_knowledge', updatedAt, version, data, updatedBy },
      source: doc ? 'mongo' : 'default'
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Knowledge store error' };
  }
}

export async function upsertConciergeKnowledge(input: {
  data: unknown;
  actor?: string | null;
  ip?: string | null;
}): Promise<{ ok: true; record: ConciergeKnowledgeRecord } | { ok: false; error: string; status?: number; headers?: HeadersInit }> {
  const mongoConfigured = Boolean(process.env.MONGODB_URI);
  if (!mongoConfigured) return { ok: false, error: 'MongoDB is not configured.', status: 503, headers: noStore };

  if (input.data == null) return { ok: false, error: 'Missing data.', status: 400, headers: noStore };

  const raw = JSON.stringify(input.data);
  if (raw.length > 250_000) return { ok: false, error: 'Payload too large.', status: 413, headers: noStore };

  try {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB || 'vanhsya';
    const col = client.db(dbName).collection('concierge_knowledge');

    const existing = (await col.findOne({ kind: 'concierge_knowledge' })) as any;
    const nextVersion =
      typeof existing?.version === 'number' && Number.isFinite(existing.version) ? Math.max(1, existing.version + 1) : 1;

    const updatedAt = new Date().toISOString();
    const record: ConciergeKnowledgeRecord = {
      kind: 'concierge_knowledge',
      updatedAt,
      version: nextVersion,
      data: input.data,
      updatedBy: { actor: input.actor || undefined, ip: input.ip || undefined }
    };

    await col.updateOne({ kind: 'concierge_knowledge' }, { $set: record }, { upsert: true });
    return { ok: true, record };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Knowledge store error', status: 502, headers: noStore };
  }
}

const truncate = (s: string, max: number) => (s.length <= max ? s : `${s.slice(0, max)}…`);

export function formatConciergeKnowledgeForSystemPrompt(record: ConciergeKnowledgeRecord): string {
  const payload = (() => {
    try {
      return JSON.stringify(record.data);
    } catch {
      return '{"error":"Knowledge is not JSON serializable."}';
    }
  })();
  return truncate(payload, 9000);
}

