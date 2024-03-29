import { Suspense, useEffect } from 'react';

import { UserProfileDlc } from '@components/UserProfile'
import { UserPhoneDlc } from '@components/UserProfile'
import { UserAddressDlc } from '@components/UserProfile'
import { Spinner } from '@components/Spinner'

import s from './UserProfilePageStyle.module.css'
const styles = s as UserProfilePageStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'
import { useUserInfo } from '@hooks/useUserInfo';

const commonStyle = cs as ICommonStyle

interface UserProfilePageStyle {
  PageBox: string
}

export function UserProfilePage() {
  const { fetchUserInfo } = useUserInfo()

  useEffect(() => {
    fetchUserInfo()
  }, [])

  return (
    <Suspense fallback={<Spinner isLoading />}>
      <div className={styles.PageBox}>
        <h1>My Profile</h1>

        <div className={commonStyle.Margin24} />

        {/* Main info */}
        <UserProfileDlc />

        {/* Phone */}
        <UserPhoneDlc />

        {/* Address */}
        <UserAddressDlc />
      </div>
    </Suspense>
  )
}
