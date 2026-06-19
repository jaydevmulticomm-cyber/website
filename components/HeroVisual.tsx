'use client';

import { useEffect, useRef } from 'react';

/**
 * Structured molecular lattice (fused hexagonal rings - graphene / PAH style)
 * rendered in Canvas 2D with perspective rotation, gentle 3D waviness, depth
 * shading and mouse parallax. Reads clearly as a chemical structure.
 * Zero dependencies - cannot throw at runtime.
 */

type V = { x: number; y: number; z: number; hub: boolean };

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let t = 0;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // ── Build a honeycomb (fused hexagonal rings) lattice ──
    const SIZE = 30;          // hex radius
    const R = 2;              // rings of hexagons around centre
    const vmap = new Map<string, V>();
    const edgeSet = new Set<string>();
    const edges: [V, V][] = [];
    const key = (x: number, y: number) => `${Math.round(x)},${Math.round(y)}`;

    const addVertex = (x: number, y: number): V => {
      const k = key(x, y);
      let v = vmap.get(k);
      if (!v) {
        const z = (Math.sin(x * 0.018) + Math.cos(y * 0.02)) * 16; // gentle curvature
        v = { x, y, z, hub: false };
        vmap.set(k, v);
      }
      return v;
    };

    // pointy-top hexagon centres on an axial grid
    for (let q = -R; q <= R; q++) {
      for (let r = -R; r <= R; r++) {
        if (Math.abs(q + r) > R) continue;
        const cx = SIZE * Math.sqrt(3) * (q + r / 2);
        const cy = SIZE * 1.5 * r;
        const verts: V[] = [];
        for (let k = 0; k < 6; k++) {
          const ang = (Math.PI / 180) * (60 * k - 30);
          verts.push(addVertex(cx + SIZE * Math.cos(ang), cy + SIZE * Math.sin(ang)));
        }
        for (let k = 0; k < 6; k++) {
          const a = verts[k], b = verts[(k + 1) % 6];
          const ek = [key(a.x, a.y), key(b.x, b.y)].sort().join('|');
          if (!edgeSet.has(ek)) { edgeSet.add(ek); edges.push([a, b]); }
        }
      }
    }
    const vertices = [...vmap.values()];
    // highlight a few gold "active" atoms
    vertices.forEach((v, i) => { if (i % 7 === 0) v.hub = true; });

    const project = (v: V, ry: number, rx: number, cx: number, cy: number, scale: number) => {
      let x = v.x * Math.cos(ry) - v.z * Math.sin(ry);
      let z = v.x * Math.sin(ry) + v.z * Math.cos(ry);
      let y = v.y * Math.cos(rx) - z * Math.sin(rx);
      z = v.y * Math.sin(rx) + z * Math.cos(rx);
      const persp = 620 / (620 + z);
      return { sx: cx + x * persp * scale, sy: cy + y * persp * scale, depth: persp, z };
    };

    // render a single frame
    const paint = () => {
      if (!w || !h) return;
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.05;

      const scale = Math.min(w, h) / 320;
      const cx = w * 0.5 + mouse.current.x * 24;
      const cy = h * 0.5 + mouse.current.y * 18;
      const ry = t + mouse.current.x * 0.4;
      const rx = -0.5 + mouse.current.y * 0.3;

      ctx.clearRect(0, 0, w, h);

      const P = new Map<V, ReturnType<typeof project>>();
      for (const v of vertices) P.set(v, project(v, ry, rx, cx, cy, scale));

      ctx.lineCap = 'round';
      for (const [a, b] of edges) {
        const pa = P.get(a)!, pb = P.get(b)!;
        const d = (pa.depth + pb.depth) / 2;
        ctx.strokeStyle = `rgba(232,184,75,${0.16 + d * 0.44})`;
        ctx.lineWidth = d * 1.9;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      const order = [...vertices].sort((u, v) => P.get(u)!.z - P.get(v)!.z);
      for (const v of order) {
        const p = P.get(v)!;
        const rad = (v.hub ? 5.2 : 3.4) * p.depth * scale * 0.9;
        const alpha = 0.4 + p.depth * 0.5;
        const g = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, rad * 3.2);
        if (v.hub) {
          g.addColorStop(0, `rgba(245,205,110,${alpha})`);
          g.addColorStop(0.45, `rgba(201,146,42,${alpha * 0.45})`);
        } else {
          g.addColorStop(0, `rgba(150,185,235,${alpha * 0.7})`);
          g.addColorStop(0.45, `rgba(70,120,190,${alpha * 0.3})`);
        }
        g.addColorStop(1, 'rgba(14,32,64,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, rad * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = v.hub ? `rgba(248,214,128,${alpha + 0.18})` : `rgba(190,212,242,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = () => {
      if (!reduce) t += 0.0022;
      paint();
      raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nw = Math.max(1, Math.round(rect.width));
      const nh = Math.max(1, Math.round(rect.height));
      if (nw === w && nh === h) return; // don't clear on redundant observer fires
      w = nw; h = nh;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(); // ensure a frame survives even if rAF is throttled
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.current.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('mousemove', onMove);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}
