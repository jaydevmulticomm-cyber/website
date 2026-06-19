'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs } from '@/lib/faqs';
import { Icon } from './Icon';

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`card-white overflow-hidden ${isOpen ? 'border-gold/30' : ''}`}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-jakarta font-bold text-navy">{f.q}</span>
              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-gold text-white rotate-45' : 'bg-navy-pale text-navy'}`}>
                <Icon name="ChevronRight" className="w-4 h-4 -rotate-45" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
