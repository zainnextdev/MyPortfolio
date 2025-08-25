"use client";

import { useEffect, useRef } from "react";

export function GridBackground() {
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

    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 -z-10 h-screen w-screen"
      style={
        {
          "--x": "50vw",
          "--y": "50vh",
          "--size": "100px", // Size of the grid cells
          "--color": "rgba(136, 136, 136, 0.1)", // Color of the grid lines (secondary color with low opacity)
          background: `
           radial-gradient(circle at var(--x) var(--y), rgba(0, 245, 212, 0.1), transparent 15%),
  linear-gradient(to right, var(--color) 1px, transparent 1px),
  linear-gradient(to bottom, var(--color) 1px, transparent 1px)
`,
          backgroundSize: `
            100% 100%,
            var(--size) var(--size),
            var(--size) var(--size)
          `,
        } as React.CSSProperties
      }
    />
  );
}