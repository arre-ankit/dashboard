"use client"
import {
  // @ts-ignore
  useToast as useToastRadix,
  // @ts-ignore
  toast as toastRadix,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  type ToastProps,
  type ToastActionElement,
} from "@/components/ui/toast"

function useToast() {
  const { toasts, toast, dismiss } = useToastRadix()

  return {
    toasts,
    toast,
    dismiss,
  }
}

function toast(props: ToastProps) {
  toastRadix(props)
}

export {
  useToast,
  toast,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  type ToastProps,
  type ToastActionElement,
}

export default useToast
