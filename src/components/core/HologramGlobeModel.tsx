// src/components/core/HologramGlobeModel.tsx -- FINAL PRODUCTION VERSION
"use client";

import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

export const HologramGlobeModel = React.forwardRef<THREE.Group, ThreeElements['group']>((props, ref) => {
  const { scene, animations } = useGLTF('/hologram_globe.glb');
  const { actions } = useAnimations(animations, ref as React.RefObject<THREE.Group>);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      if (action) action.play();
    });
    return () => {
      Object.values(actions).forEach((action) => {
        if (action) action.stop();
      });
    };
  }, [actions]);
  
  // --- FIX: Raised the model on the Y-axis from 0 to 0.6 for a higher, more prominent position. ---
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={scene} scale={2.4} position={[0, 1.3, 0]} />
    </group>
  );
});

useGLTF.preload('/hologram_globe.glb');
HologramGlobeModel.displayName = 'HologramGlobeModel';