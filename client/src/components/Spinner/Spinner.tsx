import s from './SpinnerStyle.module.css';
const styles = s as unknown as ISpinnerStyle

import { PropsWithChildren } from 'react';

import cn from 'classnames'

interface ISpinnerStyle {
  DualRing: string

  Small: string
  Medium: string
  Large: string
}

export enum SpinnerSizeType {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}


export interface ISpinnerProps {
  isLoading: boolean
  size?: SpinnerSizeType
}

export const getSpinnerSize = (size: SpinnerSizeType): string => {
  if (size === SpinnerSizeType.Large) {
    return styles.Large
  }
  if (size === SpinnerSizeType.Medium) {
    return styles.Medium
  }

  return styles.Small
}

export function Spinner(props: PropsWithChildren<ISpinnerProps>) {
  const { children, isLoading, size = SpinnerSizeType.Medium } = props;
  const { DualRing } = styles;

  return (
    <>
      {isLoading ? <div className={cn(DualRing, getSpinnerSize(size))}/> : children}
    </>
  )}