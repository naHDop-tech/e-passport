import { useEffect } from 'react';

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark'
}

const themes = {
  light: {
    '--color-background': '#FFF8F3',
    '--color-text': '#191919',
    '--color-primary': '#A3E4DB',
    '--color-secondary': '#1C6DD0',
    '--color-accent': '#FED1EF',
  },
  dark: {
    '--color-background': '#191919',
    '--color-text': '#FFF8F3',
    '--color-primary': '#2d4263',
    '--color-secondary': '#c84b31',
    '--color-accent': '#ecdbba',
  },
}

type ColorTypes = '--color-primary' | '--color-background' | '--color-text' | '--color-secondary' | '--color-accent'

export const useTheme = (selectedTheme: ThemeMode): void => {
  useEffect(() => {
    const theme = themes[selectedTheme] || themes.light;
    Object.keys(theme).forEach((key) => {
      const value = theme[key as ColorTypes];
      document.documentElement.style.setProperty(key, value);
    });
  }, [selectedTheme]);
};
