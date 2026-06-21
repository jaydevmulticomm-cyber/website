'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { products, categories, IMPORT_PRODUCTS } from '@/lib/content';
import { Icon } from './Icon';

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
  </svg>
);

const catLabel: Record<string, string> = Object.fromEntries(categories.map(c => [c.id, c.label]));

type Mode = 'export' | 'import';

export default function ProductsClient() {
  const [mode, setMode] = useState<Mode>('export');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const exportFiltered = useMemo(() => {
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

  const importFiltered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return IMPORT_PRODUCTS;
    return IMPORT_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q)
      || (p.cas ?? '').includes(q)
      || (p.formula ?? '').toLowerCase().includes(q)
      || p.description.toLowerCase().includes(q)
      || p.applications.some(a => a.toLowerCase().includes(q))
    );
  }, [search]);

  const switchMode = (m: Mode) => { setMode(m); setSearch(''); setActiveCategory('all'); };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Page header */}
      <div className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Product Portfolio</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {mode === 'export' ? `${products.length}+ Chemicals We Export` : 'What We Import to India'}
          </h1>
          <p className="text-white/65 max-w-2xl mx-auto text-lg">
            {mode === 'export'
              ? 'Manufacturer-direct industrial chemicals shipped worldwide — full COA, MSDS & export documentation on every product.'
              : 'Select raw materials Jaydev Multicomm sources into India for domestic ceramic, oleochemical & specialty processors.'}
          </p>

          {/* Export / Import toggle */}
          <div className="inline-flex mt-8 p-1 rounded-full bg-white/[0.08] border border-white/15">
            <button
              onClick={() => switchMode('export')}
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-sm font-semibold transition-all ${mode === 'export' ? 'bg-gold text-white shadow' : 'text-white/65 hover:text-white'}`}
            >
              <Icon name="Ship" className="w-4 h-4" /> Export from India
              <span className={`text-xs ${mode === 'export' ? 'text-white/80' : 'text-white/40'}`}>{products.length}</span>
            </button>
            <button
              onClick={() => switchMode('import')}
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-sm font-semibold transition-all ${mode === 'import' ? 'bg-gold text-white shadow' : 'text-white/65 hover:text-white'}`}
            >
              <Icon name="Anchor" className="w-4 h-4" /> Import to India
              <span className={`text-xs ${mode === 'import' ? 'text-white/80' : 'text-white/40'}`}>{IMPORT_PRODUCTS.length}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {mode === 'export' ? (
          <>
            {/* ── Filter bar (sticky): search + group pills ── */}
            <div className="sticky top-16 z-30 -mx-4 px-4 py-4 bg-white/95 backdrop-blur border-b border-[#EAEEF3]">
              <div className="max-w-lg mx-auto relative mb-3">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search 100+ chemicals by name, CAS, formula or use…"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all shadow-sm"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all border ${activeCategory === 'all' ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-[#E5E7EB] hover:border-navy hover:text-navy'}`}
                >
                  All ({products.length})
                </button>
                {categories.map(c => {
                  const count = products.filter(p => p.category === c.id).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id)}
                      className={`inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all border ${activeCategory === c.id ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-[#E5E7EB] hover:border-navy hover:text-navy'}`}
                    >
                      <Icon name={c.icon} className="w-4 h-4" /> {c.label} ({count})
                    </button>
                  );
                })}
              </div>
              <div className="mt-2.5 flex items-center justify-center gap-3 text-sm">
                <span className="text-gray-400">{exportFiltered.length} product{exportFiltered.length !== 1 ? 's' : ''}</span>
                {(activeCategory !== 'all' || search) && (
                  <button onClick={() => { setActiveCategory('all'); setSearch(''); }} className="inline-flex items-center gap-1 text-gold-dark font-semibold hover:underline">
                    <Icon name="X" className="w-3.5 h-3.5" /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* ── Export grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
              {exportFiltered.map(product => {
                const hasFormula = product.formula && product.formula !== '-';
                return (
                  <article
                    key={product.id}
                    className="group relative flex flex-col bg-white rounded-2xl border border-[#EAEEF3] transition-all duration-300 hover:border-gold/40 hover:shadow-[0_18px_46px_-18px_rgba(14,32,64,0.25)]"
                  >
                    {hasFormula && (
                      <span className="pointer-events-none absolute top-4 right-5 font-mono font-bold text-3xl text-navy/[0.05] group-hover:text-gold/[0.10] transition-colors select-none">
                        {product.formula}
                      </span>
                    )}
                    <div className="p-6 flex-1 flex flex-col relative">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">{catLabel[product.category]}</span>
                        {product.featured && <Icon name="Sparkles" className="w-3.5 h-3.5 text-gold ml-auto" />}
                      </div>
                      <h3 className="font-jakarta font-extrabold text-navy text-xl leading-tight mb-2 pr-16">{product.name}</h3>
                      <div className="flex items-baseline gap-2 mb-3">
                        {hasFormula && <span className="font-mono text-gold-dark text-sm font-bold">{product.formula}</span>}
                        <span className="text-gray-400 text-xs font-mono">CAS {product.cas}</span>
                      </div>
                      <p className="text-navy-mid text-xs font-semibold mb-3">{product.grade}</p>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-6">{product.description}</p>
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

            {exportFiltered.length === 0 && (
              <div className="text-center py-20">
                <Icon name="Search" className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No products match. Try a different search or group.</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* ── Import search ── */}
            <div className="sticky top-16 z-30 -mx-4 px-4 py-4 bg-white/95 backdrop-blur border-b border-[#EAEEF3]">
              <div className="max-w-lg mx-auto relative">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search imports by name, CAS, formula or use…"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all shadow-sm"
                />
              </div>
              <div className="mt-2.5 text-center text-sm text-gray-400">
                {importFiltered.length} import{importFiltered.length !== 1 ? 's' : ''} into India
              </div>
            </div>

            {/* ── Import grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
              {importFiltered.map(p => (
                <article
                  key={p.id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-[#EAEEF3] transition-all duration-300 hover:border-gold/40 hover:shadow-[0_18px_46px_-18px_rgba(14,32,64,0.25)]"
                >
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gold-bg flex items-center justify-center">
                        <Icon name={p.icon} className="w-6 h-6 text-gold-dark" strokeWidth={1.6} />
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gold-dark bg-gold-bg border border-gold/30 px-2.5 py-1 rounded-full">
                        <Icon name="Anchor" className="w-3 h-3" /> Import
                      </span>
                    </div>
                    <h3 className="font-jakarta font-extrabold text-navy text-xl leading-tight mb-1">{p.name}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      {p.formula && <span className="font-mono text-gold-dark text-sm font-bold">{p.formula}</span>}
                      {p.cas && <span className="text-gray-400 text-xs font-mono">CAS {p.cas}</span>}
                    </div>
                    <p className="text-navy-mid text-xs font-semibold mb-3">{p.origin}</p>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.applications.slice(0, 4).map(a => (
                        <span key={a} className="text-[11px] px-2 py-0.5 rounded bg-navy-pale text-navy-mid font-medium">{a}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-[#F1F5F9] mt-auto">
                      <Link
                        href={`/quote?product=${p.id}`}
                        className="flex-1 text-center px-3 py-2 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy-mid transition-colors"
                      >
                        Enquire to Import
                      </Link>
                      <a
                        href={`https://wa.me/919987539258?text=Hi%2C%20I%20want%20to%20import%20${encodeURIComponent(p.name)}`}
                        target="_blank" rel="noopener noreferrer"
                        aria-label={`WhatsApp enquiry for ${p.name}`}
                        className="w-8 h-8 rounded-lg text-green-600 border border-green-200 bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
                      >
                        <WaIcon />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {importFiltered.length === 0 && (
              <div className="text-center py-20">
                <Icon name="Search" className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No imports match. We also source materials on request — ask us.</p>
              </div>
            )}
          </>
        )}

        {/* Custom Sourcing CTA (shared) */}
        <div className="mt-16 bg-navy rounded-2xl p-10 text-center">
          <h3 className="font-jakarta text-2xl font-extrabold text-white mb-2">
            {mode === 'export' ? 'Need a Different Chemical?' : 'Looking to Import Something Else?'}
          </h3>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            {mode === 'export'
              ? "We source 200+ industrial chemicals on request. Tell us what you need - we'll find it."
              : 'We arrange imports of specialty raw materials into India. Tell us the material and grade you need.'}
          </p>
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
