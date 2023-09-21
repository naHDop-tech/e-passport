import { useStore } from "effector-react";

import { ThemeToggleProps } from '@components/ThemeToggle'
import { useTheme } from '@hooks/useTheme'
import { ThemeMode } from '@components/HOC/WithTheme/store/interface'
import { themeDomain } from "@components/HOC/WithTheme/store/init";

export const withTheme = (Component: (props: ThemeToggleProps) => JSX.Element) => () => {
  const themeStore = useStore(themeDomain.store.$themeStore)
  useTheme(themeStore.isDarkMode ? ThemeMode.Dark : ThemeMode.Light);

  const onChangeHandler = () => {
    themeDomain.api.themeStoreApi.changeMode()
  }

  return <Component isDarkModeOn={themeStore.isDarkMode} onChange={onChangeHandler} />
};
