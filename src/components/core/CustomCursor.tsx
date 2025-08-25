// src/components/core/CustomCursor.tsx
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const isFirstMove = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
      if (cursorRingRef.current) cursorRingRef.current.style.display = 'none';
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const mousePos = { x: 0, y: 0 };
    const previousMousePos = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };

    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.2, ease: "power3" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.2, ease: "power3" });
    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.6, ease: "power3" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.6, ease: "power3" });

    // --- UPGRADE: Re-engineered hover timeline for a wider, softer bloom effect ---
    const hoverTimeline = gsap.timeline({ paused: true })
      .to(ring, { 
        scale: 3, // "Wider"
        borderColor: 'rgba(0, 245, 212, 0.4)', // "Softer" border color
        boxShadow: '0 0 25px rgba(0, 245, 212, 0.5)', // Adds the soft glow
        duration: 0.4,
        ease: 'power3.out'
      })
      .to(dot, { opacity: 0, duration: 0.4, ease: 'power3.out' }, 0);
    
    const textTimeline = gsap.timeline({ paused: true })
      .to(ring, { scaleX: 2.5, scaleY: 0.4, duration: 0.3 })
      .to(dot, { opacity: 0, duration: 0.3 }, 0);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      if (isFirstMove.current) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        isFirstMove.current = false;
      }
    };

    const handleMouseDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const handleMouseUp = () => gsap.to(ring, { scale: 1, duration: 0.2 });

    const animate = () => {
      velocity.x = mousePos.x - previousMousePos.x;
      velocity.y = mousePos.y - previousMousePos.y;
      
      dotXTo(mousePos.x);
      dotYTo(mousePos.y);
      ringXTo(mousePos.x);
      ringYTo(mousePos.y);

      const speed = Math.sqrt(velocity.x**2 + velocity.y**2);
      const scale = gsap.utils.clamp(0, 0.3, speed / 200);
      const rotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
      
      gsap.set(ring, { scaleX: 1 + scale, scaleY: 1 - scale, rotation: rotation });

      previousMousePos.x = mousePos.x;
      previousMousePos.y = mousePos.y;
      requestAnimationFrame(animate);
    };

    const setupHoverListeners = () => {
      document.querySelectorAll('[data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => hoverTimeline.play());
        el.addEventListener('mouseleave', () => hoverTimeline.reverse());
      });
      document.querySelectorAll('[data-cursor-text]').forEach(el => {
        el.addEventListener('mouseenter', () => textTimeline.play());
        el.addEventListener('mouseleave', () => textTimeline.reverse());
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    setupHoverListeners();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[99999] opacity-0"
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-secondary rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[99999] opacity-0"
        style={{ transformOrigin: 'center center' }}
      />
    </>
  );
};

export default CustomCursor;