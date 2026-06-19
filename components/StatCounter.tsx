'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function StatCounter({ end, suffix = '', prefix = '', duration = 1800 }: Props) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
