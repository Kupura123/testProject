/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        rose: {
          50: '#fef1f7',
          100: '#fee5f0',
          200: '#fecce3',
          300: '#fca4cb',
          400: '#f76da8',
          500: '#f24082',
          600: '#de1d63',
          700: '#be104f',
          800: '#9f1245',
          900: '#88113e',
        },
        amphoreus: {
          50: '#f5eef2',
          100: '#e8dce4',
          200: '#d4c0d0',
          300: '#c9a0b8',
          400: '#b878a0',
          500: '#a85888',
          600: '#8a4070',
          700: '#1a1020',
          800: '#120c18',
          900: '#0d0a12',
          950: '#080610',
        },
        gold: {
          light: '#f0d878',
          DEFAULT: '#d4a843',
          dark: '#a67c3a',
          glow: '#ffe4a0',
        },
        mythic: {
          pink: '#ff6eb4',
          rose: '#f24082',
          purple: '#9b6dff',
          lavender: '#c8a2f8',
          cyan: '#7ae8d0',
        },
        dark: {
          50: '#2a2035',
          100: '#221a2c',
          200: '#1a1220',
          300: '#140e1a',
          400: '#0f0b14',
          500: '#0d0a12',
          600: '#0a0810',
          700: '#08060e',
          800: '#05040a',
          900: '#030208',
        },
      },
      fontFamily: {
        display: ['"Cinzel"', '"Noto Serif SC"', 'serif'],
        serif: ['"Noto Serif SC"', '"Cinzel"', 'serif'],
        body: ['"Noto Sans SC"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        'prose': '720px',
        'content': '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-rose': 'pulseRose 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        pulseRose: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(242,64,130,0.3), 0 0 10px rgba(242,64,130,0.1)' },
          '50%': { boxShadow: '0 0 15px rgba(242,64,130,0.5), 0 0 30px rgba(242,64,130,0.2)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'rose': '0 0 5px rgba(242,64,130,0.4), 0 0 20px rgba(242,64,130,0.1)',
        'rose-lg': '0 0 10px rgba(242,64,130,0.5), 0 0 40px rgba(242,64,130,0.15)',
        'lavender': '0 0 5px rgba(155,109,255,0.4), 0 0 20px rgba(155,109,255,0.1)',
        'gold': '0 0 5px rgba(212,168,67,0.4), 0 0 20px rgba(212,168,67,0.1)',
      },
    },
  },
  plugins: [],
};
