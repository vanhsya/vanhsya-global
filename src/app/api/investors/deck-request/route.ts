import { addDeckRequest } from '@/lib/investorLeadsStorage';
import { queueSubmissionWebhook } from '@/lib/submissionsWebhook';
import { verifyCsrf } from '@/lib/security/csrf';

export const runtime = 'nodejs';

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  const csrf = verifyCsrf(req);
  if (!csrf.ok) return Response.json({ error: csrf.reason }, { status: 403 });

  const body = (await req.json().catch(() => null)) as
    | {
        name?: unknown;
        email?: unknown;
        organization?: unknown;
        role?: unknown;
        stage?: unknown;
        message?: unknown;
        source?: unknown;
      }
    | null;

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const organization = typeof body?.organization === 'string' ? body.organization.trim() : undefined;
  const role = typeof body?.role === 'string' ? body.role.trim() : undefined;
  const stage = typeof body?.stage === 'string' ? body.stage.trim() : undefined;
  const message = typeof body?.message === 'string' ? body.message.trim() : undefined;
  const source = typeof body?.source === 'string' ? body.source.trim() : undefined;

  if (!name) return Response.json({ error: 'Name is required' }, { status: 400 });
  if (!email || !isEmail(email)) return Response.json({ error: 'Valid email is required' }, { status: 400 });

  try {
    const entry = addDeckRequest({ name, email, organization, role, stage, message, source });
    queueSubmissionWebhook({
      kind: 'investor_deck_request',
      receivedAt: new Date().toISOString(),
      data: {
        id: entry.id,
        name,
        email,
        organization,
        role,
        stage,
        message,
        source
      }
    });
    return Response.json({ id: entry.id }, { status: 200 });
  } catch {
    return Response.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
