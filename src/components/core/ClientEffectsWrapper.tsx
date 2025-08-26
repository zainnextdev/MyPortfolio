// src/components/core/ClientEffectsWrapper.tsx -- ENHANCED FOR ACCESSIBILITY

"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import CustomCursor from "@/components/core/CustomCursor";
import { CelestialCanvas } from "@/components/core/CelestialCanvas";

export default function ClientEffectsWrapper() {
  // --- ACCESSIBILITY UPGRADE ---
  // We now check for three conditions:
  // 1. Is the user on a desktop-sized screen?
  // 2. Does their device support fine pointing (i.e., a mouse, not a touch screen)?
  // 3. Has the user NOT requested reduced motion in their OS settings?

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const hasFinePointer = useMediaQuery('(pointer: fine)');

  // Only render the full effects if all conditions are met.
  const shouldRenderEffects = isDesktop && hasFinePointer && !prefersReducedMotion;

  if (shouldRenderEffects) {
    return (
      <>
        <CelestialCanvas />
        <CustomCursor />
      </>
    );
  }

  return null;
}