/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.js', './src/**/*.js', './public/*.html'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ]
}
