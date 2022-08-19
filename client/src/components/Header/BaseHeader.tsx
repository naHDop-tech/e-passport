import { EIcon } from '../EIcon'
import { withTheme } from '../HOC/WithTheme'
import { Button } from '../Button'
import { ThemeToggle as TT } from '../../components/ThemeToggle'

import s from './BaseHeaderStyle.module.css'
const styles = s as unknown as IEIconStyle

const ThemeToggle = withTheme(TT)

interface IEIconStyle {
  FlexBox: string
  LeftContent: string
  LeftText: string
  RightContent: string
}

export function BaseHeader() {
  return (
    <div className={styles.FlexBox}>
      <div className={styles.LeftContent} onClick={() => console.log('Logo click')}>
        <EIcon />
        <div className={styles.LeftText}>Passport</div>
      </div>
      <div className={styles.RightContent}>
        <ThemeToggle />
        <Button onClick={() => console.log('Sign In click')} title='Sign In' />
      </div>
    </div>
  )
}
