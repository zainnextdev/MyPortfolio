// src/app/layout.tsx -- FINAL, FULLY UPDATED & OPTIMIZED

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ResumeViewerProvider } from "@/contexts/ResumeViewerContext"; 
import SmoothScroller from "@/components/core/SmoothScroller";
import Navbar from "@/components/core/Navbar";
import { Toaster } from "react-hot-toast";
import CommandPalette from "@/components/core/CommandPalette";
import Footer from "@/components/core/Footer";
import Header from "@/components/core/Header";
import ClientEffectsWrapper from "@/components/core/ClientEffectsWrapper";

const inter = Inter({ subsets: ["latin"] });

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
  
  // Google Site Verification
  verification: {
    google: 'HwbZ9SEhNLkYaoxLskIGB11QX6tvZ5Ob3PawkTqGkLU',
  },

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
  
  // Open Graph & Twitter Cards for social sharing
  openGraph: {
    title: "Zain Khalid | Full-Stack Architect & Next.js Specialist",
    description: "Architecting high-performance, visually stunning web experiences.",
    url: liveUrl,
    siteName: "Zain Khalid",
    images: [{ url: `${liveUrl}/og-image.png`, width: 1200, height: 630, alt: "Zain Khalid Portfolio", }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zain Khalid | Full-Stack Architect & Next.js Specialist",
    description: "Architecting high-performance, visually stunning web experiences.",
    creator: "@zain_nextdev",
    images: [`${liveUrl}/og-image.png`],
  },
  icons: { icon: '/favicon.ico', shortcut: '/favicon-16x16.png', apple: '/apple-touch-icon.png', },
  manifest: `${liveUrl}/site.webmanifest`,
};

// --- ENHANCED STRUCTURED DATA (JSON-LD) ---
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Zain Khalid',
    url: liveUrl,
    image: `${liveUrl}/zain-khalid-portrait.png`,
    jobTitle: 'Full-Stack Architect & Next.js Specialist',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of Engineering & Technology, Lahore' },
      { '@type': 'CollegeOrUniversity', name: 'Punjab Group of Colleges, Lahore' }
    ],
    sameAs: [
      'https://github.com/zainnextdev',
      'https://www.linkedin.com/in/zain-khalid-dev/',
    ],
    knowsAbout: [ "Next.js", "React.js", "TypeScript", "PostgreSQL", "Supabase", "Vercel", "System Architecture", "UI/UX Design", "SEO", "Three.js", "GSAP" ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressCountry: 'PK',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: liveUrl,
    name: 'Zain Khalid | Full-Stack Architect',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${liveUrl}/?s={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
];

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
            <ClientEffectsWrapper />
            <Toaster position="bottom-center" toastOptions={{ style: { background: '#111111', color: '#EAEAEA', border: '1px solid rgba(136, 136, 136, 0.2)', }, }} />
            <Navbar />
            <Header /> 
            <SmoothScroller />
            <div className="scroll-container">
              {/* The <main> tag is now correctly located in src/app/page.tsx */}
              {children}
              <Footer />
            </div>
            <CommandPalette />
          </ResumeViewerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}