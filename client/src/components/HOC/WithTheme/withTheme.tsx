import { ChangeEvent } from 'react'
import { useQuery } from '@apollo/client';

import { ThemeToggleProps } from '@components/ThemeToggle'
import { IS_DARK_THEME } from '@api/queries/theme'
import { isThemeDark } from '@root/cache/theme'
import { useTheme } from '@hooks/useTheme'
import { ThemeMode } from '@root/cache/theme/types'

export const withTheme = (Component: (props: ThemeToggleProps) => JSX.Element) => () => {
  const { data } = useQuery(IS_DARK_THEME, { fetchPolicy: 'cache-only' })
  useTheme(data.isDark ? ThemeMode.Light : ThemeMode.Dark);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    isThemeDark(e.target.checked)
  }

  return <Component isDarkModeOn={data.isDark} onChange={onChangeHandler} />
};
