import s from './EIconStyle.module.css'
const styles = s as unknown as IEIconStyle

interface IEIconStyle {
  Box: string
  Paragraph: string
}

export function EIcon() {
  return (
    <div className={styles.Box}>
      E
    </div>
  )
}
