module.exports = {
  content: ['./src/components/**/*.{tsx,jsx}', './src/features/**/*.{tsx,jsx}'],
  theme: {
    fontFamily: {
      'sans': 'Poppins',
    },
    extend: {
      colors: {
        'primary': '#0c1233',
        'highlight': '#54d7ff',
        'secondary': '#f0fcff',
        gray: {
          'primary': '#818181',
          'secondary': '#D5D5D5',
          'faded': 'rgba(0,0,0,0.1)'
        }
      },
      fontSize: {
        '12px': '12px',
        '14px': '14px',
        '15px': '15px',
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '22px': '22px',
        '25px': '25px',
        '28px': '28px',
        '30px': '30px',
      },
      zIndex: {
        '999': '999',
      }
    },
  },
  plugins: [],
  corePlugins: {
    transform: false,
    translate: false,
    boxShadow: false
  }
}
