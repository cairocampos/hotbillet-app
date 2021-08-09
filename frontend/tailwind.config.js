module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '',
        secondary: '',
        warning: '',
        danger:'',
        // green:"#00D287",
        // orange: "#FE7700",
        // yellow: "#F5CE2D",
        // blue:"#36A8E0",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
