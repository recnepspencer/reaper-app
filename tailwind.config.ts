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
        "rich-purple": "#6A0DAD",
        "deep-purple": "#4B0082",
        "background-black": "#000000",
        "dark-gray": "#121212",
        "medium-gray": "#1E1E1E",
        "light-gray": "#2C2C2C",
        "very-light-gray": "#B3B3B3",
        "white-smoke": "#F5F5F5",
        white: "#FFFFFF",
        "success-green": "#28A745",
        "error-red": "#DC3545",
        "error-hover": "#E1061B",
        "warning-yellow": "#FFC107",
        "primary-button": "#6A0DAD",
        "primary-button-hover": "#4B0082",
        "secondary-button": "#2C2C2C",
        "secondary-button-hover": "#1E1E1E",
        "input-background": "#1E1E1E",
        "input-border": "#F5F5F5",
        "card-background": "#2C2C2C",
        "card-border": "#1E1E1E",
        "primary-text": "#F5F5F5",
        "secondary-text": "#B3B3B3",
        "accent-text": "#6A0DAD",
        "lighter-gray": "#3C3A3A",
      },
      fontSize: {
        h1: ["40px", "auto"], // 2.5rem -> 40px
        h2: ["32px", "auto"], // 2rem -> 32px
        h3: ["28px", "auto"], // 1.75rem -> 28px
        h4: ["24px", "auto"], // 1.5rem -> 24px
        h5: ["20px", "auto"], // 1.25rem -> 20px
        h6: ["24px", "auto"], // 1rem -> 16px
        button: ["20px", "auto"], // 1.25rem -> 20px
        label: ["16px", "auto"], // 1rem -> 16px
        "card-title": ["28px", "auto"], // 1.25rem -> 20px
        "card-subtitle": ["24px", "auto"], // 1rem -> 16px
        "card-text": ["18px", "auto"], // 0.75rem -> 12px
        "placeholder-text": ["14px", "auto"], // 0.875rem -> 14px
        "mini-text": ["16px", "auto"], // 0.625rem -> 10px
      },
      keyframes: {
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeInScale: 'fadeInScale 1s ease-out forwards',
      },
    }, 
  },
  plugins: [],
};
export default config;
