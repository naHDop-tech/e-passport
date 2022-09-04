import NotFoundImage from '@static/illustrations/404.png'

import s from './NotFoundPageStyle.module.css'
const styles = s as unknown as INotFoundPageStyle

interface INotFoundPageStyle {
  FlexBox: string
}

export function NotFoundPage() {
  return (
    <>
      <div className={styles.FlexBox}>
        <img src={NotFoundImage} />
      </div>
    </>
  )
}
