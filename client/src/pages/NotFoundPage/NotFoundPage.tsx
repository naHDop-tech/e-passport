import NotFoundImage from '@static/illustrations/404.png'

import { useToast } from '@hooks/useToast'
import { ToastPosition, ToastType } from '@components/Toast/Toast'

import s from './NotFoundPageStyle.module.css'
const styles = s as unknown as INotFoundPageStyle

interface INotFoundPageStyle {
  FlexBox: string
}

export function NotFoundPage() {
  const toast = useToast();
  const showToast = () =>
    toast.open({ content: 'Hi there!' });


  return (
    <>
      <div className={styles.FlexBox}>
        <img src={NotFoundImage} />
      </div>
      <button onClick={showToast}>TOAST</button>
    </>
  )
}
