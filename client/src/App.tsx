import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as RouterProvider, Routes, Route } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
  split,
  HttpLink,
  concat,
  ApolloLink
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist';
import './style.css'

import { DashboardRouter } from '@root/routes'
import { isThemeDark } from '@root/cache/theme/index'

import { ToastProvider } from '@components/Toast/Provider'
import { GuardRoute } from '@components/GuardRoute'
import { withLayout } from '@components/HOC/WithLayout'

import { NotFoundPage } from '@pages/NotFoundPage'
import { SignInPage } from '@pages/SignInPage'
import { SignUpPage } from '@pages/SignUpPage'
import { ResetPasswordPage } from '@pages/ResetPasswordPage'
import { TermsOfConditions } from '@pages/TermsOfConditions'
import { LogoutPage } from '@pages/LogoutPage'

const MainLayoutWrapper = withLayout()

export function App(): JSX.Element {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] = useState<
    CachePersistor<NormalizedCacheObject>
  >();

  const httpLink = new HttpLink({
    uri: 'http://localhost:5005/graphql'
  });
  
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:5005/subscription',
  }));
  
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
  
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: localStorage.getItem('token') || null,
      }
    }));
  
    return forward(operation);
  })

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache({
        // addTypename: false,
        typePolicies: {
          Query: {
            fields: {
              isDark: {
                read() {
                  return isThemeDark();
                },
                
              }
            }
          }
        }
      });

      let newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: true,
        trigger: 'write',
      });

      await newPersistor.restore();

      setPersistor(newPersistor);
      setClient(
        new ApolloClient({
          link: concat(authMiddleware, splitLink),
          cache,
        }),
      );
    }

    init().catch(console.error);
  }, []);

  // const clearCache = useCallback(() => {
  //   if (!persistor) {
  //     return;
  //   }
  //   persistor.purge();
  // }, [persistor]);

  // const reload = useCallback(() => {
  //   window.location.reload();
  // }, []);

  if (!client) {
    return <h2>Initializing app...</h2>;
  }

  return (
    <ApolloProvider client={client}>
      <RouterProvider>
        <ToastProvider>
          <MainLayoutWrapper>
            <Routes>
              {/* common routes */}
              <Route path='/' element={<p>Hello</p>}/>
              <Route path='/sign-in' element={<SignInPage />}/>
              <Route path='/sign-up' element={<SignUpPage />}/>
              <Route path='/reset-password' element={<ResetPasswordPage />}/>
              <Route path='/terms-of-conditions' element={<TermsOfConditions />} />

              {/* guard routes */}
              <Route path='/dashboard/*' element={<DashboardRouter />} />
              <Route path='/logout' element={<GuardRoute><LogoutPage /></GuardRoute>} />

              {/* not found route */}
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </MainLayoutWrapper>
        </ToastProvider>
      </RouterProvider>
    </ApolloProvider>
  )
}
