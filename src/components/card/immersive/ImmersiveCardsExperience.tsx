'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr, Environment, Preload, RoundedBox, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import clsx from 'clsx';
import styles from './immersive-cards.module.css';
import type { CardTier } from '@/data/card/tiers';
import { VANHSYA_CARDS } from '@/data/card/tiers';
import { ArrowRight, CreditCard, Sparkles } from 'lucide-react';

type ImmersiveCardSpec = {
  id: string;
  title: string;
  subtitle: string;
  tier?: CardTier;
  href: string;
  chip: string;
};

type DomRuntime = {
  el: HTMLElement | null;
  spec: ImmersiveCardSpec;
  inView: boolean;
  enteredAt: number | null;
  hoverActive: boolean;
  hoverX: number;
  hoverY: number;
  focusActive: boolean;
};

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function damp(current: number, target: number, lambda: number, dt: number): number {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function useDomRuntimeMap() {
  const runtimeByIdRef = useRef<Map<string, DomRuntime>>(new Map());
  const [ids, setIds] = useState<string[]>([]);

  const register = (id: string, el: HTMLElement | null, spec: ImmersiveCardSpec) => {
    const existing = runtimeByIdRef.current.get(id);
    if (existing) {
      existing.el = el;
      existing.spec = spec;
    } else {
      runtimeByIdRef.current.set(id, {
        el,
        spec,
        inView: false,
        enteredAt: null,
        hoverActive: false,
        hoverX: 0,
        hoverY: 0,
        focusActive: false
      });
      setIds(Array.from(runtimeByIdRef.current.keys()));
    }
  };

  const unregister = (id: string) => {
    if (runtimeByIdRef.current.delete(id)) setIds(Array.from(runtimeByIdRef.current.keys()));
  };

  return { runtimeByIdRef, register, unregister, ids };
}

function DomCard({
  spec,
  runtimeByIdRef,
  register,
  unregister,
  className
}: {
  spec: ImmersiveCardSpec;
  runtimeByIdRef: React.MutableRefObject<Map<string, DomRuntime>>;
  register: (id: string, el: HTMLElement | null, spec: ImmersiveCardSpec) => void;
  unregister: (id: string) => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    register(spec.id, ref.current, spec);
    return () => unregister(spec.id);
  }, [register, spec, unregister]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const runtime = runtimeByIdRef.current.get(spec.id);
    if (!runtime) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        runtime.inView = entry.isIntersecting;
        if (entry.isIntersecting && runtime.enteredAt === null) runtime.enteredAt = performance.now();
      },
      { root: null, threshold: 0.18 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [runtimeByIdRef, spec.id]);

  const setHover = (active: boolean, x = 0, y = 0) => {
    const runtime = runtimeByIdRef.current.get(spec.id);
    if (!runtime) return;
    runtime.hoverActive = active;
    runtime.hoverX = x;
    runtime.hoverY = y;
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setHover(true, nx, ny);
  };

  const onPointerLeave = () => setHover(false, 0, 0);

  const onFocus = () => {
    const runtime = runtimeByIdRef.current.get(spec.id);
    if (!runtime) return;
    runtime.focusActive = true;
    runtime.hoverActive = true;
    runtime.hoverX = 0;
    runtime.hoverY = 0;
  };

  const onBlur = () => {
    const runtime = runtimeByIdRef.current.get(spec.id);
    if (!runtime) return;
    runtime.focusActive = false;
    runtime.hoverActive = false;
    runtime.hoverX = 0;
    runtime.hoverY = 0;
  };

  return (
    <div
      ref={ref}
      data-immersive-card={spec.id}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
    >
      <Link
        href={spec.href}
        onFocus={onFocus}
        onBlur={onBlur}
        className="block rounded-3xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 transition-colors overflow-hidden"
        aria-label={`${spec.title}. ${spec.subtitle}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-white font-extrabold truncate">{spec.title}</div>
              <div className="mt-2 text-sm text-white/60">{spec.subtitle}</div>
            </div>
            <span className="neo-badge neo-badge-popular">{spec.chip}</span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-white/55">
            <Sparkles className="w-4 h-4 text-amber-200" />
            Explore
            <ArrowRight className="w-3.5 h-3.5 text-white/60" />
          </div>
        </div>
      </Link>
    </div>
  );
}

function DomSyncedCardMesh({
  id,
  runtimeByIdRef,
  reducedMotion,
  staggerIndex
}: {
  id: string;
  runtimeByIdRef: React.MutableRefObject<Map<string, DomRuntime>>;
  reducedMotion: boolean;
  staggerIndex: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState(() => new THREE.Texture());
  const loaderRef = useRef(new THREE.TextureLoader());
  const loadedUrlRef = useRef<string | null>(null);

  const tmpPos = useMemo(() => new THREE.Vector3(), []);
  const tmpScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const tmpEuler = useMemo(() => new THREE.Euler(), []);

  const setTextureFromUrl = (url: string) => {
    if (loadedUrlRef.current === url) return;
    loadedUrlRef.current = url;
    loaderRef.current.load(
      url,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 4;
        t.wrapS = THREE.ClampToEdgeWrapping;
        t.wrapT = THREE.ClampToEdgeWrapping;
        setTexture(t);
      },
      undefined,
      () => {}
    );
  };

  useFrame(({ size, clock }, dt) => {
    const runtime = runtimeByIdRef.current.get(id);
    const mesh = meshRef.current;
    if (!runtime || !mesh || !runtime.el) return;

    const rect = runtime.el.getBoundingClientRect();
    const inViewport = rect.bottom > 0 && rect.right > 0 && rect.left < size.width && rect.top < size.height;
    if (!inViewport) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;

    if (runtime.spec.tier) setTextureFromUrl(`/api/card/image/${runtime.spec.tier}`);

    const cx = rect.left + rect.width / 2 - size.width / 2;
    const cy = -(rect.top + rect.height / 2 - size.height / 2);

    const baseZ = -40 + staggerIndex * 3;
    const centerY = (rect.top + rect.height / 2) / size.height;
    const scrollDepth = reducedMotion ? 0 : THREE.MathUtils.clamp((0.5 - centerY) * 70, -32, 32);
    const hoverZ = runtime.hoverActive && !reducedMotion ? 30 : 0;
    const focusZ = runtime.focusActive && !reducedMotion ? 18 : 0;
    const z = baseZ + scrollDepth + hoverZ + focusZ;

    let appear = 1;
    if (!reducedMotion && runtime.enteredAt !== null) {
      const delay = staggerIndex * 70;
      const t = (performance.now() - runtime.enteredAt - delay) / 650;
      appear = THREE.MathUtils.clamp(t, 0, 1);
      appear = easeOutCubic(appear);
    }

    tmpPos.set(cx, cy + (1 - appear) * -24, z + (1 - appear) * -160);
    tmpScale.set(rect.width, rect.height, 34);

    const targetRX = reducedMotion ? 0 : THREE.MathUtils.clamp(-runtime.hoverY * 0.12, -0.22, 0.22);
    const targetRY = reducedMotion ? 0 : THREE.MathUtils.clamp(runtime.hoverX * 0.18, -0.3, 0.3);
    const targetRZ = reducedMotion ? 0 : THREE.MathUtils.clamp(runtime.hoverX * 0.05, -0.08, 0.08);

    const current = mesh.rotation;
    tmpEuler.set(
      damp(current.x, targetRX, 14, dt),
      damp(current.y, targetRY, 14, dt),
      damp(current.z, targetRZ, 14, dt)
    );

    mesh.position.lerp(tmpPos, 1 - Math.exp(-18 * dt));
    mesh.scale.lerp(tmpScale, 1 - Math.exp(-18 * dt));
    mesh.rotation.set(tmpEuler.x, tmpEuler.y, tmpEuler.z);

    const mat = mesh.material as THREE.MeshPhysicalMaterial;
    if (mat) {
      const targetOpacity = 0.98 * appear;
      mat.opacity = damp(mat.opacity, targetOpacity, 16, dt);
    }
  });

  const matProps = useMemo(
    () => ({
      transparent: true,
      opacity: 0,
      metalness: 0.2,
      roughness: 0.26,
      clearcoat: 0.85,
      clearcoatRoughness: 0.18,
      reflectivity: 0.35,
      transmission: 0.14,
      ior: 1.28,
      thickness: 0.35,
      envMapIntensity: 1.15,
      color: new THREE.Color('#0B1220'),
      map: texture
    }),
    [texture]
  );

  return (
    <RoundedBox
      ref={meshRef}
      args={[1, 1, 1]}
      radius={0.12}
      smoothness={8}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial {...matProps} />
    </RoundedBox>
  );
}

function Scene({
  ids,
  runtimeByIdRef,
  reducedMotion
}: {
  ids: string[];
  runtimeByIdRef: React.MutableRefObject<Map<string, DomRuntime>>;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      scrollYRef.current = window.scrollY || 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((_, dt) => {
    const group = groupRef.current;
    if (!group || reducedMotion) return;
    const tx = -pointerRef.current.y * 0.06;
    const ty = pointerRef.current.x * 0.08;
    group.rotation.x = damp(group.rotation.x, tx, 6, dt);
    group.rotation.y = damp(group.rotation.y, ty, 6, dt);

    const stars = starsRef.current;
    if (stars) {
      const targetY = -(scrollYRef.current * 0.18);
      stars.position.y = damp(stars.position.y, targetY, 2.6, dt);
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[260, 340, 520]} intensity={2.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <Environment preset="city" />
      <group ref={starsRef}>
        <Stars radius={1400} depth={60} count={1100} factor={2.2} fade speed={0.75} />
      </group>

      <mesh position={[0, -420, -120]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4000, 2500]} />
        <shadowMaterial transparent opacity={0.22} />
      </mesh>

      <group ref={groupRef}>
        {ids.map((id, index) => (
          <DomSyncedCardMesh key={id} id={id} runtimeByIdRef={runtimeByIdRef} reducedMotion={reducedMotion} staggerIndex={index} />
        ))}
      </group>
      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  );
}

export default function ImmersiveCardsExperience() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [webglReady] = useState(() => isWebGLAvailable());
  const { runtimeByIdRef, register, unregister, ids } = useDomRuntimeMap();

  const specs: ImmersiveCardSpec[] = useMemo(() => {
    const tiers = VANHSYA_CARDS.map((c) => ({
      id: `tier_${c.tier}`,
      title: c.name,
      subtitle: c.tagline,
      tier: c.tier,
      href: `/card/${c.tier}`,
      chip: c.tier.toUpperCase()
    }));

    const feature: ImmersiveCardSpec[] = [
      {
        id: 'feature_concierge',
        title: 'Concierge Depth',
        subtitle: 'Travel orchestration and support escalation',
        href: '/services',
        chip: 'CONCIERGE'
      },
      {
        id: 'feature_security',
        title: 'Security Controls',
        subtitle: 'Freeze, verify, and recovery workflows',
        href: '/status',
        chip: 'SECURITY'
      },
      {
        id: 'feature_rewards',
        title: 'Rewards Engine',
        subtitle: 'Tiered earn rates tuned to your travel intensity',
        href: '/card',
        chip: 'REWARDS'
      },
      {
        id: 'feature_ai',
        title: 'AI Assistance',
        subtitle: 'Tools that reduce risk and improve outcomes',
        href: '/ai-tools',
        chip: 'AI'
      },
      {
        id: 'feature_global',
        title: 'Global Ready',
        subtitle: 'Designed for cross-border mobility',
        href: '/why-vanhsya',
        chip: 'GLOBAL'
      },
      {
        id: 'feature_waitlist',
        title: 'Early Access',
        subtitle: 'Join the waitlist and get launch updates',
        href: '/card',
        chip: 'WAITLIST'
      }
    ];

    return [...tiers, ...feature];
  }, []);

  return (
    <section className="relative">
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.stageLayers} />
        <div className={styles.noise} />
        {webglReady && (
          <Canvas
            orthographic
            shadows
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            onCreated={({ camera, size }) => {
              const cam = camera as THREE.OrthographicCamera;
              cam.left = -size.width / 2;
              cam.right = size.width / 2;
              cam.top = size.height / 2;
              cam.bottom = -size.height / 2;
              cam.near = -2000;
              cam.far = 2000;
              cam.position.set(0, 0, 900);
              cam.updateProjectionMatrix();
            }}
          >
            <Scene ids={ids} runtimeByIdRef={runtimeByIdRef} reducedMotion={prefersReducedMotion} />
          </Canvas>
        )}
      </div>

      <div className="relative z-10">
        <section className="pt-28 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 header-blur-vanhsya text-[10px] font-black uppercase tracking-[0.25em] text-amber-200/90">
                <CreditCard className="w-4 h-4" />
                Card Experience
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                    Immersive 3D card wall with{' '}
                    <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                      physical motion
                    </span>
                    .
                  </h2>
                  <p className="mt-4 text-white/70 leading-relaxed">
                    Move your pointer over a card to trigger natural tilt, depth lift, and specular highlights. Scroll to
                    reveal staggered entrances. Keyboard focus produces the same depth cues.
                  </p>
                  {!webglReady && (
                    <div className="mt-5 text-sm text-white/70 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      WebGL is unavailable in this browser, so the page is using a CSS 3D fallback.
                    </div>
                  )}
                </div>

                <div className={clsx('lg:col-span-7', !webglReady && styles.fallbackGrid)}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {specs.map((spec, index) => (
                      <motion.div
                        key={spec.id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
                        transition={{ duration: 0.55, delay: index * 0.05 }}
                        className={clsx(!webglReady && styles.fallbackCard)}
                      >
                        <DomCard
                          spec={spec}
                          runtimeByIdRef={runtimeByIdRef}
                          register={register}
                          unregister={unregister}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
}
