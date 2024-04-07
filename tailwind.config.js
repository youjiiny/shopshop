/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ab947e',
        google: '#3f85f4',
        github: '#333',
        'lignt-brown': '#c3a995',
        price: '#432818',
      },
    },
  },
  plugins: [],
};
