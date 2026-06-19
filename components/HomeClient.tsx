'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import StatCounter from './StatCounter';
import ProcessFlow from './ProcessFlow';
import { Icon } from './Icon';
import { products, industryData, productImage, INDUSTRY_IMAGE_MAP, BUSINESS_UNITS, GROUP, BRANCHES, COMPANY } from '@/lib/content';

const HeroVisual = dynamic(() => import('./HeroVisual'), { ssr: false });
const TradeRouteMap = dynamic(() => import('./TradeRouteMap'), { ssr: false });

const featuredProducts = products.filter(p => p.featured).slice(0, 6);

const WaIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49" />
  </svg>
);

const pillars = [
  { icon: 'Factory', title: 'Manufacturer Direct', desc: 'Authorized partner of GACL & Grasim - no intermediaries, best factory price every time.' },
  { icon: 'FileText', title: 'Full Export Documentation', desc: 'COA, MSDS, BL, COO, Packing List, IMDG declarations - all standard, zero hassle.' },
  { icon: 'Clock', title: '24-Hour CIF Quote', desc: 'Submit an RFQ and receive a detailed CIF quote within 24 hours, guaranteed.' },
  { icon: 'Globe', title: 'Global Reach', desc: 'Regular LCL/FCL shipments to East Africa, GCC, and Southeast Asia.' },
  { icon: 'ShieldCheck', title: 'Tested Quality', desc: 'Every batch ships with manufacturer COA. Quality documentation never compromised.' },
  { icon: 'Headset', title: 'Dedicated Support', desc: 'Direct WhatsApp to your account manager - responsive, personal, always reachable.' },
];

const leadTimes = [
  { region: 'GCC & Middle East', time: '7–12 days', ports: 'Jebel Ali, Ras Tanura' },
  { region: 'East Africa', time: '15–20 days', ports: 'Mombasa, Dar es Salaam' },
  { region: 'Southeast Asia', time: '12–18 days', ports: 'Port Klang, HCMC' },
  { region: 'West Africa', time: '18–25 days', ports: 'Lagos, Tema' },
];

const categoryColors: Record<string, string> = {
  'chlor-alkali': 'bg-blue-50 text-blue-700 border-blue-200',
  'acids': 'bg-red-50 text-red-700 border-red-200',
  'water-treatment': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'specialty': 'bg-purple-50 text-purple-700 border-purple-200',
  'solvents': 'bg-orange-50 text-orange-700 border-orange-200',
  'inorganic-salts': 'bg-slate-50 text-slate-700 border-slate-200',
  'surfactants':     'bg-pink-50 text-pink-700 border-pink-200',
  'minerals':        'bg-amber-50 text-amber-700 border-amber-200',
  'agro': 'bg-green-50 text-green-700 border-green-200',
};

export default function HomeClient() {
  return (
    <>
      {/* ═══ HERO - designed molecular centerpiece (no stock photo) ═══ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A1730] pt-32 pb-16">
        {/* layered background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(201,146,42,0.24),transparent_46%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_88%,rgba(38,86,160,0.22),transparent_46%)]" />
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1730] via-transparent to-[#0A1730]/40" />

        {/* molecular centerpiece + orbit rings + glass intel cards (desktop) */}
        <div className="absolute inset-y-0 right-[-4%] w-[60%] hidden lg:flex items-center justify-center pointer-events-none">
          <div className="relative w-[700px] h-[700px] max-w-full">
            {/* soft gold halo only — no hard circle outlines */}
            <div className="absolute inset-[14%] rounded-full bg-gold/[0.08] blur-[110px]" />
            <div className="absolute inset-[20%] rounded-full bg-[#2656A0]/[0.10] blur-[100px]" />
            <div className="absolute inset-0"><HeroVisual /></div>
          </div>

          {/* floating glass intel card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute bottom-[20%] right-[20%] animate-jd-float-2"
          >
            <div className="rounded-2xl border border-white/12 bg-white/[0.07] backdrop-blur-md px-4 py-3 shadow-xl pointer-events-auto">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center"><Icon name="BadgeCheck" className="w-5 h-5 text-gold-light" /></div>
                <div>
                  <div className="text-white font-jakarta font-bold text-sm leading-tight">GACL &amp; Grasim</div>
                  <div className="text-white/55 text-[11px]">Authorized partner</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold-light text-[11px] font-semibold tracking-wide uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-light animate-pulse" />
                Connecting Chemistry, Creating Solutions
              </span>
            </motion.div>

            <motion.h1
              className="font-jakarta text-5xl sm:text-6xl lg:text-[5rem] font-extrabold text-white leading-[1.02] mb-6 tracking-[-0.02em]"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            >
              Industrial Chemicals,{' '}
              <span className="text-gradient-gold">Sourced &amp; Shipped</span>{' '}
              to the World
            </motion.h1>

            <motion.p
              className="text-white/65 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            >
              A Rajkot-headquartered chemical group exporting 100+ industrial chemicals to 30+ countries — manufacturer-backed, fully documented, export-ready.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-3.5"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link href="/quote" className="btn-gold px-7 py-3.5 text-base">
                Get CIF Quote
                <Icon name="ArrowRight" className="w-4 h-4" />
              </Link>
              <a href="/Jaydev-Multicomm-Catalogue.pdf" download className="btn-ghost-white px-7 py-3.5 text-base">
                <Icon name="Download" className="w-4 h-4" /> Catalogue
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 pt-7 border-t border-white/10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              {['GACL & Grasim Authorized', 'IEC Registered', '30+ Countries'].map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 text-xs text-white/50">
                  <Icon name="Check" className="w-3.5 h-3.5 text-gold-light" /> {b}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── integrated glass stats bar ── */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-14 lg:mt-20"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.10] grid grid-cols-2 md:grid-cols-4 gap-px">
            {[
              { num: 5000, suffix: '+ MT', label: 'Monthly Capacity' },
              { num: 100, suffix: '+', label: 'Chemicals Supplied' },
              { num: 30, suffix: '+', label: 'Countries Served' },
              { num: 100, suffix: '+', label: 'Global Buyers' },
            ].map((s, i) => (
              <div key={i} className="bg-[#0B1A35]/85 backdrop-blur-md px-6 py-6 text-center">
                <div className="font-jakarta text-3xl sm:text-4xl font-extrabold text-gradient-gold">
                  <StatCounter end={s.num} suffix={s.suffix} />
                </div>
                <div className="text-white/55 text-xs sm:text-sm mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ POSITIONING TAGLINE STRIP ═══ */}
      <section className="bg-white border-b border-[#E5E7EB] py-7">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-navy-mid text-sm sm:text-base leading-relaxed">
            <span className="text-gold-dark font-bold">Your Single-Source Supply Partner</span>
            {' '}for Industrial Chemicals, Minerals, Solvents, Acids, Alkalis, Water Treatment Chemicals &amp; Specialty Raw Materials
          </p>
        </div>
      </section>

      {/* ═══ SOURCING ECOSYSTEM ═══ */}
      <section className="py-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-label mb-3">Our Sourcing Ecosystem</span>
            <h2 className="font-jakarta text-3xl font-extrabold text-navy mb-3">Backed by India&apos;s Leading Producers</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Direct relationships with the manufacturers behind India&apos;s chemical industry - for authentic grades, traceable quality, and the best factory pricing.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {COMPANY.manufacturers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.05 }}
                className={`relative rounded-xl border p-5 flex flex-col items-center justify-center text-center min-h-[96px] ${
                  m.badge ? 'bg-gold-bg border-gold/30' : 'bg-[#F8FAFC] border-[#E5E7EB]'
                }`}
              >
                <span className={`font-jakarta font-extrabold text-base leading-tight ${m.badge ? 'text-gold-dark' : 'text-navy'}`}>{m.name}</span>
                {m.badge && (
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-gold">
                    <Icon name="BadgeCheck" className="w-3 h-3" /> Authorized
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BUSINESS UNITS ═══ */}
      <section className="py-20 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label mb-3">The Group</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy mb-3">Two Arms, One Standard</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{GROUP.description}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {BUSINESS_UNITS.map((bu, i) => (
              <motion.div
                key={bu.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="card-white p-8 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center">
                    <Icon name={bu.icon} className="w-7 h-7 text-gold-light" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-gold">{bu.scope}</div>
                    <h3 className="font-jakarta font-extrabold text-navy text-xl">{bu.name}</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-5 flex-1">{bu.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {bu.highlights.map(h => (
                    <span key={h} className="inline-flex items-center gap-1.5 text-sm text-navy-mid">
                      <Icon name="Check" className="w-4 h-4 text-gold flex-shrink-0" /> {h}
                    </span>
                  ))}
                </div>
                <Link href="/products" className="inline-flex items-center gap-1.5 text-gold-dark font-semibold text-sm hover:gap-2.5 transition-all">
                  Explore {bu.scope} <Icon name="ChevronRight" className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS FLOW ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="section-label mb-3">How We Work</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy mb-3">From Enquiry to Your Port</h2>
            <p className="text-gray-500 max-w-xl mx-auto">A transparent, documented journey for every shipment - five steps, zero surprises.</p>
          </div>
          <ProcessFlow />
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label mb-3">Industries</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-white mb-3">Solutions for Every Sector</h2>
            <p className="text-white/60 max-w-xl mx-auto">Chemicals mapped to {industryData.length} industries - from water treatment and mining to coatings, care, and pharma</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industryData.map((ind, i) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.06 }}
              >
                <Link
                  href={`/industries/${ind.id}`}
                  className="group relative block rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden hover:border-gold/40 hover:bg-white/[0.08] transition-all h-full"
                >
                  {INDUSTRY_IMAGE_MAP[ind.id] && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500">
                      <Image src={INDUSTRY_IMAGE_MAP[ind.id]} alt={ind.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center mb-3 group-hover:bg-gold/25 transition-colors">
                      <Icon name={ind.icon} className="w-6 h-6 text-gold-light" strokeWidth={1.6} />
                    </div>
                    <h3 className="font-jakarta font-bold text-white text-sm mb-1 group-hover:text-gold-light transition-colors">{ind.name}</h3>
                    <p className="text-white/40 text-xs">{ind.productIds.length} core products</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/industries" className="btn-gold px-8 py-3">View All Industries <Icon name="ArrowRight" className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label mb-3">Our Products</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy mb-3">Featured Chemicals</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Most-exported chemicals with full manufacturer traceability and competitive CIF pricing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product, i) => {
              const img = productImage(product);
              const catColor = categoryColors[product.category] ?? 'bg-gray-50 text-gray-700 border-gray-200';
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="product-card flex flex-col group"
                >
                  <div className="relative h-44 bg-navy-pale overflow-hidden">
                    {img ? (
                      <Image src={img} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Icon name="FlaskConical" className="w-12 h-12 text-navy-light" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium capitalize ${catColor}`}>
                        {product.category.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-jakarta font-bold text-navy text-base leading-snug">{product.name}</h3>
                      <span className="text-[10px] text-gray-400 font-mono flex-shrink-0 mt-0.5">CAS {product.cas}</span>
                    </div>
                    <p className="text-gold text-xs font-semibold mb-2">{product.grade}</p>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex gap-2 mt-auto">
                      <Link href={`/products/${product.id}`} className="flex-1 text-center px-3 py-2 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy-mid transition-all">
                        Specifications
                      </Link>
                      <Link href={`/quote?product=${product.id}`} className="flex-1 text-center px-3 py-2 rounded-lg border border-gold/50 text-gold-dark text-xs font-semibold hover:bg-gold-bg transition-all">
                        Request Quote
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn-navy px-8 py-3">View All Products <Icon name="ArrowRight" className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ═══ GLOBAL REACH ═══ */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-label mb-3">Export Reach</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-white mb-3">Shipping From India to the World</h2>
            <p className="text-white/60">Regular LCL & FCL shipments from Mundra/JNPT to major trade destinations.</p>
          </div>
          <div className="bg-navy-mid/30 rounded-2xl border border-white/10 p-4 md:p-8">
            <TradeRouteMap />
            <div className="section-divider my-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {leadTimes.map(lt => (
                <div key={lt.region} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-jakarta font-extrabold text-gold-light text-xl">{lt.time}</div>
                  <div className="text-white font-semibold text-sm mt-1">{lt.region}</div>
                  <div className="text-white/40 text-xs mt-1">{lt.ports}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label mb-3">Why Us</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy mb-3">Why Global Buyers Choose Jaydev</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="card-white p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-bg flex items-center justify-center mb-4">
                  <Icon name={p.icon} className="w-6 h-6 text-gold-dark" strokeWidth={1.6} />
                </div>
                <h3 className="font-jakarta font-bold text-navy text-lg mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRESENCE / BRANCHES ═══ */}
      <section className="py-16 bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="section-label mb-3">Our Presence</span>
            <h2 className="font-jakarta text-3xl font-extrabold text-navy mb-3">Where We Operate</h2>
            <p className="text-gray-500">Headquartered in Rajkot with branches across India and West Africa.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANCHES.map(b => (
              <div key={b.city} className={`card-white p-5 ${b.hq ? 'border-2 border-gold/40' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="MapPin" className="w-4 h-4 text-gold" />
                  <span className="font-jakarta font-bold text-navy">{b.city}</span>
                  {b.hq && <span className="text-[10px] bg-gold text-white px-2 py-0.5 rounded-full font-semibold">HQ</span>}
                </div>
                <div className="text-gray-400 text-xs mb-1">{b.country}</div>
                <div className="text-navy-mid text-sm">{b.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRADE & PAYMENT TERMS ═══ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="section-label mb-3">Trade Terms</span>
            <h2 className="font-jakarta text-3xl sm:text-4xl font-extrabold text-navy mb-3">Simple, Secure Trade Terms</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Transparent payment, incoterms, and documentation - structured for safe international trade.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Payment terms - featured */}
            <div className="card-white p-7 md:row-span-2 border-2 border-gold/30">
              <div className="w-12 h-12 rounded-xl bg-gold-bg flex items-center justify-center mb-4">
                <Icon name="ShieldCheck" className="w-6 h-6 text-gold-dark" strokeWidth={1.6} />
              </div>
              <h3 className="font-jakarta font-bold text-navy text-lg mb-3">Terms of Payment</h3>
              <div className="space-y-4">
                <div className="rounded-xl bg-navy-pale border border-navy-light p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-dark mb-1">Option A - Letter of Credit</div>
                  <p className="text-navy text-sm leading-relaxed">
                    Irrevocable, Confirmed, Non-Transferable <strong>LC 100% at Sight</strong> via Dubai.
                  </p>
                </div>
                <div className="rounded-xl bg-navy-pale border border-navy-light p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-dark mb-1">Option B - Advance & Balance</div>
                  <p className="text-navy text-sm leading-relaxed">
                    <strong>30% Cash in Advance</strong> and <strong>70% balance</strong> against Custom Clearance Documents.
                  </p>
                </div>
                <p className="text-gray-400 text-xs">Flexible terms available for established buyers - LC, TT, DA/DP.</p>
              </div>
            </div>

            {[
              { icon: 'Ship', title: 'Incoterms', body: 'EXW · FOB · CFR · CIF from Mundra, JNPT, Hazira & Kandla - quoted to your destination port.' },
              { icon: 'FileText', title: 'Full Documentation', body: 'COA, MSDS, Certificate of Origin, Bill of Lading, Packing List, Commercial Invoice & IMDG declarations.' },
              { icon: 'Boxes', title: 'MOQ & Packing', body: 'Typical MOQ from 25 MT. HDPE bags, drums, jumbo bags, ISO tanks & flexitanks - IMDG-compliant.' },
              { icon: 'Clock', title: 'Lead Times', body: 'GCC 7–12 days · East Africa 15–20 · SE Asia 12–18 · West Africa 18–25 days.' },
            ].map((t) => (
              <div key={t.title} className="card-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gold-bg flex items-center justify-center">
                    <Icon name={t.icon} className="w-5 h-5 text-gold-dark" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-jakarta font-bold text-navy">{t.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,146,42,0.12),transparent_55%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <span className="section-label mb-4">Get Started</span>
          <h2 className="font-jakarta text-4xl font-extrabold text-white mb-4">Ready to Source Chemicals?</h2>
          <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">
            Submit your RFQ and receive a detailed CIF quote within 24 hours. All products with full COA &amp; MSDS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="btn-gold px-10 py-4 text-base">Request a Quote <Icon name="ArrowRight" className="w-4 h-4" /></Link>
            <a
              href="https://wa.me/919987539258?text=Hi%2C%20I%20need%20a%20quote%20for%20industrial%20chemicals"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-green-500/15 border border-green-500/35 text-green-300 font-semibold hover:bg-green-500/25 transition-all"
            >
              <WaIcon /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
