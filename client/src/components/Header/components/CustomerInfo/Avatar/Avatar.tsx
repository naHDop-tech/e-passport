import { HtmlHTMLAttributes } from 'react'
import cn from 'classnames'

import s from './AvatarStyle.module.css'
const styles = s as IAvatarStyles

interface IAvatarStyles {
  Box: string

  Small: string
  Medium: string
  Large: string
}

enum AvatarSizeType {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface IAvatarProps {
  imgSrc: string
  size?: AvatarSizeType
}

const getAvatarSize = (size: AvatarSizeType): string => {
  if (size === AvatarSizeType.Large) {
    return styles.Large
  }
  if (size === AvatarSizeType.Medium) {
    return styles.Medium
  }

  return styles.Small
}

export type AvatarProps = IAvatarProps & HtmlHTMLAttributes<HTMLDivElement>

export function Avatar(props: AvatarProps) {
  const { imgSrc, size = AvatarSizeType.Small, className, ...rest } = props

  return (
    <div className={cn(styles.Box, getAvatarSize(size), className)} {...rest}>
      <img className={styles.Box} alt='Customer image' src={imgSrc} />
    </div>
  )
}
