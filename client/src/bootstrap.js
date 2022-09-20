import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@root/providers';
import { Web3Provider } from '@root/providers';
import { RecoilRoot } from 'recoil';

import { App } from './App';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <ApolloProvider client={apolloClient}>
    <Web3Provider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Web3Provider>
  </ApolloProvider>,
);
