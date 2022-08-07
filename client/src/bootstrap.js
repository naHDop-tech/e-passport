import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './providers/ApolloProvider';
import { RecoilRoot } from 'recoil';
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ApolloProvider>,
  document.querySelector('#root'),
);
