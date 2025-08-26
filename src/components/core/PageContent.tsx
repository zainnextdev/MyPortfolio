// src/components/core/PageContent.tsx -- MODIFIED FOR SEMANTICS

"use client";

import dynamic from 'next/dynamic';

const SectionPlaceholder = () => <section className="min-h-screen w-full" aria-hidden="true" />;

const Hero = dynamic(() => import('@/components/sections/Hero'));
const About = dynamic(() => import('@/components/sections/About'), { ssr: false, loading: () => <SectionPlaceholder /> });
const Education = dynamic(() => import('@/components/sections/Education'), { ssr: false, loading: () => <SectionPlaceholder /> });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false, loading: () => <SectionPlaceholder /> });
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), { ssr: false, loading: () => <SectionPlaceholder /> });
const Packages = dynamic(() => import('@/components/sections/Packages'), { ssr: false, loading: () => <SectionPlaceholder /> });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false, loading: () => <SectionPlaceholder /> });

export default function PageContent() {
  // Use a React Fragment as the <main> tag is now in page.tsx
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Projects />
      <Testimonials />
      <Packages />
      <Contact />
    </>
  );
}