import { ChangeEvent } from 'react'
import { useRecoilState } from 'recoil';

import { ThemeToggle } from '../../common/ThemeToggle'
import { useTheme } from '../../../hooks/useTheme'
import { isDarkMode } from '../../../store/theme/atoms'
import { ThemeMode } from '../../../store/theme/types'

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
