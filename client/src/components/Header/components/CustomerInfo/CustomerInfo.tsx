import { Avatar } from './Avatar'

import s from './CustomerInfoStyle.module.css'
const styles = s as unknown as ICustomerHeaderStyle

interface ICustomerHeaderStyle {
  Box: string

  EmailBox: string
  AvatarBox: string
  FullNameBox: string
}

interface ICustomerInfoProps {
  imgSrc: string
  email: string
  customerFullName: string
}

export function CustomerInfo(props: ICustomerInfoProps) {
  const { email, customerFullName, imgSrc } = props

  return (
    <div className={styles.Box}>
      <Avatar className={styles.AvatarBox} imgSrc={imgSrc} isSrcAllowed={!!imgSrc} />
      <div className={styles.FullNameBox}>{customerFullName}</div>
      <div className={styles.EmailBox}>{email}</div>
    </div>
  )
}
