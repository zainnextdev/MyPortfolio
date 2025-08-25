"use client";

import { useEffect, useRef } from "react";

export function CelestialCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (canvasRef.current) {
        const { clientX, clientY } = e;
        canvasRef.current.style.setProperty("--x", `${clientX}px`);
        canvasRef.current.style.setProperty("--y", `${clientY}px`);
      }
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-screen w-screen"
      style={
        {
          "--x": "50vw",
          "--y": "50vh",

          // --- The Base Layers: Nebula & Starfield ---
          // They are always visible.
          background: `
            /* Layer 1: Parallax Stardust (Small) */
            radial-gradient(circle at 10% 20%, rgba(234, 234, 234, 0.08) 1px, transparent 1px),
            radial-gradient(circle at 80% 90%, rgba(234, 234, 234, 0.08) 1px, transparent 1px),
            /* Layer 2: Parallax Stardust (Medium) */
            radial-gradient(circle at 40% 50%, rgba(234, 234, 234, 0.06) 2px, transparent 2px),
            radial-gradient(circle at 90% 10%, rgba(234, 234, 234, 0.06) 2px, transparent 2px),
            /* Layer 3: The Living Nebula (Animated) */
            radial-gradient(ellipse at 20% 80%, rgba(0, 245, 212, 0.08), transparent 50%),
            radial-gradient(ellipse at 70% 10%, rgba(0, 245, 212, 0.08), transparent 50%)
          `,
          backgroundSize: `
            64px 64px,
            64px 64px,
            32px 32px,
            32px 32px,
            100% 100%,
            100% 100%
          `,
          // Apply the subtle pan animation to the nebula layers
          animation: "subtle-pan 120s linear infinite",
        } as React.CSSProperties
      }
    >
      {/* --- The Interactive Spotlight Layer --- */}
      {/* This div sits on top and creates the revealing effect. */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background: `
            radial-gradient(
              circle at var(--x) var(--y),
              transparent 0%,
              rgba(0, 0, 0, 0.95) 350px
            )
          `,
        }}
      />
    </div>
  );
}