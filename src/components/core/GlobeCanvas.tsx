// src/components/core/GlobeCanvas.tsx
"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// --- UPGRADE: A more visually appealing loading component that matches the site's aesthetic ---
const GlobeLoadingState = () => (
  <div className="w-full h-full flex flex-col items-center justify-center text-secondary gap-4">
    <div className="relative flex items-center justify-center w-8 h-8">
      <div className="absolute w-full h-full bg-accent/50 rounded-full animate-ping opacity-75"></div>
      <div className="relative w-3 h-3 bg-accent rounded-full"></div>
    </div>
    <p className="tracking-widest text-sm uppercase">Initializing Hologram</p>
  </div>
);

// The dynamic import is now encapsulated within this component
const DynamicHologramGlobe = dynamic(
  () => import('@/components/core/HologramGlobe').then(mod => mod.HologramGlobe),
  { 
    ssr: false,
    loading: () => <GlobeLoadingState />
  }
);

interface GlobeCanvasProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

export function GlobeCanvas({ sectionRef }: GlobeCanvasProps) {
  const [isMounted, setIsMounted] = useState(false);

  // This effect runs only once on the client, after the initial render.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- THE DEFINITIVE FIX ---
  // We render the stable placeholder on the server and during initial hydration.
  // Only after the component has certifiably mounted on the client do we switch
  // to rendering the dynamic, client-side-only component.
  // This completely resolves the race condition.
  if (!isMounted) {
    return <GlobeLoadingState />;
  }

  return <DynamicHologramGlobe sectionRef={sectionRef} />;
}