import s from './LogoStyle.module.css'
const styles = s as unknown as ILogoStyle

interface ILogoStyle {
  Box: string
  Paragraph: string
}

export function Logo() {
  
  return (
    <div className={styles.Box}>
      Di
    </div>
  )
}
