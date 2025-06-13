"use client";

import { CheckCircle, XCircle, Info, Warning, Spinner } from "phosphor-react";
import { Toaster as Sonner, toast as sonnertoast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const iconBaseClass = "w-7 h-auto";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast: `
            group toast
            group-[.toaster]:bg-background group-[.toaster]:text-foreground 
            group-[.toaster]:border group-[.toaster]:shadow-xl
            data-[type=success]:border-green-500
            data-[type=error]:border-red-500
            data-[type=warning]:border-yellow-500 
            data-[type=info]:border-blue-500
          `,
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

const toast = {
  success: (message: string) =>
    sonnertoast.success(message, {
      icon: (
        <CheckCircle
          className={`${iconBaseClass} text-green-600 dark:text-green-400`}
          weight="fill"
        />
      ),
    }),
  error: (message: string) =>
    sonnertoast.error(message, {
      icon: (
        <XCircle
          className={`${iconBaseClass} text-red-600 dark:text-red-400`}
          weight="fill"
        />
      ),
    }),
  warning: (message: string) =>
    sonnertoast.warning(message, {
      icon: (
        <Warning
          className={`${iconBaseClass} text-yellow-600 dark:text-yellow-400`}
          weight="fill"
        />
      ),
    }),
  info: (message: string) =>
    sonnertoast.info(message, {
      icon: (
        <Info
          className={`${iconBaseClass} text-blue-600 dark:text-blue-400`}
          weight="fill"
        />
      ),
    }),
  loading: (message: string) =>
    sonnertoast(message, {
      icon: (
        <Spinner
          className={`${iconBaseClass} animate-spin text-zinc-500 dark:text-zinc-400`}
          weight="fill"
        />
      ),
    }),
};

export { Toaster, toast };
