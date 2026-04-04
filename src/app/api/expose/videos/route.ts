import { EXPOSE_INTERVIEWS } from '@/data/expose/interviews';
import { EXPOSE_CASES } from '@/data/expose/cases';
import { COMPANY } from '@/lib/company';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 3600;

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get('type');

  const interviews = EXPOSE_INTERVIEWS.map((v) => ({
    id: v.id,
    title: v.title,
    guest: v.guest,
    role: v.role,
    publishedAt: v.publishedAt,
    youtubeId: v.youtubeId,
    thumbnail: ytThumb(v.youtubeId),
    summary: v.summary,
    tags: v.tags
  }));

  const caseVideos = EXPOSE_CASES.filter((c) => Boolean(c.youtubeId)).map((c) => ({
    id: c.id,
    title: c.title,
    publishedAt: c.publishedAt,
    youtubeId: c.youtubeId as string,
    thumbnail: ytThumb(c.youtubeId as string),
    country: c.country,
    scamType: c.scamType,
    severity: c.severity,
    slug: c.slug
  }));

  const channel = {
    url: COMPANY.social.youtubeChannel,
    subscribeUrl: COMPANY.social.youtubeSubscribe
  };

  const payload =
    type === 'interviews'
      ? { channel, interviews }
      : type === 'cases'
        ? { channel, caseVideos }
        : { channel, interviews, caseVideos };

  return Response.json(payload, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
