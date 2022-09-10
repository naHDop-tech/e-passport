import NotFoundImage from '@static/illustrations/404.png'

import s from './NotFoundPageStyle.module.css'
const styles = s as unknown as INotFoundPageStyle

interface INotFoundPageStyle {
  TextBox: string
  ImgBox: string
}

export function NotFoundPage() {
  return (
    <div>
      <div className={styles.TextBox}>
        <h1>Page not found</h1>
        <p>Guess you try to visit not found page</p>
      </div>
      <div className={styles.ImgBox}>
        <img src={NotFoundImage} />
      </div>
    </div>
  )
}
