import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          light: "#FDF2F4",
          DEFAULT: "#E8B7C4",
          dark: "#C97891",
        },
        rose: {
          deep: "#9B3459",
          royal: "#6B1D2F",
          maroon: "#521120",
        },
        gold: {
          champagne: "#E8D39A",
          metallic: "#C9A34E",
          deep: "#996515",
          foil: "#D4AF37",
        },
        ivory: {
          DEFAULT: "#FFF8F0",
          warm: "#FFFDF9",
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        pinyon: ["'Pinyon Script'", "cursive"],
        tamil: ["'JeeshikaTamil'", "sans-serif"],
        tamilSerif: ["'JeeshikaTamil'", "serif"],
        tamilDisplay: ["'JeeshikaNilavu'", "'JeeshikaTamil'", "sans-serif"],
        tamilTitle: ["'JeeshikaNilavu'", "'JeeshikaTamil'", "sans-serif"],
        tamilNames: ["'JeeshikaMarutham'", "'JeeshikaTamil'", "sans-serif"],
        tamilBody: ["'JeeshikaTamil'", "sans-serif"],
        'tamil-title': ["'JeeshikaNilavu'", "'JeeshikaTamil'", "sans-serif"],
        'tamil-display': ["'JeeshikaNilavu'", "'JeeshikaTamil'", "sans-serif"],
        'tamil-names': ["'JeeshikaMarutham'", "'JeeshikaTamil'", "sans-serif"],
        'tamil-marutham': ["'JeeshikaMarutham'", "sans-serif"],
        'tamil-kurinji': ["'JeeshikaKurinji'", "sans-serif"],
        'tamil-mullai': ["'JeeshikaMullai'", "sans-serif"],
        'tamil-nilavu': ["'JeeshikaNilavu'", "sans-serif"],
        'tamil-ezhil': ["'JeeshikaEzhil'", "sans-serif"],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.45)',
        'rose-glass': '0 10px 30px rgba(107, 29, 47, 0.12)',
      }
    },
  },
  plugins: [],
};
export default config;

