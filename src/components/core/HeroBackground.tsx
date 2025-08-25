// src/components/core/HeroBackground.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from 'gsap';

export function HeroBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (backgroundRef.current) {
        const { clientX, clientY } = e;
        backgroundRef.current.style.setProperty("--x", `${clientX}px`);
        backgroundRef.current.style.setProperty("--y", `${clientY}px`);
      }
    };
    window.addEventListener("pointermove", handler);

    gsap.fromTo(backgroundRef.current, { opacity: 0 }, { opacity: 1, duration: 2, delay: 0.2, ease: 'power3.out' });

    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <div
      ref={backgroundRef}
      // --- FIX: Pushed to the very back of the stack ---
      className="fixed inset-0 -z-30 h-screen w-screen opacity-0"
      style={
        {
          "--x": "50vw",
          "--y": "50vh",
          "--size": "100px",
          "--grid-color": "rgba(136, 136, 136, 0.1)",
          "--spotlight-color": "rgba(0, 245, 212, 0.12)",
          background: `
            radial-gradient(circle at var(--x) var(--y), var(--spotlight-color), transparent 25%),
            linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px),
            conic-gradient(from 45deg, transparent 0deg 90deg, rgba(136, 136, 136, 0.05) 90deg 180deg, transparent 180deg 360deg)
          `,
          backgroundSize: `
            100% 100%,
            var(--size) var(--size),
            var(--size) var(--size),
            calc(var(--size) * 4) calc(var(--size) * 4)
          `,
          animation: "rotate-schematic 60s linear infinite",
        } as React.CSSProperties
      }
    />
  );
}