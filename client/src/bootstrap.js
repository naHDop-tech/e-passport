import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { App } from './App';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <RecoilRoot>
      <App />
    </RecoilRoot>
);
