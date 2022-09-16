import { useRecoilValue } from 'recoil'

import { userSelector } from '@store/auth/selector'
import { UserProfile } from './ui/UserProfile'

export function UserProfileDlc() {
  const { user } = useRecoilValue(userSelector)

  return (
    <UserProfile
      email={user?.email}
      firstName={user.firstName}
      lastName={user.lastName}
      imgSrc={user.imgSrc}
    />
  )
}
