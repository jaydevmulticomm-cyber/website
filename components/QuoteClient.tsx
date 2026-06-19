'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products, industryData, marketData } from '@/lib/content';
import { Icon } from './Icon';

const popularProducts = [
  'Caustic Soda Flakes',
  'Sulphuric Acid',
  'PAC – Poly Aluminium Chloride',
  'SMBS – Sodium Metabisulphite',
  'Hydrogen Peroxide',
  'Calcium Chloride',
];

const incoterms = ['CIF', 'FOB', 'CFR', 'EXW'];
const units = ['MT', 'KG', 'Liters', 'Drums', 'FCL'];

const WaIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
  </svg>
);

interface FormData {
  product: string;
  quantity: string;
  unit: string;
  destinationPort: string;
  incoterm: string;
  packaging: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
}

const defaultForm: FormData = {
  product: '', quantity: '', unit: 'MT', destinationPort: '', incoterm: 'CIF',
  packaging: '', name: '', company: '', email: '', phone: '', country: '', notes: '',
};

export default function QuoteClient() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const productId = searchParams.get('product');
    const industryId = searchParams.get('industry');
    const marketId = searchParams.get('market');
    setForm(f => {
      const next = { ...f };
      if (productId) {
        const found = products.find(p => p.id === productId);
        if (found) next.product = found.name;
      }
      if (industryId) {
        const ind = industryData.find(i => i.id === industryId);
        if (ind) next.notes = `Enquiry for the ${ind.name} industry.${next.notes ? ' ' + next.notes : ''}`;
      }
      if (marketId) {
        const mkt = marketData.find(m => m.id === marketId);
        if (mkt) {
          next.country = next.country || mkt.name;
          next.notes = `Shipping to ${mkt.name}.${next.notes ? ' ' + next.notes : ''}`;
        }
      }
      return next;
    });
  }, [searchParams]);

  const waMessage = encodeURIComponent(
    `Hi, I need a ${form.incoterm} quote for:\n\nProduct: ${form.product || 'TBD'}\nQty: ${form.quantity} ${form.unit}\nDestination: ${form.destinationPort}\nIncoterm: ${form.incoterm}\n\nContact: ${form.name}, ${form.company}, ${form.country}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nNotes: ${form.notes || 'None'}`
  );

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Input & label styles
  const inputClass = "w-full px-4 py-3 rounded-xl bg-white border border-[#E5E7EB] text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all shadow-sm";
  const labelClass = "block text-gray-700 text-xs font-semibold mb-1.5";

  if (submitted) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Icon name="Check" className="w-10 h-10 text-green-600" strokeWidth={2.5} />
          </div>
          <h1 className="font-jakarta text-2xl font-extrabold text-navy mb-3">Quote Request Received!</h1>
          <p className="text-gray-500 mb-8">We&apos;ll respond within 24 hours with a detailed CIF quote. For faster response, reach us on WhatsApp.</p>
          <a
            href={`https://wa.me/919987539258?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold mb-4 hover:bg-green-100 transition-all"
          >
            <WaIcon className="w-5 h-5" />
            Follow Up on WhatsApp
          </a>
          <Link href="/" className="text-gray-400 text-sm hover:text-navy transition-colors">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      {/* Header */}
      <div className="bg-navy py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Get Quote</span>
          <h1 className="font-jakarta text-4xl font-extrabold text-white mb-3">Request a CIF Quote</h1>
          <p className="text-white/65">Fill in your requirements - we respond with a detailed quote within 24 hours.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">

            {/* Product Requirements */}
            <div className="card-white p-6 rounded-2xl">
              <h2 className="font-jakarta font-extrabold text-navy text-lg mb-5">Product Requirements</h2>
              <div className="mb-4">
                <label className={labelClass}>Product Name *</label>
                <input
                  type="text"
                  list="products-list"
                  value={form.product}
                  onChange={set('product')}
                  placeholder="e.g. Caustic Soda Flakes"
                  className={inputClass}
                  required
                />
                <datalist id="products-list">
                  {products.map(p => <option key={p.id} value={p.name} />)}
                </datalist>
              </div>
              <div className="mb-4">
                <p className="text-gray-400 text-xs font-medium mb-2">Quick select:</p>
                <div className="flex flex-wrap gap-2">
                  {popularProducts.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, product: p }))}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                        form.product === p
                          ? 'bg-navy text-white border-navy'
                          : 'bg-white border-[#E5E7EB] text-gray-600 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Quantity *</label>
                  <input type="number" value={form.quantity} onChange={set('quantity')} placeholder="25" className={inputClass} required min="1" />
                </div>
                <div>
                  <label className={labelClass}>Unit</label>
                  <select value={form.unit} onChange={set('unit')} className={inputClass}>
                    {units.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Destination Port *</label>
                  <input type="text" value={form.destinationPort} onChange={set('destinationPort')} placeholder="e.g. Mombasa, Kenya" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Incoterm</label>
                  <select value={form.incoterm} onChange={set('incoterm')} className={inputClass}>
                    {incoterms.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Packaging Preference</label>
                <input type="text" value={form.packaging} onChange={set('packaging')} placeholder="e.g. 50 kg HDPE Bags, ISO Tank" className={inputClass} />
              </div>
            </div>

            {/* Contact Details */}
            <div className="card-white p-6 rounded-2xl">
              <h2 className="font-jakarta font-extrabold text-navy text-lg mb-5">Contact Details</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input type="text" value={form.name} onChange={set('name')} placeholder="Your name" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Company</label>
                  <input type="text" value={form.company} onChange={set('company')} placeholder="Company name" className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Phone / WhatsApp</label>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 234 567 8900" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Country</label>
                <input type="text" value={form.country} onChange={set('country')} placeholder="e.g. Kenya" className={inputClass} />
              </div>
            </div>

            <div className="card-white p-6 rounded-2xl">
              <label className={labelClass}>Additional Notes</label>
              <textarea value={form.notes} onChange={set('notes')} rows={4} placeholder="Specific grades, certifications, delivery requirements, or any other details..." className={`${inputClass} resize-none`} />
            </div>

            <button type="submit" className="btn-gold w-full py-4 text-base justify-center">
              Submit Quote Request →
            </button>
          </form>

          {/* ── SIDEBAR ── */}
          <div className="space-y-5">
            {/* Urgency signal */}
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-green-800 text-xs font-semibold">Quotes typically sent within 24 hours</p>
            </div>

            {/* Quick WA */}
            <div className="card-white p-6 rounded-2xl border-2 border-green-200">
              <h3 className="font-jakarta font-extrabold text-navy mb-2">Quick WhatsApp Quote</h3>
              <p className="text-gray-500 text-xs mb-4">Prefer WhatsApp? Send your requirements directly - fastest response guaranteed.</p>
              <a
                href={`https://wa.me/919987539258?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold hover:bg-green-100 transition-all mb-2"
              >
                <WaIcon />
                WhatsApp +91 99875 39258
              </a>
              <p className="text-gray-400 text-xs text-center">Message auto-fills from your form data</p>
            </div>

            {/* What we include */}
            <div className="card-white p-6 rounded-2xl">
              <h3 className="font-jakarta font-extrabold text-navy mb-4 text-sm">What We Include in Every Quote</h3>
              <div className="space-y-2.5">
                {['CIF/FOB pricing', 'Certificate of Analysis (COA)', 'MSDS / Safety Data Sheet', 'Certificate of Origin', 'Lead time estimate', 'Packaging options'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Icon name="Check" className="w-4 h-4 text-green-600 flex-shrink-0" strokeWidth={2.5} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="card-white p-6 rounded-2xl">
              <h3 className="font-jakarta font-extrabold text-navy mb-3 text-sm">Direct Contact</h3>
              <div className="space-y-2.5 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Icon name="Mail" className="w-4 h-4 text-gold flex-shrink-0" /> <a href="mailto:sales@jaydevmulticomm.com" className="hover:text-navy transition-colors">sales@jaydevmulticomm.com</a></div>
                <div className="flex items-center gap-2"><Icon name="Phone" className="w-4 h-4 text-gold flex-shrink-0" /> +91 99875 39258</div>
                <div className="flex items-center gap-2"><Icon name="Phone" className="w-4 h-4 text-gold flex-shrink-0" /> +91 99784 79258 (Office)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
