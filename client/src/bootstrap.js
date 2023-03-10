import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { App } from './App';
import { ErrorBoundary } from "@components/ErrorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
    <RecoilRoot>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </RecoilRoot>
);
