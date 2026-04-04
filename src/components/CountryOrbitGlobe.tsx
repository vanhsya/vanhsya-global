"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";

type GeoJSONFeature = {
  type: "Feature";
  properties?: Record<string, unknown>;
  geometry:
    | { type: "Polygon"; coordinates: Array<Array<[number, number]>> }
    | { type: "MultiPolygon"; coordinates: Array<Array<Array<[number, number]>>> };
};

type GeoJSON = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};

type CountryDatum = {
  id: string;
  name: string;
  centroid: { lat: number; lon: number };
  rings: Array<Array<[number, number]>>;
};

type PerformanceStats = {
  fps: number;
  frameTimeMs: number;
  glVendor?: string;
  glRenderer?: string;
};

type Props = {
  className?: string;
  paused?: boolean;
  reducedMotion?: boolean;
  onCountryHover?: (country: { name: string; id: string } | null) => void;
  onCountrySelect?: (country: { name: string; id: string } | null) => void;
  selectedCountryId?: string | null;
  onStats?: (stats: PerformanceStats) => void;
  colorScheme?: {
    glow: string;
    border: string;
    atmosphere: string;
    particle: string;
    highlight: string;
  };
};

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl", { alpha: false, antialias: true }) ||
      canvas.getContext("experimental-webgl", { alpha: false, antialias: true });
    return Boolean(gl);
  } catch {
    return false;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function createPrng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function latLonToUnitVec3(latDeg: number, lonDeg: number) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  const x = Math.cos(lat) * Math.sin(lon);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lon);
  return new THREE.Vector3(x, y, z);
}

function pickName(feature: GeoJSONFeature, fallbackIndex: number) {
  const props = feature.properties ?? {};
  const candidates = ["name", "NAME", "ADMIN", "formal_en", "SOVEREIGNT", "NAME_EN"];
  for (const key of candidates) {
    const value = props[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return `Country ${fallbackIndex + 1}`;
}

function toRings(feature: GeoJSONFeature): Array<Array<[number, number]>> {
  if (feature.geometry.type === "Polygon") {
    return feature.geometry.coordinates.map((ring) =>
      ring.map(([lon, lat]) => [lon, lat] as [number, number])
    );
  }
  return feature.geometry.coordinates.flatMap((poly) =>
    poly.map((ring) => ring.map(([lon, lat]) => [lon, lat] as [number, number]))
  );
}

function computeCentroid(rings: Array<Array<[number, number]>>) {
  let lonSum = 0;
  let latSum = 0;
  let count = 0;

  for (const ring of rings) {
    for (let i = 0; i < ring.length; i += Math.max(1, Math.floor(ring.length / 120))) {
      const [lon, lat] = ring[i];
      lonSum += lon;
      latSum += lat;
      count += 1;
    }
  }

  if (count === 0) return { lat: 0, lon: 0 };
  return { lat: latSum / count, lon: lonSum / count };
}

function buildLinePositions(
  rings: Array<Array<[number, number]>>,
  radius: number,
  step: number
): Float32Array {
  const pts: number[] = [];
  for (const ring of rings) {
    const s = Math.max(1, step);
    for (let i = 0; i < ring.length - s; i += s) {
      const [lon1, lat1] = ring[i];
      const [lon2, lat2] = ring[i + s];
      const v1 = latLonToUnitVec3(lat1, lon1).multiplyScalar(radius);
      const v2 = latLonToUnitVec3(lat2, lon2).multiplyScalar(radius);
      pts.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
    }
  }
  return new Float32Array(pts);
}

async function fetchCountriesGeoJSON(signal: AbortSignal): Promise<GeoJSON> {
  const cacheKey = "vanhsya_world_geojson_v3";
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached) as GeoJSON;
  } catch {
    // ignore
  }
  const configuredUrl =
    (typeof process !== "undefined" && (process.env.NEXT_PUBLIC_COUNTRY_GEOJSON_URL as string | undefined)) || "";
  const urls = [
    configuredUrl,
    "https://cdn.jsdelivr.net/npm/0static/geo/World.json",
    "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
  ].filter(Boolean);

  let lastStatus: number | null = null;
  let lastError: unknown = null;

  for (const url of urls) {
    try {
      const res = await fetch(url, { signal, cache: "force-cache" });
      if (!res.ok) {
        lastStatus = res.status;
        continue;
      }
      const json = (await res.json()) as GeoJSON;
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(json));
      } catch {
        // ignore
      }
      return json;
    } catch (err) {
      lastError = err;
    }
  }

  if (typeof lastStatus === "number") throw new Error(`Failed to load country data (${lastStatus})`);
  throw new Error(`Failed to load country data (${lastError ? "network" : "unknown"})`);
}

function useReducedMotionPref(initial = false) {
  const [reduced, setReduced] = useState(initial);
  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mql) return;
    const onChange = () => setReduced(Boolean(mql.matches));
    onChange();
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function useFpsMonitor(enabled: boolean, onStats?: (s: PerformanceStats) => void) {
  const accum = useRef({ t: 0, frames: 0, fps: 0, frameMs: 0 });
  const glInfo = useRef<{ vendor?: string; renderer?: string }>({});

  const attachGlInfo = (gl: THREE.WebGLRenderer) => {
    try {
      const ctx = gl.getContext();
      const ext = ctx.getExtension("WEBGL_debug_renderer_info");
      if (!ext) return;
      const vendor = ctx.getParameter((ext as any).UNMASKED_VENDOR_WEBGL);
      const renderer = ctx.getParameter((ext as any).UNMASKED_RENDERER_WEBGL);
      if (typeof vendor === "string") glInfo.current.vendor = vendor;
      if (typeof renderer === "string") glInfo.current.renderer = renderer;
    } catch {
      return;
    }
  };

  const onFrame = (delta: number) => {
    if (!enabled) return;
    const a = accum.current;
    a.t += delta;
    a.frames += 1;
    a.frameMs = delta * 1000;
    if (a.t >= 0.5) {
      a.fps = Math.round(a.frames / a.t);
      a.t = 0;
      a.frames = 0;
      onStats?.({
        fps: a.fps,
        frameTimeMs: a.frameMs,
        glVendor: glInfo.current.vendor,
        glRenderer: glInfo.current.renderer,
      });
    }
  };

  return { attachGlInfo, onFrame };
}

function AtmosphericParticles({
  radius,
  color,
  paused,
}: {
  radius: number;
  color: string;
  paused: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const count = 3200;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const rand = createPrng((Math.floor(radius * 1000) ^ 0x9e3779b9) >>> 0);
    for (let i = 0; i < count; i++) {
      const u = rand();
      const v = rand();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = radius * (1.03 + rand() * 0.25);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      seeds[i] = rand();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [radius]);

  useFrame((state, delta) => {
    if (paused) return;
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    [color]
  );

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          attribute float aSeed;
          uniform float uTime;
          varying float vAlpha;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float tw = sin(uTime * 1.2 + aSeed * 12.0) * 0.5 + 0.5;
            float dist = length(mvPosition.xyz);
            vAlpha = smoothstep(28.0, 8.0, dist) * (0.25 + tw * 0.75);
            gl_PointSize = (2.0 + tw * 2.5) * (300.0 / dist);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            vec2 uv = gl_PointCoord.xy - 0.5;
            float d = dot(uv, uv);
            float a = smoothstep(0.25, 0.0, d) * vAlpha;
            gl_FragColor = vec4(uColor, a);
          }
        `}
      />
    </points>
  );
}

function Scene({
  paused = false,
  reducedMotion = false,
  selectedCountryId,
  onCountryHover,
  onCountrySelect,
  onStats,
  colorScheme,
}: Pick<
  Props,
  | "paused"
  | "reducedMotion"
  | "selectedCountryId"
  | "onCountryHover"
  | "onCountrySelect"
  | "onStats"
  | "colorScheme"
>) {
  const groupRef = useRef<THREE.Group>(null);
  const fineLineRef = useRef<THREE.LineSegments>(null);
  const markersRef = useRef<THREE.InstancedMesh>(null);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointerNdc = useRef(new THREE.Vector2());
  const dragging = useRef(false);
  const lastPointer = useRef<{ x: number; y: number } | null>(null);
  const velocity = useRef({ x: 0, y: 0 });
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinch = useRef<{ startDist: number; startZoom: number } | null>(null);

  const { camera, gl, size, scene } = useThree();

  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState<CountryDatum[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [targetZoom, setTargetZoom] = useState<number>(7.0);
  const [targetLookAt, setTargetLookAt] = useState<THREE.Vector3>(() => new THREE.Vector3(0, 0, 0));
  const [error, setError] = useState<string | null>(null);
  const lookAtCurrent = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

  const scheme = colorScheme ?? {
    glow: "#8250ff",
    border: "#a78bfa",
    atmosphere: "#7c3aed",
    particle: "#a78bfa",
    highlight: "#ffffff",
  };

  const radius = 2.45;

  const fps = useFpsMonitor(!reducedMotion, onStats);

  useEffect(() => {
    fps.attachGlInfo(gl);
  }, [gl, fps]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setError(null);
        const data = await fetchCountriesGeoJSON(controller.signal);
        const mapped: CountryDatum[] = data.features.map((f, idx) => {
          const rings = toRings(f);
          const centroid = computeCentroid(rings);
          return { id: String(idx), name: pickName(f, idx), rings, centroid };
        });
        setCountries(mapped);
        setLoaded(true);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load visualization data";
        setError(msg);
      }
    })();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!countries.length) return;
    if (selectedCountryId == null) {
      queueMicrotask(() => setSelectedIdx(null));
      return;
    }
    const idx = countries.findIndex((c) => c.id === selectedCountryId);
    queueMicrotask(() => setSelectedIdx(idx >= 0 ? idx : null));
  }, [countries, selectedCountryId]);

  const coarseLinesGeometry = useMemo(() => {
    if (!countries.length) return null;
    const merged: number[] = [];
    for (const c of countries) {
      const step = Math.max(2, Math.floor(Math.max(...c.rings.map((r) => r.length)) / 220));
      const arr = buildLinePositions(c.rings, radius, step);
      for (let i = 0; i < arr.length; i++) merged.push(arr[i]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(merged), 3));
    g.computeBoundingSphere();
    return g;
  }, [countries]);

  const fineLineGeometry = useMemo(() => {
    if (selectedIdx == null || selectedIdx < 0 || selectedIdx >= countries.length) return null;
    const c = countries[selectedIdx];
    const arr = buildLinePositions(c.rings, radius * 1.002, 1);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
    g.computeBoundingSphere();
    return g;
  }, [countries, selectedIdx]);

  const markersGeometry = useMemo(() => {
    const g = new THREE.SphereGeometry(0.03, 12, 12);
    return g;
  }, []);

  const haloGeometry = useMemo(() => new THREE.TorusGeometry(0.12, 0.012, 12, 64), []);
  const haloMaterial = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color(scheme.highlight),
      emissive: new THREE.Color(scheme.glow),
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.9,
    });
    return m;
  }, [scheme.glow, scheme.highlight]);

  const baseLineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(scheme.border),
      transparent: true,
      opacity: 0.32,
    });
  }, [scheme.border]);

  const highlightMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(scheme.highlight),
      transparent: true,
      opacity: 0.85,
    });
  }, [scheme.highlight]);

  useEffect(() => {
    if (!markersRef.current) return;
    if (!countries.length) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < countries.length; i++) {
      const c = countries[i];
      const p = latLonToUnitVec3(c.centroid.lat, c.centroid.lon).multiplyScalar(radius * 1.01);
      dummy.position.copy(p);
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();
      markersRef.current.setMatrixAt(i, dummy.matrix);
    }
    markersRef.current.instanceMatrix.needsUpdate = true;
  }, [countries]);

  const setHovered = useCallback(
    (idx: number | null) => {
      setHoveredIdx(idx);
      if (idx == null) onCountryHover?.(null);
      else onCountryHover?.({ id: countries[idx]?.id ?? String(idx), name: countries[idx]?.name ?? "Country" });
    },
    [countries, onCountryHover]
  );

  const setSelected = useCallback(
    (idx: number | null) => {
      setSelectedIdx(idx);
      if (idx == null) onCountrySelect?.(null);
      else onCountrySelect?.({ id: countries[idx]?.id ?? String(idx), name: countries[idx]?.name ?? "Country" });
    },
    [countries, onCountrySelect]
  );

  const focusCountry = useCallback(
    (idx: number | null) => {
      if (idx == null) {
        setTargetZoom(7.0);
        setTargetLookAt(new THREE.Vector3(0, 0, 0));
        return;
      }
      const c = countries[idx];
      const v = latLonToUnitVec3(c.centroid.lat, c.centroid.lon);
      const look = v.clone().multiplyScalar(radius * 0.85);
      setTargetLookAt(look);
      setTargetZoom(4.1);
    },
    [countries, radius]
  );

  useEffect(() => {
    if (selectedIdx == null) return;
    queueMicrotask(() => focusCountry(selectedIdx));
  }, [selectedIdx, focusCountry]);

  const handlersRef = useRef<{
    onPointerDown: (e: PointerEvent) => void;
    onPointerMove: (e: PointerEvent) => void;
    onPointerUp: (e: PointerEvent) => void;
    onWheel: (e: WheelEvent) => void;
  } | null>(null);

  useEffect(() => {
    handlersRef.current = {
      onPointerDown: (e: PointerEvent) => {
        if (!groupRef.current) return;
        (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        pointerDownPos.current = { x: e.clientX, y: e.clientY };
        if (pointers.current.size === 1) {
          dragging.current = true;
          lastPointer.current = { x: e.clientX, y: e.clientY };
          pinch.current = null;
        } else if (pointers.current.size === 2) {
          const [a, b] = Array.from(pointers.current.values());
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          pinch.current = { startDist: d, startZoom: targetZoom };
        }
      },
      onPointerMove: (e: PointerEvent) => {
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

        const rect = gl.domElement.getBoundingClientRect();
        pointerNdc.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

        if (pointers.current.size === 2 && pinch.current) {
          const [a, b] = Array.from(pointers.current.values());
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const ratio = pinch.current.startDist > 0 ? d / pinch.current.startDist : 1;
          const next = clamp(pinch.current.startZoom / ratio, 3.3, 9.5);
          setTargetZoom(next);
          return;
        }

        if (dragging.current && lastPointer.current) {
          const dx = e.clientX - lastPointer.current.x;
          const dy = e.clientY - lastPointer.current.y;
          lastPointer.current = { x: e.clientX, y: e.clientY };
          const rotX = (dx / size.width) * Math.PI * 1.3;
          const rotY = (dy / size.height) * Math.PI * 1.1;
          velocity.current.x = rotX * 0.9;
          velocity.current.y = rotY * 0.9;
          if (groupRef.current) {
            groupRef.current.rotation.y += rotX;
            groupRef.current.rotation.x += rotY;
            groupRef.current.rotation.x = clamp(groupRef.current.rotation.x, -0.9, 0.9);
          }
        } else {
          if (!markersRef.current) return;
          raycaster.setFromCamera(pointerNdc.current, camera);
          const hits = raycaster.intersectObject(markersRef.current, false);
          if (hits.length > 0 && hits[0].instanceId != null) {
            const idx = hits[0].instanceId;
            if (idx !== hoveredIdx) setHovered(idx);
          } else if (hoveredIdx != null) {
            setHovered(null);
          }
        }
      },
      onPointerUp: (e: PointerEvent) => {
        pointers.current.delete(e.pointerId);
        const down = pointerDownPos.current;
        if (down && pointers.current.size === 0 && !pinch.current) {
          const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
          if (moved < 6) {
            const rect = gl.domElement.getBoundingClientRect();
            pointerNdc.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointerNdc.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
            raycaster.setFromCamera(pointerNdc.current, camera);
            const hits = markersRef.current ? raycaster.intersectObject(markersRef.current, false) : [];
            if (hits.length > 0 && hits[0].instanceId != null) {
              const idx = hits[0].instanceId;
              setSelected(idx);
            }
          }
        }
        if (pointers.current.size === 0) {
          dragging.current = false;
          lastPointer.current = null;
          pinch.current = null;
        }
        pointerDownPos.current = null;
      },
      onWheel: (e: WheelEvent) => {
        if (reducedMotion) return;
        const next = clamp(targetZoom + e.deltaY * 0.004, 3.3, 9.5);
        setTargetZoom(next);
      },
    };
  }, [camera, gl, hoveredIdx, raycaster, reducedMotion, setHovered, setSelected, size.height, size.width, targetZoom]);

  useEffect(() => {
    const el = gl.domElement;

    const onPointerDown = (e: PointerEvent) => handlersRef.current?.onPointerDown(e);
    const onPointerMove = (e: PointerEvent) => handlersRef.current?.onPointerMove(e);
    const onPointerUp = (e: PointerEvent) => handlersRef.current?.onPointerUp(e);
    const onWheel = (e: WheelEvent) => handlersRef.current?.onWheel(e);

    el.addEventListener("pointerdown", onPointerDown as any, { passive: true });
    el.addEventListener("pointermove", onPointerMove as any, { passive: true });
    el.addEventListener("pointerup", onPointerUp as any, { passive: true });
    el.addEventListener("pointercancel", onPointerUp as any, { passive: true });
    el.addEventListener("wheel", onWheel as any, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onPointerDown as any);
      el.removeEventListener("pointermove", onPointerMove as any);
      el.removeEventListener("pointerup", onPointerUp as any);
      el.removeEventListener("pointercancel", onPointerUp as any);
      el.removeEventListener("wheel", onWheel as any);
    };
  }, [gl]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!groupRef.current) return;
      if (e.key === "Escape") {
        setSelected(null);
        focusCountry(null);
        return;
      }
      if (e.key === "Enter" && hoveredIdx != null) {
        setSelected(hoveredIdx);
        return;
      }
      if (e.key === "ArrowLeft") groupRef.current.rotation.y -= 0.08;
      if (e.key === "ArrowRight") groupRef.current.rotation.y += 0.08;
      if (e.key === "ArrowUp") groupRef.current.rotation.x = clamp(groupRef.current.rotation.x - 0.07, -0.9, 0.9);
      if (e.key === "ArrowDown") groupRef.current.rotation.x = clamp(groupRef.current.rotation.x + 0.07, -0.9, 0.9);
      if (e.key === "+" || e.key === "=") setTargetZoom((z) => clamp(z - 0.4, 3.3, 9.5));
      if (e.key === "-" || e.key === "_") setTargetZoom((z) => clamp(z + 0.4, 3.3, 9.5));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focusCountry, hoveredIdx, setSelected]);

  useFrame((state, delta) => {
    fps.onFrame(delta);
    if (paused || reducedMotion) return;

    if (groupRef.current && !dragging.current) {
      const friction = Math.pow(0.08, delta);
      velocity.current.x *= friction;
      velocity.current.y *= friction;
      groupRef.current.rotation.y += velocity.current.x;
      groupRef.current.rotation.x += velocity.current.y;
      groupRef.current.rotation.x = clamp(groupRef.current.rotation.x, -0.9, 0.9);
      if (Math.abs(velocity.current.x) < 0.00002) velocity.current.x = 0;
      if (Math.abs(velocity.current.y) < 0.00002) velocity.current.y = 0;
      if (velocity.current.x === 0 && velocity.current.y === 0) {
        groupRef.current.rotation.y += delta * 0.12;
      }
    }

    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZoom, 1 - Math.pow(0.05, delta));
    lookAtCurrent.current.lerp(targetLookAt, 1 - Math.pow(0.05, delta));
    state.camera.lookAt(lookAtCurrent.current);
  });

  useEffect(() => {
    return () => {
      coarseLinesGeometry?.dispose?.();
      fineLineGeometry?.dispose?.();
      markersGeometry?.dispose?.();
      haloGeometry.dispose();
      haloMaterial.dispose();
      baseLineMaterial.dispose();
      highlightMaterial.dispose();
    };
  }, [coarseLinesGeometry, fineLineGeometry, markersGeometry, haloGeometry, haloMaterial, baseLineMaterial, highlightMaterial]);

  const hoveredName = hoveredIdx != null ? countries[hoveredIdx]?.name : null;
  const selectedName = selectedIdx != null ? countries[selectedIdx]?.name : null;

  if (error) {
    return (
      <Html center>
        <div className="text-white/80 text-sm bg-black/60 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-3 max-w-sm">
          {error}
        </div>
      </Html>
    );
  }

  if (!loaded || !coarseLinesGeometry) {
    return (
      <Html center>
        <div className="text-white/70 text-sm bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl px-4 py-3">
          Loading visualization…
        </div>
      </Html>
    );
  }

  const hoveredVec =
    hoveredIdx != null && countries[hoveredIdx]
      ? latLonToUnitVec3(countries[hoveredIdx].centroid.lat, countries[hoveredIdx].centroid.lon)
          .multiplyScalar(radius * 1.04)
      : null;

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.55} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color={scheme.glow} />
      <pointLight position={[-6, -6, -6]} intensity={0.7} color="#60a5fa" />

      <mesh>
        <sphereGeometry args={[radius, 96, 96]} />
        <meshStandardMaterial
          color="#0b1022"
          roughness={0.55}
          metalness={0.15}
          emissive={scheme.glow}
          emissiveIntensity={0.08}
        />
      </mesh>

      <lineSegments geometry={coarseLinesGeometry} material={baseLineMaterial} />

      {fineLineGeometry && (
        <lineSegments ref={fineLineRef} geometry={fineLineGeometry} material={highlightMaterial} />
      )}

      <instancedMesh
        ref={markersRef}
        args={[markersGeometry, undefined as any, countries.length]}
        frustumCulled={false}
      >
        <meshStandardMaterial
          color={scheme.particle}
          emissive={scheme.particle}
          emissiveIntensity={0.8}
          transparent
          opacity={0.95}
        />
      </instancedMesh>

      {hoveredVec && (
        <mesh
          geometry={haloGeometry}
          material={haloMaterial}
          position={[hoveredVec.x, hoveredVec.y, hoveredVec.z]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      )}

      <mesh scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[radius, 96, 96]} />
        <meshStandardMaterial color={scheme.atmosphere} transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      <AtmosphericParticles radius={radius} color={scheme.particle} paused={paused || reducedMotion} />

      {(selectedName || hoveredName) && (
        <Html position={[0, -3.25, 0]} center>
          <div className="pointer-events-none select-none text-[10px] font-black uppercase tracking-[0.25em] text-white/70 bg-black/40 border border-white/10 backdrop-blur-md rounded-full px-4 py-2">
            {selectedName ? `Selected: ${selectedName}` : `Hover: ${hoveredName}`}
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * CountryOrbitGlobe
 * High-performance WebGL globe with country boundary lines (GeoJSON), inertial rotation, pinch/scroll zoom,
 * hover/select interactions, and performance stats callback.
 */
export default function CountryOrbitGlobe({
  className,
  paused = false,
  reducedMotion: reducedMotionProp,
  onCountryHover,
  onCountrySelect,
  selectedCountryId,
  onStats,
  colorScheme,
}: Props) {
  const prefersReducedMotion = useReducedMotionPref(false);
  const reducedMotion = Boolean(reducedMotionProp ?? prefersReducedMotion);
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setWebglOk(detectWebGL()));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  if (webglOk === false) {
    return (
      <div className={className}>
        <Fallback2D className="h-full w-full rounded-3xl bg-black/20 border border-white/10 backdrop-blur-md" />
      </div>
    );
  }

  if (webglOk == null) {
    return (
      <div className={className}>
        <div className="h-full w-full rounded-3xl bg-black/20 border border-white/10 backdrop-blur-md animate-pulse" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7], fov: 42, near: 0.1, far: 100 }}
      >
        <Scene
          paused={paused}
          reducedMotion={reducedMotion}
          selectedCountryId={selectedCountryId}
          onCountryHover={onCountryHover}
          onCountrySelect={onCountrySelect}
          onStats={onStats}
          colorScheme={colorScheme}
        />
      </Canvas>
    </div>
  );
}

function Fallback2D({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${Math.floor(width)}px`;
      canvas.style.height = `${Math.floor(height)}px`;
      render();
    };

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.36;

      const bg = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r * 1.25);
      bg.addColorStop(0, "rgba(130, 80, 255, 0.22)");
      bg.addColorStop(0.55, "rgba(59, 130, 246, 0.10)");
      bg.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = Math.max(1, dpr);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(167, 139, 250, 0.14)";
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, r * (i / 3), 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(130, 80, 255, 0.16)";
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r * 0.2, cy + Math.sin(a) * r * 0.2);
        ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(167, 139, 250, 0.9)";
      for (let i = 0; i < 60; i++) {
        const a = (i / 60) * Math.PI * 2;
        const rr = r * (0.72 + 0.28 * Math.sin(i * 7.1));
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(1.2 * dpr, 2), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = `${Math.floor(10 * dpr)}px ui-sans-serif, system-ui`;
      ctx.textAlign = "center";
      ctx.fillText("WebGL disabled — 2D fallback active", cx, cy + r + 28 * dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="block h-full w-full rounded-3xl" aria-label="2D globe fallback" />
    </div>
  );
}
