// src/components/core/ClientEffectsWrapper.tsx -- NEW FILE

"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import CustomCursor from "@/components/core/CustomCursor";
import { CelestialCanvas } from "@/components/core/CelestialCanvas";

export default function ClientEffectsWrapper() {
  // We'll consider "desktop" to be screens wider than 1024px.
  // This is a common breakpoint where devices have both the screen real estate
  // and the processing power for these effects.
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Only render these expensive components on the client side for desktop users.
  // For mobile users, this component renders nothing, saving massive resources.
  if (isDesktop) {
    return (
      <>
        <CelestialCanvas />
        <CustomCursor />
      </>
    );
  }

  // Return null for non-desktop environments
  return null;
}