/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-dark-grotesk)'],
        inter: ['var(--font-inter)'],
        'n-montreal': ['var(--font-neue-montreal)'],
        craftwork: ['var(--font-craft)'],
        roboto: ['var(--font-roboto)'],
        merriweather: ['var(--font-merriweather)'],
        'general-sans': ['var(--font-general-sans)'],
      },
      colors: {
        navy: '#272343',
        'light-grey': '#F4F4F4',
        'medium-grey': '#CBCBCB',
        'dark-grey': '#515151',
        yellow: '#FFD803',
        cream: '#FFFBE5',
        'light-green': '#DCF1BF',
        'light-red': '#F7D9D9',
        'primary-orange': '#FC6720',
      },
    },
  },
  plugins: [],
};
