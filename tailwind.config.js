/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5B3715',
        google: '#3f85f4',
        github: '#333',
        price: '#432818',
        secondary: '#474747',
        border: '#d4d4d4',
        label: '#A0A0A0',
        option: '#303033',
        'light-brown': '#c3a995',
        'price-stress': '#ff4800',
        'light-black': 'rgb(48, 48, 51)',
        'light-gray': '#5D5D5D',
        'very-light-gray': '#e4e4e4',
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
      boxShadow: {
        modal: 'rgba(0, 0, 0, 0.5) 20px 20px 80px 0px',
      },
    },
  },
  plugins: [],
};
