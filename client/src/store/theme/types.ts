export enum ThemeMode {
  Light = 'light',
  Dark = 'dark'
}

export const themes = {
  light: {
    '--color-background': '#1d2335',
    '--color-text': '#ffffff',
  },
  dark: {
    '--color-background': '#ffffff',
    '--color-text': '#1d2335',
  },
}

export type ColorTypes = '--color-background' | '--color-text'