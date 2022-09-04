import { createContext } from 'react';
import { IToastProps } from '@components/Toast/Toast'

export const ToastContext = createContext({ open: (toast: IToastProps) => {} });