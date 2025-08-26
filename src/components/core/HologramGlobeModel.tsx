// src/components/core/HologramGlobeModel.tsx -- MODIFIED

"use client";

import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

export const HologramGlobeModel = React.forwardRef<THREE.Group, ThreeElements['group']>((props, ref) => {
  // UPDATED: The path now points to the new, compressed model.
  const { scene, animations } = useGLTF('/hologram_globe_compressed.glb');
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
  
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={scene} scale={2.4} position={[0, 1.3, 0]} />
    </group>
  );
});

// UPDATED: Preload the compressed model.
useGLTF.preload('/hologram_globe_compressed.glb');
HologramGlobeModel.displayName = 'HologramGlobeModel';