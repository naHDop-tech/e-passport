import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { ThemeToggleDLC } from './components/integration/ThemeToggle'

export function App(): JSX.Element {
  return (
    <>
      <ThemeToggleDLC />
      <Router>
        <Routes>
          <Route path='/' element={<>Home</>} />
        </Routes>
      </Router>
    </>
  );
}
