
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'popup': '#121923',
        'main-bg':'#0C1118',
      },
      backgroundImage: {
        'aboutBG': "url('/images/machine.png')",
        
      }
    },
    screens: {
      'phone': '768px',
      // => @media (min-width: 768px) 
      'tablet': '991px',
      'laptop':'1200px',
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
