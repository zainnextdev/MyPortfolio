// src/components/core/GlitchingIcosahedron.tsx -- RE-ENGINEERED, RHYTHMIC & BUG-FREE VERSION
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from 'three';

function GlitchyShape() {
  const mainShapeRef = useRef<THREE.Group>(null);
  const fragmentsRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const { clock } = state;
    const elapsedTime = clock.getElapsedTime();

    if (!mainShapeRef.current || !fragmentsRef.current || !lightRef.current) return;

    // --- The Core of the New, Controlled Glitch Effect ---
    // We create a rhythmic cycle for the glitch event (e.g., every 4 seconds).
    const glitchCycle = (elapsedTime % 4) / 4; // Normalized value from 0 to 1 over 4 seconds
    // We use Math.pow to create a very sharp, intense peak for the glitch, making it feel like a pulse.
    const glitchIntensity = Math.pow(Math.sin(glitchCycle * Math.PI), 15);

    // 1. Apply effects to the stable main shape
    // It always has a slow, constant rotation.
    mainShapeRef.current.rotation.x += delta * 0.05;
    mainShapeRef.current.rotation.y += delta * 0.08;
    // Add a very subtle positional shake during the glitch pulse.
    mainShapeRef.current.position.x = (Math.random() - 0.5) * glitchIntensity * 0.1;

    // 2. Apply intense effects to the unstable fragments
    if (glitchIntensity > 0.1) {
      fragmentsRef.current.visible = true;
      // Fragments scale up and down erratically during the pulse.
      fragmentsRef.current.scale.setScalar(1 + glitchIntensity * 0.3);
      // Fragments rotate wildly.
      fragmentsRef.current.rotation.y += delta * glitchIntensity * 5 * (Math.random() - 0.5);
      fragmentsRef.current.rotation.x += delta * glitchIntensity * 5 * (Math.random() - 0.5);
    } else {
      // Fragments are hidden when the glitch is not active.
      fragmentsRef.current.visible = false;
    }

    // 3. Control the light
    // A slower, more atmospheric flicker.
    lightRef.current.intensity = 4 + Math.sin(elapsedTime * 2.5) * 2;
    // The light slowly orbits, casting dynamic highlights.
    lightRef.current.position.x = Math.sin(elapsedTime * 0.3) * 2;
    lightRef.current.position.z = Math.cos(elapsedTime * 0.3) * 2;
  });

  return (
    <>
      <pointLight ref={lightRef} color="#00F5D4" intensity={4} distance={10} />
      
      {/* The "Stable" Core */}
      <group ref={mainShapeRef}>
        <Edges scale={1.5}>
          <meshBasicMaterial color="#888888" transparent opacity={0.3} depthTest={false} />
        </Edges>
      </group>
      
      {/* The "Unstable" Fragments that appear during the glitch */}
      <group ref={fragmentsRef}>
        <Edges scale={1.55} rotation={[0.5, 0.5, 0]}>
            <meshBasicMaterial color="#00F5D4" transparent opacity={0.4} depthTest={false} />
        </Edges>
         <Edges scale={1.6} rotation={[-0.5, -0.5, 0]}>
            <meshBasicMaterial color="#EAEAEA" transparent opacity={0.25} depthTest={false} />
        </Edges>
      </group>
    </>
  );
}

export function GlitchingIcosahedron() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30 md:opacity-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <GlitchyShape />
      </Canvas>
    </div>
  );
}