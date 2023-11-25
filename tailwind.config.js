/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth:{
        '1':'1px'
      },
      borderRadius:{
         'circle':'50%'
      },
      height:{
        'full':'100vh'
      }
    },
  },
  plugins: [],
}

