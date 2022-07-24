import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ThemeToggle } from './components/common/ThemeToggle'
import { withTheme } from './components/HOC/withTheme'

const ThemeToggleWithThemeState = withTheme(ThemeToggle)

export function App(): JSX.Element {
  return (
    <>
      <ThemeToggleWithThemeState />
      <Router>
        <Routes>
          <Route path='/' element={<>Home</>} />
        </Routes>
      </Router>
    </>
  );
}
