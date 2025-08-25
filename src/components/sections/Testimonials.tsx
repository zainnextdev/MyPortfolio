"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Quote, MoveLeft, MoveRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  { quote: "Working with Zain was a game-changer. His technical expertise and design sense transformed our vision into a stunning, high-performance reality. The process was seamless, and the result exceeded all expectations.", name: "Hassan Amir", title: "Owner, Genius Mart Inc." },
  { quote: "The level of professionalism and the quality of the final product were simply outstanding. Zain is not just a developer; he's a digital architect who builds experiences that are both beautiful and incredibly functional.", name: "Sana Ihsan", title: "Founder, AJ Collections" },
  { quote: "I was blown away by the fluid animations and the immersive feel of the platform. It's rare to find a developer who understands both deep technical challenges and the nuances of premium user experience. Highly recommended.", name: "Mr. Sohaib", title: "Marketing Director, Sky Scanning" },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const splitInstances = useRef<SplitType[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      quoteRefs.current.forEach((quoteEl, index) => {
        if (quoteEl) {
          const textElement = quoteEl.querySelector('.quote-text');
          if (textElement) {
            // --- THE DEFINITIVE FIX FOR WORD WRAPPING ---
            // Split by words first, then characters. This keeps words intact for line breaks.
            splitInstances.current[index] = new SplitType(textElement as HTMLElement, { types: 'words,chars' });
          }
        }
      });

      quoteRefs.current.forEach((quote, index) => {
        if (!quote) return;
        const chars = splitInstances.current[index]?.chars || [];
        gsap.set(chars, { autoAlpha: 0 });
        
        if (index === 0) {
          gsap.set(quote, { autoAlpha: 1, z: 0, scale: 1 });
          gsap.to(splitInstances.current[0].chars, { autoAlpha: 1, y: 0, stagger: 0.02, duration: 0.4, ease: 'power2.out' });
        } else {
          gsap.set(quote, { autoAlpha: 0, z: -100, scale: 0.9 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
      tl.fromTo('.testimonial-title', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(containerRef.current, { autoAlpha: 0, y: 50, scale: 0.95, rotateX: -10 }, { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 1, ease: 'power3.out' }, "-=0.6")
        .fromTo('.testimonial-nav', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, "-=0.5");
      
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  const goToQuote = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);

    const container = containerRef.current;
    const currentCard = quoteRefs.current[activeIndex];
    const nextCard = quoteRefs.current[index];
    const currentChars = splitInstances.current[activeIndex]?.chars || [];
    const nextChars = splitInstances.current[index]?.chars || [];
    
    if (!container || !currentCard || !nextCard) {
      setIsAnimating(false);
      return;
    }

    gsap.set(nextCard, { autoAlpha: 1 });
    const newHeight = nextCard.offsetHeight;
    gsap.set(nextCard, { autoAlpha: 0 });

    const tl = gsap.timeline({ 
      onComplete: () => {
        setActiveIndex(index);
        setIsAnimating(false);
      } 
    });

    tl.to(container, { height: newHeight, duration: 0.4, ease: 'power3.inOut' })
      .to(currentChars, { autoAlpha: 0, y: -15, stagger: 0.005, duration: 0.25, ease: 'power2.in' }, 0)
      .to(currentCard, { rotateY: 20, z: -100, autoAlpha: 0, scale: 0.95, duration: 0.4, ease: 'power3.in' }, 0)
      .fromTo(nextCard, 
        { rotateY: -20, z: -100, autoAlpha: 0, scale: 0.95 },
        { rotateY: 0, z: 0, autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' }, 
        0.15
      )
      .fromTo(nextChars, 
        { y: 15, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, stagger: 0.015, duration: 0.4, ease: 'power2.out' },
        "-=0.25"
      );
  };
  
  const handleNav = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (activeIndex + 1) % testimonialsData.length
      : (activeIndex - 1 + testimonialsData.length) % testimonialsData.length;
    goToQuote(newIndex);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl text-center" style={{ perspective: '1000px' }}>
        <h2 className="testimonial-title text-4xl md:text-5xl font-bold tracking-tighter mb-16 invisible" data-cursor-text>
          What My Clients Say
        </h2>

        <div ref={containerRef} className="testimonial-card-container relative w-full p-6 sm:p-8 md:p-12 min-h-[450px] sm:min-h-[420px] md:min-h-[380px] rounded-xl border border-secondary/10 bg-surface/30 backdrop-blur-lg invisible" style={{ transformStyle: 'preserve-3d' }}>
          <Quote className="absolute top-6 sm:top-8 left-6 sm:left-8 text-secondary/10 w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1} />
          
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              ref={el => { if (el) quoteRefs.current[index] = el; }}
              className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 md:p-12 text-left"
            >
              <div className="flex-1 flex items-center">
                <p className="quote-text text-base sm:text-lg md:text-xl font-light text-primary/90 leading-relaxed sm:leading-loose break-words" data-cursor-text>
                  {testimonial.quote}
                </p>
              </div>

              <div className="pt-8">
                <h4 className="font-bold text-primary text-lg">{testimonial.name}</h4>
                <p className="text-secondary">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-nav mt-12 flex justify-center items-center gap-6 invisible">
           <button onClick={() => handleNav('prev')} className="group p-3 border border-secondary/30 rounded-full hover:border-accent transition-colors duration-300 disabled:opacity-50" data-cursor-hover aria-label="Previous testimonial" disabled={isAnimating}>
            <MoveLeft className="text-secondary group-hover:text-accent transition-colors" />
          </button>
          <div className="flex justify-center gap-3">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuote(index)}
                className="w-12 h-1 rounded-full transition-colors duration-300 disabled:cursor-not-allowed"
                style={{ backgroundColor: activeIndex === index ? '#00F5D4' : 'rgba(136, 136, 136, 0.2)' }}
                aria-label={`Go to testimonial ${index + 1}`}
                data-cursor-hover
                disabled={isAnimating}
              />
            ))}
          </div>
          <button onClick={() => handleNav('next')} className="group p-3 border border-secondary/30 rounded-full hover:border-accent transition-colors duration-300 disabled:opacity-50" data-cursor-hover aria-label="Next testimonial" disabled={isAnimating}>
            <MoveRight className="text-secondary group-hover:text-accent transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;