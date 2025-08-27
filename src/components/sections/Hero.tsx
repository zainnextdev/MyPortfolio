// src/components/sections/Hero.tsx

"use client";

import React, { useEffect, useRef } from 'react';
import { IcosahedronScene } from '@/components/core/IcosahedronScene';
import PremiumScrollIndicator from '@/components/core/PremiumScrollIndicator';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { GridBackground } from '../core/GridBackground';
import { HeroBackground } from '../core/HeroBackground';
// --- Step 2.1: Import the new custom hook ---
import { useIsWebKit } from '@/hooks/useIsWebKit';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero = () => {
  const componentRef = useRef(null);
  
  // --- Refs for different rendering paths ---
  const firefoxTitleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const webkitTitleRef = useRef<HTMLHeadingElement>(null);

  const titleCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const buttonRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const icosahedronRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // --- Step 2.2: Instantiate the hook ---
  const isWebKit = useIsWebKit();

  const nameText = "Zain Khalid";
  const titleText = "Full-Stack Developer & Designer";

  useEffect(() => {
    // This effect now depends on `isWebKit` to choose the correct animation target.
    // It will only run once on the client after the hook has determined the browser.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(icosahedronRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power3.out' });
      tl.fromTo(parallaxRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power3.out' }, "-=1.2");

      // --- Step 2.3: Conditional Animation Logic ---
      if (isWebKit) {
        // GUARANTEED WEBKIT ANIMATION: Use a clip-path reveal on the solid element.
        tl.fromTo(webkitTitleRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.out' },
          "-=0.8"
        );
      } else {
        // ORIGINAL FIREFOX ANIMATION: Stagger the individual characters.
        tl.fromTo(firefoxTitleCharsRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.04 },
          "-=0.8"
        );
      }
      
      // The rest of the timeline remains the same
      tl.fromTo(titleCharsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.02 }, "-=0.6");
      tl.fromTo(buttonRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, "-=0.3");
      tl.fromTo(scrollIndicatorRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, "-=0.3");

      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        scrollTrigger: { trigger: componentRef.current, start: 'top top', end: '+=150', scrub: true },
      });

    }, componentRef);
    return () => ctx.revert();
  }, [isWebKit]); // Dependency array ensures animation runs after browser detection

  const handleExploreClick = () => {
    gsap.to(window, { duration: 1.5, scrollTo: { y: "#about", offsetY: 70 }, ease: "power3.inOut" });
  };

  const titleClasses = "text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-fill-transparent bg-[length:200%_auto] animate-sheen drop-shadow-[0_0_10px_rgba(0,245,212,0.5)]";

  return (
    <header ref={componentRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div ref={parallaxRef} className="pointer-events-none fixed inset-0 -z-10 opacity-0">
        <GridBackground />
      </div>
      <HeroBackground />
      <div ref={icosahedronRef} className="opacity-0"><IcosahedronScene /></div>
      
      {/* --- Step 2.4: Conditional Rendering of the Title --- */}
      {isWebKit ? (
        // RENDER PATH 1: For Chrome, Safari, Edge, etc.
        // Renders the text as a single node. The ref is attached here.
        <h1 ref={webkitTitleRef} className={titleClasses} style={{ clipPath: 'inset(0 100% 0 0)' }}>
          {nameText}
        </h1>
      ) : (
        // RENDER PATH 2: For Firefox and other browsers.
        // Renders individual spans for character animation.
        <h1 className={titleClasses}>
          {nameText.split('').map((char, index) => (
            <span key={index} ref={el => { firefoxTitleCharsRef.current[index] = el }} className="inline-block" style={{ opacity: 0, transform: "translateY(100px)" }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
      )}
      
      {/* The rest of the component remains unchanged */}
      <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-secondary tracking-[0.2em] md:tracking-[0.3em] uppercase" data-cursor-text>
        {titleText.split('').map((char, index) => (
          <span key={index} ref={el => { titleCharsRef.current[index] = el }} className="inline-block" style={{ opacity: 0, transform: "translateY(20px)" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
      
      <div ref={buttonRef} className="mt-12 opacity-0">
        <button onClick={handleExploreClick} data-cursor-hover className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-primary rounded-lg group bg-gradient-to-br from-accent to-accent-hover focus:ring-4 focus:outline-none focus:ring-cyan-800">
            <span className="relative px-8 py-3 transition-all ease-in duration-150 bg-background rounded-md group-hover:bg-opacity-0">
                EXPLORE
            </span>
        </button>
      </div>

       <div ref={scrollIndicatorRef} className="absolute bottom-10 md:bottom-28 left-1/2 -translate-x-1/2 opacity-0">
        <PremiumScrollIndicator />
      </div>
    </header>
  );
};

export default Hero;