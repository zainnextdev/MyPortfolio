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
// --- Step 1: Import Header and REMOVE HUD ---
import Header from "@/components/core/Header";

const inter = Inter({ subsets: ["latin"] });

// ... (metadata and jsonLd remain unchanged) ...
export const metadata: Metadata = {
  title: {
    default: "Zain Khalid | Full-Stack Developer & Designer",
    template: "%s | Zain Khalid",
  },
  description: "The official portfolio of Zain Khalid, a specialist in architecting high-performance, visually stunning web experiences with Next.js, TypeScript, and the Vercel ecosystem.",
  keywords: ["Zain Khalid", "Full-Stack Developer", "Next.js Developer", "React Developer", "TypeScript", "Vercel", "Portfolio", "Web Developer Pakistan", "Lahore Developer"],
  authors: [{ name: "Zain Khalid", url: "https://zainkhalid.dev" }],
  creator: "Zain Khalid",
  metadataBase: new URL("https://zainkhalid.dev"),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1, }, },
  openGraph: { title: "Zain Khalid | Full-Stack Developer & Designer", description: "Architecting high-performance, visually stunning web experiences.", url: "https://zainkhalid.dev", siteName: "Zain Khalid", images: [ { url: `https://zainkhalid.dev/og-image.png`, width: 1200, height: 630, alt: "Zain Khalid Portfolio", }, ], locale: 'en_US', type: 'website', },
  twitter: { card: 'summary_large_image', title: "Zain Khalid | Full-Stack Developer & Designer", description: "Architecting high-performance, visually stunning web experiences.", creator: "@YourTwitterHandle", images: [`https://zainkhalid.dev/og-image.png`], },
  icons: { icon: '/favicon.ico', shortcut: '/favicon-16x16.png', apple: '/apple-touch-icon.png', },
  manifest: `https://zainkhalid.dev/site.webmanifest`,
};

const jsonLd = { '@context': 'https://schema.org', '@type': 'Person', name: 'Zain Khalid', url: "https://zainkhalid.dev", image: `https://zainkhalid.dev/zain-khalid-portrait.png`, jobTitle: 'Full-Stack Developer & Designer', worksFor: { '@type': 'Organization', name: 'Freelance', }, alumniOf: [ { '@type': 'CollegeOrUniversity', name: 'University of Engineering & Technology, Lahore', }, { '@type': 'CollegeOrUniversity', name: 'Punjab Group of Colleges, Lahore', } ], sameAs: [ 'https://github.com/Zain-Khalid-23', 'https://www.linkedin.com/in/zain-khalid-b91873318/', ], knowsAbout: [ "Next.js", "React.js", "TypeScript", "PostgreSQL", "Supabase", "Vercel", "System Architecture", "UI/UX Design", "SEO" ], address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK', }, };


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: '#111111',
                  color: '#EAEAEA',
                  border: '1px solid rgba(136, 136, 136, 0.2)',
                },
              }}
            />
            <CelestialCanvas />
            <CustomCursor />
            <Navbar />
            {/* --- Step 2: Add the new Header and REMOVE the old HUD --- */}
            <Header /> 
            <SmoothScroller />
            <div className="scroll-container">
              {/* --- Step 3: Add top padding on desktop to prevent content from being hidden by the new header --- */}
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