import { useState, useMemo, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { ToastContext } from './Context';
import { Toast, IToastProps } from './Toast';

// Create a random ID
function generateUEID() {
  const first = (Math.random() * 46656) | 0;
  const second = (Math.random() * 46656) | 0;
  const third = ('000' + first.toString(36)).slice(-3);
  const fourth = ('000' + second.toString(36)).slice(-3);

  return third + fourth;
}

interface IToast extends IToastProps {
  id: string
}

export const ToastProvider = (props: PropsWithChildren<{}>) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  console.log(toasts);
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
      {props.children}

      {createPortal(
        <div className="toasts-wrapper">
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