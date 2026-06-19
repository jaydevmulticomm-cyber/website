'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { products } from '../../lib/content';

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const product = params.get('product');
      if (product) setSelectedProduct(product);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const payload = {
      company: String(fd.get('company') || ''),
      name: String(fd.get('contact') || ''),
      email: String(fd.get('email') || ''),
      phone: String(fd.get('phone') || ''),
      volume: String(fd.get('volume') || ''),
      product: String(fd.get('product') || ''),
      details: String(fd.get('details') || ''),
    };

    setLoading(true);
    setError('');

    fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        setLoading(false);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const errorMessage = body?.error || 'Server error';
          setError(errorMessage);
          setStatusMessage(`Submission failed: ${errorMessage}`);
          return;
        }
        setSubmitted(true);
        setStatusMessage('Your enquiry was sent successfully. We will contact you within 24–48 hours.');
        form.reset();
      })
      .catch((err) => {
        setLoading(false);
        const networkMessage = err?.message || 'Network error';
        setError(networkMessage);
        setStatusMessage(`Submission failed: ${networkMessage}`);
      });
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-8">
      <div className="space-y-6 text-center">
        <span className="inline-flex rounded-full bg-teal-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-teal-700">Request a Quote</span>
        <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">Submit your export enquiry and get pricing in 24–48 hours.</h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600">Tell us your product, volume, destination port and preferred terms. Our export desk responds with a professional quote and documentation checklist.</p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-slate-900">Trade enquiry details</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">Submit the key shipment details and we will follow up with FOB/CIF pricing, shipping options and document timing.</p>
          </div>

          <div className="grid gap-6 rounded-[2rem] bg-slate-950 p-8 text-slate-100 shadow-soft">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-teal-200">Fast communication</p>
              <p className="mt-3 text-lg font-semibold">WhatsApp first response in business hours.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-teal-200">Shipping terms</p>
              <p className="mt-3 text-lg font-semibold">FOB / CIF / CFR / EXW available.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-teal-200">Documentation</p>
              <p className="mt-3 text-lg font-semibold">COA, MSDS, B/L, CoO and packing list.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: 'company', label: 'Company Name', type: 'text', placeholder: 'Your company or trading name' },
              { id: 'contact', label: 'Contact Person', type: 'text', placeholder: 'Name of buyer or officer' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'sales@company.com' },
              { id: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+91 99875 39258' },
              { id: 'volume', label: 'Volume Required', type: 'text', placeholder: 'e.g. 50 MT per shipment' },
            ].map((field) => (
              <label key={field.id} className="block text-sm font-semibold text-slate-900">
                <span className="mb-2 block text-sm font-medium text-slate-700">{field.label}</span>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
                  required
                />
              </label>
            ))}
            <label className="block text-sm font-semibold text-slate-900">
              <span className="mb-2 block text-sm font-medium text-slate-700">Product / Chemical</span>
              <select
                id="product"
                name="product"
                value={selectedProduct}
                onChange={(event) => setSelectedProduct(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
                required
              >
                <option value="">Select chemical product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} • {product.grade}
                  </option>
                ))}
                <option value="other">Other / Multiple products</option>
              </select>
            </label>
            <label className="block text-sm font-semibold text-slate-900">
              <span className="mb-2 block text-sm font-medium text-slate-700">Additional Details</span>
              <textarea
                id="details"
                name="details"
                placeholder="Preferred destination port, incoterms, delivery window, certifications..."
                className="h-36 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </label>
            <button type="submit" disabled={loading} className="w-full rounded-3xl bg-teal px-6 py-4 text-sm font-semibold text-white transition hover:bg-teal2 disabled:opacity-60">
              {loading ? 'Sending…' : 'Submit Enquiry'}
            </button>
            {statusMessage && (
              <div
                className={`rounded-3xl border p-5 text-sm ${
                  error ? 'border-rose-200 bg-rose-50 text-rose-900' : 'border-emerald-200 bg-emerald-50 text-emerald-900'
                }`}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
