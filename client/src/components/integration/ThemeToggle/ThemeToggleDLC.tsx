import { ChangeEvent } from 'react'
import { useRecoilState } from 'recoil';

import { ThemeToggle } from '../../common/ThemeToggle'
import { useTheme, ThemeMode } from '../../../hooks/useTheme'
import { isDarkMode } from '../../../recoil/theme/atoms'

export function ThemeToggleDLC() {
  const [isDarkModeOn, setIsDarkMode] = useRecoilState(isDarkMode)
  useTheme(isDarkModeOn ? ThemeMode.Dark : ThemeMode.Light);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(e.target.checked)
  }

  return (
    <ThemeToggle
      isDarkModeOn={isDarkModeOn}
      onChange={onChangeHandler}
    />
  )
}
