'use client';

import { useEffect, useRef } from 'react';

export default function ParticleWaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    // 动态导入 Three.js
    Promise.all([
      import('three'),
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/ShaderPass.js'),
    ]).then(([THREE, { EffectComposer }, { RenderPass }, { ShaderPass }]) => {
              // 简化的柏林噪声实现
              class SimplexNoise {
                private grad3 = [
                  [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
                  [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
                  [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
                ];
                private p: number[] = [];
                private perm: number[] = [];

                constructor() {
                  const permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
                    140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148,
                    247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32,
                    57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175,
                    74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122,
                    60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54,
                    65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169,
                    200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64,
                    52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
                    207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213,
                    119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
                    129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104,
                    218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
                    81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
                    184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
                    222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];

                  for (let i = 0; i < 256; i++) {
                    this.p[256 + i] = this.p[i] = permutation[i];
                  }

                  for (let i = 0; i < 512; i++) {
                    this.perm[i] = this.p[i] % 12;
                  }
                }

                private dot(g: number[], x: number, y: number, z: number): number {
                  return g[0] * x + g[1] * y + g[2] * z;
                }

                noise(xin: number, yin: number, zin: number): number {
                  const F3 = 1.0 / 3.0;
                  const G3 = 1.0 / 6.0;

                  const s = (xin + yin + zin) * F3;
                  const i = Math.floor(xin + s);
                  const j = Math.floor(yin + s);
                  const k = Math.floor(zin + s);

                  const t = (i + j + k) * G3;
                  const X0 = i - t;
                  const Y0 = j - t;
                  const Z0 = k - t;
                  const x0 = xin - X0;
                  const y0 = yin - Y0;
                  const z0 = zin - Z0;

                  let i1, j1, k1;
                  let i2, j2, k2;

                  if (x0 >= y0) {
                    if (y0 >= z0) {
                      i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
                    } else if (x0 >= z0) {
                      i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1;
                    } else {
                      i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1;
                    }
                  } else {
                    if (y0 < z0) {
                      i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1;
                    } else if (x0 < z0) {
                      i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1;
                    } else {
                      i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0;
                    }
                  }

                  const x1 = x0 - i1 + G3;
                  const y1 = y0 - j1 + G3;
                  const z1 = z0 - k1 + G3;
                  const x2 = x0 - i2 + 2.0 * G3;
                  const y2 = y0 - j2 + 2.0 * G3;
                  const z2 = z0 - k2 + 2.0 * G3;
                  const x3 = x0 - 1.0 + 3.0 * G3;
                  const y3 = y0 - 1.0 + 3.0 * G3;
                  const z3 = z0 - 1.0 + 3.0 * G3;

                  const ii = i & 255;
                  const jj = j & 255;
                  const kk = k & 255;

                  const gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
                  const gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
                  const gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
                  const gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;

                  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
                  let n0 = 0;
                  if (t0 < 0) {
                    n0 = 0.0;
                  } else {
                    t0 *= t0;
                    n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0, z0);
                  }

                  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
                  let n1 = 0;
                  if (t1 < 0) {
                    n1 = 0.0;
                  } else {
                    t1 *= t1;
                    n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1, z1);
                  }

                  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
                  let n2 = 0;
                  if (t2 < 0) {
                    n2 = 0.0;
                  } else {
                    t2 *= t2;
                    n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2, z2);
                  }

                  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
                  let n3 = 0;
                  if (t3 < 0) {
                    n3 = 0.0;
                  } else {
                    t3 *= t3;
                    n3 = t3 * t3 * this.dot(this.grad3[gi3], x3, y3, z3);
                  }

                  return 32.0 * (n0 + n1 + n2 + n3);
                }
              }

              // ========== 排查步骤 1: 基础场景设置 ==========
              console.log('🔍 [调试] 开始初始化 Three.js 场景...');
              
              const scene = new THREE.Scene();
              scene.background = null; // 透明背景
              console.log('✅ [调试] 场景创建成功');

              const camera = new THREE.PerspectiveCamera(
                60,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
              );
              
              // 相机拉近原点（略微拉远）
              camera.position.set(0, 2, 8);
              camera.lookAt(0, 0, 0);
              console.log('✅ [调试] 相机位置:', camera.position);

              const renderer = new THREE.WebGLRenderer({ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance"
              });
              renderer.setSize(window.innerWidth, window.innerHeight);
              renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
              renderer.setClearColor(0x000000, 0); // 透明背景
              
              if (containerRef.current) {
                containerRef.current.appendChild(renderer.domElement);
                console.log('✅ [调试] Renderer DOM 已添加到容器');
                console.log('✅ [调试] 容器尺寸:', containerRef.current.offsetWidth, containerRef.current.offsetHeight);
              }

              // ========== 排查步骤 3: 创建测试粒子（简化版） ==========
              console.log('🔍 [调试] 开始创建粒子系统...');
              
              const gridSize = 40; // 先减少到 40x40 = 1600 个粒子进行测试
              const spacing = 0.3; // 增大间距，更容易看到
              const particles = new THREE.Group();
              const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); // 更大的立方体
              const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: false, // 不透明
                opacity: 1.0,
              });

              const noise = new SimplexNoise();
              const time = { value: 0 };

              // 创建网格排列的粒子
              const halfGrid = gridSize / 2;
              let particleCount = 0;
              
              for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                  const x = (i - halfGrid) * spacing;
                  const z = (j - halfGrid) * spacing;
                  const y = 0;
                  
                  const cube = new THREE.Mesh(geometry, material.clone());
                  cube.position.set(x, y, z);
                  cube.userData = { baseX: x, baseY: y, baseZ: z, gridX: i, gridZ: j };
                  particles.add(cube);
                  particleCount++;
                }
              }
              
              console.log(`✅ [调试] 创建了 ${particleCount} 个粒子`);
              console.log(`✅ [调试] 网格范围: X[${-halfGrid * spacing}, ${halfGrid * spacing}], Z[${-halfGrid * spacing}, ${halfGrid * spacing}]`);

              scene.add(particles);
              console.log('✅ [调试] 粒子组已添加到场景');

              // ========== 排查步骤 5: 测试渲染（不使用后处理） ==========
              console.log('🔍 [调试] 开始测试基础渲染...');
              
              // 先进行一次基础渲染测试
              renderer.render(scene, camera);
              console.log('✅ [调试] 基础渲染完成');

              // 动态模糊 Shader
              const motionBlurShader = {
                uniforms: {
                  tDiffuse: { value: null },
                  delta: { value: 0.0 },
                  alpha: { value: 0.85 },
                },
                vertexShader: `
                  varying vec2 vUv;
                  void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                `,
                fragmentShader: `
                  uniform sampler2D tDiffuse;
                  uniform float delta;
                  uniform float alpha;
                  varying vec2 vUv;
                  
                  void main() {
                    vec2 offset = vec2(delta * 0.01, 0.0);
                    vec4 color = texture2D(tDiffuse, vUv);
                    vec4 prevColor = texture2D(tDiffuse, vUv - offset);
                    gl_FragColor = mix(color, prevColor, alpha);
                  }
                `,
              };

              // 故障效果 Shader
              const glitchShader = {
                uniforms: {
                  tDiffuse: { value: null },
                  time: { value: 0.0 },
                  amount: { value: 0.02 },
                },
                vertexShader: `
                  varying vec2 vUv;
                  void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                `,
                fragmentShader: `
                  uniform sampler2D tDiffuse;
                  uniform float time;
                  uniform float amount;
                  varying vec2 vUv;
                  
                  void main() {
                    vec2 uv = vUv;
                    
                    // RGB 分离效果
                    float offset = amount * sin(time * 10.0);
                    float r = texture2D(tDiffuse, uv + vec2(offset, 0.0)).r;
                    float g = texture2D(tDiffuse, uv).g;
                    float b = texture2D(tDiffuse, uv - vec2(offset, 0.0)).b;
                    
                    // 随机切片错位
                    float slice = floor(uv.y * 20.0);
                    float sliceOffset = sin(slice + time * 5.0) * amount * 0.5;
                    vec2 glitchUv = uv + vec2(sliceOffset, 0.0);
                    
                    vec4 color = texture2D(tDiffuse, glitchUv);
                    color.r = r;
                    color.b = b;
                    
                    // 随机闪烁
                    float flicker = step(0.98, sin(time * 20.0));
                    color *= (1.0 - flicker * 0.3);
                    
                    gl_FragColor = color;
                  }
                `,
              };

              // 后处理链
              const composer = new EffectComposer(renderer);
              const renderPass = new RenderPass(scene, camera);
              composer.addPass(renderPass);

              const motionBlurPass = new ShaderPass(motionBlurShader);
              motionBlurPass.renderToScreen = false;
              composer.addPass(motionBlurPass);

              const glitchPass = new ShaderPass(glitchShader);
              glitchPass.renderToScreen = true;
              composer.addPass(glitchPass);

              console.log('✅ [调试] 后处理链已设置');

              // ========== 排查步骤 6: 动画循环（带调试信息） ==========
              let frameCount = 0;
              const animate = () => {
                animationFrameRef.current = requestAnimationFrame(animate);
                time.value += 0.008;

                // 使用柏林噪声创建海浪般的波浪效果
                particles.children.forEach((cube) => {
                  const userData = cube.userData;
                  
                  // 使用多层噪声创建复杂的波浪效果
                  // 注意：noise 函数需要 3 个参数 (x, y, z)
                  const wave1 = noise.noise(
                    userData.baseX * 0.08 + time.value * 0.3,
                    0, // Y 参数设为 0
                    userData.baseZ * 0.08 + time.value * 0.2
                  );
                  
                  const wave2 = noise.noise(
                    userData.baseX * 0.15 + time.value * 0.4,
                    time.value * 0.1, // Y 参数使用时间
                    userData.baseZ * 0.15 + time.value * 0.3
                  ) * 0.5;
                  
                  const wave3 = noise.noise(
                    userData.baseX * 0.25 + time.value * 0.5,
                    time.value * 0.2, // Y 参数使用时间
                    userData.baseZ * 0.25 + time.value * 0.4
                  ) * 0.3;
                  
                  // 组合多层波浪，确保结果有效
                  let waveHeight = (wave1 * 2.0 + wave2 * 1.2 + wave3 * 0.6);
                  
                  // 检查是否为有效数字
                  if (isNaN(waveHeight) || !isFinite(waveHeight)) {
                    waveHeight = 0;
                    console.warn('⚠️ [警告] 检测到无效的 waveHeight，已重置为 0');
                  }
                  
                  // 只在 Y 轴上产生波浪
                  cube.position.y = userData.baseY + waveHeight;
                  cube.position.x = userData.baseX;
                  cube.position.z = userData.baseZ;

                  // 粒子不透明，不需要调整透明度
                  // 保持材质不透明状态
                });

                // 每 60 帧输出一次调试信息
                if (frameCount % 60 === 0) {
                  const firstParticle = particles.children[0] as THREE.Mesh;
                  if (firstParticle) {
                    console.log(`🔍 [调试] 帧 ${frameCount}: 第一个粒子位置:`, firstParticle.position);
                    console.log(`🔍 [调试] 帧 ${frameCount}: 第一个粒子透明度:`, (firstParticle.material as THREE.MeshBasicMaterial).opacity);
                  }
                }

                // 更新 shader uniforms
                motionBlurPass.uniforms.delta.value = Math.sin(time.value) * 0.3; // 降低模糊强度
                glitchPass.uniforms.time.value = time.value;
                glitchPass.uniforms.amount.value = 0.003 + Math.sin(time.value * 2) * 0.003; // 大幅降低故障效果

                composer.render();
                frameCount++;
              };

              animate();
              console.log('✅ [调试] 动画循环已启动');

              // 窗口大小调整
              const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                composer.setSize(window.innerWidth, window.innerHeight);
                console.log('✅ [调试] 窗口大小已调整:', window.innerWidth, window.innerHeight);
              };
              window.addEventListener('resize', handleResize);

              // ========== 排查步骤 7: 输出场景信息 ==========
              console.log('📊 [调试] === 场景信息 ===');
              console.log('场景对象数量:', scene.children.length);
              console.log('粒子数量:', particles.children.length);
              console.log('相机位置:', camera.position);
              console.log('相机视野:', camera.fov, '度');
              console.log('渲染器尺寸:', renderer.getSize(new THREE.Vector2()));
              console.log('容器元素:', containerRef.current);
              console.log('========================');

              // 清理函数
              return () => {
                window.removeEventListener('resize', handleResize);
                if (animationFrameRef.current) {
                  cancelAnimationFrame(animationFrameRef.current);
                }
                if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                  containerRef.current.removeChild(renderer.domElement);
                }
                renderer.dispose();
                geometry.dispose();
                material.dispose();
                particles.children.forEach((child) => {
                  if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    if (child.material instanceof THREE.Material) {
                      child.material.dispose();
                    }
                  }
                });
              };
    }).catch((error) => {
      console.error('❌ [错误] Failed to load Three.js:', error);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        opacity: 0.3, // 降低整体背景不透明度
        zIndex: -1,
        backgroundColor: 'transparent' // 确保背景透明
      }}
    />
  );
}
