"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Icosahedron, Edges } from "@react-three/drei";
import { Vector3, Color } from "three";
import * as THREE from 'three';

function Shape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Track mouse position
  useMemo(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  const accentColor = useMemo(() => new Color("#00F5D4"), []);

  useFrame((state, delta) => {
    // Constant rotation
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }

    // Mouse follow (lerp for smoothness)
    const targetPosition = new Vector3(mousePosition.current.x * 2, mousePosition.current.y * 2, 2);
    if (lightRef.current) {
      lightRef.current.position.lerp(targetPosition, 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight ref={lightRef} position={[0, 0, 2]} color={accentColor} intensity={5} distance={10} />
      <Icosahedron args={[1.5, 0]} ref={meshRef}>
        <meshStandardMaterial wireframe color={accentColor} emissive={accentColor} emissiveIntensity={0.2} />
        <Edges scale={1.001}>
          <meshBasicMaterial color="#888888" depthTest={false} transparent />
        </Edges>
      </Icosahedron>
    </>
  );
}

export function IcosahedronScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Shape />
      </Canvas>
    </div>
  );
}