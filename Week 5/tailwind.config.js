/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        darkBg: '#121212', 
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        playFair: ['"Playfair Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        natasans: ['"Nata Sans"', 'sans-serif'],
        broock: ['BROOCK', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

