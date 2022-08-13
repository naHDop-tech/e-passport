import { selector } from 'recoil'

import { isDarkMode } from './atoms'
import { ThemeMode, themes } from './types'

export const themeStateSelector = selector({
  key: 'themeState',
  get: ({ get }) => {
    const isDarkModeOn = get(isDarkMode);

    return {
      isDarkModeOn,
      colorMap: isDarkModeOn ? themes[ThemeMode.Dark] : themes[ThemeMode.Light]
     }
  },
})