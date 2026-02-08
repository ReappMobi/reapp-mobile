import { DefaultTheme, type Theme } from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(0 0% 3.9%)',
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(0 0% 3.9%)',
    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(0 0% 3.9%)',
    primary: 'hsl(122 21% 55%)', // #7B9D7C
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(123 12% 38%)', // #566E58
    secondaryForeground: 'hsl(0 0% 100%)',
    muted: 'hsl(0 0% 96.1%)',
    mutedForeground: 'hsl(0 0% 45.1%)',
    accent: 'hsl(0 0% 96.1%)',
    accentForeground: 'hsl(0 0% 9%)',
    destructive: 'hsl(0 84.2% 60.2%)',
    border: 'hsl(0 0% 89.8%)',
    input: 'hsl(122 21% 55%)',
    ring: 'hsl(0 0% 63%)',
    radius: '0.625rem',

    tertiary: 'hsl(184 15% 55%)',
    blue: 'hsl(217 91% 60%)',
    gray: 'hsl(0 0% 56%)',
    red: 'hsl(339 75% 51%)',

    textPrimary: 'hsl(90 11% 39%)',
    textSecondary: 'hsl(90 11% 55%)',
    textNeutral: 'hsl(220 24% 25%)',

    chart1: 'hsl(12 76% 61%)',
    chart2: 'hsl(173 58% 39%)',
    chart3: 'hsl(197 37% 24%)',
    chart4: 'hsl(43 74% 66%)',
    chart5: 'hsl(27 87% 67%)',
  },
};

export const NAV_THEME: Record<'light', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
    fonts: {
      regular: { fontFamily: 'reapp_regular', fontWeight: '400' },
      medium: { fontFamily: 'reapp_medium', fontWeight: '500' },
      bold: { fontFamily: 'reapp_bold', fontWeight: '700' },
      heavy: { fontFamily: 'reapp_black', fontWeight: '900' },
    },
  },
};
