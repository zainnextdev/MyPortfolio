// src/hooks/useMediaQuery.ts -- NEW FILE

"use client";

import { useState, useEffect } from 'react';

/**
 * A client-side hook for tracking the state of a media query.
 * Handles server-side rendering gracefully by defaulting to `false`.
 * @param {string} query - The media query string to match (e.g., '(min-width: 768px)').
 * @returns {boolean} `true` if the query matches, otherwise `false`.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Update state if the media query match status changes
      const updateMatch = () => setMatches(media.matches);

      // Set the initial value
      updateMatch();
      
      // Add a listener for changes
      media.addEventListener('change', updateMatch);
      
      // Cleanup listener on component unmount
      return () => media.removeEventListener('change', updateMatch);
    }
  }, [query]);

  return matches;
};