import { ref } from "vue";

export type ToastType = "success" | "error";

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

const toasts = ref<ToastMessage[]>([]);
let nextToastId = 0;

const showToast = (message: string, type: ToastType): number => {
  const id = nextToastId++;
  toasts.value.push({ id, message, type });
  return id;
};

const removeToast = (id: number): void => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
};

export const useToast = () => ({
  toasts,
  showSuccess: (message: string) => showToast(message, "success"),
  showError: (message: string) => showToast(message, "error"),
  removeToast,
});
