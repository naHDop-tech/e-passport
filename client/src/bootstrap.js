import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './providers/Apollo/ApolloProvider';
import { RecoilRoot } from 'recoil';

import { App } from './App';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <ApolloProvider client={apolloClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ApolloProvider>,
);
