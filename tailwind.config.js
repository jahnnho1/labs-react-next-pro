/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  plugins: [ require('@tailwindcss/forms') ],
};
