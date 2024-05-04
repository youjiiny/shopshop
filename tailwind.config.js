/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ab947e',
        google: '#3f85f4',
        github: '#333',
        price: '#432818',
        'lignt-brown': '#c3a995',
        'price-stress': '#ff4800',
      },
      width: {
        140: '35rem',
      },
      height: {
        140: '35rem',
      },
      backgroundImage: {
        banner: "url('/images/banner.jpg')",
      },
    },
  },
  plugins: [],
};
