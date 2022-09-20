import { useContext } from 'react';
import { ToastContext } from '@root/providers';

export const useToast = () => useContext(ToastContext);