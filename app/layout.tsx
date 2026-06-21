import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import SocialRail from '@/components/SocialRail';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: {
    default: 'Jaydev Multicomm Pvt. Ltd. - Global Industrial Chemical Exporter',
    template: '%s | Jaydev Multicomm',
  },
  description: 'Jaydev Group - Rajkot-based chemical enterprise. Multicomm exports & imports 100+ industrial chemicals across 12 industries to Africa, GCC & SE Asia; Pharma & Intermediates serves India. Authorized partner of GACL & Grasim.',
  keywords: ['industrial chemicals exporter India', 'caustic soda exporter', 'sulphuric acid supplier', 'PAC SMBS exporter', 'GACL Grasim authorized partner', 'chemical trading Rajkot Gujarat', 'zircon sand importer', 'lauric acid decanoic acid'],
  metadataBase: new URL('https://www.jaydevmulticomm.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jaydevmulticomm.com',
    siteName: 'Jaydev Multicomm Pvt. Ltd.',
    title: 'Jaydev Multicomm - Global Industrial Chemical Supply',
    description: 'IEC-registered chemical exporter from India. 100+ products, 100+ global buyers, GACL & Grasim Authorized Partner.',
    images: [{ url: '/brand/logo.png', width: 800, height: 800, alt: 'Jaydev Multicomm' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaydev Multicomm Pvt. Ltd.',
    description: 'Industrial chemical exporter from Rajkot, India. GACL & Grasim Authorized Partner.',
    images: ['/brand/logo.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Jaydev Multicomm Pvt. Ltd.',
  url: 'https://www.jaydevmulticomm.com',
  email: 'sales@jaydevmulticomm.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '911 RK Supreme, 150 Ft Ring Road',
    addressLocality: 'Rajkot',
    addressRegion: 'Gujarat',
    postalCode: '360005',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+919987539258',
      contactType: 'sales',
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
    {
      '@type': 'ContactPoint',
      telephone: '+919978479258',
      contactType: 'customer support',
      availableLanguage: ['English', 'Hindi'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/jitesh-vajir-2471993b6/',
    'https://www.linkedin.com/in/darsh-k-07579a3b5/',
    'https://www.linkedin.com/in/meet-sheth-0871/',
  ],
  areaServed: ['East Africa', 'West Africa', 'GCC', 'Southeast Asia', 'Middle East'],
  description: 'IEC-registered industrial chemical exporter from Rajkot, Gujarat, India. Authorized partner of GACL and Grasim/Aditya Birla Chemicals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <SmoothScroll />
        <SocialRail />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
