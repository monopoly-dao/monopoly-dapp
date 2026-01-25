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
        playfair: ['var(--font-playfair)'],
      },
      colors: {
        'settley-bg': '#fbf8f1', // Keep this as it matches the visual beige
        'settley-text': 'oklch(0.55 0.02 265)', // Ref Link Color
        'settley-text-hover': 'oklch(0.2 0.02 265)', // Ref Link Hover
        'settley-primary': 'oklch(0.2 0.05 265)', // Ref Primary (Sign Up bg, Login border)
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
