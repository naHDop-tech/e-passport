export enum ThemeMode {
    Light = 'light',
    Dark = 'dark'
}

export const themes = {
    light: {
        '--color-background': '#1d2335',
        '--color-text': '#ffffff',
        '--color-accent': '#171725',
        '--color-form-background': '#171725',
    },
    dark: {
        '--color-background': '#ffffff',
        '--color-text': '#1d2335',
        '--color-accent': '#f1f1f5',
        '--color-form-background': '#ffffff'
    },
}

export type ColorTypes = '--color-background' | '--color-text' | '--color-accent' | '--color-form-background'

export interface IThemeStore {
    isDarkMode: boolean
}