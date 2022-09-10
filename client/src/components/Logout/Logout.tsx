import { Button } from '@components/Button'
import LogoutImage from '@static/illustrations/logout.png'

import s from './LogoutStyle.module.css'
const styles = s as ILogoutStyle

import cs from '@components/CommonStyle.module.css'
import { ICommonStyle } from '@components/common-style-types'

const commonStyle = cs as ICommonStyle
interface ILogoutStyle {
  TextBox: string
  ImgBox: string
}
export interface ILogoutProps {
  onLogout: () => void
}

export function Logout(props: ILogoutProps) {
  const { onLogout } = props

  return (
    <div>
      <div className={styles.TextBox}>
        <h1>Logout</h1>
        <div className={commonStyle.Margin12} />
        <p className={commonStyle.TextWhiteGrey}>Are you sure you want to logout?</p>
        <div className={commonStyle.Margin32} />
        <Button outline onClick={onLogout}>Logout</Button>
      </div>
      <div className={styles.ImgBox}>
        <img src={LogoutImage} />
      </div>
    </div>
  )
}
