"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Award, School } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    id: 1,
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Engineering & Technology, Lahore',
    duration: '2024 - 2028',
    description: 'Currently enrolled in one of the country\'s most prestigious universities, developing advanced skills in computer science, programming, algorithms, and system design.',
    icon: <Award size={28} />,
  },
  {
    id: 2,
    degree: 'Intermediate in Computer Science',
    institution: 'Punjab Group of Colleges, Lahore',
    duration: '2022 - 2024',
    description: 'Graduated with an A+ Grade, establishing a formidable foundation in computer science principles, programming fundamentals, and advanced mathematics.',
    icon: <School size={28} />,
  },
  {
    id: 3,
    degree: 'Matriculation (Science)',
    institution: 'Dar e Arqam High School',
    duration: '2020 - 2022',
    description: 'Completed secondary education with an A+ Grade, cultivating a disciplined approach to scientific study and analytical problem-solving.',
    icon: <BookOpen size={28} />,
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLUListElement>(null);
  const progressIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Initial Section Reveal ---
      const initialTl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      initialTl.fromTo('.education-title', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      initialTl.fromTo('.timeline-line', { scaleY: 0 }, { scaleY: 1, duration: 1, ease: 'power3.inOut' }, "-=0.5");

      // --- Main scroll-driven progress indicator ---
      gsap.to(progressIndicatorRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // --- Individual item reveal animations ---
      const items = gsap.utils.toArray<HTMLElement>('.timeline-item');
      items.forEach((item) => {
        const card = item.querySelector('.timeline-card');
        const node = item.querySelector('.timeline-node');
        
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' }
        });

        tl.fromTo(card, { autoAlpha: 0, y: 50, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' })
          .fromTo(card!.querySelectorAll('.card-content'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, '-=0.5')
          .fromTo(node, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.75)' }, 0)
          .to(node, { scale: 1.2, boxShadow: '0 0 25px 5px theme(colors.accent)', repeat: 1, yoyo: true, duration: 0.4 }, '-=0.4');
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto" style={{ perspective: '1200px' }}>
        <h2 className="education-title text-4xl md:text-5xl font-bold tracking-tighter text-center mb-24 invisible" data-cursor-text>
          Academic Journey
        </h2>
        <div className="relative">
          {/* Static Background Line */}
          <div className="timeline-line absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-1 h-full bg-gradient-to-b from-accent/30 to-surface origin-top" />
          {/* Animated Progress Indicator Line */}
          <div ref={progressIndicatorRef} className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-1 h-0 bg-accent shadow-[0_0_15px_1px_theme(colors.accent)] origin-top" />

          {/* --- REFINEMENT: Replaced negative margin with positive space for proper mobile stacking --- */}
          <ul ref={timelineContainerRef} className="space-y-8">
            {educationData.map((item, index) => (
              <li key={item.id} className="timeline-item relative pl-16 md:pl-0">
                <div className={`md:flex items-start md:gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Card */}
                  <div className="timeline-card w-full md:w-[calc(50%-1rem)] p-6 md:p-8 bg-surface/50 backdrop-blur-md border border-secondary/10 rounded-lg shadow-xl invisible">
                    <p className="card-content text-accent font-semibold tracking-wider mb-2">{item.duration}</p>
                    <h3 className="card-content text-xl sm:text-2xl font-bold text-primary mb-2">{item.degree}</h3>
                    <h4 className="card-content text-lg text-secondary mb-4">{item.institution}</h4>
                    <p className="card-content text-secondary/80 text-base sm:text-lg">{item.description}</p>
                  </div>

                  {/* Spacer for Desktop */}
                  <div className="hidden md:block w-[calc(50%-1rem)]"></div>
                </div>

                {/* Central Icon Node */}
                <div className="timeline-node absolute top-8 left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center">
                  <div className="absolute w-3 h-3 bg-accent/50 rounded-full" />
                  <div className="absolute w-8 h-8 bg-accent/10 rounded-full animate-pulse" />
                  <div className="text-primary z-10">{item.icon}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Education;