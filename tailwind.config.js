module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        blockchain: "url('assets/images/blockchain2.jpeg')",
      }),
      height: {
        128: '32rem',
      },
      colors: {
        customBlue: {
          200: '#0f0437',
          300: '#161B44',
          700: '#080220',
          800: '#06061b',
        },
        powerRed: '#f43f5e',
        powerYellow: '#fcd34d',
        powerGreen: '#4ade80',
      },
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif', 'ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      oswald: ['Oswald'],
      poppins: ['Poppins', 'sans-serif'],
    },
    screens: {
      xs: { max: '640px' },
      sm: { min: '640px', max: '767px' },
      md: { min: '768px', max: '1023px' },
      lg: { min: '1024px', max: '1279px' },
      xl: { min: '1280px' },
      '2xl': { min: '1536px' },
    },
    boxShadow: {
      innerWhite: 'inset 0 7px 11px 0 rgba(255, 255, 255, 0.1)',
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      transform: ['disabled', 'hover'],
      backgroundColor: ['disabled', 'active'],
      borderWidth: ['hover', 'focus'],
      textColor: ['active'],
      // boxShadow: {
      //   '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      // }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
