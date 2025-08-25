// src/hooks/useIsWebKit.ts
"use client";

import { useState, useEffect } from 'react';

/**
 * A client-side hook to determine if the browser is using the WebKit/Blink rendering engine.
 * Handles server-side rendering by defaulting to `false`.
 * @returns {boolean} `true` if the browser is WebKit-based (Chrome, Safari, Edge, etc.), otherwise `false`.
 */
export const useIsWebKit = () => {
  const [isWebKit, setIsWebKit] = useState(false);

  useEffect(() => {
    // This check is robust for identifying Chrome, Safari, and modern Edge/Opera,
    // while correctly excluding Firefox. 'InstallTrigger' is a Firefox-specific property.
    const isFirefox = typeof (window as any).InstallTrigger !== 'undefined';
    if (!isFirefox) {
      setIsWebKit(true);
    }
  }, []);

  return isWebKit;
};