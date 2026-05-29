import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8F5EF', 'bg-deep': '#EBE5D6',
        card: '#FFFFFF', 'card-muted': '#FBF9F4',
        ink: '#1A1815',
        'text-primary': '#1A1815', 'text-muted': '#6B6359', 'text-faint': '#A8A095',
        accent: '#D9531E', 'accent-soft': '#FFE9DD', 'accent-deep': '#B33E0E',
        success: '#1B7A5C', 'success-soft': '#D9F0E5',
        indigo: '#3D4D8A', 'indigo-soft': '#E3E7F4',
        warn: '#B8721C', 'warn-soft': '#F8E6CB',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideUp: { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
export default config;
