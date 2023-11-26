/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height:{
        'custom-vh':'60vh'
      },
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

