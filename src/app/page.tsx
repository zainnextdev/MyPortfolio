// src/app/page.tsx

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import Packages from "@/components/sections/Packages"; // --- Step 1: Import the new component ---
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Education />
      <Projects />
      <Testimonials /> 
      <Packages /> {/* --- Step 2: Add the component to the page layout --- */}
      <Contact />
    </main>
  );
}