export enum ThemeMode {
  Light = 'light',
  Dark = 'dark'
}

export const themes = {
  light: {
    '--color-background': '#1d2335',
    '--color-text': '#ffffff',
    '--color-accent': '#f1f1f5'
  },
  dark: {
    '--color-background': '#ffffff',
    '--color-text': '#1d2335',
    '--color-accent': '#171725'
  },
}

export type ColorTypes = '--color-background' | '--color-text' | '--color-accent'