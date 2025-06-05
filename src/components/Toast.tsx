import type { ComponentPropsWithRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Toast as ToastPrimitives } from "radix-ui";
import { twMerge } from "tailwind-merge";

import { Button } from "./Button.tsx";

import { cn } from "#utils/cn.ts";

export const ToastProvider = ToastPrimitives.Provider;

export const ToastViewport = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Viewport>) => (
  <ToastPrimitives.Viewport
    className={cn(
      "z-infinity fixed right-0 bottom-0 flex w-96 max-w-[100vw] translate-x-0 flex-col gap-2 p-6",
      className,
    )}
    {...props}
  />
);

const toastVariants = cva(
  [
    "group grid grid-cols-[auto_repeat(2,max-content)] items-center gap-x-4 rounded-md p-4 shadow-2xl transition-transform [grid-template-areas:'title_action_close'_'description_action_close']",
  ],
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type ToastProps = ComponentPropsWithRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>;

export const Toast = ({ className, variant, ...props }: ToastProps) => {
  return (
    <ToastPrimitives.Root
      className={twMerge(toastVariants({ className, variant }))}
      {...props}
    />
  );
};

export const ToastTitle = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Title>) => (
  <ToastPrimitives.Title
    className={cn(
      "mb-1 text-sm font-medium text-foreground [grid-area:title] group-[.destructive]:text-destructive-foreground",
      className,
    )}
    {...props}
  />
);

export const ToastDescription = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Description>) => (
  <ToastPrimitives.Description
    className={cn(
      "text-sm text-muted-foreground [grid-area:description] group-[.destructive]:text-destructive-foreground/90",
      className,
    )}
    {...props}
  />
);

export const ToastAction = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Action>) => (
  <ToastPrimitives.Action
    className={cn("[grid-area:action]", className)}
    {...props}
  />
);

export const ToastClose = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ToastPrimitives.Close>) => (
  <ToastPrimitives.Close
    className={cn(
      "border-l border-l-muted pl-4 [grid-area:close] group-[.destructive]:border-l-destructive-foreground/30",
      className,
    )}
    asChild // ToastPrimitive.Close is a <button> by default and not a <div>
    aria-label="Close"
    {...props}
  >
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="group-[.destructive]:bg-destructive group-[.destructive]:text-destructive-foreground group-[.destructive]:hover:bg-red-600 group-[.destructive]:dark:hover:bg-red-800"
      >
        <X className="size-4" aria-hidden />
      </Button>
    </div>
  </ToastPrimitives.Close>
);
