import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E2040',
          mid: '#163566',
          light: '#EEF2F8',
          pale: '#F5F7FB',
        },
        gold: {
          DEFAULT: '#C9922A',
          light: '#E8B84B',
          dark: '#A0751F',
          bg: '#FEF3E2',
        },
        surface: '#F8FAFC',
        border: '#E5E7EB',
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 16px rgba(14,32,64,0.08)',
        'card-hover': '0 8px 32px rgba(14,32,64,0.14)',
        gold: '0 4px 20px rgba(201,146,42,0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
