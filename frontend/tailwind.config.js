/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nova: {
          blue: '#2563EB',
          dark: '#0F172A',
          light: '#F8FAFC',
        },
        spark: {
          orange: '#F97316',
          green: '#22C55E',
          red: '#EF4444',
        },
        gray: {
          900: '#111827',
          600: '#4B5563',
          300: '#D1D5DB',
          100: '#F3F4F6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'radius-sm': '4px',
        'radius-md': '8px',
        'radius-lg': '12px',
        'radius-xl': '16px',
      },
      boxShadow: {
        'shadow-sm': '0 1px 2px rgba(0,0,0,0.05)',
        'shadow-md': '0 4px 6px rgba(0,0,0,0.07)',
        'shadow-lg': '0 10px 15px rgba(0,0,0,0.1)',
        'shadow-xl': '0 20px 25px rgba(0,0,0,0.15)',
      },
      transitionDuration: {
        'fast': '100ms',
        'base': '200ms',
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
