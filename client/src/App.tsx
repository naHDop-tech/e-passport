// import { useRecoilValue } from 'recoil'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ThemeToggle } from './components/common/ThemeToggle'
import { withTheme } from './components/HOC/withTheme'
// import { themeStateSelector } from './store/theme/selector'
import { SideBar } from './components/SideBar'
import { items } from './components/SideBar/types'
// import { ReactComponent as FingerPrintIcon } from '../src/img/svg/finger-print.icon.svg';

const ThemeToggleWithThemeState = withTheme(ThemeToggle)

export function App(): JSX.Element {
  // const { colorMap } = useRecoilValue(themeStateSelector)
  return (
    <>
      <ThemeToggleWithThemeState />
      <SideBar items={items} />
      {/* <FingerPrintIcon color={colorMap['--color-accent']} /> */}
      <Router>
        <Routes>
          <Route path='/' element={<>Home</>} />
        </Routes>
      </Router>
    </>
  );
}
