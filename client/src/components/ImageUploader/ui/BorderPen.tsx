import BorderPenIcon from '@static/icons/pen-border-icon.svg'

import s from './BorderPenStyle.module.css'
const styles = s as unknown as IBorderPenStyle

interface IBorderPenStyle {
  Box: string
}

export function BorderPen(): JSX.Element {
  return (
    <div className={styles.Box}>
      <BorderPenIcon color="white" />
    </div>
  )
}
