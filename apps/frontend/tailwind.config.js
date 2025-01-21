const { lightTheme, darkTheme } = require('./src/theme/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          primary: {
            main: lightTheme.palette.primary.main,
            light: lightTheme.palette.primary.light,
            dark: lightTheme.palette.primary.dark,
          },
          secondary: {
            main: lightTheme.palette.secondary.main,
            light: lightTheme.palette.secondary.light,
            dark: lightTheme.palette.secondary.dark,
          },
          background: {
            default: lightTheme.palette.background.default,
            paper: lightTheme.palette.background.paper,
          },
        },
        dark: {
          primary: {
            main: darkTheme.palette.primary.main,
            light: darkTheme.palette.primary.light,
            dark: darkTheme.palette.primary.dark,
          },
          secondary: {
            main: darkTheme.palette.secondary.main,
            light: darkTheme.palette.secondary.light,
            dark: darkTheme.palette.secondary.dark,
          },
          background: {
            default: darkTheme.palette.background.default,
            paper: darkTheme.palette.background.paper,
          },
        },
      },
    },
  },
  plugins: [],
} 