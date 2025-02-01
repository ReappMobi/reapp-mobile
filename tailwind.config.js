/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        color_primary: '#7B9D7C',
        color_secundary: '#566E58',
        color_third: '#7B9B9D',
        color_third_light: '#d7e1e2',
        color_white: '#ffffff',
        color_blue: '#3B82F6',
        color_gray: '#909090',
        color_gray_light: '#F5EDF0',
        color_redsh: '#D81E5B',
        text_primary: '#636E56',
        text_secondary: '#8E9D7B',
        text_secondary_light: '#8E9D7B',
        text_neutral: '#2E384D',
        text_dark: '#161617',
        text_light: '#F1F2F3',
        text_gray: '#A9A9AA',
        text_white: '#ffffff',
        input_background: '#f4f5f2',
      },

      fontFamily: {
        reapp_regular: ['reapp_regular', 'sans-serif'],
        reapp_medium: ['reapp_medium', 'sans-serif'],
        reapp_bold: ['reapp_bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
