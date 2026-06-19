import { notFound } from 'next/navigation';
import { products } from '@/lib/content';
import ProductDetailClient from '@/components/ProductDetailClient';

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.id === slug);
  if (!product) return {};
  return {
    title: `${product.name} (${product.formula}) - CAS ${product.cas}`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.id === slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
