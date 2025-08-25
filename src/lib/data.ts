// src/lib/data.ts

export const projectsData = [
  {
    id: 1,
    title: "Genius Mart",
    tagline: "A Modern, Performant E-commerce Platform for Pakistan",
    description: "Genius Mart is a premium online grocery platform designed for speed and reliability, even on slower networks. It demonstrates how modern web tech can deliver a native-app-like experience, built from scratch in just 26 days.",
    features: [
      "Robust Authentication with Google OAuth",
      "Instant Live Search (<300ms)",
      "Dynamic Shopping Cart & Persistent Wishlist",
      "Advanced Product Filtering & Sorting",
      "Secure Paymob Payment Gateway Integration",
      "Comprehensive User Dashboard",
      "Fully Responsive PWA",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "SCSS Modules",
      "Supabase",
      "Vercel",
      "Cloudinary",
    ],
    image: "/projects/genius-mart-display.png", // IMPORTANT: Create this image
    liveSiteUrl: "https://geniusmart.vercel.app/",
  },
  {
    id: 2,
    title: "Genius Mart Admin Portal",
    tagline: "An Enterprise-Grade Backend Management System",
    description: "This portal tackles the clunky nature of standard e-commerce backends by providing a blazing-fast, intuitive, and secure interface for managing the Genius Mart platform. It features a hyper-granular, per-user permission system for enterprise-grade security.",
    features: [
      "Blazing-Fast Analytics Dashboard",
      "Granular, Per-User Permission System",
      "Dynamic, Action-Based UI (real-time privileges)",
      "Professional PDF Invoice Generator",
      "Row Level Security (RLS) Policies",
      "Custom RPC Functions in PL/pgSQL",
    ],
    stack: [
      "Next.js 15",
      "React 18",
      "TypeScript",
      "Supabase",
      "Ant Design 5",
      "Zustand",
    ],
    image: "/projects/admin-portal-display.png", // IMPORTANT: Create this image
  },
  {
    id: 3,
    title: "AJ Collections",
    tagline: "A Bespoke E-commerce Experience for Fine Accessories",
    description: "AJ Collections is an online jewelry and fashion accessories store crafted from the ground up. It focuses on delivering a highly attractive, fast, and professional user experience, ensuring every interaction is as curated as the products themselves.",
    features: [
      "Advanced Image Zoom & Product Gallery",
      "Secure Multi-Step Checkout Flow",
      "Personalized User Accounts & Order History",
      "Dynamic Filtering by Category & Material",
      "Optimized for Core Web Vitals & Performance",
      "Custom Admin Panel for Inventory Management",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Sass/SCSS",
      "PostgreSQL",
      "Supabase Auth",
      "Supabase Storage",
    ],
    image: "/projects/ajcollections-display.png", // IMPORTANT: Create this image
    liveSiteUrl: "https://ajcollections.vercel.app/",
  },
];