// src/components/core/SmoothScroller.tsx
"use client";

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';

// --- Singleton instance of Lenis ---
let lenis: Lenis | null = null;

// --- Control functions that other components can import and use ---
export const stopLenis = () => lenis?.stop();
export const startLenis = () => lenis?.start();

const SmoothScroller = () => {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (lenis) {
      // If an instance already exists, destroy it to prevent duplicates.
      // This can happen in React's strict mode in development.
      lenis.destroy();
    }

    // --- RE-ENGINEERED "EXPENSIVE" SETTINGS ---
    lenis = new Lenis({
      duration: 2.0,      // Longer duration for a more cinematic feel on programmatic scrolls
      lerp: 0.06,         // Lower lerp for a heavier, more physical "drag"
      wheelMultiplier: 1.1, // Slightly increases mouse wheel sensitivity for responsiveness
      syncTouch: true,      // Improves touch-based scrolling synchronization
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);

    // --- INTEGRATION: Set CSS variable for cursor and other components to use ---
    lenis.on('scroll', (e: { velocity: number; isScrolling: boolean }) => {
      document.documentElement.style.setProperty('--scroll-velocity', e.velocity.toString());
      if (e.isScrolling) {
        document.body.classList.add('is-scrolling');
      } else {
        document.body.classList.remove('is-scrolling');
      }
    });

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default SmoothScroller;