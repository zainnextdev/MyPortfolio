// src/components/core/SmoothScroller.tsx -- MODIFIED FOR GSAP SYNC

"use client";

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

export const stopLenis = () => lenis?.stop();
export const startLenis = () => lenis?.start();

const SmoothScroller = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Register the ScrollTrigger plugin
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

    // --- THE CRITICAL SYNCHRONIZATION LOGIC ---
    // This is the magic. On every frame Lenis updates ("raf"), we do two things:
    // 1. We tell ScrollTrigger the new scroll position from Lenis.
    // 2. We use GSAP's ticker to drive Lenis's animation loop, ensuring
    //    both systems are running on the exact same clock.
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000); // Lenis expects milliseconds
    });
    
    gsap.ticker.lagSmoothing(0);
    // --- END OF SYNCHRONIZATION LOGIC ---

    return () => {
      // Clean up GSAP ticker and Lenis instance
      gsap.ticker.remove(lenis!.raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default SmoothScroller;