import { useContext } from 'react';
import { ToastContext } from '@components/Toast/Context';

export const useToast = () => useContext(ToastContext);