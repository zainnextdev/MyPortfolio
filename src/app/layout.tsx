// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ResumeViewerProvider } from "@/contexts/ResumeViewerContext"; 
import CustomCursor from "@/components/core/CustomCursor";
import SmoothScroller from "@/components/core/SmoothScroller";
import { CelestialCanvas } from "@/components/core/CelestialCanvas"; 
import Navbar from "@/components/core/Navbar";
import { Toaster } from "react-hot-toast";
import CommandPalette from "@/components/core/CommandPalette";
import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";

const inter = Inter({ subsets: ["latin"] });

// --- ELITE SEO METADATA OVERHAUL ---
const liveUrl = "https://zainkhalid.vercel.app";

export const metadata: Metadata = {
  // Core Metadata
  title: {
    default: "Zain Khalid | Full-Stack Architect & Next.js Specialist",
    template: "%s | Zain Khalid",
  },
  description: "The official portfolio of Zain Khalid, a full-stack architect from Lahore, Pakistan, specializing in building high-performance, visually stunning web experiences with the Next.js and Vercel ecosystem.",
  
  // SEO & Discoverability
  keywords: ["Zain Khalid", "Full-Stack Developer", "Next.js Developer", "React Developer", "TypeScript", "Vercel", "Portfolio", "Web Developer Pakistan", "Lahore Developer", "Three.js", "GSAP"],
  authors: [{ name: "Zain Khalid", url: liveUrl }],
  creator: "Zain Khalid",
  
  // Canonical URL & Robots
  metadataBase: new URL(liveUrl),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph (for social sharing on platforms like Facebook, LinkedIn)
  openGraph: {
    title: "Zain Khalid | Full-Stack Architect & Next.js Specialist",
    description: "Architecting high-performance, visually stunning web experiences.",
    url: liveUrl,
    siteName: "Zain Khalid",
    images: [
      {
        url: `${liveUrl}/og-image.png`, // Absolute URL is crucial
        width: 1200,
        height: 630,
        alt: "Zain Khalid Portfolio",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter Card (for sharing on Twitter)
  twitter: {
    card: 'summary_large_image',
    title: "Zain Khalid | Full-Stack Architect & Next.js Specialist",
    description: "Architecting high-performance, visually stunning web experiences.",
    creator: "@zain_nextdev", // IMPORTANT: Add your Twitter handle here
    images: [`${liveUrl}/og-image.png`], // Absolute URL is crucial
  },

  // Icons & Manifest
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${liveUrl}/site.webmanifest`,
};

// --- ELITE STRUCTURED DATA (JSON-LD) ---
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Zain Khalid',
  url: liveUrl,
  image: `${liveUrl}/zain-khalid-portrait.png`, // IMPORTANT: Add a professional headshot to your /public folder with this name
  jobTitle: 'Full-Stack Architect & Next.js Specialist',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of Engineering & Technology, Lahore' },
    { '@type': 'CollegeOrUniversity', name: 'Punjab Group of Colleges, Lahore' }
  ],
  sameAs: [ // Your social/professional links
    'https://github.com/zainnextdev',
    'https://www.linkedin.com/in/zain-khalid-b91873318/',
    // Add other relevant links like your Twitter profile URL
  ],
  knowsAbout: [ "Next.js", "React.js", "TypeScript", "PostgreSQL", "Supabase", "Vercel", "System Architecture", "UI/UX Design", "SEO", "Three.js", "GSAP" ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-background text-primary antialiased`}>
        <ThemeProvider>
          <ResumeViewerProvider>
            <Toaster position="bottom-center" toastOptions={{ style: { background: '#111111', color: '#EAEAEA', border: '1px solid rgba(136, 136, 136, 0.2)', }, }} />
            <CelestialCanvas />
            <CustomCursor />
            <Navbar />
            <Header /> 
            <SmoothScroller />
            <div className="scroll-container">
              <main className="pt-20 md:pt-20 md:pl-20">
                {children}
              </main>
              <Footer />
            </div>
            <CommandPalette />
          </ResumeViewerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}