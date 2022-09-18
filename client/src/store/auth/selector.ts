import { selector } from 'recoil'

import { GET_APPLICANT } from '@root/gql/queries/applicant'
import { GET_USER } from '@root/gql/queries/user'
import { apolloClient } from '@root/providers/ApolloProvider'

import { token } from './atoms'
import { userInfo } from './atoms'

export const authSelector = selector({
  key: 'authState',
  get: ({ get }) => {
    const currentToken = get(token);

    return {
      token: currentToken,
      isAuth: !!currentToken,
     }
  },
})

export const userSelector = selector({
  key: 'userState',
  get: ({ get }) => {
    const currentUserInfo = get(userInfo);

    return {
      user: currentUserInfo
    }
  },
})

export const fetchUser = selector({
  key: 'FetchUserData',
  get: async ({ get }) => {
    const currentUser = get(userInfo)

    const userResponse = await apolloClient.query({
      query: GET_USER,
      variables: { id: currentUser.id },
      fetchPolicy: 'network-only'
    })

    const applicantResponse = await apolloClient.query({
      query: GET_APPLICANT,
      variables: { id: currentUser.id },
      fetchPolicy: 'network-only'
    })

    const error = userResponse.error || applicantResponse.error

    if (error) {
      throw new Error(error.message);
    }

    if (userResponse.data.user?.id) {
      return userResponse.data.user
    } else {
      return applicantResponse.data.applicant
    }
  },
});
