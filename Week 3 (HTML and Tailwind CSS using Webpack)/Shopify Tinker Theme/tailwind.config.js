/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        playFair: ['"Playfair Display"', 'serif']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

