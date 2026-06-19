'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products, categories } from '@/lib/content';
import { Icon } from './Icon';

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

// subtle accent dot per category
const accent: Record<string, string> = {
  'chlor-alkali': '#2563EB', 'acids': '#DC2626', 'water-treatment': '#0891B2',
  'specialty': '#7C3AED', 'solvents': '#EA580C', 'inorganic-salts': '#64748B',
  'surfactants': '#DB2777', 'minerals': '#D97706', 'agro': '#16A34A',
};
const catLabel: Record<string, string> = Object.fromEntries(categories.map(c => [c.id, c.label]));

export default function ProductsClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter(p => {
      const matchCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchSearch = !q
        || p.name.toLowerCase().includes(q)
        || p.cas.includes(q)
        || p.formula.toLowerCase().includes(q)
        || p.description.toLowerCase().includes(q)
        || p.applications.some(a => a.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Page header */}
      <div className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Chemical Catalog</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {products.length}+ Industrial Chemicals
          </h1>
          <p className="text-white/65 max-w-2xl mx-auto text-lg">
            Your single-source supply partner - search the full range or filter by group. Full COA, MSDS &amp; export documentation on every product.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* ── Smart filter bar (sticky) ── */}
        <div className="sticky top-16 z-30 -mx-4 px-4 py-4 bg-white/95 backdrop-blur border-b border-[#EAEEF3]">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch">
            {/* Search */}
            <div className="relative flex-1">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search 100+ chemicals by name, CAS, formula or use…"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all shadow-sm"
              />
            </div>
            {/* Category select (the single smart filter) */}
            <div className="relative sm:w-60">
              <select
                value={activeCategory}
                onChange={e => setActiveCategory(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-3 rounded-xl bg-navy text-white text-sm font-semibold border border-navy focus:outline-none focus:ring-2 focus:ring-gold/40 cursor-pointer"
              >
                <option value="all">All Groups ({products.length})</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.label} ({products.filter(p => p.category === c.id).length})</option>
                ))}
              </select>
              <Icon name="ChevronRight" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-light rotate-90 pointer-events-none" />
            </div>
          </div>
          {/* active filter / count line */}
          <div className="max-w-3xl mx-auto mt-3 flex items-center justify-center gap-3 text-sm">
            <span className="text-gray-400">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
            {(activeCategory !== 'all' || search) && (
              <button
                onClick={() => { setActiveCategory('all'); setSearch(''); }}
                className="inline-flex items-center gap-1 text-gold-dark font-semibold hover:underline"
              >
                <Icon name="X" className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {filtered.map(product => {
            const a = accent[product.category] ?? '#C9922A';
            const hasFormula = product.formula && product.formula !== '-';
            return (
              <article
                key={product.id}
                className="group relative flex flex-col bg-white rounded-2xl border border-[#EAEEF3] transition-all duration-300 hover:border-gold/40 hover:shadow-[0_18px_46px_-18px_rgba(14,32,64,0.25)]"
              >
                {/* large watermark formula */}
                {hasFormula && (
                  <span className="pointer-events-none absolute top-4 right-5 font-mono font-bold text-3xl text-navy/[0.05] group-hover:text-gold/[0.10] transition-colors select-none">
                    {product.formula}
                  </span>
                )}

                <div className="p-6 flex-1 flex flex-col relative">
                  {/* category label + featured */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: a }} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">{catLabel[product.category]}</span>
                    {product.featured && <Icon name="Sparkles" className="w-3.5 h-3.5 text-gold ml-auto" />}
                  </div>

                  {/* name */}
                  <h3 className="font-jakarta font-extrabold text-navy text-xl leading-tight mb-2 pr-16">{product.name}</h3>

                  {/* formula · CAS */}
                  <div className="flex items-baseline gap-2 mb-3">
                    {hasFormula && <span className="font-mono text-gold-dark text-sm font-bold">{product.formula}</span>}
                    <span className="text-gray-400 text-xs font-mono">CAS {product.cas}</span>
                  </div>

                  {/* grade */}
                  <p className="text-navy-mid text-xs font-semibold mb-3">{product.grade}</p>

                  {/* description */}
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-6">{product.description}</p>

                  {/* footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] mt-auto">
                    <Link
                      href={`/products/${product.id}`}
                      className="group/cta inline-flex items-center gap-2 font-jakarta font-bold text-navy text-sm hover:text-gold-dark transition-colors"
                    >
                      View product
                      <span className="inline-flex w-6 h-6 rounded-full bg-gold/12 text-gold-dark items-center justify-center transition-all group-hover/cta:bg-gold group-hover/cta:text-white">
                        <Icon name="ArrowRight" className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                      </span>
                    </Link>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/quote?product=${product.id}`}
                        className="px-3 py-1.5 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy-mid transition-colors"
                      >
                        Quote
                      </Link>
                      <a
                        href={`https://wa.me/919987539258?text=Hi%2C%20I%20need%20a%20quote%20for%20${encodeURIComponent(product.name)}`}
                        target="_blank" rel="noopener noreferrer"
                        aria-label={`WhatsApp enquiry for ${product.name}`}
                        className="w-8 h-8 rounded-lg text-green-600 border border-green-200 bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
                      >
                        <WaIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Icon name="Search" className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No products match. Try a different search or group.</p>
          </div>
        )}

        {/* Custom Sourcing CTA */}
        <div className="mt-16 bg-navy rounded-2xl p-10 text-center">
          <h3 className="font-jakarta text-2xl font-extrabold text-white mb-2">Need a Different Chemical?</h3>
          <p className="text-white/60 mb-6 max-w-md mx-auto">We source 200+ industrial chemicals on request. Tell us what you need - we&apos;ll find it.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/quote" className="btn-gold px-8 py-3">Submit Custom RFQ <Icon name="ArrowRight" className="w-4 h-4" /></Link>
            <a href="/Jaydev-Multicomm-Catalogue.pdf" download className="btn-ghost-white px-8 py-3">
              <Icon name="Download" className="w-4 h-4" /> Download Catalogue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
