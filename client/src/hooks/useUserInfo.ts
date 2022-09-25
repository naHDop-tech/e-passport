import { useRecoilCallback, useRecoilValue } from 'recoil'


import { GET_APPLICANT } from '@root/gql/queries/applicant'
import { GET_USER } from '@root/gql/queries/user'
import { apolloClient } from '@root/providers/Apollo/ApolloProvider'

import { userInfo } from '@store/auth/atoms'
import { authSelector } from '@store/auth/selector'

import { IUserProfile } from '@root/interfaces/user'

export interface IUseUserInfo {
  isAuth: boolean
  user: Partial<IUserProfile>
  fetchUserInfo: () => void
}

export function useUserInfo(): IUseUserInfo {
  const { isAuth } = useRecoilValue(authSelector)
  const user = useRecoilValue(userInfo)

  const fetchUserInfo = useRecoilCallback(
    ({ set }) => async () => {
      const userResponse = await apolloClient.query({
        query: GET_USER,
        fetchPolicy: 'network-only'
      })

      const applicantResponse = await apolloClient.query({
        query: GET_APPLICANT,
        fetchPolicy: 'network-only'
      })

      const error = userResponse.error || applicantResponse.error

      if (error) {
        throw new Error(error.message);
      }

      if (userResponse.data.user?.id) {
        set(userInfo, { ...userResponse.data.user, isDraft: false })
      } else {
        set(userInfo, { ...applicantResponse.data.applicant, isDraft: true })
      }
    },
    []
  );

  return {
    isAuth,
    user,
    fetchUserInfo,
  }
}
