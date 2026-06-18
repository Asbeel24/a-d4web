'use client';

import { useEffect, useRef } from 'react';

type PointerState = {
  x: number;
  y: number;
  active: number;
};

function distanceToPointer(x: number, y: number, pointer: PointerState) {
  const dx = x - pointer.x;
  const dy = y - pointer.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export default function DigitalSignalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer: PointerState = { x: 0, y: 0, active: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointer.x = width * 0.62;
      pointer.y = height * 0.48;
    };

    const drawGrid = (time: number) => {
      const spacing = width < 720 ? 34 : 28;
      const dotSize = width < 720 ? 0.75 : 0.9;

      for (let y = spacing; y < height; y += spacing) {
        for (let x = spacing; x < width; x += spacing) {
          const dist = distanceToPointer(x, y, pointer);
          const pulse = Math.sin(x * 0.015 + y * 0.012 + time * 0.0014);
          const cursorLift = Math.max(0, 1 - dist / 220) * pointer.active;
          const alpha = 0.065 + pulse * 0.026 + cursorLift * 0.18;

          ctx.fillStyle = `rgba(255,255,255,${Math.max(0, alpha)})`;
          ctx.fillRect(x, y, dotSize + cursorLift * 1.4, dotSize + cursorLift * 1.4);
        }
      }
    };

    const drawWaves = (time: number) => {
      const bands = width < 720 ? 4 : 6;
      const amplitude = width < 720 ? 16 : 26;

      for (let band = 0; band < bands; band++) {
        const baseY = height * (0.2 + band * 0.12);
        const phase = time * (0.00055 + band * 0.00004) + band * 1.7;

        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += 10) {
          const dist = Math.abs(x - pointer.x);
          const influence = Math.max(0, 1 - dist / 260) * pointer.active * 18;
          const y =
            baseY +
            Math.sin(x * 0.012 + phase) * amplitude +
            Math.sin(x * 0.034 - phase * 1.35) * 7 +
            influence * Math.sin(phase + band);

          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(255,255,255,${0.052 + band * 0.015})`;
        ctx.lineWidth = band === 1 ? 1.25 : 0.75;
        ctx.stroke();
      }
    };

    const drawNodes = (time: number) => {
      const count = width < 720 ? 11 : 18;
      const points: { x: number; y: number }[] = [];

      for (let i = 0; i < count; i++) {
        const progress = i / Math.max(1, count - 1);
        const x = width * (0.08 + progress * 0.84);
        const y =
          height * (0.72 - progress * 0.34) +
          Math.sin(time * 0.00045 + i * 1.23) * 34;
        points.push({ x, y });
      }

      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        const dist = distanceToPointer(a.x, a.y, pointer);
        const alpha = 0.06 + Math.max(0, 1 - dist / 240) * pointer.active * 0.18;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(230,74,25,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (const point of points) {
        const dist = distanceToPointer(point.x, point.y, pointer);
        const lift = Math.max(0, 1 - dist / 180) * pointer.active;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.2 + lift * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.18 + lift * 0.26})`;
        ctx.fill();
      }
    };

    const drawSpectrum = (time: number) => {
      const bars = width < 720 ? 18 : 30;
      const baseX = width * 0.68;
      const maxHeight = height * 0.22;

      for (let i = 0; i < bars; i++) {
        const x = baseX + i * 9;
        if (x > width - 26) break;

        const value = 0.35 + Math.abs(Math.sin(time * 0.0011 + i * 0.72)) * 0.65;
        const barHeight = maxHeight * value;
        const y = height * 0.58 - barHeight * 0.5;
        ctx.fillStyle = `rgba(255,255,255,${0.055 + value * 0.085})`;
        ctx.fillRect(x, y, 1, barHeight);
      }
    };

    const drawVignette = () => {
      const glow = ctx.createRadialGradient(
        width * 0.68,
        height * 0.42,
        0,
        width * 0.68,
        height * 0.42,
        width * 0.62
      );
      glow.addColorStop(0, 'rgba(255,255,255,0.12)');
      glow.addColorStop(0.34, 'rgba(230,74,25,0.052)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      drawVignette();
      drawGrid(time);
      drawWaves(time);
      drawNodes(time);
      drawSpectrum(time);
    };

    const animate = (time: number) => {
      frame += 1;
      pointer.active *= 0.94;
      render(time);

      if (!reducedMotion.matches || frame < 2) {
        raf = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = 1;
    };

    resize();
    render(0);
    raf = window.requestAnimationFrame(animate);

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
