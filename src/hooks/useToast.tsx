import type { ComponentProps, ReactElement, ReactNode } from "react";

import { nanoid } from "nanoid";
import { create } from "zustand";

import { ToastAction, type ToastProps } from "../components/Toast.tsx";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1_000_000;

type ToasterToast = ToastProps & {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactElement<ComponentProps<typeof ToastAction>, typeof ToastAction>;
};

type ToastState = {
  toasts: ToasterToast[];
  toastTimeouts: Map<string, ReturnType<typeof setTimeout>>;
  addToast: (toast: ToasterToast) => void;
  updateToast: (
    toast: Partial<ToasterToast> & Pick<ToasterToast, "id">,
  ) => void;
  dismissToast: (toastId?: ToasterToast["id"]) => void;
  removeToast: (toastId?: ToasterToast["id"]) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  toastTimeouts: new Map<string, ReturnType<typeof setTimeout>>(),
  addToast: (toast) =>
    set((state) => ({
      toasts: [toast, ...state.toasts].slice(0, TOAST_LIMIT),
    })),
  updateToast: (toast) =>
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === toast.id ? { ...t, ...toast } : t,
      ),
    })),
  dismissToast: (toastId) =>
    set((state) => {
      const toastIds =
        toastId ? [toastId] : state.toasts.map((toast) => toast.id);

      toastIds.forEach((toastId) => {
        if (!state.toastTimeouts.has(toastId)) {
          const timeout = setTimeout(() => {
            state.toastTimeouts.delete(toastId);
            state.removeToast(toastId);
          }, TOAST_REMOVE_DELAY);

          state.toastTimeouts.set(toastId, timeout);
        }
      });

      return {
        toasts: state.toasts.map((toast) =>
          toastId === undefined || toast.id === toastId ?
            { ...toast, open: false }
          : toast,
        ),
      };
    }),
  removeToast: (toastId) =>
    set((state) => ({
      toasts:
        toastId !== undefined ?
          state.toasts.filter((toast) => toast.id !== toastId)
        : [],
    })),
}));

export const toast = (props: Omit<ToasterToast, "id">) => {
  const id = nanoid();
  const { addToast, updateToast, dismissToast } = useToastStore.getState();

  const update = (props: ToasterToast) => updateToast({ ...props, id });
  const dismiss = () => dismissToast(id);

  addToast({
    ...props,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) {
        dismiss();
      }
    },
  });

  return { id, dismiss, update };
};
