import { RecoilRoot } from 'recoil';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export function App(): JSX.Element {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path='/' element={<>Home</>} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
