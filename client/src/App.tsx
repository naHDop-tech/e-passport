import { useRecoilValue } from 'recoil'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ThemeToggle } from './components/common/ThemeToggle'
import { withTheme } from './components/HOC/withTheme'
import { themeStateSelector } from './store/theme/selector'
import { ReactComponent as FingerPrint } from '../src/img/svg/finger-print.icon.svg';

const ThemeToggleWithThemeState = withTheme(ThemeToggle)

export function App(): JSX.Element {
  const { colorMap } = useRecoilValue(themeStateSelector)
  return (
    <>
      <ThemeToggleWithThemeState />
      <FingerPrint color={colorMap['--color-accent']} />
      <Router>
        <Routes>
          <Route path='/' element={<>Home</>} />
        </Routes>
      </Router>
    </>
  );
}
