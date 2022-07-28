import { SvgComponent } from '../../../components/types'
import { useRecoilValue } from 'recoil'
import clns from 'classnames'

import { themeStateSelector } from '../../../store/theme/selector'
import { ColorTypes } from '../../../store/theme/types'
import s from './Item.module.css'
const styles = s as unknown as ItemStyles

interface ItemStyles {
  active: string
  box: string
  logo: string
  disabled: string
  'flex-item': string
  '--color-primary': string
  '--color-background': string
  '--color-text': string
  '--color-secondary': string
  '--color-accent': string
  'svg-component': string
}

export interface IItemProps {
  title: string
  logo: SvgComponent
  isDisabled?: boolean
  isActive?: boolean
  onClick?: () => void
  staticColor?: ColorTypes
}

export function Item(props: IItemProps): JSX.Element {
  const { title, logo: Icon, isActive, isDisabled, onClick, staticColor } = props
  const { colorMap } = useRecoilValue(themeStateSelector)

  return (
    <div onClick={onClick} className={clns(styles.box, isDisabled && styles.disabled)}>
      <div className={styles['flex-item']}>
        <Icon className={styles['svg-component']} color={staticColor ? colorMap[staticColor] : isActive ? colorMap['--color-secondary'] : colorMap['--color-text']} />
      </div>
      <div className={clns(staticColor ? staticColor : isActive && styles.active, styles['flex-item'])}>{title}</div>
    </div>
  )
}
