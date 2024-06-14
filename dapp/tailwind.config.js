/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-dark-grotesk)'],
        inter: ['var(--font-inter)'],
        'n-montreal': ['var(--font-neue-montreal)'],
      },
      colors: {
        navy: '#272343',
        'light-grey': '#F4F4F4',
        'medium-grey': '#CBCBCB',
        yellow: '#FFD803',
        cream: '#FFFBE5',
      },
    },
  },
  plugins: [],
};
