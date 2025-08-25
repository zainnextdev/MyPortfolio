// src/components/core/ResumeViewer.tsx
"use client";

import React, { useEffect, useRef, useState, MouseEvent, WheelEvent } from 'react';
import gsap from 'gsap';
import { X, Download, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';
import { stopLenis, startLenis } from './SmoothScroller';

interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- UPGRADE: The definitive aspect ratio of your résumé for perfect framing ---
const RESUME_ASPECT_RATIO = 210 / 297; // A4 paper standard

const ResumeViewer: React.FC<ResumeViewerProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const uiElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeline = useRef<gsap.core.Timeline>(null);

  const transform = useRef({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = '/zain-khalid-resume.pdf';
    link.setAttribute('download', 'Zain-Khalid-Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- REFINED INTERACTIVITY LOGIC FOR PERFECT ASPECT RATIO ---

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!imageContainerRef.current) return;

    const { clientX, clientY, deltaY } = e;
    
    // --- SIMPLIFIED & CORRECTED LOGIC ---
    // Since the container now perfectly matches the image ratio, the letterbox calculation is no longer needed.
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (clientX - rect.left) / transform.current.scale;
    const mouseY = (clientY - rect.top) / transform.current.scale;

    const scaleAmount = -deltaY * 0.001;
    const newScale = gsap.utils.clamp(0.5, 4, transform.current.scale + scaleAmount);

    // Apply the zoom-to-point formula
    const newX = mouseX - (mouseX - transform.current.x) * (newScale / transform.current.scale);
    const newY = mouseY - (mouseY - transform.current.y) * (newScale / transform.current.scale);
    
    transform.current = { scale: newScale, x: newX, y: newY };

    gsap.to(imageContainerRef.current, {
      ...transform.current,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsPanning(true);
    startPos.current = { 
      x: e.clientX - transform.current.x, 
      y: e.clientY - transform.current.y 
    };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isPanning || !imageContainerRef.current) return;
    e.preventDefault();
    transform.current.x = e.clientX - startPos.current.x;
    transform.current.y = e.clientY - startPos.current.y;
    gsap.set(imageContainerRef.current, { x: transform.current.x, y: transform.current.y });
  };

  const handleMouseUpOrLeave = () => setIsPanning(false);

  const zoom = (direction: 'in' | 'out') => {
    const newScale = gsap.utils.clamp(0.5, 4, transform.current.scale + (direction === 'in' ? 0.3 : -0.3));
    gsap.to(imageContainerRef.current, { scale: newScale, duration: 0.3, ease: 'power3.out' });
    transform.current.scale = newScale;
  };
  
  const resetTransform = () => {
    transform.current = { x: 0, y: 0, scale: 1 };
    gsap.to(imageContainerRef.current, { x: 0, y: 0, scale: 1, duration: 0.4, ease: 'power3.inOut' });
  };


  // --- ANIMATION & LIFECYCLE LOGIC ---

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true })
      .to(overlayRef.current, { autoAlpha: 1, duration: 0.4, ease: 'power2.inOut' })
      .fromTo(cardRef.current, { y: '5vh', scale: 0.95, autoAlpha: 0 }, { y: '0vh', scale: 1, autoAlpha: 1, duration: 0.5, ease: 'power3.out' }, "-=0.2")
      .fromTo(uiElementsRef.current, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' }, "-=0.3");
  }, []);

  useEffect(() => {
    if (isOpen) {
      stopLenis();
      document.body.style.overflow = 'hidden';
      timeline.current?.play();
    } else {
      resetTransform();
      timeline.current?.reverse().eventCallback("onReverseComplete", () => {
        startLenis();
        document.body.style.overflow = '';
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (isOpen && event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-background/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      style={{ visibility: 'hidden' }}
      onClick={onClose}
      data-force-hide-cursor
    >
      {/* --- UPGRADE: The card now uses CSS aspect-ratio for a perfect, responsive fit --- */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[calc(90vh*var(--resume-aspect-ratio))] max-h-[90vh] bg-surface/80 backdrop-blur-xl border border-secondary/10 rounded-xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
        style={{ 
          visibility: 'hidden',
          '--resume-aspect-ratio': RESUME_ASPECT_RATIO,
          aspectRatio: 'var(--resume-aspect-ratio)'
        } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={el => {uiElementsRef.current[0] = el}}
          className="flex-shrink-0 flex justify-between items-center px-6 py-4 border-b border-secondary/10"
        >
          <h3 className="text-lg font-semibold text-primary tracking-wider">Zain Khalid - Résumé</h3>
          <div className="flex items-center gap-2">
            <button onClick={handleDownload} className="group flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:text-primary bg-surface/50 rounded-md border border-secondary/20 transition-colors duration-300" data-cursor-hover>
              <Download size={16} /> <span>Download PDF</span>
            </button>
            <button onClick={onClose} className="p-2 text-secondary hover:text-primary transition-colors duration-300 rounded-full" data-cursor-hover aria-label="Close">
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div
          className="flex-grow bg-black/20 relative overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          ref={el => {uiElementsRef.current[1] = el}}
        >
          <div
            ref={imageContainerRef}
            className={`w-full h-full ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              backgroundImage: `url('/zain-khalid-resume.png')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transformOrigin: '0 0', // Critical for correct GSAP transforms
              willChange: 'transform'
            }}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-surface/50 backdrop-blur-sm p-1.5 rounded-lg border border-secondary/10">
              <button onClick={() => zoom('out')} data-cursor-hover className="p-2 text-secondary hover:text-primary rounded-md transition-colors"><ZoomOut size={20}/></button>
              <button onClick={() => zoom('in')} data-cursor-hover className="p-2 text-secondary hover:text-primary rounded-md transition-colors"><ZoomIn size={20}/></button>
              <button onClick={resetTransform} data-cursor-hover className="p-2 text-secondary hover:text-primary rounded-md transition-colors"><RefreshCw size={20}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;