import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'

import { GET_APPLICANT } from '@root/gql/queries/applicant'
import { GET_USER } from '@root/gql/queries/user'
import { apolloClient } from '@root/providers/Apollo/ApolloProvider'

import { userInfo, token } from '@store/auth/atoms'
import { authSelector } from '@store/auth/selector'

import { IUserProfile } from '@root/interfaces/user'
import { useToast } from './useToast'
import { ToastType } from '@root/components/Toast/Toast'
export interface IUseUserInfo {
  isAuth: boolean
  user: Partial<IUserProfile>
  fetchUserInfo: () => void
}

export function useUserInfo(): IUseUserInfo {
  const { isAuth } = useRecoilValue(authSelector)
  const user = useRecoilValue(userInfo)
  const toast = useToast()

  const resetToken = useResetRecoilState(token)
  const resetUserInfo = useResetRecoilState(userInfo)

  const fetchUserInfo = useRecoilCallback(
    ({ set }) => async () => {
      try {
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
      } catch (error: any) {
        console.error('err', error)
        toast.open({ type: ToastType.Error, content: error.message})
        if (error.message === 'jwt expired') {
          resetToken()
          resetUserInfo()
        }
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
