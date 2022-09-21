import s from './LogoStyle.module.css'
const styles = s as unknown as ILogoStyle
import { PropsWithChildren } from 'react';

interface ILogoStyle {
  Box: string
  Paragraph: string
}

export function Logo(props: PropsWithChildren<ILogoStyle>) {
  
  return (
    <div className={styles.Box}>
      Di
    </div>
  )
}
