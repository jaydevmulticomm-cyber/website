import Link from 'next/link';
import Image from 'next/image';

/**
 * Official Jaydev logo - the exact gold molecular-square PNG.
 * Source: public/brand/logo.png (do not replace with a recreation).
 */

export function MoleculeMark({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image src="/brand/logo.png" alt="Jaydev" fill sizes="48px" className="object-contain" priority />
    </span>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <MoleculeMark className="w-11 h-11 flex-shrink-0 transition-transform group-hover:scale-105" />
      <div className="leading-none">
        <div className={`font-jakarta font-extrabold text-lg tracking-tight ${dark ? 'text-white' : 'text-navy'}`}>
          JAYDEV
        </div>
        <div className="font-jakarta text-[10px] font-semibold tracking-[0.22em] text-gold uppercase mt-0.5">
          Multicomm
        </div>
      </div>
    </Link>
  );
}
