// src/components/core/Navbar.tsx -- REVERTED TO CLEAN & CORRECT STATE

"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Home, Layers3, GraduationCap, LayoutGrid, MessageSquareQuote, ClipboardCheck, ArrowUpRight, ChevronDown, X } from 'lucide-react';

// GSAP plugins are registered in SmoothScroller now, but it's safe to keep them here.
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navItems = [
  { id: 'hero', label: 'Home', icon: <Home size={22} /> },
  { id: 'about', label: 'About & Skills', icon: <Layers3 size={22} /> },
  { id: 'education', label: 'Academic Journey', icon: <GraduationCap size={22} /> },
  { id: 'projects', label: 'Curated Work', icon: <LayoutGrid size={22} /> },
  { id: 'testimonials', label: 'Client Reviews', icon: <MessageSquareQuote size={22} /> },
  { id: 'packages', label: 'My Packages', icon: <ClipboardCheck size={22} /> },
  { id: 'contact', label: 'Contact', icon: <ArrowUpRight size={22} /> },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const desktopNavRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsHidden(currentScrollY > 100 && currentScrollY > lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.to(mobileNavRef.current, { y: isHidden ? '-100%' : '0%', duration: 0.4, ease: 'power3.inOut' });
  }, [isHidden]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(desktopNavRef.current, { x: '-100%' }, { x: '0%', duration: 1, ease: 'power3.out', delay: 1.5 });

      // After a short delay for lazy-loaded components to mount...
      const setupTriggersTimeout = setTimeout(() => {
        const triggers = navItems.map(item =>
          ScrollTrigger.create({
            trigger: `#${item.id}`,
            start: 'top center',
            end: 'bottom center',
            onToggle: self => {
              if (self.isActive) {
                setActiveSection(item.id);
              }
            },
          })
        );
        
        // Refresh is still a good practice after dynamic content loads.
        ScrollTrigger.refresh();

        // Cleanup function for when the component unmounts
        return () => {
          triggers.forEach(trigger => trigger.kill());
        };
      }, 500);

      // Main cleanup for the timeout
      return () => clearTimeout(setupTriggersTimeout);
    });

    return () => ctx.revert();
  }, []);

  // Mobile menu logic remains unchanged
  useEffect(() => {
    const menuItems = gsap.utils.toArray('.mobile-nav-item');
    menuTimeline.current = gsap.timeline({ paused: true })
      .to(dropdownRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power3.inOut' })
      .fromTo(menuItems, { opacity: 0, y: 15 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: 'power2.out' }, "-=0.3");
  }, []);

  useEffect(() => {
    if (isMenuOpen) menuTimeline.current?.play();
    else menuTimeline.current?.reverse();
  }, [isMenuOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMenuOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    // Lenis handles the smooth scroll, so we just tell it where to go.
    gsap.to(window, { duration: 1.8, scrollTo: { y: `#${sectionId}`, offsetY: 0 }, ease: 'power3.inOut' });
  };

  return (
    <>
      <nav ref={desktopNavRef} className="hidden md:flex fixed top-0 left-0 h-screen w-20 items-center justify-center z-50">
          <div className="relative flex items-center justify-center h-auto py-6 backdrop-blur-md rounded-full"><ul className="flex flex-col items-center justify-center gap-6">{navItems.map(item => (<li key={item.id}><button onClick={() => handleNavClick(item.id)} className="group relative flex items-center justify-center h-12 w-12" aria-label={`Go to ${item.label} section`} data-cursor-hover><span className={`absolute inset-0 rounded-full border border-accent transition-all duration-300 ease-in-out ${activeSection === item.id ? 'opacity-100 scale-100 shadow-[0_0_15px_-3px_theme(colors.accent)]' : 'opacity-0 scale-125'}`} /><div className={`transition-colors duration-300 ${activeSection === item.id ? 'text-accent' : 'text-secondary group-hover:text-primary'}`}>{item.icon}</div><div className="absolute left-full ml-4 pointer-events-none"><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-surface px-3 py-1.5 text-primary rounded-md shadow-lg text-sm tracking-wider -translate-x-4 group-hover:translate-x-0">{item.label}</span></div></button></li>))}</ul></div>
      </nav>
      <div className="md:hidden fixed top-0 left-0 w-full z-50">
        <nav ref={mobileNavRef} className={`relative z-10 h-20 px-6 flex items-center justify-between transition-colors duration-300 ${isScrolled ? 'bg-background/50 backdrop-blur-lg border-b border-secondary/10' : 'bg-transparent border-b border-transparent'}`}>
          <button onClick={() => handleNavClick('hero')} data-cursor-hover className="font-black text-xl tracking-wider text-primary">ZK</button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} data-cursor-hover aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} className="text-primary" /> : <ChevronDown size={28} className={`text-primary transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />}
          </button>
        </nav>
        <div ref={dropdownRef} className="absolute top-full left-0 w-full bg-background/60 backdrop-blur-xl border-b border-secondary/10 overflow-hidden" style={{ clipPath: 'inset(0% 0% 100% 0%)' }}>
          <ul className="flex flex-col items-center gap-2 py-6">{navItems.filter(item => item.id !== 'hero').map(item => (<li key={item.id} className="mobile-nav-item w-full"><button onClick={() => handleNavClick(item.id)} className="w-full text-center py-4 text-secondary hover:text-primary text-xl font-light tracking-widest transition-colors duration-300">{item.label}</button></li>))}</ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;