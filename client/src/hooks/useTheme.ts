import { useEffect } from 'react';

import { ThemeMode, themes, ColorTypes } from '@store/theme/types'

export const useTheme = (selectedTheme: ThemeMode): void => {
  useEffect(() => {
    const theme = themes[selectedTheme] || themes.light;
    Object.keys(theme).forEach((key) => {
      const value = theme[key as ColorTypes];
      document.documentElement.style.setProperty(key, value);
    });
  }, [selectedTheme]);
};
