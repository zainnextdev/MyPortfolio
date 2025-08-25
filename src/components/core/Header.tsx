// src/components/core/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/contexts/ThemeContext';

// --- Configuration ---
const ZAIN_TIMEZONE = 'Asia/Karachi';
const SECTIONS = [
  { id: 'hero', name: 'Introduction' },
  { id: 'about', name: 'About' },
  { id: 'education', name: 'Academics' },
  { id: 'projects', name: 'Work' },
  { id: 'testimonials', name: 'Reviews' },
  { id: 'packages', name: 'Packages' },
  { id: 'contact', name: 'Contact' },
];

const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [userTime, setUserTime] = useState('--:--');
  const [zainTime, setZainTime] = useState('--:--');
  const [activeSection, setActiveSection] = useState('Introduction');
  const { theme } = useTheme();

  // --- Logic migrated from the old HUD component ---
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setUserTime(formatTime(now));
      const zainDate = new Date(now.toLocaleString('en-US', { timeZone: ZAIN_TIMEZONE }));
      setZainTime(formatTime(zainDate));
    };
    updateTimes();
    const intervalId = setInterval(updateTimes, 1000 * 30);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = SECTIONS[0].name;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(SECTIONS[i].id);
        if (sectionEl && sectionEl.getBoundingClientRect().top < window.innerHeight / 2) {
          currentSection = SECTIONS[i].name;
          break;
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, 
        { y: '-100%' }, 
        { y: '0%', duration: 1.2, ease: 'power3.out', delay: 1.8 }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);

  const openCommandPalette = () => {
    // Programmatically dispatch a Ctrl+K or Cmd+K event to open the palette
    document.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'k',
        ctrlKey: true,
        metaKey: true, // for macOS
        bubbles: true,
    }));
  };

  return (
    <header 
      ref={headerRef}
      className="hidden md:flex fixed top-0 left-0 w-full h-20 px-6 z-40 bg-background/50 backdrop-blur-lg border-b border-secondary/10"
    >
      <div className="flex items-center justify-between w-full">
        {/* --- Left Side: Brand Identity --- */}
        <div className="flex items-center gap-4">
          <a href="#hero" className="font-black text-xl tracking-wider text-primary" data-cursor-hover>ZK</a>
          <div className="w-px h-6 bg-secondary/20" />
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-3 h-3" aria-label="Online Status">
              <span className="absolute w-full h-full bg-accent rounded-full animate-ping opacity-75"></span>
              <span className="relative w-1.5 h-1.5 bg-accent rounded-full"></span>
            </div>
            <p className="text-sm text-secondary tracking-widest">AVAILABLE / LAHORE, PK</p>
          </div>
        </div>

        {/* --- Center: Contextual HUD Info --- */}
        <div className="flex items-center gap-6 text-sm">
          <div className="text-center">
            <p className="text-xs text-secondary tracking-widest">TIME (CLIENT / ZAIN)</p>
            <p className="font-mono font-medium">{userTime} / {zainTime}</p>
          </div>
          <div className="w-px h-6 bg-secondary/20" />
          <div className="text-center">
            <p className="text-xs text-secondary tracking-widest">CURRENT SECTION</p>
            <p className="font-medium tracking-wider">{activeSection}</p>
          </div>
          <div className="w-px h-6 bg-secondary/20" />
          <div className="text-center">
            <p className="text-xs text-secondary tracking-widest">ACTIVE THEME</p>
            <p className="font-medium tracking-wider capitalize">{theme}</p>
          </div>
        </div>

        {/* --- Right Side: Command Palette Trigger --- */}
        <button 
          onClick={openCommandPalette}
          className="group flex items-center gap-3 px-4 py-2 bg-surface/50 rounded-md border border-secondary/20 transition-all duration-300 hover:border-accent/80 hover:shadow-[0_0_15px_-5px_theme(colors.accent/50)]"
          data-cursor-hover
        >
          <span className="text-sm text-secondary group-hover:text-primary transition-colors">COMMANDS</span>
          <kbd className="font-sans text-xs bg-secondary/20 text-secondary px-1.5 py-0.5 rounded">Ctrl+K</kbd>
        </button>
      </div>
    </header>
  );
};

export default Header;