/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        darkBg: '#121212', 
      },
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
        
      },
    },
  },
  plugins: [],
}

