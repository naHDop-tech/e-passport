import { selector } from 'recoil'
import { isDarkMode } from './atoms'

export const isDarkModeSelector = selector({
  key: 'isDarkModeState',
  get: ({ get }) => {
    const isDarkModeOn = get(isDarkMode);

    return isDarkModeOn
  },
})