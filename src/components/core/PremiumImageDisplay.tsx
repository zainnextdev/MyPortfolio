// src/components/core/PremiumImageDisplay.tsx
"client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

interface PremiumImageDisplayProps {
  imageUrl: string;
  liveSiteUrl?: string; // The URL is now optional
}

const PremiumImageDisplay: React.FC<PremiumImageDisplayProps> = ({ imageUrl, liveSiteUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const ctaRefs = {
    corners: useRef<(HTMLDivElement | null)[]>([]),
    text: useRef<HTMLSpanElement>(null)
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- The Immersive Parallax Effect (runs for all projects) ---
    const imageXTo = gsap.quickTo(imageContainerRef.current, "x", { duration: 0.8, ease: "power3.out" });
    const imageYTo = gsap.quickTo(imageContainerRef.current, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const xPercent = (x / width - 0.5) * 2;
      const yPercent = (y / height - 0.5) * 2;
      
      imageXTo(xPercent * 20);
      imageYTo(yPercent * 15);
    };

    container.addEventListener('mousemove', handleMouseMove);

    // --- The Conditional Hover Animation (only runs if there's a link) ---
    if (liveSiteUrl) {
      const [topLeft, topRight, bottomLeft, bottomRight] = ctaRefs.corners.current;
      const hoverTimeline = gsap.timeline({ paused: true })
        .to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.inOut' })
        .fromTo([topLeft, bottomRight], { '--scale-x': 0, '--scale-y': 0 }, { '--scale-x': 1, '--scale-y': 1, duration: 0.5, ease: 'power3.out' }, 0.1)
        .fromTo([topRight, bottomLeft], { '--scale-x': 0, '--scale-y': 0 }, { '--scale-x': 1, '--scale-y': 1, duration: 0.5, ease: 'power3.out' }, 0.2)
        .fromTo(ctaRefs.text.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.3);

      const handleMouseEnter = () => hoverTimeline.play();
      const handleMouseLeave = () => hoverTimeline.reverse();
    
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
    
    // Cleanup for non-linked projects
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [liveSiteUrl]);

  const displayContent = (
    <div
      ref={imageContainerRef}
      className="absolute inset-[-5%] w-[110%] h-[110%]"
    >
      <Image
        src={imageUrl}
        alt="Project Screenshot"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        className="object-cover transition-filter duration-500 ease-out group-hover:brightness-50"
      />
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="group relative block w-full h-full rounded-lg overflow-hidden shadow-2xl shadow-black/60 will-change-transform"
    >
      {displayContent}
      
      {/* --- CONDITIONAL RENDERING BLOCK --- */}
      {/* The entire interactive overlay is only rendered if a liveSiteUrl exists. */}
      {liveSiteUrl && (
        <a
          href={liveSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          data-cursor-hover
          aria-label="View live site"
        >
          <div
            ref={overlayRef}
            className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/30 backdrop-blur-sm"
          >
            <div className="relative w-[90%] h-[90%] flex items-center justify-center">
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
                <div
                  key={pos}
                  ref={el => {ctaRefs.corners.current.push(el)}}
                  className={`absolute w-12 h-12 before:absolute before:bg-accent after:absolute after:bg-accent 
                    ${pos === 'top-left' ? 'top-0 left-0 before:w-full before:h-px after:w-px after:h-full' : ''}
                    ${pos === 'top-right' ? 'top-0 right-0 before:w-full before:h-px after:w-px after:h-full before:origin-right after:origin-top' : ''}
                    ${pos === 'bottom-left' ? 'bottom-0 left-0 before:w-full before:h-px after:w-px after:h-full before:origin-left after:origin-bottom' : ''}
                    ${pos === 'bottom-right' ? 'bottom-0 right-0 before:w-full before:h-px after:w-px after:h-full before:origin-right after:origin-bottom' : ''}
                  `}
                  style={{ transform: 'scaleX(var(--scale-x, 0)) scaleY(var(--scale-y, 0))', transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' }}
                />
              ))}
              <span ref={ctaRefs.text} className="flex items-center gap-3 text-primary text-lg font-semibold tracking-wider opacity-0">
                View Project
                <ArrowUpRight />
              </span>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default PremiumImageDisplay;