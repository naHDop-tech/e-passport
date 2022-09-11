import { useState, useMemo, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from './Context';
import { Toast, IToastProps } from '../../components/Toast/Toast';
import { generateUEID } from '../../components/Toast/utils'

interface IToast extends IToastProps {
  id: string
}

export function ToastProvider(props: PropsWithChildren) {
  const { children } = props
  const [toasts, setToasts] = useState<IToast[]>([]);

  const open = (props: IToastProps) =>
    setToasts((currentToasts: IToast[]) => [
      ...currentToasts,
      { id: generateUEID(), content: props.content, type: props.type, position: props.position },
    ]);

  const close = (id: string) =>
    setToasts((currentToasts: IToast[]) =>
      currentToasts.filter((toast: IToast) => toast.id !== id)
    );

  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {createPortal(
        <div>
          {toasts.map((toast: IToast) => (
            <Toast 
              key={toast.id}
              close={() => close(toast.id)}
              type={toast.type}
              position={toast.position}
              content={toast.content}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};