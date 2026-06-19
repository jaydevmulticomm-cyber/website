import { redirect } from 'next/navigation';
import { marketData } from '@/lib/content';

export function generateStaticParams() {
  return marketData.map((m) => ({ slug: m.id }));
}

export default async function MarketSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/markets#${slug}`);
}
