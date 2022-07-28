import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ThemeToggle } from './components/common/ThemeToggle'
import { withTheme } from './components/HOC/withTheme'
import { SideBar } from './components/SideBar'
import { items } from './components/SideBar/types'

const ThemeToggleWithThemeState = withTheme(ThemeToggle)

export function App(): JSX.Element {
  // const { colorMap } = useRecoilValue(themeStateSelector)
  return (
    <>
      <ThemeToggleWithThemeState />
      <SideBar items={items} />
      <Router>
        <Routes>
          <Route path='/' element={<>Home</>} />
        </Routes>
      </Router>
    </>
  );
}
