// src/app/not-found.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { GlitchingIcosahedron } from '@/components/core/GlitchingIcosahedron';
import { Home } from 'lucide-react';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo('.stagger-reveal', 
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      <GlitchingIcosahedron />

      <h1 
        className="stagger-reveal text-7xl md:text-9xl font-black tracking-tighter bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
        data-cursor-text
      >
        404
      </h1>
      
      <h2 
        className="stagger-reveal text-xl md:text-3xl font-bold tracking-tight text-primary mt-4"
        data-cursor-text
      >
        Lost in the Cosmos
      </h2>

      <p 
        className="stagger-reveal text-secondary max-w-md mt-4"
        data-cursor-text
      >
        The page you are looking for does not exist or has been moved to a new coordinate in the digital universe.
      </p>

      <div className="stagger-reveal mt-12">
        <Link href="/" data-cursor-hover>
          <span className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-surface/50 px-8 py-4 text-lg font-medium text-primary shadow-lg transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_theme(colors.accent)] border border-secondary/20 backdrop-blur-sm">
            <Home className="transition-transform duration-300 group-hover:-translate-y-1" />
            <span>Return to Home Base</span>
          </span>
        </Link>
      </div>
    </main>
  );
}