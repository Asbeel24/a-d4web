'use client';

import { useEffect, useRef } from 'react';

type SignalNode = {
  x: number;
  y: number;
  row: number;
  col: number;
  seed: number;
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

function hash(row: number, col: number, tick: number) {
  const value = Math.sin(row * 91.7 + col * 37.3 + tick * 12.9) * 10000;
  return value - Math.floor(value);
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
      active: 0.35,
      lastMove: 0,
    };

    let width = 0;
    let height = 0;
    let raf = 0;
    let nodes: SignalNode[] = [];
    let rows = 0;
    let cols = 0;
    let field = { left: 0, right: 0, top: 0, bottom: 0 };

    const buildNodes = () => {
      nodes = [];
      cols = width < 720 ? 7 : 12;
      rows = width < 720 ? 12 : 9;

      field = {
        left: width < 720 ? width * 0.07 : width * 0.49,
        right: width * 0.94,
        top: height * (width < 720 ? 0.18 : 0.15),
        bottom: height * (width < 720 ? 0.78 : 0.82),
      };

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const xProgress = col / Math.max(1, cols - 1);
          const yProgress = row / Math.max(1, rows - 1);

          nodes.push({
            x: field.left + xProgress * (field.right - field.left),
            y: field.top + yProgress * (field.bottom - field.top),
            row,
            col,
            seed: hash(row, col, 0),
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
      pointer.x = width * (width < 720 ? 0.7 : 0.76);
      pointer.y = height * 0.48;
      pointer.targetX = pointer.x;
      pointer.targetY = pointer.y;
      buildNodes();
    };

    const getNode = (row: number, col: number) => nodes.find((node) => node.row === row && node.col === col);

    const nodePosition = (node: SignalNode, time: number) => {
      const tick = Math.floor(time / 700);
      const microShift = reducedMotion.matches ? 0 : (hash(node.row, node.col, tick) - 0.5) * 3;
      const baseX = node.x + microShift;
      const baseY = node.y;
      const dist = distance(baseX, baseY, pointer.x, pointer.y);
      const influence = clamp(1 - dist / (width < 720 ? 170 : 230), 0, 1) * pointer.active;
      const pull = width < 720 ? 12 : 18;
      const angle = Math.atan2(pointer.y - baseY, pointer.x - baseX);

      return {
        x: baseX + Math.cos(angle) * influence * pull,
        y: baseY + Math.sin(angle) * influence * pull,
        influence,
      };
    };

    const drawBaseGrid = (time: number) => {
      const cell = width < 720 ? 32 : 34;
      const shift = reducedMotion.matches ? 0 : (time * 0.006) % cell;

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';

      for (let x = -cell + shift; x < width + cell; x += cell) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -cell + shift; y < height + cell; y += cell) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawDataCells = (time: number) => {
      const tick = Math.floor(time / 160);
      const cellWidth = (field.right - field.left) / Math.max(1, cols - 1);
      const cellHeight = (field.bottom - field.top) / Math.max(1, rows - 1);

      for (let row = 0; row < rows - 1; row++) {
        for (let col = 0; col < cols - 1; col++) {
          const x = field.left + col * cellWidth;
          const y = field.top + row * cellHeight;
          const centerX = x + cellWidth * 0.5;
          const centerY = y + cellHeight * 0.5;
          const near = clamp(1 - distance(centerX, centerY, pointer.x, pointer.y) / 210, 0, 1) * pointer.active;
          const value = hash(row, col, tick);

          if (value > 0.72 || near > 0.08) {
            const alpha = 0.055 + near * 0.18 + (value > 0.88 ? 0.08 : 0);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fillRect(
              x + cellWidth * 0.12,
              y + cellHeight * 0.14,
              Math.max(1, cellWidth * (value > 0.88 ? 0.38 : 0.18)),
              1
            );
          }
        }
      }
    };

    const drawSignalMesh = (time: number) => {
      const positioned = nodes.map((node) => ({ node, ...nodePosition(node, time) }));

      for (const current of positioned) {
        const right = getNode(current.node.row, current.node.col + 1);
        const down = getNode(current.node.row + 1, current.node.col);

        for (const neighbor of [right, down]) {
          if (!neighbor) continue;
          const next = positioned.find((point) => point.node === neighbor);
          if (!next) continue;

          const linkInfluence = Math.max(current.influence, next.influence);
          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.075 + linkInfluence * 0.28})`;
          ctx.lineWidth = 0.7 + linkInfluence * 0.8;
          ctx.stroke();
        }
      }

      for (const point of positioned) {
        const flicker = hash(point.node.row, point.node.col, Math.floor(time / 420));
        const size = 1.45 + point.influence * 3.1 + (flicker > 0.92 ? 0.75 : 0);
        const alpha = 0.32 + point.influence * 0.5 + (flicker > 0.92 ? 0.2 : 0);

        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fillRect(point.x - size * 0.5, point.y - size * 0.5, size, size);
      }
    };

    const drawScanCursor = (time: number) => {
      const tick = Math.floor(time / 260);
      const scanColumn = tick % cols;
      const scanX = field.left + (scanColumn / Math.max(1, cols - 1)) * (field.right - field.left);
      const cursorAlpha = 0.12 + pointer.active * 0.18;

      ctx.strokeStyle = `rgba(255,255,255,${cursorAlpha})`;
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(scanX, field.top);
      ctx.lineTo(scanX, field.bottom);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(pointer.x, field.top);
      ctx.lineTo(pointer.x, field.bottom);
      ctx.moveTo(field.left, pointer.y);
      ctx.lineTo(field.right, pointer.y);
      ctx.strokeStyle = `rgba(255,255,255,${0.07 + pointer.active * 0.16})`;
      ctx.stroke();

      const bracket = width < 720 ? 18 : 24;
      ctx.beginPath();
      ctx.moveTo(pointer.x - bracket, pointer.y - bracket);
      ctx.lineTo(pointer.x - bracket * 0.42, pointer.y - bracket);
      ctx.moveTo(pointer.x - bracket, pointer.y - bracket);
      ctx.lineTo(pointer.x - bracket, pointer.y - bracket * 0.42);
      ctx.moveTo(pointer.x + bracket, pointer.y + bracket);
      ctx.lineTo(pointer.x + bracket * 0.42, pointer.y + bracket);
      ctx.moveTo(pointer.x + bracket, pointer.y + bracket);
      ctx.lineTo(pointer.x + bracket, pointer.y + bracket * 0.42);
      ctx.strokeStyle = `rgba(255,255,255,${0.18 + pointer.active * 0.22})`;
      ctx.stroke();
    };

    const drawQuietField = () => {
      const gradient = ctx.createRadialGradient(
        width * 0.73,
        height * 0.48,
        0,
        width * 0.73,
        height * 0.48,
        width * 0.64
      );
      gradient.addColorStop(0, 'rgba(255,255,255,0.07)');
      gradient.addColorStop(0.42, 'rgba(255,255,255,0.025)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      drawQuietField();
      drawBaseGrid(time);
      drawDataCells(time);
      drawSignalMesh(time);
      drawScanCursor(time);
    };

    const animate = (time: number) => {
      const idle = time - pointer.lastMove > 1800;

      if (idle) {
        pointer.targetX = width * (width < 720 ? 0.68 : 0.78);
        pointer.targetY = height * (0.42 + Math.sin(time * 0.00045) * 0.12);
        pointer.active = Math.max(pointer.active, 0.38);
      } else {
        pointer.active = Math.min(1, pointer.active + 0.08);
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.14;
      pointer.y += (pointer.targetY - pointer.y) * 0.14;
      pointer.active *= idle ? 0.996 : 0.986;

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
