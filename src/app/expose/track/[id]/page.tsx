import TrackCase from '@/components/expose/TrackCase';

export default async function TrackCasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TrackCase id={id} />;
}
