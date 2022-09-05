import { useRecoilValue } from 'recoil'
import cn from 'classnames'

import { userSelector } from '@store/auth/selector'
import { IAvatarStyles, getAvatarSize, AvatarSizeType } from './Avatar'
import { Avatar } from '@components/Header/components/CustomerInfo/Avatar'

import s from './AvatarStyle.module.css'
const styles = s as IAvatarStyles

interface IFakeAvatarProps {
  size: AvatarSizeType
}

export function FakeAvatar(props: IFakeAvatarProps) {
  const { size } = props
  const { user } = useRecoilValue(userSelector)
  const initials = `${user.firstName[0]}${user.lastName[0]}`

  return (
    <div className={cn(styles.Box, getAvatarSize(size), styles.FakeAvatarBox)}>{initials}</div>
  )
}
