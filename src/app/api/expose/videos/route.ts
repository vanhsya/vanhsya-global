import { EXPOSE_INTERVIEWS } from '@/data/expose/interviews';
import { EXPOSE_CASES } from '@/data/expose/cases';
import { COMPANY } from '@/lib/company';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 3600;

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

type UploadItem = {
  id: string;
  title: string;
  publishedAt: string;
  youtubeId: string;
  thumbnail: string;
  url: string;
};

const extractTag = (xml: string, tag: string) => {
  const m = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i').exec(xml);
  return m?.[1]?.trim() || null;
};

const parseUploadsFeed = (xml: string, limit: number): UploadItem[] => {
  const entries = xml.split(/<entry>/i).slice(1);
  const out: UploadItem[] = [];
  for (const raw of entries) {
    if (out.length >= limit) break;
    const chunk = raw.split(/<\/entry>/i)[0] ?? raw;
    const videoId = extractTag(chunk, 'yt:videoId');
    const title = extractTag(chunk, 'title');
    const published = extractTag(chunk, 'published');
    const linkMatch = /<link[^>]*rel="alternate"[^>]*href="([^"]+)"/i.exec(chunk) || /<link[^>]*href="([^"]+)"/i.exec(chunk);
    const url = linkMatch?.[1]?.trim() || (videoId ? `https://www.youtube.com/watch?v=${videoId}` : null);
    if (!videoId || !title || !published || !url) continue;
    out.push({
      id: videoId,
      title,
      publishedAt: published,
      youtubeId: videoId,
      thumbnail: ytThumb(videoId),
      url
    });
  }
  return out;
};

const getLatestUploads = async (channelId: string, limit: number) => {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
  const res = await fetch(feedUrl, {
    headers: { 'user-agent': 'vanhsya-web/1.0 (+https://vanhsya.com)' },
    cache: 'force-cache'
  });
  if (!res.ok) return [] as UploadItem[];
  const xml = await res.text();
  return parseUploadsFeed(xml, limit);
};

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

  let uploads: UploadItem[] = [];
  const channelId = COMPANY.social.youtubeChannelId;
  if (channelId) {
    try {
      uploads = await getLatestUploads(channelId, 8);
    } catch {
      uploads = [];
    }
  }

  const payload =
    type === 'interviews'
      ? { channel, uploads, interviews }
      : type === 'cases'
        ? { channel, uploads, caseVideos }
        : { channel, uploads, interviews, caseVideos };

  return Response.json(payload, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
