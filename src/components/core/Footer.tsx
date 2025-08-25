// src/components/core/Footer.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedinIn, FaDiscord, FaInstagram, FaFacebookF } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// --- MODIFIED: Twitter has been removed ---
const socialLinks = [
  { href: 'https://github.com/zainnextdev', label: 'GitHub', icon: <FaGithub size={18} /> },
  { href: 'https://www.linkedin.com/in/zain-khalid-dev/', label: 'LinkedIn', icon: <FaLinkedinIn size={18} /> },
  { href: 'https://discord.com/channels/1409482646089633794/1409482646718910468', label: 'Discord', icon: <FaDiscord size={18} /> },
  { href: 'https://www.instagram.com/zain.khalid__/', label: 'Instagram', icon: <FaInstagram size={18} /> },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom', // Start animation as soon as the footer enters the viewport
          toggleActions: 'play none none reverse',
        }
      });

      // --- NEW, "INSANE" ANIMATION SEQUENCE ---
      // 1. The container fades in to avoid a hard pop
      tl.fromTo(footerRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 });
      
      // 2. The line draws itself from the center outwards
      tl.fromTo('.footer-line', 
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.out' },
        0.2 // Starts shortly after the fade-in
      );
      
      // 3. The content reveals with a subtle stagger, creating a feeling of precision
      tl.fromTo('.footer-content',
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' },
        "-=0.8" // Overlaps with the line draw for a seamless effect
      );

    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative invisible py-8 px-4 sm:px-6 lg:px-8"
      data-force-hide-cursor
    >
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="footer-line absolute top-1/2 left-0 w-full h-px bg-secondary/20 origin-center" />
        
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <p className="footer-content text-secondary text-sm tracking-wider">
            &copy; {new Date().getFullYear()} Zain Khalid. Digital Architect.
          </p>

          <div className="footer-content flex items-center gap-3">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                data-cursor-hover
                className="group w-10 h-10 flex items-center justify-center bg-transparent border border-secondary/20 rounded-full transition-all duration-300 ease-in-out hover:border-accent/80 hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_theme(colors.accent/10)]"
              >
                <div className="text-secondary group-hover:text-accent transition-colors duration-300">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;