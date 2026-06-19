'use client';

import Link from 'next/link';
import { marketData } from '@/lib/content';
import { Icon } from './Icon';

export default function MarketsClient() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      {/* Header */}
      <div className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Export Markets</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white mb-4">Our Global Markets</h1>
          <p className="text-white/65 max-w-xl mx-auto text-lg">
            Regular LCL & FCL shipments to 4 major trade regions. Competitive CIF/FOB pricing with complete export documentation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Lead time quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {marketData.map(m => (
            <div key={m.id} className="card-white p-5 text-center">
              <div className="w-11 h-11 rounded-xl bg-gold-bg flex items-center justify-center mx-auto mb-2">
                <Icon name="Globe" className="w-6 h-6 text-gold-dark" strokeWidth={1.6} />
              </div>
              <div className="font-jakarta font-extrabold text-gold text-xl">{m.leadTime}</div>
              <div className="text-navy font-semibold text-sm mt-1">{m.name}</div>
            </div>
          ))}
        </div>

        {/* Detailed market cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {marketData.map(market => (
            <div key={market.id} id={market.id} className="card-white rounded-2xl overflow-hidden scroll-mt-24 flex flex-col h-full">
              {/* Card header */}
              <div className="bg-navy p-6 relative overflow-hidden">
                <Icon name="Globe" className="absolute -top-4 -right-4 w-28 h-28 text-white/5 pointer-events-none" strokeWidth={1} />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-gold/20 border border-gold/30 flex items-center justify-center mb-3">
                      <Icon name="Globe" className="w-6 h-6 text-gold-light" strokeWidth={1.6} />
                    </div>
                    <h2 className="font-jakarta text-2xl font-extrabold text-white">{market.name}</h2>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-gold/20 border border-gold/40 text-gold-light text-sm font-extrabold whitespace-nowrap">
                    {market.leadTime}
                  </span>
                </div>
                <p className="text-white/65 text-sm leading-relaxed mt-3 min-h-[2.75rem]">{market.description}</p>
              </div>

              <div className="p-6 grid grid-cols-2 gap-6 min-h-[17.5rem] content-start">
                <div>
                  <h3 className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-3">Countries</h3>
                  <div className="space-y-1.5">
                    {market.countries.map(c => (
                      <div key={c} className="text-gray-700 text-sm flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-3">Industries</h3>
                  <div className="space-y-1.5">
                    {market.industries.map(ind => (
                      <div key={ind} className="text-gray-700 text-sm flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-navy flex-shrink-0" />
                        {ind}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-2">
                <h3 className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-3">High-Demand Products</h3>
                <div className="flex flex-wrap gap-2 mb-5 min-h-[3.5rem] content-start">
                  {market.keyProducts.map(p => (
                    <span key={p} className="text-xs px-3 py-1 rounded-full bg-gold-bg border border-gold/30 text-gold-dark font-semibold h-fit">{p}</span>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-4">
                <h3 className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-2">Main Ports</h3>
                <div className="flex flex-wrap gap-2 mb-5">
                  {market.ports.map(port => (
                    <span key={port} className="text-xs px-3 py-1 rounded-full bg-navy-pale border border-navy-light text-navy font-medium">{port}</span>
                  ))}
                </div>
              </div>

              <div className="mt-auto px-6 pb-6 flex items-center justify-between gap-4 border-t border-[#F1F5F9] pt-5">
                <Link
                  href={`/quote?market=${market.id}`}
                  className="group/cta inline-flex items-center gap-2.5 font-jakarta font-bold text-navy hover:text-gold-dark transition-colors"
                >
                  Get a quote for {market.name}
                  <span className="inline-flex w-7 h-7 rounded-full bg-gold/15 text-gold-dark items-center justify-center transition-all group-hover/cta:bg-gold group-hover/cta:text-white">
                    <Icon name="ArrowRight" className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5" />
                  </span>
                </Link>
                <a
                  href={`https://wa.me/919987539258?text=Hi%2C%20I%20need%20chemicals%20for%20${encodeURIComponent(market.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp enquiry for ${market.name}`}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-100 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
