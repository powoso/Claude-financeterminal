/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        terminal: {
          bg: '#060a10',
          panel: '#0c1121',
          border: '#1e293b',
          accent: '#3b82f6',
          green: '#34d399',
          red: '#f87171',
          yellow: '#fbbf24',
          orange: '#fb923c',
          muted: '#64748b',
          text: '#e2e8f0',
        },
        surface: {
          0: '#060a10',
          1: '#0c1121',
          2: '#111827',
          3: '#1a2332',
        },
      },
    },
  },
  plugins: [],
};
