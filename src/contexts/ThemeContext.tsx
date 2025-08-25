// src/contexts/ThemeContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';

type Theme = 'obsidian' | 'marble' | 'blueprint';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('obsidian');
  const transitionOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On initial load, try to get the theme from localStorage.
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
    if (savedTheme && ['obsidian', 'marble', 'blueprint'].includes(savedTheme)) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setThemeState(savedTheme);
    } else {
      // Set default if nothing is saved
      document.documentElement.setAttribute('data-theme', 'obsidian');
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    if (newTheme === theme) return;

    const overlay = transitionOverlayRef.current;
    if (!overlay) return;
    
    // 1. Get the background color of the CURRENT theme
    const currentBg = getComputedStyle(document.documentElement).getPropertyValue('--color-background');
    overlay.style.backgroundColor = `rgb(${currentBg})`;

    gsap.timeline()
      .set(overlay, { autoAlpha: 1 }) // Make the overlay visible (covering the old theme)
      .call(() => {
        // 2. Instantly switch the theme underneath the overlay
        document.documentElement.setAttribute('data-theme', newTheme);
        setThemeState(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
      })
      .to(overlay, { 
        autoAlpha: 0, 
        duration: 1.2, // The duration of the cross-fade
        ease: 'power3.inOut' 
      });

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
      {/* The transition overlay div */}
      <div
        ref={transitionOverlayRef}
        className="fixed inset-0 z-[10000] pointer-events-none"
        style={{ opacity: 0 }}
      />
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};