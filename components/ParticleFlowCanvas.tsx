'use client';

import { useEffect, useRef } from 'react';

class SimplexNoise {
  p: Uint8Array;
  perm: Uint8Array;
  permMod12: Uint8Array;
  grad3: number[][];
  F2: number;
  G2: number;

  constructor(seed = Math.random()) {
    this.p = new Uint8Array(256);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);

    for (let i = 0; i < 256; i++) this.p[i] = i;

    let s = seed * 1000;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      const j = s % (i + 1);
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }

    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }

    this.grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ];

    this.F2 = 0.5 * (Math.sqrt(3) - 1);
    this.G2 = (3 - Math.sqrt(3)) / 6;
  }

  noise2D(x: number, y: number): number {
    const F2 = this.F2, G2 = this.G2;
    const s = (x + y) * F2;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const t = (i + j) * G2;
    const X0 = i - t, Y0 = j - t;
    const x0 = x - X0, y0 = y - Y0;

    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;

    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;

    const ii = i & 255, jj = j & 255;

    const gi0 = this.permMod12[ii + this.perm[jj]];
    const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]];
    const gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]];

    let n0 = 0, n1 = 0, n2 = 0;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * (this.grad3[gi0][0] * x0 + this.grad3[gi0][1] * y0); }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * (this.grad3[gi1][0] * x1 + this.grad3[gi1][1] * y1); }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * (this.grad3[gi2][0] * x2 + this.grad3[gi2][1] * y2); }

    return 70 * (n0 + n1 + n2);
  }

  fbm(x: number, y: number, octaves: number): number {
    let value = 0, amplitude = 1, frequency = 1, maxValue = 0;
    for (let i = 0; i < octaves; i++) {
      value += amplitude * this.noise2D(x * frequency, y * frequency);
      maxValue += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }
    return value / maxValue;
  }
}

interface Preset {
  name: string;
  baseAngle: number;
  noiseInfluence: number;
}

interface ParticleFlowCanvasProps {
  className?: string;
}

export default function ParticleFlowCanvas({ className = '' }: ParticleFlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Non-null assertion for canvas and ctx within useEffect
    const canvasEl = canvas;
    const ctxEl = ctx;

    const params = {
      particleCount: 600,
      particleSize: 1,
      trailLength: 13,
      breathSpeed: 1.2,
      breathRange: 0.3,
      octaves: 2,
      speed: 1.5,
    };

    let particles: { x: number; y: number; life: number }[] = [];
    let noise = new SimplexNoise();
    let time = 0;
    let breathPhase = 0;
    let baseBrightness = 0.6;

    let currentPreset = 0;
    const presetDuration = 3000;
    let lastPresetSwitch = 0;

    const presets: Preset[] = [
      { name: 'CASCADE', baseAngle: Math.PI / 2, noiseInfluence: 0.3 },
      { name: 'LINEAR WAVE', baseAngle: Math.PI / 2, noiseInfluence: 0.5 },
      { name: 'GRID DRIFT', baseAngle: Math.PI / 4, noiseInfluence: 0.4 },
    ];

    let w = 0;
    let h = 0;

    function resize() {
      const rect = canvasEl.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasEl.width = rect.width * dpr;
      canvasEl.height = rect.height * dpr;
      ctxEl.scale(dpr, dpr);
      w = rect.width;
      h = rect.height;
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < params.particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          life: Math.random() * 100,
        });
      }
    }

    function switchPreset() {
      currentPreset = (currentPreset + 1) % presets.length;
      noise = new SimplexNoise();
      // INSTANT REFRESH: respawn all particles
      for (const p of particles) {
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        p.life = 0;
      }
    }

    function getColor(alpha: number): string {
      return `rgba(255,255,255,${alpha * baseBrightness})`;
    }

    function update(deltaTime: number) {
      // Breathing
      breathPhase += 0.02 * params.breathSpeed;
      const breathValue = Math.sin(breathPhase);
      baseBrightness = 0.5 + breathValue * params.breathRange;

      // Preset timer
      lastPresetSwitch += deltaTime;
      if (lastPresetSwitch >= presetDuration) {
        lastPresetSwitch = 0;
        switchPreset();
      }

      // Trail
      const trailAlpha = 1 / params.trailLength;
      ctxEl.fillStyle = `rgba(0,0,0,${trailAlpha})`;
      ctxEl.fillRect(0, 0, w, h);

      time += 0.005 * params.speed;

      const preset = presets[currentPreset];

      for (const p of particles) {
        const noiseVal = noise.noise2D(
          p.x * 0.003 + time * 0.5,
          p.y * 0.003 + time * 0.3
        );

        let angle = preset.baseAngle;
        angle += (noiseVal - 0.5) * preset.noiseInfluence * Math.PI;

        // LINEAR WAVE effect
        if (preset.name === 'LINEAR WAVE') {
          const waveOffset = Math.sin(p.y * 0.008 + time * 2) * 0.4;
          angle += waveOffset;
        }

        // GRID DRIFT effect
        if (preset.name === 'GRID DRIFT') {
          const gridSize = 100;
          const gridX = Math.floor(p.x / gridSize);
          const gridY = Math.floor(p.y / gridSize);
          const gridNoise = noise.noise2D(gridX * 0.1 + time, gridY * 0.1);
          angle += gridNoise * 0.3;
        }

        const mag = 2.0 * params.speed;
        p.x += Math.cos(angle) * mag;
        p.y += Math.sin(angle) * mag;
        p.life++;

        // Wrap around
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const alpha = Math.min(p.life / 20, 1) * 0.6;
        ctxEl.beginPath();
        ctxEl.arc(p.x, p.y, params.particleSize, 0, Math.PI * 2);
        ctxEl.fillStyle = getColor(alpha);
        ctxEl.fill();
      }
    }

    function animate(currentTime: number) {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      update(deltaTime);
      requestAnimationFrame(animate);
    }

    resize();
    initParticles();

    let lastTime = performance.now();
    requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ background: '#000' }}
    />
  );
}