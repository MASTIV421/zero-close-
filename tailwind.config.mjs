export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        black: '#0A0A0A',
        charcoal: '#1C1C1C',
        graphite: '#2E2E2E',
        steel: '#6B6B6B',
        silver: '#A8A8A8',
        pearl: '#DCDCDC',
        ivory: '#F5F5F4',
        gold: {
          dark: '#7A5C2E',
          DEFAULT: '#A67C3D',
          light: '#C9A961',
        },
      },
    },
  },
  plugins: [],
}
