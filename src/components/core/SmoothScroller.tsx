// src/components/core/SmoothScroller.tsx -- FINAL, CONDITIONALLY-ACTIVATED VERSION

"use client";

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '@/hooks/useMediaQuery'; // Import our conditional hook

let lenis: Lenis | null = null;

// --- MODIFICATION: Make the control functions null-safe ---
// If Lenis isn't initialized (i.e., on mobile), these functions will now do nothing instead of causing an error.
export const stopLenis = () => lenis?.stop();
export const startLenis = () => lenis?.start();

const SmoothScroller = () => {
  const pathname = usePathname();
  // We'll define "desktop" as screens wider than 1024px.
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    // --- CORE LOGIC: Only run Lenis setup on desktop devices ---
    if (isDesktop) {
      gsap.registerPlugin(ScrollTrigger);

      if (lenis) {
        lenis.destroy();
      }

      lenis = new Lenis({
        duration: 2.0,
        lerp: 0.06,
        wheelMultiplier: 1.1,
        syncTouch: true,
      });
      
      // The critical GSAP synchronization logic
      lenis.on('scroll', ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });
      
      gsap.ticker.lagSmoothing(0);

      // Return a cleanup function to destroy Lenis and the GSAP ticker when the component unmounts
      return () => {
        if (lenis) {
          gsap.ticker.remove(lenis.raf);
          lenis.destroy();
          lenis = null;
        }
      };
    } else {
      // On mobile, ensure any lingering instance is destroyed.
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
    }
  }, [isDesktop]); // This effect re-runs if the user resizes their browser across the 1024px breakpoint

  useEffect(() => {
    // This effect should run on all devices to ensure scrolling to top on navigation
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default SmoothScroller;