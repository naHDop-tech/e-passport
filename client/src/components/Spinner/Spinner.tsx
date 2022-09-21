import s from './SpinnerStyle.module.css';
const styles = s as unknown as ISpinnerStyle

import { PropsWithChildren } from 'react';

interface ISpinnerStyle {
  DualRing: string
}

export interface ISpinnerProps {
  isLoading: boolean
}

export function Spinner(props: PropsWithChildren<ISpinnerProps>) {
  const { children, isLoading } = props;

    return (
      <div>
        {isLoading ? <div className={styles.DualRing}></div> : children}
      </div>
    )
}