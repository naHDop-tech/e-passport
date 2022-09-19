import { useEffect } from 'react'

import DashboardImage from '@static/illustrations/dashboard.png'

import s from './DashboardStyle.module.css'
const styles = s as unknown as INotFoundPageStyle

import { useUserInfo } from '@hooks/useUserInfo'

interface INotFoundPageStyle {
  TextBox: string
  ImgBox: string
}

export function Dashboard() {
  const { user, fetchUserInfo } = useUserInfo()

  useEffect(() => {
    if (!user.email) {
      fetchUserInfo()
    }
  }, [user])

  return (
    <div>
      <div className={styles.TextBox}>
        <h1>Welcome to dashboard</h1>
        <p>Here you can find important information about your Di-passport</p>
      </div>
      <div className={styles.ImgBox}>
        <img src={DashboardImage} />
      </div>
    </div>
  )
}
