"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PremiumScrollIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGRectElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // GSAP animation for the inner line
    gsap.to(lineRef.current, {
      y: 20,
      duration: 1.5,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });

    // --- Intelligent Presence Logic ---
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        // Only show if user is at the top of the page
        if (window.scrollY < 10) {
          setIsVisible(true);
        }
      }, 5000); // 5-second inactivity timer
    };

    const handleActivity = () => {
      setIsVisible(false);
      resetTimer();
    };

    // Initial timer start
    resetTimer();

    window.addEventListener('scroll', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, []);

  useEffect(() => {
    // Handle fade in/out animation
    gsap.to(indicatorRef.current, {
      autoAlpha: isVisible ? 1 : 0,
      duration: 0.5,
      ease: 'power3.out',
    });
  }, [isVisible]);

  return (
    // The component is always in the DOM, but visibility is controlled by GSAP
    <div ref={indicatorRef} className="opacity-0 invisible" data-cursor-hover>
      <svg
        width="28"
        height="48"
        viewBox="0 0 28 48"
        fill="none"
        xmlns="http://www.w.org/2000/svg"
        className="stroke-secondary hover:stroke-primary transition-colors duration-300"
      >
        {/* The sleek, techy outline */}
        <rect x="1" y="1" width="26" height="46" rx="13" strokeWidth="1.5" />
        {/* The kinetic, animated inner line */}
        <rect ref={lineRef} x="12.5" y="10" width="3" height="8" rx="1.5" fill="currentColor" className="stroke-none text-secondary group-hover:text-primary transition-colors duration-300" />
      </svg>
    </div>
  );
};

export default PremiumScrollIndicator;