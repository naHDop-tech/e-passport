import s from './SpinnerStyle.module.css';
const styles = s as unknown as ISpinnerStyle
import { Children, PropsWithChildren } from 'react';

interface ISpinnerStyle {
  'lds-dual-ring': string
}

interface ISpinnerProps {
  isLoading: boolean
}

export function Spinner(props: PropsWithChildren<ISpinnerProps>) {
  const { children, isLoading } = props;

    return (
      <div>
        {isLoading ? <div className={styles['lds-dual-ring']}></div> : children}
      </div>
    )
}

// import s from './SpinnerStyle.module.css';
// const styles = s as unknown as ILogoStyle
// import { Children, PropsWithChildren } from 'react';
// // import './LogoStyle.module.css';

// interface ILogoStyle {
//   Box: string
//   Paragraph: string
// }

// interface ISpinnerProps {
//   isLoading: boolean
// }

// // const styles.box = 1;

// // export function Logo(props: PropsWithChildren<ISpinnerProps>) {
// export function Spinner(props: PropsWithChildren<ILogoStyle>) {
//   // const { children, isLoading } = props;
  
//   return (
//     <div className={styles.Box}>
//       Di
//       {/* {isLoading ? <Spinner/> : children} */}
//     </div>
//   )
// }
