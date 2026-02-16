import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f4f0',
          100: '#e8e8e0',
          200: '#d1d1c1',
          300: '#b0b098',
          400: '#8a8a6e',
          500: '#6b6b4e',
          600: '#4d4d2e',
          700: '#3a3a1a',
          800: '#2b2b0e',
          900: '#1D2202',
          950: '#0f1201',
        },
        accent: {
          50: '#faf9f7',
          100: '#f5f3ef',
          200: '#E6E0DA',
          300: '#d9d0c5',
          400: '#c4b8a9',
          500: '#ab9b89',
          600: '#8f7d6a',
          700: '#736150',
          800: '#5c4d3f',
          900: '#4a3e33',
          950: '#2d251f',
        },
        steel: {
          50: '#f3f5f5',
          100: '#e1e6e6',
          200: '#c3cccd',
          300: '#9aabac',
          400: '#6f8788',
          500: '#516a6b',
          600: '#3d5354',
          700: '#324344',
          800: '#2a3738',
          900: '#1F393A',
          950: '#141f20',
        },
      },
      fontFamily: {
        sans: ['Raleway', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        'pill': '800px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
