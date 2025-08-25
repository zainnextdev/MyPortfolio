"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillOrb from '@/components/core/SkillOrb';
import { CheckCircle, Code, Database, Layers, Cloud, FileText } from 'lucide-react';
// --- Step 1: Import the custom hook ---
import { useResumeViewer } from '@/contexts/ResumeViewerContext';

gsap.registerPlugin(ScrollTrigger);

// ... (vercelStackData and promises arrays remain unchanged) ...
const vercelStackData = [
  { id: 'frontend', name: 'Frontend', icon: <Layers size={22} />, technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'], description: 'Crafting responsive, high-performance user interfaces with a focus on exceptional UX. Utilizing the power of React server components for speed and SEO.' },
  { id: 'backend', name: 'Backend & Data', icon: <Database size={22} />, technologies: ['Node.js', 'PostgreSQL', 'Prisma', 'Serverless Functions'], description: 'Building robust, scalable server-side logic and database schemas. Leveraging serverless functions for efficiency and infinite scalability.' },
  { id: 'deployment', name: 'Deployment', icon: <Cloud size={22} />, technologies: ['Vercel', 'CI/CD', 'GitHub Actions', 'Edge Network'], description: 'Ensuring seamless, continuous integration and deployment on Vercel’s global edge network for unparalleled speed and reliability.' },
];

const promises = [
  { title: "Pixel-Perfect Precision", description: "Every detail crafted to perfection, ensuring a flawless visual experience.", icon: <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} /> },
  { title: "Elite Performance", description: "Blazing-fast load times and smooth interactions are not optional; they are standard.", icon: <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} /> },
  { title: "Seamless Communication", description: "A transparent and collaborative process, keeping you aligned every step of the way.", icon: <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} /> },
];

const STACK_BUTTON_HEIGHT = 64;
const STACK_BUTTON_GAP = 8;
const TOTAL_ITEM_HEIGHT = STACK_BUTTON_HEIGHT + STACK_BUTTON_GAP;


const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [selectedStackId, setSelectedStackId] = useState(vercelStackData[0].id);
  const stackIndicatorRef = useRef<HTMLDivElement>(null);
  // --- Step 2: Initialize the hook ---
  const { openResume } = useResumeViewer();

  const selectedStack = vercelStackData.find(s => s.id === selectedStackId) || vercelStackData[0];
  
  // ... (all useEffect hooks remain unchanged) ...
  useEffect(() => {
    const selectedIndex = vercelStackData.findIndex(s => s.id === selectedStackId);
    if (stackIndicatorRef.current) {
        gsap.to(stackIndicatorRef.current, { y: selectedIndex * TOTAL_ITEM_HEIGHT, duration: 0.5, ease: 'power3.inOut' });
    }
    const detailsCtx = gsap.context(() => {
        gsap.fromTo('.stack-details-content > *', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.08 });
    });
    return () => detailsCtx.revert();
  }, [selectedStackId]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const narrativeBlocks = gsap.utils.toArray<HTMLElement>('.narrative-block');
      const animateNarrativeBlocks = () => {
        narrativeBlocks.forEach(block => {
          const line = block.querySelector('.narrative-line');
          const heading = block.querySelector('h3');
          const paragraph = block.querySelector('p');
          const tl = gsap.timeline({ scrollTrigger: { trigger: block, start: 'top 85%' } });
          tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: 'power3.out' })
            .fromTo(heading, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6')
            .fromTo(paragraph, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
        });
      };
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
          ScrollTrigger.create({ trigger: leftColRef.current, start: 'top top', end: 'bottom bottom', pin: rightColRef.current, pinSpacing: true });
          gsap.fromTo(rightColRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: rightColRef.current, start: 'top 80%' } });
          animateNarrativeBlocks();
        },
        "(max-width: 767px)": function() {
          gsap.fromTo('.skill-orb-container', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.skill-orb-container', start: 'top 90%' } });
          animateNarrativeBlocks();
        }
      });
      gsap.fromTo('.bottom-content', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.bottom-content', start: 'top 85%' }});
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* ... (first grid with narrative/skill orb remains unchanged) ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div ref={leftColRef} className="relative">
            <div className="space-y-24">
              <div className="narrative-block relative pl-10">
                <div className="narrative-line absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent/50 to-transparent origin-top" />
                <h3 className="text-3xl font-bold tracking-tighter mb-6" data-cursor-text>My Expertise</h3>
                <p className="text-secondary text-lg" data-cursor-text>Specializing in the Vercel ecosystem, I build high-performance web applications, transforming complex problems into elegant, efficient, and interactive digital experiences.</p>
              </div>
              <div className="narrative-block relative pl-10">
                <div className="narrative-line absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent/50 to-transparent origin-top" />
                <h3 className="text-3xl font-bold tracking-tighter mb-6" data-cursor-text>About Me</h3>
                <p className="text-secondary text-lg" data-cursor-text>Beyond the code, I am a creative problem-solver driven by a passion for architectural design and digital craftsmanship, aiming to build lasting, intuitive platforms that empower users.</p>
              </div>
              <div className="narrative-block relative pl-10">
                <div className="narrative-line absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent/50 to-transparent origin-top" />
                <h3 className="text-3xl font-bold tracking-tighter mb-6" data-cursor-text>My Philosophy</h3>
                <p className="text-secondary text-lg" data-cursor-text>I believe in minimalism and purpose. Every line of code, every animation, and every pixel is placed with intent, contributing to a seamless and memorable user journey without unnecessary complexity.</p>
              </div>
            </div>
          </div>
          <div ref={rightColRef}><div className="skill-orb-container flex items-start justify-center min-h-[450px] md:min-h-0"><SkillOrb /></div></div>
        </div>
        
        <div className="bottom-content mt-32">
          {/* ... (second grid with stack explorer remains unchanged) ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div className="stack-explorer-container">
              <h3 className="text-3xl font-bold tracking-tighter mb-10" data-cursor-text>The Tech Stack</h3>
              <div className="flex gap-6">
                <div className="relative"><div ref={stackIndicatorRef} className={`absolute left-0 w-1 bg-accent rounded-full shadow-[0_0_10px_theme(colors.accent)]`} style={{ height: `${STACK_BUTTON_HEIGHT}px` }} /><div className="flex flex-col gap-2">{vercelStackData.map((stack) => (<button key={stack.id} onClick={() => setSelectedStackId(stack.id)} className="group relative flex items-center text-left pl-8 pr-4" style={{ height: `${STACK_BUTTON_HEIGHT}px` }} data-cursor-hover><div className={`flex items-center gap-4 transition-colors duration-300 ${selectedStackId === stack.id ? 'text-primary' : 'text-secondary group-hover:text-primary'}`}>{stack.icon}<span className="font-semibold text-lg">{stack.name}</span></div></button>))}</div></div>
                <div className="flex-1 pt-1 pr-4 min-h-[220px]"><div className="stack-details-content"><h4 className="font-semibold text-primary text-lg mb-4" data-cursor-text>{selectedStack.name} Technologies</h4><div className="flex flex-wrap gap-2 mb-6">{selectedStack.technologies.map(tech => (<span key={tech} className="bg-surface/80 border border-secondary/10 text-secondary/90 text-sm px-3 py-1 rounded-full">{tech}</span>))}</div><p className="text-secondary text-base leading-relaxed" data-cursor-text>{selectedStack.description}</p></div></div>
              </div>
            </div>
            <div className="promises-container">
              <h3 className="text-3xl font-bold tracking-tighter mb-10" data-cursor-text>What I Deliver</h3>
              <ul className="space-y-8">{promises.map((promise) => (<li key={promise.title} className="flex items-start gap-4" data-cursor-text>{promise.icon}<div><h4 className="font-semibold text-primary text-lg">{promise.title}</h4><p className="text-secondary text-base">{promise.description}</p></div></li>))}</ul>
            </div>
          </div>
          
          {/* --- Step 3: Convert the <a> tag to a <button> and add the onClick handler --- */}
          <div className="mt-24 flex justify-center">
            <button
              onClick={openResume}
              data-cursor-hover
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-surface/50 px-8 py-4 text-lg font-medium text-primary shadow-lg transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_theme(colors.accent)] border border-secondary/20 backdrop-blur-sm"
            >
              <FileText className="transition-transform duration-300 group-hover:-translate-y-1" />
              <span>View My Résumé</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;