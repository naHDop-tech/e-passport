import { ChangeEvent } from 'react'
import { useRecoilState } from 'recoil';

import { ThemeToggleProps } from '../../common/ThemeToggle'
import { useTheme, ThemeMode } from '../../../hooks/useTheme'
import { isDarkMode } from '../../../store/theme/atoms'

export const withTheme = (Component: (props: ThemeToggleProps) => JSX.Element) => () => {
  const [isDarkModeOn, setIsDarkMode] = useRecoilState(isDarkMode)
  useTheme(isDarkModeOn ? ThemeMode.Dark : ThemeMode.Light);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(e.target.checked)
  }

  return <Component isDarkModeOn={isDarkModeOn} onChange={onChangeHandler} />
};
