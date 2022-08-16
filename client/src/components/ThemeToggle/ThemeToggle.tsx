import { InputHTMLAttributes } from 'react'

import s from './ThemeToggleStyles.module.css'
const styles = s as unknown as IThemeToggleStyle

interface IThemeToggleStyle {
  toggle: string
}

interface IAdditionThemeToggleProps {
  isDarkModeOn: boolean
}

export type ThemeToggleProps = IAdditionThemeToggleProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function ThemeToggle(props: ThemeToggleProps): JSX.Element {
  const { isDarkModeOn, ...rest } = props

  return (
    <div className={styles.toggle}>
        <input
          type="checkbox"
          id="toggle"
          checked={isDarkModeOn}
          {...rest}
          />
        <label htmlFor="toggle"></label>
    </div>
  )
}