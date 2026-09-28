/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020812',
        'background-secondary': '#061321',
        panel: '#081C2B',
        'panel-secondary': '#0B2638',
        cyan: '#00C8FF',
        'electric-blue': '#19D9FF',
        green: '#36F59A',
        amber: '#FFB020',
        critical: '#FF3B30',
        text: '#EAF6FF',
        muted: '#7893A8',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 200, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 200, 255, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
