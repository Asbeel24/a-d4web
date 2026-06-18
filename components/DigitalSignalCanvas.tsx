'use client';

import { useEffect, useRef } from 'react';

type SignalNode = {
  baseX: number;
  baseY: number;
  phase: number;
  row: number;
  col: number;
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  active: number;
  lastMove: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function distance(x1: number, y1: number, x2: number, y2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
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
    const pointer: PointerState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: 0.45,
      lastMove: 0,
    };

    let width = 0;
    let height = 0;
    let raf = 0;
    let nodes: SignalNode[] = [];
    let rows = 0;
    let cols = 0;

    const buildNodes = () => {
      nodes = [];
      cols = width < 720 ? 6 : 9;
      rows = width < 720 ? 7 : 8;

      const left = width < 720 ? width * 0.1 : width * 0.47;
      const right = width * 0.94;
      const top = height * (width < 720 ? 0.2 : 0.16);
      const bottom = height * (width < 720 ? 0.76 : 0.82);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const xProgress = col / Math.max(1, cols - 1);
          const yProgress = row / Math.max(1, rows - 1);
          const stagger = row % 2 === 0 ? 0 : (right - left) / cols * 0.22;

          nodes.push({
            baseX: left + xProgress * (right - left) + stagger,
            baseY: top + yProgress * (bottom - top),
            phase: row * 0.84 + col * 0.61,
            row,
            col,
          });
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointer.x = width * (width < 720 ? 0.7 : 0.74);
      pointer.y = height * 0.48;
      pointer.targetX = pointer.x;
      pointer.targetY = pointer.y;
      buildNodes();
    };

    const nodePosition = (node: SignalNode, time: number) => {
      const t = time * 0.001;
      const driftX = Math.sin(t * 0.62 + node.phase) * 9;
      const driftY = Math.cos(t * 0.48 + node.phase * 1.4) * 7;
      const baseX = node.baseX + driftX;
      const baseY = node.baseY + driftY;
      const dist = distance(baseX, baseY, pointer.x, pointer.y);
      const influence = clamp(1 - dist / (width < 720 ? 190 : 260), 0, 1) * pointer.active;
      const pull = width < 720 ? 22 : 34;
      const angle = Math.atan2(pointer.y - baseY, pointer.x - baseX);

      return {
        x: baseX + Math.cos(angle) * influence * pull,
        y: baseY + Math.sin(angle) * influence * pull,
        influence,
      };
    };

    const drawBaseGrid = (time: number) => {
      const cell = width < 720 ? 34 : 38;
      const offset = (time * 0.012) % cell;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.045)';

      for (let x = -cell + offset; x < width + cell; x += cell) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -cell + offset; y < height + cell; y += cell) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawWaveLanes = (time: number) => {
      const lanes = width < 720 ? 4 : 6;

      for (let lane = 0; lane < lanes; lane++) {
        const laneY = height * (0.18 + lane * 0.12);
        const phase = time * 0.001 + lane * 1.35;
        const lineAlpha = 0.1 + lane * 0.018;

        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += 8) {
          const near = clamp(1 - Math.abs(x - pointer.x) / 250, 0, 1) * pointer.active;
          const y =
            laneY +
            Math.sin(x * 0.012 + phase) * (20 + near * 18) +
            Math.sin(x * 0.031 - phase * 1.2) * 8;

          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(255,255,255,${lineAlpha})`;
        ctx.lineWidth = lane === 2 ? 1.4 : 0.9;
        ctx.stroke();
      }
    };

    const drawSignalMesh = (time: number) => {
      const positioned = nodes.map((node) => ({ node, ...nodePosition(node, time) }));

      for (let i = 0; i < positioned.length; i++) {
        const current = positioned[i];
        const neighbors = positioned.filter((candidate) => {
          const rowDelta = Math.abs(candidate.node.row - current.node.row);
          const colDelta = Math.abs(candidate.node.col - current.node.col);
          return rowDelta + colDelta === 1;
        });

        for (const next of neighbors) {
          if (next.node.row < current.node.row || next.node.col < current.node.col) continue;

          const linkInfluence = Math.max(current.influence, next.influence);
          const alpha = 0.11 + linkInfluence * 0.35;
          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.85 + linkInfluence * 1.1;
          ctx.stroke();
        }
      }

      for (const point of positioned) {
        const size = 2.4 + point.influence * 5.4;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.42 + point.influence * 0.42})`;
        ctx.fill();

        if (point.influence > 0.12) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, size * 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(230,74,25,${0.08 + point.influence * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    const drawPointerField = (time: number) => {
      const pulse = 1 + Math.sin(time * 0.004) * 0.12;
      const radius = (width < 720 ? 78 : 112) * pulse * (0.65 + pointer.active * 0.55);

      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(230,74,25,${0.18 + pointer.active * 0.18})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, radius * 0.48, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.12 + pointer.active * 0.2})`;
      ctx.lineWidth = 0.9;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pointer.x - radius * 0.72, pointer.y);
      ctx.lineTo(pointer.x + radius * 0.72, pointer.y);
      ctx.moveTo(pointer.x, pointer.y - radius * 0.72);
      ctx.lineTo(pointer.x, pointer.y + radius * 0.72);
      ctx.strokeStyle = `rgba(255,255,255,${0.08 + pointer.active * 0.16})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const drawSpectrum = (time: number) => {
      const bars = width < 720 ? 18 : 34;
      const xStart = width < 720 ? width * 0.58 : width * 0.7;
      const baseline = height * (width < 720 ? 0.67 : 0.62);
      const spacing = width < 720 ? 7 : 8;
      const maxHeight = height * (width < 720 ? 0.18 : 0.24);

      for (let i = 0; i < bars; i++) {
        const x = xStart + i * spacing;
        if (x > width - 16) break;

        const proximity = clamp(1 - Math.abs(x - pointer.x) / 220, 0, 1);
        const rhythm = Math.abs(Math.sin(time * 0.0021 + i * 0.47));
        const heightValue = maxHeight * (0.18 + rhythm * 0.56 + proximity * pointer.active * 0.44);
        const alpha = 0.16 + rhythm * 0.18 + proximity * pointer.active * 0.28;

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillRect(x, baseline - heightValue, 2, heightValue);
      }
    };

    const drawAmberTrace = (time: number) => {
      const originX = width < 720 ? width * 0.12 : width * 0.42;
      const endX = width * 0.95;
      const y = height * (width < 720 ? 0.44 : 0.5);

      ctx.beginPath();
      for (let x = originX; x <= endX; x += 9) {
        const progress = (x - originX) / (endX - originX);
        const pointerLift = clamp(1 - distance(x, y, pointer.x, pointer.y) / 260, 0, 1) * pointer.active;
        const wave =
          y +
          Math.sin(progress * Math.PI * 5 + time * 0.0018) * (28 + pointerLift * 28) +
          Math.sin(progress * Math.PI * 13 - time * 0.0012) * 7;

        if (x === originX) ctx.moveTo(x, wave);
        else ctx.lineTo(x, wave);
      }

      ctx.strokeStyle = `rgba(230,74,25,${0.22 + pointer.active * 0.08})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    };

    const drawVignette = () => {
      const glow = ctx.createRadialGradient(
        width * 0.72,
        height * 0.48,
        0,
        width * 0.72,
        height * 0.48,
        width * 0.72
      );
      glow.addColorStop(0, 'rgba(255,255,255,0.16)');
      glow.addColorStop(0.22, 'rgba(230,74,25,0.1)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      drawVignette();
      drawBaseGrid(time);
      drawWaveLanes(time);
      drawAmberTrace(time);
      drawSignalMesh(time);
      drawSpectrum(time);
      drawPointerField(time);
    };

    const animate = (time: number) => {
      const idle = time - pointer.lastMove > 1800;
      if (idle) {
        pointer.targetX = width * (width < 720 ? 0.68 : 0.76) + Math.sin(time * 0.0007) * width * 0.1;
        pointer.targetY = height * 0.48 + Math.cos(time * 0.0009) * height * 0.18;
        pointer.active = Math.max(pointer.active, 0.48);
      } else {
        pointer.active = Math.min(1, pointer.active + 0.08);
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;
      pointer.active *= idle ? 0.998 : 0.985;

      render(time);

      if (!reducedMotion.matches) {
        raf = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.active = 1;
      pointer.lastMove = performance.now();
    };

    resize();
    render(0);

    if (!reducedMotion.matches) {
      raf = window.requestAnimationFrame(animate);
    }

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
