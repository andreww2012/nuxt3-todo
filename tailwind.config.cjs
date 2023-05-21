/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      screens: {
        md: '736px',
      },

      colors: {
        primary: {
          DEFAULT: '#4EA8DE',
          dark: '#1E6F9F',
        },
        secondary: '#5E60CE',
        danger: {
          DEFAULT: '#E25858',
        },
      },

      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
