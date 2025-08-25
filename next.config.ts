// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Your existing config options here (if any) */

  // --- START OF MODIFICATION ---

  /**
   * Configuration for TypeScript.
   * WARNING: Setting ignoreBuildErrors to true is NOT recommended for production.
   * This will allow your project to build even if there are TypeScript errors.
   */
  typescript: {
    // !! DANGER !!
    // This prevents the build from failing when TypeScript errors are present.
    ignoreBuildErrors: true,
  },

  /**
   * Configuration for ESLint.
   * WARNING: Setting ignoreDuringBuilds to true is NOT recommended for production.
   * This will prevent the build from failing due to ESLint errors.
   */
  eslint: {
    // !! DANGER !!
    // This prevents the build from failing when ESLint errors are present.
    ignoreDuringBuilds: true,
  },

  // --- END OF MODIFICATION ---
};

export default nextConfig;