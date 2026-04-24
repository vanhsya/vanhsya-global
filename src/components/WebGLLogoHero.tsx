"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';

type WebGLLogoHeroProps = {
  className?: string;
};

const vertexShaderSource = `
precision highp float;

attribute vec2 a_pos;
attribute float a_seed;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;

varying float v_seed;
varying float v_dist;

float hash(float n) { return fract(sin(n) * 43758.5453123); }

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

void main() {
  v_seed = a_seed;

  vec2 p = a_pos;

  float t = u_time * 0.35;
  float wobble = (hash(a_seed) - 0.5) * 0.08;
  p *= rot(t * 0.6 + wobble);

  vec2 m = (u_mouse * 2.0 - 1.0);
  vec2 d = p - m * 0.55;
  float dist = length(d);
  v_dist = dist;

  float attract = smoothstep(1.1, 0.0, dist);
  p -= normalize(d + 1e-4) * attract * 0.08 * (0.35 + 0.65 * sin(t + a_seed));

  float scrollKick = u_scroll * 0.55;
  p.y += scrollKick * 0.08;
  p.x += scrollKick * 0.03 * sin(a_seed * 2.0 + t);

  float z = (sin(a_seed * 7.0 + t * 1.4) + cos(a_seed * 3.0 + t * 1.1)) * 0.12 + attract * 0.25;
  float perspective = 1.0 / (1.0 + z * 0.85);

  vec2 pos = p * perspective;

  gl_Position = vec4(pos, 0.0, 1.0);

  float baseSize = mix(1.2, 3.2, hash(a_seed * 1.3));
  float pulse = 0.6 + 0.4 * sin(t * 1.8 + a_seed * 2.7);
  float size = baseSize * (0.8 + 0.8 * attract) * pulse;
  float dpr = max(u_resolution.x, u_resolution.y) / 900.0;
  gl_PointSize = size * (1.0 + dpr);
}
`;

const fragmentShaderSource = `
precision highp float;

uniform float u_time;

varying float v_seed;
varying float v_dist;

float hash(float n) { return fract(sin(n) * 43758.5453123); }

void main() {
  vec2 uv = gl_PointCoord * 2.0 - 1.0;
  float r = length(uv);
  float core = smoothstep(1.0, 0.0, r);
  float halo = smoothstep(1.0, 0.15, r) * 0.55;

  float t = u_time * 0.5;
  float flicker = 0.8 + 0.2 * sin(t * 4.0 + v_seed * 6.0);
  float grit = 0.85 + 0.15 * hash(v_seed * 3.1 + floor(t * 30.0));

  vec3 gold = vec3(1.0, 0.78, 0.25);
  vec3 violet = vec3(0.55, 0.22, 0.95);
  vec3 cyan = vec3(0.2, 0.85, 1.0);

  float band = smoothstep(0.0, 1.4, v_dist);
  vec3 col = mix(gold, violet, band);
  col = mix(col, cyan, 0.12 + 0.12 * sin(t + v_seed));

  float alpha = (core + halo) * flicker * grit;
  alpha *= smoothstep(1.6, 0.0, v_dist);

  gl_FragColor = vec4(col * (0.75 + 0.55 * core), alpha);
}
`;

const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (gl: WebGLRenderingContext, vsSource: string, fsSource: string) => {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const sampleLogoParticles = (img: HTMLImageElement, maxParticles: number) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  const size = 220;
  canvas.width = size;
  canvas.height = size;

  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  const positions: number[] = [];
  const seeds: number[] = [];

  const stride = 3;
  for (let y = 0; y < size; y += stride) {
    for (let x = 0; x < size; x += stride) {
      const i = (y * size + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const lum = (r + g + b) / (3 * 255);
      const keep = a > 40 && lum > 0.05;
      if (!keep) continue;

      const nx = (x / (size - 1)) * 2 - 1;
      const ny = (y / (size - 1)) * 2 - 1;

      positions.push(nx * 0.62, -ny * 0.62);
      seeds.push((x + y * size) / (size * size));
      if (seeds.length >= maxParticles) break;
    }
    if (seeds.length >= maxParticles) break;
  }

  if (seeds.length < 200) return null;
  return {
    positions: new Float32Array(positions),
    seeds: new Float32Array(seeds),
    count: seeds.length,
  };
};

export default function WebGLLogoHero({ className = '' }: Readonly<WebGLLogoHeroProps>) {
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [webglOk, setWebglOk] = useState(true);
  const [videoOk, setVideoOk] = useState(true);

  const heroCopy = useMemo(
    () => ({
      headline: 'VANHSYA Global Migration',
      subhead:
        'A premium, AI-driven migration platform with UAE-wide support across all 7 Emirates—built for speed, clarity, and outcomes.',
      primaryCta: { label: 'Start with a Free Consultation', href: '/consultation' },
      secondaryCta: { label: 'Explore AI Tools', href: '/ai-tools' },
    }),
    []
  );

  useEffect(() => {
    if (reducedMotion) {
      setWebglOk(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let glContext: WebGLRenderingContext | null = null;
    try {
      glContext =
        canvas.getContext('webgl', {
          alpha: true,
          antialias: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: false,
        }) ?? null;
    } catch {
      glContext = null;
    }

    if (!glContext) {
      setWebglOk(false);
      return;
    }

    const gl = glContext;

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
      setWebglOk(false);
      return;
    }

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uScroll = gl.getUniformLocation(program, 'u_scroll');

    const aPos = gl.getAttribLocation(program, 'a_pos');
    const aSeed = gl.getAttribLocation(program, 'a_seed');

    let disposed = false;
    const start = performance.now();
    let mouseX = 0.5;
    let mouseY = 0.5;
    let scrollTarget = 0;
    let scroll = 0;

    const handlePointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = 1 - (e.clientY - rect.top) / rect.height;
    };

    const handleScroll = () => {
      const y = globalThis.window.scrollY || 0;
      scrollTarget = Math.max(0, Math.min(1, y / 900));
    };

    const handleResize = () => {
      const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onContextLost = (ev: Event) => {
      ev.preventDefault();
      setWebglOk(false);
    };

    canvas.addEventListener('pointermove', handlePointer, { passive: true });
    globalThis.window.addEventListener('scroll', handleScroll, { passive: true });
    globalThis.window.addEventListener('resize', handleResize, { passive: true });
    canvas.addEventListener('webglcontextlost', onContextLost, false);

    handleResize();
    handleScroll();

    const maxParticles = 3200;

    let posBuffer: WebGLBuffer | null = null;
    let seedBuffer: WebGLBuffer | null = null;
    let count = 0;

    const initBuffers = async () => {
      try {
        const img = await loadImage('/images/originallogo.png');
        const sampled = sampleLogoParticles(img, maxParticles);
        if (!sampled) {
          setWebglOk(false);
          return;
        }
        count = sampled.count;

        posBuffer = gl.createBuffer();
        seedBuffer = gl.createBuffer();
        if (!posBuffer || !seedBuffer) {
          setWebglOk(false);
          return;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sampled.positions, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, sampled.seeds, gl.STATIC_DRAW);
      } catch {
        setWebglOk(false);
      }
    };

    const render = () => {
      if (disposed) return;

      scroll += (scrollTarget - scroll) * 0.08;

      const now = performance.now();
      const t = (now - start) / 1000;

      handleResize();

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouseX, mouseY);
      gl.uniform1f(uScroll, scroll);

      if (posBuffer && seedBuffer && count > 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer);
        gl.enableVertexAttribArray(aSeed);
        gl.vertexAttribPointer(aSeed, 1, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, count);
      }

      rafRef.current = globalThis.requestAnimationFrame(render);
    };

    void initBuffers().then(() => {
      rafRef.current = globalThis.requestAnimationFrame(render);
    });

    return () => {
      disposed = true;
      if (rafRef.current) globalThis.cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('pointermove', handlePointer);
      globalThis.window.removeEventListener('scroll', handleScroll);
      globalThis.window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      if (posBuffer) gl.deleteBuffer(posBuffer);
      if (seedBuffer) gl.deleteBuffer(seedBuffer);
      gl.deleteProgram(program);
    };
  }, [reducedMotion]);

  return (
    <section className={`relative min-h-[92vh] pt-28 pb-16 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950" />

      <div className="absolute inset-0 opacity-60">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-48 left-1/3 w-[900px] h-[900px] rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute top-20 right-0 w-[700px] h-[700px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {videoOk && (
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-[0.25] mix-blend-lighten"
          src={
            process.env.NEXT_PUBLIC_HERO_VIDEO_URL ??
            'https://assets.mixkit.co/videos/preview/mixkit-abstract-blue-and-purple-shapes-27350-large.mp4'
          }
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onError={() => setVideoOk(false)}
        />
      )}

      {webglOk ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-70">
          <BrandLogo href="" lockup="stacked" chrome="full" enableParallax={false} enableReveal={false} priority />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/55 to-slate-950/85" />

      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/80 backdrop-blur">
              <span className="text-sm font-medium">UAE Coverage • 24/7 Support • AI Tools</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              {heroCopy.headline}
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {heroCopy.subhead}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={heroCopy.primaryCta.href} className="btn-primary">
                {heroCopy.primaryCta.label}
              </Link>
              <Link href={heroCopy.secondaryCta.href} className="btn-secondary border-white/20 text-white hover:bg-white/10">
                {heroCopy.secondaryCta.label}
              </Link>
            </div>

            <div className="text-white/60 text-sm">
              WebGL-powered experience with graceful fallback for unsupported browsers.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
