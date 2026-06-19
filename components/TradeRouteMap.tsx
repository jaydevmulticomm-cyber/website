'use client';

import { useEffect, useRef } from 'react';

// Region-cropped projection bounds (India ↔ Africa ↔ GCC ↔ SE Asia)
const LON_MIN = -22, LON_MAX = 120, LAT_MIN = -40, LAT_MAX = 44;

const ORIGIN = { lon: 72.8, lat: 21.2, label: 'Rajkot, India' };

type Dest = { lon: number; lat: number; label: string; anchor: 'left' | 'right'; dy: number };
const DESTINATIONS: Dest[] = [
  { lon: 55.3, lat: 25.2, label: 'Dubai',         anchor: 'right', dy: -4 },
  { lon: 46.7, lat: 24.7, label: 'Riyadh',        anchor: 'left',  dy: -4 },
  { lon: 36.8, lat: -1.3, label: 'Nairobi',       anchor: 'right', dy: 0 },
  { lon: 39.2, lat: -6.8, label: 'Dar es Salaam', anchor: 'right', dy: 3 },
  { lon: 28.3, lat: -15.4, label: 'Lusaka',       anchor: 'left',  dy: 0 },
  { lon: 3.4,  lat: 6.5,  label: 'Lagos',         anchor: 'left',  dy: -4 },
  { lon: -0.2, lat: 5.6,  label: 'Accra',         anchor: 'left',  dy: 10 },
  { lon: 101.7, lat: 3.1, label: 'Kuala Lumpur',  anchor: 'right', dy: 3 },
  { lon: 106.7, lat: 10.8, label: 'Ho Chi Minh',  anchor: 'right', dy: -4 },
  { lon: 106.8, lat: -6.2, label: 'Jakarta',      anchor: 'right', dy: 0 },
];

export default function TradeRouteMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bordersRef = useRef<number[][][] | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    const PAD = 54;

    fetch('/world-countries.json').then(r => r.json()).then(d => { bordersRef.current = d; }).catch(() => {});

    const proj = (lon: number, lat: number): [number, number] => [
      PAD + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (w - 2 * PAD),
      PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (h - 2 * PAD),
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const glowDot = (x: number, y: number, radius: number, core: string, glow: string, breathe: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius * (2.6 + breathe));
      g.addColorStop(0, glow);
      g.addColorStop(0.35, glow.replace(/[\d.]+\)$/, '0.18)'));
      g.addColorStop(1, 'rgba(232,184,75,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius * (2.6 + breathe), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      // ── country borders (outline only) ──
      const borders = bordersRef.current;
      if (borders) {
        ctx.lineJoin = 'round';
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = 'rgba(255,255,255,0.14)';
        ctx.fillStyle = 'rgba(255,255,255,0.025)';
        for (const ring of borders) {
          ctx.beginPath();
          for (let k = 0; k < ring.length; k++) {
            const [sx, sy] = proj(ring[k][0], ring[k][1]);
            k === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }

      // ── destination dots (glowing, translucent) ──
      DESTINATIONS.forEach((d, i) => {
        const [x, y] = proj(d.lon, d.lat);
        const breathe = 0.4 + 0.4 * Math.sin(now / 900 + i * 0.7);
        glowDot(x, y, 3.4, 'rgba(248,214,128,0.95)', `rgba(232,184,75,0.5)`, breathe);
        ctx.font = '600 11px Inter, system-ui, sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.textAlign = d.anchor === 'right' ? 'left' : 'right';
        ctx.fillText(d.label, x + (d.anchor === 'right' ? 11 : -11), y + 4 + d.dy);
      });

      // ── origin (Rajkot) - bright pulsing hub ──
      const [ix, iy] = proj(ORIGIN.lon, ORIGIN.lat);
      const pulse = 0.5 + 0.5 * Math.sin(now / 700);
      glowDot(ix, iy, 5.5, 'rgba(255,243,190,1)', 'rgba(201,146,42,0.6)', 1.2 + pulse);
      // outer ring
      ctx.strokeStyle = `rgba(232,184,75,${0.5 - pulse * 0.3})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ix, iy, 12 + pulse * 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.textAlign = 'left';
      ctx.font = '700 12px Inter, system-ui, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.fillText(ORIGIN.label, ix + 15, iy - 9);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full block"
      style={{ height: 'clamp(320px, 42vw, 460px)' }}
    />
  );
}
