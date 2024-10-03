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
        'rich-purple': '#6A0DAD',
        'deep-purple': '#4B0082',
        'background-black': '#000000',
        'dark-gray': '#121212',
        'medium-gray': '#1E1E1E',
        'light-gray': '#2C2C2C',
        'very-light-gray': '#B3B3B3',
        'white-smoke': '#F5F5F5',
        'white': '#FFFFFF',
        'success-green': '#28A745',
        'error-red': '#DC3545',
        'warning-yellow': '#FFC107',
        'primary-button': '#6A0DAD',
        'primary-button-hover': '#4B0082',
        'secondary-button': '#2C2C2C',
        'secondary-button-hover': '#1E1E1E',
        'input-background': '#1E1E1E',
        'input-border': '#F5F5F5',
        'card-background': '#2C2C2C',
        'card-border': '#1E1E1E',
        'primary-text': '#F5F5F5',
        'secondary-text': '#B3B3B3',
        'accent-text': '#6A0DAD',
        'lighter-gray': '#3C3A3A',
      },
      fontSize: {
        'h1': ['2.5rem', 'auto'], // 40px
        'h2': ['2rem', 'auto'],   // 32px
        'h3': ['1.75rem', 'auto'], // 28px
        'h4': ['1.5rem', 'auto'],  // 24px
        'h5': ['1.25rem', 'auto'], // 20px
        'h6': ['1rem', 'auto'],    // 16px
        'button': ['1.25rem', 'auto'], // 16px
        'label': ['1rem', 'auto'], // 16px
        'card-title': ['1.25rem', 'auto'], // 20px
        'card-subtitle': ['1rem', 'auto'], // 16px
        'card-text': ['0.75rem', 'auto'],  // 12px
        'placeholder-text': ['0.875rem', 'auto'], // 14px
        'mini-text': ['0.625rem', 'auto'], // 10px
      },
    },
  },
  plugins: [],
};
export default config;
