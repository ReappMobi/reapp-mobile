const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      fontFamily: {
        reapp_thin: ['reapp_thin', 'sans-serif'],
        reapp_ligth: ['reapp_ligth', 'sans-serif'],
        reapp_regular: ['reapp_regular', 'sans-serif'],
        reapp_medium: ['reapp_medium', 'sans-serif'],
        reapp_bold: ['reapp_bold', 'sans-serif'],
        reapp_black: ['reapp_black', 'sans-serif'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
};
