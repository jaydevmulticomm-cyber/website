import Link from 'next/link';
import { Icon } from '@/components/Icon';

export const metadata = {
  title: 'Quality & Documentation',
  description: 'Full export documentation including COA, MSDS, Certificate of Origin, Bill of Lading, IMDG compliance and more.',
};

const docs = [
  { icon: 'FileText', title: 'Certificate of Analysis', desc: 'Batch-specific COA from manufacturer with full parameter testing, signed and stamped.' },
  { icon: 'ShieldCheck', title: 'MSDS / Safety Data Sheet', desc: 'GHS-compliant Material Safety Data Sheets for every product, in English.' },
  { icon: 'Globe', title: 'Certificate of Origin', desc: 'COO issued by Indian Chamber of Commerce or Export Promotion Council.' },
  { icon: 'Ship', title: 'Bill of Lading', desc: 'Full set of original BL or Seaway Bill as required by buyer\'s bank.' },
  { icon: 'Package', title: 'Packing List', desc: 'Detailed packing list showing weights, dimensions, marks, and lot numbers.' },
  { icon: 'FileText', title: 'Commercial Invoice', desc: 'Commercial invoice with all required fields for customs clearance.' },
  { icon: 'Boxes', title: 'IMDG Declaration', desc: 'IMO dangerous goods declaration for hazardous chemical shipments.' },
  { icon: 'BadgeCheck', title: 'Fumigation Certificate', desc: 'Phytosanitary fumigation certificate for wooden packaging when required.' },
];

const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System' },
  { name: 'ISO 14001:2015', desc: 'Environmental Management' },
  { name: 'IMDG Compliant', desc: 'Dangerous Goods Handling' },
];

export default function QualityPage() {
  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <div className="bg-navy py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="section-label mb-3">Quality</span>
          <h1 className="font-jakarta text-4xl sm:text-5xl font-extrabold text-white mb-4">Quality &amp; Documentation</h1>
          <p className="text-white/65 max-w-xl mx-auto text-lg">Complete export documentation included with every shipment. No extra charges, no delays.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Certifications */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {certifications.map(cert => (
            <div key={cert.name} className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gold-bg border border-gold/30">
              <Icon name="BadgeCheck" className="w-5 h-5 text-gold flex-shrink-0" />
              <div>
                <div className="font-jakarta font-extrabold text-navy text-sm">{cert.name}</div>
                <div className="text-gray-500 text-xs">{cert.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Docs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {docs.map(doc => (
            <div key={doc.title} className="card-white p-5">
              <div className="w-11 h-11 rounded-xl bg-gold-bg flex items-center justify-center mb-3">
                <Icon name={doc.icon} className="w-6 h-6 text-gold-dark" strokeWidth={1.6} />
              </div>
              <h3 className="font-jakarta font-bold text-navy text-sm mb-2">{doc.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{doc.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-navy rounded-2xl p-10">
          <h2 className="font-jakarta text-2xl font-extrabold text-white mb-3">Ready to Proceed?</h2>
          <p className="text-white/60 mb-6">Submit an RFQ and receive a complete documentation package with your quote.</p>
          <Link href="/quote" className="btn-gold px-10 py-4 text-base">Request a Quote</Link>
        </div>
      </div>
    </div>
  );
}
