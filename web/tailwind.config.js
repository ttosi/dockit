/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('daisyui')],
}
