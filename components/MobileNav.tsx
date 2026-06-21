'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';

/**
 * Floating glass nav tray for mobile/tablet - Apple "Liquid Glass" style.
 * Surfaces the primary nav at the bottom of the screen instead of hiding it
 * behind the hamburger. Hidden on lg+ (desktop uses the header nav).
 */
const ITEMS = [
  { href: '/', label: 'Home', icon: 'Home' },
  { href: '/about', label: 'Group', icon: 'Building2' },
  { href: '/products', label: 'Products', icon: 'FlaskConical' },
  { href: '/industries', label: 'Sectors', icon: 'Factory' },
  { href: '/markets', label: 'Markets', icon: 'Globe' },
  { href: '/quote', label: 'Quote', icon: 'MessageCircle', cta: true },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-1rem)] max-w-md pointer-events-none">
      <div className="pointer-events-auto flex items-stretch justify-around gap-0.5 p-1.5 rounded-[1.7rem] bg-white/70 backdrop-blur-2xl border border-white/70 shadow-[0_12px_40px_-6px_rgba(14,32,64,0.4)]">
        {ITEMS.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-2xl transition-colors ${
                item.cta
                  ? 'bg-gold text-white shadow-sm'
                  : active
                    ? 'bg-navy/[0.07] text-navy'
                    : 'text-gray-500 active:bg-navy/5'
              }`}
            >
              <Icon name={item.icon} className="w-[18px] h-[18px]" strokeWidth={active || item.cta ? 2.2 : 1.8} />
              <span className="text-[9px] font-semibold leading-none tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
