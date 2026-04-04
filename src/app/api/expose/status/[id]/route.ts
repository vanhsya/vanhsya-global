import { findSubmission } from '@/lib/exposeStorage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const submission = findSubmission(id);
  if (!submission) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json(
    {
      id: submission.id,
      createdAt: submission.createdAt,
      status: submission.status
    },
    { status: 200 }
  );
}

