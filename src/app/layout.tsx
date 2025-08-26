// src/app/layout.tsx -- MODIFIED FOR PERFORMANCE

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

// NOTE: The heavy, always-on components have been removed from this global layout.
// import CustomCursor from "@/components/core/CustomCursor"; // REMOVED
// import { CelestialCanvas } from "@/components/core/CelestialCanvas"; // REMOVED

const inter = Inter({ subsets: ["latin"] });

const liveUrl = "https://zainkhalid.vercel.app";

// --- Metadata remains unchanged, it is already well-configured ---
export const metadata: Metadata = {
  title: {
    default: "Zain Khalid | Full-Stack Architect & Next.js Specialist",
    template: "%s | Zain Khalid",
  },
  description: "The official portfolio of Zain Khalid, a full-stack architect from Lahore, Pakistan, specializing in building high-performance, visually stunning web experiences with the Next.js and Vercel ecosystem.",
  verification: {
    google: 'HwbZ9SEhNLkYaoxLskIGB11QX6tvZ5Ob3PawkTqGkLU',
  },
  metadataBase: new URL(liveUrl),
  // ... rest of metadata object is unchanged and correct
  keywords: ["Zain Khalid", "Full-Stack Developer", "Next.js Developer", "React Developer", "TypeScript", "Vercel", "Portfolio", "Web Developer Pakistan", "Lahore Developer", "Three.js", "GSAP"],
  authors: [{ name: "Zain Khalid", url: liveUrl }],
  creator: "Zain Khalid",
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

const jsonLd = {
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
    'https://www.linkedin.com/in/zain-khalid-b91873318/',
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
            {/* --- Step 2: Add the wrapper component here --- */}
            <ClientEffectsWrapper />

            <Toaster position="bottom-center" toastOptions={{ style: { background: '#111111', color: '#EAEAEA', border: '1px solid rgba(136, 136, 136, 0.2)', }, }} />
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