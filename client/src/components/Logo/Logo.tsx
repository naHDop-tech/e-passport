import s from './LogoStyle.module.css'
const styles = s as unknown as ILogoStyle
import { Children, PropsWithChildren } from 'react';
// import './LogoStyle.module.css';

interface ILogoStyle {
  Box: string
  Paragraph: string
}

interface ISpinnerProps {
  isLoading: boolean
}

// const styles.box = 1;

// export function Logo(props: PropsWithChildren<ISpinnerProps>) {
export function Logo(props: PropsWithChildren<ILogoStyle>) {
  // const { children, isLoading } = props;
  
  return (
    <div className={styles.Box}>
      Di
      {/* {isLoading ? <Spinner/> : children} */}
    </div>
  )
}
