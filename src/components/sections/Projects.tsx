// src/components/sections/Projects.tsx -- MODIFIED WITH will-change

"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PremiumImageDisplay from '@/components/core/PremiumImageDisplay';
import ProjectNavigation from '@/components/core/ProjectNavigation';
import { projectsData } from '@/lib/data';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const detailsContainerRef = useRef<HTMLDivElement>(null);

  const activeProject = projectsData[activeIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
            }
        });
        tl.fromTo('.project-title-reveal', { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' })
          .fromTo('.project-content-reveal', { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6');
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  useEffect(() => {
    if (!detailsContainerRef.current || !imageContainerRef.current) return;
    const textElements = gsap.utils.toArray(detailsContainerRef.current.querySelectorAll('.animate-in'));
    gsap.set(textElements, { y: 30, opacity: 0 });
    gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.98 });

    const tl = gsap.timeline({ onComplete: () => setIsAnimating(false) });
    tl.to(imageContainerRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' })
      .to(textElements, { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' }, "-=0.4");
  }, [activeIndex]);

  const handleNavigation = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    if (!detailsContainerRef.current || !imageContainerRef.current) return;
    setIsAnimating(true);

    const newIndex = direction === 'next'
      ? (activeIndex + 1) % projectsData.length
      : (activeIndex - 1 + projectsData.length) % projectsData.length;
      
    const textElements = gsap.utils.toArray(detailsContainerRef.current.querySelectorAll('.animate-in'));

    const tl = gsap.timeline({ onComplete: () => setActiveIndex(newIndex) });
    tl.to(textElements, { y: -30, opacity: 0, stagger: 0.05, duration: 0.4, ease: 'power2.in' })
      .to(imageContainerRef.current, { opacity: 0, scale: 0.98, duration: 0.4, ease: 'power2.in' }, "<");
  };

  return (
    <section id="projects" ref={sectionRef} className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col items-center">
        <h2 className="project-title-reveal text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16 md:mb-20 invisible" data-cursor-text>
          Curated Work
        </h2>
        <div className="project-content-reveal grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center w-full invisible">
          {/* --- OPTIMIZATION APPLIED HERE --- */}
          <div ref={imageContainerRef} className="relative h-[250px] sm:h-[350px] md:h-[500px] w-full will-change-transform">
            <PremiumImageDisplay
              key={activeProject.id}
              imageUrl={activeProject.image}
              liveSiteUrl={activeProject.liveSiteUrl}
            />
          </div>
          
          {/* --- OPTIMIZATION APPLIED HERE --- */}
          <div ref={detailsContainerRef} className="flex flex-col justify-center will-change-transform">
            <div>
              <h3 className="animate-in text-2xl sm:text-3xl font-bold tracking-tight text-primary mb-3" data-cursor-text>{activeProject.title}</h3>
              <p className="animate-in text-accent font-semibold tracking-wide mb-6">{activeProject.tagline}</p>
              <p className="animate-in text-secondary leading-relaxed mb-8">{activeProject.description}</p>
              <h4 className="animate-in text-lg font-semibold text-primary/90 mb-4">Core Features</h4>
              <ul className="animate-in grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8 text-secondary/90">
                  {activeProject.features.slice(0, 6).map((feature: string) => (
                      <li key={feature} className="flex items-start">
                          <span className="text-accent mr-2 mt-1">&#8227;</span>
                          <span>{feature}</span>
                      </li>
                  ))}
              </ul>
              <h4 className="animate-in text-lg font-semibold text-primary/90 mb-4">Tech Stack</h4>
              <div className="animate-in flex flex-wrap gap-2">
                {activeProject.stack.map((tech: string) => (
                  <span key={tech} className="bg-surface/80 border border-secondary/10 text-secondary/90 text-sm px-3 py-1 rounded-full">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="project-content-reveal mt-16 md:mt-20 invisible">
          <ProjectNavigation 
            onPrev={() => handleNavigation('prev')}
            onNext={() => handleNavigation('next')}
            currentIndex={activeIndex}
            totalCount={projectsData.length}
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;