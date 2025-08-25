// src/components/core/HologramGlobe.tsx -- FINAL PRODUCTION VERSION (Corrected)
"use client";

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { HologramGlobeModel } from './HologramGlobeModel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// --- FIX: The prop type is now correctly defined to accept a potentially null ref. ---
type SceneProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

function Scene({ sectionRef }: SceneProps) {
  const globeRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.4;
    }
  });

  useEffect(() => {
    // The null-check for `sectionRef.current` is now essential and correct.
    if (globeRef.current && sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      tl.to(globeRef.current.rotation, {
        y: `+=${Math.PI * 8}`,
        ease: 'none',
      });
    }
  }, [sectionRef]);

  return <HologramGlobeModel ref={globeRef} />;
}


// --- FIX: The prop type for the main component is also corrected. ---
type HologramGlobeProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
};

export function HologramGlobe({ sectionRef }: HologramGlobeProps) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00F5D4" />
      <pointLight position={[-5, -5, 5]} intensity={1.5} color="#FFFFFF" />
      
      <Scene sectionRef={sectionRef} />
    </Canvas>
  );
}