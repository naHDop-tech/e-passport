import { createContext } from 'react';
import { IToastProps } from '@components/Toast/Toast'

// export const { Provider, Consumer } = createContext({})
export const ToastContext = createContext({ open: (toast: IToastProps) => {} });