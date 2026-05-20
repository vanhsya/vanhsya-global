import { MongoClient } from 'mongodb';

type Cached = {
  client: MongoClient;
  promise: Promise<MongoClient> | null;
};

const key = '__vanhsya_mongo_client';

const getCache = (): Cached => {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!g[key] || typeof g[key] !== 'object') {
    g[key] = { client: null, promise: null };
  }
  const c = g[key] as { client: MongoClient | null; promise: Promise<MongoClient> | null };
  return { client: c.client as MongoClient, promise: c.promise };
};

export const getMongoClient = async (): Promise<MongoClient> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGODB_URI.');

  const cache = getCache();
  if (cache.client) return cache.client;
  if (!cache.promise) {
    const client = new MongoClient(uri, { maxPoolSize: 10 });
    cache.promise = client.connect().then(() => {
      (globalThis as unknown as Record<string, any>)[key] = { client, promise: null };
      return client;
    });
  }
  return cache.promise;
};

export const pingMongo = async (): Promise<{ ok: true; latencyMs: number } | { ok: false; error: string }> => {
  const start = Date.now();
  try {
    const client = await getMongoClient();
    await client.db('admin').command({ ping: 1 });
    return { ok: true, latencyMs: Date.now() - start };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Mongo error' };
  }
};

