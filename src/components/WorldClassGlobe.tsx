"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Rotate the globe at 0.5rpm (approx 0.005 radians per frame at 60fps)
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1; // 0.1 rad/s is roughly 1 rpm, so 0.05 is 0.5rpm
    }
  });

  return (
    <group>
      {/* Main Globe Mesh */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#1e1b4b"
          wireframe={true}
          transparent
          opacity={0.3}
          emissive="#4f46e5"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Glow effect */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#4f46e5"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function FloatingLogo() {
  const logoRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (logoRef.current) {
      const t = state.clock.getElapsedTime();
      logoRef.current.position.y = Math.sin(t * 0.5) * 0.2;
      logoRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={logoRef}>
        <Html transform occlude distanceFactor={10} position={[0, 0, 3]}>
          <div className="pointer-events-none select-none text-white font-bold text-4xl whitespace-nowrap bg-indigo-600/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
            VANHSYA
          </div>
        </Html>
      </group>
    </Float>
  );
}

export default function WorldClassGlobe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#818cf8" />
        
        <Globe />
        <FloatingLogo />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
