"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

// --- DATA (Ensure your icons exist in /public/icons/) ---
const skillsData = [
  {
    title: "Core Stack",
    skills: [
      { name: "Next.js", iconPath: "/icons/nextjs.png" },
      { name: "React.js", iconPath: "/icons/react.png" },
      { name: "TypeScript", iconPath: "/icons/typescript.png" },
      { name: "Three.js", iconPath: "/icons/threejs.png" },
      { name: "PostgreSQL", iconPath: "/icons/postgresql.png" },
    ],
  },
  {
    title: "Composable Services",
    skills: [
      { name: "Supabase", iconPath: "/icons/supabase.png" },
      { name: "Clerk (Auth)", iconPath: "/icons/clerk.png" },
      { name: "Prisma ORM", iconPath: "/icons/prisma.png" },
      { name: "Cloudinary", iconPath: "/icons/cloudinary.png" },
      { name: "Neon (Postgres)", iconPath: "/icons/neon.png" },
    ],
  },
  {
    title: "Styling & Animation",
    skills: [
      { name: "Tailwind CSS", iconPath: "/icons/tailwind.png" },
      { name: "AntD / MUI", iconPath: "/icons/antdesign.png" },
      { name: "SCSS", iconPath: "/icons/sass.png" },
      { name: "Framer Motion", iconPath: "/icons/framer.png" },
      { name: "GSAP", iconPath: "/icons/gsap.png" },
    ],
  },
  {
    title: "Other Expertise",
    skills: [
      { name: "C++", iconPath: "/icons/cpp.png" },
      { name: "Python", iconPath: "/icons/python.png" },
      { name: "Performance & SEO", iconPath: "/icons/seo.png" },
      { name: "Vercel & CI/CD", iconPath: "/icons/vercel.png" },
      { name: "Digital Marketing", iconPath: "/icons/marketing.png" },
    ],
  },
];

const ORBIT_RADIUS = 140;
const ICON_CONTAINER_SIZE = 72;
const ICON_IMAGE_SIZE = 42;
const CYCLE_INTERVAL = 5000;

const SkillOrb = () => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const orbRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const currentSkillSet = skillsData[currentSetIndex];

  const iconPositions = useMemo(() => {
    const positions = [];
    const numIcons = currentSkillSet.skills.length;
    const angleStep = (2 * Math.PI) / numIcons;
    for (let i = 0; i < numIcons; i++) {
      positions.push({ rotation: (i * angleStep * 180) / Math.PI });
    }
    return positions;
  }, [currentSkillSet]);

  useEffect(() => {
    gsap.fromTo(".center-icon-container", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)', delay: 1.5 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // THE FIX for Title Flash: GSAP now fully controls the text content during the animation.
      tl.to(titleRef.current, { opacity: 0, y: -15, duration: 0.3, ease: 'power2.in' })
       .set(titleRef.current, { innerText: currentSkillSet.title })
       .to(titleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      
      tl.fromTo(".spoke", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.75)', stagger: 0.1 }, 0.2);
    }, orbRef);
    return () => ctx.revert();
  }, [currentSetIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(".spoke", {
        scale: 0, opacity: 0, duration: 0.5, ease: 'back.in(1.7)', stagger: 0.05,
        onComplete: () => setCurrentSetIndex(prev => (prev + 1) % skillsData.length)
      });
    }, CYCLE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={orbRef} className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: ORBIT_RADIUS * 2 + ICON_CONTAINER_SIZE, height: ORBIT_RADIUS * 2 + ICON_CONTAINER_SIZE }}>
        
        {/* --- Center Icon with WIDER, SOFTER Multi-Layer Bloom --- */}
        <div className="center-icon-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative flex items-center justify-center group">
            <div className="absolute -inset-6 bg-accent/10 rounded-full blur-3xl group-hover:blur-4xl transition-all duration-500 ease-in-out" />
            <div className="absolute -inset-2 bg-accent/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 ease-in-out" />
            <div 
              className="relative bg-background/60 backdrop-blur-md rounded-full flex items-center justify-center border border-secondary/20"
              style={{ width: ICON_CONTAINER_SIZE, height: ICON_CONTAINER_SIZE }}
            >
              <Image src="/icons/logo.png" alt="Zain Khalid Logo" width={ICON_IMAGE_SIZE} height={ICON_IMAGE_SIZE} className="opacity-90" />
            </div>
          </div>
        </div>

        {/* --- Re-architected Spokes (Perfectly Layered & Aligned) --- */}
        {iconPositions.map((pos, index) => (
          <div
            key={`spoke-${currentSkillSet.title}-${index}`}
            className="spoke absolute top-1/2 left-1/2 origin-left z-0" // THE FIX: z-0 ensures lines are behind the z-10 center icon
            style={{ transform: `rotate(${pos.rotation}deg)` }}
          >
            <div className="relative flex items-center" style={{ width: ORBIT_RADIUS }}>
              <div className="w-full h-px bg-gradient-to-r from-secondary/50 to-transparent" />
              <div
                className="absolute right-0 bg-background/60 backdrop-blur-md rounded-full flex items-center justify-center border border-secondary/10"
                style={{
                  width: ICON_CONTAINER_SIZE, height: ICON_CONTAINER_SIZE,
                  transform: `translateX(50%) rotate(-${pos.rotation}deg)`,
                }}
              >
                <Image src={currentSkillSet.skills[index].iconPath} alt={currentSkillSet.skills[index].name} width={ICON_IMAGE_SIZE} height={ICON_IMAGE_SIZE} className="opacity-90" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-secondary font-medium tracking-widest uppercase text-sm h-6 flex items-center justify-center">
        {/* THE FIX: Render an empty span. GSAP is now the ONLY source of truth for the title's content. */}
        <span ref={titleRef}></span>
      </div>
    </div>
  );
};

export default SkillOrb;