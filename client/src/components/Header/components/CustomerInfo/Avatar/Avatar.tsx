import { HtmlHTMLAttributes } from 'react'
import cn from 'classnames'

import { FakeAvatar } from './FakeAvatar'
import s from './AvatarStyle.module.css'
const styles = s as IAvatarStyles


export interface IAvatarStyles {
  Box: string

  Small: string
  Medium: string
  Large: string

  PrimaryBg: string

  FakeAvatarBox: string
}

export enum AvatarSizeType {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface IAvatarProps {
  imgSrc?: string
  size?: AvatarSizeType
  isSrcAllowed?: boolean
}

export const getAvatarSize = (size: AvatarSizeType): string => {
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
  const { imgSrc, size = AvatarSizeType.Small, isSrcAllowed, className, ...rest } = props

  return (
    <div className={cn(styles.Box, getAvatarSize(size), className)} {...rest}>
      {isSrcAllowed
        ? <img className={styles.Box} alt='Customer image' src={imgSrc} /> 
        : <FakeAvatar size={size} />
      }
    </div>
  )
}
