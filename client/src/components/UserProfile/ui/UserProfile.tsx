import { Avatar, AvatarSizeType } from '@components/Header/components/CustomerInfo/Avatar'

import s from './UserProfileStyle.module.css'
const styles = s as UserProfileStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle

interface UserProfileStyle {
  PageBox: string
  MainInfoBox: string
  FormBox: string
}

export interface IUserProfileProps {
  email?: string
  firstName?: string
  lastName?: string
  imgSrc?: string
}

export function UserProfile(props: IUserProfileProps) {
  const { email, firstName, lastName, imgSrc } = props

  return (
    <div className={styles.PageBox}>
      <h1>Profile</h1>

      <div className={commonStyle.Margin24} />

      <div className={styles.MainInfoBox}>
        <Avatar isSrcAllowed={!!imgSrc} imgSrc={imgSrc} size={AvatarSizeType.Medium} />
        <div>
          <p>{`${firstName} ${lastName}`}</p>
          <p>{email}</p>
        </div>
      </div>

      <div className={styles.FormBox}>
        {/* forms */}
      </div>
    </div>
  )
}
