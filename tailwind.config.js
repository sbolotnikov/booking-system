module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    theme: {
      fontFamily: {

       'main': ["Source Sans Pro","Segoe UI","Frutiger Linotype","Dejavu Sans","Helvetica Neue"],

      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
