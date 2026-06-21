import { Suspense } from 'react';
import QuoteClient from '@/components/QuoteClient';

export const metadata = {
  title: 'Request a Quote - CIF Pricing in 48 Hours',
  description: 'Submit an RFQ for industrial chemicals. Get a detailed CIF quote within 48 hours with full documentation.',
};

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-white/40">Loading...</div>
      </div>
    }>
      <QuoteClient />
    </Suspense>
  );
}
