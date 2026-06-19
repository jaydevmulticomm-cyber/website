'use client';

import { motion } from 'framer-motion';
import { Icon } from './Icon';

const steps = [
  { icon: 'Handshake', title: 'Enquiry & RFQ', desc: 'Share product, grade, quantity, and destination port. We confirm availability with the manufacturer.' },
  { icon: 'BadgeCheck', title: 'Manufacturer Sourcing', desc: 'Direct allocation from GACL, Grasim, Reliance & partner plants - verified COA and grade.' },
  { icon: 'ShieldCheck', title: 'Quality & Documentation', desc: 'Batch COA, MSDS, COO, IMDG declarations and packing list prepared for clearance.' },
  { icon: 'Container', title: 'Packing & Stuffing', desc: 'HDPE bags, drums, jumbo bags, ISO tanks or flexitanks - IMDG-compliant for safe transit.' },
  { icon: 'Ship', title: 'Export & Delivery', desc: 'FOB/CIF shipment from Mundra/JNPT with live tracking to your port - 7–25 days.' },
];

export default function ProcessFlow() {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="hidden lg:block absolute top-[38px] left-0 right-0 h-[2px] mx-[10%]">
        <div className="relative w-full h-full bg-navy-light rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-light"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            className="relative flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.18, duration: 0.5 }}
          >
            <div className="relative z-10 w-[76px] h-[76px] rounded-2xl bg-white border-2 border-gold/30 shadow-card flex items-center justify-center mb-4">
              <Icon name={step.icon} className="w-8 h-8 text-gold" strokeWidth={1.6} />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center font-jakarta">
                {i + 1}
              </span>
            </div>
            <h3 className="font-jakarta font-bold text-navy text-sm mb-1.5">{step.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
