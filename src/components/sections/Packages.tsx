// src/components/sections/Packages.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'; // --- Step 1: Import ScrollToPlugin ---
import { ChevronDown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- Step 2: Add the new "Enterprise Architect" custom package to the data array ---
const packagesData = [
  {
    title: "The Digital Launchpad",
    tagline: "For founders needing a premium, high-speed online presence.",
    features: [
      { name: "Core Tech", value: "Next.js, TypeScript, Tailwind CSS" },
      { name: "Pages", value: "Up to 4 Core Pages (Home, About, etc.)" },
      { name: "Design", value: "Fully Responsive, Modern UI/UX" },
      { name: "Performance", value: "Guaranteed 95+ Lighthouse Score" },
      { name: "SEO", value: "On-Page SEO Foundation" },
      { name: "Contact Form", value: "Secure & Direct to Your Email" },
    ],
    timeline: "7-10 Days",
    Price: "$300 USD",
  },
  {
    title: "Business Pro",
    tagline: "For scaling businesses ready to generate leads and publish content.",
    isBestValue: true,
    features: [
      { name: "Foundation", value: "Everything in The Digital Launchpad, plus:" },
      { name: "Pages", value: "Up to 8 Pages" },
      { name: "Headless CMS", value: "Full Content Management (Sanity.io)" },
      { name: "Dynamic Content", value: "Integrated Blog or Portfolio" },
      { name: "Animations", value: "Subtle UI animations with Framer Motion" },
      { name: "Branding", value: "Professional Logo Design & Brand Kit" },
      { name: "Database", value: "Scalable PostgreSQL (Supabase/Neon)" },
    ],
    timeline: "14-18 days",
    Price: "$500 USD",
  },
  {
    title: "The Enterprise Application MVP",
    tagline: "For visionaries ready to build and validate their E-commerce or SaaS idea.",
    features: [
      { name: "Foundation", value: "Everything in The Growth Accelerator, plus:" },
      { name: "Custom Backend", value: "Serverless functions for business logic" },
      { name: "Authentication", value: "Secure Sign-up, Login & Profiles" },
      { name: "Core Feature", value: "E-commerce Payments, SaaS Dashboard" },
      { name: "Data & Storage", value: "Robust Database & Cloud Media Storage" },
      { name: "Admin Dashboard", value: "Functional dashboard to manage data" },
      { name: "Support", value: "1 Month of Priority Post-Launch Support" },
    ],
    timeline: "21-30 days",
    Price: "Starting at $800+ USD",
  },
  {
    title: "Have a Unique Project in Mind?",
    tagline: "For complex, mission-critical projects requiring a unique, ground-up solution.",
    isCustom: true, // Flag for special rendering
    features: [
      { name: "Process", value: "Deep Discovery & Strategy Session" },
      { name: "Design", value: "Custom System Architecture & UI/UX Prototyping" },
      { name: "Engineering", value: "Bespoke Frontend & Backend Development" },
      { name: "Integration", value: "Third-Party API & Service Integration" },
      { name: "Infrastructure", value: "Scalable Deployment & CI/CD Planning" },
      { name: "Collaboration", value: "Dedicated Project Slack Channel & Reporting" },
    ],
    timeline: "Project-Dependent",
    Price: "Price Upon Consultation",
  },
];

const Packages = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  // --- Step 3: Create a GSAP-powered scroll handler ---
  const handleContactScroll = () => {
    gsap.to(window, {
      duration: 1.8,
      scrollTo: { y: '#contact', offsetY: 0 },
      ease: 'power3.inOut'
    });
  };

  // ... (GSAP and Accordion useEffects remain unchanged as they are robust) ...
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', } });
      gsap.fromTo('.stagger-reveal', { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    revealRefs.current.forEach((panel, index) => {
      const content = panel?.querySelector('.package-content');
      const chevron = panel?.querySelector('.chevron-icon');
      if (!content || !chevron) return;
      gsap.to(chevron, { rotate: activeIndex === index ? 180 : 0, duration: 0.5, ease: 'power3.inOut' });
      if (activeIndex === index) {
        gsap.set(content, { height: 'auto' });
        gsap.from(content, { height: 0, duration: 0.6, ease: 'power3.inOut' });
        gsap.fromTo(content.querySelectorAll('.content-stagger'), { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.5, ease: 'power2.out', delay: 0.2 });
      } else {
        gsap.to(content, { height: 0, duration: 0.6, ease: 'power3.inOut' });
      }
    });
  }, [activeIndex]);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="packages" ref={sectionRef} className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="stagger-reveal text-4xl md:text-5xl font-bold tracking-tighter text-center mb-10" data-cursor-text>
          My Packages
        </h2>
        <p className="stagger-reveal text-center text-secondary mb-16 max-w-3xl mx-auto bg-surface/30 backdrop-blur-sm p-4 rounded-lg border border-secondary/10">
          <strong>Note on Infrastructure:</strong> You are responsible for your own domain and any ongoing subscriptions for third-party services if used. I provide expert guidance on the setup.
        </p>

        <div className="stagger-reveal border-t border-secondary/10">
          {packagesData.map((pkg, index) => (
            <div key={index} ref={el => {revealRefs.current[index] = el}} className="package-item border-b border-secondary/10">
              <button onClick={() => handleToggle(index)} className={`w-full text-left p-6 md:p-8 flex justify-between items-center transition-colors duration-300 ${activeIndex === index ? 'bg-surface/50' : 'hover:bg-surface/30'}`} aria-expanded={activeIndex === index} data-cursor-hover>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{pkg.title}</h3>
                    {pkg.isBestValue && <span className="text-xs font-bold tracking-widest uppercase bg-accent text-background px-3 py-1 rounded-full shadow-[0_0_15px_-2px_theme(colors.accent)] mt-2 sm:mt-0 self-start">Best Value</span>}
                  </div>
                  <p className="text-secondary mt-2">{pkg.tagline}</p>
                </div>
                <ChevronDown className={`chevron-icon flex-shrink-0 ml-4 sm:ml-6 text-secondary transition-transform duration-500 ${activeIndex === index ? 'text-accent' : ''}`} size={28} />
              </button>
              <div className="package-content h-0 overflow-hidden bg-surface/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-8 border-t border-accent/20">
                  <div className="md:col-span-2">
                    <ul className="space-y-4">
                      {pkg.features.map(feature => (
                        <li key={feature.name} className="content-stagger flex flex-col md:flex-row md:items-baseline">
                          <strong className="w-full text-primary/80 font-semibold md:w-40 md:flex-shrink-0">{feature.name}:</strong>
                          <span className="text-secondary md:ml-2">{feature.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col items-start md:items-end justify-between mt-6 md:mt-0">
                    <div className="text-left md:text-right w-full">
                      <div className="content-stagger">
                        <p className="text-secondary uppercase tracking-wider text-sm">Development Time</p>
                        <p className="text-primary text-lg md:text-xl font-semibold">{pkg.timeline}</p>
                      </div>
                      <div className="content-stagger mt-6">
                        <p className="text-secondary uppercase tracking-wider text-sm">Price</p>
                        <p className={`text-2xl md:text-3xl font-bold ${pkg.isCustom ? 'text-accent' : 'text-primary'}`}>{pkg.Price}</p>
                      </div>
                    </div>
                    {/* --- Step 4: Conditionally render the custom CTA button --- */}
                    {pkg.isCustom && (
                      <div className="content-stagger mt-8 w-full">
                        <button 
                          onClick={handleContactScroll}
                          data-cursor-hover
                          className="w-full group relative flex items-center justify-center gap-3 p-4 text-lg font-semibold rounded-lg overflow-hidden transition-all duration-300 bg-accent text-background hover:shadow-[0_0_20px_-5px_theme(colors.accent)]"
                        >
                          <span>Schedule a Consultation</span>
                          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="stagger-reveal mt-16 text-center text-secondary bg-surface/30 backdrop-blur-sm p-6 rounded-lg border border-secondary/10">
          <h4 className="font-bold text-primary text-xl mb-2">Payment Gateway Integration</h4>
          <p>For e-commerce projects, I will integrate the best secure payment solution for your business, including Stripe, Paddle, or other global providers, based on your specific needs and location.</p>
        </div>
      </div>
    </section>
  );
};

export default Packages;