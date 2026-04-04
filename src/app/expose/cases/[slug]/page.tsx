import ExposeCase from '@/components/expose/ExposeCase';

export default async function ExposeCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ExposeCase slug={slug} />;
}
