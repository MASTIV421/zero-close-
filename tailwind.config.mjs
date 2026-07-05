export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        black: '#0a0a0a',
        'neon-yellow': '#e5ff00',
        'neon-red': '#ff0033',
        'neon-green': '#39FF14',
        sage: '#4A6B5D',
        cream: '#FCEDD6',
        'baby-blue': '#97C6E0',
        dark: '#1a1a1a',
        'neutron-red': '#FF3366',
        'cyber-violet': '#8B5CF6',
      },
    },
  },
  plugins: [],
}