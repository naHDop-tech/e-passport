import { SvgComponent } from '../../../components/types'
import { useRecoilValue } from 'recoil'
import clns from 'classnames'

import { themeStateSelector } from '../../../store/theme/selector'
import s from './Item.module.css'
const styles = s as unknown as ItemStyles

interface ItemStyles {
  active: string
  box: string
  logo: string
  disabled: string
}

export interface IItemProps {
  title: string
  logo: SvgComponent
  isDisabled?: boolean
  isActive?: boolean
  onClick?: () => void
}

export function Item(props: IItemProps): JSX.Element {
  const { title, logo: Icon, isActive, isDisabled, onClick } = props
  const { colorMap } = useRecoilValue(themeStateSelector)

  return (
    <div onClick={onClick} className={clns(styles.box, isDisabled && styles.disabled)}>
      <div>
        <Icon color={isActive ? colorMap['--color-accent'] : colorMap['--color-text']} />
      </div>
      <div className={clns(isActive && styles.active)}>{title}</div>
    </div>
  )
}
