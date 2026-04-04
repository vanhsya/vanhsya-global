import ScammerProfile from '@/components/expose/ScammerProfile';

export default async function ScammerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ScammerProfile slug={slug} />;
}
