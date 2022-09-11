import SettingsImage from '@static/illustrations/settings.png'

import s from './SettingsPageStyle.module.css'
const styles = s as unknown as INotFoundPageStyle

interface INotFoundPageStyle {
  TextBox: string
  ImgBox: string
}


export function SettingsPage() {
  return (
    <div>
      <div className={styles.TextBox}>
        <h1>Set up your account</h1>
        <p>Please fill up all settings field to get Di-Passport</p>
      </div>
      <div className={styles.ImgBox}>
        <img src={SettingsImage} />
      </div>
    </div>
  )
}
