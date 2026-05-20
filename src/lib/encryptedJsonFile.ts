import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

type EnvelopeV1 = {
  v: 1;
  alg: 'aes-256-gcm';
  iv: string;
  tag: string;
  data: string;
};

const isEnvelope = (v: unknown): v is EnvelopeV1 => {
  if (!v || typeof v !== 'object') return false;
  const e = v as Partial<EnvelopeV1>;
  return (
    e.v === 1 &&
    e.alg === 'aes-256-gcm' &&
    typeof e.iv === 'string' &&
    typeof e.tag === 'string' &&
    typeof e.data === 'string'
  );
};

const keyFromEnv = (keyBase64: string | undefined) => {
  if (!keyBase64) return null;
  try {
    const buf = Buffer.from(keyBase64, 'base64');
    if (buf.length !== 32) return null;
    return buf;
  } catch {
    return null;
  }
};

export const encryptJson = (value: unknown, keyBase64: string): EnvelopeV1 => {
  const key = keyFromEnv(keyBase64);
  if (!key) throw new Error('Invalid encryption key.');

  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const plaintext = Buffer.from(JSON.stringify(value), 'utf8');
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    v: 1,
    alg: 'aes-256-gcm',
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    data: ciphertext.toString('base64')
  };
};

export const decryptJson = <T>(envelope: EnvelopeV1, keyBase64: string): T => {
  const key = keyFromEnv(keyBase64);
  if (!key) throw new Error('Invalid encryption key.');

  const iv = Buffer.from(envelope.iv, 'base64');
  const tag = Buffer.from(envelope.tag, 'base64');
  const data = Buffer.from(envelope.data, 'base64');

  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
  return JSON.parse(plaintext) as T;
};

export const readJsonFile = <T>(filePath: string, keyBase64?: string): T => {
  const raw = readFileSync(filePath, 'utf8');
  const parsed = JSON.parse(raw) as unknown;
  if (!parsed) return parsed as T;

  const key = keyFromEnv(keyBase64);
  if (!key || !isEnvelope(parsed)) return parsed as T;
  return decryptJson<T>(parsed, key.toString('base64'));
};

export const writeJsonFile = (filePath: string, value: unknown, keyBase64?: string) => {
  const key = keyFromEnv(keyBase64);
  if (!key) {
    writeFileSync(filePath, JSON.stringify(value, null, 2), 'utf8');
    return;
  }
  const envelope = encryptJson(value, key.toString('base64'));
  writeFileSync(filePath, JSON.stringify(envelope, null, 2), 'utf8');
};

export const getLocalStorageEncryptionKey = () => keyFromEnv(process.env.LOCAL_STORAGE_ENCRYPTION_KEY)?.toString('base64') ?? undefined;
