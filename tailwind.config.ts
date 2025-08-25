// tailwind.config.ts
import type { Config } from "tailwindcss";
// --- Step 1: Import the 'plugin' function from tailwindcss/plugin ---
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'background': 'rgb(var(--color-background) / <alpha-value>)',
        'surface': 'rgb(var(--color-surface) / <alpha-value>)',
        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
        'accent': 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
      },
      animation: {
        sheen: 'sheen 2s linear infinite',
        'subtle-pan': 'subtle-pan 120s linear infinite',
        'rotate-schematic': 'rotate-schematic 60s linear infinite',
      },
      keyframes: {
        sheen: { '0%': { backgroundPosition: '200% center' }, '100%': { backgroundPosition: '-200% center' } },
        'subtle-pan': { '0%': { backgroundPosition: '0% 0%' }, '100%': { backgroundPosition: '100% 100%' } },
        'rotate-schematic': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
      },
    },
  },
  // --- Step 2: Add the custom plugin to create the text-fill-transparent utility ---
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-fill-transparent': {
          '-webkit-text-fill-color': 'transparent',
        },
      })
    })
  ],
};
export default config;