export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 3600;

const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export async function GET() {
  const explanationVideos = [
    {
      id: 'visa-pathways-guide',
      title: 'Deciding Your Visa Pathway: Step-by-Step Guide',
      description: 'Learn how to assess your eligibility and select the most successful visa route for Canada, the UK, or Europe using the VANHSYA platform.',
      category: 'Visa Pathways',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '12:45',
      thumbnail: ytThumb('dQw4w9WgXcQ'),
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 'scam-defense-walkthrough',
      title: 'Recognizing Visa Scams & Fake Job Offers',
      description: 'A comprehensive walkthrough on protecting yourself from common migration scams, bad agencies, and validating genuine sponsorship offers.',
      category: 'Scam Defense',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '18:20',
      thumbnail: ytThumb('dQw4w9WgXcQ'),
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 'portal-wizard-demo',
      title: 'How to Use the VANHSYA Document Wizard',
      description: 'Watch how our AI-assisted document preparation and validation system speeds up your visa application filing with zero errors.',
      category: 'Portal Walkthrough',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '8:15',
      thumbnail: ytThumb('dQw4w9WgXcQ'),
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 'golden-visa-options',
      title: 'European Golden Visa & Residency by Investment',
      description: 'An overview of investment-based relocation pathways in Spain, Portugal, Greece, and UAE residency requirements.',
      category: 'Visa Pathways',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '15:30',
      thumbnail: ytThumb('dQw4w9WgXcQ'),
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];

  return Response.json(
    {
      success: true,
      videos: explanationVideos
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/json'
      }
    }
  );
}
