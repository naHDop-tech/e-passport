import { Suspense } from 'react';

import { UserProfileDlc } from '@components/UserProfile'
import { Spinner } from '@components/Spinner'

import s from './UserProfilePageStyle.module.css'
const styles = s as UserProfilePageStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

interface UserProfilePageStyle {
  PageBox: string
}

export function UserProfilePage() {
  return (
    <Suspense fallback={<Spinner isLoading />}>
      <div className={styles.PageBox}>
        <h1>My Profile</h1>

        <div className={commonStyle.Margin24} />

        {/* Main info */}
        <UserProfileDlc />

        {/* Phone */}
        {/* <UserPhoneDlc /> */}
        {/* Address */}
        {/* <UserAddressDlc /> */}
      </div>
    </Suspense>
  )
}
