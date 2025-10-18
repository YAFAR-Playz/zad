/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brick: '#CF441E',
        teal: '#073B4C',
        mint: '#A9D8C7',
      },
    },
  },
  plugins: [],
};
