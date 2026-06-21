import Link from 'next/link';
import Image from 'next/image';
import { products, featuredImage } from '@/lib/content';
import { Icon } from './Icon';

const featured = products.filter((p) => p.featured).slice(0, 6);

/**
 * Auto-scrolling featured-products carousel (seamless CSS marquee, pauses on
 * hover/touch-hold). Uses editorial `featuredImage()` art — product cards and
 * detail pages keep their real product photo via `productImage()`.
 */
export default function FeaturedCarousel() {
  const row = [...featured, ...featured];
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className="flex w-max animate-jd-marquee hover:[animation-play-state:paused]"
        style={{ animationDuration: '55s' }}
      >
        {row.map((p, i) => (
          <article
            key={`${p.id}-${i}`}
            className="group mr-5 w-[280px] sm:w-[320px] flex-shrink-0 bg-white rounded-2xl border border-[#EAEEF3] overflow-hidden shadow-sm hover:shadow-[0_18px_46px_-18px_rgba(14,32,64,0.25)] hover:border-gold/40 transition-all"
          >
            <Link href={`/products/${p.id}`} className="block relative h-44 bg-navy-pale overflow-hidden">
              <Image
                src={featuredImage(p)}
                alt={p.name}
                fill
                sizes="320px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 text-[11px] px-2.5 py-1 rounded-full bg-white/90 text-navy font-medium capitalize shadow-sm backdrop-blur">
                {p.category.replace(/-/g, ' ')}
              </span>
            </Link>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-jakarta font-bold text-navy text-base leading-snug">{p.name}</h3>
                <span className="text-[10px] text-gray-400 font-mono flex-shrink-0 mt-0.5">CAS {p.cas}</span>
              </div>
              <p className="text-gold-dark text-xs font-semibold mb-4">{p.grade}</p>
              <div className="flex gap-2">
                <Link href={`/products/${p.id}`} className="flex-1 text-center px-3 py-2 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy-mid transition-all">
                  Specifications
                </Link>
                <Link href={`/quote?product=${p.id}`} className="flex-1 text-center px-3 py-2 rounded-lg border border-gold/50 text-gold-dark text-xs font-semibold hover:bg-gold-bg transition-all">
                  Request Quote
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
